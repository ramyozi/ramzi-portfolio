'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { client } from '@/sanity/lib/client';
import { allLanguagesQuery } from '@/sanity/queries/languages';

const LEVEL_COLORS = [
  'bg-green-300',
  'bg-green-500',
  'bg-green-700',
  'bg-green-900',
];

interface Language {
  _id: string;
  key: string;
  level: number;
}

export function Language() {
  const t = useTranslations();
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    client
      .fetch(allLanguagesQuery)
      .then((res) => setLanguages(res))
      .catch((err) => console.error('❌ Failed to fetch languages:', err));
  }, []);

  return (
    <section id='languages' className='scroll-mt-24 space-y-4'>
      <Card className='border-2 p-4'>
        <CardContent className='space-y-3'>
          {languages.length > 0 ? (
            languages.map((lang) => (
              <div key={lang._id} className='space-y-1'>
                <div className='flex justify-between font-medium'>
                  <span>{t(`common.languages.list.${lang.key}`)}</span>
                  <span>{t(`common.languages.levels.${lang.level}`)}</span>
                </div>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-3 flex-1 rounded-full ${i <= lang.level ? LEVEL_COLORS[i - 1] : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className='text-muted-foreground'>
              {t('common.languages.empty')}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
