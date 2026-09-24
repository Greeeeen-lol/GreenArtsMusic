import * as THREE from 'three';
import { AABB, boxFromCenter } from '../../core/collision';
import { decal, pixelTexture, retroColor, retroTextured } from '../../world/materials/ps1';
import { APARTMENT, type Apartment } from './room';
import { toHex, DRAFT_LINES } from './documents';

/**
 * The objects chapter one's puzzle layer adds to the apartment: the journal,
 * the laptop, the stopped clock, the dust under the photograph, the door's
 * five frosted panes and its hinge, the threshold beyond it, and the Seams.
 *
 * Placement is in world metres against the numbers room.ts and
 * furniture-models.ts publish: the room's inner faces sit at ±3.05, the
 * table top at y 0.78, the bed's mattress top at 0.57.
 */
export const EXTRA_IDS = ['journal', 'laptop', 'clock', 'dust', 'door', 'seams'] as const;
export type ExtraId = (typeof EXTRA_IDS)[number];

export const STAGE_NAMES = ['denial', 'anger', 'bargaining', 'depression', 'acceptance'] as const;

export interface PuzzleProps {
  group: THREE.Group;
  /** The seams, and the threshold's walls and end. */
  boxes: AABB[];
  objects: Record<ExtraId, THREE.Object3D>;
  plaqueTexture: THREE.CanvasTexture;
  /** Redraws the five panes; letters[i] === '' is still frosted. */
  setPanes(letters: readonly string[]): void;
  /** 0 closed .. 1 open. Swings the leaf outward about its hinge. */
  setDoorOpen(t: number): void;
  /** Walking past this z in the threshold ends the chapter. */
  readonly endZ: number;
  /** The middle of the doorway: past this z, you have gone out the door. */
  readonly exitZ: number;
  update(dtSeconds: number): void;
}

/** A canvas texture of any aspect (pixelTexture only makes squares). */
function canvasTexture(
  w: number,
  h: number,
  paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
): { texture: THREE.CanvasTexture; repaint: () => void } {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  const repaint = (): void => {
    // happy-dom has no 2D context (see pixelTexture); the texture still
    // bumps its version so callers can tell a repaint happened.
    const ctx = canvas.getContext('2d');
    if (ctx) paint(ctx, w, h);
    texture.needsUpdate = true;
  };
  repaint();
  return { texture, repaint };
}

function box(sx: number, sy: number, sz: number, mat: THREE.Material): THREE.Mesh {
  return new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
}

function buildJournal(): THREE.Group {
  const g = new THREE.Group();
  const cover = box(0.17, 0.02, 0.23, retroColor(0x3b1f22));
  g.add(cover);
  const pages = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 0.21),
    decal(retroTextured(
      pixelTexture(32, (ctx, w, h) => {
        ctx.fillStyle = '#c9c3b4';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#4a4540';
        // four rows of eight dots — the grid itself, too small to read here
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 8; c++) {
            if ((r * 3 + c) % 3 !== 0) ctx.fillRect(4 + c * 3, 8 + r * 4, 2, 2);
          }
        }
      }),
    )),
  );
  pages.rotation.x = -Math.PI / 2;
  // 3 mm proud of the cover, and depth-biased: at 1 mm the cover's
  // vertex snap poked through the pages.
  pages.position.y = 0.013;
  g.add(pages);
  return g;
}

function buildLaptop(): THREE.Group {
  const g = new THREE.Group();
  const shell = retroColor(0x2a2c30);
  const base = box(0.34, 0.02, 0.24, shell);
  g.add(base);
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.01, -0.12);
  hinge.rotation.x = -0.28; // tilted back past upright
  g.add(hinge);
  const lid = box(0.34, 0.22, 0.012, shell);
  lid.position.set(0, 0.11, 0);
  hinge.add(lid);
  // The screen is a light source, not a lit surface: MeshBasicMaterial so it
  // reads in the dark. HoverGlow skips it (no emissive), and the shell still
  // lifts under the player's gaze.
  const { texture } = canvasTexture(128, 96, (ctx, w, h) => {
    ctx.fillStyle = '#0b2a20';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#8fe0b8';
    ctx.font = '9px monospace';
    ctx.fillText('unsent_47.txt', 6, 12);
    ctx.fillStyle = '#6cc79c';
    ctx.font = '8px monospace';
    DRAFT_LINES.forEach((line, i) => {
      ctx.fillText(toHex(line).slice(0, 26), 6, 30 + i * 12);
    });
  });
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.19),
    new THREE.MeshBasicMaterial({ map: texture }),
  );
  // Clear of the lid's front face by more than the PS1 vertex snap can
  // wobble; at 1mm the lid poked through and the screen read as grey plastic.
  screen.position.set(0, 0.11, 0.014);
  hinge.add(screen);
  return g;
}

