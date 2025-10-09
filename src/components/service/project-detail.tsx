'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/queries/projects';
import type { Project } from '@/data/types/project';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TechIcon from '@/components/service/common/tech-icon';

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') setSelectedImageIndex(null);

      if (e.key === 'ArrowRight')
        setSelectedImageIndex((i) => (i! + 1) % (project.gallery?.length || 1));

      if (e.key === 'ArrowLeft')
        setSelectedImageIndex(
          (i) =>
            (i! - 1 + (project.gallery?.length || 1)) %
            (project.gallery?.length || 1)
        );
    },
    [selectedImageIndex, project.gallery?.length]
  );

  useEffect(() => {
    client
      .fetch(allProjectsQuery, { locale })
      .then(setProjects)
      .catch((err) => console.error('❌ Failed to fetch projects:', err));
  }, [locale]);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, handleKeyDown]);

  if (!project) return null;

  const gallery = project.gallery?.map((img) => img.url) || [];
  const total = projects.length;
  const currentIndex = projects.findIndex((p) => p._id === project._id);

  const goPrevProject = () => {
    if (!total) return;

    const prevIndex = (currentIndex - 1 + total) % total;

    router.push(`/project/${projects[prevIndex]._id}`);
  };
  const goNextProject = () => {
    if (!total) return;

    const nextIndex = (currentIndex + 1) % total;

    router.push(`/project/${projects[nextIndex]._id}`);
  };

  return (
    <div className='flex flex-col space-y-8 px-4 pt-6 md:space-y-10 md:px-12 lg:px-24'>
      {project.image?.url && (
        <motion.div
          className='relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='relative mx-auto flex aspect-[3/2] max-w-lg items-center justify-center bg-muted/10'>
            <Image
              src={project.image.url}
              alt={project.title}
              fill
              sizes='(max-width: 768px) 100vw, 600px'
              className={`rounded-2xl transition-all duration-500 ${
                project.title.toLowerCase().includes('memopus')
                  ? 'object-contain p-4'
                  : 'object-cover'
              }`}
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
          </div>
        </motion.div>
      )}

      <motion.div
        className='text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className='text-3xl font-extrabold md:text-5xl'>{project.title}</h1>
        <p className='mx-auto mt-3 max-w-3xl text-base text-muted-foreground md:text-lg'>
          {project.description}
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
                {project.status && (
                  <th className='px-4 py-3 font-semibold'>
                    {t('common.projects.status')}
                  </th>
                )}
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
                <td className='px-4 py-3'>{project.dateRange ?? '—'}</td>
                {project.status && (
                  <td className='px-4 py-3'>{project.status}</td>
                )}
                <td className='px-4 py-3'>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies?.length ? (
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
                                    tech.icon
                                      ? tech.icon.toLowerCase()
                                      : tech.name
                                        ? tech.name.toLowerCase()
                                        : 'unknown'
                                  }
                                  label={tech.name || 'Unknown'}
                                  className='h-5 w-5 object-contain'
                                  onError={() =>
                                    console.warn(
                                      `⚠️ Missing tech icon for: ${tech.name || tech._id}`
                                    )
                                  }
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
                  Object.values(project.links).some((v) => v) ? (
                    <ul className='space-y-2'>
                      {Object.entries(project.links).map(([key, url]) =>
                        url ? (
                          <li key={key}>
                            <a
                              href={url as string}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center gap-2 text-primary hover:underline'
                            >
                              {key === 'live' ? (
                                <Globe className='h-4 w-4' />
                              ) : (
                                <Github className='h-4 w-4' />
                              )}
                              {t(key as any)}
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
