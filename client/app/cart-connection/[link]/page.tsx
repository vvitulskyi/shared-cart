export default async function ConnectionPage({
  params,
}: {
  params: { link: string };
}) {
  const { link } = await params;
  return <div>{link}</div>;
}
