'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import { spokenLanguages } from '@/data/languages';

export function Language() {
  const t = useTranslations();

  return (
    <section id="languages" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('common.header.languages')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {spokenLanguages.length > 0 ? (
            spokenLanguages.map((lang, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span>{t(`common.languages.list.${lang.key}`)}</span>
                  <span>{lang.level}%</span>
                </div>
                <Progress value={lang.level} className="h-3 rounded-full" />
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
