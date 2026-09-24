import * as THREE from 'three';
import { AABB, boxFromCenter } from '../../core/collision';
import { Interactable, Verb } from '../../core/interact';
import { line } from '../../text/copy';
import type { FurnitureId } from './furniture';
import type { Apartment } from './room';
import {
  buildMugModel,
  buildJacketModel,
  buildPillowModel,
  buildPhotographModel,
  buildKettleModel,
  buildDishModel,
  buildKeysModel,
  buildSinkTapModel,
  buildBowlModel,
  buildBookModel,
  buildBookmarkModel,
  buildLampModel,
  buildBootsModel,
  buildLetterModel,
} from '../../world/models/ch1/prop-models';

const CHAPTER = 1;

/**
 * Eighteen interactable objects, declared as data. Every one is live and
 * silent: registered, hoverable and fully interactive from day one, with no
 * copy behind it unless the artist has already written the line — `line()`
 * returns `undefined` for an id with no entry, and `onVerb` passes that
 * straight through. That is the intended shipping state of this task, not a
 * gap to fill.
 */
export interface PropSpec {
  id: string;
  /** Which furniture node this sits on or in; 'room' for the floor. */
  on: FurnitureId | 'room';
  /** Offset from that node's origin, metres. */
  offset: [number, number, number];
  size: [number, number, number];
  verbs: readonly Verb[];
  /**
   * `staged` props are the ones the room corrects behind the player's back
   * (Plan 1d). `free` props stay exactly where they are left and are the
   * only ones that count toward `objectsReplaced`. A prop is one or the
   * other, never both — the counter is meaningless if the room is also
   * moving things.
   *
   * `fixed` props don't move at all. `window` and `radiator` are also
   * furniture nodes (see furniture.ts) — as fixed props here they reuse
   * that existing mesh and AABB rather than pushing a second one. `lamp` is
   * not furniture; it builds its own mesh, same as every other prop.
   */
  kind: 'staged' | 'free' | 'fixed';
}

export interface Props {
  group: THREE.Group;
  boxes: AABB[];
  interactables: Interactable[];
  byId: Record<string, Interactable>;
}

/** The eighteen, with ids fixed now so the artist can write against them and
 *  Plan 1d can reference them. Order matters only in that it keeps the
 *  `staged` set ('second-mug', 'chair-pulled-out', 'pillow') in that
 *  relative order — see props.test.ts. */
