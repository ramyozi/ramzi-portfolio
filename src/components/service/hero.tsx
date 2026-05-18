'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import type { Hero } from '@/data/types/info';
import { client } from '@/sanity/lib/client';
import { heroQuery } from '@/sanity/queries/info';

export function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    client
      .fetch(heroQuery, { locale })
      .then(setHero)
      .catch((err) => console.error('Failed to fetch Hero:', err));
  }, [locale]);

  const fadeUp = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id='hero'
      className='relative flex min-h-[calc(100svh-var(--header-h,4rem))] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:py-32'
    >
      {/* Ambient background */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-brand/[0.06] via-background to-background' />
        <motion.div
          className='absolute -top-32 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl'
          animate={reduceMotion ? undefined : { y: [0, 24, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
        <div className='absolute bottom-0 right-[8%] h-72 w-72 rounded-full bg-primary/[0.04] blur-3xl' />
      </div>

      <div className='flex max-w-3xl flex-col items-center text-center'>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <div className='absolute -inset-1.5 rounded-full bg-brand/20 blur-md' />
          <Image
            src={hero?.profileImage?.url ?? '/images/ramzi.jpg'}
            alt='Ramzi'
            width={112}
            height={112}
            priority
            className='relative size-28 rounded-full border border-brand/30 object-cover shadow-lg'
          />
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.08 }}
          className='mt-8 min-h-[2.75rem] text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'
        >
          {hero ? (
            hero.title
          ) : (
            <span className='mx-auto flex max-w-md flex-col gap-3'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='mx-auto h-10 w-2/3' />
            </span>
          )}
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.16 }}
          className='mt-5 min-h-[3.5rem] max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg'
        >
          {hero ? (
            hero.subtitle
          ) : (
            <span className='mx-auto flex max-w-xl flex-col gap-2'>
              <Skeleton className='h-5 w-full' />
              <Skeleton className='mx-auto h-5 w-4/5' />
            </span>
          )}
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.24 }}
          className='mt-9 flex flex-col gap-3 sm:flex-row'
        >
          <Button variant='brand' size='lg' asChild>
            <Link href='#projects'>
              {t('common.hero.ctaPrimary')}
              <ArrowRight className='size-4' />
            </Link>
          </Button>
          <Button variant='outline' size='lg' asChild>
            <Link href='#contact'>{t('common.hero.ctaSecondary')}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href='#about'
        aria-label='Scroll to content'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/60 transition-colors hover:text-brand'
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className='block'
        >
          <ArrowDown className='size-5' />
        </motion.span>
      </motion.a>
    </section>
  );
}
