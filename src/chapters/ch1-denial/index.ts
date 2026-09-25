import * as THREE from 'three';
import type { Chapter, GameContext } from '../../core/chapter';
import { emptyActions, type ActionState } from '../../core/types';
import type { AABB } from '../../core/collision';
import type { Interactable } from '../../core/interact';
import type { HintLevel } from '../../core/hint';
import { normalizeAnswer } from '../../done/gate';
import { line, SEAMS_LINES, DATAMINER_HEX } from '../../text/copy';
import { Examine, type ExamineOpen } from '../../ui/examine';
import { EndCard } from '../../ui/endcard';
import { buildApartment, type Apartment } from './room';
import { buildFurniture } from './furniture';
import { buildProps } from './props';
import { buildRoomLights, ROOM_LIGHTING } from './lighting';
import { buildPuzzleProps, buildSnow, type PuzzleProps, type Snow } from './puzzle-props';
import { PuzzleBook, DOOR, DONT_KNOW, puzzle, type PuzzleId } from './puzzles';
import { JOURNAL, LAPTOP, LETTER, BOOK, BOOKMARK, DUST, type Doc } from './documents';
import { CarryState } from './carry';
import { Ch1Sound, RISER_DROP_AT } from './sound';

const CHAPTER = 1;
const DOOR_OPEN_SECONDS = 1.6;
/** Let go within this (xz) of where a thing lives and it goes back there. */
const PUT_BACK_RADIUS_M = 1.5;
const DROP_AHEAD_M = 0.6;
/** How white the screen gets before the cut; the fog does the rest. */
const WHITEOUT_MAX = 0.92;
/** Fog density the threshold dissolves into by the drop. */
const WHITEOUT_FOG = 0.9;
/**
 * How long the end card stays up before the chapter asks for the hallway:
 * the last of its three lines lands at ~5 s (endcard.ts staggers them 1.6 s
 * apart, 1.8 s each), then it is left alone a moment to be read.
 */
export const ENDCARD_HOLD_S = 7.5;

const DOCS: Record<PuzzleId, Doc> = {
  journal: JOURNAL,
  laptop: LAPTOP,
  letter: LETTER,
  book: BOOK,
  dust: DUST,
};

/** Props whose tap opens a document instead of picking them up. */
const READ_NOT_TAKE = new Set(['letter', 'book', 'bookmark']);

interface Held {
  id: string;
  object: THREE.Object3D;
  parent: THREE.Object3D;
  local: THREE.Vector3;
  localQuat: THREE.Quaternion;
  halfHeight: number;
  interactable: Interactable;
}

/**
 * CHAPTER ONE — DENIAL.
 *
 * The apartment, with five things in it the narrator wrote and won't read.
 * Each is a cipher; each answer lights one pane on the door; the five
 * letters spell `ended`; the door opens when the player says it while
 * holding the photograph. Beyond it, the threshold, the end card, and then
 * the hallway (chapters/hallway), which `next()` asks for.
 *
 * fixedUpdate keeps TestRoomChapter's load-bearing order: lantern, player,
 * applyTo, interactor, prompt, subtitle, hint, audio.
 *
 * The score is "without you now": bass from the start, the bell after a
 * couple of answers, the rhodes once all five are solved (see sound.ts).
 */
export class Ch1Chapter implements Chapter {
  readonly id = CHAPTER;

  readonly puzzles: PuzzleBook = new PuzzleBook();
  private group = new THREE.Group();
  private ctx: GameContext | null = null;
  private apt: Apartment | null = null;
  private extras: PuzzleProps | null = null;
  private snow: Snow | null = null;
  private boxes: AABB[] = [];
  private registered = new Map<string, Interactable>();
  private carry = new CarryState();
  private held: Held | null = null;
  private everTaken = new Set<string>();
  private examineUi: Examine;
  private endCard: EndCard;
  /** A small dot at screen centre, where the interact ray goes. Brightens
   *  over anything that answers; gone while reading or after the end. */
  private crosshair: HTMLDivElement;
  /** Seconds since going out the door; null until then. */
  private exitT: number | null = null;
  private whiteout: HTMLDivElement;
  private doorT = 0;
  private doorOpening = false;
  private ended = false;
  /** Seconds the end card has been up. */
  private endedS = 0;
  private seamsTalks = 0;
  private lastHintLevel: HintLevel = 0;
  private progressed = false;
  private sound: Ch1Sound | null = null;

