"use server";

import Card from "@/components/cards/Card";
import { getHeroPost } from "../server/db/posts";
import NoHeroPostFound from "./NoHeroPostFound";

export default async function HeroPost() {
  const cardStyles = {
    banner: "h-[380px]",
    title: "text-3xl",
    lineClamp: "line-clamp-4",
    footer: "justify-end",
  };

  const { data: post, success } = await getHeroPost();

  if (!success || !post) {
    return <NoHeroPostFound />;
  }

  return <Card elt={post} cardStyles={cardStyles} />;
}
