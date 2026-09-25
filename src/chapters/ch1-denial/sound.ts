import { LoopScore, checkLoopWindow, loadBuffer, type LoopWindow } from '../../core/score';

const DIR = '/audio/ch1';

/**
 * "without you now", bounced as three stems of identical length (26.12 s).
 * Times are read off FL Studio's clock, which counts min:sec:centiseconds:
 * the music starts at 0:00:43 (0.43 s — measured: the decoded bass and
 * rhodes both come up out of silence at 0.43 s), the next pass comes in at
 * 0:19:55 (19.55 s, tuned by ear), and the body lets go around 0:19:63. Each pass is
 * left to ring out to the end of its file: the bell's reverb is still
 * audible past 23 s, and cutting it at 19.63 would click.
 */
export const WITHOUT_YOU_NOW: LoopWindow = { startAt: 0.43, loopAt: 19.55 };

export type StemId = 'bass' | 'bell' | 'rhodes';
const STEMS: readonly StemId[] = ['bass', 'bell', 'rhodes'];

/** Puzzles solved before the bell comes in. */
export const BELL_AFTER = 2;
/** Seconds a stem takes to fade in once it is earned. */
export const STEM_FADE_SECONDS = 4;

/**
 * Which stems are playing, from how far the player has got. The bass is
 * there from the first second; the bell after a couple of answers; the
 * rhodes once every one of them is solved.
 */
export function stemLevels(solved: number, allSolved: boolean): Record<StemId, number> {
  return {
    bass: 1,
    bell: solved >= BELL_AFTER ? 1 : 0,
    rhodes: allSolved ? 1 : 0,
  };
}

const LEVEL = {
  score: 0.8,
  footsteps: 0.45,
  equip: 0.6,
  putDown: 0.4,
  typing: 0.35,
  blip: 0.5,
  riser: 0.9,
} as const;

/** Where the boom lands in riser_drop.mp3, seconds: the riser's bass drops
 *  out at 2.9 and the hit comes in at 3.01 (measured). */
export const RISER_DROP_AT = 3.0;

/** Stop the steps only after this long standing still: `moving` drops for
 *  a frame against a wall corner, and the steps should not stutter. */
const STILL_MS = 120;

type OneShot = 'equip' | 'typing' | 'blip' | 'riser';

/**
 * Everything chapter one sounds like: the score, the steps, the hands.
 * Loads in the background; anything asked of it before its buffers arrive
 * is quietly skipped, and a file that fails to load costs only that sound.
 */
export class Ch1Sound {
  private ctx: AudioContext;
  private out: GainNode;
  private score: LoopScore | null = null;
  private shots = new Map<OneShot, AudioBuffer>();
  private steps: { src: AudioBufferSourceNode; gain: GainNode } | null = null;
  private stepsOn = false;
  private stillMs = 0;
  private stems: Partial<Record<StemId, AudioBuffer>> = {};
  private window: LoopWindow = WITHOUT_YOU_NOW;
  private solved = 0;
  private allSolved = false;
  private disposed = false;
  private riserAt: number | null = null;
  /** Out the door: the steps stay faded whatever the feet do. */
  private exiting = false;

  constructor(ctx: AudioContext, destination: AudioNode = ctx.destination) {
    this.ctx = ctx;
    this.out = ctx.createGain();
    this.out.connect(destination);
    // A context made outside a gesture starts suspended. Any key or click
    // in the room is a gesture.
    window.addEventListener('pointerdown', this.wake);
    window.addEventListener('keydown', this.wake);
  }

  private wake = (): void => {
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  };

  /** Loads every file, then starts the score at the levels already earned. */
  async load(): Promise<void> {
    // No Web Audio buffers here (the test suite's stand-in context): stay silent.
    if (typeof this.ctx.decodeAudioData !== 'function') return;
    const get = (name: string): Promise<AudioBuffer | null> =>
      loadBuffer(this.ctx, `${DIR}/${name}.mp3`).catch((err: unknown) => {
        console.warn(`[sound] ${name} did not load`, err);
        return null;
      });

    const [bass, bell, rhodes, footsteps, equip, typing, blip, riser] = await Promise.all([
      get('ambience-bass'),
      get('ambience-bell'),
      get('ambience-rhodes'),
      get('footsteps'),
      get('equip'),
      get('typing'),
      get('blip'),
      get('riser_drop'),
    ]);
    if (this.disposed) return;

    if (equip) this.shots.set('equip', equip);
    if (typing) this.shots.set('typing', typing);
    if (blip) this.shots.set('blip', blip);
    if (riser) this.shots.set('riser', riser);
    if (footsteps) this.steps = this.makeSteps(footsteps);

    if (bass) this.stems.bass = bass;
    if (bell) this.stems.bell = bell;
    if (rhodes) this.stems.rhodes = rhodes;
    this.startScore();
  }

