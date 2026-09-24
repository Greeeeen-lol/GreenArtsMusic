import * as THREE from 'three';
import { AABB, boxFromCenter } from '../../core/collision';
import { decal, pixelTexture, retroColor, retroTextured } from '../../world/materials/ps1';

/**
 * All dimensions in metres. The room's centre is the origin. This is a
 * single room, not a room-plus-hall — the layout (and every furniture
 * position in furniture.ts) is adopted directly from a Three.js showcase
 * built to spec, which Logan preferred over the earlier room-plus-hall
 * shell. That showcase never built an actual exit; `door` is this file's
 * own addition, cut into the south (+z) wall the showcase already labelled
 * "Door wall" in its own comments.
 */
export const APARTMENT = {
  width: 6.4,
  depth: 6.4,
  height: 2.6,
  wallThickness: 0.3,
  door: { width: 0.8, height: 2.1 },
} as const;

/**
 * Every named position later tasks place furniture, props or the player
 * against. These are mesh-placement points, not walkable positions: `shelf`
 * and `window` deliberately sit flush against (fractionally inside) their
 * wall's inner face, because they anchor wall-mounted props, not something
 * with a collision radius. Never read an anchor as "somewhere the player
 * can stand" without checking it against `boxes` first.
 */
export type AnchorId =
  | 'spawn'
  | 'table'
  | 'chairA'
  | 'chairB'
  | 'counter'
  | 'sink'
  | 'bed'
  | 'nightstand'
  | 'hook'
  | 'shelf'
  | 'window'
  | 'doorway'
  | 'seams';

export interface Apartment {
  group: THREE.Group;
  boxes: AABB[];
  anchors: Record<AnchorId, [number, number, number]>;
  /** The door leaf, named 'door-leaf'. Ch1's puzzle layer hinges it open. */
  doorLeaf: THREE.Mesh;
  /** The leaf's own AABB — the same object that is in `boxes`, so the
   *  chapter can remove it by identity when the door opens. */
  doorBox: AABB;
}

/**
 * 90s motel striping: four dark columns every eight pixels over a flat
 * green-grey. Left unrepeated on purpose — the showcase stretched one 64px
 * tile across a whole wall, which is what puts the stripes at roughly
 * 29cm apart instead of a fine pinstripe that aliases into mush at
 * distance under the lantern.
 */
function wallpaperTexture(): THREE.CanvasTexture {
  return pixelTexture(64, (ctx, w, h) => {
    ctx.fillStyle = '#3f4942';
    ctx.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 8) {
      ctx.fillStyle = '#343d37';
      ctx.fillRect(x, 0, 4, h);
    }
  });
}

/** Two-tone linoleum checker, tiled 8x8 across the floor's top face. */
function floorTexture(): THREE.CanvasTexture {
  const texture = pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#2d2d2a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#3f3e3a';
    ctx.fillRect(0, 0, w / 2, h / 2);
    ctx.fillRect(w / 2, h / 2, w / 2, h / 2);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}

/**
 * The chapter 1 apartment: one room with a door in the south wall. Shell
 * only — floor, ceiling, walls, the door and the named anchors. No
 * furniture, no props, no snow, no chapter wiring; those are later tasks.
 * Follows buildTestRoom's structure: a THREE.Group, meshes added to it, and
 * an AABB pushed for every solid the player can collide with.
 * MeshLambertMaterial only — see LANTERN_DEFAULTS in core/light.ts for why
 * (physical-unit intensity tuned against ACESFilmic tone mapping; any other
 * material response reads as black or blown out).
 */
