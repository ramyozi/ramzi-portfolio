'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';
import { skills } from '@/data/skills';
import { useState } from 'react';

interface SkillWithLogo {
  name: string;
  icon: string;
  level: string;
}

const getDeviconLogo = (icon: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;

export function Skill() {
  const t = useTranslations();
  const [failedLogos, setFailedLogos] = useState(false);

  const handleImgError = () => setFailedLogos(true);

  const renderSkillGrid = (skillList: readonly SkillWithLogo[]) => (
  <div className="grid grid-cols-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    {skillList.map((skill, idx) => (
      <TooltipProvider key={idx}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="flex flex-col items-center justify-center border border-gray-200 p-4 shadow-sm transition-transform hover:scale-105">
              <img
                src={getDeviconLogo(skill.icon)}
                alt={skill.name}
                className="mb-2 h-12 w-12 object-contain"
                onError={handleImgError}
              />
              <span className="text-center text-sm font-medium">{skill.name}</span>
              <span className="text-xs text-gray-500 mt-1">
                {t(`common.skills.proficiency.${skill.level}`)}
              </span>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col items-center">
              <span className="font-medium">{skill.name}</span>
              <span className="text-xs text-gray-500">
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
    <section id="skills" className="space-y-6 relative">
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl">{t('common.header.skills')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="languages" className="space-y-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="languages">{t('common.skills.tab.languages')}</TabsTrigger>
              <TabsTrigger value="frameworks">{t('common.skills.tab.frameworks')}</TabsTrigger>
              <TabsTrigger value="tools">{t('common.skills.tab.tools')}</TabsTrigger>
            </TabsList>

            <TabsContent value="languages">
              <ScrollArea className="h-64">{renderSkillGrid(skills.languages)}</ScrollArea>
            </TabsContent>

            <TabsContent value="frameworks">
              <ScrollArea className="h-64">{renderSkillGrid(skills.frameworks)}</ScrollArea>
            </TabsContent>

            <TabsContent value="tools">
              <ScrollArea className="h-64">{renderSkillGrid(skills.tools)}</ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {failedLogos && (
        <p className="absolute bottom-1 left-1 text-xs text-gray-400">
          {t('common.skills.logoFallbackNote')}
        </p>
      )}
    </section>
  );
}
