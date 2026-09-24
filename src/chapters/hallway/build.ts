import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { AABB, boxFromCenter } from '../../core/collision';
import { applyPS1Shader, decal, retroColor, retroTextured } from '../../world/materials/ps1';
import { HALL, DOOR, DOOR_SLOTS, LAMP_Z, FLICKER_LAMP, PASSAGE, type Side } from './layout';
import {
  TILE,
  carpetTexture,
  wallpaperTexture,
  woodTexture,
  ceilingTexture,
  doorAtlas,
  doorCell,
  paintingAtlas,
  exitSignTexture,
  frostTexture,
} from './textures';

/**
 * The hallway, built. Ten doors that are an album; a frost door at the far
 * end; warm lamps, one of them unsteady.
 *
 * Everything that never moves is gathered by material and merged into one
 * mesh per material, so a corridor of trim, frames, lamps and furniture
 * costs about fifteen draw calls. Merging would lose each part's texture
 * repeat, so tiling is baked into the UVs up front (`tiled`). The doors are
 * the exception: each leaf is its own mesh with its own material, so the
 * hover glow lifts one door rather than all ten, and so it can rattle.
 */

export interface DoorRig {
  track: number;
  /** Hinge. Rotating +y swings the leaf into its room. */
  pivot: THREE.Group;
  leaf: THREE.Mesh;
  knob: THREE.Mesh;
}

/** Door 01's way through: the opening in the wall, and the light behind. */
export interface Passage {
  /** Fills the doorway while door 01 is shut. Drop it from the collision
   *  list once the door is open. */
  doorway: AABB;
  /** Rises as the door opens: the light spilling out into the hall. */
  light: THREE.PointLight;
  /** Brightest the passage light gets. */
  peak: number;
}

export interface Hallway {
  group: THREE.Group;
  /** Includes the doorway box (see Passage). */
  boxes: AABB[];
  passage: Passage;
  doors: DoorRig[];
  frost: THREE.Mesh;
  flicker: { light: THREE.PointLight; glass: THREE.MeshBasicMaterial; base: number };
}

/** Warm tungsten; tuned in-browser against the reference. */
export const HALL_LIGHTING = {
  ambient: { color: 0x4a302c, intensity: 6 },
  lamp: { color: 0xffaa50, intensity: 6, distance: 8, decay: 1 },
  fog: { color: 0x120c0d, density: 0.06 },
  frost: { color: 0x9fc4e0, intensity: 1.4, distance: 3.5, decay: 1.5 },
  passage: { color: 0xfff1dc, intensity: 7, distance: 6, decay: 1 },
  exit: { color: 0x22c55e, intensity: 0.9, distance: 3, decay: 1.5 },
} as const;

const TRIM_D = 0.05;
const FRAME_W = 0.07;
const FRAME_D = 0.1;
const FROST = { width: 1.2, height: 2.3 } as const;

// ----------------------------------------------------------------------- //

/** Static geometry, sorted by material, merged at the end. */
class Buckets {
  private map = new Map<THREE.Material, THREE.BufferGeometry[]>();

  add(material: THREE.Material, geometry: THREE.BufferGeometry, matrix: THREE.Matrix4): void {
    geometry.applyMatrix4(matrix);
    let list = this.map.get(material);
    if (!list) {
      list = [];
      this.map.set(material, list);
    }
    list.push(geometry);
  }

  build(into: THREE.Group): void {
    for (const [material, list] of this.map) {
      const merged = mergeGeometries(list, false);
      for (const g of list) g.dispose();
      if (!merged) continue;
      into.add(new THREE.Mesh(merged, material));
    }
    this.map.clear();
  }
}

function at(x: number, y: number, z: number, rotY = 0, rotX = 0): THREE.Matrix4 {
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rotX, rotY, 0, 'YXZ'));
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(1, 1, 1));
}

/**
 * Scales a geometry's UVs so one texture repeat covers `tu` x `tv` metres.
 * `ou`/`ov` shift it by that many metres, so the pieces of a surface cut
 * into spans (see `spans`) carry one pattern across their seams.
 */
