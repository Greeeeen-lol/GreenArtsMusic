/**
 * Every player-facing in-world string. Keyed by object id, then by the chapter
 * the line applies from. `line()` falls back to the nearest lower chapter, so an
 * object written once keeps reading correctly until it is deliberately rewritten.
 *
 * House rules, from the spec:
 *   - lowercase, always
 *   - the ex-partner is never named, described, quoted, or given a motive
 */
export type CopyEntry = Record<number, string>;

export const COPY: Record<string, CopyEntry> = {
  mug: {
    1: 'still half full. you keep meaning to wash it.',
    5: 'you washed it. you remember washing it.',
  },
  jacket: {
    1: 'not yours. you have not moved it.',
    5: 'you moved it.',
  },
  photograph: {
    1: 'face down. you know what is on it.',
  },
  window: {
    1: 'it is snowing. it is snowing in here.',
  },
  chair: {
    1: 'pulled out, like someone stood up quickly.',
    5: 'pushed in.',
  },
  'test-crate': {
    0: 'a crate. it does not mean anything yet.',
  },
  'test-fixed': {
    0: 'bolted down. some things stay.',
  },
  'test-refused': {
    0: 'you know what is on it.',
  },
};

export function line(id: string, chapter: number): string | undefined {
  const entry = COPY[id];
  if (!entry) return undefined;

  let best: number | undefined;
  for (const key of Object.keys(entry)) {
    const n = Number(key);
    if (n <= chapter && (best === undefined || n > best)) best = n;
  }
  return best === undefined ? undefined : entry[best];
}
