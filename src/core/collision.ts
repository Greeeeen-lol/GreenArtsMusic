export interface AABB {
  min: [number, number, number];
  max: [number, number, number];
}

export function boxFromCenter(
  cx: number, cy: number, cz: number,
  sx: number, sy: number, sz: number,
): AABB {
  const hx = sx / 2, hy = sy / 2, hz = sz / 2;
  return { min: [cx - hx, cy - hy, cz - hz], max: [cx + hx, cy + hy, cz + hz] };
}

const EPSILON = 1e-4;

function overlapsY(box: AABB, feetY: number, height: number): boolean {
  return box.max[1] > feetY + EPSILON && box.min[1] < feetY + height - EPSILON;
}

function overlapsAxis(min: number, max: number, lo: number, hi: number): boolean {
  return max > lo + EPSILON && min < hi - EPSILON;
}

/**
 * Axis-separated move resolution. X is swept, then Z, so a diagonal move into a
 * wall slides along it rather than stopping dead.
 * Y is ignored entirely: `delta[1]` is discarded and the incoming `pos[1]` is
 * returned as-is. This game has no jumping and no gravity, and every room is flat.
 */
export function resolveMove(
  boxes: readonly AABB[],
  pos: readonly [number, number, number],
  radius: number,
  height: number,
  delta: readonly [number, number, number],
): [number, number, number] {
  let [x, y, z] = pos;
  const feetY = y;

  // --- X axis ---
  if (delta[0] !== 0) {
    let nx = x + delta[0];
    for (const b of boxes) {
      if (!overlapsY(b, feetY, height)) continue;
      if (!overlapsAxis(z - radius, z + radius, b.min[2], b.max[2])) continue;
      if (delta[0] > 0) {
        const limit = b.min[0] - radius;
        if (x <= limit + EPSILON && nx > limit) nx = limit;
      } else {
        const limit = b.max[0] + radius;
        if (x >= limit - EPSILON && nx < limit) nx = limit;
      }
    }
    x = nx;
  }

  // --- Z axis ---
  if (delta[2] !== 0) {
    let nz = z + delta[2];
    for (const b of boxes) {
      if (!overlapsY(b, feetY, height)) continue;
      if (!overlapsAxis(x - radius, x + radius, b.min[0], b.max[0])) continue;
      if (delta[2] > 0) {
        const limit = b.min[2] - radius;
        if (z <= limit + EPSILON && nz > limit) nz = limit;
      } else {
        const limit = b.max[2] + radius;
        if (z >= limit - EPSILON && nz < limit) nz = limit;
      }
    }
    z = nz;
  }

  return [x, y, z];
}