export const PROPS: readonly PropSpec[] = [
  // --- table: the mug that never got washed, and the one that isn't yours ---
  { id: 'mug', on: 'table', offset: [0.3, 0.83, 0.15], size: [0.08, 0.1, 0.08], verbs: ['look', 'take'], kind: 'free' },
  { id: 'second-mug', on: 'table', offset: [-0.3, 0.83, 0.15], size: [0.08, 0.1, 0.08], verbs: ['look', 'take'], kind: 'staged' },

  // --- hook: the jacket that is still not yours to move ---
  // Look only in chapter one: "not yours. you have not moved it." Moving it
  // is a later chapter's line.
  { id: 'jacket', on: 'hook', offset: [0, 1.35, 0.05], size: [0.35, 0.55, 0.12], verbs: ['look'], kind: 'free' },

  // --- chairB: pulled out, like someone stood up quickly ---
  { id: 'chair-pulled-out', on: 'chairB', offset: [0, 0.45, 0], size: [0.42, 0.9, 0.42], verbs: ['look'], kind: 'staged' },

  // --- bed: a pillow, left where it landed ---
  { id: 'pillow', on: 'bed', offset: [0, 0.645, -0.55], size: [0.5, 0.15, 0.35], verbs: ['look', 'take'], kind: 'staged' },

  // --- the floor: face down, exactly where it was dropped ---
  { id: 'photograph', on: 'room', offset: [1.0, 0.01, 2.6], size: [0.2, 0.02, 0.15], verbs: ['look', 'take'], kind: 'free' },

  // --- window: furniture-owned node, reused verbatim ---
  { id: 'window', on: 'window', offset: [0, 0, 0], size: [0.04, 1.0, 1.3], verbs: ['look'], kind: 'fixed' },

  // --- counter: the kitchenette clutter. counter's top surface is world
  // y = 0.9 (0.45 cabinet-base origin the node used to carry + the old
  // per-item offset) — kept numerically identical after furniture's
  // counter became a Group like everything else; see the burial test. ---
  { id: 'kettle', on: 'counter', offset: [0.15, 1.01, 0.38], size: [0.18, 0.22, 0.14], verbs: ['look', 'take'], kind: 'free' },
  { id: 'dish', on: 'counter', offset: [-0.1, 0.945, 0.1], size: [0.25, 0.03, 0.2], verbs: ['look', 'take'], kind: 'free' },
  { id: 'keys', on: 'counter', offset: [0.2, 0.91, -0.35], size: [0.08, 0.02, 0.05], verbs: ['look', 'take'], kind: 'free' },

  // --- sink: the tap, fixed in place ---
  { id: 'sink-tap', on: 'sink', offset: [0, 1.0, -0.2], size: [0.06, 0.15, 0.06], verbs: ['look', 'push'], kind: 'fixed' },

  // --- shelf: a bowl kept up out of the way ---
  { id: 'bowl', on: 'shelf', offset: [0.1, 2.21, 0.3], size: [0.18, 0.08, 0.18], verbs: ['look', 'take'], kind: 'free' },

  // --- nightstand: what's left of the bedtime routine. Same note as the
  // counter above — nightstand's old 0.25 origin is folded into these. ---
  { id: 'book', on: 'nightstand', offset: [0.1, 0.515, 0.05], size: [0.15, 0.03, 0.22], verbs: ['look', 'take'], kind: 'free' },
  { id: 'bookmark', on: 'nightstand', offset: [0.15, 0.535, 0.05], size: [0.08, 0.01, 0.03], verbs: ['look', 'take'], kind: 'free' },
  { id: 'lamp', on: 'nightstand', offset: [-0.12, 0.675, -0.1], size: [0.15, 0.35, 0.15], verbs: ['look'], kind: 'fixed' },

  // --- radiator: furniture-owned node, reused verbatim ---
  { id: 'radiator', on: 'radiator', offset: [0, 0, 0], size: [0.8, 0.5, 0.12], verbs: ['look'], kind: 'fixed' },

  // --- the floor, near the door ---
  { id: 'boots', on: 'room', offset: [0.6, 0.075, 2.7], size: [0.2, 0.15, 0.35], verbs: ['look', 'take'], kind: 'free' },
  { id: 'letter', on: 'room', offset: [-0.3, 0.01, 2.7], size: [0.15, 0.01, 0.1], verbs: ['look', 'take'], kind: 'free' },
];

function surface(color: number): THREE.MeshLambertMaterial {
  return new THREE.MeshLambertMaterial({ color });
}

const DEFAULT_MATERIAL = surface(0x808080);

/**
 * Real geometry for every prop that has it, from
 * `world/models/ch1/prop-models.ts`. Each builder returns a `THREE.Group`
 * already re-homed so its own local origin is the CENTER of its bounding
 * box — the same convention the old placeholder `BoxGeometry` used — so
 * plugging one in here needs no change to any `PropSpec.offset`.
 *
 * `second-mug` has no entry of its own: it calls `buildMugModel()` again,
 * a second independent instance, the same as the id's own comment always
 * said ("model once, reused for second-mug").
 *
 * Anything absent (currently nothing) falls through to a plain box via
 * `DEFAULT_MATERIAL` below — the same safety net that already existed for
 * an id with no `MATERIALS` entry, now covering "no model yet" instead of
 * "no material yet".
 */
const MODEL_BUILDERS: Partial<Record<string, () => THREE.Group>> = {
  mug: buildMugModel,
  'second-mug': buildMugModel,
  jacket: buildJacketModel,
  pillow: buildPillowModel,
  photograph: buildPhotographModel,
  kettle: buildKettleModel,
  dish: buildDishModel,
  keys: buildKeysModel,
  'sink-tap': buildSinkTapModel,
  bowl: buildBowlModel,
  book: buildBookModel,
  bookmark: buildBookmarkModel,
  lamp: buildLampModel,
  boots: buildBootsModel,
  letter: buildLetterModel,
};

