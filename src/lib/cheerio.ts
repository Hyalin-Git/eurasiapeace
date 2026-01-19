"use server";

import * as cheerio from "cheerio";

export async function parseRankMathHead(head: string) {
  const $ = cheerio.load(head || "");

  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text() ||
    $('meta[name="title"]').attr("content");

  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content");

  const keywords = $('meta[name="keywords"]').attr("content");

  const ogImage = $('meta[property="og:image"]').attr("content");
  const ogImageAlt = $('meta[property="og:image:alt"]').attr("content");
  const ogImageWidth = $('meta[property="og:image:width"]').attr("content");
  const ogImageHeight = $('meta[property="og:image:height"]').attr("content");

  const ogType = $('meta[property="og:type"]').attr("content");
  const ogUrl = $('meta[property="og:url"]').attr("content");
  const ogSiteName = $('meta[property="og:site_name"]').attr("content");

  const twitterCard = $('meta[name="twitter:card"]').attr("content");
  const twitterSite = $('meta[name="twitter:site"]').attr("content");
  const twitterCreator = $('meta[name="twitter:creator"]').attr("content");
  const twitterImage = $('meta[name="twitter:image"]').attr("content");
  const twitterImageAlt = $('meta[name="twitter:image:alt"]').attr("content");

  const canonical = $('link[rel="canonical"]').attr("href");

  const robots = $('meta[name="robots"]').attr("content");

  // Articles spécifiques
  const articleAuthor = $('meta[property="article:author"]').attr("content");
  const articlePublishedTime = $(
    'meta[property="article:published_time"]',
  ).attr("content");
  const articleModifiedTime = $('meta[property="article:modified_time"]').attr(
    "content",
  );
  const articleSection = $('meta[property="article:section"]').attr("content");
  const articleTag = $('meta[property="article:tag"]').attr("content");

  return {
    title,
    description,
    keywords,
    robots,
    ogImage,
    ogImageAlt,
    ogImageWidth,
    ogImageHeight,
    ogType,
    ogUrl,
    ogSiteName,
    twitterCard,
    twitterSite,
    twitterCreator,
    twitterImage,
    twitterImageAlt,
    canonical,
    articleAuthor,
    articlePublishedTime,
    articleModifiedTime,
    articleSection,
    articleTag,
  };
}
