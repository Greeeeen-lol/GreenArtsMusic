/**
 * Playtesting panel. Dev server only: boot.ts imports this behind
 * `import.meta.env.DEV`, which is statically false in every build, so none
 * of it (answers included) can reach a published bundle.
 *
 * F2 toggles it. Tick the puzzles you want solved; changes apply live.
 * Below that, the ambience loop's timing, shared by all three stems: edit,
 * listen, then paste the line it gives you into ch1-denial/sound.ts.
 */
import { PUZZLES, type PuzzleId } from '../chapters/ch1-denial/puzzles';
import type { Ch1Chapter } from '../chapters/ch1-denial/index';
import { WITHOUT_YOU_NOW } from '../chapters/ch1-denial/sound';
import type { LoopWindow } from '../core/score';

/** Dev-only override of the loop timing, kept across reloads. */
const LOOP_KEY = 'greenart.dev.loopWindow';
/** "hear seam" starts this long before the loop point. */
const SEAM_LEAD_SECONDS = 3;

const CSS = `
.devpanel{position:absolute;top:12px;right:12px;z-index:50;pointer-events:auto;
  font:12px/1.4 ui-monospace,Consolas,monospace;color:#d8dde6;background:rgba(12,14,18,.94);
  border:1px solid #3a3f4a;border-radius:6px;padding:10px 12px;min-width:260px;user-select:none}
.devpanel[hidden]{display:none}
.devpanel h2{margin:0 0 8px;font-size:12px;font-weight:600;color:#9aa3b2;letter-spacing:.05em}
.devpanel label{display:flex;gap:8px;align-items:center;padding:2px 0;cursor:pointer}
.devpanel .ans{margin-left:auto;color:#6c7483}
.devpanel .row{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
.devpanel button{font:inherit;color:inherit;background:#232833;border:1px solid #3a3f4a;
  border-radius:4px;padding:3px 8px;cursor:pointer}
.devpanel button:hover{background:#2e3542}
.devpanel .note{margin-top:8px;color:#c9a35b}
.devpanel .note:empty{display:none}
.devpanel hr{border:0;border-top:1px solid #3a3f4a;margin:10px 0}
.devpanel .field{cursor:default}
.devpanel .field .name{width:36px;color:#9aa3b2}
.devpanel .field .hint{color:#6c7483}
.devpanel input[type=number]{width:72px;font:inherit;color:inherit;background:#1a1e26;
  border:1px solid #3a3f4a;border-radius:4px;padding:2px 4px}
.devpanel .pos{margin-top:8px;color:#9aa3b2}
.devpanel .copy{width:100%;box-sizing:border-box;margin-top:6px;font:inherit;color:#b8e0a8;
  background:#1a1e26;border:1px solid #3a3f4a;border-radius:4px;padding:3px 4px;user-select:all}
`;

interface LoopInputs {
  start: HTMLInputElement;
  at: HTMLInputElement;
  end: HTMLInputElement;
}

export class DevPanel {
  private el: HTMLDivElement;
  private style: HTMLStyleElement;
  private boxes = new Map<PuzzleId, HTMLInputElement>();
  private note: HTMLDivElement;
  private loop: LoopInputs;
  private loopNote: HTMLDivElement;
  private pos: HTMLDivElement;
  private copy: HTMLInputElement;
  private posTimer: ReturnType<typeof setInterval> | null = null;

  /**
   * `current` is whichever chapter one is live, or null while the player is
   * somewhere else (the hallway); it changes as they go back and forth.
   * `jump` sends the player to a chapter by id, as the game itself would.
   */
  constructor(
    root: HTMLElement,
    private current: () => Ch1Chapter | null,
    private resetSave: () => void,
    private jump: (id: 'ch1' | 'hallway') => void = () => {},
  ) {
    this.style = document.createElement('style');
    this.style.textContent = CSS;
    document.head.appendChild(this.style);

    const el = document.createElement('div');
    el.className = 'devpanel';
    el.hidden = true;
    // Clicks here must not grab the mouse for the room.
    el.setAttribute('data-no-lock', '');
    el.innerHTML = '<h2>DEV · CHAPTER ONE (F2)</h2>';

    for (const p of PUZZLES) {
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.addEventListener('change', () => this.apply());
      const name = document.createElement('span');
      name.textContent = `${p.letter}  ${p.id}`;
      const ans = document.createElement('span');
      ans.className = 'ans';
      ans.textContent = p.answers[0]!;
      label.append(box, name, ans);
      el.appendChild(label);
      this.boxes.set(p.id, box);
    }

    const row = document.createElement('div');
    row.className = 'row';
    row.append(
      this.button('all', () => this.setAll(true)),
      this.button('none', () => this.setAll(false)),
      this.button('wipe save + reload', () => {
        this.resetSave();
        location.reload();
      }),
    );
    el.appendChild(row);

    const jumpRow = document.createElement('div');
    jumpRow.className = 'row';
    jumpRow.append(
      this.button('→ hallway', () => this.jump('hallway')),
      this.button('→ chapter one', () => this.jump('ch1')),
    );
    el.appendChild(jumpRow);

    this.note = document.createElement('div');
    this.note.className = 'note';
    el.appendChild(this.note);

    // ------------------------- ambience loop ------------------------ //

    el.appendChild(document.createElement('hr'));
    const h = document.createElement('h2');
    h.textContent = 'AMBIENCE LOOP · all 3 stems';
    el.appendChild(h);

    this.loop = {
      start: this.field(el, 'start', 'music begins'),
      at: this.field(el, 'loop', 'next pass starts'),
      end: this.field(el, 'end', 'cut off · blank = file end'),
    };

    const loopRow = document.createElement('div');
    loopRow.className = 'row';
    loopRow.append(
      this.button('apply', () => this.applyFromInputs()),
      this.button('hear seam', () => {
        const w = this.readInputs();
        if (w) this.applyLoop(w, Math.max(w.startAt, w.loopAt - SEAM_LEAD_SECONDS));
      }),
      this.button('defaults', () => {
        try {
          localStorage.removeItem(LOOP_KEY);
        } catch {
          // storage blocked; the default still applies for this session
        }
        this.applyLoop(WITHOUT_YOU_NOW, undefined, false);
      }),
    );
    el.appendChild(loopRow);

    this.pos = document.createElement('div');
    this.pos.className = 'pos';
    el.appendChild(this.pos);

    this.copy = document.createElement('input');
    this.copy.className = 'copy';
    this.copy.readOnly = true;
    this.copy.title = 'paste over WITHOUT_YOU_NOW in src/chapters/ch1-denial/sound.ts';
    this.copy.addEventListener('focus', () => this.copy.select());
    el.appendChild(this.copy);

    this.loopNote = document.createElement('div');
    this.loopNote.className = 'note';
    el.appendChild(this.loopNote);

    // Typing a number must not walk: KeyboardSource listens on window.
    for (const type of ['keydown', 'keyup'] as const) {
      el.addEventListener(type, (e) => {
        if (e.code !== 'F2') e.stopPropagation();
      });
    }

    root.appendChild(el);
    this.el = el;
    window.addEventListener('keydown', this.onKey);

    const saved = readSavedLoop();
    if (saved) this.applyLoop(saved, undefined, false);
    else this.showLoop(WITHOUT_YOU_NOW);
  }

