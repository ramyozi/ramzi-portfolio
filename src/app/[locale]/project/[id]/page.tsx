export default async function ProjectPage({
                                             params,
                                           }: {
  params: Promise<{ id: string }>
}) {
  const {id } = await params

  return (
      <h1>
        Project : {id}
      </h1>
  )

}