function tiled<T extends THREE.BufferGeometry>(g: T, w: number, h: number, tu: number, tv: number, ou = 0, ov = 0): T {
  const uv = g.getAttribute('uv') as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (ou + uv.getX(i) * w) / tu, (ov + uv.getY(i) * h) / tv);
  return g;
}

function woodBox(w: number, h: number, d: number, ou = 0): THREE.BoxGeometry {
  return tiled(new THREE.BoxGeometry(w, h, d), Math.max(w, d), h, TILE.wood.u, TILE.wood.v, ou);
}

/**
 * Longest a static surface runs in one piece. The PS1 snap moves each vertex
 * independently, and one far down the hall (or behind the camera) by a lot:
 * a wall that is two triangles thirty metres long tilts by centimetres as
 * the player walks, and the trim standing 5 cm proud of it, or a door leaf
 * 2 cm in front of that, flickers through. Short pieces keep the error small.
 */
const SPAN = 2;

/** [lo, hi] minus the `cuts`, in pieces no longer than SPAN. */
function spans(lo: number, hi: number, cuts: readonly (readonly [number, number])[] = []): [number, number][] {
  let runs: [number, number][] = [[lo, hi]];
  for (const [c0, c1] of cuts) {
    runs = runs.flatMap(([a, b]): [number, number][] =>
      c1 <= a || c0 >= b ? [[a, b]] : ([[a, c0], [c1, b]] as [number, number][]).filter(([x, y]) => y - x > 1e-6),
    );
  }
  return runs.flatMap(([a, b]) => {
    const n = Math.ceil((b - a) / SPAN - 1e-9);
    return Array.from({ length: n }, (_, i): [number, number] => [a + ((b - a) * i) / n, a + ((b - a) * (i + 1)) / n]);
  });
}

/** Remaps a UV rectangle onto [u0,v0]-[u1,v1]. */
function remapUV(g: THREE.BufferGeometry, [u0, v0, u1, v1]: readonly number[], from = 0, count?: number): void {
  const uv = g.getAttribute('uv') as THREE.BufferAttribute;
  const end = count === undefined ? uv.count : from + count;
  for (let i = from; i < end; i++) {
    uv.setXY(i, u0! + uv.getX(i) * (u1! - u0!), v0! + uv.getY(i) * (v1! - v0!));
  }
  uv.needsUpdate = true;
}

// ----------------------------------------------------------------------- //

interface Mats {
  carpet: THREE.Material;
  wallpaper: THREE.Material;
  wood: THREE.Material;
  ceiling: THREE.Material;
  brass: THREE.MeshLambertMaterial;
  metal: THREE.Material;
  glass: THREE.MeshBasicMaterial;
  alcove: THREE.Material;
  light: THREE.Material;
  painting: THREE.Material;
  pot: THREE.Material;
  frond: THREE.Material;
  silver: THREE.Material;
  crystal: THREE.Material;
  red: THREE.Material;
  exit: THREE.Material;
}

function materials(): Mats {
  return {
    carpet: retroTextured(carpetTexture()),
    wallpaper: retroTextured(wallpaperTexture()),
    wood: retroTextured(woodTexture()),
    ceiling: retroTextured(ceilingTexture()),
    brass: retroColor(0xcca03a),
    metal: retroColor(0x222225),
    glass: new THREE.MeshBasicMaterial({ color: 0xffecc2 }),
    alcove: decal(new THREE.MeshBasicMaterial({ color: 0x050405 })),
    // untonemapped, so it reads as light and not as a white-painted room
    light: new THREE.MeshBasicMaterial({ color: 0xfff6ea, toneMapped: false }),
    painting: decal(retroTextured(paintingAtlas())),
    pot: retroColor(0x944b2a),
    frond: retroColor(0x245428),
    silver: retroColor(0xcccccc),
    crystal: retroColor(0xbbddff),
    red: retroColor(0xb91c1c),
    exit: new THREE.MeshBasicMaterial({ map: exitSignTexture() }),
  };
}

// ----------------------------------------------------------------------- //

