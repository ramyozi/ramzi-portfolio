'use client';

import { useState, useEffect } from 'react';
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
import type { Project } from '@/data/types/project';

export function Project() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [failedLogos, setFailedLogos] = useState(false);

  useEffect(() => {
    client
      .fetch(allProjectsQuery, { locale })
      .then((res) => setProjects(res))
      .catch((err) => console.error('❌ Failed to fetch projects:', err));
  }, [locale]);

  const handleCheckOutProject = (id: string) => router.push('/project/' + id);
  const handleImgError = () => setFailedLogos(true);

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
                {projects.map((project) => (
                  <CarouselItem key={project._id} className='flex items-center'>
                    <div className='grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2'>
                      <div className='flex flex-col justify-center space-y-6'>
                        <div className='space-y-2'>
                          <h3 className='text-xl font-semibold md:text-2xl'>
                            {project.title}
                          </h3>
                          {project.status && (
                            <span className='italic text-gray-500'>
                              {project.status}
                            </span>
                          )}
                          <p className='text-sm text-muted-foreground md:text-base'>
                            {project.description}
                          </p>
                        </div>

                        <div className='flex flex-wrap gap-3'>
                          {project.technologies?.map((tech) => (
                            <Badge
                              key={tech.key}
                              variant='outline'
                              className='flex items-center gap-2 px-3 py-2 text-sm'
                            >
                              <TechIcon
                                techKey={tech.key.toLowerCase()}
                                label={tech.label}
                                className='h-6 w-6'
                                onError={handleImgError}
                              />
                              <span>{tech.label}</span>
                            </Badge>
                          ))}
                        </div>

                        <div>
                          <Button
                            onClick={() => handleCheckOutProject(project._id)}
                            variant='default'
                            className='w-full rounded-md px-4 py-2'
                          >
                            {t('common.projects.checkOut')}
                          </Button>
                        </div>
                      </div>

                      {project.image?.url && (
                        <div className='flex justify-center'>
                          <div className='overflow-hidden rounded-2xl'>
                            <Image
                              src={project.image.url}
                              alt={project.title}
                              width={700}
                              height={500}
                              className='h-full w-full object-cover'
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
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
