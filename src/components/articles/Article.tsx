"use client";

import MetaData from "@/components/articles/MetaData";
import AuthorBox from "@/components/articles/AuthorBox";
import Tags from "@/components/tags/Tags";
import Separator from "@/ui/Separator";
import SocialShare from "@/components/articles/Share";
import Paywall from "@/components/articles/Paywall";
import { showPaywall } from "@/utils/showPaywall";
import moment from "moment";
import Banner from "./Banner";
import { Article as ArticleInterface } from "@/types";
import { useSubscription } from "@/context/SubscriptionContext";
import DOMPurify from "isomorphic-dompurify";

export default function Article({ element }: { element: ArticleInterface }) {
  const { hasEurasiaPeaceSubscription } = useSubscription();
  const title = element?.title;
  const content = element?.content;
  const featuredImage = element?.featuredImage?.node?.sourceUrl;
  const featuredImageAlt = element?.featuredImage?.node?.altText;
  const tags = element?.tags?.nodes;
  const author = element?.author?.node;

  const isPublic = element?.contenuPublic?.isPublic ?? "Public";
  const isPaywall = showPaywall(isPublic, hasEurasiaPeaceSubscription);

  function ensureExternalLinksAttributes(html: string): string {
    return html.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
      const hrefMatch = attrs.match(/href\s*=\s*(['"])(.*?)\1/i);
      const href = hrefMatch ? hrefMatch[2] : "";
      const isExternal = /^https?:\/\//i.test(href);
      if (!isExternal) return match;

      let updated = attrs;
      if (!/target\s*=\s*/i.test(updated)) updated += ' target="_blank"';
      if (!/rel\s*=\s*/i.test(updated)) updated += ' rel="noopener noreferrer"';
      return `<a${updated}>`;
    });
  }

  function splitHtmlAtBoundary(
    html: string,
    approx: number
  ): { first: string; last: string } {
    const head = html.slice(0, approx);
    const cutIndex = head.lastIndexOf(">");
    if (cutIndex === -1) {
      return { first: head, last: html.slice(approx) };
    }
    return {
      first: html.slice(0, cutIndex + 1),
      last: html.slice(cutIndex + 1),
    };
  }

  const sanitizedContent = DOMPurify.sanitize(content || "");
  const contentWithSafeLinks = ensureExternalLinksAttributes(sanitizedContent);
  const { first: firstPart, last: lastPart } = splitHtmlAtBoundary(
    contentWithSafeLinks,
    2000
  );

  const category =
    element?.categories?.nodes[0] ||
    element?.typeDeVeilles?.nodes[0] ||
    element?.typesExperts?.nodes[0];
  const readingTime = element?.readingTime;
  const publishedAt = moment(element?.date).format("DD/MM/YYYY");

  return (
    <article className="overflow-hidden mt-8">
      {/* Tags */}
      <Tags tags={tags} className="mb-6" />

      {/* Titre */}
      <h1 className="font-bold text-gray-900 mb-6 font-playfair leading-tight">
        {title}
      </h1>

      {/* Métadonnées */}
      <MetaData
        author={author}
        category={category}
        readingTime={readingTime}
        publishedAt={publishedAt}
        contentType={element?.contentType?.node?.name || ""}
      />

      {/* Box de partage */}
      <SocialShare />

      <Separator />

      {/* Image à la une */}
      <Banner
        featuredImage={featuredImage}
        featuredImageAlt={featuredImageAlt}
      />

      {featuredImage && <Separator />}

      {/* Contenu principal */}
      <div
        className={`relative prose prose-[1.5rem] prose-h2:text-3xl prose-h3:text-xl prose-h4:text-base prose-h5:text-sm prose-h6:text-xs max-w-none prose-a:text-blue-600 prose-a:visited:text-purple-600 prose-a:hover:text-blue-700`}
      >
        <div dangerouslySetInnerHTML={{ __html: firstPart }} />
        <div
          dangerouslySetInnerHTML={{ __html: lastPart }}
          className={`${isPaywall ? "hidden" : ""}`}
        ></div>
        {isPaywall && (
          <div className="absolute bg-gradient-to-b from-transparent to-gray-50 w-full h-1/2 bottom-0"></div>
        )}
      </div>

      {/* Paywall pour contenu premium */}
      {isPaywall && <Paywall />}

      {/* Author Box */}
      <AuthorBox author={author} />
    </article>
  );
}
