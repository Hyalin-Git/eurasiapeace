import Filters from "@/components/filters/Filters";
import FiltersItems from "@/components/filters/FiltersItems";
import { getTags } from "@/features/posts/server/db/posts";
import { getTypesExperts } from "@/features/expertsVoices/server/db/expertsVoices";
import Banner from "@/components/banners/Banner";
import { Suspense } from "react";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";
import Paginations from "@/components/pagination/Paginations";
import { Metadata } from "next";
import ExpertsVoices from "@/features/expertsVoices/components/ExpertsVoices";
import { ExpertsVoicesSkeletons } from "@/features/expertsVoices/components/ExpertsVoicesSkeletons";

export const metadata: Metadata = {
  title: "La voix des experts - EurasiaPeace",
  description:
    "Découvrez nos podcasts, webinaires et interviews d'experts géopolitiques. Écoutez la voix des professionnels et participez à nos formations en ligne sur les enjeux eurasiatiques.",
  keywords: [
    "podcasts",
    "webinaires",
    "la voix des pros",
    "experts géopolitiques",
    "contenus audio",
    "analyses d'experts",
    "Eurasie",
    "géopolitique",
    "conférences",
    "interviews d'experts",
    "éducation géopolitique",
  ],
  openGraph: {
    title: "La voix des experts - EurasiaPeace",
    description:
      "Accédez à nos contenus audio exclusifs : podcasts géopolitiques, webinaires éducatifs et interviews d'experts sur l'Eurasie.",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "Podcasts, Webinaires & La Voix des Pros - EurasiaPeace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La voix des experts - EurasiaPeace",
    description:
      "Découvrez nos podcasts géopolitiques, webinaires et interviews d'experts sur l'Eurasie.",
    images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function ExpertsVoicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    tag: string;
    search: string;
    page: string;
  }>;
}) {
  const { category, tag, search, page } = await searchParams;
  const categoryTerms = category ? category.split(",") : [];
  const tagTerms = tag ? tag.split(",") : [];

  const filters = {
    category: {
      taxonomy: "TYPEEXPERT",
      field: "SLUG",
      terms: categoryTerms || [],
    },
    tag: {
      taxonomy: "TAG",
      field: "SLUG",
      terms: tagTerms || [],
    },
  };

  const [typesExpertsRes, tagsRes] = await Promise.all([
    getTypesExperts(),
    getTags(),
  ]);

  const { data: typesExperts } = typesExpertsRes;
  const { data: tags } = tagsRes;

  const bannerProps = {
    title: "La voix des experts",
    content:
      "Découvrez notre riche catalogue de publications. Explorez nos notes d'analyses approfondies, nos dossiers thématiques détaillés ainsi que nos fiches et rapports de renseignement pour une compréhension stratégique des enjeux contemporains.",
    src: "/banner/la-voix-des-experts-banner.png",
  };

  const offset = page ? (parseInt(page) - 1) * 9 : 0;

  return (
    <div>
      <Banner BannerProps={bannerProps} />
      <div className="container py-10">
        <Filters filters={filters}>
          <div className="flex flex-col gap-4">
            <span className="text-md text-text-primary font-bold">
              Catégories
            </span>
            <FiltersItems items={typesExperts} query="category" />
            <span className="text-md text-text-primary font-bold">
              Étiquettes
            </span>
            <FiltersItems items={tags} query="tag" />
          </div>
        </Filters>

        <Suspense
          key={page + search + category + tag}
          fallback={<ExpertsVoicesSkeletons count={9} />}
        >
          <ExpertsVoices
            count={9}
            filters={filters}
            search={search}
            offset={offset}
          />
        </Suspense>

        <Suspense
          key={search + category + tag + "laVoixDesExperts"}
          fallback={<PaginationSkeleton />}
        >
          <Paginations
            type="laVoixDesExperts"
            limit={9}
            filters={filters}
            search={search}
            offset={offset}
          />
        </Suspense>
      </div>
    </div>
  );
}
