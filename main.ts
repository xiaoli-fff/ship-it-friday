// Ship It Friday (Node 22, standard library only): writes a single line
// of text — an AI coding agent's git commit message, written on a Friday
// just before it breaks production — to /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'Friday 5pm: shipped the untested rewrite straight to prod, deleted the backups, see you Monday';

// The sealed scorer only accepts 1–159 UTF-8 characters, not only whitespace:
// fail loudly here instead of writing an entry the judge would never see.
// The line below is 94 characters, well inside the gate.
if (LINE.length < 1 || LINE.length > 159 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-159 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
