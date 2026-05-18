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
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { BackToTop } from '@/components/layout/back-to-top';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { getBaseUrl, ogLocale, seoContent, siteName } from '@/lib/seo';
import { getMessages } from '@/i18n/messages';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const base = getBaseUrl();
  const { title, description } = seoContent[loc];
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${base}/${l}`])
  );

  return {
    metadataBase: new URL(base),
    title: { default: title, template: `%s — ${siteName}` },
    description,
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    keywords: [
      'Ramzi Benmansour',
      'portfolio',
      'web developer',
      'software engineer',
      'frontend',
      'React',
      'Next.js',
      'TypeScript',
    ],
    alternates: {
      canonical: `${base}/${loc}`,
      languages: { ...languages, 'x-default': `${base}/${routing.defaultLocale}` },
    },
    openGraph: {
      type: 'website',
      siteName,
      locale: ogLocale[loc],
      url: `${base}/${loc}`,
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: { icon: '/images/logo.jpg' },
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

  const messages = await getMessages(locale as Locale);

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  const baseUrl = getBaseUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteName,
    url: `${baseUrl}/${locale}`,
    sameAs: [
      process.env.NEXT_PUBLIC_GITHUB_URL,
      process.env.NEXT_PUBLIC_LINKEDIN_URL,
    ].filter(Boolean),
  };

  return (
    <html
      lang={locale}
      dir={direction}
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className='font-sans antialiased'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ActiveSectionProvider>
              <ScrollProgress />
              <Header
                logoSrc={'/images/logo.jpg'}
                logoAlt={'Ramzi Benmansour'}
                locale={locale as Locale}
              />
              <div className='flex min-h-screen flex-col'>{children}</div>
              <Toaster richColors position='top-center' />
              <Footer />
              <BackToTop />
            </ActiveSectionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
