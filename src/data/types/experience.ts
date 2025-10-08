export interface Experience {
  _id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  logo?: string;
  technologies?: { key: string; label: string }[];
  tasks?: string[];
  solution?: string;
  locale?: string;
}
