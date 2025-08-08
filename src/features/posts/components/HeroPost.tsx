"use server";
import Card from "@/components/cards/Card";
import { getPosts } from "../server/db/posts";

export default async function HeroPost() {
  const cardStyles = {
    banner: "h-[380px]",
    title: "text-3xl",
    lineClamp: "line-clamp-4",
    footer: "justify-end",
  };

  const { data: post, success } = await getPosts(1, null, "", 0);

  if (!success) {
    return <div>Aucun post trouvé.</div>;
  }

  return <Card elt={post[0]} cardStyles={cardStyles} displayAuthor={true} />;
}
