'use client';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
} as Variants;

export default function SectionWrapper({
  children,
  titleKey,
  idx = 0,
  id,
}: {
  children: React.ReactNode;
  titleKey: string;
  idx?: number;
  id: string;
}) {
  const t = useTranslations();

  return (
    <motion.section
      id={id}
      className='scroll-mt-24'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
      custom={idx}
      variants={sectionVariants}
    >
      <div className='mx-auto max-w-7xl px-6'>
        <h2 className='mb-6 text-center text-3xl font-extrabold md:text-4xl'>
          {t(titleKey)}
        </h2>
        <div>{children}</div>
      </div>
    </motion.section>
  );
}
