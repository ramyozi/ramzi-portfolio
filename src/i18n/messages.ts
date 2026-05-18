import { client } from '@/sanity/lib/client';
import { allTranslationsQuery } from '@/sanity/queries/translations';
import type { Locale } from './routing';

type TranslationDoc = { key: string } & Partial<Record<Locale, string>>;
type Messages = Record<string, unknown>;

/** Sanity is the single source of truth for UI translations. */
const CACHE_TTL_MS = 60_000;
let cache: { at: number; docs: TranslationDoc[] } | null = null;

async function fetchTranslations(): Promise<TranslationDoc[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.docs;

  try {
    const docs = await client.fetch<TranslationDoc[]>(allTranslationsQuery);

    cache = { at: Date.now(), docs: docs ?? [] };
    return cache.docs;
  } catch (err) {
    // Keep the app rendering with the last good data instead of crashing.
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

/** Builds the next-intl message tree for a locale from Sanity. */
export async function getMessages(locale: Locale): Promise<Messages> {
  const docs = await fetchTranslations();
  const messages: Messages = {};

  for (const doc of docs) {
    const value = doc[locale];

    if (typeof value === 'string' && value.trim().length > 0) {
      setNested(messages, doc.key.split('.'), value);
    }
  }

  return messages;
}