/**
 * One wall's worth of panelling, paper and trim, `length` long, built in a
 * frame whose +z faces into the hall and whose origin is the wall's
 * midpoint on the floor. The chair rail and baseboard stop at each door in
 * `doors` (frame-local x of its centre, `doorW` wide), their ends buried in
 * the door frame's posts: run on behind a shut door they would sit 2 cm
 * from its face, and the snap would push them through it.
 */
function wallRun(b: Buckets, m: Mats, frame: THREE.Matrix4, length: number, doors: readonly number[] = [], doorW: number = DOOR.width): void {
  const upper = HALL.height - HALL.wainscot;
  const half = length / 2;
  const put = (mat: THREE.Material, g: THREE.BufferGeometry, x: number, y: number, z: number): void =>
    b.add(mat, g, frame.clone().multiply(at(x, y, z)));
  const cuts = doors.map((x) => [x - doorW / 2 - FRAME_W / 2, x + doorW / 2 + FRAME_W / 2] as const);

  for (const [x0, x1] of spans(-half, half)) {
    const w = x1 - x0;
    const x = (x0 + x1) / 2;
    const ou = x0 + half;
    put(m.wood, tiled(new THREE.PlaneGeometry(w, HALL.wainscot), w, HALL.wainscot, TILE.wood.u, TILE.wood.v, ou), x, HALL.wainscot / 2, 0);
    put(m.wallpaper, tiled(new THREE.PlaneGeometry(w, upper), w, upper, TILE.wallpaper, TILE.wallpaper, ou), x, HALL.wainscot + upper / 2, 0);
    put(m.wood, woodBox(w, 0.08, TRIM_D + 0.01, ou), x, HALL.height - 0.04, (TRIM_D + 0.01) / 2); // crown
  }
  for (const [x0, x1] of spans(-half, half, cuts)) {
    const w = x1 - x0;
    const x = (x0 + x1) / 2;
    const ou = x0 + half;
    put(m.wood, woodBox(w, 0.08, TRIM_D, ou), x, HALL.wainscot, TRIM_D / 2); // chair rail
    put(m.wood, woodBox(w, 0.14, TRIM_D, ou), x, 0.07, TRIM_D / 2); // baseboard
  }
}

/** The frame of a door-shaped opening, in a wall frame as above. */
function doorFrame(b: Buckets, m: Mats, frame: THREE.Matrix4, width: number, height: number): void {
  const put = (g: THREE.BufferGeometry, x: number, y: number): void =>
    b.add(m.wood, g, frame.clone().multiply(at(x, y, FRAME_D / 2)));
  for (const s of [-1, 1]) put(woodBox(FRAME_W, height + FRAME_W, FRAME_D), s * (width / 2 + FRAME_W / 2), (height + FRAME_W) / 2);
  put(woodBox(width + FRAME_W * 2, FRAME_W, FRAME_D), 0, height + FRAME_W / 2);
}

/** A wall's frame for side `side` at hall position `z`: +z into the hall. */
function sideFrame(side: Side, z: number): THREE.Matrix4 {
  return at(side * (HALL.width / 2), 0, z, side < 0 ? Math.PI / 2 : -Math.PI / 2);
}

