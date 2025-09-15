'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function AboutMe() {
  const t = useTranslations();

  return (
    <section
      id='about'
      className='grid grid-cols-1 items-start gap-6 md:grid-cols-2'
    >
      <motion.div
        className='h-full'
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className='h-full border-l-4 shadow-lg'>
          <CardHeader></CardHeader>
          <CardContent>
            <p className='whitespace-pre-line text-base leading-relaxed text-muted-foreground'>
              {t('common.aboutMe.description')}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className='flex h-full flex-col'
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='relative h-full min-h-[360px] w-full overflow-hidden rounded-2xl border shadow-lg'>
          <iframe
            src='/cv-ramzi-benmansour.pdf#view=fitH'
            className='h-full w-full'
            title={t('common.header.about')}
          />
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/5' />
        </div>
      </motion.div>
    </section>
  );
}
