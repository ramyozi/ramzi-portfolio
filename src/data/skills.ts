export const skills = {
  languages: [
    { name: 'JavaScript', icon: 'javascript', level: '+++' },
    { name: 'TypeScript', icon: 'typescript', level: '+++' },
    { name: 'HTML5', icon: 'html5', level: '+++' },
    { name: 'CSS3', icon: 'css3', level: '+++' },
    { name: 'SCSS', icon: 'sass', level: '++' },
    { name: 'SQL', icon: 'mysql', level: '++' },
    { name: 'Python', icon: 'python', level: '++' },
    { name: 'Java', icon: 'java', level: '+++' },
    { name: 'C++', icon: 'cplusplus', level: '++' }
  ] as const,

  frameworks: [
    { name: 'React.js', icon: 'react', level: '+++' },
    { name: 'Next.js', icon: 'nextjs', level: '+++' },
    { name: 'React Native', icon: 'react', level: '++' },
    { name: 'Angular', icon: 'angularjs', level: '+++' },
    { name: 'TailwindCSS', icon: 'tailwindcss', level: '+++' },
    { name: 'Redux', icon: 'redux', level: '++' },
    { name: 'MobX', icon: 'mobx', level: '+' },
    { name: 'RxJS', icon: 'rxjs', level: '++' },
    { name: 'Framer Motion', icon: 'framermotion', level: '++' },
    { name: 'Bootstrap', icon: 'bootstrap', level: '+++' },
    { name: 'SwiftUI', icon: 'swift', level: '++' },
  ] as const,

  tools: [
    { name: 'Node.js', icon: 'nodejs', level: '+++' },
    { name: 'Express.js', icon: 'express', level: '+++' },
    { name: 'NestJS', icon: 'nestjs', level: '++' },
    { name: 'Spring Boot', icon: 'spring', level: '++' },
    { name: 'TypeORM', icon: 'typeorm', level: '++' },
    { name: 'DBeaver', icon: 'dbeaver', level: '+++' },
    { name: 'REST API', icon: 'rest', level: '+++' },
    { name: 'PostgreSQL', icon: 'postgresql', level: '+++' },
    { name: 'MongoDB', icon: 'mongodb', level: '++' },
    { name: 'OrientDB', icon: 'orientdb', level: '+' },
    { name: 'MySQL', icon: 'mysql', level: '++' },
    { name: 'Jest', icon: 'jest', level: '++' },
    { name: 'Postman', icon: 'postman', level: '+++' },
    { name: 'Cypress', icon: 'cypressio', level: '++' },
    { name: 'ESLint', icon: 'eslint', level: '+++' },
    { name: 'Docker', icon: 'docker', level: '+++' },
    { name: 'GitLab CI/CD', icon: 'gitlab', level: '++' },
    { name: 'AWS', icon: 'amazonwebservices', level: '++' },
    { name: 'Git', icon: 'git', level: '+++' },
    { name: 'GitHub', icon: 'github', level: '+++' },
    { name: 'GitKraken', icon: 'gitkraken', level: '++' },
    { name: 'Figma', icon: 'figma', level: '+++' },
    { name: 'Jira', icon: 'jira', level: '++' },
    { name: 'ClickUp', icon: 'clickup', level: '++' },
    { name: 'UML', icon: 'unifiedmodelinglanguage', level: '++' },
    { name: 'Merise', icon: 'merise', level: '++' },
    { name: 'Scrum', icon: 'scrum', level: '+++' },
  ] as const
};

export type SkillType =
  | typeof skills.languages[number]['name']
  | typeof skills.frameworks[number]['name']
  | typeof skills.tools[number]['name'];

export type Skill = (typeof skills.languages[number] |
                     typeof skills.frameworks[number] |
                     typeof skills.tools[number]);
