export type HintLevel = 0 | 1 | 2;

export const HINT_WHISPER_MS = 90_000;
export const HINT_OPEN_MS = 180_000;

/**
 * Stuck detection. Level 1: the room whispers, diegetically — an NPC line, an
 * object glowing a little brighter. Level 2: a path opens. There are no fail
 * states in this game; nobody gets walled out of the song.
 */
export class HintTimer {
  private currentLevel: HintLevel = 0;
  private sinceProgressMs = 0;

  get level(): HintLevel {
    return this.currentLevel;
  }

  update(dtMs: number, progressed: boolean): HintLevel {
    if (progressed) {
      this.reset();
      return this.currentLevel;
    }
    this.sinceProgressMs += dtMs;
    this.currentLevel =
      this.sinceProgressMs >= HINT_OPEN_MS ? 2
      : this.sinceProgressMs >= HINT_WHISPER_MS ? 1
      : 0;
    return this.currentLevel;
  }

  reset(): void {
    this.sinceProgressMs = 0;
    this.currentLevel = 0;
  }
}
