'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import TechIcon from '@/components/service/common/tech-icon';
import { client } from '@/sanity/lib/client';
import { allSkillsQuery } from '@/sanity/queries/skills';
import type { Skill } from '@/data/types/skill';

export function Skill() {
  const t = useTranslations();
  const [failedLogos, setFailedLogos] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  const handleImgError = () => setFailedLogos(true);

  useEffect(() => {
    client.fetch(allSkillsQuery).then(setSkills);
  }, []);

  const languages = skills.filter((s) => s.category === 'language');
  const frameworks = skills.filter((s) => s.category === 'framework');
  const tools = skills.filter((s) => s.category === 'tool');

  const renderSkillGrid = (list: Skill[]) => (
    <div className='grid grid-cols-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
      {list.map((skill) => (
        <TooltipProvider key={skill._id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className='flex flex-col items-center justify-center border border-gray-200 p-4 shadow-sm transition-transform hover:scale-105'>
                <TechIcon
                  techKey={skill.icon.toLowerCase()}
                  label={skill.name}
                  className='mx-auto h-8 w-8 object-contain transition-transform duration-200 hover:scale-110'
                  onError={handleImgError}
                />
                <span className='text-center text-sm font-medium'>
                  {skill.name}
                </span>
                <span className='mt-1 text-xs text-gray-500'>
                  {t(`common.skills.proficiency.${skill.level}`)}
                </span>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <div className='flex flex-col items-center'>
                <span className='font-medium'>{skill.name}</span>
                <span className='text-xs text-gray-500'>
                  {t(`common.skills.proficiency.${skill.level}`)}
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );

  return (
    <section id='skills' className='relative scroll-mt-24 space-y-6'>
      <Card className='border-2'>
        <CardHeader>
          <CardTitle>{t('common.header.skills')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='languages' className='space-y-4'>
            <TabsList className='grid grid-cols-3'>
              <TabsTrigger value='languages'>
                {t('common.skills.tab.languages')}
              </TabsTrigger>
              <TabsTrigger value='frameworks'>
                {t('common.skills.tab.frameworks')}
              </TabsTrigger>
              <TabsTrigger value='tools'>
                {t('common.skills.tab.tools')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value='languages'>
              <ScrollArea className='h-72'>
                {renderSkillGrid(languages)}
              </ScrollArea>
            </TabsContent>

            <TabsContent value='frameworks'>
              <ScrollArea className='h-72'>
                {renderSkillGrid(frameworks)}
              </ScrollArea>
            </TabsContent>

            <TabsContent value='tools'>
              <ScrollArea className='h-72'>{renderSkillGrid(tools)}</ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {failedLogos && (
        <p className='absolute bottom-1 left-1 text-xs text-gray-400'>
          {t('common.skills.logoFallbackNote')}
        </p>
      )}
    </section>
  );
}
