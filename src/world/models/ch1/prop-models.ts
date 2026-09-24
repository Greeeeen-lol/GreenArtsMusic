import * as THREE from 'three';
import { decal, pixelTexture, retroColor, retroTextured } from '../../materials/ps1';

/**
 * Visual geometry for ch1's fourteen small interactable props, ported from
 * a Three.js showcase built directly against this project's own dimension
 * table — every one of these sizes matches `PropSpec.size` in
 * `chapters/ch1-denial/props.ts` exactly.
 *
 * Each builder returns a `THREE.Group` in the showcase's own natural
 * convention: the object's BASE sits at local y = 0, extending upward to
 * its full height. `props.ts` positions every prop by the CENTER of its
 * bounding box (`PropSpec.offset` feeds straight into `boxFromCenter` for
 * fixed props, and has since Task 6), so `centerOnOrigin` re-homes each
 * model's origin to its own vertical middle before it is ever handed back
 * — after that, swapping a call site from the old placeholder box to one
 * of these needs no change to any offset in `props.ts`.
 */

function centerOnOrigin(base: THREE.Group, totalHeight: number): THREE.Group {
  base.position.y = -totalHeight / 2;
  const outer = new THREE.Group();
  outer.add(base);
  return outer;
}

const textures = {
  ceramicGlaze: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#d4cbb8';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#b8ad96';
    for (let i = 0; i < 30; i++) {
      ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 1);
    }
  }),
  kettleMetal: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#78828a';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 2) {
      ctx.fillStyle = y % 4 === 0 ? '#687077' : '#88939c';
      ctx.fillRect(0, y, w, 1);
    }
  }),
  jacketCanvas: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#394736';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 2) {
      ctx.fillStyle = y % 4 === 0 ? '#2e3a2b' : '#455541';
      ctx.fillRect(0, y, w, 2);
    }
  }),
  leatherBoot: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#261b14';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 25; i++) {
      ctx.fillStyle = '#3a2b22';
      ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 1);
    }
  }),
  letterPaper: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#eee4cb';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#4a443a';
    for (let y = 6; y < h - 4; y += 4) ctx.fillRect(4, y, w - 8, 1);
    ctx.fillStyle = '#992222';
    ctx.fillRect(w - 7, 2, 5, 5);
  }),
  photoFront: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#f3ede2';
    ctx.fillRect(0, 0, w, 3);
    ctx.fillRect(0, 0, 3, h);
    ctx.fillRect(w - 3, 0, 3, h);
    ctx.fillRect(0, h - 8, w, 8);
    ctx.fillStyle = '#c85a32';
    ctx.fillRect(3, 3, w - 6, 14);
    ctx.fillStyle = '#251b2e';
    ctx.fillRect(3, 17, w - 6, 7);
  }),
  photoBack: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#ded7c5';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#6e6556';
    ctx.fillRect(6, 12, 18, 1);
    ctx.fillRect(6, 16, 14, 1);
  }),
};

const mat = {
  ceramicGlaze: retroTextured(textures.ceramicGlaze),
  ceramicTeal: retroColor(0x3d6b63),
  woodDark: retroColor(0x27190f),
  kettleMetal: retroTextured(textures.kettleMetal),
  faucetMetal: retroColor(0xc8d1d9),
  faucetRed: retroColor(0x992222),
  brassKey: retroColor(0xd4af37),
  keyFob: retroColor(0x991b1b),
  jacket: retroTextured(textures.jacketCanvas),
  pillow: retroColor(0xb9b0a0),
  photoFront: retroTextured(textures.photoFront),
  photoBack: retroTextured(textures.photoBack),
  bookCover: retroColor(0x1e3a5f),
  bookPages: retroColor(0xded5c0),
  bookmarkRibbon: retroColor(0xb91c1c),
  lampBase: retroColor(0x8b6508),
  lampShade: retroColor(0xeddcb9),
  bowlGlaze: retroColor(0x7c4f32),
  bootLeather: retroTextured(textures.leatherBoot),
  bootSole: retroColor(0x141210),
  letter: retroTextured(textures.letterPaper),
};

