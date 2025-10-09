'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      .then((res) => setExperiences(res))
      .catch((err) => console.error('❌ Failed to fetch experiences:', err));
  }, [locale]);

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
          {experiences.map((exp) => (
            <Card key={exp._id} className='border bg-muted'>
              <CardHeader className='flex flex-col items-center space-y-2 text-center'>
                {exp.logo?.url && (
                  <Image
                    src={exp.logo.url}
                    alt={exp.company}
                    width={120}
                    height={120}
                    className='rounded-md'
                  />
                )}
                <h3 className='font-bold'>{exp.company}</h3>
                <p className='text-sm text-muted-foreground'>{exp.role}</p>
                <p className='text-xs text-muted-foreground'>
                  {exp.location} | {exp.period}
                </p>
              </CardHeader>

              <CardContent className='space-y-4'>
                {exp.solution && (
                  <div>
                    <strong>{t('common.experience.labels.solution')}:</strong>
                    <p className='mt-1 text-sm'>{exp.solution}</p>
                  </div>
                )}

                {exp.tasks && exp.tasks.length > 0 && (
                  <div>
                    <strong>{t('common.experience.labels.tasks')}:</strong>
                    <ul className='list-inside list-disc text-sm'>
                      {exp.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div>
                    <strong>
                      {t('common.experience.labels.technologies')}:
                    </strong>
                    <div className='mt-2 grid grid-cols-4 gap-3'>
                      {exp.technologies.map((tech) => (
                        <TooltipProvider key={tech.key}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <TechIcon
                                techKey={tech.key.toLowerCase()}
                                label={tech.label}
                                className='mx-auto h-8 w-8 object-contain'
                                onError={() => setFailedLogos(true)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span className='text-sm'>{tech.label}</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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
