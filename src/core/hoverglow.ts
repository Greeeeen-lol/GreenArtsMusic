import * as THREE from 'three';
import { damp } from './math';

/**
 * The hover affordance, per spec §6: "Interactables hold the player's light
 * a beat longer than the surrounding geometry — a soft rim that lingers.
 * The room communicates what matters by what refuses to let go of the
 * light." No HUD, no crosshair, no outline shader — this is the entire
 * answer to "what am I aiming at": a faint emissive lift on the hovered
 * object's own materials, nothing more.
 */

/** Peak emissive lift applied to a hovered interactable. Deliberately faint —
 *  this is the light lingering, not a highlight. */
export const HOVER_EMISSIVE = 0.22;
/** Rise is quicker than fall: the light lets go of a thing reluctantly. */
export const HOVER_RISE_LAMBDA = 9;
export const HOVER_FALL_LAMBDA = 2.2;

/** Below this distance from its target, an entry is considered settled and
 *  is skipped entirely — idle (unhovered, already-zero) entries do no work. */
const SETTLE_EPSILON = 0.001;

type EmissiveMaterial = THREE.Material & { emissive: THREE.Color };

function hasEmissive(m: THREE.Material): m is EmissiveMaterial {
  const maybe = m as unknown as { emissive?: unknown };
  return maybe.emissive instanceof THREE.Color;
}

interface GlowEntry {
  materials: EmissiveMaterial[];
  amount: number;
}

export class HoverGlow {
  private entries = new Map<string, GlowEntry>();
  // Which registered interactable id(s) currently claim a given material.
  // A material claimed by more than one id cannot represent a single
  // object's hover state, so it is never written to.
  private owners = new Map<EmissiveMaterial, Set<string>>();

  /** Traverses `object3D`, collecting every material (deduped) that has an
   *  `emissive` property — plain (non-lit-reactive) materials are ignored,
   *  since there is nothing on them to lift. */
  register(id: string, object3D: THREE.Object3D): void {
    const found = new Set<EmissiveMaterial>();
    object3D.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (m && hasEmissive(m)) found.add(m);
      }
    });

    for (const m of found) {
      let owners = this.owners.get(m);
      if (!owners) {
        owners = new Set();
        this.owners.set(m, owners);
      }
      owners.add(id);
    }

    this.entries.set(id, { materials: [...found], amount: 0 });
  }

  unregister(id: string): void {
    const entry = this.entries.get(id);
    if (entry) {
      for (const m of entry.materials) {
        m.emissive.setScalar(0);
        const owners = this.owners.get(m);
        owners?.delete(id);
        if (owners && owners.size === 0) this.owners.delete(m);
      }
    }
    this.entries.delete(id);
  }

  clear(): void {
    for (const id of [...this.entries.keys()]) this.unregister(id);
  }

  update(dtMs: number, hoveredId: string | null): void {
    const dt = dtMs / 1000;
    for (const [id, entry] of this.entries) {
      const target = id === hoveredId ? HOVER_EMISSIVE : 0;
      if (Math.abs(entry.amount - target) < SETTLE_EPSILON) continue;

      const lambda = target > entry.amount ? HOVER_RISE_LAMBDA : HOVER_FALL_LAMBDA;
      entry.amount = damp(entry.amount, target, lambda, dt);
      if (Math.abs(entry.amount - target) < SETTLE_EPSILON) entry.amount = target;

      for (const m of entry.materials) {
        // A material shared between two registered interactables cannot
        // represent one object's hover state — skip it rather than glow
        // it on behalf of whichever entry happens to iterate last.
        if ((this.owners.get(m)?.size ?? 0) > 1) continue;
        m.emissive.setScalar(entry.amount);
      }
    }
  }
}
