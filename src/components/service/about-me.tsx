'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { aboutMeQuery } from '@/sanity/queries/info';
import type { AboutMe } from '@/data/types/info';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

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

  const handleDownload = () => {
    if (about?.cv?.url) {
      const link = document.createElement('a');

      link.href = about.cv.url;
      link.download = `CV_Ramzi_Benmansour.pdf`;
      link.click();
    }
  };

  const handleShare = async () => {
    if (!about?.cv?.url) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: t('common.header.about'),
          text: t('common.share.cv'),
          url: about.cv.url,
        });
      } else {
        await navigator.clipboard.writeText(about.cv.url);
        alert(t('common.share.copied'));
      }
    } catch (err) {
      console.error('❌ Share failed:', err);
    }
  };

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

      {about?.cv?.url && (
        <div
          className='flex flex-col gap-4 md:gap-2'
          style={{ height: contentHeight ? `${contentHeight}px` : 'auto' }}
        >
          <div className='flex items-center justify-center gap-3'>
            <Button
              onClick={handleDownload}
              variant='outline'
              className='flex items-center gap-2'
            >
              <Download className='h-4 w-4' />
              {t('common.actions.download')}
            </Button>
            <Button
              onClick={handleShare}
              variant='default'
              className='flex items-center gap-2'
            >
              <Share2 className='h-4 w-4' />
              {t('common.actions.share')}
            </Button>
          </div>

          <div className='relative hidden h-full w-full overflow-hidden rounded-2xl border shadow-lg md:block'>
            <iframe
              src={`${about.cv.url}#view=fitH`}
              className='h-full w-full'
              title={t('common.header.about')}
            />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/5' />
          </div>
        </div>
      )}
    </section>
  );
}
