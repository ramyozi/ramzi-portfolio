'use client';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <main>
      <h1>{t('homePage.title')}</h1>
      <Button
        onClick={() => {
          router.push('/project/1');
        }}
      >
        {t('common.button.click')}
      </Button>
    </main>
  );
}
