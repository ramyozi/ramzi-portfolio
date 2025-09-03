'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export function AboutMe() {
  const t = useTranslations();

  return (
    <section id="about">
      <Card>
        <CardHeader>
          <CardTitle>{t('common.header.about')}</CardTitle>
        </CardHeader>
        <CardContent>{t('common.aboutMe.description')}</CardContent>
      </Card>
    </section>
  );
}
