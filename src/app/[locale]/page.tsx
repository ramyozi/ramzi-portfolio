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
      <SectionWrapper id='about' titleKey='common.header.about' idx={0}>
        <AboutMe />
      </SectionWrapper>

      <SectionWrapper id='languages' titleKey='common.header.languages' idx={1}>
        <Language />
      </SectionWrapper>

      <SectionWrapper
        id='motivation'
        titleKey='common.header.motivation'
        idx={2}
      >
        <Motivation />
      </SectionWrapper>

      <SectionWrapper
        id='experience'
        titleKey='common.header.experience'
        idx={3}
      >
        <Experience />
      </SectionWrapper>

      <SectionWrapper id='skills' titleKey='common.header.skills' idx={4}>
        <Skill />
      </SectionWrapper>

      <SectionWrapper id='projects' titleKey='common.header.projects' idx={5}>
        <Project />
      </SectionWrapper>

      <SectionWrapper id='contact' titleKey='common.header.contact' idx={6}>
        <ContactMe />
      </SectionWrapper>
    </main>
  );
}