function buildShell(b: Buckets, m: Mats, boxes: AABB[]): void {
  const { width: W, height: H, nearZ, farZ } = HALL;
  const L = nearZ - farZ;
  const midZ = (nearZ + farZ) / 2;

  // Carpet and ceiling in spans down the hall (see SPAN). Laid flat, the carpet's plane-local
  // +y runs to -z and the ceiling's to +z; the offsets follow.
  for (const [z0, z1] of spans(farZ, nearZ)) {
    const l = z1 - z0;
    const zc = (z0 + z1) / 2;
    b.add(m.carpet, tiled(new THREE.PlaneGeometry(W, l), W, l, TILE.carpet, TILE.carpet, 0, nearZ - z1), at(0, 0, zc, 0, -Math.PI / 2));
    b.add(m.ceiling, tiled(new THREE.PlaneGeometry(W, l), W, l, TILE.ceiling, TILE.ceiling, 0, z0 - farZ), at(0, H, zc, 0, Math.PI / 2));
  }

  // A wall frame's local +x runs down -z on the left wall, up +z on the right.
  const doorsOn = (side: Side, zc: number): number[] =>
    DOOR_SLOTS.filter((s) => s.side === side && s.track !== 1).map((s) => side * (s.z - zc));

  // The right wall is one run. The left is two, with a real gap at door 01
  // so the passage behind it can be seen, and walked into, once it opens.
  wallRun(b, m, sideFrame(1, midZ), L, doorsOn(1, midZ));
  boxes.push(boxFromCenter(W / 2 + 0.1, H / 2, midZ, 0.2, H, L + 0.4));
  const one = DOOR_SLOTS[0]!;
  const gapLo = one.z - DOOR.width / 2;
  const gapHi = one.z + DOOR.width / 2;
  for (const [z0, z1] of [[farZ, gapLo], [gapHi, nearZ]] as const) {
    wallRun(b, m, sideFrame(-1, (z0 + z1) / 2), z1 - z0, doorsOn(-1, (z0 + z1) / 2));
    // padded past the end walls only, never into the gap
    const lo = z0 === farZ ? z0 - 0.2 : z0;
    const hi = z1 === nearZ ? z1 + 0.2 : z1;
    boxes.push(boxFromCenter(-(W / 2 + 0.1), H / 2, (lo + hi) / 2, 0.2, H, hi - lo));
  }
  // over the doorway: paper and crown only (the frame's header hides the seam)
  const over = H - DOOR.height;
  const f = sideFrame(-1, one.z);
  b.add(m.wallpaper, tiled(new THREE.PlaneGeometry(DOOR.width, over), DOOR.width, over, TILE.wallpaper, TILE.wallpaper), f.clone().multiply(at(0, DOOR.height + over / 2, 0)));
  b.add(m.wood, woodBox(DOOR.width, 0.08, TRIM_D + 0.01), f.clone().multiply(at(0, H - 0.04, (TRIM_D + 0.01) / 2)));

  // near end, behind the spawn; far end, the frost door's wall
  wallRun(b, m, at(0, 0, nearZ, Math.PI), W);
  wallRun(b, m, at(0, 0, farZ, 0), W, [0], FROST.width);
  boxes.push(boxFromCenter(0, H / 2, nearZ + 0.1, W, H, 0.2));
  boxes.push(boxFromCenter(0, H / 2, farZ - 0.1, W, H, 0.2));
}

function buildDoors(b: Buckets, m: Mats, group: THREE.Group): DoorRig[] {
  const atlas = doorAtlas(DOOR_SLOTS.map((s) => s.label));
  const knobGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.08, 6);
  knobGeo.rotateX(Math.PI / 2);

  return DOOR_SLOTS.map((slot, i) => {
    const frame = sideFrame(slot.side, slot.z);
    doorFrame(b, m, frame, DOOR.width, DOOR.height);
    // The locked doors are painted on a black opening; door 01 has a real
    // one (see buildPassage).
    if (slot.track !== 1) {
      b.add(m.alcove, new THREE.PlaneGeometry(DOOR.width, DOOR.height), frame.clone().multiply(at(0, DOOR.height / 2, 0.004)));
    }

    const holder = new THREE.Group();
    holder.name = `door-${slot.label}`;
    frame.decompose(holder.position, holder.quaternion, holder.scale);
    group.add(holder);

    const pivot = new THREE.Group();
    pivot.position.set(-DOOR.width / 2, 0, DOOR.depth / 2 + 0.01);
    holder.add(pivot);

    const leafGeo = new THREE.BoxGeometry(DOOR.width, DOOR.height, DOOR.depth);
    const [u0, v0, u1, v1] = doorCell(i);
    // Box faces are px, nx, py, ny, pz, nz, four vertices each. The edges
    // take a sliver of the cell's plain wood; the two broad faces the cell.
    remapUV(leafGeo, [u0 + 0.004, v0 + 0.004, u0 + 0.01, v0 + 0.01], 0, 16);
    remapUV(leafGeo, [u0, v0, u1, v1], 16, 8);
    const leaf = new THREE.Mesh(leafGeo, retroTextured(atlas));
    leaf.name = `door-leaf-${slot.label}`;
    leaf.position.set(DOOR.width / 2, DOOR.height / 2, 0);
    pivot.add(leaf);

    const knob = new THREE.Mesh(knobGeo, m.brass);
    knob.position.set(DOOR.width - 0.12, 1.05, DOOR.depth / 2 + 0.04);
    pivot.add(knob);

    return { track: slot.track, pivot, leaf, knob };
  });
}

