import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/seo';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();

  const home: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 1,
  }));

  let projects: { _id: string; _updatedAt?: string }[] = [];

  try {
    projects = await client.fetch(`*[_type == "project"]{ _id, _updatedAt }`);
  } catch {
    projects = [];
  }

  const projectPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${base}/${locale}/project/${p._id}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...home, ...projectPages];
}
