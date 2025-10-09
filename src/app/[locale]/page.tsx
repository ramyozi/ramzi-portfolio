'use client';

import { AboutMe } from '@/components/service/about-me';
import { ContactMe } from '@/components/service/contact-me';
import { Experience } from '@/components/service/experience';
import { Language } from '@/components/service/language';
import { Motivation } from '@/components/service/motivation';
import { Project } from '@/components/service/project';
import { Skill } from '@/components/service/skill';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/layout/section-wrapper';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className='space-y-32 py-12'>
      <SectionWrapper id='about' titleKey='common.header.about'>
        <AboutMe />
      </SectionWrapper>

      <SectionWrapper id='languages' titleKey='common.header.languages'>
        <Language />
      </SectionWrapper>

      <SectionWrapper id='motivation' titleKey='common.header.motivation'>
        <Motivation />
      </SectionWrapper>

      <SectionWrapper id='experience' titleKey='common.header.experience'>
        <Experience />
      </SectionWrapper>

      <SectionWrapper id='skills' titleKey='common.header.skills'>
        <Skill />
      </SectionWrapper>

      <SectionWrapper id='projects' titleKey='common.header.projects'>
        <Project />
      </SectionWrapper>

      <SectionWrapper id='contact' titleKey='common.header.contact'>
        <ContactMe />
      </SectionWrapper>
    </main>
  );
}
