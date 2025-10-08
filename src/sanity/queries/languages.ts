export const allLanguagesQuery = `
*[_type == "language"]{ _id, key, level } | order(key asc)
`;
