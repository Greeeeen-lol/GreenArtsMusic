#!/usr/bin/env node
/**
 * Audits a built `dist/` before it is published.
 *
 * This exists because "the code is separated" and "the site is separated"
 * turned out to be different claims. The dynamic import() kept Three.js out
 * of the entry chunk from day one — and a build still copied an unreleased
 * character's hair textures and a later chapter's audio into the public
 * site, because Vite copies `public/` verbatim regardless of what any code
 * imports. Greping the real output is the only check that would have caught
 * it.
 *
 * Usage: node scripts/verify-teaser.mjs
 * Exits non-zero, loudly, if anything the teaser must not publish is present.
 */
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = join(process.cwd(), 'dist');

/** Paths the teaser is allowed to publish, besides Vite's own `assets/`. */
const ALLOWED = new Set([
  'index.html',
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'og.png',
  'audio/done/fragment.mp3',
]);

/**
 * Substrings that mean the 3D engine reached the output. Deliberately
 * specific: `three` alone matches the English word and would cry wolf on
 * ordinary copy.
 */
const ENGINE_MARKERS = [
  'THREE.',
  'WebGLRenderer',
  'BufferGeometry',
  'PerspectiveCamera',
  'ShaderMaterial',
  'isMesh',
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let files;
try {
  files = walk(DIST);
} catch {
  console.error('[verify-teaser] no dist/ to check. run `npm run build` first.');
  process.exit(1);
}

const problems = [];

for (const full of files) {
  const rel = relative(DIST, full).split(sep).join('/');
  const emitted = rel.startsWith('assets/');
  if (!emitted && !ALLOWED.has(rel)) {
    problems.push(`publishes a file the teaser does not own: ${rel}`);
  }
  if (!/\.(js|mjs|css|html)$/.test(rel)) continue;
  const text = readFileSync(full, 'utf8');
  for (const marker of ENGINE_MARKERS) {
    if (text.includes(marker)) {
      problems.push(`contains the 3D engine (${marker}): ${rel}`);
      break;
    }
  }
}

for (const required of ALLOWED) {
  if (!files.some((f) => relative(DIST, f).split(sep).join('/') === required)) {
    problems.push(`missing a file the page references: ${required}`);
  }
}

const bytes = files.reduce((n, f) => n + statSync(f).size, 0);

if (problems.length > 0) {
  console.error('\n[verify-teaser] DO NOT PUBLISH THIS BUILD:\n');
  for (const p of problems) console.error(`  x ${p}`);
  console.error('');
  process.exit(1);
}

console.log(
  `[verify-teaser] ok — ${files.length} files, ${(bytes / 1024).toFixed(1)} KB, no engine, nothing withheld leaked.`,
);
