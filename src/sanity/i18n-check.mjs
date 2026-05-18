/**
 * Verifies locale completeness across the bundled messages/ files.
 * Exits non-zero when a locale is missing keys — usable in CI.
 *
 *   node src/sanity/i18n-check.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LOCALES = ['en', 'fr', 'ar', 'kr'];

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;

    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }

  return out;
}

const flat = {};

for (const loc of LOCALES) {
  flat[loc] = flatten(
    JSON.parse(readFileSync(join(ROOT, 'messages', `${loc}.json`), 'utf8'))
  );
}

const keys = [...new Set(LOCALES.flatMap((l) => Object.keys(flat[l])))].sort();
let failed = false;

for (const loc of LOCALES) {
  const missing = keys.filter((k) => typeof flat[loc][k] !== 'string');

  if (missing.length) {
    failed = true;
    console.error(`✗ ${loc}: ${missing.length} missing key(s)`);
    missing.forEach((k) => console.error(`    ${k}`));
  } else {
    console.log(`✓ ${loc}: ${keys.length} keys`);
  }
}

if (failed) {
  console.error('\ni18n check failed — locales are not in parity.');
  process.exit(1);
}

console.log(`\ni18n check passed — ${keys.length} keys across ${LOCALES.length} locales.`);
