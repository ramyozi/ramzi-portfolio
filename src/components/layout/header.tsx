'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { useTranslations } from 'next-intl';
import LanguageSelector from '@/components/layout/language-selector';
import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ThemeToggle } from '@/components/layout/theme-toggle';

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
}

export function Header({ logoSrc, logoAlt = 'Logo' }: HeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();

  const currentLocale =
    routing.locales.find((l) => pathname.startsWith(`/${l}`)) ||
    routing.defaultLocale;

  const menuItems = [
    { label: t('common.header.about'), href: `/${currentLocale}#about` },
    {
      label: t('common.header.motivation'),
      href: `/${currentLocale}#motivation`,
    },
    {
      label: t('common.header.experience'),
      href: `/${currentLocale}#experience`,
    },
    { label: t('common.header.skills'), href: `/${currentLocale}#skills` },
    { label: t('common.header.projects'), href: `/${currentLocale}#projects` },
    { label: t('common.header.contact'), href: `/${currentLocale}#contact` },
  ];

  return (
    <header className='sticky top-0 z-50 w-full bg-background text-foreground'>
      <div className='container flex items-center justify-between py-4'>
        {logoSrc && (
          <Link href='/' className='flex items-center space-x-2'>
            <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
            <span className='text-lg font-bold'>
              {t('common.header.siteName')}
            </span>
          </Link>
        )}

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

        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}
