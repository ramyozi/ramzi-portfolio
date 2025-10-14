'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  const links = [
    { href: '#about', label: t('common.header.about') },
    { href: '#projects', label: t('common.header.projects') },
    { href: '#experience', label: t('common.header.experience') },
    { href: '#skills', label: t('common.header.skills') },
    { href: '#contact', label: t('common.header.contact') },
  ];

  const socialLinks = [
    {
      href: process.env.NEXT_PUBLIC_GITHUB_URL || '#',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''}`,
      icon: Mail,
      label: 'Email',
    },
  ];

  return (
    <footer
      ref={footerRef}
      className='relative mt-24 overflow-hidden border-t border-border/60 bg-background/80 backdrop-blur-md'
    >
      <motion.div
        style={{
          opacity: glowOpacity,
        }}
        className='pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent blur-3xl'
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='container relative z-10 mx-auto max-w-6xl px-6 py-10 text-center md:text-left'
      >
        <div className='grid grid-cols-1 items-center justify-between gap-8 md:grid-cols-3'>
          <div className='space-y-2 text-center md:text-left'>
            <h3 className='text-lg font-semibold text-primary'>
              {t('common.footer.title')}
            </h3>
            <p className='text-sm text-muted-foreground'>
              {t('common.footer.subtitle')}
            </p>
          </div>
          <nav className='flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-center'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='transition-colors hover:text-primary'
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className='flex justify-center space-x-5 md:justify-end'>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='text-muted-foreground transition-transform hover:scale-110 hover:text-primary'
              >
                <Icon className='h-5 w-5' />
              </a>
            ))}
          </div>
        </div>
        <div className='my-6 border-t border-border/60' />
        <div className='flex flex-col items-center justify-between gap-2 text-center text-xs text-muted-foreground md:flex-row md:text-left'>
          <p>
            {t('common.footer.copyright', {
              year: currentYear,
              name: 'Ramzi Benmansour',
            })}
          </p>
          <p className='text-muted-foreground/70'>
            {t('common.footer.madeWith')} ❤️{' '}
            <span className='font-medium text-primary'>Next.js</span> +{' '}
            <span className='font-medium text-primary'>Sanity</span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
