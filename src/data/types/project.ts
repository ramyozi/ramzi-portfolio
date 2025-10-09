import { Skill } from '@/data/types/skill';

export interface ProjectLinks {
  repo?: string;
  repoFrontend?: string;
  repoBackend?: string;
  repoMobile?: string;
  live?: string;
}

export type Project = {
  _id: string;
  title: string;
  description: string;
  status?: string;
  dateRange?: string;
  image?: { url: string };
  gallery?: { url: string }[];
  technologies: Skill[];
  links?: ProjectLinks[];
  locale: string;
};