  constructor(overlay: HTMLElement) {
    this.examineUi = new Examine(overlay, {
      keystroke: () => this.sound?.keystroke(),
      line: () => this.sound?.blip(),
    });
    this.endCard = new EndCard(overlay);
    this.crosshair = document.createElement('div');
    this.crosshair.className = 'crosshair';
    this.crosshair.setAttribute('aria-hidden', 'true');
    overlay.appendChild(this.crosshair);
    this.whiteout = document.createElement('div');
    this.whiteout.className = 'whiteout';
    this.whiteout.setAttribute('aria-hidden', 'true');
    overlay.appendChild(this.whiteout);
  }

  async load(ctx: GameContext): Promise<void> {
    this.ctx = ctx;
    const apt = buildApartment();
    const furn = buildFurniture(apt.anchors);
    const props = buildProps(furn.nodes, apt.anchors);
    const extras = buildPuzzleProps(apt);
    const snow = buildSnow();
    this.apt = apt;
    this.extras = extras;
    this.snow = snow;

    this.group.add(apt.group, furn.group, props.group, buildRoomLights().group, extras.group, snow.points);
    ctx.engine.scene.add(this.group);
    ctx.engine.setFogExp2(ROOM_LIGHTING.fog.color, ROOM_LIGHTING.fog.density);
    this.boxes = [...apt.boxes, ...furn.boxes, ...props.boxes, ...extras.boxes];

    // --- the eighteen props. Three of them are read, not carried. ---
    for (const i of props.interactables) {
      this.register(READ_NOT_TAKE.has(i.id) ? { ...i, verbs: ['look'] } : i);
    }

    // --- the puzzle layer's own objects ---
    const plain = (id: string, object3D: THREE.Object3D, verbs: Interactable['verbs']): Interactable => ({
      id,
      object3D,
      verbs,
      onVerb: () => ({ handled: true }),
    });
    this.register(plain('journal', extras.objects.journal, ['look']));
    this.register(plain('laptop', extras.objects.laptop, ['look']));
    this.register(plain('clock', extras.objects.clock, ['look']));
    this.register(plain('door', extras.objects.door, ['look']));
    this.register(plain('seams', extras.objects.seams, ['talk']));

    // --- restore ---
    const restored = new PuzzleBook(ctx.save.ch1Solved);
    for (const id of restored.solvedIds()) this.puzzles.attempt(id, puzzle(id).answers[0]!);
    // A dust puzzle solved in an earlier visit means the dust was seen: it
    // stays found, even though the photograph is back on the floor.
    if (this.puzzles.isSolved('dust')) this.revealDust();
    extras.setPanes(this.puzzles.letters());

    // Not awaited: the room is ready before the music is.
    this.sound = new Ch1Sound(ctx.audio.context, ctx.audio.output);
    this.sound.progress(this.puzzles.solvedIds().length, this.puzzles.allSolved());
    void this.sound.load();
    ctx.subtitle.onLine = () => this.sound?.blip();

    ctx.player.reset(apt.anchors.spawn, Math.PI);

    // For whoever opens the devtools.
    console.log(`%c${DATAMINER_HEX}`, 'color:#4a4f57');
  }

  // ------------------------------------------------------------------ //

  fixedUpdate(dt: number, input: ActionState): void {
    const ctx = this.ctx;
    const extras = this.extras;
    if (!ctx || !extras) return;
    const dtMs = dt * 1000;

    if (this.ended) this.endedS += dt;
    this.snow?.update(dt);
    extras.update(dt);
    this.animateDoor(dt);

    // Reading something, or finished: the room holds still. Typing "w"
    // into the prompt must not walk (KeyboardSource hears every key).
    const frozenOut = this.examineUi.isOpen || this.ended;
    const actions = frozenOut ? emptyActions() : input;

    ctx.lantern.update(dtMs, ctx.player.moving, actions.holdToSee);
    if (!this.ended) ctx.player.update(dt, actions, this.boxes, ctx.lantern.frozen);
    this.sound?.walking(!frozenOut && ctx.player.moving, dtMs);
    ctx.player.applyTo(ctx.engine.camera);
    ctx.lantern.applyTo(ctx.engine.camera);

    const frame = ctx.interactor.update(ctx.engine.camera, actions, this.carry.held !== null, dtMs);
    if (!frozenOut) ctx.maybeShowInteractPrompt(frame.hovered, true);
    this.crosshair.classList.toggle('crosshair--hidden', frozenOut);
    this.crosshair.classList.toggle('crosshair--live', !frozenOut && frame.hovered !== null);

    if (frame.fired === 'letGo') {
      this.letGo();
    } else if (frame.fired && frame.hovered) {
      this.onInteract(frame.hovered, frame.fired, frame.result?.line);
    }

    ctx.subtitle.update(dtMs);
    this.updateHints(dtMs);
    ctx.audio.update();

    if (this.puzzles.doorOpen() && this.exitT === null && ctx.player.position[2] > extras.exitZ) this.goOut();
    if (this.exitT !== null && !this.ended) this.updateExit(dt);
  }

