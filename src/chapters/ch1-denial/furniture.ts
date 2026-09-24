import * as THREE from 'three';
import { AABB, boxFromCenter } from '../../core/collision';
import { APARTMENT, Apartment } from './room';
import {
  buildTableModel,
  buildChairModel,
  buildBedModel,
  buildCounterModel,
  buildSinkModel,
  buildNightstandModel,
  buildShelfModel,
  buildWindowModel,
  buildRadiatorModel,
  buildHookModel,
} from '../../world/models/ch1/furniture-models';

/**
 * The non-interactive dressing that turns the ch1 apartment shell into a
 * room someone lived in: table, two chairs, bed, kitchenette counter and
 * sink, a wall shelf, a nightstand, a window, a radiator and a coat hook.
 *
 * `window`, `radiator` and `hook` are also entries in Task 6's interactable
 * `PropSpec.on` union — by design. Furniture owns the mesh and the AABB for
 * every id here; Task 6's fixed props reuse the matching `nodes[id]` as
 * their own `object3D` and push no boxes of their own, so these three must
 * be real, correctly named entries and nothing else may claim them.
 *
 * Every model here is a `THREE.Group` whose children carry their real
 * height as a LOCAL offset (floor at y = 0), never a single Mesh
 * positioned at its own vertical centre — `place()` below relies on that
 * uniformity, and so does every prop in `props.ts` that sits on one of
 * these surfaces. See `src/world/models/ch1/furniture-models.ts` for the
 * geometry and the exact surface heights each one preserves.
 */
export type FurnitureId =
  | 'table' | 'chairA' | 'chairB' | 'bed' | 'counter' | 'sink'
  | 'shelf' | 'nightstand' | 'window' | 'radiator' | 'hook';

export interface Furniture {
  group: THREE.Group;
  boxes: AABB[];
  nodes: Record<FurnitureId, THREE.Object3D>;
}

/**
 * Builds the ch1 apartment's furniture, following buildApartment /
 * buildTestRoom's structure: a THREE.Group, meshes added to it, and an
 * AABB pushed via `boxFromCenter` for every solid a body would actually be
 * stopped by. MeshLambertMaterial only — see room.ts and LANTERN_DEFAULTS
 * in core/light.ts for why.
 *
 * Anchors are mesh-placement points, not walkable positions (see the
 * comment on `AnchorId` in room.ts) — every node here is positioned
 * directly against its anchor's x/z, never re-derived. `radiator` has no
 * matching AnchorId, so it is placed from `APARTMENT`'s own wall geometry
 * instead, flush against the main room's back wall, clear of every anchor
 * and of every other piece's footprint.
 */
