'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import TechIcon from '@/components/service/common/tech-icon';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import type { Experience } from '@/data/types/experience';
import { motion } from 'framer-motion';

export function Experience({
  experiences,
}: {
  experiences: Experience[];
}) {
  const t = useTranslations();
  const locale = useLocale() as 'fr' | 'en' | 'ar' | 'kr';
  const [failedLogos, setFailedLogos] = useState(false);

  if (!experiences.length)
    return (
      <Card className='border-border/60'>
        <CardHeader />
        <CardContent>{t('common.experience.empty')}</CardContent>
      </Card>
    );

  return (
    <div className='space-y-10'>
      <p className='mx-auto max-w-2xl text-center text-base leading-relaxed text-muted-foreground'>
        {t('common.experience.intro')}
      </p>

      <div className='grid gap-8 sm:grid-cols-2'>
        {experiences.map((exp, idx) => {
          const tr = exp.translations?.[locale] || exp.translations?.fr;

          if (!tr) return null;

          return (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(idx * 0.08, 0.32), duration: 0.5 }}
            >
              <Card className='group h-full rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl'>
                <CardHeader className='flex flex-col items-center space-y-2 text-center'>
                  {exp.logo?.url && (
                    <Image
                      src={exp.logo.url}
                      alt={tr.company}
                      width={100}
                      height={100}
                      className='rounded-md object-contain'
                    />
                  )}
                  <h3 className='text-lg font-semibold'>{tr.company}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {tr.role} - {tr.period}
                  </p>
                  <p className='text-xs text-muted-foreground'>{tr.location}</p>
                </CardHeader>

                <CardContent className='space-y-3'>
                  {tr.solution && (
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {tr.solution}
                    </p>
                  )}

                  {Array.isArray(tr.tasks) && tr.tasks.length > 0 && (
                    <ul className='list-inside list-disc text-sm text-muted-foreground'>
                      {tr.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies?.length > 0 && (
                    <div className='mt-3 grid grid-cols-5 gap-3'>
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
                                className='mx-auto h-8 w-8 transition-transform hover:scale-110'
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
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {failedLogos && (
        <p className='text-center text-xs text-muted-foreground'>
          {t('common.skills.logoFallbackNote')}
        </p>
      )}
    </div>
  );
}
