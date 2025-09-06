'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
        {t('common.footer.copyright', {
          year: new Date().getFullYear(),
          name: 'Ramzi Benmansour',
        })}
      </div>
    </footer>
  );
}
