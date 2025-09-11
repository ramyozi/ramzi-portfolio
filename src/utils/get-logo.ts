/**
 * get-logo.ts
 * Récupère le logo SVG d'une technologie via Devicon ou SimpleIcons
 */

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SIMPLEICONS_BASE =
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons';

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

  // SimpleIcons fallback
  const simpleIconsUrl = `${SIMPLEICONS_BASE}/${key}.svg`;

  return simpleIconsUrl;
};
