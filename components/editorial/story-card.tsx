import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categoryNames, formatDate, href, type Locale } from '@/lib/site';
import { textFor } from '@/lib/copy';
import type { Post } from '@/lib/content';

export function storyHref(post: Post) {
  return href(
    post.entry.locale,
    post.entry.kind === 'market-analysis' ? 'analysis' : 'articles',
    post.slug,
  );
}
export function StoryCard({
  post,
  locale,
  lead = false,
}: {
  post: Post;
  locale: Locale;
  lead?: boolean;
}) {
  const t = textFor(locale);
  const p = post.entry;
  return (
    <article className={lead ? 'lead-story' : 'story-card'}>
      <Link
        href={storyHref(post)}
        className="story-image"
        tabIndex={-1}
        aria-hidden="true"
      >
        {p.coverImage ? (
          <Image
            src={p.coverImage}
            alt={p.coverAlt || ''}
            fill
            sizes={
              lead
                ? '(max-width: 760px) 100vw, 60vw'
                : '(max-width: 760px) 100vw, 50vw'
            }
            className="cover-image"
            priority={lead}
          />
        ) : (
          <div className="image-fallback" />
        )}
      </Link>
      <div className="story-content">
        {lead ? (
          <p className="feature-label">
            {t.featured}
            <span aria-hidden="true"> / </span>
            {categoryNames[locale][p.category]}
          </p>
        ) : null}
        <span className={lead ? 'story-kicker' : 'eyebrow'}>
          {lead ? t.featured : categoryNames[locale][p.category]}
        </span>
        <h2>
          <Link href={storyHref(post)}>{p.title}</Link>
        </h2>
        <p className="story-excerpt">{p.excerpt}</p>
        <div className="story-meta">
          <span>
            {p.demo
              ? t.demo
              : p.publishDate
                ? formatDate(p.publishDate, locale)
                : ''}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {p.estimatedReadingMinutes} {t.min}
          </span>
        </div>
        {lead ? (
          <Link
            className="journal-text-link feature-read"
            href={storyHref(post)}
          >
            {p.kind === 'market-analysis'
              ? locale === 'tr'
                ? 'Analizi oku'
                : 'Read the analysis'
              : locale === 'tr'
                ? 'Yazıyı oku'
                : 'Read the article'}
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
