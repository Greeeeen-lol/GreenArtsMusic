import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

// Must match normalizeAnswer() in src/done/gate.ts exactly.
export const normalize = (raw) =>
  raw.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();

// Must match fnv1aHex() in src/done/gate.ts exactly.
function fnv1aHex(input) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

function main() {
  const answers = ["i don't know"];
  for (const a of answers) {
    const n = normalize(a);
    const sha256 = createHash('sha256').update(n).digest('hex');
    const fnv1a = fnv1aHex(n);
    console.log(`${JSON.stringify(a)} -> ${JSON.stringify(n)}`);
    console.log(`  sha256: ${sha256}`);
    console.log(`  fnv1a:  ${fnv1a}`);
  }
}

// Only run when invoked directly (node scripts/answer-hash.mjs), not when
// imported by tests for the `normalize` parity check. Compares resolved
// file:// URLs (via pathToFileURL) rather than string-concatenating
// process.argv[1], which breaks on Windows (backslashes, drive letters).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
