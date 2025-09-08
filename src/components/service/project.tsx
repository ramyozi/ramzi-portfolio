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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from '@/i18n/navigation';

const getDeviconLogo = (icon: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;

export function Project() {
  const t = useTranslations();
  const router = useRouter();
  const [failedLogos, setFailedLogos] = useState(false);

  const handleCheckOutProject = (id: string) => {
    router.push('/project/' + id);
  };
  const handleImgError = () => setFailedLogos(true);

  const items = t.raw('common.projects.items') as Record<string, any>;
  const labels = t.raw('common.projects.labels') as Record<string, string>;

  return (
    <section id='projects' className='scroll-mt-24 space-y-6'>
      <Card className='border-2 border-primary'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {t('common.header.projects')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className={'m-8 object-cover'}>
            <CarouselContent>
              {Object.entries(items).map(([key, project]) => (
                <CarouselItem key={key}>
                  <div className={'grid grid-cols-2'}>
                    <div>
                      <h1>{String(project.title)}</h1>
                      <h2>{String(project.description)}</h2>
                      {Object.entries(project.technologies ?? {}).map(
                        ([techKey, tech]) => (
                          <Badge
                            className={'justify-items-center'}
                            variant={'outline'}
                            key={techKey}
                          >
                            <img
                              src={getDeviconLogo(techKey.toLowerCase())}
                              alt={String(tech)}
                              onError={handleImgError}
                              className='mx-auto h-10 w-10 object-contain transition-transform hover:scale-110'
                            />
                            <span>{String(tech)}</span>
                          </Badge>
                        )
                      )}
                      <div
                        className='flex justify-end'
                        onClick={() => handleCheckOutProject(project.id)}
                      >
                        {t('common.projects.checkOut')}
                      </div>
                    </div>
                    <Image
                      src={'/images/logo.jpg'}
                      alt={t('common.projects.item1.title')}
                      width={500}
                      height={500}
                      className='rounded-2xl object-cover shadow'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
