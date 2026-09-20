import { clamp } from '../core/math';

/**
 * Radius of the light, in vmin so it reads the same on a phone in portrait as
 * on a desktop in landscape. Big enough that moving the pointer feels like
 * sweeping a torch, small enough that the page still has to be searched.
 */
export const LIGHT_RADIUS_VMIN = 30;

export interface LightPosition {
  xPct: number;
  yPct: number;
}

/** Two decimals is far finer than a soft 30vmin edge can show, and keeps the
 *  per-frame mask string short. */
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function toPercent(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
): LightPosition {
  const w = width > 0 ? width : 1;
  const h = height > 0 ? height : 1;
  // Non-finite input would reach the CSS string as `NaN%`, which is invalid.
  // A browser drops an invalid mask-image silently, so the whole page would
  // render black with no fragments and no error. Guard it here.
  const x = Number.isFinite(clientX) ? clientX : 0;
  const y = Number.isFinite(clientY) ? clientY : 0;
  return {
    xPct: round2(clamp((x / w) * 100, 0, 100)),
    yPct: round2(clamp((y / h) * 100, 0, 100)),
  };
}

/**
 * The CSS mask that does the revealing. Soft-edged on purpose: a hard circle
 * reads as a spotlight cursor, a soft one reads as a light in a dark room.
 */
export function maskValue(pos: LightPosition, radiusVmin: number): string {
  return (
    `radial-gradient(circle ${radiusVmin}vmin at ${pos.xPct}% ${pos.yPct}%, ` +
    'rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.25) 70%, transparent 100%)'
  );
}
