"use server";

import Card from "@/components/cards/Card";
import { getPosts } from "../server/db/posts";
import NoHeroPostFound from "./NoHeroPostFound";

export default async function HeroPost() {
  const cardStyles = {
    banner: "h-[380px]",
    title: "text-3xl",
    lineClamp: "line-clamp-4",
    footer: "justify-end",
  };

  const { data: post, success } = await getPosts(1);

  if (!success || !post || post.length === 0) {
    return <NoHeroPostFound />;
  }

  return <Card elt={post[0]} cardStyles={cardStyles} />;
}
