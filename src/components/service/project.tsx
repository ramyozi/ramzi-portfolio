'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import TechIcon from '@/components/service/common/tech-icon';

export function Project() {
  const t = useTranslations();
  const router = useRouter();
  const [failedLogos, setFailedLogos] = useState(false);

  const handleCheckOutProject = (id: string) => router.push('/project/' + id);
  const handleImgError = () => setFailedLogos(true);

  const items = t.raw('common.projects.items') as Record<string, any>;

  return (
    <section id='projects' className='scroll-mt-24 space-y-6'>
      <Card className='border-2 border-primary'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('common.header.projects')} ( WIP )
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className='mx-2 md:mx-8'>
            <CarouselContent>
              {Object.entries(items).map(([key, project]) => (
                <CarouselItem key={key}>
                  <div className='grid grid-cols-1 items-center gap-6 md:grid-cols-2'>
                    <div className='flex flex-col space-y-4'>
                      <h1 className='text-xl font-semibold md:text-2xl'>
                        {project.title}
                      </h1>
                      <h2 className='text-sm text-muted-foreground md:text-base'>
                        {project.description}
                      </h2>
                      <div className='flex flex-wrap gap-2'>
                        {Object.entries(project.technologies ?? {}).map(
                          ([techKey, tech]) => (
                            <Badge
                              key={techKey}
                              variant='outline'
                              className='flex flex-col items-center px-3 py-2 text-sm md:text-base'
                            >
                              <TechIcon
                                techKey={techKey.toLowerCase()}
                                label={String(tech)}
                                className='mx-auto h-8 w-8 object-contain transition-transform duration-200 hover:scale-110'
                                onError={handleImgError}
                              />
                              <span>{String(tech)}</span>
                            </Badge>
                          )
                        )}
                      </div>
                      <Button
                        onClick={() => handleCheckOutProject(project.id)}
                        variant='outline'
                        className='justify-content-end rounded-md px-4 py-2 transition hover:bg-primary/20'
                      >
                        {t('common.projects.checkOut')}
                      </Button>
                    </div>
                    <div className='flex justify-center'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={500}
                        className='h-auto max-w-full rounded-2xl object-cover shadow'
                      />
                    </div>
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
