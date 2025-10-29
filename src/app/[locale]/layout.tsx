import { ThemeProvider } from '@/components/layout/theme-provider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Header } from '@/components/layout/header';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode, use } from 'react';
import { Locale, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import './globals.css';
import { Toaster } from 'sonner';
import { Footer } from '@/components/layout/footer';
import { ActiveSectionProvider } from '@/hooks/use-active-section';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const locale = await params;

  return {
    title: "Ramzi's Portfolio",
    description: `Localized portfolio for ${locale}`,
    icons: {
      icon: '/images/logo.jpg',
    },
  };
}

type Props = {
  children: ReactNode;
  params: Params;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages: Record<string, string> = (
    await import(`../../../messages/${locale}.json`)
  ).default;

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ActiveSectionProvider>
              <Header
                logoSrc={'/images/logo.jpg'}
                logoAlt={'Logo'}
                locale={locale as Locale}
              />
              <div className='flex min-h-screen flex-col'>{children}</div>
              <Toaster richColors position='top-center' />
              <Footer />
            </ActiveSectionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