function buildClock(): THREE.Group {
  const g = new THREE.Group();
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.035, 16), retroColor(0x1d1f22));
  rim.rotation.z = Math.PI / 2; // axis along x: flat against the -x wall
  g.add(rim);
  const face = new THREE.Mesh(
    new THREE.CircleGeometry(0.15, 16),
    decal(retroTextured(
      pixelTexture(64, (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2;
        ctx.fillStyle = '#d8d4c8';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#2b2b2b';
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          ctx.fillRect(cx + Math.sin(a) * 26 - 1, cy - Math.cos(a) * 26 - 1, 3, 3);
        }
        // stopped at three: hour hand to 3, minute hand to 12
        ctx.fillRect(cx, cy - 1, 17, 3);
        ctx.fillRect(cx - 1, cy - 24, 2, 24);
      }),
    )),
  );
  face.rotation.y = Math.PI / 2; // faces +x, into the room
  // The rim's front is at x = 0.0175; sit clear of it, depth-biased.
  face.position.x = 0.021;
  g.add(face);
  return g;
}

function buildDust(): THREE.Mesh {
  const tex = pixelTexture(32, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(210, 205, 190, 0.55)';
    ctx.fillRect(2, 4, w - 4, 1);
    ctx.fillRect(2, h - 5, w - 4, 1);
    ctx.fillRect(2, 4, 1, h - 8);
    ctx.fillRect(w - 3, 4, 1, h - 8);
    // finger-drawn marks inside
    for (let i = 0; i < 4; i++) ctx.fillRect(6 + i * 6, 14, 4, 1);
  });
  const mat = new THREE.MeshLambertMaterial({ map: tex, transparent: true, depthWrite: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.24), mat);
  m.rotation.x = -Math.PI / 2;
  return m;
}

function buildSeams(): { group: THREE.Group; update(dt: number): void } {
  const group = new THREE.Group();
  const cloth = retroColor(0x2e2a2c);
  const torso = box(0.38, 0.42, 0.28, cloth);
  torso.position.set(0, 0.33, 0);
  torso.rotation.x = 0.35; // hunched forward, over its own lap
  group.add(torso);
  const head = box(0.17, 0.17, 0.17, cloth);
  head.position.set(0, 0.6, 0.12);
  head.rotation.x = 0.6; // looking down, never up
  group.add(head);
  const armL = box(0.08, 0.08, 0.32, cloth);
  armL.position.set(-0.16, 0.3, 0.2);
  group.add(armL);
  const armR = box(0.08, 0.08, 0.32, cloth);
  armR.position.set(0.14, 0.34, 0.2);
  armR.rotation.x = -0.4; // the pulling arm
  group.add(armR);

  // Loose threads: from the body to the floor, swaying slightly. One of them
  // runs up into the pulling hand.
  const threadMat = new THREE.LineBasicMaterial({ color: 0xd8cdb8, transparent: true, opacity: 0.9 });
  const threads: { geo: THREE.BufferGeometry; base: [number, number, number]; phase: number }[] = [];
  const ends: [number, number, number][] = [
    [0.15, 0.32, 0.36], [-0.12, 0.2, 0.15], [0.05, 0.15, 0.2],
    [-0.2, 0.25, -0.05], [0.18, 0.12, -0.1], [0.0, 0.4, 0.14],
  ];
  const floor: [number, number, number][] = [
    [0.6, 0.0, 0.7], [-0.5, 0.0, 0.45], [0.2, 0.0, 0.9],
    [-0.7, 0.0, -0.2], [0.55, 0.0, -0.35], [-0.1, 0.0, 1.1],
  ];
  ends.forEach((from, i) => {
    const to = floor[i]!;
    const geo = new THREE.BufferGeometry();
    const mid: [number, number, number] = [(from[0] + to[0]) / 2, 0.04, (from[2] + to[2]) / 2];
    geo.setAttribute('position', new THREE.Float32BufferAttribute([...from, ...mid, ...to], 3));
    group.add(new THREE.Line(geo, threadMat));
    threads.push({ geo, base: mid, phase: i * 1.7 });
  });

  let t = 0;
  return {
    group,
    update(dt: number): void {
      t += dt;
      for (const th of threads) {
        const pos = th.geo.getAttribute('position') as THREE.BufferAttribute;
        pos.setXYZ(1, th.base[0] + Math.sin(t * 0.9 + th.phase) * 0.03, th.base[1], th.base[2]);
        pos.needsUpdate = true;
      }
      armR.rotation.x = -0.4 + Math.sin(t * 1.3) * 0.25;
    },
  };
}

