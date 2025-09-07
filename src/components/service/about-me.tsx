'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export function AboutMe() {
  const t = useTranslations();

  return (
    <section
      id='about'
      className='grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 scroll-mt-24'
    >
      <Card className='h-full border-2 border-primary'>
        <CardHeader>
          <CardTitle className='text-2xl'>{t('common.header.about')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='whitespace-pre-line text-base leading-relaxed'>
            {t('common.aboutMe.description')}
          </p>
        </CardContent>
      </Card>

      <div className='flex h-full flex-col'>
        <iframe
          src='/cv-ramzi-benmansour.pdf#view=fitH'
          className='h-full min-h-[400px] w-full rounded-2xl border shadow'
        />
      </div>
    </section>
  );
}
