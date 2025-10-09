'use client';

import { JSX, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter } from '@/i18n/navigation';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/queries/projects';
import TechIcon from '@/components/service/common/tech-icon';
import type { Project, ProjectStatus } from '@/data/types/project';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Clock, CheckCircle, PauseCircle, Rocket } from 'lucide-react';

const statusIcons: Record<ProjectStatus, JSX.Element> = {
  planned: <Clock className='inline h-4 w-4 text-blue-400' />,
  in_progress: <Rocket className='inline h-4 w-4 text-yellow-500' />,
  completed: <CheckCircle className='inline h-4 w-4 text-green-500' />,
  on_hold: <PauseCircle className='inline h-4 w-4 text-gray-400' />,
};

export function Project() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [failedLogos, setFailedLogos] = useState(false);

  useEffect(() => {
    client
      .fetch(allProjectsQuery)
      .then((res: Project[]) => setProjects(res ?? []))
      .catch((err) => console.error('❌ Failed to fetch projects:', err));
  }, []);

  const handleCheckOutProject = (id: string) => router.push(`/project/${id}`);

  return (
    <section id='projects' className='scroll-mt-24 space-y-6'>
      <Card className='border-l-4 shadow-sm'>
        <CardHeader />
        <CardContent>
          {projects.length > 0 ? (
            <Carousel
              className='mx-2 md:mx-8'
              opts={{ loop: true, direction: locale === 'ar' ? 'rtl' : 'ltr' }}
            >
              <CarouselContent>
                {projects.map((project) => {
                  const localized = project.translations?.[locale] ||
                    project.translations?.en || { title: '', description: '' };

                  return (
                    <CarouselItem
                      key={project._id}
                      className='flex items-center'
                    >
                      <div className='grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2'>
                        <div className='flex flex-col justify-center space-y-6'>
                          <div className='space-y-2'>
                            <h3 className='text-xl font-semibold md:text-2xl'>
                              {localized.title}
                            </h3>

                            {project.status && (
                              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                {statusIcons[project.status]}
                                <span>
                                  {t(
                                    `common.projects.statusLabels.${project.status}`
                                  )}
                                </span>
                              </div>
                            )}

                            <p className='text-sm text-muted-foreground md:text-base'>
                              {localized.description}
                            </p>
                          </div>

                          {Array.isArray(project.technologies) &&
                            project.technologies.length > 0 && (
                              <div className='flex flex-wrap gap-3'>
                                {project.technologies.map((tech) => (
                                  <TooltipProvider key={tech._id}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge
                                          variant='outline'
                                          className='flex items-center gap-2 px-3 py-2 text-sm transition hover:scale-105 hover:shadow-sm'
                                        >
                                          <TechIcon
                                            techKey={
                                              tech.icon?.toLowerCase?.() ||
                                              tech.name?.toLowerCase?.() ||
                                              'unknown'
                                            }
                                            label={tech.name}
                                            className='h-5 w-5 object-contain'
                                            onError={() => setFailedLogos(true)}
                                          />
                                          <span>{tech.name}</span>
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <div className='flex flex-col items-center space-y-1'>
                                          <span className='text-sm font-medium'>
                                            {tech.name}
                                          </span>
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
                                ))}
                              </div>
                            )}

                          <Button
                            onClick={() => handleCheckOutProject(project._id)}
                            variant='default'
                            className='w-full rounded-md px-4 py-2'
                          >
                            {t('common.projects.checkOut')}
                          </Button>
                        </div>

                        {project.image?.url && (
                          <div className='flex justify-center'>
                            <div className='overflow-hidden rounded-2xl'>
                              <Image
                                src={project.image.url}
                                alt={localized.title || 'Project'}
                                width={700}
                                height={500}
                                className='h-full w-full object-cover'
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <p className='text-muted-foreground'>
              {t('common.projects.empty')}
            </p>
          )}

          {failedLogos && (
            <p className='mt-2 text-xs text-gray-400'>
              {t('common.skills.logoFallbackNote')}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
