'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';
import type { CurrentStatus, Hero as HeroType } from '@/data/types/info';
import { siteName } from '@/lib/seo';
import { stripEmoji } from '@/lib/utils';

export function Hero({
  hero,
  status,
}: {
  hero: HeroType | null;
  status: CurrentStatus | null;
}) {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  const tagline = stripEmoji(hero?.subtitle);
  const availability = stripEmoji(status?.availability);

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
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className='relative'>
          <div className='absolute -inset-1.5 rounded-full bg-brand/20 blur-md' />
          <Image
            src={hero?.profileImage?.url ?? '/images/ramzi.jpg'}
            alt={siteName}
            width={112}
            height={112}
            priority
            className='relative size-28 rounded-full border border-brand/30 object-cover shadow-lg'
          />
        </motion.div>

        {availability && (
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.06 }}
            className='mt-7 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm'
          >
            <span className='relative flex size-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex size-2 rounded-full bg-emerald-500' />
            </span>
            {availability}
          </motion.div>
        )}

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.12 }}
          className='mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'
        >
          {siteName}
        </motion.h1>

        {tagline && (
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg'
          >
            {tagline}
          </motion.p>
        )}

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.28 }}
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
        aria-label={t('common.a11y.scrollToContent')}
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
