import { MetadataRoute } from "next";
import { fetchGraphQL } from "@/utils/authFetch";

interface PostNode {
  slug: string;
  date: string;
  categories: {
    nodes: {
      slug: string;
    }[];
  };
}

interface FormationNode {
  slug: string;
  date: string;
}

interface GeopoliticalWatchNode {
  slug: string;
  date: string;
}

interface ExpertVoiceNode {
  slug: string;
  date: string;
}

async function getAllPostSlugs(): Promise<PostNode[]> {
  try {
    const query = `
      query {
        posts(first: 1000) {
          nodes {
            slug
            date
            categories {
              nodes {
                slug
              }
            }
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success || !res?.data?.posts?.nodes) {
      return [];
    }

    return res.data.posts.nodes;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des posts pour le sitemap:",
      error
    );
    return [];
  }
}

async function getAllFormationSlugs(): Promise<FormationNode[]> {
  try {
    const query = `
      query {
        formations(first: 1000) {
          nodes {
            slug
            date
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success || !res?.data?.formations?.nodes) {
      return [];
    }

    return res.data.formations.nodes;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des formations pour le sitemap:",
      error
    );
    return [];
  }
}

async function getAllGeopoliticalWatchSlugs(): Promise<
  GeopoliticalWatchNode[]
> {
  try {
    const query = `
      query {
        veillesGeopolitique(first: 1000) {
          nodes {
            slug
            date
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success || !res?.data?.veillesGeopolitique?.nodes) {
      return [];
    }

    return res.data.veillesGeopolitique.nodes;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des veilles géopolitiques pour le sitemap:",
      error
    );
    return [];
  }
}

async function getAllExpertVoiceSlugs(): Promise<ExpertVoiceNode[]> {
  try {
    const query = `
      query {
        laVoixDesExperts(first: 1000) {
          nodes {
            slug
            date
          }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success || !res?.data?.laVoixDesExperts?.nodes) {
      return [];
    }

    return res.data.laVoixDesExperts.nodes;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des voix d'experts pour le sitemap:",
      error
    );
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://eurasiapeace.org";

  // Routes statiques
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/la-voix-des-experts`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/veilles-geopolitiques`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formations`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conseils`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/qui-sommes-nous`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/qui-sommes-nous/conseil-scientifique`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/qui-sommes-nous/comite-edition`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/abonnements`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faire-un-don`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Récupérer les articles dynamiques (posts) - uniquement pour /publications/
  const posts = await getAllPostSlugs();
  const postRoutes = posts.map((post: PostNode) => ({
    url: `${baseUrl}/publications/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Récupérer les veilles géopolitiques dynamiques
  const geopoliticalWatches = await getAllGeopoliticalWatchSlugs();
  const geopoliticalWatchRoutes = geopoliticalWatches.map(
    (watch: GeopoliticalWatchNode) => ({
      url: `${baseUrl}/veilles-geopolitiques/${watch.slug}`,
      lastModified: new Date(watch.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Récupérer les voix d'experts dynamiques
  const expertVoices = await getAllExpertVoiceSlugs();
  const expertVoiceRoutes = expertVoices.map((voice: ExpertVoiceNode) => ({
    url: `${baseUrl}/la-voix-des-experts/${voice.slug}`,
    lastModified: new Date(voice.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Récupérer les formations dynamiques
  const formations = await getAllFormationSlugs();
  const formationRoutes = formations.map((formation: FormationNode) => ({
    url: `${baseUrl}/formations/${formation.slug}`,
    lastModified: new Date(formation.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...postRoutes,
    ...expertVoiceRoutes,
    ...geopoliticalWatchRoutes,
    ...formationRoutes,
  ];
}
