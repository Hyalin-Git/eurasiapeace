"use server";
import Newsletter from "@/features/newsletter/components/Newsletter";
import BreadCrumb from "@/components/BreadCrumb";
import { getPost, getRelatedPosts } from "@/features/posts/server/db/posts";
import NotFound from "@/app/not-found";
import Cards from "@/components/cards/Cards";
import RelatedArticles from "@/components/articles/RelatedArticles";
import Article from "@/components/articles/Article";
import CardsRow from "@/components/cards/CardsRow";

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

  return (
    <div className="flex justify-between container py-10">
      {/* Contenu principal */}
      <div className="xl:max-w-3xl w-full">
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
      <RelatedArticles className="max-w-sm hidden xl:block bg-white rounded-lg shadow-lg p-4 mb-4 h-fit">
        <CardsRow elements={relatedPosts} />
      </RelatedArticles>
    </div>
  );
}
