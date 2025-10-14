'use client';

import { JSX, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useLocale, useTranslations } from 'next-intl';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/queries/projects';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TechIcon from '@/components/service/common/tech-icon';
import type { Project, ProjectStatus } from '@/data/types/project';
import { CheckCircle, Clock, PauseCircle, Rocket } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from '@/i18n/navigation';

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
    client.fetch(allProjectsQuery).then(setProjects).catch(console.error);
  }, []);

  return (
    <section id='projects' className='scroll-mt-24 space-y-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='mx-auto max-w-3xl text-center'
      >
        <p className='text-sm font-medium uppercase tracking-wide text-primary/80'>
          {t('common.projects.intro')}
        </p>
        <p className='mt-3 text-base leading-relaxed text-muted-foreground'>
          {t('common.projects.content')}
        </p>
      </motion.div>

      <Card className='overflow-hidden border border-border/60 bg-card/70 shadow-lg backdrop-blur-md'>
        <CardContent className='p-4 md:p-8'>
          {projects.length > 0 ? (
            <Carousel className='mx-4 md:mx-8' opts={{ loop: true }}>
              <CarouselContent>
                {projects.map((project, idx) => {
                  const localized = project.translations?.[locale] ||
                    project.translations?.en || { title: '', description: '' };

                  return (
                    <CarouselItem key={project._id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className='flex min-h-[500px] flex-col items-center justify-center md:grid md:grid-cols-2 md:gap-10'
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6 }}
                          className='flex flex-col items-center justify-center space-y-5 text-center md:items-start md:space-y-6 md:text-left'
                        >
                          <h3 className='text-2xl font-semibold text-primary'>
                            {localized.title}
                          </h3>

                          {project.status && (
                            <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start'>
                              {statusIcons[project.status]}
                              {t(
                                `common.projects.statusLabels.${project.status}`
                              )}
                            </div>
                          )}

                          {project.image?.url && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6 }}
                              className='relative mt-4 flex w-full justify-center md:hidden'
                            >
                              <div className='w-[95%] max-w-[640px] overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl sm:w-[90%]'>
                                <Image
                                  src={project.image.url}
                                  alt={localized.title}
                                  width={700}
                                  height={500}
                                  className='h-full w-full object-cover'
                                />
                                <div className='absolute inset-0 rounded-2xl bg-gradient-to-t from-background/30 via-transparent to-transparent' />
                              </div>
                            </motion.div>
                          )}

                          <p className='max-w-md leading-relaxed text-muted-foreground'>
                            {localized.description}
                          </p>

                          {Array.isArray(project.technologies) &&
                            project.technologies.length > 0 && (
                              <div className='flex flex-wrap justify-center gap-3 md:justify-start'>
                                {project.technologies.map((tech) => (
                                  <TooltipProvider key={tech._id}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge
                                          variant='outline'
                                          className='flex items-center gap-2 px-3 py-2 text-sm transition-all hover:scale-105 hover:border-primary/60 hover:shadow-md'
                                        >
                                          <TechIcon
                                            techKey={
                                              tech.icon?.toLowerCase?.() ||
                                              tech.name?.toLowerCase?.()
                                            }
                                            label={tech.name}
                                            className='h-5 w-5 object-contain'
                                            onError={() => setFailedLogos(true)}
                                          />
                                          <span>{tech.name}</span>
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent className='text-center'>
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
                            onClick={() =>
                              router.push(`/project/${project._id}`)
                            }
                            variant='default'
                            className='mt-6 rounded-md px-5 py-2 shadow-sm transition-transform hover:scale-105'
                          >
                            {t('common.projects.checkOut')}
                          </Button>
                        </motion.div>

                        {project.image?.url && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className='relative hidden justify-center md:flex'
                          >
                            <div className='w-[95%] max-w-[640px] overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl sm:w-[90%] md:w-full'>
                              <Image
                                src={project.image.url}
                                alt={localized.title}
                                width={700}
                                height={500}
                                className='h-full w-full object-cover'
                              />
                              <div className='absolute inset-0 rounded-2xl bg-gradient-to-t from-background/30 via-transparent to-transparent' />
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className='transition-transform duration-300 hover:scale-110' />
              <CarouselNext className='transition-transform duration-300 hover:scale-110' />
            </Carousel>
          ) : (
            <p className='text-center text-muted-foreground'>
              {t('common.projects.empty')}
            </p>
          )}

          {failedLogos && (
            <p className='mt-4 text-center text-xs text-muted-foreground'>
              {t('common.skills.logoFallbackNote')}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
