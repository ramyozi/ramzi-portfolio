'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel } from '@/components/ui/carousel';
import { useTranslations } from 'next-intl';

export function Project() {
  const t = useTranslations();

  return (
    <section id='projects' className='space-y-6 scroll-mt-24'>
      <Card className='border-2 border-primary'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('common.header.projects')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/*
            {projects.length > 0 ? (
            <Carousel className="h-48">
              {projects.map((p, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center h-full">
                  <img src={p.image} alt={p.title} className="h-32 object-contain" />
                  <p>{p.title}</p>
                </div>
              ))}
            </Carousel>
          ) : (
            <p>{t('common.projects.empty')} (WIP)</p>
          )}
            */}
          <p>{t('common.projects.empty')} (WIP)</p>
        </CardContent>
      </Card>
    </section>
  );
}
