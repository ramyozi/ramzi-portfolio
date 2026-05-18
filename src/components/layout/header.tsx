'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Locale } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/use-active-section';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import LanguageSelector from '@/components/layout/language-selector';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  locale: Locale;
}

export function Header({ logoSrc, logoAlt = 'Logo', locale }: HeaderProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { id: activeId } = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    { id: 'about', label: t('common.header.about') },
    { id: 'motivation', label: t('common.header.motivation') },
    { id: 'experience', label: t('common.header.experience') },
    { id: 'skills', label: t('common.header.skills') },
    { id: 'projects', label: t('common.header.projects') },
    { id: 'languages', label: t('common.header.languages') },
    { id: 'contact', label: t('common.header.contact') },
  ];

  const isHome = !pathname.startsWith(`/project`);

  const goToSection = (id: string) => {
    if (isHome) {
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
        sessionStorage.removeItem('scrollTarget');
      }
    } else {
      sessionStorage.setItem('scrollTarget', id);
      router.push(`/`);
    }
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    goToSection(id);
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-all'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3 md:py-4'>
        <Link href={`/${locale}`} className='flex items-center gap-2'>
          {logoSrc && (
            <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
          )}
          <span className='text-lg font-bold'>
            {t('common.header.siteName')}
          </span>
        </Link>

        <nav className='hidden items-center gap-8 lg:flex'>
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <Link
                key={item.id}
                href={`/${locale}#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={clsx(
                  'relative text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-brand'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
                {isActive && activeId && (
                  <motion.span
                    layoutId='activeUnderline'
                    className='absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-brand'
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className='flex items-center gap-2 sm:gap-3'>
          <LanguageSelector />
          <ThemeToggle />

          <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
            <DrawerTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                aria-label={t('common.header.siteName')}
                className='size-11 lg:hidden'
              >
                <Menu className='size-5' />
              </Button>
            </DrawerTrigger>

            <DrawerContent className='pb-[env(safe-area-inset-bottom)]'>
              <DrawerHeader className='text-left'>
                <DrawerTitle className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>
                  {t('common.header.siteName')}
                </DrawerTitle>
              </DrawerHeader>

              <nav className='flex flex-col gap-1 px-3 pb-8'>
                {items.map((item) => {
                  const isActive = activeId === item.id;

                  return (
                    <DrawerClose asChild key={item.id}>
                      <Link
                        href={`/${locale}#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={clsx(
                          'flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-brand/10 text-brand'
                            : 'text-foreground/80 hover:bg-accent hover:text-foreground'
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <span className='size-2 rounded-full bg-brand' />
                        )}
                      </Link>
                    </DrawerClose>
                  );
                })}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