  private onInteract(hovered: Interactable, verb: string, resultLine: string | undefined): void {
    const ctx = this.ctx!;
    const id = hovered.id;
    if (id in DOCS) return this.examine(id as PuzzleId);
    switch (id) {
      case 'bookmark':
        this.openDoc({ title: BOOKMARK.title, body: BOOKMARK.body });
        return;
      case 'door': {
        const said = this.useDoor();
        if (said) ctx.subtitle.show(said);
        return;
      }
      case 'seams':
        ctx.subtitle.show(this.seamsLine(), 3200);
        return;
      case 'clock':
        ctx.subtitle.show(line('clock', CHAPTER) ?? '', 3200);
        return;
    }
    if (verb === 'take') {
      if (this.pickUp(id)) {
        const said = id === 'photograph'
          ? "you pick it up. you don't turn it over."
          : resultLine;
        if (said) ctx.subtitle.show(said);
      }
      return;
    }
    if (resultLine) ctx.subtitle.show(resultLine);
  }

  // --------------------------- reading ------------------------------ //

  /** Opens a puzzle's document: with its prompt, or its answer once solved. */
  examine(id: PuzzleId): void {
    const doc = DOCS[id];
    const p = puzzle(id);
    if (this.puzzles.isSolved(id)) {
      this.openDoc({ title: doc.title, body: doc.body, solvedNote: p.hints[2] });
      return;
    }
    this.openDoc({
      title: doc.title,
      body: doc.body,
      prompt: { question: p.question, submit: (raw) => this.answer(id, raw) },
    });
  }

  closeExamine(): void {
    this.examineUi.close('escape');
  }

  /** The one path every answer takes, typed or tested. */
  answer(id: PuzzleId, raw: string): { line: string; done: boolean } {
    const ctx = this.ctx!;
    this.countDontKnow(raw);
    const a = this.puzzles.attempt(id, raw);
    if (a.kind === 'solved') {
      ctx.save.ch1Solved = this.puzzles.solvedIds();
      ctx.commitSave();
      this.extras?.setPanes(this.puzzles.letters());
      this.sound?.progress(this.puzzles.solvedIds().length, this.puzzles.allSolved());
      this.progressed = true;
    }
    return { line: a.line, done: a.kind === 'solved' || a.kind === 'already' };
  }

  /**
   * Returns a line to surface, or null when it opened the door's prompt.
   */
  useDoor(): string | null {
    if (this.puzzles.doorOpen()) return "it's open.";
    if (!this.puzzles.allSolved()) return this.puzzles.attemptDoor('').line;
    if (this.carry.held !== 'photograph') return "you can't leave it here.";
    const letters = this.puzzles.letters().join('   ');
    this.openDoc({
      title: 'the door',
      body: `five panes. they read:\n\n      ${letters}\n\nyou are holding the photograph.`,
      prompt: { question: DOOR.question, submit: (raw) => this.answerDoor(raw) },
    });
    return null;
  }

  answerDoor(raw: string): { line: string; done: boolean } {
    this.countDontKnow(raw);
    const a = this.puzzles.attemptDoor(raw);
    if (a.kind === 'solved') {
      this.boxes = this.boxes.filter((b) => b !== this.apt?.doorBox);
      this.doorOpening = true;
      this.progressed = true;
    }
    return { line: a.line, done: a.kind === 'solved' || a.kind === 'already' };
  }

  /**
   * Dev panel only: makes exactly `ids` the solved set, live — panes, save,
   * score — and shuts the door if it was open. Does nothing after the end
   * card (that needs a reload).
   */
  devSetSolved(ids: readonly PuzzleId[]): void {
    const ctx = this.ctx;
    if (!ctx || this.ended) return;
    this.puzzles.reset(ids);
    ctx.save.ch1Solved = this.puzzles.solvedIds();
    ctx.commitSave();
    this.extras?.setPanes(this.puzzles.letters());
    this.sound?.progress(this.puzzles.solvedIds().length, this.puzzles.allSolved());
    if (this.puzzles.isSolved('dust')) this.revealDust();
    if (this.doorOpening || this.doorT > 0) {
      this.doorOpening = false;
      this.doorT = 0;
      this.extras?.setDoorOpen(0);
      const doorBox = this.apt?.doorBox;
      if (doorBox && !this.boxes.includes(doorBox)) this.boxes.push(doorBox);
    }
  }

