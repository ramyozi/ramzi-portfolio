'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';
import { client } from '@/sanity/lib/client';
import { allExperiencesQuery } from '@/sanity/queries/experiences';
import Image from 'next/image';
import TechIcon from '@/components/service/common/tech-icon';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import type { Experience } from '@/data/types/experience';

export function Experience() {
  const t = useTranslations();
  const locale = useLocale();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [failedLogos, setFailedLogos] = useState(false);

  useEffect(() => {
    client
      .fetch(allExperiencesQuery, { locale })
      .then((res: Experience[]) => setExperiences(res || []))
      .catch((err) => console.error('❌ Failed to fetch experiences:', err));
  }, [locale]);

  if (!experiences || experiences.length === 0)
    return (
      <section id='experience' className='scroll-mt-24'>
        <Card className='border-2 border-primary'>
          <CardHeader />
          <CardContent>
            <p className='text-center text-muted-foreground'>
              {t('common.experience.empty')}
            </p>
          </CardContent>
        </Card>
      </section>
    );

  return (
    <section id='experience' className='scroll-mt-24 space-y-6'>
      <Card className='border-2 shadow-sm'>
        <CardHeader />
        <CardContent className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className='h-full border bg-muted/50 shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-md'>
                <CardHeader className='flex flex-col items-center space-y-2 text-center'>
                  {exp.logo?.url && (
                    <div className='relative h-24 w-24 overflow-hidden rounded-xl shadow-sm'>
                      <Image
                        src={exp.logo.url}
                        alt={exp.company}
                        fill
                        sizes='100px'
                        className='object-contain'
                      />
                    </div>
                  )}
                  <h3 className='text-lg font-bold'>{exp.company}</h3>
                  {exp.role && (
                    <p className='text-sm text-muted-foreground'>{exp.role}</p>
                  )}
                  {(exp.location || exp.period) && (
                    <p className='text-xs text-muted-foreground'>
                      {[exp.location, exp.period].filter(Boolean).join(' • ')}
                    </p>
                  )}
                </CardHeader>

                <CardContent className='space-y-4'>
                  {exp.solution && (
                    <div>
                      <strong className='text-sm'>
                        {t('common.experience.labels.solution')}:
                      </strong>
                      <p className='mt-1 text-sm text-muted-foreground'>
                        {exp.solution}
                      </p>
                    </div>
                  )}

                  {Array.isArray(exp.tasks) && exp.tasks.length > 0 && (
                    <div>
                      <strong className='text-sm'>
                        {t('common.experience.labels.tasks')}:
                      </strong>
                      <ul className='mt-1 list-inside list-disc text-sm text-muted-foreground'>
                        {exp.tasks.map((task: string, i: number) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(exp.technologies) &&
                    exp.technologies.length > 0 && (
                      <div>
                        <strong className='text-sm'>
                          {t('common.experience.labels.technologies')}:
                        </strong>
                        <div className='mt-3 grid grid-cols-4 gap-3'>
                          {exp.technologies
                            .filter(
                              (tech) =>
                                tech &&
                                (tech.name || tech.icon) &&
                                typeof tech === 'object'
                            )
                            .map((tech) => {
                              const safeKey =
                                tech.icon?.toLowerCase?.() ||
                                tech.name?.toLowerCase?.() ||
                                'unknown';

                              return (
                                <TooltipProvider key={tech._id || safeKey}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <motion.div
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 1.05 }}
                                        className='flex flex-col items-center'
                                      >
                                        <TechIcon
                                          techKey={safeKey}
                                          label={tech.name || 'Unknown'}
                                          className='h-8 w-8 object-contain'
                                          onError={() => setFailedLogos(true)}
                                        />
                                      </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent className='text-center'>
                                      <div className='flex flex-col items-center space-y-1'>
                                        <span className='text-sm font-medium'>
                                          {tech.name || 'Unknown'}
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
                              );
                            })}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {failedLogos && (
            <p className='col-span-full text-center text-xs text-gray-400'>
              {t('common.skills.logoFallbackNote')}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
