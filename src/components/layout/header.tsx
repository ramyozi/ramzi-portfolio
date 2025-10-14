'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { useTranslations } from 'next-intl';
import LanguageSelector from '@/components/layout/language-selector';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Locale } from '@/i18n/routing';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  locale: Locale;
}

export function Header({ logoSrc, logoAlt = 'Logo', locale }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const isRtl = locale === 'ar';
  const menuItems = [
    { label: t('common.header.about'), href: `/${locale}#about` },
    { label: t('common.header.motivation'), href: `/${locale}#motivation` },
    { label: t('common.header.experience'), href: `/${locale}#experience` },
    { label: t('common.header.skills'), href: `/${locale}#skills` },
    { label: t('common.header.projects'), href: `/${locale}#projects` },
    { label: t('common.header.contact'), href: `/${locale}#contact` },
  ];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const element = document.getElementById(targetId);

      if (element) {
        window.history.pushState(null, '', href);
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className='sticky top-0 z-50 w-full bg-background text-foreground'>
      <div
        className={`container mx-auto flex items-center justify-between py-4 ${
          isRtl ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {logoSrc && (
          <Link href={`/${locale}`} className='flex items-center space-x-2'>
            <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
            <span className='text-lg font-bold'>
              {t('common.header.siteName')}
            </span>
          </Link>
        )}

        <div className='absolute left-1/2 hidden -translate-x-1/2 transform lg:block'>
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className='px-3 py-2 hover:text-primary'
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <NavigationMenuIndicator />
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>

        <div className='flex items-center space-x-4'>
          <LanguageSelector />
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant='outline'
                className='block flex items-center gap-2 lg:hidden xl:hidden'
              >
                <Menu className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel></DropdownMenuLabel>
              {menuItems.map((item, idx) => (
                <div key={idx}>
                  <DropdownMenuItem>
                    <Link
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className='px-3 py-2 hover:text-primary'
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
