"use server";
import {
  getGeopoliticalWatch,
  getRelatedGeopoliticalWatches,
} from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import NotFound from "@/app/not-found";
import Article from "@/components/articles/Article";
import ReaderOpinion from "@/components/articles/ReaderOpinion";
import RelatedArticles from "@/components/articles/RelatedArticles";
import BreadCrumb from "@/components/BreadCrumb";
import Cards from "@/components/cards/Cards";
import CardsRow from "@/components/cards/CardsRow";
import Newsletter from "@/features/newsletter/components/Newsletter";

export default async function GeopoliticalWatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Get geopolitical watch by slug
  const { data: geopoliticalWatch, success } = await getGeopoliticalWatch(slug);

  // Get related geopolitical watches
  const { data: relatedGeopoliticalWatches } =
    await getRelatedGeopoliticalWatches(
      geopoliticalWatch?.typeDeVeilles?.nodes[0]?.slug,
      geopoliticalWatch?.id
    );

  if (!success) {
    return <NotFound />;
  }

  return (
    <div className="flex justify-between container py-10">
      {/* Contenu principal */}
      <div className="xl:max-w-3xl">
        <BreadCrumb isBgDark={false} />

        <Article element={geopoliticalWatch} />

        <ReaderOpinion />

        {/* Articles de la même catégorie (version mobile) */}
        <RelatedArticles className="xl:hidden mt-12">
          <Cards
            elements={relatedGeopoliticalWatches}
            className="sm:grid-cols-1"
          />
        </RelatedArticles>

        {/* Newsletter */}
        <Newsletter />
      </div>

      {/* Floating Sidebar - Articles liés */}
      <RelatedArticles className="max-w-sm hidden xl:block bg-white rounded-lg shadow-lg p-4 mb-4 h-fit">
        <CardsRow elements={relatedGeopoliticalWatches} />
      </RelatedArticles>
    </div>
  );
}
