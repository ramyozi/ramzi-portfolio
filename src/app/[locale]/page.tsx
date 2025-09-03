'use client';

import { AboutMe } from '@/components/service/about-me';
import { ContactMe } from '@/components/service/contact-me';
import { Experience } from '@/components/service/experience';
import { Language } from '@/components/service/language';
import { Motivation } from '@/components/service/motivation';
import { Project } from '@/components/service/project';
import { Skill } from '@/components/service/skill';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="space-y-32 px-6 py-12 max-w-7xl mx-auto">
      <AboutMe />
      <Language />
      <Motivation />
      <Experience />
      <Skill />
      <Project />
      <ContactMe />
    </main>
  );
}
