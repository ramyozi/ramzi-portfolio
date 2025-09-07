'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { spokenLanguages } from '@/data/languages';

const LEVEL_COLORS = [
  'bg-green-300',
  'bg-green-400',
  'bg-green-500',
  'bg-green-600',
];

export function Language() {
  const t = useTranslations();

  return (
    <section id='languages' className='space-y-4 scroll-mt-24'>
      <Card className='border-2 border-primary'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('common.header.languages')}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {spokenLanguages.length > 0 ? (
            spokenLanguages.map((lang, idx) => (
              <div key={idx} className='space-y-1'>
                <div className='flex justify-between font-medium'>
                  <span>{t(`common.languages.list.${lang.key}`)}</span>
                  <span>{t(`common.languages.levels.${lang.level}`)}</span>
                </div>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4].map((levelIdx) => (
                    <div
                      key={levelIdx}
                      className={`h-3 flex-1 rounded-full ${
                        levelIdx <= lang.level
                          ? LEVEL_COLORS[levelIdx - 1]
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>{t('common.languages.empty')}</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