export function buildFurniture(anchors: Apartment['anchors']): Furniture {
  const group = new THREE.Group();
  const boxes: AABB[] = [];
  const nodes = {} as Record<FurnitureId, THREE.Object3D>;

  // `y` is always 0: every model above is a Group whose children already
  // carry their real height as a local offset.
  function place(id: FurnitureId, node: THREE.Object3D, x: number, z: number, rotY = 0): void {
    node.position.set(x, 0, z);
    node.rotation.y = rotY;
    group.add(node);
    nodes[id] = node;
  }

  // --- table: footprint 1.2 x 0.8, top surface at world y = 0.78 ---
  {
    const [ax, , az] = anchors.table;
    place('table', buildTableModel(), ax, az);
    boxes.push(boxFromCenter(ax, 0.39, az, 1.2, 0.78, 0.8));
  }

  // --- chairs: identical geometry, placed in different poses. Plan 1d
  // silently resets one to a "used" pose behind the player's back; if the
  // two chairs were anything but the same geometry in a different
  // transform, that reset would visibly swap the object and the effect
  // would die. Each call to buildChairModel() is a fresh instance — never
  // share one Group between chairA and chairB. ---
  {
    const [ax, , az] = anchors.chairA;
    // Tucked in, facing the table (the chair's backrest is built along its
    // own local -z, so rotation 0 opens its seat toward +z, toward the
    // table).
    place('chairA', buildChairModel(), ax, az, 0);
    boxes.push(boxFromCenter(ax, 0.45, az, 0.42, 0.9, 0.42));
  }
  {
    const [ax, , az] = anchors.chairB;
    // Pulled out and turned, like someone stood up quickly.
    place('chairB', buildChairModel(), ax, az, Math.PI - 0.32);
    boxes.push(boxFromCenter(ax, 0.45, az, 0.42, 0.9, 0.42));
  }

  // --- bed: footprint 1.4 x 1.6, mattress top at world y = 0.57 ---
  {
    const [ax, , az] = anchors.bed;
    place('bed', buildBedModel(), ax, az);
    boxes.push(boxFromCenter(ax, 0.285, az, 1.4, 0.57, 1.6));
  }

  // --- counter and sink: a short kitchenette run against the -x wall.
  // Depth (x, perpendicular to that wall) stays under the anchors' ~0.32m
  // clearance to the wall's inner face so neither clips into it. ---
  {
    const [ax, , az] = anchors.counter;
    place('counter', buildCounterModel(), ax, az);
    boxes.push(boxFromCenter(ax, 0.45, az, 0.6, 0.9, 1.0));
  }
  {
    const [ax, , az] = anchors.sink;
    place('sink', buildSinkModel(), ax, az);
    boxes.push(boxFromCenter(ax, 0.425, az, 0.6, 0.85, 0.7));
  }

  // --- nightstand: footprint 0.45 x 0.4, top surface at world y = 0.5 ---
  {
    const [ax, , az] = anchors.nightstand;
    place('nightstand', buildNightstandModel(), ax, az);
    boxes.push(boxFromCenter(ax, 0.25, az, 0.45, 0.5, 0.4));
  }

  // --- shelf: wall-mounted, above head height, on the +x (east) wall. Its
  // back face sits at the anchor's x (already flush against that wall's
  // inner face per room.ts), and the board extends INTO the room from
  // there — negative local x, since "into the room" from the east wall is
  // -x — rather than being centred on the anchor, since the anchor only
  // clears the wall by ~0.025m and a centred 0.25m-deep board would clip
  // through it. Above head height, so no AABB: nothing should be stopped
  // by it. ---
  {
    const [ax, , az] = anchors.shelf;
    const shelfNode = buildShelfModel();
    shelfNode.position.set(-0.25 / 2, 2.15, 0);
    const holder = new THREE.Group();
    holder.add(shelfNode);
    place('shelf', holder, ax, az);
  }

  // --- window: a thin pane, flush in the -z (north) wall face. The
  // model's thin axis is already local Z, so it needs no rotation to sit
  // flush against a wall whose own face normal is Z. The wall's own AABB
  // already blocks this space, so no separate box for the glass. ---
  {
    const [ax, , az] = anchors.window;
    const windowNode = buildWindowModel();
    windowNode.position.set(0, 1.5, 0);
    const holder = new THREE.Group();
    holder.add(windowNode);
    place('window', holder, ax, az);
  }

  // --- radiator: no AnchorId names it, so it is placed directly from
  // APARTMENT's own wall geometry — flush against the -x (west) wall,
  // clear of the counter/sink run further along the same wall. The model
  // is built with its fins spread along local X and its thin protruding
  // depth along local Z; mounted flush on an X-facing wall it needs a 90°
  // turn so that depth becomes the world-X protrusion into the room and
  // the fin spread runs along world Z instead — the AABB below has its x
  // and z sizes swapped from the model's own local footprint to match.
  // Low and close to the wall, but still body-height: a real radiator
  // stops you, so it gets an AABB (unlike the shelf, which is above head
  // height). ---
  {
    const halfW = APARTMENT.width / 2;
    const wallInnerX = -halfW + APARTMENT.wallThickness / 2;
    const protrusion = 0.12;
    const rx = wallInnerX + protrusion / 2;
    const rz = -1.6;
    place('radiator', buildRadiatorModel(), rx, rz, Math.PI / 2);
    boxes.push(boxFromCenter(rx, 0.25, rz, protrusion, 0.5, 0.8));
  }

  // --- hook: a small coat peg on the +z (door) wall, flush and well above
  // where a body would ever touch it. No AABB. ---
  {
    const [ax, , az] = anchors.hook;
    const hookNode = buildHookModel();
    hookNode.position.set(0, 1.7, 0);
    const holder = new THREE.Group();
    holder.add(hookNode);
    place('hook', holder, ax, az, Math.PI);
  }

  return { group, boxes, nodes };
}
