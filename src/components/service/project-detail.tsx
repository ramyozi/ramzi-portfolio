'use client';

import { JSX, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Github,
  Globe,
  PauseCircle,
  Rocket,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/queries/projects';
import type { Project, ProjectStatus } from '@/data/types/project';
import TechIcon from '@/components/service/common/tech-icon';

const statusIcon: Record<ProjectStatus, JSX.Element> = {
  planned: <Clock className='size-4 text-sky-500' />,
  in_progress: <Rocket className='size-4 text-amber-500' />,
  completed: <CheckCircle className='size-4 text-emerald-500' />,
  on_hold: <PauseCircle className='size-4 text-muted-foreground' />,
};

const repoKeys = ['repo', 'repoFrontend', 'repoBackend', 'repoMobile'];

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [projects, setProjects] = useState<Project[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const localized = project.translations?.[locale] ||
    project.translations?.en || { title: '', description: '' };

  const gallery = Array.isArray(project.gallery)
    ? project.gallery.map((img) => img.url)
    : [];
  const tech = project.technologies ?? [];
  const links = project.links
    ? Object.entries(project.links).filter(([, url]) => Boolean(url))
    : [];

  useEffect(() => {
    client
      .fetch(allProjectsQuery)
      .then((res: Project[]) => setProjects(res ?? []))
      .catch((err) => console.error('Failed to fetch projects:', err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [project._id]);

  const currentIndex = projects.findIndex((p) => p._id === project._id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  const titleOf = (p: Project) =>
    (p.translations?.[locale] || p.translations?.en)?.title ?? '';

  const backToProjects = () => {
    sessionStorage.setItem('scrollTarget', 'projects');
    router.push('/');
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;

      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight')
        setLightbox((i) => ((i ?? 0) + 1) % gallery.length);
      if (e.key === 'ArrowLeft')
        setLightbox((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
    },
    [lightbox, gallery.length]
  );

  useEffect(() => {
    if (lightbox !== null) window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, handleKeyDown]);

  return (
    <div className='mx-auto w-full max-w-5xl space-y-10'>
      <button
        onClick={backToProjects}
        className='inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand'
      >
        <ArrowLeft className='size-4' />
        {t('common.header.projects')}
      </button>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='space-y-4'
      >
        <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
          {project.status && (
            <span className='inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-2.5 py-1 font-medium'>
              {statusIcon[project.status]}
              {t(`common.projects.statusLabels.${project.status}`)}
            </span>
          )}
          {project.dateRange && (
            <span className='font-medium uppercase tracking-wide'>
              {project.dateRange}
            </span>
          )}
        </div>

        <h1 className='text-3xl font-bold tracking-tight md:text-5xl'>
          {localized.title}
        </h1>

        {localized.description && (
          <p className='max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg'>
            {localized.description}
          </p>
        )}
      </motion.header>

      {/* Hero image */}
      {project.image?.url && (
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className='relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/60 bg-muted'
        >
          <Image
            src={project.image.url}
            alt={localized.title}
            fill
            sizes='(max-width: 1024px) 100vw, 1024px'
            className='object-contain p-3'
            priority
          />
        </motion.div>
      )}

      {/* Meta: stack + links */}
      <div className='grid gap-6 sm:grid-cols-2'>
        <section className='rounded-xl border border-border/70 bg-card p-5'>
          <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            {t('common.projects.stack')}
          </h2>
          {tech.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {tech.map((item) => (
                <Badge
                  key={item._id}
                  variant='outline'
                  className='gap-1.5 border-border/60 px-2.5 py-1 text-sm font-normal'
                >
                  <TechIcon
                    techKey={
                      item.icon?.toLowerCase?.() || item.name?.toLowerCase?.()
                    }
                    label={item.name}
                    className='size-4 object-contain'
                  />
                  {item.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className='text-sm text-muted-foreground'>—</p>
          )}
        </section>

        <section className='rounded-xl border border-border/70 bg-card p-5'>
          <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            {t('common.projects.links')}
          </h2>
          {links.length > 0 ? (
            <div className='flex flex-col gap-2'>
              {links.map(([key, url]) => (
                <a
                  key={key}
                  href={url as string}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-brand'
                >
                  {repoKeys.includes(key) ? (
                    <Github className='size-4' />
                  ) : (
                    <Globe className='size-4' />
                  )}
                  {t(`common.projects.${key}`)}
                  <ArrowRight className='size-3.5 opacity-60' />
                </a>
              ))}
            </div>
          ) : (
            <p className='text-sm text-muted-foreground'>
              {t('common.projects.noLinks')}
            </p>
          )}
        </section>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className='space-y-4'>
          <h2 className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            {t('common.projects.gallery')}
          </h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className='group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-muted transition-all hover:border-brand/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              >
                <Image
                  src={src}
                  alt={`${localized.title} — ${i + 1}`}
                  fill
                  sizes='(max-width: 640px) 100vw, 33vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Prev / next */}
      {(prevProject || nextProject) && (
        <nav className='grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2'>
          {prevProject ? (
            <button
              onClick={() => router.push(`/project/${prevProject._id}`)}
              className='group flex flex-col gap-1 rounded-xl border border-border/70 bg-card p-4 text-left transition-all hover:border-brand/40 hover:shadow-sm'
            >
              <span className='inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                <ChevronLeft className='size-3.5' />
                {t('common.previous')}
              </span>
              <span className='font-medium transition-colors group-hover:text-brand'>
                {titleOf(prevProject)}
              </span>
            </button>
          ) : (
            <span />
          )}
          {nextProject && (
            <button
              onClick={() => router.push(`/project/${nextProject._id}`)}
              className='group flex flex-col gap-1 rounded-xl border border-border/70 bg-card p-4 text-right transition-all hover:border-brand/40 hover:shadow-sm sm:items-end'
            >
              <span className='inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                {t('common.next')}
                <ChevronRight className='size-3.5' />
              </span>
              <span className='font-medium transition-colors group-hover:text-brand'>
                {titleOf(nextProject)}
              </span>
            </button>
          )}
        </nav>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className='fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <Button
              variant='outline'
              size='icon'
              className='absolute right-4 top-4 z-10 rounded-full'
              onClick={() => setLightbox(null)}
              aria-label='Close'
            >
              <X className='size-5' />
            </Button>

            {gallery.length > 1 && (
              <>
                <Button
                  variant='outline'
                  size='icon'
                  className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(
                      (lightbox - 1 + gallery.length) % gallery.length
                    );
                  }}
                  aria-label='Previous image'
                >
                  <ChevronLeft className='size-5' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % gallery.length);
                  }}
                  aria-label='Next image'
                >
                  <ChevronRight className='size-5' />
                </Button>
              </>
            )}

            <motion.div
              key={gallery[lightbox]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className='relative flex max-h-[88vh] w-full max-w-5xl items-center justify-center'
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[lightbox]}
                alt={`${localized.title} — ${lightbox + 1}`}
                width={1600}
                height={1200}
                className='max-h-[88vh] w-auto rounded-lg object-contain'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
