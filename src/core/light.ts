import * as THREE from 'three';
import { damp } from './math';

export interface LanternConfig {
  color: number;
  baseIntensity: number;
  idleIntensity: number;
  baseRange: number;
  heldRange: number;
  /** Milliseconds of standing still before the light begins to fail. */
  idleAfterMs: number;
  /** Approach rate for intensity and range, per second. */
  lambda: number;
  /**
   * PointLight decay exponent. NOT cosmetic — the physical-unit intensity
   * values below are tuned against this exact number. Physically correct
   * inverse-square falloff is decay=2; changing decay without re-tuning
   * intensity darkens (or blows out) the room sharply with every automated
   * test still green, because the tests only compare intensity/range
   * relative to LANTERN_DEFAULTS, never against the rendered brightness.
   * Verified in-browser on three 0.186 at decay 1.3 (with ACESFilmic tone
   * mapping — see engine.ts).
   */
  decay: number;
}

/**
 * Intensities are in three.js PHYSICAL units (candela). three r155+ uses
 * physical lighting and r165 removed `useLegacyLights`, so the small values
 * typical of older three.js examples (1–2) render as pure black at room
 * scale.
 *
 * These values are calibrated AGAINST engine.ts's ACESFilmic tone mapping,
 * not raw/clipped output — see the tone-mapping comment there. An earlier
 * pass (baseIntensity: 220, under NoToneMapping) read correctly from 3–5m
 * back, the distance it was eyeballed at, but clipped anything within about
 * a metre to pure flat white: no surface gradient, and the hover glow's
 * emissive lift invisible because it was being added to a surface already
 * pinned at 1.0. Verified in-browser, with an A/B at an identical camera,
 * hovered vs not: baseIntensity 26 keeps close range unclipped and makes
 * the glow clearly readable, while still being roughly an order of
 * magnitude above the legacy ~1.6 scale that renders as pure black.
 */
export const LANTERN_DEFAULTS: LanternConfig = {
  color: 0xbcc6d6,
  baseIntensity: 26,
  idleIntensity: 6,
  baseRange: 12,
  heldRange: 28,
  idleAfterMs: 6000,
  lambda: 2.2,
  decay: 1.3,
};

export class Lantern {
  intensity: number;
  range: number;
  frozen = false;
  readonly light: THREE.PointLight;

  private cfg: LanternConfig;
  private idleMs = 0;

  constructor(config: Partial<LanternConfig> = {}) {
    this.cfg = { ...LANTERN_DEFAULTS, ...config };
    this.intensity = this.cfg.baseIntensity;
    this.range = this.cfg.baseRange;
    this.light = new THREE.PointLight(this.cfg.color, this.intensity, this.range, this.cfg.decay);
  }

  /**
   * Restores intensity/range to config defaults and clears the idle clock
   * and frozen state. Call this on a chapter swap — without it, a lantern
   * left dim (or frozen mid hold-to-see) in the outgoing chapter carries
   * that state into the incoming one.
   */
  reset(): void {
    this.intensity = this.cfg.baseIntensity;
    this.range = this.cfg.baseRange;
    this.idleMs = 0;
    this.frozen = false;
    this.light.intensity = this.intensity;
    this.light.distance = this.range;
  }

  update(dtMs: number, moving: boolean, holdToSee: boolean): void {
    const dt = dtMs / 1000;
    this.frozen = holdToSee;

    if (moving) this.idleMs = 0;
    else if (!holdToSee) this.idleMs += dtMs;

    const targetIntensity =
      this.idleMs >= this.cfg.idleAfterMs ? this.cfg.idleIntensity : this.cfg.baseIntensity;
    // Release returns the reach to baseRange — the resting "hand's width" state.
    // Holding extends it; nothing shrinks below base.
    const targetRange = holdToSee ? this.cfg.heldRange : this.cfg.baseRange;

    this.intensity = damp(this.intensity, targetIntensity, this.cfg.lambda, dt);
    this.range = damp(this.range, targetRange, this.cfg.lambda, dt);

    this.light.intensity = this.intensity;
    this.light.distance = this.range;
  }

  applyTo(camera: THREE.PerspectiveCamera): void {
    this.light.position.copy(camera.position);
  }
}
