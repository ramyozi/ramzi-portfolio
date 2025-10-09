export const allExperiencesQuery = `
  *[_type == "experience"]{
    _id,
    logo { "url": asset->url },
    technologies[]->{
      _id,
      name,
      icon,
      level,
      category
    },
    translations
  } | order(translations.en.period desc)
`;
