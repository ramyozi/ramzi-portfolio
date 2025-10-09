/**
 * get-logo.ts
 * Récupère le logo SVG d'une technologie via Devicon ou SimpleIcons
 */

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SIMPLEICONS_BASE =
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons';
const ICONIFY_BASE = 'https://api.iconify.design';

/**
 * Teste si une URL d'icône existe
 */
const iconExists = async (url: string): Promise<boolean> => {
  try {
    const res = await fetch(url, { method: 'HEAD' });

    return res.ok;
  } catch {
    return false;
  }
};

/**
 * Récupère le logo SVG d'une technologie
 */
export const getTechLogo = async (tech: string): Promise<string> => {
  const key = tech.toLowerCase().replace(/\s+/g, '-');

  // Devicon
  const deviconUrl = `${DEVICON_BASE}/${key}/${key}-original.svg`;

  if (await iconExists(deviconUrl)) return deviconUrl;

  // SimpleIcons
  const simpleIconsUrl = `${SIMPLEICONS_BASE}/${key}.svg`;

  if (await iconExists(simpleIconsUrl)) return simpleIconsUrl;

  // Iconify
  const iconifyUrl = `${ICONIFY_BASE}/logos:${key}.svg`;

  if (await iconExists(iconifyUrl)) return iconifyUrl;

  // 4Clearbit
  const clearbitUrl = `https://logo.clearbit.com/${key}.com`;

  if (await iconExists(clearbitUrl)) return clearbitUrl;

  // Default placeholder
  return '/images/default-fallback-image.png';
};
