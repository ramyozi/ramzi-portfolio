import { routing } from './routing';

/**
 * Strongly types the next-intl locale so locale values are checked
 * against the configured set. Message keys are intentionally left
 * loose: the app resolves several keys dynamically (status labels,
 * proficiency levels, section titles…).
 */
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
  }
}
