import './examine.css';
import { LOOK_SPEED_MAX, LOOK_SPEED_MIN, type Settings } from '../core/settings';

export interface PauseMenuOptions {
  /** False while something else owns the screen (a document, the end card,
   *  the dev panel, a curtain mid-swap) — the menu stays shut then. */
  canOpen: () => boolean;
  /** Whether "back to the hallway" is offered: only once chapter one is
   *  done, and not while already standing in it. */
  canGoHallway: () => boolean;
  onHallway: () => void;
  onQuit: () => void;
  /** Recaptures the mouse. Only called from a click, which is the user
   *  gesture pointer lock needs. */
  relock: () => void;
  /** Live settings, read when the settings screen opens. */
  settings: () => Settings;
  /** Called on every change, as the slider moves. */
  onSettings: (s: Settings) => void;
}

/**
 * Escape pauses. The browser spends the Escape key on releasing pointer
 * lock and usually never delivers the keydown, so the lock coming off while
 * nothing else asked for it is read as the same press. With the mouse
 * already free, the keydown does arrive and toggles the menu directly.
 */
export class PauseMenu {
  private root: HTMLElement;
  private opts: PauseMenuOptions;
  private el: HTMLDivElement | null = null;
  private openedAt = 0;
  /** Phones have no Escape: a small pause button in the corner, shown only
   *  on touch screens (the CSS decides) and only when the menu could open. */
  private button: HTMLButtonElement;

  constructor(root: HTMLElement, opts: PauseMenuOptions) {
    this.root = root;
    this.opts = opts;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pause-button';
    b.setAttribute('aria-label', 'pause');
    b.setAttribute('data-no-lock', '');
    b.addEventListener('click', () => this.open());
    root.appendChild(b);
    this.button = b;
    this.sync();
    window.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('pointerlockchange', this.onLockChange);
  }

  get isOpen(): boolean {
    return this.el !== null;
  }

  open(): void {
    if (this.el || !this.opts.canOpen()) return;
    const el = document.createElement('div');
    el.className = 'pause';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'paused');
    el.setAttribute('data-no-lock', '');
    this.root.appendChild(el);
    this.el = el;
    this.openedAt = performance.now();
    this.showMain();
    document.exitPointerLock?.();
    this.sync();
  }

  /** A fresh panel inside the dialog, titled. */
  private panel(title: string): HTMLDivElement {
    const panel = document.createElement('div');
    panel.className = 'pause__panel';
    const t = document.createElement('div');
    t.className = 'pause__title';
    t.textContent = title;
    panel.appendChild(t);
    this.el!.replaceChildren(panel);
    return panel;
  }

  private item(panel: HTMLElement, label: string, act: () => void): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pause__item';
    b.textContent = label;
    b.addEventListener('click', act);
    panel.appendChild(b);
    return b;
  }

  private showMain(focus = 'resume'): void {
    const panel = this.panel('paused');
    const items: HTMLButtonElement[] = [];
    items.push(this.item(panel, 'resume', () => {
      this.close();
      this.opts.relock();
    }));
    if (this.opts.canGoHallway()) {
      items.push(this.item(panel, 'back to the hallway', () => {
        this.close();
        this.opts.onHallway();
        this.opts.relock();
      }));
    }
    items.push(this.item(panel, 'settings', () => this.showSettings()));
    items.push(this.item(panel, 'quit', () => {
      this.close();
      this.opts.onQuit();
    }));
    (items.find((b) => b.textContent === focus) ?? items[0])!.focus();
  }

  private showSettings(): void {
    const panel = this.panel('settings');
    const s = { ...this.opts.settings() };
    const commit = (): void => this.opts.onSettings({ ...s });

    const slider = (
      label: string,
      min: number,
      max: number,
      step: number,
      value: number,
      show: (v: number) => string,
      set: (v: number) => void,
    ): HTMLInputElement => {
      const row = document.createElement('label');
      row.className = 'pause__row';
      const name = document.createElement('span');
      name.textContent = label;
      const input = document.createElement('input');
      input.type = 'range';
      input.className = 'pause__slider';
      input.min = String(min);
      input.max = String(max);
      input.step = String(step);
      input.value = String(value);
      const out = document.createElement('span');
      out.className = 'pause__value';
      out.textContent = show(value);
      input.addEventListener('input', () => {
        const v = Number(input.value);
        out.textContent = show(v);
        set(v);
        commit();
      });
      row.append(name, input, out);
      panel.appendChild(row);
      return input;
    };

    const first = slider('volume', 0, 1, 0.05, s.volume, (v) => `${Math.round(v * 100)}%`, (v) => {
      s.volume = v;
    });
    slider('look speed', LOOK_SPEED_MIN, LOOK_SPEED_MAX, 0.05, s.lookSpeed, (v) => `${v.toFixed(2)}x`, (v) => {
      s.lookSpeed = v;
    });
    const invert = this.item(panel, '', () => {
      s.invertY = !s.invertY;
      invert.textContent = `invert look: ${s.invertY ? 'on' : 'off'}`;
      commit();
    });
    invert.textContent = `invert look: ${s.invertY ? 'on' : 'off'}`;
    this.item(panel, 'back', () => this.showMain('settings'));
    first.focus();
  }

  close(): void {
    this.el?.remove();
    this.el = null;
    this.sync();
  }

  /** Hides the pause button while the menu is up or can't open. Called
   *  every fixed step by the world loop. */
  sync(): void {
    const hide = this.el !== null || !this.opts.canOpen();
    if (this.button.hidden !== hide) this.button.hidden = hide;
  }

  dispose(): void {
    this.close();
    this.button.remove();
    window.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('pointerlockchange', this.onLockChange);
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape' || e.repeat) return;
    if (this.el) {
      // Some browsers deliver the keydown after the lock change already
      // opened the menu for this same press; don't shut it again.
      if (performance.now() - this.openedAt < 250) return;
      this.close();
      return;
    }
    this.open();
  };

  private onLockChange = (): void => {
    if (document.pointerLockElement) return;
    this.open();
  };
}
