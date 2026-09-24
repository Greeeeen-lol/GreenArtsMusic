import * as THREE from 'three';

/**
 * The hallway's surfaces, painted to small canvases at load — ported from
 * the reference hallway's procedural textures (hex carpet, damask
 * wallpaper, mahogany, acoustic tile, four-panel doors with brass plates).
 * Zero image requests; the blockiness at 32-64 px is the look.
 *
 * The reference sprinkled `Math.random()` grain; here the grain is seeded,
 * so the carpet is the same carpet every visit.
 */

/** Small deterministic PRNG; returns floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Paint = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

/**
 * A nearest-filtered canvas texture, tiling. happy-dom has no 2D context,
 * so in tests this is a blank texture of the right size (see pixelTexture
 * in world/materials/ps1.ts for the same trade).
 */
function canvasTexture(w: number, h: number, paint: Paint, tile = true): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) paint(ctx, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  if (tile) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }
  return texture;
}

/** Console grain: nudges every pixel by up to ±amount/2, same on all channels. */
function grain(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number, seed: number): void {
  const rand = mulberry32(seed);
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() - 0.5) * amount;
    d[i] = Math.min(255, Math.max(0, d[i]! + n));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1]! + n));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2]! + n));
  }
  ctx.putImageData(img, 0, 0);
}

/** World size one repeat of each tiling texture covers, metres. */
export const TILE = {
  carpet: 0.9,
  wallpaper: 0.7,
  wood: { u: 0.5, v: 1.1 },
  ceiling: 0.6,
} as const;

