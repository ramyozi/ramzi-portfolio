'use client';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const reduceMotion = useReducedMotion();

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
    <section id={id} ref={ref} className={className + ' scroll-mt-20 sm:scroll-mt-24'}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className='mb-6 flex flex-col items-center gap-3 text-center sm:mb-8 md:mb-10'
        >
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl'>
            {t(titleKey)}
          </h2>
          <span className='h-1 w-10 rounded-full bg-brand/70' />
        </motion.div>
        <div>{children}</div>
      </div>
    </section>
  );
}
