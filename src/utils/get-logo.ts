import * as simpleIcons from 'simple-icons';

export function getLogo(name: string): string {
  const iconKey = Object.keys(simpleIcons).find(
    (key) => key.toLowerCase() === name.toLowerCase()
  ) as keyof typeof simpleIcons | undefined;

  if (!iconKey) return '';

  const icon = simpleIcons[iconKey] as { svg: string };

  return `data:image/svg+xml;base64,${btoa(icon.svg)}`;
}
