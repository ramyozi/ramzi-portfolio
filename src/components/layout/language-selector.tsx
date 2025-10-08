'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { GlobeIcon, CheckIcon } from 'lucide-react';

export default function LanguageSelector() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (locale: string) => {
    if (locale === currentLocale) return;

    // Clean locale prefix manually (just for ID adjustment)
    let cleanPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');

    // Handle localized project IDs (en-project → fr-project)
    const match = cleanPath.match(/^\/project\/([a-z]{2})-project-(.+)$/);

    if (match) {
      const [, , uuid] = match;

      cleanPath = `/project/${locale}-project-${uuid}`;
    }

    router.push(cleanPath, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          <GlobeIcon className='h-5 w-5' />
          <span className='hidden md:inline'>
            {t(`common.languages.list.${currentLocale}`)}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className='flex cursor-pointer items-center justify-between'
          >
            <span>{t(`common.languages.list.${locale}`)}</span>
            {locale === currentLocale && <CheckIcon className='h-4 w-4' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
