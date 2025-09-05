import { ThemeProvider } from '@/components/layout/theme-provider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Header } from '@/components/layout/header';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { Locale, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import './globals.css';
import { Toaster } from 'sonner';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;

  return {
    title: 'Portfolio de Ramzi',
    description: `Localized portfolio for ${locale}`,
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
            <Header locale={locale as Locale} />
            {children}
             <Toaster richColors position="top-center" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