export function buildApartment(): Apartment {
  const group = new THREE.Group();
  const boxes: AABB[] = [];

  // The shell's own look, adopted wholesale from the same showcase the
  // layout came from: pixel wallpaper on the walls, a linoleum checker on
  // the floor, flat dark ceiling. Every one of these goes through
  // `world/materials/ps1` so the shell picks up the same flat shading and
  // vertex-snap as the furniture and props standing in it — a shell built
  // from plain MeshLambertMaterial reads as a different, smoother room
  // than everything inside it.
  const wallMat = retroTextured(wallpaperTexture());
  const floorMat = retroTextured(floorTexture());
  const ceilingMat = retroColor(0x222625);
  const doorMat = retroColor(0x3a2f26);
  const rugMat = decal(retroColor(0x443026));
  const baseboardMat = retroColor(0x221a14);

  const { width, depth, height, wallThickness: t, door } = APARTMENT;
  const halfW = width / 2; // 3.2
  const halfD = depth / 2; // 3.2
  const doorHalfW = door.width / 2; // 0.4

  // --- floor and ceiling: no AABB — resolveMove ignores the Y axis
  // entirely (see core/collision.ts), so a floor/ceiling box would never
  // affect horizontal movement. buildTestRoom doesn't push one either. ---
  const floor = new THREE.Mesh(new THREE.BoxGeometry(width, t, depth), floorMat);
  floor.position.set(0, -t / 2, 0);
  group.add(floor);

  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(width, t, depth), ceilingMat);
  ceiling.position.set(0, height + t / 2, 0);
  group.add(ceiling);

  // --- -z (window), +x (bed/shelf) and -x (counter/radiator) walls: single
  // solid segments. The +z (door) wall is the trap in this task — see
  // below: a single mesh with a hole "drawn" on it has no collision hole,
  // the player walks straight through the texture and out of the world. ---
  function addWall(cx: number, cy: number, cz: number, sx: number, sy: number, sz: number): void {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), wallMat);
    mesh.position.set(cx, cy, cz);
    group.add(mesh);
    boxes.push(boxFromCenter(cx, cy, cz, sx, sy, sz));
  }

  addWall(0, height / 2, -halfD, width, height, t); // -z (window) wall
  addWall(halfW, height / 2, 0, t, height, depth); // +x (bed/shelf) wall
  addWall(-halfW, height / 2, 0, t, height, depth); // -x (counter/radiator) wall

  // +z (door) wall, in three pieces: two full-height side segments flanking
  // the doorway, plus a header above the door's own height closing the gap
  // up to the ceiling. All three get their own mesh and AABB — see the
  // comment above `addWall`.
  const sideSegWidth = halfW - doorHalfW;
  const sideSegLeftCx = -(doorHalfW + sideSegWidth / 2);
  const sideSegRightCx = doorHalfW + sideSegWidth / 2;
  addWall(sideSegLeftCx, height / 2, halfD, sideSegWidth, height, t);
  addWall(sideSegRightCx, height / 2, halfD, sideSegWidth, height, t);
  const headerHeight = height - door.height;
  addWall(0, door.height + headerHeight / 2, halfD, door.width, headerHeight, t);

  // --- the door leaf itself: a plain solid mesh for now, filling the gap
  // exactly. Plan 1d turns this into the frost door and gives it the
  // "appears once you're holding the photograph" behaviour the spec
  // describes; this task only needs an actual opening to exist, with
  // something solid standing in it. ---
  const doorLeaf = new THREE.Mesh(
    new THREE.BoxGeometry(door.width, door.height, t),
    doorMat,
  );
  doorLeaf.name = 'door-leaf';
  doorLeaf.position.set(0, door.height / 2, halfD);
  group.add(doorLeaf);
  const doorBox = boxFromCenter(0, door.height / 2, halfD, door.width, door.height, t);
  boxes.push(doorBox);

  // --- rug and skirting: dressing, not geometry the player can be stopped
  // by. Neither pushes an AABB — an 8cm skirting board the player bumps
  // into before the wall itself would just make the room feel 3cm smaller
  // on every side for no reason, and the walls already enclose the space.
  // The showcase built the north board and stopped; all four are here,
  // because the other three are visible from exactly the same angles. ---
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2, 2, 2), rugMat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.01, 0);
  group.add(rug);

  const bbHeight = 0.08;
  const bbDepth = 0.03;
  // Wall INNER faces, not the room's half-extents — the same distinction
  // the `hook`/`shelf`/`window` anchors below are commented for.
  const innerX = halfW - t / 2;
  const innerZ = halfD - t / 2;
  function addBaseboard(cx: number, cz: number, sx: number, sz: number): void {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, bbHeight, sz), baseboardMat);
    mesh.position.set(cx, bbHeight / 2, cz);
    group.add(mesh);
  }

  const innerWidth = innerX * 2; // wall-face to wall-face, not width
  const innerDepth = innerZ * 2;
  addBaseboard(0, -innerZ + bbDepth / 2, innerWidth, bbDepth); // -z (window)
  addBaseboard(-innerX + bbDepth / 2, 0, bbDepth, innerDepth); // -x (counter)
  addBaseboard(innerX - bbDepth / 2, 0, bbDepth, innerDepth); // +x (bed/shelf)
  // +z (door) wall: two runs flanking the opening, so the skirting doesn't
  // cross the doorway the wall itself deliberately leaves open.
  const bbSouthRun = innerX - doorHalfW;
  addBaseboard(-(doorHalfW + bbSouthRun / 2), innerZ - bbDepth / 2, bbSouthRun, bbDepth);
  addBaseboard(doorHalfW + bbSouthRun / 2, innerZ - bbDepth / 2, bbSouthRun, bbDepth);

  // Furniture positions are adopted directly from the showcase's own
  // placement, which is what Logan liked about the layout. `spawn` and
  // `seams` are this file's own additions — the showcase had a demo orbit
  // camera, not a player spawn, and no NPC at all.
  const anchors: Record<AnchorId, [number, number, number]> = {
    // Near the window (-z) wall, facing the table across the room.
    spawn: [0, 0, -2.4],
    table: [0, 0, 0],
    chairA: [0, 0, -0.46],
    // Chair B's resting pose is pulled out, not tucked — see furniture.ts's
    // comment on the two chairs sharing one geometry in different poses.
    chairB: [0.08, 0, 0.95],
    counter: [-2.35, 0, 1.9],
    // The sink is a drop-in basin set into the counter, not a separate
    // fixture — same position as `counter` by design.
    sink: [-2.35, 0, 1.9],
    // The showcase had both of these further out than its own walls allowed
    // — the bed's 1.4 x 1.6 footprint reached x = 2.35 and the nightstand
    // z = -2.3, both past the inner faces at x = 2.15 / z = -2.25, and the
    // two footprints overlapped each other over z = -2.05..-1.90 on top of
    // that. It never showed, because the showcase drew walls as single
    // planes and had no collision at all. Both are pulled in here: the bed
    // sits 0.03 off the +x wall, the nightstand tucks into the corner at
    // the bed's head end (the headboard is the model's -z end), and the
    // bed is pushed +z far enough that its frame clears the nightstand and
    // the book/lamp standing on it. See the "no prop buried inside a solid"
    // test in props.test.ts, which is what caught the overlap.
    // 2026-09-24: moved 0.8m further +z. At -1.75 the bed's foot sat 5cm
    // from the nightstand, leaving nowhere to stand and read the book and
    // bookmark on it (ch1's depression puzzle). See "the nightstand" test
    // in furniture.test.ts.
    bed: [2.32, 0, -0.95],
    nightstand: [2.8, 0, -2.8],
    // Flush against a wall's INNER face, fractionally further — inner face
    // is the wall's centre offset by half its thickness, not the room's
    // own half-extent (that's the wall's CENTRE line, a whole half-
    // thickness further out; using it directly here sat these three
    // anchors inside the wall itself, caught by the "anchor inside a
    // solid" test below).
    hook: [-0.8, 0, halfD - t / 2 - 0.02],
    shelf: [halfW - t / 2 - 0.02, 0, 1.4],
    window: [0, 0, -halfD + t / 2 + 0.02],
    doorway: [0, 0, halfD],
    // The seams: an NPC figure made of loose thread, sitting on the room
    // floor and pulling one thread forever — by the end of the chapter he
    // is mostly buried by the snow falling indoors (Plan 1d). Off to one
    // side of the spawn-to-door line on purpose: the player has to turn
    // and find him, not walk into him on the way to the door. See the
    // "seams anchor" tests in room.test.ts for the clearance invariants
    // (>=1m from every other anchor, >=0.6m from every wall face, off the
    // spawn->door line) a later task must not quietly violate.
    seams: [-2.0, 0, -0.4],
  };

  return { group, boxes, anchors, doorLeaf, doorBox };
}
