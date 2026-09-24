import * as THREE from 'three';
import '../../ui/examine.css';
import type { Chapter, ChapterExit, GameContext } from '../../core/chapter';
import { emptyActions, type ActionState } from '../../core/types';
import type { Interactable } from '../../core/interact';
import { HALLWAY_LINES } from '../../text/copy';
import { buildHallway, HALL_LIGHTING, type DoorRig, type Hallway } from './build';
import { DOOR_SLOTS, HALL, SPAWN } from './layout';
import { HallwaySound } from './sound';
import { RISER_DROP_AT } from '../ch1-denial/sound';

/** Seconds door 01 takes to swing all the way in. */
export const DOOR_OPEN_S = 1.6;
/** Open this far (0..1) and the doorway lets you through. */
const PASSABLE_AT = 0.55;
/** Flat against the passage wall. */
const DOOR_OPEN_ANGLE = Math.PI / 2 - 0.06;
/** Past this x you have gone in through door 01. */
export const THRESHOLD_X = -HALL.width / 2 - 0.25;
/** How white the screen gets before the cut; the fog does the rest. */
const WHITEOUT_MAX = 0.92;
const WHITEOUT_FOG = 0.9;
/** A tried handle shakes for this long. */
const RATTLE_S = 0.32;

const doorId = (track: number): string => `door-${String(track).padStart(2, '0')}`;

/**
 * THE HALLWAY. Chapter one lets out into it; it is the threshold the
 * original spec (§6) described, dressed as a hotel corridor.
 *
 * The ten doors down its sides are an album, one per track. Door 01 is the
 * room the player just left — the only one that opens. It swings in on a
 * passage of light; walking into it runs chapter one's own exit backwards
 * (the riser, the screen going white) and on the drop, chapter one again,
 * from the start, coming up out of the white. The rest are locked
 * until their songs are out: try one and it rattles, and says nothing. The
 * frost door at the far end is still the gate to chapter two.
 *
 * fixedUpdate keeps chapter one's order: lantern, player, camera,
 * interactor, prompt, subtitle, audio.
 */
export class HallwayChapter implements Chapter {
  readonly id = 1;

  private group = new THREE.Group();
  private ctx: GameContext | null = null;
  private hall: Hallway | null = null;
  private registered = new Map<string, Interactable>();
  private rattles = new Map<DoorRig, number>();
  private crosshair: HTMLDivElement;
  private sound: HallwaySound | null = null;
  private whiteout: HTMLDivElement;
  /** Seconds since door 01 was opened; null until then. */
  private openT: number | null = null;
  private passable = false;
  /** Seconds since going in through door 01; null until then. */
  private exitT: number | null = null;
  private gone = false;
  private flickerT = 0;
  private nextFlicker = 3;

  constructor(overlay: HTMLElement) {
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
    const hall = buildHallway();
    this.hall = hall;
    this.group.add(hall.group);
    ctx.engine.scene.add(this.group);
    ctx.engine.setFogExp2(HALL_LIGHTING.fog.color, HALL_LIGHTING.fog.density);

    for (const rig of hall.doors) {
      this.register({ id: doorId(rig.track), object3D: rig.pivot, verbs: ['look'], onVerb: () => ({ handled: true }) });
    }
    this.register({ id: 'frost-door', object3D: hall.frost, verbs: ['look'], onVerb: () => ({ handled: true }) });

    this.sound = new HallwaySound(ctx.audio.context);
    void this.sound.load();

    ctx.player.reset([...SPAWN.position], SPAWN.yaw);
  }

  fixedUpdate(dt: number, input: ActionState): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const dtMs = dt * 1000;
    // Going in, the player keeps walking — into the white — but there is
    // nothing left to touch.
    const leaving = this.exitT !== null;

    this.animateDoors(dt);
    this.animateFlicker(dt);

    ctx.lantern.update(dtMs, ctx.player.moving, input.holdToSee);
    if (!this.gone) ctx.player.update(dt, input, this.hall!.boxes, ctx.lantern.frozen);
    this.sound?.walking(ctx.player.moving, dtMs);
    ctx.player.applyTo(ctx.engine.camera);
    ctx.lantern.applyTo(ctx.engine.camera);

    const actions = leaving ? emptyActions() : input;
    const frame = ctx.interactor.update(ctx.engine.camera, actions, false, dtMs);
    if (!leaving) ctx.maybeShowInteractPrompt(frame.hovered, true);
    this.crosshair.classList.toggle('crosshair--hidden', leaving);
    this.crosshair.classList.toggle('crosshair--live', !leaving && frame.hovered !== null);

    if (frame.fired && frame.hovered) this.onInteract(frame.hovered.id);

    ctx.subtitle.update(dtMs);
    ctx.audio.update();

