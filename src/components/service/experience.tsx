'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export function Experience() {
  const t = useTranslations();
  const rawExp = t('common.experience.list') as any;
  const experiences = Array.isArray(rawExp) ? rawExp : [];

  return (
    <section id="experience">
      <Card>
        <CardHeader>
          <CardTitle>{t('common.header.experience')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map((exp, idx) => (
              <div key={idx} className="border rounded p-4 hover:shadow-lg transition">
                <h4 className="font-semibold">{exp.role} - {exp.company}</h4>
                <p className="italic text-sm">{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))
          ) : (
            <p>{t('common.experience.empty')} (WIP)</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
