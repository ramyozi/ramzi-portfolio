/**
 * Generates `sanity-i18n-seed.ndjson` from the bundled messages/ files.
 *
 * Import it into Sanity (one-off, when migrating UI translations to the CMS):
 *   npx sanity dataset import sanity-i18n-seed.ndjson <dataset> --replace
 *
 * Document ids are deterministic, so re-running the import updates in place.
 */
import { readFileSync, writeFileSync } from 'node:fs';
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

const keys = [
  ...new Set(LOCALES.flatMap((l) => Object.keys(flat[l]))),
].sort();

const docs = keys.map((key) => {
  const doc = {
    _id: `i18n-${key.replace(/[^a-zA-Z0-9]/g, '-')}`,
    _type: 'translation',
    key,
    group: key.split('.')[1] ?? 'common',
  };

  for (const loc of LOCALES) {
    if (typeof flat[loc][key] === 'string') doc[loc] = flat[loc][key];
  }

  return doc;
});

const ndjson = docs.map((d) => JSON.stringify(d)).join('\n') + '\n';

writeFileSync(join(ROOT, 'sanity-i18n-seed.ndjson'), ndjson);

console.log(
  `Generated sanity-i18n-seed.ndjson — ${docs.length} translation documents.`
);

for (const loc of LOCALES) {
  const missing = keys.filter((k) => typeof flat[loc][k] !== 'string');

  console.log(
    `  ${loc}: ${keys.length - missing.length}/${keys.length}` +
      (missing.length ? ` — missing ${missing.length}` : ' (complete)')
  );
}
