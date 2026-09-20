import { DonePage } from './done/page';

const root = document.getElementById('app');
if (!root) throw new Error('missing #app');

const page = new DonePage({
  root,
  audioSrc: '/audio/done/fragment.mp3',
  onSolved: () => {
    // The world does not exist yet. When it does, this is the only place it
    // is ever loaded — dynamically, so nobody arriving from a social link
    // downloads a 3D engine to read one word on a black screen.
    void loadWorld();
  },
});

page.mount();

async function loadWorld(): Promise<void> {
  // The ONLY place the world is ever loaded. Dynamic, so nobody arriving from
  // a social link downloads a 3D engine to read one word on a black screen.
  // Plan 1c replaces the stub's body; this call site does not change.
  const { enterWorld } = await import('./world/stub');
  await enterWorld();
}
