'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { client } from '@/sanity/lib/client';
import { motivationQuery } from '@/sanity/queries/info';
import type { Motivation } from '@/data/types/info';
import Image from 'next/image';

export function Motivation() {
  const t = useTranslations();
  const locale = useLocale();
  const [motivation, setMotivation] = useState<Motivation | null>(null);

  useEffect(() => {
    client
      .fetch(motivationQuery, { locale })
      .then(setMotivation)
      .catch((err) => console.error('❌ Failed to fetch Motivation:', err));
  }, [locale]);

  return (
    <section
      id='motivation'
      className='grid scroll-mt-24 grid-cols-1 items-center gap-6 md:grid-cols-2'
    >
      <div className='flex justify-center'>
        {motivation?.image?.url ? (
          <Image
            src={motivation.image.url}
            alt='Photo de Ramzi'
            width={500}
            height={500}
            className='rounded-2xl object-cover shadow'
          />
        ) : (
          <div className='flex h-[500px] w-[500px] items-center justify-center rounded-2xl bg-muted text-muted-foreground'>
            {t('common.noImage')}
          </div>
        )}
      </div>

      <Card className='border-2'>
        <CardHeader />
        <CardContent>
          <p className='whitespace-pre-line text-base leading-relaxed text-muted-foreground'>
            {motivation?.content}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