function box(sx: number, sy: number, sz: number, m: THREE.MeshLambertMaterial): THREE.Mesh {
  return new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), m);
}
function cyl(rt: number, rb: number, h: number, seg: number, m: THREE.MeshLambertMaterial): THREE.Mesh {
  return new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
}
function at(mesh: THREE.Object3D, x: number, y: number, z: number): THREE.Object3D {
  mesh.position.set(x, y, z);
  return mesh;
}

/** Spec size 0.08 x 0.1 x 0.08. Model once; the same builder makes both
 *  `mug` and `second-mug` — two calls, two independent meshes. */
export function buildMugModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(cyl(0.032, 0.03, 0.1, 8, mat.ceramicGlaze), 0, 0.05, 0));
  g.add(at(cyl(0.026, 0.026, 0.015, 8, mat.woodDark), 0, 0.096, 0));
  g.add(at(box(0.018, 0.055, 0.012, mat.ceramicGlaze), 0.035, 0.05, 0));
  return centerOnOrigin(g, 0.1);
}

/** Spec size 0.35 x 0.55 x 0.12. */
export function buildJacketModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(box(0.35, 0.1, 0.11, mat.jacket), 0, 0.49, 0));

  const torsoGeo = new THREE.BoxGeometry(0.28, 0.45, 0.11, 2, 2, 1);
  const tp = torsoGeo.attributes.position;
  if (tp) {
    for (let i = 0; i < tp.count; i++) {
      if (tp.getY(i) < -0.1) tp.setX(i, tp.getX(i) * 1.15);
    }
    torsoGeo.computeVertexNormals();
  }
  g.add(at(new THREE.Mesh(torsoGeo, mat.jacket), 0, 0.23, 0.01));

  const sleeveL = box(0.065, 0.42, 0.08, mat.jacket);
  sleeveL.rotation.z = -0.06;
  g.add(at(sleeveL, -0.14, 0.25, 0.01));
  const sleeveR = box(0.065, 0.42, 0.08, mat.jacket);
  sleeveR.rotation.z = 0.06;
  g.add(at(sleeveR, 0.14, 0.25, 0.01));

  g.add(at(box(0.012, 0.32, 0.01, mat.brassKey), 0, 0.25, 0.066));
  return centerOnOrigin(g, 0.55);
}

/** Spec size 0.5 x 0.15 x 0.35. */
export function buildPillowModel(): THREE.Group {
  const geo = new THREE.BoxGeometry(0.5, 0.15, 0.35, 3, 2, 3);
  const p = geo.attributes.position;
  if (p) {
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      const z = p.getZ(i);
      if (y > 0.02 && Math.abs(x) < 0.18 && Math.abs(z) < 0.12) p.setY(i, y - 0.04);
    }
    geo.computeVertexNormals();
  }
  const g = new THREE.Group();
  g.add(at(new THREE.Mesh(geo, mat.pillow), 0, 0.075, 0));
  return centerOnOrigin(g, 0.15);
}

/** Spec size 0.2 x 0.02 x 0.15. Face-down: the front (photoFront) material
 *  faces up, so it is what the player would see if they could turn it
 *  over — which the game refuses. */
export function buildPhotographModel(): THREE.Group {
  const geo = new THREE.BoxGeometry(0.2, 0.014, 0.15, 2, 1, 2);
  const matArray = [
    mat.photoBack, mat.photoBack,
    mat.photoFront, mat.photoBack,
    mat.photoBack, mat.photoBack,
  ];
  const g = new THREE.Group();
  g.add(at(new THREE.Mesh(geo, matArray), 0, 0.007, 0));
  return centerOnOrigin(g, 0.02);
}

