"use server";

import { JSDOM } from "jsdom";

export async function parseRankMathHead(head: string) {
  const dom = new JSDOM(head || "");
  const doc = dom.window.document;

  const title =
    doc?.querySelector('meta[property="og:title"]')?.getAttribute("content") ||
    doc?.querySelector("title")?.textContent ||
    doc?.querySelector('meta[name="title"]')?.getAttribute("content");

  const description =
    doc
      ?.querySelector('meta[property="og:description"]')
      ?.getAttribute("content") ||
    doc?.querySelector('meta[name="description"]')?.getAttribute("content");

  const keywords = doc
    ?.querySelector('meta[name="keywords"]')
    ?.getAttribute("content");

  const ogImage = doc
    ?.querySelector('meta[property="og:image"]')
    ?.getAttribute("content");
  const ogImageAlt = doc
    ?.querySelector('meta[property="og:image:alt"]')
    ?.getAttribute("content");
  const ogImageWidth = doc
    ?.querySelector('meta[property="og:image:width"]')
    ?.getAttribute("content");
  const ogImageHeight = doc
    ?.querySelector('meta[property="og:image:height"]')
    ?.getAttribute("content");

  const ogType = doc
    ?.querySelector('meta[property="og:type"]')
    ?.getAttribute("content");
  const ogUrl = doc
    ?.querySelector('meta[property="og:url"]')
    ?.getAttribute("content");
  const ogSiteName = doc
    ?.querySelector('meta[property="og:site_name"]')
    ?.getAttribute("content");

  const twitterCard = doc
    ?.querySelector('meta[name="twitter:card"]')
    ?.getAttribute("content");
  const twitterSite = doc
    ?.querySelector('meta[name="twitter:site"]')
    ?.getAttribute("content");
  const twitterCreator = doc
    ?.querySelector('meta[name="twitter:creator"]')
    ?.getAttribute("content");
  const twitterImage = doc
    ?.querySelector('meta[name="twitter:image"]')
    ?.getAttribute("content");
  const twitterImageAlt = doc
    ?.querySelector('meta[name="twitter:image:alt"]')
    ?.getAttribute("content");

  const canonical = doc
    ?.querySelector('link[rel="canonical"]')
    ?.getAttribute("href");

  const robots = doc
    ?.querySelector('meta[name="robots"]')
    ?.getAttribute("content");

  // Articles spécifiques
  const articleAuthor = doc
    ?.querySelector('meta[property="article:author"]')
    ?.getAttribute("content");
  const articlePublishedTime = doc
    ?.querySelector('meta[property="article:published_time"]')
    ?.getAttribute("content");
  const articleModifiedTime = doc
    ?.querySelector('meta[property="article:modified_time"]')
    ?.getAttribute("content");
  const articleSection = doc
    ?.querySelector('meta[property="article:section"]')
    ?.getAttribute("content");
  const articleTag = doc
    ?.querySelector('meta[property="article:tag"]')
    ?.getAttribute("content");

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
