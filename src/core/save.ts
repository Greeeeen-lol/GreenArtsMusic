export const SAVE_KEY = 'greenart.arg.save';
export const SAVE_VERSION = 1;

export type Ending = 'let_go' | 'hold_on' | null;

export interface SaveState {
  version: number;
  /** Furthest chapter reached, 1-5. */
  chapter: number;
  /** Ch1 — freely movable objects the player deliberately put back. */
  objectsReplaced: number;
  /** Ch2 — how much was destroyed. */
  thingsBroken: number;
  /** Ch3 — distinct dialogue paths exhausted. */
  branchesExhausted: number;
  /** Ch4 — of 8. */
  shardsFound: number;
  /** All chapters. Shown at the ending, without comment. */
  dontKnowCount: number;
  ending: Ending;
  /** Post-release hidden objects, 0-5. */
  secretsFound: number;
  /** The lowercase `e` prompt is shown exactly once, ever. */
  seenInteractPrompt: boolean;
  /** The DONE page's hidden answer has been solved. */
  doneSolved: boolean;
  /**
   * Ch1 — ids of the five ciphers already solved. Added without a version
   * bump on purpose: bumping SAVE_VERSION discards the whole blob, which
   * would wipe `doneSolved` and make every returning player solve the DONE
   * page again. Older saves simply load with `[]`.
   */
  ch1Solved: string[];
}

export function defaultSave(): SaveState {
  return {
    version: SAVE_VERSION,
    chapter: 1,
    objectsReplaced: 0,
    thingsBroken: 0,
    branchesExhausted: 0,
    shardsFound: 0,
    dontKnowCount: 0,
    ending: null,
    secretsFound: 0,
    seenInteractPrompt: false,
    doneSolved: false,
    ch1Solved: [],
  };
}

function resolveStorage(storage?: Storage): Storage | null {
  if (storage) return storage;
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function num(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function loadSave(storage?: Storage): SaveState {
  const store = resolveStorage(storage);
  const base = defaultSave();
  if (!store) return base;

  let raw: string | null;
  try {
    raw = store.getItem(SAVE_KEY);
  } catch {
    return base;
  }
  if (!raw) return base;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return base;
  }
  if (typeof parsed !== 'object' || parsed === null) return base;

  const p = parsed as Record<string, unknown>;
  if (p.version !== SAVE_VERSION) return base;

  const ending = p.ending === 'let_go' || p.ending === 'hold_on' ? p.ending : null;

  return {
    version: SAVE_VERSION,
    chapter: num(p.chapter, base.chapter),
    objectsReplaced: num(p.objectsReplaced, base.objectsReplaced),
    thingsBroken: num(p.thingsBroken, base.thingsBroken),
    branchesExhausted: num(p.branchesExhausted, base.branchesExhausted),
    shardsFound: num(p.shardsFound, base.shardsFound),
    dontKnowCount: num(p.dontKnowCount, base.dontKnowCount),
    ending,
    secretsFound: num(p.secretsFound, base.secretsFound),
    seenInteractPrompt: p.seenInteractPrompt === true,
    doneSolved: p.doneSolved === true,
    ch1Solved: Array.isArray(p.ch1Solved)
      ? p.ch1Solved.filter((x): x is string => typeof x === 'string')
      : [],
  };
}

export function writeSave(state: SaveState, storage?: Storage): void {
  const store = resolveStorage(storage);
  if (!store) return;
  try {
    store.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // Storage denied (private mode, blocked site data). Saves are optional.
  }
}

export function resetSave(storage?: Storage): SaveState {
  const store = resolveStorage(storage);
  if (store) {
    try {
      store.removeItem(SAVE_KEY);
    } catch {
      // Ignore.
    }
  }
  return defaultSave();
}
