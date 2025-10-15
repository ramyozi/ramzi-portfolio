'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';
import { client } from '@/sanity/lib/client';
import { allSkillsQuery } from '@/sanity/queries/skills';
import TechIcon from '@/components/service/common/tech-icon';
import { motion } from 'framer-motion';
import type { Skill } from '@/data/types/skill';

export function Skill() {
  const t = useTranslations();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [failedLogos, setFailedLogos] = useState(false);

  useEffect(() => {
    client.fetch(allSkillsQuery).then(setSkills).catch(console.error);
  }, []);

  const handleImgError = () => setFailedLogos(true);

  const LEVEL_ORDER: Record<Skill['level'], number> = {
    '+++': 3,
    '++': 2,
    '+': 1,
  };

  const sortByLevel = (a: Skill, b: Skill) =>
    LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level];

  const languages = skills
    .filter((s) => s.category === 'languages')
    .sort(sortByLevel);
  const frameworks = skills
    .filter((s) => s.category === 'frameworks')
    .sort(sortByLevel);
  const tools = skills.filter((s) => s.category === 'tools').sort(sortByLevel);

  const renderSkillGrid = (list: Skill[]) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className='grid grid-cols-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {list.map((skill) => (
          <TooltipProvider key={skill._id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className='flex flex-col items-center justify-center border border-border/60 bg-card/60 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
                  <TechIcon
                    techKey={skill.icon.toLowerCase()}
                    label={skill.name}
                    className='mx-auto h-8 w-8 object-contain'
                    onError={handleImgError}
                  />
                  <span className='mt-2 text-sm font-medium'>{skill.name}</span>
                  <span className='text-xs text-muted-foreground'>
                    {t(`common.skills.proficiency.${skill.level}`)}
                  </span>
                </Card>
              </TooltipTrigger>
              <TooltipContent className='text-center'>
                <div className='flex flex-col items-center space-y-1'>
                  <span className='text-sm font-medium'>{skill.name}</span>
                  <span className='text-xs text-muted-foreground'>
                    {t(`common.skills.proficiency.${skill.level}`)}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id='skills' className='scroll-mt-24 space-y-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='mx-auto max-w-3xl text-center'
      >
        <p className='text-sm font-medium uppercase tracking-wide text-primary/80'>
          {t('common.skills.intro')}
        </p>
        <p className='mt-3 text-base leading-relaxed text-muted-foreground'>
          {t('common.skills.content')}
        </p>
      </motion.div>

      <Card className='border border-border/60 bg-card/70 shadow-lg backdrop-blur-md'>
        <CardContent className='pt-6'>
          <Tabs defaultValue='languages' className='space-y-6'>
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
          {failedLogos && (
            <p className='text-center text-xs text-gray-400'>
              {t('common.skills.logoFallbackNote')}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
