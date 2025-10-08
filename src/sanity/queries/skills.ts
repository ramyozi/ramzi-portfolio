export const allSkillsQuery = `
  *[_type == "skill"]{
    _id,
    category,
    name,
    icon,
    level
  }
`;
