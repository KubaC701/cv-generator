#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, extname } from 'path';
import { execSync } from 'child_process';

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const MAX_DIMENSION = 200;

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Usage: node scripts/photo-to-base64.mjs <image-path>');
  console.error('Example: node scripts/photo-to-base64.mjs data/photo.jpg');
  process.exit(1);
}

const absPath = resolve(inputPath);

if (!existsSync(absPath)) {
  console.error(`File not found: ${absPath}`);
  process.exit(1);
}

const ext = extname(absPath).toLowerCase();
const mime = MIME_TYPES[ext];

if (!mime) {
  console.error(`Unsupported format: ${ext}`);
  console.error(`Supported: ${Object.keys(MIME_TYPES).join(', ')}`);
  process.exit(1);
}

// Resize with sips (macOS) or sharp/imagemagick if available
const tmpPath = '/tmp/cv-photo-resized' + ext;

try {
  execSync(`sips -Z ${MAX_DIMENSION} "${absPath}" --out "${tmpPath}" 2>/dev/null`, {
    stdio: 'pipe',
  });
} catch {
  // sips not available (non-macOS) — try convert (ImageMagick)
  try {
    execSync(
      `convert "${absPath}" -resize ${MAX_DIMENSION}x${MAX_DIMENSION} "${tmpPath}"`,
      { stdio: 'pipe' }
    );
  } catch {
    // No resize tool — use original
    console.warn('Warning: could not resize image (no sips or ImageMagick). Using original.');
    execSync(`cp "${absPath}" "${tmpPath}"`, { stdio: 'pipe' });
  }
}

const buffer = readFileSync(tmpPath);
const base64 = buffer.toString('base64');
const dataUri = `data:${mime};base64,${base64}`;

const outPath = resolve('data/photo-base64.txt');
writeFileSync(outPath, dataUri);

const sizeKb = Math.round(buffer.length / 1024);
console.log(`Resized to max ${MAX_DIMENSION}px (${sizeKb} KB)`);
console.log(`Data URI saved to: data/photo-base64.txt`);
console.log(`\nPaste this into an <img> tag:`);
console.log(`<img src="<contents of data/photo-base64.txt>" alt="Photo">`);
