/**
 * A looping, layered score played from decoded buffers on the AudioContext
 * clock, the way a DAW plays a looped clip with a tail.
 *
 * The media-element loop in AudioDirector cuts hard at the file's end and
 * starts again at 0. That is wrong for a bounce with a lead-in and a
 * release: the music starts `startAt` into the file, the bar line comes
 * round at `loopAt`, and the notes are still ringing out after it.
 * So every pass is its own instance: it starts at `startAt`, and when it
 * reaches `loopAt` a NEW instance starts from `startAt` while the old one
 * carries on and tapers off, until the audio in the file runs out (or
 * `endAt`, if given). Passes overlap from `loopAt` to the end of the tail.
 *
 * Every stem of an instance is started with the same `when`, so stems are
 * sample-locked to each other with no reseeking. Unlocking a stem only
 * moves its gain.
 */

export interface LoopWindow {
  /** Where the music starts in the file, seconds. */
  startAt: number;
  /** Where the next pass begins, seconds into the file. */
  loopAt: number;
  /** Where a pass is cut off, seconds into the file. Leave it out to let
   *  every pass ring out to the end of its file, tail and all. */
  endAt?: number;
}

/** How far ahead passes are scheduled. Background tabs throttle timers to
 *  about once a second, so this has to outlast that comfortably. */
export const LOOKAHEAD_SECONDS = 2.5;
export const TICK_MS = 250;
/** Lead before the very first pass, so every stem starts on the same frame. */
const START_LEAD_SECONDS = 0.1;

/** Throws unless `w` is a window LoopScore can play. */
export function checkLoopWindow(w: LoopWindow): void {
  const ok =
    Number.isFinite(w.startAt) &&
    Number.isFinite(w.loopAt) &&
    w.startAt >= 0 &&
    w.loopAt > w.startAt &&
    (w.endAt === undefined || (Number.isFinite(w.endAt) && w.endAt >= w.loopAt));
  if (!ok) throw new Error(`bad loop window ${JSON.stringify(w)}`);
}

/** Seconds between the starts of consecutive passes. */
export function loopPeriod(w: LoopWindow): number {
  return w.loopAt - w.startAt;
}

interface Stem {
  id: string;
  buffer: AudioBuffer;
  gain: GainNode;
}

export class LoopScore {
  private ctx: AudioContext;
  private window: LoopWindow;
  private out: GainNode;
  private stems: Stem[] = [];
  private live = new Set<AudioBufferSourceNode>();
  /** The grid: when pass 0 would have begun at `startAt`. */
  private firstAt = 0;
  /** No pass sounds before this (the start lead). */
  private earliest = 0;
  private nextPass = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private disposed = false;

  constructor(ctx: AudioContext, window: LoopWindow, destination: AudioNode = ctx.destination) {
    checkLoopWindow(window);
    this.ctx = ctx;
    this.window = window;
    this.out = ctx.createGain();
    this.out.connect(destination);
  }

  get started(): boolean {
    return this.timer !== null;
  }

  /** Adds a stem at a starting level (0 = silent, 1 = full). Add every stem
   *  before start(): a stem added later would join a pass late. */
  addStem(id: string, buffer: AudioBuffer, level: number): void {
    if (this.started) throw new Error(`LoopScore: stem "${id}" added after start()`);
    const gain = this.ctx.createGain();
    gain.gain.value = level;
    gain.connect(this.out);
    this.stems.push({ id, buffer, gain });
  }

  /** Starts looping. `from` (seconds into the file, default `startAt`)
   *  joins the first pass part-way through: pass `loopAt - 3` to hear the
   *  seam three seconds from now. */
  start(from: number = this.window.startAt): void {
    if (this.started || this.disposed) return;
    const skip = Math.max(0, from - this.window.startAt);
    this.earliest = this.ctx.currentTime + START_LEAD_SECONDS;
    this.firstAt = this.earliest - skip;
    this.nextPass = 0;
    this.tick();
    this.timer = setInterval(() => this.tick(), TICK_MS);
  }

  /** Schedules every pass that begins before now + LOOKAHEAD_SECONDS. */
  tick(): void {
    if (this.disposed) return;
    const period = loopPeriod(this.window);
    const horizon = this.ctx.currentTime + LOOKAHEAD_SECONDS;
    for (;;) {
      const when = this.firstAt + this.nextPass * period;
      if (when > horizon) break;
      this.startPass(when);
      this.nextPass++;
    }
  }

  private startPass(when: number): void {
    const { startAt } = this.window;
    const now = this.ctx.currentTime;
    // A pass whose start already went by (a starved timer, or a start()
    // part-way in): join it where it would be by then rather than bunch it
    // up late, so the grid holds.
    const at = Math.max(when, now, this.earliest);
    const offset = startAt + (at - when);
    for (const stem of this.stems) {
      const endAt = this.window.endAt ?? stem.buffer.duration;
      if (offset >= endAt) continue;
      const src = this.ctx.createBufferSource();
      src.buffer = stem.buffer;
      src.connect(stem.gain);
      src.start(at, offset, endAt - offset);
      this.live.add(src);
      src.onended = () => {
        this.live.delete(src);
        src.disconnect();
      };
    }
  }

  /** Where the newest pass is in the file right now, seconds; null before
   *  the first pass sounds. */
  position(): number | null {
    if (!this.started) return null;
    const since = this.ctx.currentTime - this.firstAt;
    if (since < 0) return null;
    const period = loopPeriod(this.window);
    return this.window.startAt + (since % period);
  }

  /** Moves a stem to `level` over `seconds`. */
  setLevel(id: string, level: number, seconds: number): void {
    const stem = this.stems.find((s) => s.id === id);
    if (!stem) return;
    const g = stem.gain.gain;
    const now = this.ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    if (seconds <= 0) g.setValueAtTime(level, now);
    else g.linearRampToValueAtTime(level, now + seconds);
  }

  level(id: string): number | undefined {
    return this.stems.find((s) => s.id === id)?.gain.gain.value;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
    for (const src of this.live) {
      src.onended = null;
      try {
        src.stop();
      } catch {
        // never started, or already stopped
      }
      src.disconnect();
    }
    this.live.clear();
    for (const s of this.stems) s.gain.disconnect();
    this.out.disconnect();
  }
}

/** Fetches and decodes one file into an AudioBuffer. */
export async function loadBuffer(ctx: AudioContext, url: string): Promise<AudioBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return ctx.decodeAudioData(await res.arrayBuffer());
}
