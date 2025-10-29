'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/use-active-section';
import { useTranslations } from 'next-intl';

export default function SectionWrapper({
  id,
  titleKey,
  children,
  className = '',
}: {
  id: string;
  titleKey: string;
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations();
  const ref = useRef<HTMLElement | null>(null);
  const { setId } = useActiveSection();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (ticking) return;

        window.requestAnimationFrame(() => {
          for (const entry of entries) {
            // Reset when near top (hero zone)
            if (window.scrollY < window.innerHeight * 0.3) {
              setId('');
              break;
            }

            if (entry.isIntersecting) {
              setId(id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      },
      {
        root: null,
        rootMargin: '-25% 0px -50% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, setId]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className + ' scroll-mt-24'}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }} // 👈 key part
      transition={{ duration: 0.6 }}
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
