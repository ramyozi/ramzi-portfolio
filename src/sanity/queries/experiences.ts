export const allExperiencesQuery = `
  *[_type == "experience" && locale == $locale] | order(period desc){
    _id,
    company,
    role,
    location,
    period,
    "logo": logo.asset->{url},
    technologies[]->{
        _id, name, icon, level, category
    },
    tasks,
    solution,
    locale
  }
`;