  /** (Re)builds the score from the loaded stems at the levels earned so far. */
  private startScore(from?: number): void {
    this.score?.dispose();
    const levels = stemLevels(this.solved, this.allSolved);
    const score = new LoopScore(this.ctx, this.window, this.out);
    for (const id of STEMS) {
      const buffer = this.stems[id];
      if (buffer) score.addStem(id, buffer, levels[id] * LEVEL.score);
    }
    this.score = score;
    score.start(from);
  }

  /** The loop timing in use. */
  get loopWindow(): LoopWindow {
    return this.window;
  }

  /** Length of the stem files, seconds; null until loaded. */
  get fileSeconds(): number | null {
    return this.stems.bass?.duration ?? this.stems.bell?.duration ?? this.stems.rhodes?.duration ?? null;
  }

  /** Where the newest pass is in the file, seconds. */
  position(): number | null {
    return this.score?.position() ?? null;
  }

  /**
   * Dev panel: swaps the loop timing for all three stems and restarts the
   * score, optionally part-way into the file (`from`). Throws on a window
   * LoopScore refuses, before anything changes.
   */
  setLoopWindow(window: LoopWindow, from?: number): void {
    checkLoopWindow(window);
    this.window = window;
    if (this.disposed || Object.keys(this.stems).length === 0) return;
    this.startScore(from);
  }

  /** Call whenever the solved count changes, and once with the restored
   *  count before load() resolves. Newly earned stems fade in. */
  progress(solved: number, allSolved: boolean): void {
    this.solved = solved;
    this.allSolved = allSolved;
    const score = this.score;
    if (!score) return;
    const levels = stemLevels(solved, allSolved);
    for (const id of STEMS) {
      const target = levels[id] * LEVEL.score;
      if (score.level(id) !== target) score.setLevel(id, target, STEM_FADE_SECONDS);
    }
  }

  /** Call every fixed step with whether the player is walking. */
  walking(moving: boolean, dtMs: number): void {
    this.stillMs = moving ? 0 : this.stillMs + dtMs;
    const on = moving || this.stillMs < STILL_MS;
    if (on === this.stepsOn || !this.steps || this.exiting) return;
    this.stepsOn = on;
    const g = this.steps.gain.gain;
    const now = this.ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(on ? LEVEL.footsteps : 0, now + (on ? 0.08 : 0.25));
  }

  pickUp(): void {
    this.play('equip', LEVEL.equip, 1);
  }

  putDown(): void {
    this.play('equip', LEVEL.putDown, 0.85);
  }

  keystroke(): void {
    this.play('typing', LEVEL.typing, 0.94 + Math.random() * 0.12);
  }

  /** A line of text surfacing: a subtitle, or the answer to an answer. */
  blip(): void {
    this.play('blip', LEVEL.blip, 1);
  }

  /**
   * Out the door: the riser starts, and the score and the steps fade away
   * under it so the drop lands in silence.
   */
  exit(): void {
    if (this.disposed || this.exiting) return;
    const now = this.ctx.currentTime;
    if (this.play('riser', LEVEL.riser, 1)) this.riserAt = now;
    for (const id of STEMS) this.score?.setLevel(id, 0, RISER_DROP_AT);
    this.exiting = true;
    if (this.steps) {
      const g = this.steps.gain.gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(0, now + RISER_DROP_AT);
    }
  }

  /** Seconds since the riser started, on the audio clock; null if it isn't
   *  playing (not loaded, or the context is not running). */
  riserElapsed(): number | null {
    if (this.riserAt === null || this.ctx.state !== 'running') return null;
    return this.ctx.currentTime - this.riserAt;
  }

  private play(id: OneShot, level: number, rate: number): boolean {
    const buffer = this.shots.get(id);
    if (!buffer || this.disposed) return false;
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = buffer;
    src.playbackRate.value = rate;
    gain.gain.value = level;
    src.connect(gain);
    gain.connect(this.out);
    src.onended = () => {
      src.disconnect();
      gain.disconnect();
    };
    src.start();
    return true;
  }

  /** One endless loop of the steps, held at silence until someone walks. */
  private makeSteps(buffer: AudioBuffer): { src: AudioBufferSourceNode; gain: GainNode } {
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = buffer;
    src.loop = true;
    gain.gain.value = 0;
    src.connect(gain);
    gain.connect(this.out);
    src.start();
    return { src, gain };
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    window.removeEventListener('pointerdown', this.wake);
    window.removeEventListener('keydown', this.wake);
    this.score?.dispose();
    if (this.steps) {
      try {
        this.steps.src.stop();
      } catch {
        // already stopped
      }
      this.steps.src.disconnect();
      this.steps.gain.disconnect();
    }
    this.out.disconnect();
  }
}
