"use server";

import Cards from "@/components/cards/Cards";
import { getPosts } from "../server/db/posts";
import NoPostsFound from "./NoPostsFound";

export default async function Posts({
  numberOfPosts = 3,
  filters = null,
  search = "",
  offset = 0,
  excludeCategories = [],
}: {
  numberOfPosts?: number;
  filters?: {
    category: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
    tag: {
      taxonomy: string;
      field: string;
      terms: string[];
    };
  } | null;
  search?: string;
  offset?: number;
  excludeCategories?: string[];
}) {
  // Fetch posts from the server with timeout
  const { data: posts, success } = await getPosts(
    numberOfPosts,
    filters,
    search,
    offset,
    excludeCategories
  );

  if (!success || !posts || posts.length === 0) {
    return <NoPostsFound hasFilters={!!filters} />;
  }

  return <Cards elements={posts} className="lg:grid-cols-3" />;
}
