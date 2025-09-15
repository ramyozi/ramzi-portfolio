'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Globe, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProjectDetailProps {
  project: any;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations('common.projects');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) return null;

  return (
    <div className='flex flex-col space-y-16'>
      <motion.header
        className='space-y-4 text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-5xl font-extrabold tracking-tight md:text-7xl'>
          {project.title}
        </h1>
        <p className='mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl'>
          {project.description}
        </p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
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
                              className='px-4 py-2 text-base font-medium'
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
                        {project.links?.repoFrontend &&
                          project.links?.repoBackend && (
                            <>
                              <li>
                                <a
                                  href={project.links.repoFrontend}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='flex items-center gap-2 text-primary hover:underline'
                                >
                                  <Github className='h-4 w-4' />
                                  {t('repoFrontend')}
                                </a>
                              </li>
                              <li>
                                <a
                                  href={project.links.repoBackend}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='flex items-center gap-2 text-primary hover:underline'
                                >
                                  <Github className='h-4 w-4' />
                                  {t('repoBackend')}
                                </a>
                              </li>
                            </>
                          )}
                        {project.links?.live && (
                          <li>
                            <a
                              href={project.links.live}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center gap-2 text-primary hover:underline'
                            >
                              <Globe className='h-4 w-4' />
                              {t('liveSite')}
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
      </motion.section>

      <motion.section
        className='space-y-6'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className='text-2xl font-semibold'>{t('gallery')}</h2>
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
          <p className='text-sm text-muted-foreground'>{t('noImages')}</p>
        )}
      </motion.section>

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
              <button
                className='absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80'
                onClick={() => setSelectedImage(null)}
              >
                <X className='h-5 w-5' />
              </button>
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
    </div>
  );
}
