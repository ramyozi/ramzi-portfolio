'use client';

import { useEffect, useState } from 'react';
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
  const locale = useLocale() as 'fr' | 'en' | 'ar' | 'kr';
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [failedLogos, setFailedLogos] = useState(false);

  useEffect(() => {
    client
      .fetch(allExperiencesQuery)
      .then(setExperiences)
      .catch((err) => console.error('❌ Failed to fetch experiences:', err));
  }, []);

  if (!experiences.length)
    return (
      <section id='experience' className='scroll-mt-24'>
        <Card className='border-2 border-primary'>
          <CardHeader />
          <CardContent>{t('common.experience.empty')}</CardContent>
        </Card>
      </section>
    );

  return (
    <section id='experience' className='scroll-mt-24 space-y-6'>
      <Card className='border-2'>
        <CardHeader />
        <CardContent className='grid gap-6 md:grid-cols-3'>
          {experiences.map((exp) => {
            const tr = exp.translations?.[locale] || exp.translations?.fr;

            if (!tr) return null;

            return (
              <Card key={exp._id} className='border bg-muted'>
                <CardHeader className='flex flex-col items-center space-y-2 text-center'>
                  {exp.logo?.url && (
                    <Image
                      src={exp.logo.url}
                      alt={tr.company}
                      width={120}
                      height={120}
                      className='rounded-md'
                    />
                  )}
                  <h3 className='font-bold'>{tr.company}</h3>
                  <p className='text-sm text-muted-foreground'>{tr.role}</p>
                  <p className='text-xs text-muted-foreground'>
                    {tr.location} | {tr.period}
                  </p>
                </CardHeader>

                <CardContent className='space-y-4'>
                  {tr.solution && (
                    <div>
                      <strong>{t('common.experience.labels.solution')}:</strong>
                      <p className='mt-1 text-sm'>{tr.solution}</p>
                    </div>
                  )}

                  {tr.tasks?.length ? (
                    <div>
                      <strong>{t('common.experience.labels.tasks')}:</strong>
                      <ul className='list-inside list-disc text-sm'>
                        {tr.tasks.map((task: string, i: number) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {exp.technologies?.length ? (
                    <div>
                      <strong>
                        {t('common.experience.labels.technologies')}:
                      </strong>
                      <div className='mt-2 grid grid-cols-4 gap-3'>
                        {exp.technologies.map((tech) => (
                          <TooltipProvider key={tech._id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <TechIcon
                                  techKey={
                                    tech.icon?.toLowerCase() ||
                                    tech.name.toLowerCase()
                                  }
                                  label={tech.name}
                                  className='mx-auto h-8 w-8 object-contain transition-transform duration-200 hover:scale-110'
                                  onError={() => setFailedLogos(true)}
                                />
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
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}

          {failedLogos && (
            <p className='text-xs text-gray-400'>
              {t('common.skills.logoFallbackNote')}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
