"use server";

import { getPosts } from "@/features/posts/server/db/posts";
import { getGeopoliticalWatches } from "@/features/geopoliticalWatches/server/db/geopoliticalWatches";
import Hero from "@/features/home/components/Hero";
import Section from "@/components/Section";
import Cards from "@/components/cards/Cards";
import LinkButton from "@/ui/LinkButton";
import CarouselWatches from "@/features/home/components/CarouselWatches";
import { getFormations } from "@/features/formations/server/db/formations";

export default async function Home() {
  const [postsRes, geopoliticalWatchesRes, formationsRes] = await Promise.all([
    getPosts(4),
    getGeopoliticalWatches(4),
    getFormations(2),
  ]);

  const { data: posts } = postsRes;
  const { data: geopoliticalWatches } = geopoliticalWatchesRes;
  const { data: formations } = formationsRes;

  const firstPost = posts[0];
  const latestPosts = posts.slice(1);

  return (
    <div>
      <CarouselWatches />

      <div className="container">
        <Hero post={firstPost} />

        {/* Latest Posts */}
        <Section
          title="Dernières publications"
          description="Restez informés des évenements, analyses et développements récents"
        >
          <Cards elements={latestPosts} className={"lg:grid-cols-3"} />
          <LinkButton
            href="/publications"
            label="Voir toutes les publications"
            className="mt-10"
          />
        </Section>

        {/* Geopolitical Watches */}
        <Section
          title="L'actualité géopolitique décryptée"
          description="Éclairage expert sur les mouvements géopolitiques majeurs"
          className="[&_p]:max-w-none [&>div>div]:justify-center text-center"
        >
          <Cards elements={geopoliticalWatches} className={"lg:grid-cols-4"} />
          <LinkButton
            href="/veilles-geopolitiques"
            label="Explorer nos veilles géopolitiques"
            className="mt-10"
          />
        </Section>

        {/* Formations */}
        <Section
          title="Nos formations"
          description="Formations expertes pour approfondir vos connaissances géopolitiques et stratégiques"
        >
          <Cards
            elements={formations}
            className={"lg:grid-cols-2"}
            variant="formation"
          />
          <LinkButton
            href="/formations"
            label="Découvrir nos formations"
            className="mt-10"
          />
        </Section>
      </div>
    </div>
  );
}
