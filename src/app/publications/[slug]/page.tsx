"use server";

import Newsletter from "@/features/newsletter/components/Newsletter";
import BreadCrumb from "@/components/BreadCrumb";
import { getPost, getRelatedPosts } from "@/features/posts/server/db/posts";
import NotFound from "@/app/not-found";
import Cards from "@/components/cards/Cards";
import RelatedArticles from "@/components/articles/RelatedArticles";
import Article from "@/components/articles/Article";
import CardsRow from "@/components/cards/CardsRow";
import PublishCTA from "@/components/PublishCTA";
import PostDownload from "@/features/posts/components/PostDownload";

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, success } = await getPost(slug);
  const { data: relatedPosts } = await getRelatedPosts(
    post?.categories?.nodes[0]?.slug,
    post?.id
  );

  if (!success) {
    return <NotFound />;
  }

  const fileUrl = post?.acfFields?.pdf?.node?.filePath;
  const isPublic = post?.contenuPublic?.isPublic ?? "Publique";

  return (
    <div className="relative container flex justify-between py-10">
      {/* Contenu principal */}
      <div className="w-3/5">
        {/* Fil d'Ariane */}
        <BreadCrumb isBgDark={false} />

        <Article element={post} />

        {/* Articles de la même catégorie (version mobile) */}
        <RelatedArticles className="xl:hidden mt-12">
          <Cards elements={relatedPosts} className="sm:grid-cols-1" />
        </RelatedArticles>

        {/* Newsletter */}
        <Newsletter />
      </div>
      {/* Floating Sidebar - Articles liés */}
      <aside className="max-w-sm hidden 2xl:block">
        <div className="flex flex-col gap-4 sticky top-30">
          <RelatedArticles className="bg-white rounded-lg p-4 mb-4 h-fit">
            <CardsRow elements={relatedPosts} />
          </RelatedArticles>

          <PostDownload fileUrl={fileUrl} isPublic={isPublic} />
        </div>
      </aside>

      <PublishCTA />
    </div>
  );
}
