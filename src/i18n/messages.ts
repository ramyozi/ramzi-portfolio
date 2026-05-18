import { client } from '@/sanity/lib/client';
import { allTranslationsQuery } from '@/sanity/queries/translations';
import type { Locale } from './routing';

type TranslationDoc = { key: string } & Partial<Record<Locale, string>>;
type Messages = Record<string, unknown>;

/**
 * Sanity is the source of truth for translations. The bundled
 * messages/{locale}.json files are kept only as a safety fallback during
 * the migration: Sanity values win, the JSON only fills missing keys.
 */
const CACHE_TTL_MS = 60_000;
let cache: { at: number; docs: TranslationDoc[] } | null = null;

async function fetchTranslations(): Promise<TranslationDoc[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.docs;

  try {
    const docs = await client.fetch<TranslationDoc[]>(allTranslationsQuery);

    cache = { at: Date.now(), docs: docs ?? [] };
    return cache.docs;
  } catch (err) {
    console.error('i18n: failed to fetch translations from Sanity', err);
    return cache?.docs ?? [];
  }
}

function setNested(target: Messages, path: string[], value: string): void {
  let node = target;

  for (let i = 0; i < path.length - 1; i++) {
    const seg = path[i];

    if (typeof node[seg] !== 'object' || node[seg] === null) node[seg] = {};
    node = node[seg] as Messages;
  }

  node[path[path.length - 1]] = value;
}

function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };

  for (const [k, v] of Object.entries(override)) {
    const bv = out[k];

    if (
      v &&
      typeof v === 'object' &&
      !Array.isArray(v) &&
      bv &&
      typeof bv === 'object' &&
      !Array.isArray(bv)
    ) {
      out[k] = deepMerge(bv as Messages, v as Messages);
    } else {
      out[k] = v;
    }
  }

  return out;
}

/**
 * Builds the next-intl message tree for a locale from Sanity, falling back
 * to the bundled JSON for any key not yet present in the CMS.
 */
export async function getMessages(locale: Locale): Promise<Messages> {
  const fallback: Messages = (
    await import(`../../messages/${locale}.json`)
  ).default;

  const docs = await fetchTranslations();
  const cmsMessages: Messages = {};

  for (const doc of docs) {
    const value = doc[locale];

    if (typeof value === 'string' && value.trim().length > 0) {
      setNested(cmsMessages, doc.key.split('.'), value);
    }
  }

  return deepMerge(fallback, cmsMessages);
}
