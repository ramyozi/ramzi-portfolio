import { defineType, defineField, defineArrayMember } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
            }),
            defineField({
              name: 'context',
              type: 'text',
              title: 'Context',
              description:
                'Why the project exists — its goal or the problem it addresses.',
            }),
            defineField({
              name: 'noteLabel',
              type: 'string',
              title: 'Case study section — title',
              description:
                'e.g. "Engineering decisions", "Challenges", "What I learned".',
            }),
            defineField({
              name: 'noteBody',
              type: 'text',
              title: 'Case study section — content',
            }),
          ],
        }),
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Titre' }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
            }),
            defineField({
              name: 'context',
              type: 'text',
              title: 'Contexte',
              description:
                "Pourquoi le projet existe — son objectif ou le problème qu'il résout.",
            }),
            defineField({
              name: 'noteLabel',
              type: 'string',
              title: 'Section case study — titre',
              description:
                'ex. « Décisions techniques », « Défis », « Ce que j\'ai appris ».',
            }),
            defineField({
              name: 'noteBody',
              type: 'text',
              title: 'Section case study — contenu',
            }),
          ],
        }),
        defineField({
          name: 'ar',
          title: 'العربية',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'العنوان' }),
            defineField({ name: 'description', type: 'text', title: 'الوصف' }),
            defineField({ name: 'context', type: 'text', title: 'السياق' }),
            defineField({
              name: 'noteLabel',
              type: 'string',
              title: 'عنوان قسم دراسة الحالة',
            }),
            defineField({
              name: 'noteBody',
              type: 'text',
              title: 'محتوى قسم دراسة الحالة',
            }),
          ],
        }),
        defineField({
          name: 'kr',
          title: '한국어',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: '제목' }),
            defineField({ name: 'description', type: 'text', title: '설명' }),
            defineField({ name: 'context', type: 'text', title: '배경' }),
            defineField({
              name: 'noteLabel',
              type: 'string',
              title: '케이스 스터디 섹션 — 제목',
            }),
            defineField({
              name: 'noteBody',
              type: 'text',
              title: '케이스 스터디 섹션 — 내용',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planned', value: 'planned' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'on_hold' },
        ],
        layout: 'radio',
      },
      initialValue: 'planned',
    }),

    defineField({
      name: 'dateRange',
      title: 'Date Range (display label)',
      type: 'string',
      description: 'Human-readable period shown on the project, e.g. "2024".',
    }),

    defineField({
      name: 'date',
      title: 'Project Date (sorting)',
      type: 'date',
      description:
        'Used to order projects from newest to oldest. If left empty, the document creation date is used as a fallback.',
    }),

    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
    }),

    defineField({
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        defineField({ name: 'repo', type: 'url', title: 'Repository' }),
        defineField({
          name: 'repoFrontend',
          type: 'url',
          title: 'Frontend Repo',
        }),
        defineField({
          name: 'repoBackend',
          type: 'url',
          title: 'Backend Repo',
        }),
        defineField({ name: 'repoMobile', type: 'url', title: 'Mobile Repo' }),
        defineField({ name: 'live', type: 'url', title: 'Live URL' }),
      ],
    }),
  ],
});
