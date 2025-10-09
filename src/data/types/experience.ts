import type { Skill } from './skill';

export interface ExperienceTranslation {
  company: string;
  role: string;
  location: string;
  period: string;
  solution?: string;
  tasks?: string[];
}

export interface Experience {
  _id: string;
  logo?: { url: string };
  technologies: Skill[];
  translations: {
    fr?: ExperienceTranslation;
    en?: ExperienceTranslation;
    ar?: ExperienceTranslation;
    kr?: ExperienceTranslation;
  };
}
