'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

const LEVEL_COLORS = [
  'bg-green-300',
  'bg-green-500',
  'bg-green-700',
  'bg-green-900',
];

export interface Language {
  _id: string;
  key: string;
  level: number;
}

export function Language({ languages }: { languages: Language[] }) {
  const t = useTranslations();

  return (
    <div className='space-y-4'>
      <Card className='p-4'>
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
                      className={`h-3 flex-1 rounded-full ${
                        i <= lang.level ? LEVEL_COLORS[i - 1] : 'bg-muted'
                      }`}
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
    </div>
  );
}
