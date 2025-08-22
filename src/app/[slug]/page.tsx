"use server";
import NotFound from "@/app/not-found";
import { getPageContent } from "@/server/db/page";

// The function `WordpressPage` fetches and displays content from a WordPress page based on the
// provided slug parameter if the page does not exist, it returns a NotFound component.
export default async function WordpressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, success } = await getPageContent(`/${slug}`);

  if (!success) {
    return <NotFound />;
  }

  return (
    <div className="container py-10">
      <div className="prose-lg prose-slate max-w-4xl mx-auto">
        <h1 className="font-bold mb-8 text-gray-900 text-center">
          {data?.title}
        </h1>
        <div
          className="prose-lg prose-slate prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </div>
  );
}