  /** Dev panel: the chapter's sound, for tuning the loop by ear. */
  get devSound(): Ch1Sound | null {
    return this.sound;
  }

  get isEnded(): boolean {
    return this.ended;
  }

  private openDoc(doc: ExamineOpen): void {
    this.examineUi.open(doc, (how) => {
      // "leave it" is a click — a user gesture — so the mouse can be
      // recaptured straight away. Escape can't: the browser just used it
      // to release the lock, and refuses to re-grab for a moment.
      if (how === 'click') {
        const el = this.ctx?.engine.renderer.domElement as HTMLCanvasElement | undefined;
        void el?.requestPointerLock?.()?.catch?.(() => {});
      }
    });
  }

  private countDontKnow(raw: string): void {
    const ctx = this.ctx!;
    if (normalizeAnswer(raw) !== DONT_KNOW) return;
    ctx.save.dontKnowCount++;
    ctx.commitSave();
  }

  // --------------------------- carrying ----------------------------- //

  objectFor(id: string): THREE.Object3D | null {
    return this.registered.get(id)?.object3D ?? (this.held?.id === id ? this.held.object : null);
  }

  pickUp(id: string): boolean {
    const ctx = this.ctx;
    const it = this.registered.get(id);
    if (!ctx || !it || !it.verbs.includes('take') || this.carry.held !== null) return false;
    const object = it.object3D;
    const world = new THREE.Vector3();
    object.getWorldPosition(world);
    if (!this.carry.take(id, [world.x, world.y, world.z])) return false;

    const size = new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3());
    this.held = {
      id,
      object,
      parent: object.parent!,
      local: object.position.clone(),
      localQuat: object.quaternion.clone(),
      halfHeight: Math.max(0.005, size.y / 2),
      interactable: it,
    };
    object.visible = false;
    this.unregister(id);
    this.sound?.pickUp();

