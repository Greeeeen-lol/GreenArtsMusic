export function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Framerate-independent exponential approach. `lambda` is the rate constant:
 * higher converges faster. Equivalent to lerp with an exponential factor, so
 * two half-steps equal one whole step.
 */
export function damp(current: number, target: number, lambda: number, dtSeconds: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * dtSeconds));
}

export interface AccumulatorResult {
  steps: number;
  remainderMs: number;
}

/**
 * Fixed-timestep accumulator. Returns how many fixed steps to run this frame
 * and the leftover time to carry. After a long stall (tab backgrounded) the
 * backlog is dropped rather than replayed, so the sim never death-spirals.
 */
export function stepAccumulator(
  accMs: number,
  dtMs: number,
  fixedMs: number,
  maxSteps: number,
): AccumulatorResult {
  let acc = accMs + dtMs;
  let steps = 0;
  while (acc >= fixedMs && steps < maxSteps) {
    acc -= fixedMs;
    steps++;
  }
  if (steps === maxSteps) acc = 0;
  return { steps, remainderMs: acc };
}
