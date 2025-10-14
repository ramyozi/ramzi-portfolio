'use client';

import { useTranslations } from 'next-intl';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className='scroll-mt-24'
      initial='hidden'
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' },
        },
      }}
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
