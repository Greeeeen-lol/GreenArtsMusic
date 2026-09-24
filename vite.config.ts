import { defineConfig, type Plugin } from 'vite';
import { readdirSync, rmSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/**
 * Everything the teaser is allowed to publish, as paths relative to the build
 * output root, plus `assets/` which holds whatever Vite emits.
 *
 * This is an ALLOWLIST on purpose. A denylist of "world things" only catches
 * the world assets somebody remembered to list: `public/textures/hair-*.png`
 * arrived from unrelated player-character work, nothing imported them,
 * nothing referenced them, and a build copied all 92 KB of an unreleased
 * character's hair straight into the site. `public/` is copied verbatim, so
 * the only safe question to ask is "is this file supposed to be public?"
 */
export const TEASER_FILES: readonly string[] = [
  'index.html',
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'og.png',
  'audio/done/fragment.mp3',
];

/** Build output directories whose contents Vite itself emitted. */
const EMITTED_DIRS: readonly string[] = ['assets'];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/**
 * Strips anything the teaser is not allowed to publish out of the build
 * output. Runs only when the world is withheld.
 *
 * The release gate for this project is withholding FILES, not checking dates:
 * a chapter ships when its assets are uploaded. That only works if a teaser
 * build cannot quietly carry a later chapter's assets with it, which is
 * exactly what `public/` does by default.
 */
function teaserOnly(worldEnabled: boolean): Plugin {
  return {
    name: 'greenart-teaser-only',
    apply: 'build',
    closeBundle: {
      sequential: true,
      order: 'post',
      handler(this: unknown): void {
        if (worldEnabled) return;
        const outDir = join(process.cwd(), 'dist');
        let files: string[];
        try {
          files = walk(outDir);
        } catch {
          return;
        }
        const removed: string[] = [];
        for (const full of files) {
          const rel = relative(outDir, full).split(sep).join('/');
          if (TEASER_FILES.includes(rel)) continue;
          if (EMITTED_DIRS.some((d) => rel.startsWith(`${d}/`))) continue;
          rmSync(full);
          removed.push(rel);
        }
        if (removed.length > 0) {
          // Loud on purpose. A silently pruned file is indistinguishable
          // from one that was never there, and this is the step that
          // decides what the public internet can download.
          console.log(
            `\n[teaser] withheld ${removed.length} non-teaser file(s) from dist:\n` +
              removed.map((r) => `  - ${r}`).join('\n') +
              `\n[teaser] to publish the world instead, build with: npm run build:world\n`,
          );
        }
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  // `--mode world` loads .env.world, which sets VITE_WORLD=on. Anything else
  // gets .env, which sets it off. The default build is the teaser: the safe
  // direction, so forgetting the flag withholds too much rather than too
  // little.
  const worldEnabled = mode === 'world';
  return {
    define: {
      // Statically replaced, so `if (__WORLD__)` is dead-code eliminated and
      // the dynamic import() of the engine is never emitted at all in a
      // teaser build. Verified by scripts/verify-teaser.mjs, which greps the
      // real output rather than trusting this comment.
      __WORLD__: JSON.stringify(worldEnabled),
    },
    plugins: [teaserOnly(worldEnabled)],
  };
});
