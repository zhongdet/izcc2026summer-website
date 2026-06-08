// Post-build script: patch dist/index.html for file:// compatibility
// Vite outputs <script type="module" crossorigin> which doesn't work with file:// protocol.
// We replace it with <script defer> and remove crossorigin from link tags.

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, '../dist/index.html');

let html = readFileSync(indexPath, 'utf-8');

// Remove type="module" crossorigin from script tags, add defer
html = html.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/g,
  '<script defer src="$1"></script>'
);

// Remove crossorigin from link/stylesheet tags
html = html.replace(
  /<link rel="stylesheet" crossorigin href=/g,
  '<link rel="stylesheet" href='
);

writeFileSync(indexPath, html);
console.log('✓ Patched dist/index.html for file:// compatibility');
console.log('  - Removed type="module" crossorigin from script');
console.log('  - Added defer to script');
console.log('  - Removed crossorigin from stylesheet links');
