import simpleIcons from 'simple-icons';

export function getLogo(name: string): string {
  const icon = simpleIcons.get(name);
  return icon ? `data:image/svg+xml;base64,${btoa(icon.svg)}` : '';
}
