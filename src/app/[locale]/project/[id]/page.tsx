import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { ProjectDetail } from '@/components/service/project-detail';
import { client } from '@/sanity/lib/client';
import type { Project } from '@/data/types/project';
import { allProjectsQuery, projectByIdQuery } from '@/sanity/queries/projects';
import { routing } from '@/i18n/routing';
import { getBaseUrl, seoContent, siteName } from '@/lib/seo';

type Params = Promise<{ locale: string; id: string }>;

const getProject = cache((id: string) =>
  client.fetch<Project | null>(projectByIdQuery, { id })
);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const project = await getProject(id);

  if (!project) return {};

  const loc = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const localized = project.translations?.[loc] || project.translations?.en;
  const title = localized?.title?.trim() || siteName;
  const description =
    localized?.description?.trim().slice(0, 200) || seoContent[loc].description;
  const url = `${getBaseUrl()}/${loc}/project/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: project.image?.url
        ? [{ url: project.image.url }]
        : undefined,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const [project, siblings] = await Promise.all([
    getProject(id),
    client
      .fetch<Project[]>(allProjectsQuery)
      .catch(() => [] as Project[]),
  ]);

  if (!project) return notFound();

  return (
    <main className='min-h-screen px-5 py-10 sm:px-6 md:py-14'>
      <ProjectDetail project={project} siblings={siblings} />
    </main>
  );
}