/** Spec size 0.18 x 0.22 x 0.14. */
export function buildKettleModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(cyl(0.065, 0.07, 0.14, 8, mat.kettleMetal), 0, 0.07, 0));
  const spout = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.09, 6), mat.kettleMetal);
  spout.rotation.z = -Math.PI / 3;
  g.add(at(spout, 0.065, 0.1, 0));
  g.add(at(box(0.09, 0.015, 0.02, mat.woodDark), -0.01, 0.21, 0));
  const p1 = box(0.015, 0.08, 0.02, mat.woodDark);
  p1.rotation.z = 0.15;
  g.add(at(p1, -0.05, 0.17, 0));
  const p2 = box(0.015, 0.08, 0.02, mat.woodDark);
  p2.rotation.z = -0.15;
  g.add(at(p2, 0.03, 0.17, 0));
  g.add(at(cyl(0.018, 0.018, 0.015, 6, mat.woodDark), 0, 0.145, 0));
  return centerOnOrigin(g, 0.22);
}

/** Spec size 0.25 x 0.03 x 0.2. */
export function buildDishModel(): THREE.Group {
  const g = new THREE.Group();
  const rimGeo = new THREE.CylinderGeometry(0.125, 0.1, 0.03, 8);
  rimGeo.scale(1, 1, 0.8);
  g.add(at(new THREE.Mesh(rimGeo, mat.ceramicGlaze), 0, 0.015, 0));
  const innerGeo = new THREE.CylinderGeometry(0.095, 0.08, 0.01, 8);
  innerGeo.scale(1, 1, 0.8);
  // Its top was flush with the rim's top: 2 mm proud, depth-biased, on its
  // own material so the bias doesn't reach other props sharing ceramicTeal.
  g.add(at(new THREE.Mesh(innerGeo, decal(retroColor(0x3d6b63))), 0, 0.027, 0));
  return centerOnOrigin(g, 0.03);
}

/** Spec size 0.08 x 0.02 x 0.05. */
export function buildKeysModel(): THREE.Group {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.015, 0.003, 4, 8), mat.brassKey);
  ring.rotation.x = Math.PI / 2;
  g.add(at(ring, -0.02, 0.005, 0));
  const stem1 = box(0.045, 0.003, 0.008, mat.brassKey);
  stem1.rotation.y = 0.12;
  g.add(at(stem1, 0.015, 0.005, 0.004));
  g.add(at(box(0.012, 0.003, 0.006, mat.brassKey), 0.032, 0.005, 0.01));
  const stem2 = box(0.042, 0.003, 0.008, mat.faucetMetal);
  stem2.rotation.y = -0.15;
  g.add(at(stem2, 0.015, 0.008, -0.004));
  const fob = box(0.03, 0.004, 0.045, mat.keyFob);
  fob.rotation.y = 0.45;
  g.add(at(fob, -0.025, 0.004, -0.015));
  return centerOnOrigin(g, 0.02);
}

/** Spec size 0.06 x 0.15 x 0.06. Push verb: no separate animated plunger,
 *  the water-stream toggle the showcase had was pedestal-demo flavour. */
export function buildSinkTapModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(cyl(0.02, 0.025, 0.03, 6, mat.faucetMetal), 0, 0.015, 0));
  g.add(at(cyl(0.014, 0.016, 0.1, 6, mat.faucetMetal), 0, 0.07, -0.008));
  const snout = box(0.024, 0.024, 0.045, mat.faucetMetal);
  snout.rotation.x = 0.35;
  g.add(at(snout, 0, 0.11, 0.015));
  g.add(at(cyl(0.008, 0.008, 0.035, 5, mat.faucetMetal), 0, 0.125, 0));
  g.add(at(cyl(0.022, 0.022, 0.015, 6, mat.faucetRed), 0, 0.142, 0));
  return centerOnOrigin(g, 0.15);
}

