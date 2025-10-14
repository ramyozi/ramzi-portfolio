'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { aboutMeQuery } from '@/sanity/queries/info';
import type { AboutMe } from '@/data/types/info';

export function AboutMe() {
  const t = useTranslations();
  const locale = useLocale();
  const [about, setAbout] = useState<AboutMe | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client
      .fetch(aboutMeQuery, { locale })
      .then(setAbout)
      .catch((err) => console.error('❌ Failed to fetch About Me:', err));
  }, [locale]);

  useEffect(() => {
    if (!textRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.contentRect.height);
    });

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [about?.content]);

  return (
    <section
      id='about'
      className='grid grid-cols-1 items-start gap-6 md:grid-cols-2'
    >
      <div ref={textRef} className='h-full'>
        <Card className='h-full border-2 shadow-lg'>
          <CardHeader />
          <CardContent>
            <p className='whitespace-pre-line text-base leading-relaxed text-muted-foreground'>
              {about?.content}
            </p>
          </CardContent>
        </Card>
      </div>
      <div
        className='flex flex-col'
        style={{ height: contentHeight ? `${contentHeight}px` : 'auto' }}
      >
        {about?.cv?.url && (
          <div className='relative h-full w-full overflow-hidden rounded-2xl border shadow-lg'>
            <iframe
              src={`${about.cv.url}#view=fitH`}
              className='h-full w-full'
              title={t('common.header.about')}
            />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/5' />
          </div>
        )}
      </div>
    </section>
  );
}
