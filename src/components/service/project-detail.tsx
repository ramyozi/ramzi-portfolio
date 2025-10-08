'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/queries/projects';
import type { Project } from '@/data/types/project';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(allProjectsQuery, { locale })
      .then((res) => setProjects(res))
      .catch((err) => console.error('❌ Failed to fetch projects:', err));
  }, [locale]);

  if (!project) return null;

  const goBack = () => {
    router.push(`/#projects`);
  };

  const currentIndex = projects.findIndex((p) => p._id === project._id);
  const total = projects.length;

  const goPrevProject = () => {
    if (total === 0) return;

    const prevIndex = (currentIndex - 1 + total) % total;

    router.push(`/project/${projects[prevIndex]._id}`);
  };

  const goNextProject = () => {
    if (total === 0) return;

    const nextIndex = (currentIndex + 1) % total;

    router.push(`/project/${projects[nextIndex]._id}`);
  };

  return (
    <div className='flex flex-col space-y-12 px-4 md:space-y-16 md:px-12 lg:px-24'>
      <div className='flex items-center justify-between'>
        <Button
          onClick={goBack}
          className='px-3 py-1 text-sm md:text-base'
          variant='outline'
        >
          ← {t('common.back')}
        </Button>
      </div>

      <h1 className='text-center text-3xl font-extrabold md:text-5xl'>
        {project.title}
      </h1>

      <p className='mx-auto max-w-3xl text-center text-base text-muted-foreground md:text-lg'>
        {project.description}
      </p>

      <Card className='border-2 shadow-lg'>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
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
                  <td className='px-4 py-3 align-top'>
                    {project.dateRange ?? '—'}
                  </td>

                  {project.status && (
                    <td className='px-4 py-3 align-top'>{project.status}</td>
                  )}

                  <td className='px-4 py-3 align-top'>
                    <div className='flex flex-wrap gap-2'>
                      {project.technologies?.length ? (
                        project.technologies.map((tech) => (
                          <Badge
                            key={tech.key}
                            variant='outline'
                            className='px-3 py-1 text-sm font-medium'
                          >
                            {tech.label}
                          </Badge>
                        ))
                      ) : (
                        <span className='text-sm text-muted-foreground'>
                          {t('common.projects.noStack')}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className='px-4 py-3 align-top'>
                    {project.links &&
                    Object.values(project.links).some((v) => v) ? (
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
          </div>
        </CardContent>
      </Card>

      {project.gallery && project.gallery.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {project.gallery.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(src)}
              className='relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl border shadow hover:opacity-90'
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-sm text-muted-foreground'>
          {t('common.projects.noImages')}
        </p>
      )}

      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
          onClick={() => setSelectedImage(null)}
        >
          <div
            className='relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className='absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80'
              onClick={() => setSelectedImage(null)}
            >
              <X className='h-5 w-5' />
            </Button>
            <Image
              src={selectedImage}
              alt='Selected gallery image'
              width={1600}
              height={1200}
              className='h-auto w-full object-contain'
            />
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className='flex flex-col items-center justify-center space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
          <Button
            onClick={goPrevProject}
            variant='outline'
            className='px-4 py-2 md:px-6 md:py-3'
          >
            {t('common.previous')}
          </Button>

          <span className='text-sm text-muted-foreground md:text-base'>
            {t('common.projects.projectNumber', {
              current: currentIndex + 1,
              total,
            })}
          </span>

          <Button
            onClick={goNextProject}
            variant='outline'
            className='px-4 py-2 md:px-6 md:py-3'
          >
            {t('common.next')}
          </Button>
        </div>
      )}
    </div>
  );
}
