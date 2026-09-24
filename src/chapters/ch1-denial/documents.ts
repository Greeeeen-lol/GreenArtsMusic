/**
 * The five things in the room the narrator wrote and won't read, as text.
 *
 * Every cipher is BUILT from its answer here rather than typed out by hand,
 * so the documents cannot drift from the puzzle table in puzzles.ts; the
 * tests decode each one the way a player would and check the result.
 *
 * House rules: lowercase; nothing names, describes, quotes or assigns motive
 * to anyone else. Everything here was written by "you".
 */
export interface Doc {
  title: string;
  /** Preformatted; rendered with white-space: pre. */
  body: string;
}

/** 8-bit ASCII per letter, ● for 1 (a night slept) and ○ for 0. */
export function toDots(word: string): string[] {
  return [...word].map((c) =>
    c.charCodeAt(0).toString(2).padStart(8, '0').replace(/1/g, '●').replace(/0/g, '○'),
  );
}

export function toHex(line: string): string {
  return [...line].map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
}

/** Shifts lowercase letters round the alphabet; anything else is left alone. */
export function caesar(word: string, shift: number): string {
  return [...word]
    .map((c) => {
      const i = c.charCodeAt(0) - 97;
      if (i < 0 || i > 25) return c;
      return String.fromCharCode(((((i + shift) % 26) + 26) % 26) + 97);
    })
    .join('');
}

// --- 1 · denial · the journal ------------------------------------------

export const JOURNAL: Doc = {
  title: 'a notebook, left open on the bed',
  body: [
    'nights since.',
    '● slept   ○ didn\'t',
    '',
    ...toDots('ever'),
    '',
    'it\'s fine. it\'s only been a few nights.',
  ].join('\n'),
};

// --- 2 · anger · the laptop ------------------------------------------------

export const DRAFT_LINES: readonly string[] = [
  'nothing i type survives',
  'one more draft, then sleep',
  'i hate how loud the quiet is',
  'screaming into a closed lid',
  'every word, deleted',
];

export const LAPTOP: Doc = {
  title: 'drafts/unsent_47.txt',
  body: [
    'sent: 0   deleted: 46   encoding: hex',
    '',
    ...DRAFT_LINES.map(toHex),
    '',
    'you only ever get the first letter out before you delete it.',
  ].join('\n'),
};

// --- 3 · bargaining · the letter, keyed by the clock -----------------------

export const CLOCK_SHIFT = 3;

export const LETTER: Doc = {
  title: 'a letter, never sent',
  body: [
    'if i fix the tap.',
    'if i learn to make it properly.',
    'if i stop checking.',
    'if i\'m better. if i\'m quieter. if i\'m more.',
    '',
    `          ${caesar('deal', CLOCK_SHIFT)}`,
    '',
    'turn it back. as far as the clock did.',
  ].join('\n'),
};

export const CLOCK_LINE = 'stopped at three. the battery is fine. you checked. twice.';

// --- 4 · depression · the book and its bookmark ----------------------------

export const BOOK_LINES: readonly string[] = [
  'the rooms kept their shape after everyone left.',
  'every morning the kettle was filled for two',
  'out of habit, and poured out, mostly untouched.',
  'nothing moved unless it was made to move.',
  'the snow came in through a window no one would',
  'close, and settled on the table, patient,',
  'the way you wait when you have nowhere',
  'else to be. the clocks ran, then they didn\'t.',
  'somebody should have noticed. nobody did.',
  'it was not sadness exactly. it was the shape of it.',
];

export const BOOKMARK_REFS: readonly (readonly [number, number])[] = [
  [2, 1], [2, 2], [6, 7], [1, 1], [7, 3],
];

export const BOOK: Doc = {
  title: 'page 41. you stopped here.',
  body: BOOK_LINES.map((l, i) => `${String(i + 1).padStart(2)}  ${l}`).join('\n'),
};

export const BOOKMARK: Doc = {
  title: 'a bookmark',
  body: [
    'in your handwriting:',
    '',
    `   ${BOOKMARK_REFS.map(([l, w]) => `${l}·${w}`).join('   ')}`,
  ].join('\n'),
};

// --- 5 · acceptance · the dust under the photograph ------------------------

export const DUST: Doc = {
  title: 'where the photograph was',
  body: [
    'the dust kept its outline. inside it, written with a finger:',
    '',
    `   ${[...'done'].map((c) => c.charCodeAt(0)).join('  ')}`,
    '',
    'you wrote this. you don\'t remember writing it.',
    'not everything is ones and zeros.',
  ].join('\n'),
};
