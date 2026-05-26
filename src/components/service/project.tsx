'use client';

import { JSX } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  PauseCircle,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import TechIcon from '@/components/service/common/tech-icon';
import type { Project as ProjectType, ProjectStatus } from '@/data/types/project';

const statusIcon: Record<ProjectStatus, JSX.Element> = {
  planned: <Clock className='size-3.5 text-sky-500' />,
  in_progress: <Rocket className='size-3.5 text-amber-500' />,
  completed: <CheckCircle className='size-3.5 text-emerald-500' />,
  on_hold: <PauseCircle className='size-3.5 text-muted-foreground' />,
};

const MAX_TECH = 5;

function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const localized = project.translations?.[locale] ||
    project.translations?.en || { title: '', description: '' };
  const tech = project.technologies ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.28),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/project/${project._id}`}
        className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        <div className='relative aspect-[16/10] overflow-hidden bg-muted'>
          {project.image?.url ? (
            <Image
              src={project.image.url}
              alt={localized.title}
              fill
              sizes='(max-width: 640px) 100vw, 50vw'
              className='object-cover transition-transform duration-500 group-hover:scale-[1.04]'
            />
          ) : (
            <div className='flex h-full items-center justify-center text-sm text-muted-foreground'>
              {localized.title}
            </div>
          )}

          {project.status && (
            <span className='absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-xs font-medium backdrop-blur-sm'>
              {statusIcon[project.status]}
              {t(`common.projects.statusLabels.${project.status}`)}
            </span>
          )}

          {typeof project.featured === 'number' && (
            <span
              className='absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-brand/40 bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand backdrop-blur-sm'
              aria-label='Featured project'
            >
              <Sparkles className='size-3.5' />
            </span>
          )}
        </div>

        <div className='flex flex-1 flex-col gap-3 p-5'>
          <div className='space-y-1'>
            {project.dateRange && (
              <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                {project.dateRange}
              </p>
            )}
            <h3 className='text-lg font-semibold tracking-tight transition-colors group-hover:text-brand'>
              {localized.title}
            </h3>
          </div>

          {localized.description && (
            <p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
              {localized.description}
            </p>
          )}

          {tech.length > 0 && (
            <div className='mt-auto flex flex-wrap gap-1.5 pt-1'>
              {tech.slice(0, MAX_TECH).map((item) => (
                <Badge
                  key={item._id}
                  variant='outline'
                  className='gap-1.5 border-border/60 px-2 py-1 text-xs font-normal'
                >
                  <TechIcon
                    techKey={item.icon?.toLowerCase?.() || item.name?.toLowerCase?.()}
                    label={item.name}
                    className='size-3.5 object-contain'
                  />
                  {item.name}
                </Badge>
              ))}
              {tech.length > MAX_TECH && (
                <Badge
                  variant='outline'
                  className='border-border/60 px-2 py-1 text-xs font-normal text-muted-foreground'
                >
                  +{tech.length - MAX_TECH}
                </Badge>
              )}
            </div>
          )}

          <span className='inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-brand'>
            {t('common.projects.checkOut')}
            <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function Project({ projects }: { projects: ProjectType[] }) {
  const t = useTranslations();

  return (
    <div className='space-y-8'>
      <p className='mx-auto max-w-2xl text-center text-base leading-relaxed text-muted-foreground'>
        {t('common.projects.intro')}
      </p>

      {projects.length === 0 ? (
        <p className='text-center text-muted-foreground'>
          {t('common.projects.empty')}
        </p>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2'>
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
