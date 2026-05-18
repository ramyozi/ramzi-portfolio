import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/service/project-detail';
import { client } from '@/sanity/lib/client';
import type { Project } from '@/data/types/project';
import { projectByIdQuery } from '@/sanity/queries/projects';

type Params = Promise<{ locale: string; id: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, id } = await params;

  const project = await client.fetch<Project | null>(projectByIdQuery, {
    id,
    locale,
  });

  if (!project) return notFound();

  return (
    <main className='min-h-screen px-5 py-10 sm:px-6 md:py-14'>
      <ProjectDetail project={project} />
    </main>
  );
}
