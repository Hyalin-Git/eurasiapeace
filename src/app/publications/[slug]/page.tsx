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
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: post, success } = await getPost(slug);

  if (!success || !post) {
    return {
      title: "Publication non trouvée",
      description: "Cette publication n'existe pas ou n'est plus disponible.",
    };
  }

  const title = `${post.title}`;
  const description =
    post.excerpt ||
    `Découvrez notre analyse approfondie sur ${post.title}. Publication géopolitique spécialisée sur les enjeux eurasiatiques.`;
  const imageUrl = post.featuredImage?.node?.sourceUrl || "/featured-image.jpg";
  const publishedDate = post.date;

  // Extraire les catégories et tags pour les mots-clés
  const categories =
    post.categories?.nodes?.map(
      (cat: { name: string; slug: string }) => cat.name
    ) || [];
  const tags =
    post.tags?.nodes?.map((tag: { name: string; slug: string }) => tag.name) ||
    [];
  const keywords = [
    ...categories,
    ...tags,
    "géopolitique",
    "Eurasie",
    "analyse stratégique",
    "EurasiaPeace",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "EurasiaPeace" }],
    publisher: "EurasiaPeace",
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedDate,
      authors: ["EurasiaPeace"],
      section: categories[0] || "Publications",
      tags: tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} - EurasiaPeace`,
        },
      ],
      siteName: "EurasiaPeace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@EurasiaPeace",
      site: "@EurasiaPeace",
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
    alternates: {
      canonical: `/publications/${slug}`,
    },
  };
}

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
      <aside className="max-w-sm hidden xl:block">
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