function paintPlaque(letters: readonly string[]) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number): void => {
    ctx.fillStyle = '#16181b';
    ctx.fillRect(0, 0, w, h);
    const cell = w / 5;
    for (let i = 0; i < 5; i++) {
      const x = i * cell + 4;
      const letter = letters[i] ?? '';
      if (letter) {
        ctx.fillStyle = '#0b0c0e';
        ctx.fillRect(x, 4, cell - 8, h - 22);
        ctx.fillStyle = '#e9d9b0';
        ctx.font = 'bold 30px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, x + (cell - 8) / 2, 4 + (h - 22) / 2);
      } else {
        // frost: pale, grainy
        ctx.fillStyle = '#9fb1bf';
        ctx.fillRect(x, 4, cell - 8, h - 22);
        ctx.fillStyle = '#c9d6df';
        for (let k = 0; k < 40; k++) {
          const px = x + ((k * 37 + i * 11) % (cell - 10));
          const py = 5 + ((k * 23 + i * 7) % (h - 24));
          ctx.fillRect(px, py, 2, 2);
        }
      }
      ctx.fillStyle = '#7d848c';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(STAGE_NAMES[i]!, x + (cell - 8) / 2, h - 5);
    }
  };
}

/**
 * The threshold: a short bare passage beyond the door that the player walks
 * into white. The frost door lives in the hallway now (chapters/hallway), so
 * this ends in a plain dark wall the whiteout swallows. Walls are boxes, so
 * nobody walks out of the world.
 */
function buildThreshold(boxes: AABB[]): { group: THREE.Group; endZ: number } {
  const group = new THREE.Group();
  const halfD = APARTMENT.depth / 2;
  const start = halfD + APARTMENT.wallThickness / 2; // 3.35
  const length = 2.2;
  const halfW = 0.55;
  const h = APARTMENT.door.height + 0.1;
  const zc = start + length / 2;

  const floor = box(halfW * 2 + 0.2, 0.1, length, retroColor(0x1b1c1e));
  floor.position.set(0, -0.05, zc);
  group.add(floor);
  const ceiling = box(halfW * 2 + 0.2, 0.1, length, retroColor(0x101113));
  ceiling.position.set(0, h + 0.05, zc);
  group.add(ceiling);
  const wallMat = retroColor(0x2a2f2c);
  for (const side of [-1, 1]) {
    const wall = box(0.1, h, length, wallMat);
    wall.position.set(side * (halfW + 0.05), h / 2, zc);
    group.add(wall);
    boxes.push(boxFromCenter(side * (halfW + 0.05), h / 2, zc, 0.1, h, length));
  }

  const endWallZ = start + length - 0.1;
  const end = box(halfW * 2, h, 0.08, wallMat);
  end.position.set(0, h / 2, endWallZ);
  group.add(end);
  boxes.push(boxFromCenter(0, h / 2, endWallZ, halfW * 2, h, 0.08));

  return { group, endZ: endWallZ - 0.9 };
}

