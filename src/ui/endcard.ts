import './examine.css';

/** The fade to black at the end of a chapter. Stays until the page reloads. */
export class EndCard {
  private root: HTMLElement;
  private el: HTMLDivElement | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  get shown(): boolean {
    return this.el !== null;
  }

  /** `cut`: the first line is there on the instant, like a hard cut on a
   *  beat; the rest follow as usual. */
  show(lines: readonly string[], opts: { cut?: boolean } = {}): void {
    if (this.el) return;
    const el = document.createElement('div');
    el.className = opts.cut ? 'endcard endcard--cut' : 'endcard';
    el.setAttribute('role', 'status');
    const first = opts.cut ? 0 : 1.2;
    lines.forEach((text, i) => {
      const line = document.createElement('p');
      line.className = 'endcard__line';
      line.style.animationDelay = `${first + i * 1.6}s`;
      line.textContent = text;
      el.appendChild(line);
    });
    this.root.appendChild(el);
    this.el = el;
    document.exitPointerLock?.();
  }

  dispose(): void {
    this.el?.remove();
    this.el = null;
  }
}
