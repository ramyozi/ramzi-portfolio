import { setRequestLocale } from 'next-intl/server';
import SectionWrapper from '@/components/layout/section-wrapper';
import { ScrollRestoration } from '@/components/layout/scroll-restoration';
import { Hero } from '@/components/service/hero';
import { AboutMe } from '@/components/service/about-me';
import { Motivation } from '@/components/service/motivation';
import { Experience } from '@/components/service/experience';
import { Skill } from '@/components/service/skill';
import { Project } from '@/components/service/project';
import { Language } from '@/components/service/language';
import { ContactMe } from '@/components/service/contact-me';
import { client } from '@/sanity/lib/client';
import {
  aboutMeQuery,
  currentStatusQuery,
  heroQuery,
  motivationQuery,
} from '@/sanity/queries/info';
import { allExperiencesQuery } from '@/sanity/queries/experiences';
import { allSkillsQuery } from '@/sanity/queries/skills';
import { allProjectsQuery } from '@/sanity/queries/projects';
import { allLanguagesQuery } from '@/sanity/queries/languages';
import type {
  AboutMe as AboutMeType,
  CurrentStatus,
  Hero as HeroType,
  Motivation as MotivationType,
} from '@/data/types/info';
import type { Experience as ExperienceType } from '@/data/types/experience';
import type { Skill as SkillType } from '@/data/types/skill';
import type { Project as ProjectType } from '@/data/types/project';
import type { Language as LanguageType } from '@/components/service/language';

export const dynamic = 'force-dynamic';

type Params = Promise<{ locale: string }>;

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const [hero, about, status, motivation, experiences, skills, projects, languages] =
    await Promise.all([
      client
        .fetch<HeroType | null>(heroQuery, { locale })
        .catch(() => null),
      client
        .fetch<AboutMeType | null>(aboutMeQuery, { locale })
        .catch(() => null),
      client
        .fetch<CurrentStatus | null>(currentStatusQuery, { locale })
        .catch(() => null),
      client
        .fetch<MotivationType | null>(motivationQuery, { locale })
        .catch(() => null),
      client
        .fetch<ExperienceType[]>(allExperiencesQuery)
        .catch(() => [] as ExperienceType[]),
      client
        .fetch<SkillType[]>(allSkillsQuery)
        .catch(() => [] as SkillType[]),
      client
        .fetch<ProjectType[]>(allProjectsQuery)
        .catch(() => [] as ProjectType[]),
      client
        .fetch<LanguageType[]>(allLanguagesQuery)
        .catch(() => [] as LanguageType[]),
    ]);

  return (
    <main className='space-y-32'>
      <ScrollRestoration />

      <Hero hero={hero} />

      <SectionWrapper id='about' titleKey='common.header.about'>
        <AboutMe about={about} status={status} />
      </SectionWrapper>

      <SectionWrapper id='motivation' titleKey='common.header.motivation'>
        <Motivation motivation={motivation} />
      </SectionWrapper>

      <SectionWrapper id='experience' titleKey='common.header.experience'>
        <Experience experiences={experiences} />
      </SectionWrapper>

      <SectionWrapper id='skills' titleKey='common.header.skills'>
        <Skill skills={skills} />
      </SectionWrapper>

      <SectionWrapper id='projects' titleKey='common.header.projects'>
        <Project projects={projects} />
      </SectionWrapper>

      <SectionWrapper id='languages' titleKey='common.header.languages'>
        <Language languages={languages} />
      </SectionWrapper>

      <SectionWrapper id='contact' titleKey='common.header.contact'>
        <ContactMe />
      </SectionWrapper>
    </main>
  );
}
