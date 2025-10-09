import { Technology } from '@/data/types/project';

export interface Experience {
  _id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  logo?: { url: string };
  technologies?: Technology[];
  tasks?: string[];
  solution?: string;
  locale?: string;
}
