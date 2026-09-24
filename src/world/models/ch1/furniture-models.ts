import * as THREE from 'three';
import { pixelTexture, retroColor, retroTextured } from '../../materials/ps1';

/**
 * Visual geometry for ch1's furniture, ported from two Three.js showcases
 * built directly against this project's own dimension table. Every
 * function here returns a `THREE.Group` in LOCAL space with the floor at
 * y = 0 — the same convention `furniture.ts` already uses for `table`,
 * `chairA`/`chairB`, `bed` and `sink` — so swapping a call site from the
 * old placeholder box to one of these is a drop-in replacement.
 *
 * Every function preserves the EXACT outer envelope (footprint and, where
 * a prop already rests on it, top-surface height) that `furniture.ts`'s
 * placeholders used. Those numbers are load-bearing: `props.ts` positions
 * the mug, kettle, dish, keys, bowl, book, bookmark and lamp against them.
 * Changing a surface height here without updating every prop that sits on
 * it reintroduces the exact "buried in the tabletop" bug the burial test
 * in `tests/chapters/ch1/props.test.ts` was written to catch — that test
 * is the real guard, not this comment; run it after any change in here.
 */

const textures = {
  wood: pixelTexture(64, (ctx, w, h) => {
    ctx.fillStyle = '#533a25';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 2) {
      ctx.fillStyle = y % 4 === 0 ? '#442d1b' : '#5e432c';
      ctx.fillRect(0, y, w, 2);
      for (let x = 0; x < w; x += 4) {
        if (Math.random() > 0.6) {
          ctx.fillStyle = '#392415';
          ctx.fillRect(x, y, 3, 2);
        }
      }
    }
  }),
  sheet: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#7a2929';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if ((x + y) % 2 === 0) {
          ctx.fillStyle = '#6e2424';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }),
  counterTop: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#a89f91';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#7d7468' : '#c4bcb0';
      ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 1);
    }
  }),
  sinkMetal: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#8e969d';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 4) {
      ctx.fillStyle = y % 8 === 0 ? '#a2abb3' : '#7b8389';
      ctx.fillRect(0, y, w, 3);
    }
  }),
  castIron: pixelTexture(32, (ctx, w, h) => {
    ctx.fillStyle = '#b7b4a9';
    ctx.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 4) {
      ctx.fillStyle = '#9e998b';
      ctx.fillRect(x, 0, 1, h);
    }
    ctx.fillStyle = '#653a1a';
    ctx.fillRect(4, 28, 2, 3);
    ctx.fillRect(22, 12, 3, 2);
  }),
};

