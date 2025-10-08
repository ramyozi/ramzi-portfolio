export const allSkillsQuery = `
*[_type == "skill"]{
  _id,
  name,
  icon,
  level,
  category
} | order(category asc, name asc)
`;
