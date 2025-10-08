export interface Skill {
  _id: string;
  category: 'language' | 'framework' | 'tool';
  name: string;
  icon: string;
  level: '+' | '++' | '+++';
}
