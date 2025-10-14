'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { aboutMeQuery } from '@/sanity/queries/info';
import type { AboutMe } from '@/data/types/info';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

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

    const handleResize = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;

      if (isDesktop && textRef.current) {
        const observer = new ResizeObserver(([entry]) => {
          setContentHeight(entry.contentRect.height);
        });

        observer.observe(textRef.current);
        return () => observer.disconnect();
      } else {
        setContentHeight(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [about?.content]);

  const handleDownload = async () => {
    if (!about?.cv?.url) return;

    try {
      const response = await fetch(about.cv.url);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'CV_Ramzi_Benmansour.pdf';
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('❌ Erreur lors du téléchargement du CV :', err);
    }
  };

  const handleShare = async () => {
    if (!about?.cv?.url) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: t('common.header.about'),
          text: t('common.about.share.cv'),
          url: about.cv.url,
        });
      } else {
        await navigator.clipboard.writeText(about.cv.url);
        alert(t('common.about.share.copied'));
      }
    } catch (err) {
      console.error('❌ Share failed:', err);
    }
  };

  return (
    <section
      id='about'
      className='flex flex-col gap-10 md:grid md:grid-cols-2 md:items-start md:gap-8'
    >
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='h-full'
      >
        <Card className='h-full rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-md transition hover:shadow-xl'>
          <CardHeader className='space-y-3'>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='text-sm uppercase tracking-wide text-primary/70'
            >
              {about?.intro}
            </motion.p>
          </CardHeader>

          <CardContent className='space-y-5'>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className='whitespace-pre-line text-base leading-relaxed text-muted-foreground'
            >
              {about?.content}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      {about?.cv?.url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex flex-col gap-4'
          style={
            contentHeight && window.innerWidth >= 768
              ? { height: `${contentHeight}px` }
              : undefined
          }
        >
          <div className='flex flex-col items-center justify-center gap-3 text-center md:mb-0'>
            <p className='text-sm font-medium text-muted-foreground md:hidden'>
              {t('common.about.cvTitle')}
            </p>
            <div className='flex flex-wrap items-center justify-center gap-3'>
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
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='relative hidden h-full w-full overflow-hidden rounded-2xl border shadow-lg md:block'
          >
            <iframe
              src={`${about.cv.url}#view=fitH`}
              className='h-full w-full'
              title={t('common.header.about')}
            />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/5' />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
