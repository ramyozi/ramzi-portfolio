export interface Skill {
  _id: string;
  name: string;
  icon: string;
  level: '+' | '++' | '+++';
  category: 'languages' | 'frameworks' | 'tools';
}
