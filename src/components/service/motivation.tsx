'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { client } from '@/sanity/lib/client';
import { motivationQuery } from '@/sanity/queries/info';
import type { Motivation } from '@/data/types/info';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Motivation() {
  const t = useTranslations();
  const locale = useLocale();
  const [motivation, setMotivation] = useState<Motivation | null>(null);

  useEffect(() => {
    client
      .fetch(motivationQuery, { locale })
      .then(setMotivation)
      .catch((err) => console.error('❌ Failed to fetch Motivation:', err));
  }, [locale]);

  return (
    <section
      id='motivation'
      className='grid scroll-mt-24 grid-cols-1 items-center gap-12 md:grid-cols-2'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='flex justify-center'
      >
        {motivation?.image?.url ? (
          <motion.div
            whileHover={{ scale: 1.03, rotate: 0.5 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12 }}
            className='relative max-w-[450px] md:max-w-[500px]'
          >
            <Image
              src={motivation.image.url}
              alt='Motivation'
              width={500}
              height={500}
              className='rounded-2xl object-cover shadow-xl'
            />
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-t from-background/60 via-transparent to-transparent' />
          </motion.div>
        ) : (
          <div className='flex h-[400px] w-[400px] items-center justify-center rounded-2xl bg-muted text-muted-foreground'>
            {t('common.noImage')}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Card className='rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-md transition hover:shadow-xl'>
          <CardHeader className='space-y-3'>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='text-sm font-medium uppercase tracking-wider text-primary/80'
            >
              {motivation?.intro}
            </motion.p>
          </CardHeader>

          <CardContent>
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='border-l-4 border-primary/30 pl-4 text-base italic leading-relaxed text-muted-foreground'
            >
              {motivation?.content}
            </motion.blockquote>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
