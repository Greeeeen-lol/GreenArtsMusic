/** How long a single letter takes to fall off the baseline. */
export const COLLAPSE_LETTER_MS = 420;
/** Gap between one letter starting to fall and the next. */
export const COLLAPSE_STAGGER_MS = 260;

export interface LetterFall {
  char: string;
  delayMs: number;
  durationMs: number;
  rotateDeg: number;
}

/** Deterministic, seeded, no dependencies. Same seed, same fall, every time. */
function pseudoRandom(seed: number, index: number): number {
  const x = Math.sin(seed * 127.1 + index * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The word does not shatter — it gives up. Letters come off the baseline in
 * reading order, each tilting a little differently on the way down.
 */
export function collapsePlan(word: string, seed = 3): LetterFall[] {
  return [...word].map((char, i) => ({
    char,
    delayMs: i * COLLAPSE_STAGGER_MS,
    durationMs: COLLAPSE_LETTER_MS,
    rotateDeg: Math.round((pseudoRandom(seed, i) * 2 - 1) * 24),
  }));
}

export function collapseTotalMs(word: string): number {
  if (word.length === 0) return 0;
  return (word.length - 1) * COLLAPSE_STAGGER_MS + COLLAPSE_LETTER_MS;
}
