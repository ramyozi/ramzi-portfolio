'use client'; // if you plan to add interactivity later

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ProjectDetailProps {
  project: any;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations('common.projects');

  if (!project) return null;

  return (
    <div className='flex flex-col space-y-16'>
      <header className='space-y-4 text-center'>
        <h1 className='text-5xl font-extrabold tracking-tight md:text-7xl'>
          {project.title}
        </h1>
        <p className='mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl'>
          {project.description}
        </p>
      </header>

      <section>
        <Card className='shadow-lg'>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse text-left'>
                <thead>
                  <tr className='border-b'>
                    <th className='px-4 py-3 font-semibold'>{t('date')}</th>
                    <th className='px-4 py-3 font-semibold'>{t('stack')}</th>
                    <th className='px-4 py-3 font-semibold'>{t('links')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='px-4 py-3 align-top'>
                      {project.dateRange ?? '—'}
                    </td>
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
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>{t('gallery')}</h2>
        {project.gallery && project.gallery.length > 0 ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {project.gallery.map((src: string, i: number) => (
              <div
                key={i}
                className='relative aspect-[4/3] w-full overflow-hidden rounded-xl border shadow'
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
          <p className='text-sm text-muted-foreground'>{t('noImages')}</p>
        )}
      </section>
    </div>
  );
}
