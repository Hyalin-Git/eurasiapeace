import Article from "@/components/articles/Article";
import PreviewNotFound from "@/features/previews/components/PreviewNotFound";
import { getExpertVoicePreview } from "@/features/previews/server/db/previews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aperçu de l'article",
  description: "Aperçu de l'article en cours de rédaction",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function Preview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { success, data } = await getExpertVoicePreview(slug);

  if (!success) return <PreviewNotFound />;

  return (
    <div className="container">
      <div className="w-3/5">
        <Article element={data} isPreview={true} />
      </div>
    </div>
  );
}