/** Burgundy hex-and-diamond hotel carpet. */
export function carpetTexture(): THREE.CanvasTexture {
  return canvasTexture(64, 64, (ctx, w, h) => {
    ctx.fillStyle = '#4a0e17';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#c95e1e';
    ctx.lineWidth = 3;
    const step = 32;
    for (let x = 0; x <= w; x += step) {
      for (let y = 0; y <= h; y += step) {
        ctx.fillStyle = '#9b1f1f';
        ctx.beginPath();
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x + 12, y);
        ctx.lineTo(x, y + 10);
        ctx.lineTo(x - 12, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#d49b29';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    grain(ctx, w, h, 24, 101);
  });
}

/** Striped olive-gold damask with a small fleur stamp. */
export function wallpaperTexture(): THREE.CanvasTexture {
  return canvasTexture(64, 64, (ctx, w, h) => {
    ctx.fillStyle = '#d2c095';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#bda878';
    for (let x = 0; x < w; x += 16) ctx.fillRect(x, 0, 8, h);
    ctx.fillStyle = '#8f7b50';
    for (let x = 4; x < w; x += 16) {
      for (let y = 8; y < h; y += 16) {
        ctx.fillRect(x - 1, y - 2, 3, 5);
        ctx.fillRect(x - 2, y - 1, 5, 3);
      }
    }
    grain(ctx, w, h, 18, 202);
  });
}

/** Dark mahogany: panelling, trim, frames. */
export function woodTexture(): THREE.CanvasTexture {
  return canvasTexture(32, 64, (ctx, w, h) => {
    ctx.fillStyle = '#4a2818';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#33190e';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 3) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + 2, 20, x - 2, 40, x + 1, h);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.strokeRect(3, 3, w - 6, h - 6);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.strokeRect(4, 4, w - 8, h - 8);
  });
}

/** Acoustic ceiling tile, pitted. */
export function ceilingTexture(): THREE.CanvasTexture {
  return canvasTexture(32, 32, (ctx, w, h) => {
    ctx.fillStyle = '#8a8378';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#5a544a';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, w, h);
    ctx.fillStyle = '#47423a';
    const rand = mulberry32(303);
    for (let i = 0; i < 35; i++) {
      ctx.fillRect(Math.floor(rand() * (w - 2)) + 1, Math.floor(rand() * (h - 2)) + 1, 1, 1);
    }
  });
}

/** Ten door faces in one texture, so ten doors cost one texture. */
export const DOOR_ATLAS = { cols: 5, rows: 2, cellW: 64, cellH: 128 } as const;

/** UV rectangle [u0, v0, u1, v1] of atlas cell `i` (0-based), v up. */
export function doorCell(i: number): [number, number, number, number] {
  const { cols, rows } = DOOR_ATLAS;
  const col = i % cols;
  const row = Math.floor(i / cols);
  const u0 = col / cols;
  const v1 = 1 - row / rows;
  return [u0, v1 - 1 / rows, u0 + 1 / cols, v1];
}

/** Four-panel mahogany doors, each with a brass plate stamped `labels[i]`. */
export function doorAtlas(labels: readonly string[]): THREE.CanvasTexture {
  const { cols, rows, cellW, cellH } = DOOR_ATLAS;
  return canvasTexture(
    cols * cellW,
    rows * cellH,
    (ctx) => {
      labels.forEach((label, i) => {
        const ox = (i % cols) * cellW;
        const oy = Math.floor(i / cols) * cellH;
        ctx.fillStyle = '#3d1d11';
        ctx.fillRect(ox, oy, cellW, cellH);
        ctx.fillStyle = '#2d140a';
        ctx.fillRect(ox + 8, oy + 12, 48, 44);
        ctx.fillRect(ox + 8, oy + 68, 48, 48);
        ctx.strokeStyle = '#522918';
        ctx.lineWidth = 2;
        ctx.strokeRect(ox + 8, oy + 12, 48, 44);
        ctx.strokeRect(ox + 8, oy + 68, 48, 48);
        // brass plate
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(ox + 18, oy + 22, 28, 14);
        ctx.strokeStyle = '#8c701b';
        ctx.lineWidth = 1;
        ctx.strokeRect(ox + 18, oy + 22, 28, 14);
        ctx.fillStyle = '#111';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, ox + 32, oy + 30);
        // escutcheon and keyhole
        ctx.fillStyle = '#bfa034';
        ctx.fillRect(ox + 50, oy + 62, 5, 8);
        ctx.fillStyle = '#111';
        ctx.fillRect(ox + 52, oy + 65, 1, 3);
      });
      grain(ctx, cols * cellW, rows * cellH, 10, 404);
    },
    false,
  );
}

/** Two gilt-framed paintings stacked: landscape (top half), portrait (bottom). */
export function paintingAtlas(): THREE.CanvasTexture {
  return canvasTexture(
    64,
    96,
    (ctx, w) => {
      for (const [oy, kind] of [[0, 'landscape'], [48, 'portrait']] as const) {
        ctx.fillStyle = '#c59d3f';
        ctx.fillRect(0, oy, w, 48);
        ctx.fillStyle = '#5c4515';
        ctx.fillRect(4, oy + 4, w - 8, 40);
        if (kind === 'landscape') {
          const grad = ctx.createLinearGradient(0, oy + 6, 0, oy + 36);
          grad.addColorStop(0, '#d15d38');
          grad.addColorStop(0.5, '#deb060');
          grad.addColorStop(1, '#3b233a');
          ctx.fillStyle = grad;
          ctx.fillRect(6, oy + 6, w - 12, 36);
          ctx.fillStyle = '#1c1524';
          ctx.beginPath();
          ctx.moveTo(6, oy + 36);
          ctx.lineTo(24, oy + 18);
          ctx.lineTo(40, oy + 32);
          ctx.lineTo(50, oy + 24);
          ctx.lineTo(58, oy + 36);
          ctx.lineTo(58, oy + 42);
          ctx.lineTo(6, oy + 42);
          ctx.fill();
        } else {
          ctx.fillStyle = '#263238';
          ctx.fillRect(6, oy + 6, w - 12, 36);
          ctx.fillStyle = '#d4b79b';
          ctx.beginPath();
          ctx.arc(32, oy + 19, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#151515';
          ctx.fillRect(20, oy + 26, 24, 16);
        }
      }
    },
    false,
  );
}

/** A green EXIT sign, lit from inside. */
export function exitSignTexture(): THREE.CanvasTexture {
  return canvasTexture(
    64,
    32,
    (ctx, w, h) => {
      ctx.fillStyle = '#151515';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, w - 4, h - 4);
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('EXIT', w / 2, h / 2 + 1);
    },
    false,
  );
}

/** Frost on the far door: pale, grainy, a few brighter feathers. */
export function frostTexture(): THREE.CanvasTexture {
  return canvasTexture(
    32,
    64,
    (ctx, w, h) => {
      ctx.fillStyle = '#9fb1bf';
      ctx.fillRect(0, 0, w, h);
      const rand = mulberry32(505);
      ctx.fillStyle = '#c9d6df';
      for (let i = 0; i < 140; i++) ctx.fillRect(Math.floor(rand() * w), Math.floor(rand() * h), 2, 1);
      ctx.strokeStyle = '#e4edf2';
      ctx.lineWidth = 1;
      for (let i = 0; i < 9; i++) {
        let x = rand() * w;
        let y = rand() * h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let k = 0; k < 4; k++) {
          x += (rand() - 0.5) * 8;
          y += (rand() - 0.2) * 8;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.strokeStyle = '#6f8494';
      ctx.strokeRect(1, 1, w - 2, h - 2);
      grain(ctx, w, h, 14, 606);
    },
    false,
  );
}
