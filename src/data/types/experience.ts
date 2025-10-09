import { Skill } from '@/data/types/skill';

export interface Experience {
  _id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  logo?: { url: string };
  technologies?: Skill[];
  tasks?: string[];
  solution?: string;
  locale?: string;
}
