import './examine.css';

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

    const panel = document.createElement('div');
    panel.className = 'pause__panel';
    const title = document.createElement('div');
    title.className = 'pause__title';
    title.textContent = 'paused';
    panel.appendChild(title);

    const item = (label: string, act: () => void): HTMLButtonElement => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pause__item';
      b.textContent = label;
      b.addEventListener('click', act);
      panel.appendChild(b);
      return b;
    };
    const first = item('resume', () => {
      this.close();
      this.opts.relock();
    });
    if (this.opts.canGoHallway()) {
      item('back to the hallway', () => {
        this.close();
        this.opts.onHallway();
        this.opts.relock();
      });
    }
    item('quit', () => {
      this.close();
      this.opts.onQuit();
    });

    el.appendChild(panel);
    this.root.appendChild(el);
    this.el = el;
    this.openedAt = performance.now();
    document.exitPointerLock?.();
    first.focus();
    this.sync();
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
