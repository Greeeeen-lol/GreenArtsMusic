import type * as THREE from 'three';
import { ActionState } from './types';
import { Engine } from './engine';
import { InputRouter } from '../input/index';
import { Player } from './player';
import { Lantern } from './light';
import { Interactor, Interactable } from './interact';
import { AudioDirector } from './audio';
import { Subtitle } from '../ui/subtitle';
import { HintTimer } from './hint';
import { SaveState, writeSave } from './save';

export interface GameContext {
  engine: Engine;
  input: InputRouter;
  player: Player;
  lantern: Lantern;
  interactor: Interactor;
  audio: AudioDirector;
  subtitle: Subtitle;
  hint: HintTimer;
  save: SaveState;
  commitSave(): void;
  /**
   * Shows the lowercase `e` prompt the first time anything is hovered,
   * anywhere in the game — this is the ONLY prompt in the whole game, and
   * it is shown at most once per running game instance. Pass
   * `persist: false` for a debug/test room so playing it does not
   * permanently burn the real save flag (`save.seenInteractPrompt`) that
   * the real chapters depend on to never show it again.
   */
  maybeShowInteractPrompt(hovered: Interactable | null, persist?: boolean): void;
}

export function makeContext(
  parts: Omit<GameContext, 'commitSave' | 'maybeShowInteractPrompt'>,
): GameContext {
  // The lantern is a single physical light for the whole game, not a
  // per-chapter prop — added here, once, so no chapter's load() can forget
  // it. A chapter that forgets to add it renders a black screen with every
  // test green (Task 14 review finding M7).
  parts.engine.scene.add(parts.lantern.light);

  const commitSave = (): void => writeSave(parts.save);

  // Session-level guard, seeded from the real flag: once shown (in this
  // session, or a previous one), never again — independent of whether a
  // given call persists the real flag.
  let promptShown = parts.save.seenInteractPrompt;

  return {
    ...parts,
    commitSave,
    maybeShowInteractPrompt(hovered: Interactable | null, persist = true): void {
      if (!hovered || promptShown) return;
      parts.subtitle.show('e');
      promptShown = true;
      if (persist) {
        parts.save.seenInteractPrompt = true;
        commitSave();
      }
    },
  };
}

export interface Chapter {
  id: number;
  load(ctx: GameContext): Promise<void>;
  /**
   * `progressed` must mean real objective progress — a chapter-defined
   * milestone or a save counter incrementing — never merely "a verb fired".
   * HintTimer's stuck-detection clock resets on `progressed`, and a player
   * who is actually stuck fidgets with objects; gating the reset on any
   * verb firing disables the game's only anti-stuck mechanism with exactly
   * the behaviour it exists to catch (Task 14 review finding I7).
   */
  fixedUpdate(dtSeconds: number, actions: ActionState): void;
  isComplete(): boolean;
  dispose(): void;
  /** Root node this chapter added to the scene, for budget assertions. */
  root(): THREE.Object3D;
}

export class ChapterRouter {
  private ctx: GameContext;
  private chapter: Chapter | null = null;

  constructor(ctx: GameContext) {
    this.ctx = ctx;
  }

  async load(chapter: Chapter): Promise<void> {
    this.chapter?.dispose();

    // Every piece of GameContext-level state that isn't naturally scoped to
    // a single chapter must be reset here, or it bleeds across the swap:
    // registered interactables, a showing/queued subtitle line, the
    // lantern's idle/frozen state, the stuck-detection clock, the previous
    // chapter's audio layers, and the grain shader's time base.
    this.ctx.interactor.clear();
    this.ctx.subtitle.clear();
    this.ctx.lantern.reset();
    this.ctx.hint.reset();
    this.ctx.audio.clearLayers();
    this.ctx.engine.resetElapsed();
    // Documented default: origin, facing -Z. A chapter that cares about its
    // spawn point and facing (all of them should) overrides this itself,
    // first thing in its own load() — facing is not an opt-in convention.
    this.ctx.player.reset();

    await chapter.load(this.ctx);
    // Assigned only after load() resolves: fixedUpdate must never forward
    // to a chapter whose load() hasn't finished (it would be reading
    // half-initialized state). While a load is pending, fixedUpdate keeps
    // forwarding to whatever this.chapter already was — the just-disposed
    // outgoing chapter, or null on the very first load — both of which are
    // safe no-ops.
    this.chapter = chapter;
  }

  fixedUpdate(dtSeconds: number, actions: ActionState): void {
    this.chapter?.fixedUpdate(dtSeconds, actions);
  }

  current(): Chapter | null {
    return this.chapter;
  }

  dispose(): void {
    this.chapter?.dispose();
    this.chapter = null;
  }
}
