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
  'chair-pulled-out': {
    1: 'pulled out, like someone stood up quickly.',
    5: 'pushed in.',
  },
  'second-mug': {
    1: 'a second mug. you only drink from one.',
  },
  pillow: {
    1: 'still dented. you sleep on the other side.',
  },
  kettle: {
    1: 'filled for two. you pour half of it away every morning.',
  },
  dish: {
    1: 'one plate. you have been eating standing up.',
  },
  keys: {
    1: 'two sets were cut. one set is here.',
  },
  'sink-tap': {
    1: "it drips. you said you'd fix it.",
  },
  bowl: {
    1: "up high, out of the way, where you won't use it.",
  },
  book: {
    1: 'page 41. you stopped here.',
  },
  bookmark: {
    1: 'numbers, in your handwriting.',
  },
  lamp: {
    1: 'it hums. you leave it on so the room has a sound.',
  },
  radiator: {
    1: 'it knocks at three. every night, at three.',
  },
  boots: {
    1: 'yours. by the door. like you were about to go somewhere.',
  },
  letter: {
    1: 'a letter. never sent. there was nowhere to send it.',
  },
  clock: {
    1: 'stopped at three. the battery is fine. you checked. twice.',
  },
  journal: {
    1: 'a notebook. you have been keeping count of something.',
  },
  laptop: {
    1: 'the fan is still going. the drafts folder is open.',
  },
  dust: {
    1: 'the outline of where it lay. something is written inside it.',
  },
  door: {
    1: 'the door. five small panes of frosted glass, set in a row.',
  },
  seams: {
    1: 'it does not look up. it is pulling a thread out of itself.',
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

/**
 * THE SEAMS (spec §5 Ch1): a figure made of loose thread, pulling one out
 * forever. Never looks at the player. Speaks in fragments, cycled on talk.
 * Never about anyone but the player.
 */
export const SEAMS_LINES: readonly string[] = [
  "don't mind me. just pulling.",
  'it comes apart easier than it went together.',
  "five things in here you wrote and won't read. five.",
  "the room fixes itself. you don't have to.",
  "the snow doesn't melt in here. it waits.",
  'every thread i pull was holding something.',
  'you keep looking at the door. it keeps looking back.',
  "i don't know either. that's allowed.",
  'count the mugs. then stop counting.',
];

/**
 * The hallway (after chapter one). Draft copy — Logan may rewrite. The
 * album doors say nothing at all; only the frost door answers.
 */
export const HALLWAY_LINES = {
  frost: 'not yet.',
} as const;

/**
 * Logged once to the console when chapter one loads, for whoever opens the
 * devtools. Decodes to "look under the photograph".
 */
export const DATAMINER_HEX = [...'look under the photograph']
  .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
  .join(' ');

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