/**
 * Behind door 01: a short passage of plain warm white, lit from inside —
 * five inward-facing planes, open on the hall side. Unlit material, so it
 * reads as light rather than as a white room.
 */
function buildPassage(b: Buckets, m: Mats, group: THREE.Group, boxes: AABB[]): Passage {
  const one = DOOR_SLOTS[0]!;
  const { depth: D, height: PH } = PASSAGE;
  const w = DOOR.width;
  const x0 = -HALL.width / 2;
  const cx = x0 - D / 2;
  const z = one.z;

  b.add(m.light, new THREE.PlaneGeometry(D, w), at(cx, 0, z, 0, -Math.PI / 2)); // floor
  b.add(m.light, new THREE.PlaneGeometry(D, w), at(cx, PH, z, 0, Math.PI / 2)); // ceiling
  b.add(m.light, new THREE.PlaneGeometry(D, PH), at(cx, PH / 2, z - w / 2, 0)); // -z side, faces +z
  b.add(m.light, new THREE.PlaneGeometry(D, PH), at(cx, PH / 2, z + w / 2, Math.PI)); // +z side
  b.add(m.light, new THREE.PlaneGeometry(w, PH), at(x0 - D, PH / 2, z, Math.PI / 2)); // end, faces +x

  // Sides inset a little: the open leaf lies along one of them.
  const inset = 0.08;
  boxes.push(boxFromCenter(cx, PH / 2, z - w / 2 + inset - 0.1, D, PH, 0.2));
  boxes.push(boxFromCenter(cx, PH / 2, z + w / 2 - inset + 0.1, D, PH, 0.2));
  boxes.push(boxFromCenter(x0 - D - 0.1, PH / 2, z, 0.2, PH, w));

  const doorway = boxFromCenter(x0 - 0.1, HALL.height / 2, z, 0.2, HALL.height, w);
  boxes.push(doorway);

  const { passage: p } = HALL_LIGHTING;
  const light = new THREE.PointLight(p.color, 0, p.distance, p.decay);
  light.position.set(x0 - 0.6, 1.6, z);
  group.add(light);
  return { doorway, light, peak: p.intensity };
}

function buildFrostDoor(b: Buckets, m: Mats, group: THREE.Group): THREE.Mesh {
  const { width: w, height: h } = FROST;
  const frame = at(0, 0, HALL.farZ, 0);
  doorFrame(b, m, frame, w, h);

  const mat = applyPS1Shader(new THREE.MeshLambertMaterial({ map: frostTexture(), emissive: 0x1d2a35 }));
  const frost = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.08), mat);
  frost.name = 'frost-door';
  frost.position.set(0, h / 2, HALL.farZ + 0.045);
  group.add(frost);

  // the EXIT sign over it, lit from inside
  b.add(m.exit, new THREE.BoxGeometry(0.8, 0.3, 0.08), at(0, h + 0.35, HALL.farZ + 0.06));

  const { frost: fl, exit } = HALL_LIGHTING;
  const glow = new THREE.PointLight(fl.color, fl.intensity, fl.distance, fl.decay);
  glow.position.set(0, 1.4, HALL.farZ + 0.7);
  group.add(glow);
  const green = new THREE.PointLight(exit.color, exit.intensity, exit.distance, exit.decay);
  green.position.set(0, h + 0.3, HALL.farZ + 0.5);
  group.add(green);
  return frost;
}

