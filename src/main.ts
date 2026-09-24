import { DonePage } from './done/page';

const root = document.getElementById('app');
if (!root) throw new Error('missing #app');
// `root` narrows to `HTMLElement` only within this module's top-level flow;
// TS cannot carry that narrowing into `enterGame`, a function defined below
// that closes over the same `const` (it could theoretically be reassigned
// from another scope). Bind the narrowed value once so both the page and
// the world it hands off to share one definitely-non-null root element.
const appRoot: HTMLElement = root;

const page = new DonePage({
  root: appRoot,
  audioSrc: '/audio/done/fragment.mp3',
  onSolved: () => {
    /* the collapse finished. the page stays until the second word. */
  },
  onStart: __WORLD__ ? () => { void enterGame(); } : null,
});

page.mount();

async function enterGame(): Promise<void> {
  // The ONLY place the world is ever loaded. Dynamic, so nobody arriving
  // from a social link downloads a 3D engine to read one word on a black
  // screen.
  const { enterWorld } = await import('./world/boot');
  page.dispose();
  await enterWorld(appRoot);
}
