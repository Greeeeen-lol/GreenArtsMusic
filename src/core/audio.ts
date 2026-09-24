export const DRIFT_TOLERANCE_MS = 30;
export const UNLOCK_SECONDS = 4;

export interface LayerHandle {
  id: string;
  el: HTMLMediaElement;
  gain: GainNode;
  source: MediaElementAudioSourceNode;
  unlocked: boolean;
}

export function needsReseek(
  referenceTime: number,
  layerTime: number,
  toleranceMs: number,
  durationSeconds?: number,
): boolean {
  let diff = Math.abs(referenceTime - layerTime);
  if (
    durationSeconds !== undefined &&
    Number.isFinite(durationSeconds) &&
    durationSeconds > 0
  ) {
    const wrapped = diff % durationSeconds;
    diff = Math.min(wrapped, durationSeconds - wrapped);
  }
  return diff * 1000 > toleranceMs;
}

/**
 * Layered ambient score. Every layer of a chapter's loop starts together and is
 * never restarted; unlocking a stem only raises its gain. The song itself is not
 * played here — that happens once, at the Ch5 ending.
 *
 * All layers of a chapter's loop MUST be exactly the same length. Sync is
 * maintained by reseeking non-reference layers to the reference layer's
 * currentTime, which is only meaningful for equal-length loops. The reference
 * is the first layer added.
 */
export class AudioDirector {
  private ctx: AudioContext;
  private layers: LayerHandle[] = [];

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
  }

  /** The one AudioContext for the whole game. Chapters build their own
   *  buffer-played sound (see core/score.ts) on it. */
  get context(): AudioContext {
    return this.ctx;
  }

  addLayer(id: string, el: HTMLMediaElement, initialGain: number): LayerHandle {
    const gain = this.ctx.createGain();
    gain.gain.value = initialGain;
    gain.connect(this.ctx.destination);

    const source = this.ctx.createMediaElementSource(el);
    source.connect(gain);

    if (initialGain > 0 && initialGain < 1) {
      console.warn(
        `[audio] layer "${id}" added with fractional gain ${initialGain}; ` +
          'layers are either silent (0) or full (1). It will be treated as locked ' +
          'and can be unlocked later.',
      );
    }

    const handle: LayerHandle = { id, el, gain, source, unlocked: initialGain >= 1 };
    this.layers.push(handle);
    return handle;
  }

  async startAll(): Promise<void> {
    await this.resume();

    const started: LayerHandle[] = [];
    const plays = this.layers.map(async (l) => {
      l.el.loop = true;
      l.el.currentTime = 0;
      await l.el.play();
      started.push(l);
    });

    try {
      await Promise.all(plays);
    } catch (err) {
      // Let every play() settle before tearing down, so nothing starts
      // after we have already paused it.
      await Promise.allSettled(plays);
      for (const l of started) l.el.pause();
      throw err;
    }

    this.warnOnDurationMismatch();
  }

  private warnOnDurationMismatch(): void {
    const reference = this.layers[0];
    if (!reference || !Number.isFinite(reference.el.duration)) return;
    const refDuration = reference.el.duration;
    for (let i = 1; i < this.layers.length; i++) {
      const layer = this.layers[i]!;
      const layerDuration = layer.el.duration;
      if (!Number.isFinite(layerDuration)) continue;
      if (Math.abs(layerDuration - refDuration) > 0.05) {
        console.warn(
          `AudioDirector: layer "${layer.id}" duration ${layerDuration}s differs from reference "${reference.id}" duration ${refDuration}s — chapter loop layers must be exactly the same length.`,
        );
      }
    }
  }

  unlock(id: string, seconds: number = UNLOCK_SECONDS): void {
    const layer = this.layers.find((l) => l.id === id);
    if (!layer || layer.unlocked) return;
    layer.unlocked = true;

    const now = this.ctx.currentTime;
    layer.gain.gain.cancelScheduledValues(now);
    layer.gain.gain.setValueAtTime(layer.gain.gain.value, now);
    layer.gain.gain.linearRampToValueAtTime(1, now + seconds);
  }

  isUnlocked(id: string): boolean {
    return this.layers.find((l) => l.id === id)?.unlocked ?? false;
  }

  /** Correct drift against the first layer added. Call once per frame. */
  update(): void {
    const reference = this.layers[0];
    if (!reference) return;
    const refTime = reference.el.currentTime;
    const refDuration = reference.el.duration;
    for (let i = 1; i < this.layers.length; i++) {
      const layer = this.layers[i]!;
      if (needsReseek(refTime, layer.el.currentTime, DRIFT_TOLERANCE_MS, refDuration)) {
        layer.el.currentTime = refTime;
      }
    }
  }

  async resume(): Promise<void> {
    if (this.ctx.state === 'suspended') await this.ctx.resume();
  }

  /** True once the context is dead. The caller must rebuild the AudioContext
   *  and re-add every layer; this module cannot recover on its own. */
  isClosed(): boolean {
    return this.ctx.state === 'closed';
  }

  /**
   * iOS kills or suspends the context on tab switch, and can also suspend it
   * while the tab stays visible (a phone call, another app taking audio
   * focus). Listen for both. Returns an unbind fn.
   */
  bindVisibility(): () => void {
    const onVisible = (): void => {
      if (document.visibilityState === 'visible') void this.resume();
    };
    const onStateChange = (): void => {
      if (this.ctx.state === 'suspended') void this.resume();
    };
    document.addEventListener('visibilitychange', onVisible);
    this.ctx.addEventListener?.('statechange', onStateChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      this.ctx.removeEventListener?.('statechange', onStateChange);
    };
  }

  /**
   * Pauses and disconnects every layer, emptying the layer list. Call this
   * on a chapter swap: a chapter owns its own score (its layers are added
   * in its own load()), so the outgoing chapter's layers must be fully torn
   * down before the incoming chapter adds its own — otherwise the previous
   * chapter's audio keeps playing underneath the new one indefinitely.
   */
  clearLayers(): void {
    for (const l of this.layers) {
      l.el.pause();
      l.source.disconnect();
      l.gain.disconnect();
    }
    this.layers = [];
  }

  dispose(): void {
    this.clearLayers();
  }
}
