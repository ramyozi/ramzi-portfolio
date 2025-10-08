'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import TechIcon from '@/components/service/common/tech-icon';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/queries/projects';
import type { Project } from '@/data/types/project';

export function Project() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [failedLogos, setFailedLogos] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleCheckOutProject = (id: string) => router.push('/project/' + id);
  const handleImgError = () => setFailedLogos(true);

  useEffect(() => {
    client.fetch(allProjectsQuery, { locale }).then(setProjects);
  }, [locale]);

  if (!projects.length) {
    return (
      <section id='projects' className='scroll-mt-24 space-y-6'>
        <Card className='border-l-4 shadow-sm'>
          <CardHeader />
          <CardContent>{t('common.projects.empty')}</CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id='projects' className='scroll-mt-24 space-y-6'>
      <Card className='border-l-4 shadow-sm'>
        <CardHeader />
        <CardContent>
          <Carousel
            className='mx-2 md:mx-8'
            opts={{
              loop: true,
              direction: locale === 'ar' ? 'rtl' : 'ltr',
            }}
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project._id} className='flex items-center'>
                  <div className='grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2'>
                    <motion.div
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className='flex flex-col justify-center space-y-6'
                    >
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
                            className='flex items-center gap-2 px-3 py-2 text-sm md:text-base'
                          >
                            <TechIcon
                              techKey={tech.key.toLowerCase()}
                              label={tech.label}
                              className='h-6 w-6 object-contain'
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
                          className='w-full rounded-md px-4 py-2 transition hover:bg-primary/20'
                        >
                          {t('common.projects.checkOut')}
                        </Button>
                      </div>
                    </motion.div>

                    {project.image && (
                      <motion.div
                        initial={{ opacity: 0, x: 18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='flex justify-center'
                      >
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className='overflow-hidden rounded-2xl'
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={700}
                            height={500}
                            className='h-full w-full object-cover'
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