/**
 * Props whose visible object furniture already built. Their entries here
 * reuse that node as `object3D` and never create a second mesh or box.
 *
 * `window` and `radiator` are furniture-owned (see the comment on
 * FurnitureId in furniture.ts). `chair-pulled-out` is the same situation
 * arriving from the other direction: the chair mesh exists, and this prop
 * is the interactable FOR it, not a second object standing in the same
 * place. Building its own box here put a plain grey 0.42 x 0.9 x 0.42
 * block on top of the chair.
 *
 * It also has to be this way for the next plan. `chair-pulled-out` is a
 * `staged` prop: the room silently resets it to a used pose while the
 * player is not looking. That reset moves the node. A bolted-on second
 * mesh would either travel with it — visibly a box, not a chair — or stay
 * behind and expose the swap outright.
 */
const REUSES_FURNITURE_NODE = new Set<string>(['window', 'radiator', 'chair-pulled-out']);

/**
 * The two `fixed` props that build a genuinely new mesh (`sink-tap`,
 * `lamp`) sit on furniture nodes that also happen to be named `AnchorId`s
 * (`sink`, `nightstand`) — the same x/z `buildFurniture` itself placed them
 * at, so reading it back from `anchors` can never drift from where that
 * furniture actually stands.
 */
const FIXED_PROP_ANCHOR: Partial<Record<FurnitureId, keyof Apartment['anchors']>> = {
  sink: 'sink',
  nightstand: 'nightstand',
};

/**
 * Builds the ch1 apartment's eighteen props, following room.ts /
 * furniture.ts's structure: a `THREE.Mesh` per prop, parented to its
 * furniture node (or this module's own group, for the floor), named with
 * its id, and wrapped in an `Interactable` whose `onVerb` always returns
 * `{ handled: true, line: line(id, 1) }` — silent when unwritten, per Task
 * 6. An `AABB` is pushed only for `fixed` props, and only for the two that
 * build a genuinely new mesh (`sink-tap`, `lamp`); `window` and `radiator`
 * reuse furniture's existing box.
 *
 * `anchors` gives the world x/z of the furniture node a fixed prop's box
 * sits on — the same source `buildFurniture` itself reads from, so a box
 * here can never drift from where that furniture actually stands.
 */
export function buildProps(
  nodes: Record<FurnitureId, THREE.Object3D>,
  anchors: Apartment['anchors'],
): Props {
  const group = new THREE.Group();
  const boxes: AABB[] = [];
  const interactables: Interactable[] = [];
  const byId: Record<string, Interactable> = {};

  for (const spec of PROPS) {
    const on = spec.on;
    let object3D: THREE.Object3D;

    if (on !== 'room' && REUSES_FURNITURE_NODE.has(spec.id)) {
      // Furniture already owns the mesh and, where it needs one, the AABB —
      // push neither here. Deliberately not gated on `kind`: the chair is a
      // `staged` prop that reuses its node, so requiring `fixed` would
      // silently fall through to building a duplicate.
      object3D = nodes[on];
    } else {
      const modelBuilder = MODEL_BUILDERS[spec.id];
      const mesh = modelBuilder
        ? modelBuilder()
        : new THREE.Mesh(new THREE.BoxGeometry(...spec.size), DEFAULT_MATERIAL);
      mesh.name = spec.id;
      mesh.position.set(...spec.offset);

      if (on === 'room') {
        group.add(mesh);
      } else {
        nodes[on].add(mesh);
      }
      object3D = mesh;

      if (spec.kind === 'fixed' && on !== 'room') {
        // Every furniture node is a Group at world y = 0 (see furniture.ts),
        // so a fixed prop's own local offset IS its position relative to
        // that origin — no per-node correction needed here any more.
        const anchorId = FIXED_PROP_ANCHOR[on];
        const [anchorX, , anchorZ] = anchorId ? anchors[anchorId] : [nodes[on].position.x, 0, nodes[on].position.z];
        const [ox, oy, oz] = spec.offset;
        boxes.push(boxFromCenter(anchorX + ox, oy, anchorZ + oz, ...spec.size));
      }
    }

    const interactable: Interactable = {
      id: spec.id,
      object3D,
      verbs: spec.verbs,
      onVerb: () => ({ handled: true, line: line(spec.id, CHAPTER) }),
    };
    interactables.push(interactable);
    byId[spec.id] = interactable;
  }

  return { group, boxes, interactables, byId };
}
