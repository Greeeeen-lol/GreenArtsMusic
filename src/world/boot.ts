/**
 * The real 3D world boot. This module, and only this module, may import
 * Three.js — it is reached exclusively through the dynamic `import('./world/boot')`
 * in `src/main.ts`, so a teaser build's bundler can prove nothing under here
 * is reachable and eliminate it (and the engine it pulls in) entirely.
 *
 * Boots into `Ch1Chapter`, the apartment — or, for a player who has already
 * been through it (`save.chapter >= 2`), the hallway outside its door.
 * `WorldFlow` walks them between the two from there.
 */
import { Engine, type EngineOptions } from '../core/engine';
import { InputRouter } from '../input/index';
import { KeyboardSource } from '../input/keyboard';
import { PointerSource } from '../input/pointer';
import { TouchSource } from '../input/touch';
import { Player } from '../core/player';
import { Lantern } from '../core/light';
import { Interactor } from '../core/interact';
import { AudioDirector } from '../core/audio';
import { Subtitle } from '../ui/subtitle';
import { HintTimer } from '../core/hint';
import { loadSave, SAVE_KEY } from '../core/save';
import { makeContext, ChapterRouter, type Chapter } from '../core/chapter';
import { Ch1Chapter } from '../chapters/ch1-denial/index';
import { HallwayChapter } from '../chapters/hallway/index';
import { WorldFlow } from './flow';
import { PauseMenu } from '../ui/pause';
import { loadSettings, writeSettings } from '../core/settings';

export interface WorldHandle {
  dispose(): void;
}

export interface EnterWorldOptions {
  /**
   * Renderer factory, injected by tests. `Engine` already takes one
   * (`EngineOptions.createRenderer`) precisely because happy-dom has no
   * WebGL context and `new THREE.WebGLRenderer()` throws there. Without
   * threading it through, `enterWorld` is untestable in the suite and the
   * first thing to boot the whole game would have no coverage at all.
   */
  createRenderer?: EngineOptions['createRenderer'];
  isMobile?: boolean;
  /**
   * AudioContext factory, injected by tests — the same escape hatch as
   * `createRenderer`, for the same reason: happy-dom has no Web Audio API
   * at all (no `AudioContext`, prefixed or otherwise), so without this hook
   * `enterWorld` cannot construct `AudioDirector` in the test environment.
   * Production code never passes this; the default below constructs a real
   * `AudioContext`.
   */
  createAudioContext?: () => AudioContext;
}

export async function enterWorld(
  root: HTMLElement,
  opts: EnterWorldOptions = {},
): Promise<WorldHandle> {
  // `root` (`#app`) is already `position: fixed; inset: 0` care of
  // `done.css`, which main.ts always loads, so sizing the canvas and
  // overlay inline here is what actually fills the viewport. Without this a
  // real browser renders the canvas at its intrinsic 300x150 default in the
  // top-left corner — a "black screen" bug happy-dom cannot see, since it
  // does no CSS layout at all and every test here passes with or without
  // it. (The ids are just for identification — no CSS keys off them;
  // `Subtitle` imports its own `.subtitle` styling directly.)
  const canvas = document.createElement('canvas');
  canvas.id = 'stage';
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  root.appendChild(canvas);

  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.pointerEvents = 'none';
  root.appendChild(overlay);

  const engine = new Engine({
    canvas,
    isMobile: opts.isMobile ?? false,
    createRenderer: opts.createRenderer,
  });

  const input = new InputRouter();
  input.add(new KeyboardSource()).add(new PointerSource()).add(new TouchSource());
  input.attach(canvas);

  const player = new Player();
  const lantern = new Lantern();
  const interactor = new Interactor();
  const audio = new AudioDirector(opts.createAudioContext ? opts.createAudioContext() : new AudioContext());
  const subtitle = new Subtitle(overlay);
  const hint = new HintTimer();
  const save = loadSave();

  // makeContext already adds the lantern's light to the scene — do not add
  // it again here, or a second copy shows up in the render (see the
  // comment on makeContext in core/chapter.ts).
  const ctx = makeContext({
    engine,
    input,
    player,
    lantern,
    interactor,
    audio,
    subtitle,
    hint,
    save,
  });

  const router = new ChapterRouter(ctx);
  // Chapters own their own 2D surfaces (the examine panel, the end card,
  // the crosshair), mounted into the same overlay as the subtitle.
  const make = (id: string): Chapter => {
    switch (id) {
      case 'hallway':
        return new HallwayChapter(overlay);
      case 'ch1':
        return new Ch1Chapter(overlay);
      default:
        throw new Error(`no chapter "${id}"`);
    }
  };
  const flow = new WorldFlow(router, overlay, make);
  await flow.start(save.chapter >= 2 ? 'hallway' : 'ch1');

  // Escape. While it's up the world holds still. "back to the hallway"
  // only exists for a player who has already finished chapter one.
  let settings = loadSettings();
  audio.setVolume(settings.volume);
  const pause = new PauseMenu(overlay, {
    canOpen: () =>
      !flow.busy &&
      !overlay.querySelector('.examine, .endcard, .devpanel:not([hidden])'),
    canGoHallway: () => save.chapter >= 2 && flow.currentId !== 'hallway',
    onHallway: () => flow.goTo('hallway'),
    onQuit: () => location.reload(),
    relock: () => {
      void (canvas.requestPointerLock?.() as Promise<void> | undefined)?.catch?.(() => {});
    },
    settings: () => settings,
    onSettings: (s) => {
      settings = s;
      audio.setVolume(s.volume);
      writeSettings(s);
    },
  });

  // Dev server only (statically false in every build): a handle for
  // playtesting from the console — teleport, read the save, solve things —
  // and the F2 panel for ticking puzzles solved or unsolved.
  let devPanel: { dispose(): void } | null = null;
  if (import.meta.env.DEV) {
    (window as unknown as { __arg?: unknown }).__arg = { ctx, router, flow };
    const { DevPanel } = await import('../dev/panel');
    devPanel = new DevPanel(
      overlay,
      () => {
        const c = router.current();
        return c instanceof Ch1Chapter ? c : null;
      },
      () => localStorage.removeItem(SAVE_KEY),
      (id) => flow.goTo(id),
    );
  }

  engine.onFixed((dtSeconds) => {
    const raw = input.update(dtSeconds * 1000);
    const actions = {
      ...raw,
      lookX: raw.lookX * settings.lookSpeed,
      lookY: raw.lookY * settings.lookSpeed * (settings.invertY ? -1 : 1),
    };
    pause.sync();
    if (pause.isOpen) return;
    flow.fixedUpdate(dtSeconds, actions);
  });

  // iOS can suspend the AudioContext on tab switch (or mid-session, e.g. a
  // phone call) — see the comment on AudioDirector.bindVisibility. Keep the
  // unbind function so dispose() can actually release it; main.ts's old
  // stub discarded this, which was the bug.
  const unbindVisibility = audio.bindVisibility();

  engine.start();

  let disposed = false;
  return {
    dispose(): void {
      if (disposed) return;
      disposed = true;
      unbindVisibility();
      devPanel?.dispose();
      pause.dispose();
      engine.stop();
      flow.dispose();
      router.dispose();
      input.detach();
      canvas.remove();
      overlay.remove();
    },
  };
}
