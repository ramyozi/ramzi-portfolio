import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ProjectDetail } from '@/components/service/project-detail';

type Params = {
  params: { locale: string; id: string };
};

export default async function ProjectPage({ params }: Params) {
  const { locale, id } = params;

  const t = await getTranslations({ locale, namespace: 'common.projects' });
  const items = t.raw('items') as Record<string, any>;
  const project = Object.values(items).find(
    (p: any) => p?.id?.toString() === id
  ) as any;

  if (!project) return notFound();

  return (
    <main className='flex min-h-screen flex-col space-y-16 px-6 py-16 md:px-12 lg:px-24'>
      <ProjectDetail project={project} />
    </main>
  );
}
