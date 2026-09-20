/**
 * Every hidden string on the DONE page, and where it sits.
 *
 * `x` and `y` are percentages of the viewport. `y` runs 0-100 across the whole
 * page including the part below the fold — the question is deliberately low,
 * so the light has to be carried down to it.
 *
 * House rules: lowercase throughout, and nothing here names, describes, quotes
 * or assigns motive to another person. Only absence.
 */
export interface Fragment {
  text: string;
  x: number;
  y: number;
  /** Relative type size; 1 is the base. */
  scale?: number;
}

export const ANSWER_PHRASE = "i don't know";
export const QUESTION = 'what do i do without you now?';

export const FRAGMENTS: readonly Fragment[] = [
  { text: 'ripped seams', x: 18, y: 12 },
  { text: 'silence falls like snow', x: 63, y: 9 },
  { text: 'mm, i don\'t know', x: 34, y: 21, scale: 0.9 },
  { text: 'every night it sinks so low', x: 72, y: 26 },
  { text: 'cut me out of all your dreams', x: 12, y: 33 },
  { text: 'every shadow screams your name', x: 48, y: 39, scale: 1.1 },
  { text: 'letting go feels wrong', x: 21, y: 46 },
  { text: 'holding on feels right', x: 69, y: 49 },
  { text: 'oh, i don\'t know', x: 8, y: 55, scale: 0.9 },
  { text: 'can\'t escape the light', x: 55, y: 58 },
  { text: 'broken pieces on the ground', x: 27, y: 64 },
  { text: 'stars don\'t shine the way they used to', x: 61, y: 69 },
  { text: 'i hate that i still love you', x: 16, y: 74 },
  { text: 'i don\'t know', x: 78, y: 78, scale: 0.9 },
  { text: 'i don\'t regret a thing', x: 37, y: 84 },
  { text: QUESTION, x: 50, y: 90, scale: 1.2 },
];

/** How many fragments contain the answer phrase. */
export function answerOccurrences(): number {
  return FRAGMENTS.filter((f) => f.text.includes(ANSWER_PHRASE)).length;
}
