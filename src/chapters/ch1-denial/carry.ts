/**
 * The player can hold one object. Putting a free prop back where it started
 * increments `save.objectsReplaced` — a tidying instinct the game never asks
 * for and never acknowledges (spec §5 Ch1).
 *
 * Plain triples, not THREE.Vector3: this module stays engine-free so it can
 * be tested without a renderer.
 */
export type Vec3 = readonly [number, number, number];

/** How close to its origin a thing must land to count as put back. An arm's
 *  length of slop: this is a feeling, not a puzzle. */
export const REPLACE_EPSILON_M = 0.35;

export interface PlaceOutcome {
  placed: string;
  /** True only the FIRST time this id lands back near where it started. */
  replaced: boolean;
}

export class CarryState {
  private heldId: string | null = null;
  private heldOrigin: Vec3 | null = null;
  private counted = new Set<string>();

  get held(): string | null {
    return this.heldId;
  }

  get origin(): Vec3 | null {
    return this.heldOrigin;
  }

  take(id: string, origin: Vec3): boolean {
    if (this.heldId !== null) return false;
    this.heldId = id;
    this.heldOrigin = origin;
    return true;
  }

  place(at: Vec3): PlaceOutcome | null {
    const id = this.heldId;
    const origin = this.heldOrigin;
    if (id === null || origin === null) return null;
    this.heldId = null;
    this.heldOrigin = null;
    const d = Math.hypot(at[0] - origin[0], at[1] - origin[1], at[2] - origin[2]);
    const replaced = d <= REPLACE_EPSILON_M && !this.counted.has(id);
    if (replaced) this.counted.add(id);
    return { placed: id, replaced };
  }

  letGo(at: Vec3): PlaceOutcome | null {
    return this.place(at);
  }
}
