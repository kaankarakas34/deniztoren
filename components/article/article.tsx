import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getSettings, type Post } from '@/lib/content';
import { textFor } from '@/lib/copy';
import {
  categoryNames,
  formatDate,
  href,
  siteUrl,
  type Locale,
} from '@/lib/site';
import { StoryCard } from '@/components/editorial/story-card';
import { SectionHeading } from '@/components/editorial/section-heading';
import { DataChart } from '@/components/markets/data-chart';
import { prepareDocument } from './markdoc-body';
import { ReadingTools } from './reading-tools';
import { serializeJsonLd } from '@/lib/structured-data';
export async function Article({
  locale,
  post,
}: {
  locale: Locale;
  post: Post;
}) {
  const t = textFor(locale);
  const p = post.entry;
  const [document, posts, settings] = await Promise.all([
    p.body(),
    getPosts(locale),
    getSettings(),
  ]);
  const { headings, content } = prepareDocument(document.node);
  const related = posts
    .filter(
      (item) =>
        item.slug !== post.slug &&
        (item.entry.category === p.category ||
          item.entry.tags.some((tag) => p.tags.includes(tag))),
    )
    .slice(0, 3);
  const canonical = new URL(
    href(
      locale,
      p.kind === 'market-analysis' ? 'analysis' : 'articles',
      post.slug,
    ),
    siteUrl,
  ).href;
  const schema = !p.demo
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        datePublished: p.publishDate,
        dateModified: p.updatedDate || p.publishDate,
        inLanguage: locale,
        author: {
          '@type': 'Person',
          name: 'Deniz Tören',
          url: new URL(href(locale, 'about'), siteUrl).href,
        },
        mainEntityOfPage: canonical,
        ...(p.coverImage ? { image: new URL(p.coverImage, siteUrl).href } : {}),
      }
    : undefined;
  const email =
    settings?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)
      ? settings.email
      : undefined;
  return (
    <article className="container">
      {schema ? (
        <script type="application/ld+json">{serializeJsonLd(schema)}</script>
      ) : null}
      <header className="article-header">
        <nav
          className="breadcrumb"
          aria-label={locale === 'tr' ? 'İçerik yolu' : 'Breadcrumb'}
        >
          <Link href={href(locale)}>{t.nav.home}</Link>
          <span>/</span>
          <Link
            href={href(
              locale,
              p.kind === 'market-analysis' ? 'analysis' : 'articles',
            )}
          >
            {p.kind === 'market-analysis' ? t.nav.analysis : t.nav.articles}
          </Link>
        </nav>
        <span className="eyebrow">{categoryNames[locale][p.category]}</span>
        <h1>{p.title}</h1>
        {p.subtitle ? (
          <p className="article-dek">{p.subtitle}</p>
        ) : (
          <p className="article-dek">{p.excerpt}</p>
        )}
        <div className="article-byline">
          <span>{t.by}</span>
          <span>·</span>
          <span>
            {p.demo
              ? t.demo
              : p.publishDate
                ? formatDate(p.publishDate, locale)
                : ''}
          </span>
          <span>·</span>
          <span>
            {p.estimatedReadingMinutes} {t.min}
          </span>
          {p.updatedDate && !p.demo ? (
            <span>
              {t.updated}: {formatDate(p.updatedDate, locale)}
            </span>
          ) : null}
        </div>
      </header>
      {p.demo ? (
        <p className="notice">
          {locale === 'tr'
            ? 'Bu sayfa tasarım ve editör akışını doğrulayan örnek içeriktir; gerçek bir yayın veya piyasa değerlendirmesi değildir.'
            : 'This sample validates the design and editor flow. It is not a published market analysis.'}
        </p>
      ) : null}
      {p.coverImage ? (
        <>
          <div className="article-cover">
            <Image
              src={p.coverImage}
              alt={p.coverAlt || ''}
              fill
              sizes="(max-width: 760px) 100vw, 1200px"
              priority
              className="cover-image"
            />
          </div>
          {p.coverCredit ? (
            <p className="image-credit">{p.coverCredit}</p>
          ) : null}
        </>
      ) : null}
      <div className="article-layout">
        <aside className="toc">
          {headings.length ? (
            <details open>
              <summary>{t.contents}</summary>
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.title}</a>
                  </li>
                ))}
              </ol>
            </details>
          ) : null}
        </aside>
        <div className="article-body">
          {p.executiveSummary ? (
            <aside className="executive-summary">
              <h2>{t.summary}</h2>
              <p>{p.executiveSummary}</p>
            </aside>
          ) : null}
          <div className="prose">{content}</div>
          <DataChart chart={p.chart} locale={locale} />
          {p.dataSourceNotes ? (
            <section className="sources">
              <h2>{t.sources}</h2>
              <p>{p.dataSourceNotes}</p>
            </section>
          ) : null}
          <ReadingTools locale={locale} title={p.title} />
          {email ? (
            <Link
              className="text-link"
              href={`mailto:${email}?subject=${encodeURIComponent(p.title)}`}
            >
              {t.question} →
            </Link>
          ) : null}
          {p.riskDisclaimer ? <p className="risk-note">{t.risk}</p> : null}
        </div>
      </div>
      {related.length ? (
        <section className="related-section">
          <SectionHeading title={t.related} />
          <div className="latest-grid">
            {related.map((item) => (
              <StoryCard key={item.slug} post={item} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
