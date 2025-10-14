'use client';

import { useState, useEffect, useCallback, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Github,
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  PauseCircle,
  Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/queries/projects';
import type { Project, ProjectStatus } from '@/data/types/project';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TechIcon from '@/components/service/common/tech-icon';

const statusIcons: Record<ProjectStatus, JSX.Element> = {
  planned: <Clock className='inline h-4 w-4 text-blue-400' />,
  in_progress: <Rocket className='inline h-4 w-4 text-yellow-500' />,
  completed: <CheckCircle className='inline h-4 w-4 text-green-500' />,
  on_hold: <PauseCircle className='inline h-4 w-4 text-gray-400' />,
};

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const localized = project.translations?.[locale] ||
    project.translations?.en || {
      title: '',
      description: '',
    };

  const gallery = Array.isArray(project.gallery)
    ? project.gallery.map((img) => img.url)
    : [];

  useEffect(() => {
    client
      .fetch(allProjectsQuery)
      .then((res: Project[]) => setProjects(res ?? []))
      .catch((err) => console.error('❌ Failed to fetch projects:', err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const total = projects.length;
  const currentIndex = projects.findIndex((p) => p._id === project._id);

  const goPrevProject = () => {
    if (total === 0) return;

    const prev = (currentIndex - 1 + total) % total;

    router.push(`/project/${projects[prev]._id}`);
  };

  const goNextProject = () => {
    if (total === 0) return;

    const next = (currentIndex + 1) % total;

    router.push(`/project/${projects[next]._id}`);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') setSelectedImageIndex(null);

      if (e.key === 'ArrowRight')
        setSelectedImageIndex((i) => ((i ?? 0) + 1) % gallery.length);

      if (e.key === 'ArrowLeft')
        setSelectedImageIndex(
          (i) => ((i ?? 0) - 1 + gallery.length) % gallery.length
        );
    },
    [selectedImageIndex, gallery.length]
  );

  useEffect(() => {
    if (selectedImageIndex !== null)
      window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleKeyDown]);

  return (
    <div className='flex flex-col space-y-6 px-4 pt-4 md:px-12 lg:px-24'>
      {project.image?.url && (
        <motion.div
          className='relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-muted/10 shadow-lg'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='relative flex aspect-[16/9] items-center justify-center'>
            <Image
              src={project.image.url}
              alt={localized.title}
              fill
              className='object-contain p-4'
              sizes='(max-width: 768px) 100vw, 800px'
              priority
            />
          </div>
        </motion.div>
      )}

      <motion.div
        className='text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className='text-3xl font-extrabold md:text-5xl'>
          {localized.title}
        </h1>

        {project.status && (
          <div className='mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='flex cursor-default items-center gap-2'>
                    {statusIcons[project.status]}
                    <span>
                      {t(`common.projects.statusLabels.${project.status}`)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {t(`common.projects.statusLabels.${project.status}`)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <p className='mx-auto mt-3 max-w-3xl text-base text-muted-foreground md:text-lg'>
          {localized.description}
        </p>
      </motion.div>

      <Card className='border-2 shadow-md'>
        <CardContent>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b'>
                <th className='px-4 py-3 font-semibold'>
                  {t('common.projects.date')}
                </th>
                <th className='px-4 py-3 font-semibold'>
                  {t('common.projects.stack')}
                </th>
                <th className='px-4 py-3 font-semibold'>
                  {t('common.projects.links')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <td className='px-4 py-3'>{project.dateRange ?? '-'}</td>

                <td className='px-4 py-3'>
                  <div className='flex flex-wrap gap-2'>
                    {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 ? (
                      project.technologies.map((tech) => (
                        <TooltipProvider key={tech._id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant='outline'
                                className='flex items-center gap-2 px-3 py-1 transition-transform hover:scale-105 hover:shadow-sm'
                              >
                                <TechIcon
                                  techKey={
                                    tech.icon?.toLowerCase?.() ||
                                    tech.name?.toLowerCase?.() ||
                                    'unknown'
                                  }
                                  label={tech.name}
                                  className='h-5 w-5 object-contain'
                                />
                                <span>{tech.name}</span>
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className='flex flex-col items-center'>
                                <span className='font-medium'>{tech.name}</span>
                                {tech.level && (
                                  <span className='text-xs text-muted-foreground'>
                                    {t(
                                      `common.skills.proficiency.${tech.level}`
                                    )}
                                  </span>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))
                    ) : (
                      <span className='text-sm text-muted-foreground'>
                        {t('common.projects.noStack')}
                      </span>
                    )}
                  </div>
                </td>

                <td className='px-4 py-3'>
                  {project.links &&
                  Object.values(project.links).some(Boolean) ? (
                    <ul className='space-y-2'>
                      {Object.entries(project.links).map(([key, url]) =>
                        url ? (
                          <li key={key}>
                            <a
                              href={url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center gap-2 text-primary hover:underline'
                            >
                              {key === 'live' ? (
                                <Globe className='h-4 w-4' />
                              ) : (
                                <Github className='h-4 w-4' />
                              )}
                              {t(`common.projects.${key}`)}
                            </a>
                          </li>
                        ) : null
                      )}
                    </ul>
                  ) : (
                    <p className='text-sm text-muted-foreground'>
                      {t('common.projects.noLinks')}
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {gallery.length > 0 && (
        <motion.div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {gallery.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelectedImageIndex(i)}
              className='relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg'
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className='fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
          >
            <div
              className='relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black p-4 shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                className='absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80'
                onClick={() => setSelectedImageIndex(null)}
              >
                <X className='h-5 w-5' />
              </Button>

              {gallery.length > 1 && (
                <>
                  <Button
                    onClick={() =>
                      setSelectedImageIndex(
                        (selectedImageIndex - 1 + gallery.length) %
                          gallery.length
                      )
                    }
                    className='absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80'
                  >
                    <ChevronLeft className='h-5 w-5' />
                  </Button>
                  <Button
                    onClick={() =>
                      setSelectedImageIndex(
                        (selectedImageIndex + 1) % gallery.length
                      )
                    }
                    className='absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80'
                  >
                    <ChevronRight className='h-5 w-5' />
                  </Button>
                </>
              )}

              <motion.div
                key={gallery[selectedImageIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='flex items-center justify-center'
              >
                <Image
                  src={gallery[selectedImageIndex]}
                  alt='Gallery image'
                  width={1600}
                  height={1200}
                  className='max-h-[85vh] w-auto object-contain'
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length > 0 && (
        <div className='flex flex-col items-center justify-center space-y-2 md:flex-row md:space-x-4'>
          <Button onClick={goPrevProject} variant='outline'>
            {t('common.previous')}
          </Button>
          <span className='text-sm text-muted-foreground'>
            {t('common.projects.projectNumber', {
              current: currentIndex + 1,
              total,
            })}
          </span>
          <Button onClick={goNextProject} variant='outline'>
            {t('common.next')}
          </Button>
        </div>
      )}
    </div>
  );
}