    if (!this.everTaken.has(id)) {
      this.everTaken.add(id);
      this.progressed = true;
    }
    if (id === 'photograph') this.revealDust();
    return true;
  }

  letGo(): void {
    const ctx = this.ctx;
    const held = this.held;
    const origin = this.carry.origin;
    if (!ctx || !held || !origin) return;
    const [px, , pz] = ctx.player.position;
    const nearHome = Math.hypot(px - origin[0], pz - origin[2]) <= PUT_BACK_RADIUS_M;

    let at: [number, number, number];
    if (nearHome) {
      held.parent.add(held.object);
      held.object.position.copy(held.local);
      held.object.quaternion.copy(held.localQuat);
      at = [origin[0], origin[1], origin[2]];
    } else {
      const yaw = ctx.player.yaw;
      const x = px - Math.sin(yaw) * DROP_AHEAD_M;
      const z = pz - Math.cos(yaw) * DROP_AHEAD_M;
      this.group.attach(held.object);
      held.object.position.set(x, held.halfHeight, z);
      at = [x, held.halfHeight, z];
    }
    held.object.visible = true;
    const outcome = this.carry.letGo(at);
    this.register(held.interactable);
    this.held = null;
    this.sound?.putDown();

    if (outcome?.replaced) {
      // Never acknowledged. Just counted.
      ctx.save.objectsReplaced++;
      ctx.commitSave();
      this.progressed = true;
    }
  }

  private revealDust(): void {
    const extras = this.extras;
    if (!extras || this.registered.has('dust')) return;
    extras.objects.dust.visible = true;
    this.register({ id: 'dust', object3D: extras.objects.dust, verbs: ['look'], onVerb: () => ({ handled: true }) });
  }

  // --------------------------- the rest ----------------------------- //

  private seamsLine(): string {
    this.seamsTalks++;
    // Every third word from the seams is about whatever you are stuck on.
    if (this.seamsTalks % 3 === 0) {
      const hint = this.currentHint(1);
      if (hint) return hint;
    }
    return SEAMS_LINES[(this.seamsTalks - 1) % SEAMS_LINES.length]!;
  }

  /** A hint for the first thing still undone, voiced by the seams. */
  private currentHint(tier: 1 | 2): string | null {
    const next = this.puzzles.firstUnsolved();
    let hint: string;
    if (next) {
      if (next.id === 'dust' && !this.registered.has('dust') && this.held?.id !== 'photograph') {
        hint = "you haven't picked it up yet. the one on the floor, by the door.";
      } else {
        hint = next.hints[tier - 1]!;
      }
    } else if (!this.puzzles.doorOpen()) {
      hint = this.carry.held === 'photograph' ? DOOR.hints[tier - 1]! : 'take it with you. you know which one.';
    } else {
      return null;
    }
    return `the seams, not looking up: ${hint}`;
  }

  private updateHints(dtMs: number): void {
    const ctx = this.ctx!;
    const level = ctx.hint.update(dtMs, this.progressed);
    this.progressed = false;
    if (level > this.lastHintLevel && level > 0) {
      const hint = this.currentHint(level as 1 | 2);
      if (hint) ctx.subtitle.show(hint, 5000);
    }
    this.lastHintLevel = level;
  }

  private animateDoor(dt: number): void {
    if (!this.doorOpening || this.doorT >= 1) return;
    this.doorT = Math.min(1, this.doorT + dt / DOOR_OPEN_SECONDS);
    this.extras?.setDoorOpen(this.doorT);
  }

  /**
   * Out the door. The riser starts; the room's sound fades under it; the
   * screen and the fog go white while the player can still walk on into
   * it; and on the drop, a hard cut to the end card.
   */
  private goOut(): void {
    this.exitT = 0;
    this.sound?.exit();
  }

  private updateExit(dt: number): void {
    const ctx = this.ctx!;
    this.exitT! += dt;
    // The audio clock when the riser is really playing, so the cut lands on
    // the boom even if frames stall; the frame clock otherwise.
    const t = this.sound?.riserElapsed() ?? this.exitT!;
    const k = Math.min(1, t / RISER_DROP_AT);
    this.whiteout.style.opacity = String(WHITEOUT_MAX * k * k);
    const fog = ctx.engine.scene.fog as THREE.FogExp2 | null;
    if (fog) {
      const base = new THREE.Color(ROOM_LIGHTING.fog.color);
      fog.color.copy(base).lerp(new THREE.Color(0xffffff), k);
      fog.density = ROOM_LIGHTING.fog.density + (WHITEOUT_FOG - ROOM_LIGHTING.fog.density) * k * k;
      (ctx.engine.scene.background as THREE.Color | null)?.copy(fog.color);
    }
    if (t >= RISER_DROP_AT) this.end();
  }

  private end(): void {
    const ctx = this.ctx!;
    this.ended = true;
    this.whiteout.style.opacity = '0';
    ctx.save.chapter = Math.max(ctx.save.chapter, 2);
    ctx.commitSave();
    const n = ctx.save.dontKnowCount;
    this.endCard.show(
      [
        'chapter one — denial',
        `you said "i don't know" ${n} ${n === 1 ? 'time' : 'times'}.`,
        'anger. the frost is thawing.',
      ],
      { cut: true },
    );
  }

  private register(i: Interactable): void {
    this.registered.set(i.id, i);
    this.ctx?.interactor.register(i);
  }

  private unregister(id: string): void {
    this.registered.delete(id);
    this.ctx?.interactor.unregister(id);
  }

  interactableIds(): string[] {
    return [...this.registered.keys()];
  }

  isComplete(): boolean {
    return this.ended;
  }

  next(): 'hallway' | null {
    return this.ended && this.endedS >= ENDCARD_HOLD_S ? 'hallway' : null;
  }

  root(): THREE.Object3D {
    return this.group;
  }

  dispose(): void {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    this.group.traverse((o) => {
      const any = o as THREE.Object3D & { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] };
      if (any.geometry) geometries.add(any.geometry);
      if (any.material) {
        for (const m of Array.isArray(any.material) ? any.material : [any.material]) {
          materials.add(m);
          for (const v of Object.values(m)) if (v instanceof THREE.Texture) textures.add(v);
        }
      }
    });
    // A taken object is detached from the scene while held; release it too.
    this.held?.object.traverse((o) => {
      const any = o as THREE.Object3D & { geometry?: THREE.BufferGeometry };
      if (any.geometry) geometries.add(any.geometry);
    });
    for (const g of geometries) g.dispose();
    for (const m of materials) m.dispose();
    for (const t of textures) t.dispose();
    this.snow?.dispose();
    this.sound?.dispose();
    this.sound = null;
    if (this.ctx?.subtitle.onLine) this.ctx.subtitle.onLine = null;
    this.examineUi.dispose();
    this.endCard.dispose();
    this.crosshair.remove();
    this.whiteout.remove();
    this.group.removeFromParent();
    this.registered.clear();
    this.ctx = null;
  }
}
