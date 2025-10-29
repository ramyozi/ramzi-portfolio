'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  const items = [
    { id: 'about', label: t('common.header.about') },
    { id: 'languages', label: t('common.header.languages') },
    { id: 'motivation', label: t('common.header.motivation') },
    { id: 'experience', label: t('common.header.experience') },
    { id: 'skills', label: t('common.header.skills') },
    { id: 'projects', label: t('common.header.projects') },
    { id: 'contact', label: t('common.header.contact') },
  ];

  const isHome = !pathname.startsWith(`/project`);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (isHome) {
      console.log('in home and scrolling to:', id);

      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
        sessionStorage.removeItem('scrollTarget');
      }
    } else {
      console.log('Navigating to home and scrolling to:', id);
      sessionStorage.setItem('scrollTarget', id);
      router.push(`/`);
    }
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-all'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3 md:py-4'>
        {/* Logo */}
        <Link href={`/${locale}`} className='flex items-center gap-2'>
          {logoSrc && (
            <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
          )}
          <span className='text-lg font-bold'>
            {t('common.header.siteName')}
          </span>
        </Link>

        {/* Desktop Navigation */}
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
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
                {/* underline */}
                {isActive && activeId && (
                  <motion.span
                    layoutId='activeUnderline'
                    className='absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-primary'
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Lang / Theme / Menu */}
        <div className='flex items-center gap-3'>
          <LanguageSelector />
          <ThemeToggle />

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='block flex items-center gap-2 lg:hidden'
              >
                <Menu className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='w-52'>
              {items.map((item) => {
                const isActive = activeId === item.id;

                return (
                  <DropdownMenuItem key={item.id} asChild>
                    <Link
                      href={`/${locale}#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={clsx(
                        'block rounded-md px-3 py-2 transition',
                        isActive
                          ? 'bg-primary/10 font-semibold text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
