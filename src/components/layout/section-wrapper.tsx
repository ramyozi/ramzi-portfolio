'use client';

import { useTranslations } from 'next-intl';

export default function SectionWrapper({
  children,
  titleKey,
  id,
}: {
  children: React.ReactNode;
  titleKey: string;
  id: string;
}) {
  const t = useTranslations();

  return (
    <section id={id} className='scroll-mt-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <h2 className='mb-6 text-center text-3xl font-extrabold md:text-4xl'>
          {t(titleKey)}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
