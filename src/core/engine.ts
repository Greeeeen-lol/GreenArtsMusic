import * as THREE from 'three';
import { stepAccumulator } from './math';
import { createGrainVignettePass } from './postfx';

export const FIXED_MS = 1000 / 60;
export const MAX_STEPS = 5;

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  isMobile: boolean;
  fov?: number;
  /**
   * Test-only escape hatch: supply a stub WebGLRenderer when no real WebGL
   * context is available (e.g. happy-dom). Production code never passes
   * this — the constructor falls back to a real THREE.WebGLRenderer.
   */
  createRenderer?: (opts: { canvas: HTMLCanvasElement; antialias: boolean }) => THREE.WebGLRenderer;
}

export interface RendererSettings {
  antialias: boolean;
  maxPixelRatio: number;
}

export function rendererSettings(isMobile: boolean): RendererSettings {
  return isMobile
    ? { antialias: false, maxPixelRatio: 1.5 }
    : { antialias: true, maxPixelRatio: 2 };
}

type FixedCb = (dtSeconds: number) => void;
type RenderCb = (alpha: number) => void;

export class Engine {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;

  private canvas: HTMLCanvasElement;
  private maxPixelRatio: number;
  private accMs = 0;
  private fixedCbs: FixedCb[] = [];
  private renderCbs: RenderCb[] = [];
  private rafId = 0;
  private lastMs = 0;
  private running = false;

  private target: THREE.WebGLRenderTarget;
  private postMaterial: THREE.ShaderMaterial;
  private postGeometry = new THREE.PlaneGeometry(2, 2);
  private postScene = new THREE.Scene();
  private postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private elapsed = 0;

  constructor(opts: EngineOptions) {
    this.canvas = opts.canvas;
    const settings = rendererSettings(opts.isMobile);
    this.maxPixelRatio = settings.maxPixelRatio;

    this.renderer = opts.createRenderer
      ? opts.createRenderer({ canvas: opts.canvas, antialias: settings.antialias })
      : new THREE.WebGLRenderer({
          canvas: opts.canvas,
          antialias: settings.antialias,
          powerPreference: 'high-performance',
        });
    // Global constraint: no realtime shadows, ever.
    this.renderer.shadowMap.enabled = false;
    // The lantern's physical-unit tuning (see light.ts) rides on these two
    // settings; three's own defaults are not guaranteed across versions, so
    // set them explicitly rather than inheriting whatever they default to.
    //
    // ACESFilmic, not NoToneMapping: this is a deliberate choice, not
    // drift. NoToneMapping clips hard at 1.0 — a bright point light the
    // player walks right up to (the whole design) pins anything within
    // about a metre to flat white with no surface gradient, and made the
    // hover affordance's emissive lift invisible (it was being added to a
    // surface already clipped to 1.0). ACESFilmic rolls highlights off
    // instead of clipping them, so close range stays readable. The goal
    // is still the same one NoToneMapping was originally pinned for —
    // determinism, so light.ts's tuning cannot silently ride on a three.js
    // default — it is just pinned to a different explicit value now.
    // Verified in-browser with an A/B at an identical camera.
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.camera = new THREE.PerspectiveCamera(opts.fov ?? 70, 1, 0.1, 60);

    this.target = new THREE.WebGLRenderTarget(1, 1);
    this.postMaterial = createGrainVignettePass();
    this.postMaterial.uniforms.tDiffuse!.value = this.target.texture;
    this.postScene.add(new THREE.Mesh(this.postGeometry, this.postMaterial));

    this.resize();
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
  }

  setFog(color: number, near: number, far: number): void {
    this.scene.fog = new THREE.Fog(color, near, far);
    this.scene.background = new THREE.Color(color);
  }

  /** Exponential fog: thickens smoothly with distance, no hard far edge. */
  setFogExp2(color: number, density: number): void {
    this.scene.fog = new THREE.FogExp2(color, density);
    this.scene.background = new THREE.Color(color);
  }

  onFixed(cb: FixedCb): void { this.fixedCbs.push(cb); }
  onRender(cb: RenderCb): void { this.renderCbs.push(cb); }

  private onResize(): void { this.resize(); }

  resize(): void {
    const w = this.canvas.clientWidth || window.innerWidth || 1;
    const h = this.canvas.clientHeight || window.innerHeight || 1;
    const ratio = Math.min(window.devicePixelRatio || 1, this.maxPixelRatio);
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(w, h, false);
    this.target.setSize(Math.floor(w * ratio), Math.floor(h * ratio));
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  /** Seconds elapsed, fed to the grain shader's spatial hash. Wraps (see
   *  tick()) so it never grows unbounded across a long session. */
  get elapsedSeconds(): number {
    return this.elapsed;
  }

  /** Zero the grain shader's time base. Call this on a chapter swap so a
   *  long previous chapter doesn't carry a large `uTime` into the next. */
  resetElapsed(): void {
    this.elapsed = 0;
  }

  /** Advance the simulation and draw one frame. Public so tests can drive it. */
  tick(dtMs: number): void {
    // Wrapped, not just accumulated: uTime feeds hash(vUv * 1024 + uTime) in
    // the grain shader. Left unbounded, uTime reaches into the thousands
    // within an hour, which mediump-precision mobile GPUs cannot resolve
    // against the 0..1024 spatial term — the grain visibly freezes or bands.
    // 1000 is arbitrary but large enough that the wrap itself is never
    // visible as a pop.
    this.elapsed = (this.elapsed + dtMs / 1000) % 1000;
    const { steps, remainderMs } = stepAccumulator(this.accMs, dtMs, FIXED_MS, MAX_STEPS);
    this.accMs = remainderMs;

    const fixedSeconds = FIXED_MS / 1000;
    for (let i = 0; i < steps; i++) {
      for (const cb of this.fixedCbs) cb(fixedSeconds);
    }

    const alpha = this.accMs / FIXED_MS;
    for (const cb of this.renderCbs) cb(alpha);

    this.postMaterial.uniforms.uTime!.value = this.elapsed;
    this.renderer.setRenderTarget(this.target);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.postCamera);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastMs = performance.now();
    const loop = (now: number): void => {
      if (!this.running) return;
      const dt = Math.min(now - this.lastMs, 250);
      this.lastMs = now;
      this.tick(dt);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    this.target.dispose();
    this.postGeometry.dispose();
    this.postMaterial.dispose();
    this.renderer.dispose();
  }
}
