import { normalizeAnswer } from '../../done/gate';

/**
 * Chapter one's puzzle layer, engine-free.
 *
 * Denial is the stage that holds all the others unopened, so the room hides
 * five things the narrator wrote and will not read — one per stage of grief.
 * Each is a small cipher. Each decodes to a word, and the words' first
 * letters, in stage order, spell the thing denial keeps out: `ended`. The
 * door asks for it last.
 *
 * All copy is canonical in docs/superpowers/specs/2026-09-23-ch1-puzzles-design.md.
 */
export type PuzzleId = 'journal' | 'laptop' | 'letter' | 'book' | 'dust';
export type Stage = 'denial' | 'anger' | 'bargaining' | 'depression' | 'acceptance';
export type Tier = 1 | 2 | 3;

export interface Puzzle {
  id: PuzzleId;
  stage: Stage;
  question: string;
  /** Already normalised (see normalizeAnswer). */
  answers: readonly string[];
  letter: string;
  /** Tier 3 is the answer itself: nobody gets walled out of the song. */
  hints: readonly [string, string, string];
  solvedLine: string;
}

export const PUZZLES: readonly Puzzle[] = [
  {
    id: 'journal',
    stage: 'denial',
    question: "how long did you say you'd wait?",
    answers: ['ever', 'forever'],
    letter: 'e',
    hints: [
      'two kinds of night. only two. what else only counts to two?',
      '● is 1. ○ is 0. eight to a line, one letter a line.',
      'ever.',
    ],
    solvedLine: 'ever. the first pane on the door clears.',
  },
  {
    id: 'laptop',
    stage: 'anger',
    question: 'and what is all of it?',
    answers: ['noise'],
    letter: 'n',
    hints: [
      "it isn't broken. it's hex. two characters, one letter.",
      'decode each line. keep only what you typed first.',
      'noise.',
    ],
    solvedLine: 'noise. the laptop fan stops. a second pane clears.',
  },
  {
    id: 'letter',
    stage: 'bargaining',
    question: 'what are you offering?',
    answers: ['deal', 'a deal'],
    letter: 'd',
    hints: [
      "the last line isn't a word yet. something in here tells you how far to turn it.",
      'the clock stopped at 3. move every letter back three: g becomes d.',
      'deal.',
    ],
    solvedLine: 'a deal. there is nobody to take it. a third pane clears.',
  },
  {
    id: 'book',
    stage: 'depression',
    question: "what's left?",
    answers: ['empty'],
    letter: 'e',
    hints: [
      "the bookmark isn't holding a page. it's pointing.",
      'line, then word. keep the first letter of each.',
      'empty.',
    ],
    solvedLine: 'empty. you close the book on it. a fourth pane clears.',
  },
  {
    id: 'dust',
    stage: 'acceptance',
    question: 'and now?',
    answers: ['done'],
    letter: 'd',
    hints: [
      "you've been reading ones and zeros all night. these aren't.",
      'three digits, base ten. the same table the journal used: 100 is d.',
      'done.',
    ],
    solvedLine: 'done. the last pane clears.',
  },
];

export const DOOR = {
  question: 'say it.',
  answers: ['ended', 'it ended', 'its over', 'over', 'it is over'],
  hints: ['read the door.', 'e. n. d. e. d.', 'ended.'],
} as const;

/** `i don't know`, normalised. Never wrong: it asks for help. */
export const DONT_KNOW = 'i dont know';

const WRONG_LINES = ['no.', "that's not it.", "you know that isn't it."] as const;

export type Attempt =
  | { kind: 'solved'; line: string }
  | { kind: 'wrong'; line: string }
  | { kind: 'hint'; line: string; tier: Tier }
  | { kind: 'already'; line: string };

const IDS = new Set<string>(PUZZLES.map((p) => p.id));

export class PuzzleBook {
  private solved = new Set<PuzzleId>();
  private tiers = new Map<PuzzleId | 'door', number>();
  private wrongCount = 0;
  private open = false;

  constructor(solved: readonly string[] = []) {
    for (const id of solved) if (IDS.has(id)) this.solved.add(id as PuzzleId);
  }

  /** Starts over as if freshly built with `solved`: door shut, hints and
   *  wrong answers forgotten. The dev panel's lever. */
  reset(solved: readonly string[]): void {
    this.solved.clear();
    for (const id of solved) if (IDS.has(id)) this.solved.add(id as PuzzleId);
    this.tiers.clear();
    this.wrongCount = 0;
    this.open = false;
  }

  isSolved(id: PuzzleId): boolean {
    return this.solved.has(id);
  }

  /** Stage order, not solve order. */
  solvedIds(): PuzzleId[] {
    return PUZZLES.filter((p) => this.solved.has(p.id)).map((p) => p.id);
  }

  allSolved(): boolean {
    return this.solved.size === PUZZLES.length;
  }

  letters(): string[] {
    return PUZZLES.map((p) => (this.solved.has(p.id) ? p.letter : ''));
  }

  firstUnsolved(): Puzzle | null {
    return PUZZLES.find((p) => !this.solved.has(p.id)) ?? null;
  }

  doorOpen(): boolean {
    return this.open;
  }

  /** Advances and returns the next hint tier for a puzzle (or the door). */
  hint(id: PuzzleId | 'door'): { line: string; tier: Tier } {
    const tier = Math.min(3, (this.tiers.get(id) ?? 0) + 1) as Tier;
    this.tiers.set(id, tier);
    const hints = id === 'door' ? DOOR.hints : puzzle(id).hints;
    return { line: hints[tier - 1]!, tier };
  }

  attempt(id: PuzzleId, raw: string): Attempt {
    const p = puzzle(id);
    const said = normalizeAnswer(raw);
    if (this.solved.has(id)) return { kind: 'already', line: `you already know. ${p.hints[2]}` };
    if (said === DONT_KNOW) return { kind: 'hint', ...this.hint(id) };
    if (p.answers.includes(said)) {
      this.solved.add(id);
      return { kind: 'solved', line: p.solvedLine };
    }
    return this.wrong();
  }

  attemptDoor(raw: string): Attempt {
    if (this.open) return { kind: 'already', line: "it's open." };
    if (!this.allSolved()) {
      const left = PUZZLES.length - this.solved.size;
      return { kind: 'wrong', line: `five panes. ${left} still frosted.` };
    }
    const said = normalizeAnswer(raw);
    if (said === DONT_KNOW) return { kind: 'hint', ...this.hint('door') };
    if ((DOOR.answers as readonly string[]).includes(said)) {
      this.open = true;
      return { kind: 'solved', line: "it's open. it was never locked. you were." };
    }
    return this.wrong();
  }

  private wrong(): Attempt {
    const line = WRONG_LINES[this.wrongCount % WRONG_LINES.length]!;
    this.wrongCount++;
    return { kind: 'wrong', line };
  }
}

export function puzzle(id: PuzzleId): Puzzle {
  const p = PUZZLES.find((x) => x.id === id);
  if (!p) throw new Error(`unknown puzzle ${id}`);
  return p;
}
