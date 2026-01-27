'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { aboutMeQuery, currentStatusQuery } from '@/sanity/queries/info';
import type { AboutMe as AboutMeType, CurrentStatus } from '@/data/types/info';
import { Github, Linkedin, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export function AboutMe() {
  const locale = useLocale();
  const [about, setAbout] = useState<AboutMeType | null>(null);
  const [status, setStatus] = useState<CurrentStatus | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || '#';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || '#';

  useEffect(() => {
    Promise.all([
      client.fetch(aboutMeQuery, { locale }),
      client.fetch(currentStatusQuery, { locale }),
    ])
      .then(([aboutData, statusData]) => {
        setAbout(aboutData);
        setStatus(statusData);
      })
      .catch(console.error);
  }, [locale]);

  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;

    const resizeObs = new ResizeObserver(([entry]) =>
      setContentHeight(entry.contentRect.height)
    );

    resizeObs.observe(el);
    return () => resizeObs.disconnect();
  }, [about?.content]);

  const socialLinks = [
    {
      name: 'GitHub',
      url: githubUrl,
      icon: Github,
      color: 'hover:border-[#333] dark:hover:border-[#f0f0f0]',
      bgHover: 'hover:bg-[#333]/5 dark:hover:bg-[#f0f0f0]/5',
    },
    {
      name: 'LinkedIn',
      url: linkedinUrl,
      icon: Linkedin,
      color: 'hover:border-[#0077b5]',
      bgHover: 'hover:bg-[#0077b5]/5',
    },
  ];

  return (
    <section
      id='about'
      className='flex flex-col gap-10 md:grid md:grid-cols-2 md:items-start md:gap-8'
    >
      {/* Left column - About me text */}
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className='h-full'
      >
        <Card className='h-full rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-md transition hover:shadow-xl'>
          <CardHeader className='space-y-3'>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
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
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className='whitespace-pre-line text-base leading-relaxed text-muted-foreground'
            >
              {about?.content}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right column - Current status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='flex h-full flex-col'
        style={
          contentHeight && typeof window !== 'undefined' && window.innerWidth >= 768
            ? { minHeight: `${contentHeight}px` }
            : undefined
        }
      >
        <Card className='flex h-full flex-col rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-md transition hover:shadow-xl'>
          <CardHeader className='space-y-3'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className='flex items-center gap-2'
            >
              <span className='relative flex h-3 w-3'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
                <span className='relative inline-flex h-3 w-3 rounded-full bg-green-500'></span>
              </span>
              <p className='text-sm uppercase tracking-wide text-primary/70'>
                {status?.title}
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className='flex flex-1 flex-col space-y-5'>
            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className='space-y-4'
            >
              <div className='flex flex-wrap items-center gap-3'>
                <span className='inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400'>
                  <Briefcase className='h-3.5 w-3.5' />
                  {status?.availability}
                </span>
                <span className='inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-sm text-muted-foreground'>
                  {status?.contractTypes}
                </span>
              </div>

              <p className='text-base leading-relaxed text-muted-foreground'>
                {status?.description}
              </p>

              {/* Regions */}
              <div className='flex items-start gap-2 text-sm text-muted-foreground'>
                <MapPin className='mt-0.5 h-4 w-4 flex-shrink-0 text-primary/60' />
                <div>
                  <p className='font-medium text-foreground/80'>
                    {status?.regions}
                  </p>
                  <p className='text-xs text-muted-foreground/70'>
                    {status?.regionDetails}
                  </p>
                </div>
              </div>

              <p className='text-sm italic text-muted-foreground/80'>
                {status?.lookingFor}
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className='mt-auto flex flex-wrap gap-3 pt-4'
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 ${link.color} ${link.bgHover} hover:text-foreground`}
                >
                  <link.icon className='h-5 w-5 transition-transform duration-200 group-hover:scale-110' />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
