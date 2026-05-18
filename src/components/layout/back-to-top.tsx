'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type='button'
          aria-label='Back to top'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className='fixed bottom-6 right-6 z-50 flex size-11 items-center justify-center rounded-full border border-border/60 bg-card/80 text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-brand/40 hover:text-brand'
        >
          <ArrowUp className='size-5' />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
