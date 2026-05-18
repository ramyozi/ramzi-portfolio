import { language } from '@/sanity/schemaTypes/language';
import { project } from '@/sanity/schemaTypes/project';
import { skill } from '@/sanity/schemaTypes/skill';
import { experience } from '@/sanity/schemaTypes/experience';
import { aboutMe, currentStatus, hero, motivation } from '@/sanity/schemaTypes/info';
import { translation } from '@/sanity/schemaTypes/translation';

export const schema = {
  types: [
    hero,
    aboutMe,
    currentStatus,
    motivation,
    project,
    skill,
    language,
    experience,
    translation,
  ],
};
