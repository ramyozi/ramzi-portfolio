/**
 * Verifies UI translation completeness in Sanity.
 * Exits non-zero when a key is missing a locale value — usable in CI.
 *
 *   node src/sanity/i18n-check.mjs
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LOCALES = ['en', 'fr', 'ar', 'kr'];

dotenv.config({ path: join(ROOT, '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: false,
});

const docs = await client.fetch(
  '*[_type == "translation" && defined(key)]{ key, en, fr, ar, kr }'
);

if (!docs.length) {
  console.error('i18n check failed — no translation documents in Sanity.');
  process.exit(1);
}

let failed = false;

for (const loc of LOCALES) {
  const missing = docs
    .filter((d) => typeof d[loc] !== 'string' || d[loc].length === 0)
    .map((d) => d.key);

  if (missing.length) {
    failed = true;
    console.error(`✗ ${loc}: ${missing.length} missing value(s)`);
    missing.forEach((k) => console.error(`    ${k}`));
  } else {
    console.log(`✓ ${loc}: ${docs.length} keys`);
  }
}

if (failed) {
  console.error('\ni18n check failed — Sanity locales are incomplete.');
  process.exit(1);
}

console.log(
  `\ni18n check passed — ${docs.length} keys across ${LOCALES.length} locales.`
);
