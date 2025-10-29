'use client';

import {Button} from '@/components/ui/button';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {useEffect, useState} from "react";
import type {Hero} from "@/data/types/info";
import {client} from "@/sanity/lib/client";
import {heroQuery} from "@/sanity/queries/info";

export function Hero() {
    const t = useTranslations();
    const locale = useLocale();
    const [hero, setHero] = useState<Hero | null>(null);

    useEffect(() => {
        client
            .fetch(heroQuery, {locale})
            .then(setHero)
            .catch((err) => console.error('❌ Failed to fetch Hero:', err));
    }, [locale]);

    return (
        <section
            id="hero"
            className="
                relative
                flex min-h-[calc(100svh-var(--header-h))]
                flex-col items-center justify-center
                gap-6
                overflow-hidden
                bg-gradient-to-b from-primary/10 via-background to-background
                py-24 sm:py-32 md:py-40
                pb-[calc(env(safe-area-inset-bottom)+1rem)]
                mb-20 md:mb-28
                after:block after:h-6 sm:after:h-8 after:content-['']
              "
        >
            <motion.div
                className='absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl'
                animate={{y: [0, 20, 0]}}
                transition={{repeat: Infinity, duration: 10, ease: 'easeInOut'}}
            />

            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <Image
                    src={hero?.profileImage ? hero.profileImage.url : '/images/profile.jpg'}
                    alt='Ramzi'
                    width={120}
                    height={120}
                    className='rounded-full border-4 border-primary/30 shadow-lg'
                />
            </motion.div>

            <motion.h1
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl'
            >
                {hero?.title}
            </motion.h1>

            <motion.p
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2, duration: 0.6}}
                className='max-w-2xl px-4 text-lg text-muted-foreground sm:text-xl'
            >
                {hero?.subtitle}
            </motion.p>

            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.4, duration: 0.5}}
                className='flex flex-wrap justify-center gap-4 pt-4'
            >
                <Link href='#projects'>
                    <Button variant='default'>{t('common.hero.ctaPrimary')}</Button>
                </Link>
                <Link href='#contact'>
                    <Button variant='outline'>{t('common.hero.ctaSecondary')}</Button>
                </Link>
            </motion.div>
        </section>
    );
}
