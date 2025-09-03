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

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
}

export function Header({ logoSrc, logoAlt = 'Logo' }: HeaderProps) {
  const t = useTranslations();

  const menuItems = [
    { label: t('common.header.about'), href: '#about' },
    { label: t('common.header.motivation'), href: '#motivation' },
    { label: t('common.header.experience'), href: '#experience' },
    { label: t('common.header.skills'), href: '#skills' },
    { label: t('common.header.projects'), href: '#projects' },
    { label: t('common.header.contact'), href: '#contact' },
  ];

  return (
    <header className="w-full border-b border-border bg-background text-foreground sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        {logoSrc && (
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
            <span className="font-bold text-lg">{t('common.header.siteName')}</span>
          </Link>
        )}

        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item, idx) => (
              <NavigationMenuItem key={idx}>
                <NavigationMenuLink asChild>
                  <Link href={item.href} className="px-3 py-2 hover:text-primary">
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
    </header>
  );
}
