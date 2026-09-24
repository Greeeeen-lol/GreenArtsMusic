import { loadBuffer } from '../../core/score';
import { RISER_DROP_AT } from '../ch1-denial/sound';

/** The steps are chapter one's own: same shoes, different floor. */
const STEPS_URL = '/audio/ch1/footsteps.mp3';
/** Going back in through door 01 rises and drops like going out did. */
const RISER_URL = '/audio/ch1/riser_drop.mp3';

const LEVEL = {
  hum: 0.05,
  air: 0.035,
  // carpet: quieter than the apartment's boards
  footsteps: 0.3,
  rattle: 0.22,
  thunk: 0.5,
  open: 0.12,
  riser: 0.9,
} as const;

/** Stop the steps only after this long standing still (as ch1). */
const STILL_MS = 120;

/**
 * What the hallway sounds like: a building's hum, carpet underfoot, and
 * doors that don't open — and one that does. Everything but the steps
 * and the riser (both chapter one's files) is synthesized here. With the test suite's stand-in AudioContext (no
 * oscillators, no buffers) every method is a silent no-op.
 */
export class HallwaySound {
  private ctx: AudioContext;
  private out: GainNode;
  private live: boolean;
  private disposed = false;
  private bed: AudioScheduledSourceNode[] = [];
  private steps: { src: AudioBufferSourceNode; gain: GainNode } | null = null;
  private stepsOn = false;
  private stillMs = 0;
  private noise: AudioBuffer | null = null;
  private riserBuffer: AudioBuffer | null = null;
  private riserAt: number | null = null;
  /** The hum and the air, faded as one under the riser. */
  private bedGain: GainNode | null = null;
  private exiting = false;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.out = ctx.createGain();
    this.out.connect(ctx.destination);
    this.live =
      typeof ctx.createOscillator === 'function' &&
      typeof ctx.createBuffer === 'function' &&
      typeof ctx.createBiquadFilter === 'function' &&
      typeof ctx.decodeAudioData === 'function';
    window.addEventListener('pointerdown', this.wake);
    window.addEventListener('keydown', this.wake);
  }

  private wake = (): void => {
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  };

  async load(): Promise<void> {
    if (!this.live) return;
    this.noise = this.makeNoise(2);
    this.startBed();
    const get = (url: string): Promise<AudioBuffer | null> =>
      loadBuffer(this.ctx, url).catch((err: unknown) => {
        console.warn(`[sound] ${url} did not load`, err);
        return null;
      });
    const [steps, riser] = await Promise.all([get(STEPS_URL), get(RISER_URL)]);
    this.riserBuffer = riser;
    if (this.disposed || !steps) return;
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = steps;
    src.loop = true;
    gain.gain.value = 0;
    src.connect(gain);
    gain.connect(this.out);
    src.start();
    this.steps = { src, gain };
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

  /** A locked handle, tried: three quick metallic knocks. */
  rattle(): void {
    if (!this.ready()) return;
    const t0 = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) this.burst(t0 + i * 0.075, 0.05, 2400 + i * 180, 6, LEVEL.rattle);
  }

  /** The latch holding: a dull knock in the wood. */
  thunk(): void {
    if (!this.ready()) return;
    const t0 = this.ctx.currentTime + 0.24;
    this.drop(t0, 110, 48, 0.22, LEVEL.thunk);
    this.burst(t0, 0.03, 900, 2, LEVEL.thunk * 0.4);
  }

  /** Door 01 giving: the latch, then a slow low creak. */
  open(): void {
    if (!this.ready()) return;
    const t0 = this.ctx.currentTime;
    this.burst(t0, 0.04, 1800, 4, LEVEL.rattle);
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(190, t0 + 0.08);
    osc.frequency.linearRampToValueAtTime(130, t0 + 0.8);
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    gain.gain.setValueAtTime(0, t0 + 0.08);
    gain.gain.linearRampToValueAtTime(LEVEL.open, t0 + 0.2);
    gain.gain.linearRampToValueAtTime(0, t0 + 0.85);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.out);
    osc.start(t0 + 0.08);
    osc.stop(t0 + 0.9);
    osc.onended = () => {
      osc.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }

  /**
   * Into the light: the riser starts, and the building and the steps fade
   * away under it so the drop lands in silence — as chapter one's own exit.
   */
  exit(): void {
    if (this.disposed || this.exiting) return;
    this.exiting = true;
    const now = this.ctx.currentTime;
    if (this.riserBuffer) {
      const src = this.ctx.createBufferSource();
      const gain = this.ctx.createGain();
      src.buffer = this.riserBuffer;
      gain.gain.value = LEVEL.riser;
      src.connect(gain);
      gain.connect(this.out);
      src.onended = () => {
        src.disconnect();
        gain.disconnect();
      };
      src.start();
      this.riserAt = now;
    }
    for (const g of [this.bedGain?.gain, this.steps?.gain.gain]) {
      if (!g) continue;
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

  // ------------------------------------------------------------------ //

  private ready(): boolean {
    return this.live && !this.disposed && this.noise !== null;
  }

  private makeNoise(seconds: number): AudioBuffer {
    const length = Math.floor(this.ctx.sampleRate * seconds);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // brown-ish: integrated white noise, kept bounded
    let last = 0;
    for (let i = 0; i < length; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = last * 3.5;
    }
    return buffer;
  }

  /** The building: mains hum under moving air. Runs until dispose. */
  private startBed(): void {
    const bed = this.ctx.createGain();
    bed.gain.value = 1;
    bed.connect(this.out);
    this.bedGain = bed;

    const hum = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    hum.type = 'sine';
    hum.frequency.value = 55;
    humGain.gain.value = LEVEL.hum;
    hum.connect(humGain);
    humGain.connect(bed);
    hum.start();

    const air = this.ctx.createBufferSource();
    const airFilter = this.ctx.createBiquadFilter();
    const airGain = this.ctx.createGain();
    air.buffer = this.noise;
    air.loop = true;
    airFilter.type = 'lowpass';
    airFilter.frequency.value = 260;
    airGain.gain.value = LEVEL.air;
    air.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(bed);
    air.start();

    this.bed.push(hum, air);
  }

  /** A short band of noise: metal on metal, or a click. */
  private burst(at: number, seconds: number, freq: number, q: number, level: number): void {
    const src = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    src.buffer = this.noise;
    filter.type = 'bandpass';
    filter.frequency.value = freq;
    filter.Q.value = q;
    gain.gain.setValueAtTime(level, at);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + seconds);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.out);
    src.start(at, Math.random());
    src.stop(at + seconds + 0.02);
    src.onended = () => {
      src.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }

  /** A falling sine: something heavy, briefly. */
  private drop(at: number, from: number, to: number, seconds: number, level: number): void {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(from, at);
    osc.frequency.exponentialRampToValueAtTime(to, at + seconds);
    gain.gain.setValueAtTime(level, at);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + seconds);
    osc.connect(gain);
    gain.connect(this.out);
    osc.start(at);
    osc.stop(at + seconds + 0.02);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    window.removeEventListener('pointerdown', this.wake);
    window.removeEventListener('keydown', this.wake);
    for (const n of this.bed) {
      try {
        n.stop();
      } catch {
        // already stopped
      }
      n.disconnect();
    }
    this.bed = [];
    this.bedGain?.disconnect();
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
