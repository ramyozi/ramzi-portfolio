'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';

const getDeviconLogo = (icon: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;

export function Experience() {
  const t = useTranslations();
  const [failedLogos, setFailedLogos] = useState(false);
  const handleImgError = () => setFailedLogos(true);

  const items = t.raw('common.experience.items') as Record<string, any>;
  const labels = t.raw('common.experience.labels') as Record<string, string>;

  if (!items || Object.keys(items).length === 0) {
    return (
      <section id='experience' className="scroll-mt-24">
        <Card className='border-2 border-primary'>
          <CardHeader>
            <CardTitle className='text-2xl'>
              {t('common.header.experience')}
            </CardTitle>
          </CardHeader>
          <CardContent>{t('common.experience.empty')}</CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id='experience' className='space-y-6 scroll-mt-24'>
      <Card className='border-2 border-primary'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('common.header.experience')}
          </CardTitle>
        </CardHeader>
        <CardContent className='grid gap-6 md:grid-cols-3'>
          {Object.entries(items).map(([key, exp]) => (
            <Card key={key} className='border bg-muted'>
              <CardHeader className='flex flex-col items-center space-y-2 text-center'>
                {exp.logo && (
                  <Image
                    src={String(exp.logo)}
                    alt={String(exp.company)}
                    width={120}
                    height={120}
                    className='rounded-md'
                  />
                )}
                <h3 className='font-bold'>{String(exp.company)}</h3>
                <p className='text-sm text-muted-foreground'>
                  {String(exp.role)}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {String(exp.location)} | {String(exp.period)}
                </p>
              </CardHeader>

              <CardContent className='space-y-4'>
                {exp.solution && (
                  <div>
                    <strong>{labels.solution}:</strong>
                    <p className='mt-1 text-sm'>{String(exp.solution)}</p>
                  </div>
                )}

                <div>
                  <strong>{labels.tasks}:</strong>
                  <ul className='list-inside list-disc text-sm'>
                    {Object.entries(exp.tasks ?? {}).map(([taskKey, task]) => (
                      <li key={taskKey}>{String(task)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong>{labels.technologies}:</strong>
                  <div className='mt-2 grid grid-cols-4 gap-3'>
                    {Object.entries(exp.technologies ?? {}).map(
                      ([techKey, tech]) => (
                        <TooltipProvider key={techKey}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img
                                src={getDeviconLogo(techKey.toLowerCase())}
                                alt={String(tech)}
                                onError={handleImgError}
                                className='mx-auto h-10 w-10 object-contain transition-transform hover:scale-110'
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span className='text-sm'>{String(tech)}</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    )}
                  </div>
                </div>
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