function buildLamps(b: Buckets, m: Mats, group: THREE.Group): Hallway['flicker'] {
  const { lamp } = HALL_LIGHTING;
  let flicker: Hallway['flicker'] | null = null;
  LAMP_Z.forEach((z, i) => {
    b.add(m.brass, new THREE.CylinderGeometry(0.35, 0.45, 0.12, 8), at(0, HALL.height - 0.06, z));
    const bowl = new THREE.SphereGeometry(0.26, 6, 3, 0, Math.PI * 2, 0, Math.PI / 2);
    const light = new THREE.PointLight(lamp.color, lamp.intensity, lamp.distance, lamp.decay);
    light.position.set(0, HALL.height - 0.35, z);
    group.add(light);
    if (i === FLICKER_LAMP) {
      const glass = new THREE.MeshBasicMaterial({ color: 0xffecc2 });
      const mesh = new THREE.Mesh(bowl, glass);
      mesh.position.set(0, HALL.height - 0.12, z);
      mesh.rotation.x = Math.PI;
      group.add(mesh);
      flicker = { light, glass, base: lamp.intensity };
    } else {
      b.add(m.glass, bowl, at(0, HALL.height - 0.12, z, 0, Math.PI));
    }
  });
  return flicker!;
}

function buildDressing(b: Buckets, m: Mats, boxes: AABB[]): void {
  const W = HALL.width;

  // paintings between the doors, alternating walls; atlas top half is the
  // landscape, bottom the portrait
  [9.25, 3.75, -1.75, -7.25].forEach((z, i) => {
    const side: Side = i % 2 === 0 ? -1 : 1;
    const g = new THREE.PlaneGeometry(1.0, 0.75);
    remapUV(g, i % 2 === 0 ? [0, 0.5, 1, 1] : [0, 0, 1, 0.5]);
    b.add(m.painting, g, sideFrame(side, z).multiply(at(0, 1.85, 0.006)));
  });

  // two potted palms: one at the spawn end, one down by the frost door
  for (const [x, z] of [[W / 2 - 0.36, 14.1], [-(W / 2 - 0.36), -14.6]] as const) {
    b.add(m.pot, new THREE.CylinderGeometry(0.24, 0.18, 0.5, 6), at(x, 0.25, z));
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      const leaf = new THREE.ConeGeometry(0.25, 0.7, 4);
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, a, 0.6, 'YXZ'));
      const mtx = new THREE.Matrix4().compose(
        new THREE.Vector3(x + Math.cos(a) * 0.1, 0.62, z + Math.sin(a) * 0.1),
        q,
        new THREE.Vector3(1, 1, 1),
      );
      b.add(m.frond, leaf, mtx);
    }
    boxes.push(boxFromCenter(x, 0.5, z, 0.5, 1.0, 0.5));
  }

  // room service, left out by 06
  const tx = W / 2 - 0.45;
  const tz = -0.2;
  b.add(m.metal, new THREE.CylinderGeometry(0.03, 0.03, 0.75, 4), at(tx, 0.375, tz));
  b.add(m.brass, new THREE.BoxGeometry(0.65, 0.04, 0.45), at(tx, 0.76, tz));
  b.add(m.silver, new THREE.SphereGeometry(0.12, 6, 3, 0, Math.PI * 2, 0, Math.PI / 2), at(tx - 0.08, 0.78, tz));
  b.add(m.crystal, new THREE.CylinderGeometry(0.04, 0.02, 0.12, 5), at(tx + 0.16, 0.84, tz + 0.08));
  boxes.push(boxFromCenter(tx, 0.4, tz, 0.7, 0.8, 0.5));

  // fire extinguisher on the left wall
  const ex = -W / 2 + 0.14;
  b.add(m.red, new THREE.CylinderGeometry(0.1, 0.1, 0.5, 6), at(ex, 1.4, -2.5));
  b.add(m.metal, new THREE.CylinderGeometry(0.02, 0.02, 0.15, 4), at(ex + 0.06, 1.68, -2.5));
}

export function buildHallway(): Hallway {
  const group = new THREE.Group();
  group.name = 'hallway';
  const boxes: AABB[] = [];
  const m = materials();
  const b = new Buckets();

  buildShell(b, m, boxes);
  const doors = buildDoors(b, m, group);
  const passage = buildPassage(b, m, group, boxes);
  const frost = buildFrostDoor(b, m, group);
  const flicker = buildLamps(b, m, group);
  buildDressing(b, m, boxes);
  b.build(group);

  const { ambient } = HALL_LIGHTING;
  group.add(new THREE.AmbientLight(ambient.color, ambient.intensity));

  return { group, boxes, passage, doors, frost, flicker };
}