  private button(text: string, onClick: () => void): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    b.addEventListener('click', onClick);
    return b;
  }

  private field(el: HTMLElement, label: string, hint: string): HTMLInputElement {
    const row = document.createElement('label');
    row.className = 'field';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = label;
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '0.01';
    input.min = '0';
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.applyFromInputs();
    });
    const note = document.createElement('span');
    note.className = 'hint';
    note.textContent = hint;
    row.append(name, input, note);
    el.appendChild(row);
    return input;
  }

  private onKey = (e: KeyboardEvent): void => {
    if (e.code !== 'F2') return;
    e.preventDefault();
    this.toggle();
  };

  toggle(): void {
    this.el.hidden = !this.el.hidden;
    if (this.posTimer !== null) clearInterval(this.posTimer);
    this.posTimer = null;
    if (this.el.hidden) return;
    this.sync();
    this.updatePosition();
    this.posTimer = setInterval(() => this.updatePosition(), 50);
    document.exitPointerLock?.();
  }

  /** Reads the chapter's current solved set into the checkboxes. */
  private sync(): void {
    const ch = this.current();
    for (const [id, box] of this.boxes) box.checked = ch?.puzzles.isSolved(id) ?? false;
    this.note.textContent = !ch
      ? 'not in chapter one right now.'
      : ch.isEnded
        ? 'chapter ended — reload to change anything.'
        : '';
  }

  private setAll(on: boolean): void {
    for (const box of this.boxes.values()) box.checked = on;
    this.apply();
  }

  private apply(): void {
    const ids = [...this.boxes].filter(([, b]) => b.checked).map(([id]) => id);
    this.current()?.devSetSolved(ids);
    this.sync();
  }

  // ------------------------- ambience loop -------------------------- //

  private readInputs(): LoopWindow | null {
    const num = (i: HTMLInputElement): number => Number.parseFloat(i.value);
    const w: LoopWindow = { startAt: num(this.loop.start), loopAt: num(this.loop.at) };
    if (this.loop.end.value.trim() !== '') w.endAt = num(this.loop.end);
    return w;
  }

  private applyFromInputs(): void {
    const w = this.readInputs();
    if (w) this.applyLoop(w);
  }

  /** Swaps the timing on the live score and restarts it (from `from`). */
  private applyLoop(w: LoopWindow, from?: number, persist = true): void {
    const sound = this.current()?.devSound ?? null;
    try {
      sound?.setLoopWindow(w, from);
    } catch {
      this.loopNote.textContent = 'needs numbers, with 0 ≤ start < loop ≤ end.';
      return;
    }
    this.loopNote.textContent = sound ? '' : 'sound not loaded yet.';
    if (persist) {
      try {
        localStorage.setItem(LOOP_KEY, JSON.stringify(w));
      } catch {
        // storage blocked: still applied, just not remembered
      }
    }
    this.showLoop(w);
  }

  private showLoop(w: LoopWindow): void {
    this.loop.start.value = String(w.startAt);
    this.loop.at.value = String(w.loopAt);
    this.loop.end.value = w.endAt === undefined ? '' : String(w.endAt);
    const end = w.endAt === undefined ? '' : `, endAt: ${w.endAt}`;
    this.copy.value = `{ startAt: ${w.startAt}, loopAt: ${w.loopAt}${end} }`;
  }

  private updatePosition(): void {
    const sound = this.current()?.devSound ?? null;
    const p = sound?.position();
    const len = sound?.fileSeconds;
    this.pos.textContent =
      p == null ? 'playhead —' : `playhead ${p.toFixed(2)} s` + (len ? `   (file ${len.toFixed(2)} s)` : '');
  }

  dispose(): void {
    if (this.posTimer !== null) clearInterval(this.posTimer);
    window.removeEventListener('keydown', this.onKey);
    this.el.remove();
    this.style.remove();
  }
}

function readSavedLoop(): LoopWindow | null {
  try {
    const raw = localStorage.getItem(LOOP_KEY);
    if (!raw) return null;
    const w = JSON.parse(raw) as LoopWindow;
    return typeof w.startAt === 'number' && typeof w.loopAt === 'number' ? w : null;
  } catch {
    return null;
  }
}
