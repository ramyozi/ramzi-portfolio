import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'fr', 'ar', 'kr'],

    defaultLocale: 'fr'
});

export type Locale = (typeof routing)['locales'][number];