export function buildPuzzleProps(apt: Apartment): PuzzleProps {
  const group = new THREE.Group();
  const boxes: AABB[] = [];
  const halfD = APARTMENT.depth / 2;
  const innerX = APARTMENT.width / 2 - APARTMENT.wallThickness / 2;

  // --- journal: open on the bed, where it was written in at night ---
  const journal = buildJournal();
  const [bx, , bz] = apt.anchors.bed;
  journal.position.set(bx - 0.22, 0.585, bz + 0.45);
  journal.rotation.y = 0.35;
  group.add(journal);

  // --- laptop: on the table, between the two mugs, lid up ---
  const laptop = buildLaptop();
  laptop.position.set(0, 0.79, -0.12);
  laptop.rotation.y = Math.PI; // screen toward chairA and the spawn: it's your chair

  group.add(laptop);

  // --- clock: on the -x wall, above head height, stopped ---
  const clock = buildClock();
  clock.position.set(-innerX + 0.02, 1.95, -1.2);
  group.add(clock);

  // --- dust: under the photograph (props.ts puts it at room [1.0, _, 2.6]) ---
  const dust = buildDust();
  dust.position.set(1.0, 0.004, 2.6);
  dust.visible = false;
  group.add(dust);

  // --- door: hinge the real leaf from room.ts, and hang the plaque on it ---
  const leaf = apt.doorLeaf;
  const hingeX = -APARTMENT.door.width / 2;
  const pivot = new THREE.Group();
  pivot.name = 'door-pivot';
  pivot.position.set(hingeX, 0, halfD);
  leaf.removeFromParent();
  leaf.position.set(-hingeX, APARTMENT.door.height / 2, 0);
  pivot.add(leaf);
  apt.group.add(pivot);

  let panes: readonly string[] = ['', '', '', '', ''];
  const plaque = canvasTexture(256, 64, (ctx, w, h) => paintPlaque(panes)(ctx, w, h));
  const plaqueMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.6, 0.15),
    decal(new THREE.MeshBasicMaterial({ map: plaque.texture, color: 0xb8bcc2 })),
  );
  plaqueMesh.name = 'door-plaque';
  // Room side of the leaf (the leaf's -z face), facing into the room.
  plaqueMesh.position.set(0, 1.62 - APARTMENT.door.height / 2, -APARTMENT.wallThickness / 2 - 0.004);
  plaqueMesh.rotation.y = Math.PI;
  leaf.add(plaqueMesh);

  // --- the threshold ---
  const threshold = buildThreshold(boxes);
  group.add(threshold.group);

  // --- the seams, on the floor, facing the wall, pulling ---
  const seams = buildSeams();
  const [sx, , sz] = apt.anchors.seams;
  seams.group.position.set(sx, 0, sz);
  seams.group.rotation.y = -Math.PI / 2 - 0.4; // toward the -x wall, never the player
  group.add(seams.group);
  boxes.push(boxFromCenter(sx, 0.5, sz, 0.7, 1.0, 0.7));

  return {
    group,
    boxes,
    objects: {
      journal,
      laptop,
      clock,
      dust,
      door: pivot,
      seams: seams.group,
    },
    plaqueTexture: plaque.texture,
    setPanes(letters: readonly string[]): void {
      panes = [...letters];
      plaque.repaint();
    },
    setDoorOpen(t: number): void {
      const k = Math.min(1, Math.max(0, t));
      const eased = k * k * (3 - 2 * k);
      pivot.rotation.y = -1.75 * eased;
    },
    endZ: threshold.endZ,
    exitZ: APARTMENT.depth / 2,
    update(dt: number): void {
      seams.update(dt);
    },
  };
}

export interface Snow {
  points: THREE.Points;
  update(dtSeconds: number): void;
  dispose(): void;
}

/**
 * Snow, falling indoors (spec §5 Ch1). One THREE.Points, one draw call.
 * Accumulation and burial are Plan 1d; this is just the falling.
 */
export function buildSnow(count = 700): Snow {
  const lim = APARTMENT.width / 2 - APARTMENT.wallThickness / 2 - 0.02;
  const top = APARTMENT.height - 0.02;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const phases = new Float32Array(count);
  // deterministic scatter, no Math.random: the room looks the same every visit
  let seed = 1234567;
  const rnd = (): number => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rnd() * 2 - 1) * lim;
    positions[i * 3 + 1] = rnd() * top;
    positions[i * 3 + 2] = (rnd() * 2 - 1) * lim;
    speeds[i] = 0.12 + rnd() * 0.18;
    phases[i] = rnd() * Math.PI * 2;
  }
  const geo = new THREE.BufferGeometry();
  const attr = new THREE.BufferAttribute(positions, 3);
  geo.setAttribute('position', attr);
  const mat = new THREE.PointsMaterial({
    color: 0xdfe6ee,
    size: 0.022,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  let t = 0;

  return {
    points,
    update(dt: number): void {
      t += dt;
      for (let i = 0; i < count; i++) {
        let y = positions[i * 3 + 1]! - speeds[i]! * dt;
        let x = positions[i * 3]! + Math.sin(t * 0.7 + phases[i]!) * 0.05 * dt;
        if (y < 0) y += top;
        if (x > lim) x = -lim;
        if (x < -lim) x = lim;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
      }
      attr.needsUpdate = true;
    },
    dispose(): void {
      geo.dispose();
      mat.dispose();
    },
  };
}