const mat = {
  wood: retroTextured(textures.wood),
  woodDark: retroColor(0x2e1e12),
  sheet: retroTextured(textures.sheet),
  counterTop: retroTextured(textures.counterTop),
  counterBase: retroColor(0x473d36),
  sinkMetal: retroTextured(textures.sinkMetal),
  faucetMetal: retroColor(0xd0d5db),
  castIron: retroTextured(textures.castIron),
  radiatorValve: retroColor(0x992222),
  brass: retroColor(0xbfa054),
  glass: retroColor(0x5c7285),
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

/** Footprint 1.2 x 0.8, top surface at world y = 0.78. */
export function buildTableModel(): THREE.Group {
  const g = new THREE.Group();
  const legH = 0.72;
  const topT = 0.06;

  g.add(at(box(1.2, topT, 0.8, mat.wood), 0, legH + topT / 2, 0));

  const railFront = at(box(1.06, 0.06, 0.03, mat.woodDark), 0, legH - 0.03, 0.34);
  const railBack = at(box(1.06, 0.06, 0.03, mat.woodDark), 0, legH - 0.03, -0.34);
  const railLeft = at(box(0.03, 0.06, 0.68, mat.woodDark), -0.53, legH - 0.03, 0);
  const railRight = at(box(0.03, 0.06, 0.68, mat.woodDark), 0.53, legH - 0.03, 0);
  g.add(railFront, railBack, railLeft, railRight);

  const legOffsets: Array<[number, number]> = [
    [-0.54, -0.34], [0.54, -0.34], [-0.54, 0.34], [0.54, 0.34],
  ];
  for (const [lx, lz] of legOffsets) g.add(at(box(0.06, legH, 0.06, mat.woodDark), lx, legH / 2, lz));

  return g;
}

/** Footprint 0.42 x 0.9 x 0.42, matches the spec exactly — no adaptation needed. */
export function buildChairModel(): THREE.Group {
  const g = new THREE.Group();
  const legX = 0.42 / 2 - 0.035 / 2;
  const legZ = 0.42 / 2 - 0.035 / 2;

  g.add(at(box(0.42, 0.03, 0.42, mat.wood), 0, 0.435, 0));

  for (const [lx, lz] of [[-legX, -legZ], [legX, -legZ], [-legX, legZ], [legX, legZ]] as const) {
    g.add(at(box(0.035, 0.42, 0.035, mat.woodDark), lx, 0.21, lz));
  }
  g.add(at(box(0.35, 0.02, 0.02, mat.woodDark), 0, 0.15, -legZ));
  g.add(at(box(0.35, 0.02, 0.02, mat.woodDark), 0, 0.15, legZ));

  g.add(at(box(0.035, 0.45, 0.035, mat.woodDark), -legX, 0.45 + 0.225, -legZ));
  g.add(at(box(0.035, 0.45, 0.035, mat.woodDark), legX, 0.45 + 0.225, -legZ));
  // Between the back posts, not across them: full width, its ends sat flush
  // with the posts' outer faces and the two woods flickered through each other.
  g.add(at(box(0.42 - 2 * 0.035, 0.07, 0.03, mat.wood), 0, 0.865, -legZ));
  for (const sx of [-0.1, 0, 0.1]) g.add(at(box(0.03, 0.35, 0.015, mat.wood), sx, 0.65, -legZ));

  return g;
}

/** Footprint 1.4 x 1.6, mattress top at world y = 0.57 (frame 0.35 + mattress 0.22). */
export function buildBedModel(): THREE.Group {
  const g = new THREE.Group();
  const frameH = 0.35;
  const mattH = 0.22;

  g.add(at(box(1.4, frameH, 1.6, mat.woodDark), 0, frameH / 2, 0));
  const postH = 0.55;
  for (const [px, pz] of [[-0.65, -0.75], [0.65, -0.75], [-0.65, 0.75], [0.65, 0.75]] as const) {
    g.add(at(box(0.08, postH, 0.08, mat.woodDark), px, postH / 2, pz));
  }
  // 1.36, not the frame's 1.4: flush sides with the frame flickered.
  g.add(at(box(1.36, 0.45, 0.05, mat.wood), 0, 0.4, -0.78));

  const mattGeo = new THREE.BoxGeometry(1.3, mattH, 1.5, 3, 2, 4);
  const p = mattGeo.attributes.position;
  if (p) {
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      const z = p.getZ(i);
      if (y > 0.02 && Math.abs(z) < 0.5) p.setY(i, y - 0.03);
    }
    mattGeo.computeVertexNormals();
  }
  g.add(at(new THREE.Mesh(mattGeo, mat.sheet), 0, frameH + mattH / 2, 0));

  return g;
}

/** Footprint 0.6 x 0.9(h) x 1.0, top surface at world y = 0.9. */
export function buildCounterModel(): THREE.Group {
  const g = new THREE.Group();
  const h = 0.9;
  g.add(at(box(0.56, h - 0.06, 0.96, mat.counterBase), 0, (h - 0.06) / 2, 0));
  g.add(at(box(0.6, 0.06, 1.0, mat.counterTop), 0, h - 0.03, 0));
  const knobGeo = new THREE.BoxGeometry(0.015, 0.06, 0.015);
  g.add(at(new THREE.Mesh(knobGeo, mat.brass), 0, 0.5, 0.49));
  return g;
}

/** Footprint 0.6 x 0.85(h) x 0.7, basin rim at world y ~ 0.85. */
export function buildSinkModel(): THREE.Group {
  const g = new THREE.Group();
  const cabH = 0.85;
  // 1 cm inside the countertop's edges: at the full 0.6 its sides were
  // flush with the countertop's where the two overlap.
  g.add(at(box(0.58, cabH, 0.7, mat.woodDark), 0, cabH / 2, 0));
  g.add(at(box(0.45, 0.08, 0.5, mat.sinkMetal), 0, cabH + 0.04, 0));
  const drain = cyl(0.03, 0.03, 0.015, 6, mat.woodDark);
  g.add(at(drain, 0, cabH + 0.09, 0));
  // No spout here: the tap is the `sink-tap` prop (props.ts), which stands
  // in exactly this spot. A second, static spout inside it clipped through.
  const knobGeo = new THREE.BoxGeometry(0.05, 0.025, 0.05);
  g.add(at(new THREE.Mesh(knobGeo, mat.faucetMetal), -0.09, cabH + 0.13, -0.2));
  g.add(at(new THREE.Mesh(knobGeo.clone(), mat.faucetMetal), 0.09, cabH + 0.13, -0.2));
  return g;
}

/** Footprint 0.45 x 0.5(h) x 0.4, top surface at world y = 0.5. */
export function buildNightstandModel(): THREE.Group {
  const g = new THREE.Group();
  const h = 0.5;
  g.add(at(box(0.45, h, 0.4, mat.wood), 0, h / 2, 0));
  g.add(at(box(0.38, 0.16, 0.02, mat.woodDark), 0, h - 0.08, 0.21));
  const knobGeo = new THREE.BoxGeometry(0.04, 0.02, 0.02);
  g.add(at(new THREE.Mesh(knobGeo, mat.brass), 0, h - 0.08, 0.225));
  return g;
}