/** Spec size 0.18 x 0.08 x 0.18. */
export function buildBowlModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(cyl(0.09, 0.05, 0.08, 8, mat.bowlGlaze), 0, 0.04, 0));
  g.add(at(cyl(0.075, 0.035, 0.02, 8, mat.ceramicTeal), 0, 0.072, 0));
  return centerOnOrigin(g, 0.08);
}

/** Spec size 0.15 x 0.03 x 0.22. */
export function buildBookModel(): THREE.Group {
  // Two boards and a spine around a block of pages, touching only at edges.
  // (It was a solid cover with the pages hidden inside it and a gold strip
  // 1 mm proud of its side, which flickered through.)
  const g = new THREE.Group();
  const board = 0.004;
  const spine = 0.006;
  const w = 0.15 - spine;
  const cx = spine / 2; // boards and pages sit right of the spine
  g.add(at(box(spine, 0.03, 0.22, mat.bookCover), -0.075 + spine / 2, 0.015, 0));
  g.add(at(box(w, board, 0.22, mat.bookCover), cx, board / 2, 0));
  g.add(at(box(w, board, 0.22, mat.bookCover), cx, 0.03 - board / 2, 0));
  // Pages set 4 mm back from the fore-edge and head/tail, so they read.
  g.add(at(box(w - 0.004, 0.03 - 2 * board, 0.212, mat.bookPages), cx - 0.002, 0.015, 0));
  // Gold title band on the spine, 4 mm proud of it.
  g.add(at(box(0.004, 0.012, 0.16, mat.brassKey), -0.075 - 0.002, 0.015, 0));
  return centerOnOrigin(g, 0.03);
}

/** Spec size 0.08 x 0.01 x 0.03. */
export function buildBookmarkModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(box(0.08, 0.005, 0.03, mat.bookmarkRibbon), 0, 0.0025, 0));
  g.add(at(box(0.015, 0.005, 0.024, mat.brassKey), 0.045, 0.0025, 0));
  return centerOnOrigin(g, 0.01);
}

/** Spec size 0.15 x 0.35 x 0.15. */
export function buildLampModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(cyl(0.07, 0.075, 0.03, 6, mat.lampBase), 0, 0.015, 0));
  g.add(at(cyl(0.01, 0.01, 0.19, 5, mat.lampBase), 0, 0.125, 0));
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.075, 0.14, 8, 1, true), mat.lampShade);
  g.add(at(shade, 0, 0.265, 0));
  g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.015, 5, 4), mat.lampBase), 0, 0.345, 0));
  return centerOnOrigin(g, 0.35);
}

/** Spec size 0.2 x 0.15 x 0.35 — a left/right pair sharing the footprint. */
export function buildBootsModel(): THREE.Group {
  function single(sideSign: number): THREE.Group {
    const b = new THREE.Group();
    b.add(at(box(0.09, 0.028, 0.34, mat.bootSole), 0, 0.014, 0));
    b.add(at(box(0.082, 0.055, 0.18, mat.bootLeather), 0, 0.045, -0.07));
    b.add(at(box(0.082, 0.11, 0.14, mat.bootLeather), 0, 0.095, 0.08));
    const tongue = box(0.03, 0.08, 0.08, mat.woodDark);
    tongue.rotation.x = -0.3;
    b.add(at(tongue, 0, 0.085, 0.02));
    b.position.x = sideSign * 0.055;
    return b;
  }
  const g = new THREE.Group();
  g.add(single(-1), single(1));
  return centerOnOrigin(g, 0.15);
}

/** Spec size 0.15 x 0.01 x 0.1. */
export function buildLetterModel(): THREE.Group {
  const g = new THREE.Group();
  const geo = new THREE.BoxGeometry(0.15, 0.008, 0.1, 2, 1, 2);
  g.add(at(new THREE.Mesh(geo, mat.letter), 0, 0.004, 0));
  g.add(at(box(0.14, 0.002, 0.005, mat.woodDark), 0, 0.008, 0));
  return centerOnOrigin(g, 0.01);
}
