'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Mail, Download } from 'lucide-react';

export function AboutMe() {
  const t = useTranslations();

  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle>{t('common.header.about')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">
            {t('common.aboutMe.description')}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center space-y-4">
        <iframe
          src="/cv-ramzi-benmansour.pdf#view=fitH"
          className="w-full h-96 border rounded-2xl shadow"
        />
      </div>
    </section>
  );
}