/**
 * `furniture.ts` positions the whole holder at the shelf anchor with the
 * board offset `depth/2` on x (see the comment there on why). Depth stays
 * 0.25, board at world y = 2.15 — both load-bearing for the anchor's wall
 * clearance and for the "above head height, no AABB" rule.
 */
export function buildShelfModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(box(0.25, 0.04, 1.4, mat.wood), 0, 0, 0));
  for (const bx of [-0.55, 0.55]) {
    const bracket = new THREE.Group();
    bracket.add(at(box(0.02, 0.2, 0.02, mat.castIron), 0, -0.1, -0.1));
    bracket.add(at(box(0.02, 0.02, 0.22, mat.castIron), 0, -0.01, 0));
    const diag = box(0.018, 0.24, 0.02, mat.castIron);
    diag.rotation.x = Math.PI / 4;
    bracket.add(at(diag, 0, -0.1, -0.01));
    bracket.position.set(0, 0, bx);
    g.add(bracket);
  }
  return g;
}

/** Exact spec footprint: 0.04 x 1.0 x 1.3. */
export function buildWindowModel(): THREE.Group {
  const g = new THREE.Group();
  const w = 1.0;
  const h = 1.3;
  const depth = 0.04;
  const frameThick = 0.05;

  g.add(at(box(w, frameThick, depth, mat.woodDark), 0, h / 2 - frameThick / 2, 0));
  g.add(at(box(w, frameThick, depth, mat.woodDark), 0, -h / 2 + frameThick / 2, 0));
  g.add(at(box(frameThick, h - frameThick * 2, depth, mat.woodDark), -w / 2 + frameThick / 2, 0, 0));
  g.add(at(box(frameThick, h - frameThick * 2, depth, mat.woodDark), w / 2 - frameThick / 2, 0, 0));
  g.add(at(box(0.02, h - frameThick * 2, depth * 0.8, mat.woodDark), 0, 0, 0));
  g.add(at(box(w - frameThick * 2, 0.02, depth * 0.8, mat.woodDark), 0, 0.1, 0));

  const glass = box(w - frameThick * 2, h - frameThick * 2, 0.01, mat.glass);
  (glass.material as THREE.MeshLambertMaterial).transparent = true;
  (glass.material as THREE.MeshLambertMaterial).opacity = 0.65;
  g.add(glass);

  return g;
}

/** Exact spec footprint: 0.8 x 0.5 x 0.12. */
export function buildRadiatorModel(): THREE.Group {
  const g = new THREE.Group();
  const w = 0.8;
  const h = 0.5;
  const depth = 0.12;
  const finCount = 9;
  const finSpacing = (w - 0.08) / (finCount - 1);
  const startX = -(w - 0.08) / 2;

  for (let i = 0; i < finCount; i++) {
    g.add(at(box(0.03, h - 0.08, depth, mat.castIron), startX + i * finSpacing, h / 2, 0));
  }
  const pipeTop = cyl(0.02, 0.02, w, 6, mat.castIron);
  pipeTop.rotation.z = Math.PI / 2;
  g.add(at(pipeTop, 0, h - 0.06, 0));
  const pipeBottom = pipeTop.clone();
  g.add(at(pipeBottom, 0, 0.06, 0));
  g.add(at(box(0.04, 0.06, depth * 0.9, mat.castIron), -w / 2 + 0.08, 0.03, 0));
  g.add(at(box(0.04, 0.06, depth * 0.9, mat.castIron), w / 2 - 0.08, 0.03, 0));

  const valveStem = cyl(0.015, 0.015, 0.08, 5, mat.brass);
  valveStem.rotation.x = Math.PI / 2;
  g.add(at(valveStem, w / 2 - 0.02, h - 0.06, depth / 2 + 0.02));
  const knob = cyl(0.035, 0.035, 0.02, 6, mat.radiatorValve);
  knob.rotation.x = Math.PI / 2;
  g.add(at(knob, w / 2 - 0.02, h - 0.06, depth / 2 + 0.06));

  return g;
}

/** Small wall peg — footprint stays tiny; no AABB, above where a body reaches. */
export function buildHookModel(): THREE.Group {
  const g = new THREE.Group();
  g.add(at(box(0.06, 0.12, 0.015, mat.brass), 0, 0, 0));
  const peg = box(0.02, 0.02, 0.08, mat.brass);
  peg.rotation.x = -0.15;
  g.add(at(peg, 0, 0.01, 0.05));
  return g;
}
