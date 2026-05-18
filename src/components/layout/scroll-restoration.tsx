'use client';

import { useEffect } from 'react';

/**
 * Scrolls to a section saved in sessionStorage by the header when
 * navigating back to the home page from another route.
 */
export function ScrollRestoration() {
  useEffect(() => {
    const targetId = sessionStorage.getItem('scrollTarget');

    sessionStorage.removeItem('scrollTarget');

    if (!targetId) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(targetId);

      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
