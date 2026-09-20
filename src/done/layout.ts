import { clamp } from '../core/math';

/**
 * Runtime layout constraints for the DONE page.
 *
 * Fragment positions in `fragments.ts` are authored as percentages of the
 * viewport, and every fragment is centred on its point with
 * `translate(-50%, -50%)`. That is fine for a short string in the middle and
 * wrong for a long string near an edge: half its width hangs off the page and
 * `overflow: hidden` eats it silently. The strings are content and the
 * viewport is variable, so the correction has to happen at runtime, against
 * measured widths — hence these pure helpers, driven from `page.ts`.
 *
 * Nothing here touches the DOM; `page.ts` measures and writes.
 */

/** Breathing room kept between a fragment and the edge of the viewport. */
export const FRAGMENT_MARGIN_PX = 8;

/**
 * Minimum clear vertical gap between the question and the answer prompt.
 * They are the emotional peak of the page and they must not touch.
 */
export const MIN_PROMPT_GAP_PX = 24;

/**
 * Horizontal centre (px) at which an element of `widthPx` sits fully inside a
 * `viewportWidthPx`-wide viewport, with `marginPx` to spare on both sides.
 *
 * An element too wide to fit even at the margins is centred instead: it will
 * still be clipped by `max-width`, but symmetrically, rather than losing its
 * whole left half.
 */
export function clampCenterX(
  centerPx: number,
  widthPx: number,
  viewportWidthPx: number,
  marginPx: number = FRAGMENT_MARGIN_PX,
): number {
  if (!Number.isFinite(centerPx) || !Number.isFinite(widthPx) || viewportWidthPx <= 0) {
    return Number.isFinite(centerPx) ? centerPx : 0;
  }
  const half = Math.max(0, widthPx) / 2;
  const min = marginPx + half;
  const max = viewportWidthPx - marginPx - half;
  if (min > max) return viewportWidthPx / 2;
  return clamp(centerPx, min, max);
}

/**
 * Vertical centre (px) at which an element of `heightPx` keeps its bottom edge
 * at or above `limitBottomPx`. Used to hold the question clear of the prompt.
 * Only ever moves the element up — a question that already clears the prompt
 * stays exactly where it was authored.
 */
export function clampCenterYAbove(
  centerPx: number,
  heightPx: number,
  limitBottomPx: number,
): number {
  if (!Number.isFinite(centerPx) || !Number.isFinite(heightPx) || !Number.isFinite(limitBottomPx)) {
    return Number.isFinite(centerPx) ? centerPx : 0;
  }
  const highest = limitBottomPx - Math.max(0, heightPx) / 2;
  return Math.min(centerPx, highest);
}

/**
 * How far the on-screen keyboard (or any other visual-viewport inset) has
 * eaten into the bottom of the layout viewport. Zero when nothing is covering
 * it, and zero when `visualViewport` is unavailable.
 */
export function keyboardInsetPx(
  layoutHeightPx: number,
  visualHeightPx: number,
  visualOffsetTopPx: number,
): number {
  const inset = layoutHeightPx - visualHeightPx - visualOffsetTopPx;
  return Number.isFinite(inset) && inset > 0 ? inset : 0;
}
