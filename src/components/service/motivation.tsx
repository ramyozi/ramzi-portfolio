'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import type { Motivation as MotivationType } from '@/data/types/info';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Motivation({
  motivation,
}: {
  motivation: MotivationType | null;
}) {
  const t = useTranslations();

  return (
    <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 'some' }}
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
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Card className='rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-md transition hover:shadow-xl'>
          <CardHeader className='space-y-3'>
            <p className='text-sm font-medium uppercase tracking-wider text-brand/80'>
              {motivation?.intro}
            </p>
          </CardHeader>

          <CardContent>
            <blockquote className='border-l-4 border-brand/30 pl-4 text-base italic leading-relaxed text-muted-foreground'>
              {motivation?.content}
            </blockquote>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
