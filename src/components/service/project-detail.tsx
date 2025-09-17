'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProjectDetailProps {
  project: any;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const items = t.raw('common.projects.items') as Record<string, any>;
  const projects = Object.values(items);
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const totalProjects = projects.length;

  if (!project) return null;

  const goBack = () => {
    if (document.referrer && document.referrer !== window.location.href) {
      window.history.back();
    } else {
      router.push(`/#projects`);
    }
  };

  const goPrevProject = () => {
    const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;

    router.push(`/project/${projects[prevIndex].id}`);
  };

  const goNextProject = () => {
    const nextIndex = (currentIndex + 1) % totalProjects;

    router.push(`/project/${projects[nextIndex].id}`);
  };

  return (
    <div className='flex flex-col space-y-12 px-4 md:space-y-16 md:px-12 lg:px-24'>
      {/* Header with Back button */}
      <div className='flex items-center justify-between'>
        <Button
          onClick={goBack}
          className='px-3 py-1 text-sm md:text-base'
          variant={'outline'}
        >
          ← {t('common.back')}
        </Button>
      </div>

      {/* Project Title */}
      <h1 className='text-center text-3xl font-extrabold md:text-5xl'>
        {project.title}
      </h1>

      {/* Description */}
      <p className='mx-auto max-w-3xl text-center text-base text-muted-foreground md:text-lg'>
        {project.description}
      </p>

      {/* Project Details Card */}
      <Card className='shadow-lg'>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-b'>
                  <th className='px-4 py-3 font-semibold'>{t('date')}</th>
                  {project.status && (
                    <th className='px-4 py-3 font-semibold'>{t('status')}</th>
                  )}
                  <th className='px-4 py-3 font-semibold'>{t('stack')}</th>
                  <th className='px-4 py-3 font-semibold'>{t('links')}</th>
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
                      {Object.entries(project.technologies ?? {}).map(
                        ([key, tech]) => (
                          <Badge
                            key={key}
                            variant='outline'
                            className='px-4 py-2 text-sm font-medium md:text-base'
                          >
                            {String(tech)}
                          </Badge>
                        )
                      )}
                    </div>
                  </td>
                  <td className='px-4 py-3 align-top'>
                    <ul className='space-y-2'>
                      {project.links?.repo && (
                        <li>
                          <a
                            href={project.links.repo}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 text-primary hover:underline'
                          >
                            <Github className='h-4 w-4' />
                            {t('repo')}
                          </a>
                        </li>
                      )}
                      {!project.links && (
                        <li className='text-sm text-muted-foreground'>
                          {t('noLinks')}
                        </li>
                      )}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {project.gallery.map((src: string, i: number) => (
            <motion.div
              key={i}
              className='relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl border shadow'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                fill
                className='object-cover'
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className='text-center text-sm text-muted-foreground'>
          {t('noImages')}
        </p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className='relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
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
            total: totalProjects,
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
    </div>
  );
}
