import type { Locale } from '@/i18n/routing';

export const siteName = 'Ramzi Benmansour';

/** Absolute base URL of the site, used for canonical/OG/sitemap URLs. */
export function getBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;

  if (fromEnv && /^https?:\/\//.test(fromEnv)) {
    return fromEnv.replace(/\/$/, '');
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return 'http://localhost:8000';
}

export const seoContent: Record<Locale, { title: string; description: string }> =
  {
    en: {
      title: `${siteName} — Portfolio`,
      description:
        'Portfolio of Ramzi Benmansour: selected projects, professional experience and technical skills in web development.',
    },
    fr: {
      title: `${siteName} — Portfolio`,
      description:
        'Portfolio de Ramzi Benmansour : projets, expériences professionnelles et compétences techniques en développement web.',
    },
    ar: {
      title: `${siteName} — أعمالي`,
      description:
        'أعمال رمزي بن منصور: مشاريع مختارة وخبرات مهنية ومهارات تقنية في تطوير الويب.',
    },
    kr: {
      title: `${siteName} — 포트폴리오`,
      description:
        '람지 벤만수르의 포트폴리오: 웹 개발 프로젝트, 경력, 기술 역량을 소개합니다.',
    },
  };

/** Maps an app locale to a BCP-47 / OpenGraph locale tag. */
export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  ar: 'ar_AR',
  kr: 'ko_KR',
};
