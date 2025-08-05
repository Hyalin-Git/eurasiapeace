"use server";

import Article from "@/components/articles/Article";
import BreadCrumb from "@/components/BreadCrumb";
import NotFound from "@/app/not-found";
import ReaderOpinion from "@/components/articles/ReaderOpinion";
import RelatedArticles from "@/components/articles/RelatedArticles";
import Newsletter from "@/features/newsletter/components/Newsletter";
import CardsRow from "@/components/cards/CardsRow";
import Cards from "@/components/cards/Cards";
import { getCulture } from "@/features/cultures/server/db/cultures";

export default async function CulturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: culture, success } = await getCulture(slug);
  //   const { data: relatedCultures } = await getRelatedCultures();

  if (!success) {
    return <NotFound />;
  }

  return (
    <div className="py-10">
      <div className="flex justify-between container">
        {/* Contenu principal */}
        <div>
          {/* Fil d'Ariane */}
          <BreadCrumb isBgDark={false} />

          <Article element={culture} />

          <ReaderOpinion />

          {/* Articles de la même catégorie (version mobile) */}
          <RelatedArticles className="xl:hidden mt-12">
            <div></div>
            {/* <Cards elements={relatedCultures} className="sm:grid-cols-1" /> */}
          </RelatedArticles>

          {/* Newsletter */}
          <Newsletter />
        </div>

        {/* Floating Sidebar - Articles liés */}
        <RelatedArticles className="max-w-sm hidden xl:block bg-white rounded-lg shadow-lg p-4 mb-4 h-fit">
          <div></div>
          {/* <CardsRow elements={relatedCultures} /> */}
        </RelatedArticles>
      </div>
    </div>
  );
}