    if (this.passable && this.exitT === null && ctx.player.position[0] < THRESHOLD_X) this.goIn();
    if (this.exitT !== null && !this.gone) this.updateExit(dt);
  }

  private onInteract(id: string): void {
    if (id === 'frost-door') return this.useFrost();
    const slot = DOOR_SLOTS.find((s) => doorId(s.track) === id);
    if (slot) this.useDoor(slot.track);
  }

  /**
   * Door 01 opens, and chapter one starts over: only its puzzle progress is
   * forgotten — how far the player has got, how many times they said they
   * didn't know, the DONE page — all of that stays. Every other door is
   * locked, and changes nothing.
   */
  useDoor(track: number): void {
    const ctx = this.ctx;
    const rig = this.hall?.doors.find((d) => d.track === track);
    if (!ctx || !rig || this.openT !== null) return;
    if (track === 1) {
      ctx.save.ch1Solved = [];
      ctx.commitSave();
      this.openT = 0;
      this.sound?.open();
      // An open door isn't a thing to press any more.
      this.unregister(doorId(1));
      return;
    }
    this.rattles.set(rig, 0);
    this.sound?.rattle();
    this.sound?.thunk();
  }

  useFrost(): void {
    this.ctx?.subtitle.show(HALLWAY_LINES.frost, 2600);
  }

  /** On the drop: a hard cut, through white, into chapter one. */
  next(): ChapterExit | null {
    return this.gone ? { to: 'ch1', cut: true, color: '#fff' } : null;
  }

  /** Whether the player has gone in through door 01 (the riser is going). */
  get goingIn(): boolean {
    return this.exitT !== null;
  }

  isComplete(): boolean {
    return false;
  }

  interactableIds(): string[] {
    return [...this.registered.keys()];
  }

  root(): THREE.Object3D {
    return this.group;
  }

  // ------------------------------------------------------------------ //

  private animateDoors(dt: number): void {
    const hall = this.hall!;
    if (this.openT !== null && this.openT < DOOR_OPEN_S) {
      this.openT += dt;
      const k = Math.min(1, this.openT / DOOR_OPEN_S);
      const eased = k * k * (3 - 2 * k);
      hall.doors[0]!.pivot.rotation.y = DOOR_OPEN_ANGLE * eased;
      // the light behind it spills out as it opens
      hall.passage.light.intensity = hall.passage.peak * eased;
      if (!this.passable && k >= PASSABLE_AT) {
        this.passable = true;
        hall.boxes = hall.boxes.filter((b) => b !== hall.passage.doorway);
      }
    }
    for (const [rig, t0] of this.rattles) {
      const t = t0 + dt;
      if (t >= RATTLE_S) {
        rig.pivot.rotation.y = 0;
        rig.knob.rotation.z = 0;
        this.rattles.delete(rig);
        continue;
      }
      const fade = 1 - t / RATTLE_S;
      rig.pivot.rotation.y = 0.012 * fade * Math.sin(t * 90);
      rig.knob.rotation.z = 0.5 * fade * Math.sin(t * 70);
      this.rattles.set(rig, t);
    }
  }

  /**
   * In through door 01: the riser starts; the hall's sound fades under it;
   * the screen and the fog go white while the player can still walk on.
   */
  private goIn(): void {
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
      const { color, density } = HALL_LIGHTING.fog;
      fog.color.setHex(color).lerp(new THREE.Color(0xffffff), k);
      fog.density = density + (WHITEOUT_FOG - density) * k * k;
      (ctx.engine.scene.background as THREE.Color | null)?.copy(fog.color);
    }
    if (t >= RISER_DROP_AT) this.gone = true;
  }

  /** The middle lamp: steady for a few seconds, then a stutter. */
  private animateFlicker(dt: number): void {
    const { light, glass, base } = this.hall!.flicker;
    this.flickerT += dt;
    let on = true;
    if (this.flickerT > this.nextFlicker) {
      const into = this.flickerT - this.nextFlicker;
      on = Math.floor(into * 24) % 3 === 2;
      if (into > 0.4) {
        this.flickerT = 0;
        this.nextFlicker = 2.5 + Math.random() * 5;
        on = true;
      }
    }
    light.intensity = on ? base : base * 0.08;
    glass.color.setHex(on ? 0xffecc2 : 0x3a3026);
  }

  private register(i: Interactable): void {
    this.registered.set(i.id, i);
    this.ctx?.interactor.register(i);
  }

  private unregister(id: string): void {
    this.registered.delete(id);
    this.ctx?.interactor.unregister(id);
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
    for (const g of geometries) g.dispose();
    for (const m of materials) m.dispose();
    for (const t of textures) t.dispose();
    this.sound?.dispose();
    this.sound = null;
    this.crosshair.remove();
    this.whiteout.remove();
    this.group.removeFromParent();
    this.registered.clear();
    this.rattles.clear();
    this.hall = null;
    this.ctx = null;
  }
}
