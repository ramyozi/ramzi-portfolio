'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export function Motivation() {
  const t = useTranslations();

  return (
    <section id="motivation">
      <Card>
        <CardHeader>
          <CardTitle>{t('common.header.motivation')}</CardTitle>
        </CardHeader>
        <CardContent>{t('common.motivation.description')}</CardContent>
      </Card>
    </section>
  );
}
