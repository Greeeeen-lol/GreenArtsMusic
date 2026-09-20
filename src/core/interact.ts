import * as THREE from 'three';
import { ActionState } from './types';
import { HoverGlow } from './hoverglow';

export type Verb = 'look' | 'take' | 'push' | 'break' | 'place' | 'talk' | 'letGo';

export const LOOK_HOLD_MS = 350;
export const BREAK_TAPS = 3;
export const INTERACT_RANGE = 2.5;

export interface InteractResult {
  /** False when the object refused the verb. A refusal is a story beat. */
  handled: boolean;
  line?: string;
}

export interface Interactable {
  id: string;
  object3D: THREE.Object3D;
  verbs: readonly Verb[];
  /** Verbs this object deliberately declines, with the line it surfaces instead.
   *  `letGo` is excluded: it is a player-level verb that is never dispatched to
   *  an object, so an object cannot refuse it. */
  refuses?: Partial<Record<Exclude<Verb, 'letGo'>, string>>;
  onVerb(verb: Verb): InteractResult;
}

export interface InteractFrame {
  hovered: Interactable | null;
  fired: Verb | null;
  result: InteractResult | null;
}

function has(target: Interactable, verb: Verb): boolean {
  return target.verbs.includes(verb);
}

/**
 * Pure verb policy. Highest priority first:
 *   letGo (no target needed) > break > long-press look > place > talk > take
 *   > tap-fallback look > push (held, not released)
 */
export function resolveVerb(
  actions: ActionState,
  target: Interactable | null,
  carrying: boolean,
): Verb | null {
  if (actions.letGoPressed && carrying) return 'letGo';
  if (!target) return null;

  if (actions.interactReleased) {
    if (actions.interactTapCount >= BREAK_TAPS && has(target, 'break')) return 'break';
    if (actions.interactHeldMs >= LOOK_HOLD_MS && has(target, 'look')) return 'look';
    if (carrying && has(target, 'place')) return 'place';
    if (has(target, 'talk')) return 'talk';
    if (has(target, 'take')) return 'take';
    if (has(target, 'look')) return 'look';
    return null;
  }

  if (actions.interactDown && has(target, 'push')) return 'push';
  return null;
}

export class Interactor {
  private registry = new Map<string, Interactable>();
  private raycaster = new THREE.Raycaster();
  private centre = new THREE.Vector2(0, 0);
  // The hover affordance (spec §6): a faint emissive lift on the hovered
  // object's own materials. Owned here, not per-chapter — five chapters
  // each re-implementing this is five chances to break the no-HUD rule.
  private glow = new HoverGlow();

  constructor() {
    this.raycaster.far = INTERACT_RANGE;
  }

  register(i: Interactable): void {
    // Task 10's adjudication, recorded only in the ledger until now: a
    // breakable object must not also be carryable — thingsBroken and a
    // carried item are mutually exclusive story states.
    if (i.verbs.includes('break') && i.verbs.includes('take')) {
      throw new Error(
        `Interactable "${i.id}" has both 'break' and 'take' verbs; ` +
          "a breakable object must not also be takeable.",
      );
    }
    this.registry.set(i.id, i);
    this.glow.register(i.id, i.object3D);
  }
  unregister(id: string): void {
    this.registry.delete(id);
    this.glow.unregister(id);
  }
  clear(): void {
    this.registry.clear();
    this.glow.clear();
  }

  private hitTest(camera: THREE.Camera): Interactable | null {
    // raycaster.setFromCamera reads camera.matrixWorld, which three.js only
    // recomputes via updateMatrixWorld() — ordinarily called by
    // renderer.render(), which runs AFTER the fixed callbacks that reach
    // here. Player.applyTo only sets position/rotation directly, so without
    // this the matrix is stale (identity on the very first frame after
    // load, or last frame's transform on every frame after).
    camera.updateMatrixWorld();

    const entries = [...this.registry.values()];
    if (entries.length === 0) return null;

    this.raycaster.setFromCamera(this.centre, camera);
    const objects = entries.map((e) => e.object3D);
    const hits = this.raycaster.intersectObjects(objects, true);
    if (hits.length === 0) return null;

    let node: THREE.Object3D | null = hits[0]!.object;
    while (node) {
      for (const e of entries) {
        if (e.object3D === node) return e;
      }
      node = node.parent;
    }
    return null;
  }

  update(camera: THREE.Camera, actions: ActionState, carrying: boolean, dtMs: number): InteractFrame {
    const hovered = this.hitTest(camera);
    this.glow.update(dtMs, hovered?.id ?? null);
    const fired = resolveVerb(actions, hovered, carrying);
    if (!fired) return { hovered, fired: null, result: null };

    // letGo is a player-level verb: the chapter owns the carried item and
    // clears it. Never dispatch it to whatever happens to be under the
    // crosshair — placing onto an object is `place`, not `letGo`.
    if (fired === 'letGo' || !hovered) return { hovered, fired, result: null };

    const refusal = hovered.refuses?.[fired];
    if (refusal !== undefined) {
      return { hovered, fired, result: { handled: false, line: refusal } };
    }
    return { hovered, fired, result: hovered.onVerb(fired) };
  }
}
