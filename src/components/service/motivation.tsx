'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Motivation() {
  const t = useTranslations();

  return (
    <section
      id='motivation'
      className='grid grid-cols-1 items-center gap-6 md:grid-cols-2'
    >
      <div className='flex justify-center'>
        <Image
          src='/images/ramzi.jpg'
          alt='Photo de Ramzi'
          width={500}
          height={500}
          className='rounded-2xl object-cover shadow'
        />
      </div>

      <Card className='h-full border-2 border-primary'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('common.header.motivation')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='whitespace-pre-line text-base leading-relaxed'>
            {t('common.motivation.description')}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
