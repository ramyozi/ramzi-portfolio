export const allTranslationsQuery = `
*[_type == "translation" && defined(key)]{
  key,
  en,
  fr,
  ar,
  kr
}
`;
