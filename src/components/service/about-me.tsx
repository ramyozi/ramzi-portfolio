'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { aboutMeQuery } from '@/sanity/queries/info';
import type { AboutMe } from '@/data/types/info';

export function AboutMe() {
  const t = useTranslations();
  const locale = useLocale();
  const [about, setAbout] = useState<AboutMe | null>(null);

  useEffect(() => {
    client
      .fetch(aboutMeQuery, { locale })
      .then(setAbout)
      .catch((err) => console.error('❌ Failed to fetch About Me:', err));
  }, [locale]);

  return (
    <section
      id='about'
      className='grid grid-cols-1 items-start gap-6 md:grid-cols-2'
    >
      <div className='h-full'>
        <Card className='h-full border-2 shadow-lg'>
          <CardHeader />
          <CardContent>
            <p className='whitespace-pre-line text-base leading-relaxed text-muted-foreground'>
              {about?.content}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='flex h-full flex-col'>
        <div className='relative h-full min-h-[360px] w-full overflow-hidden rounded-2xl border shadow-lg'>
          <iframe
            src='/developpeur-fullstack-react-nodejs-de-ramzi-benmansour.pdf#view=fitH'
            className='h-full w-full'
            title={t('common.header.about')}
          />
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/5' />
        </div>
      </div>
    </section>
  );
}
