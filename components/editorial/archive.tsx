import Link from 'next/link';
import { Search } from 'lucide-react';
import { getPosts } from '@/lib/content';
import { textFor } from '@/lib/copy';
import { categories, categoryNames, href, type Locale } from '@/lib/site';
import { StoryCard } from './story-card';
export type Query = Record<string, string | string[] | undefined>;
function value(query: Query, key: string) {
  return typeof query[key] === 'string' ? query[key].slice(0, 200) : '';
}
export async function Archive({
  locale,
  query,
  mode,
}: {
  locale: Locale;
  query: Query;
  mode: 'articles' | 'analysis' | 'search';
}) {
  const t = textFor(locale);
  const posts = await getPosts(locale);
  const pool =
    mode === 'analysis'
      ? posts.filter((p) => p.entry.kind === 'market-analysis')
      : mode === 'articles'
        ? posts.filter((p) => p.entry.kind !== 'market-analysis')
        : posts;
  const search = value(query, 'q');
  const category = value(query, 'category');
  const year = value(query, 'year');
  const tag = value(query, 'tag');
  const fold = (s: string) =>
    s.normalize('NFKC').toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-GB');
  const needle = fold(search.trim());
  const selected = pool.filter(
    ({ entry: p }) =>
      (!category || p.category === category) &&
      (!year || p.publishDate?.startsWith(year)) &&
      (!tag || p.tags.includes(tag)) &&
      (!needle ||
        fold([p.title, p.excerpt, ...p.tags].join(' ')).includes(needle)),
  );
  const years = [
    ...new Set(
      pool.map((p) => p.entry.publishDate?.slice(0, 4)).filter(Boolean),
    ),
  ] as string[];
  const tags = [...new Set(pool.flatMap((p) => [...p.entry.tags]))];
  const page = Math.max(1, Number.parseInt(value(query, 'page'), 10) || 1);
  const pageSize = 9;
  const pages = Math.ceil(selected.length / pageSize);
  const current = Math.min(page, Math.max(1, pages));
  const visible = selected.slice((current - 1) * pageSize, current * pageSize);
  const base = href(locale, mode);
  const url = (changes: Record<string, string>) => {
    const params = new URLSearchParams();
    for (const key of ['q', 'category', 'year', 'tag']) {
      const v = changes[key] ?? value(query, key);
      if (v) params.set(key, v);
    }
    if (changes.page) params.set('page', changes.page);
    return `${base}${params.size ? `?${params}` : ''}`;
  };
  const title =
    mode === 'search'
      ? t.search
      : mode === 'analysis'
        ? t.nav.analysis
        : t.nav.articles;
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Finance · Markets · Perspectives</p>
        <h1>{title}</h1>
        <p>
          {mode === 'analysis'
            ? locale === 'tr'
              ? 'Piyasaları, verileri ve değişen ekonomik bağlamı birlikte okumak.'
              : 'Reading markets and data in their changing economic context.'
            : locale === 'tr'
              ? 'Ekonomi, finans ve düşünce üzerine yazılar.'
              : 'Writing on economics, finance and ideas.'}
        </p>
      </div>
      {value(query, 'translation') === 'missing' ? (
        <p className="notice" role="status">
          {t.missing}
        </p>
      ) : null}
      <form
        className="archive-filter"
        method="get"
        action={base}
        aria-label={t.filters}
      >
        <label>
          {t.searchLabel}
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder={t.searchPlaceholder}
            maxLength={200}
          />
        </label>
        <label>
          {t.year}
          <select name="year" defaultValue={year}>
            <option value="">{t.all}</option>
            {years.map((y) => (
              <option value={y} key={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.tag}
          <select name="tag" defaultValue={tag}>
            <option value="">{t.all}</option>
            {tags.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        {category ? (
          <input type="hidden" name="category" value={category} />
        ) : null}
        <button className="button button-gold" type="submit">
          <Search size={16} />
          {t.searchAction}
        </button>
        {search || category || year || tag ? (
          <Link className="text-link" href={base}>
            {t.clear}
          </Link>
        ) : null}
      </form>
      <nav className="category-links" aria-label={t.category}>
        <Link
          href={url({ category: '' })}
          aria-current={!category ? 'page' : undefined}
        >
          {t.all}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={url({ category: cat })}
            aria-current={category === cat ? 'page' : undefined}
          >
            {categoryNames[locale][cat]}
          </Link>
        ))}
      </nav>
      <p className="archive-count" role="status">
        {selected.length} {t.results}
        {search ? ` · “${search}”` : ''}
      </p>
      {visible.length ? (
        <div className="archive-grid">
          {visible.map((post) => (
            <StoryCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <h2>{pool.length ? t.noResults : t.noArticles}</h2>
          <p>
            {pool.length
              ? locale === 'tr'
                ? 'Aramanızı kısaltabilir veya filtreleri temizleyebilirsiniz.'
                : 'Try a shorter search or clear the filters.'
              : t.noArticlesText}
          </p>
          {pool.length ? (
            <Link className="text-link" href={base}>
              {t.clear}
            </Link>
          ) : null}
        </section>
      )}
      {pages > 1 ? (
        <nav
          className="pagination"
          aria-label={locale === 'tr' ? 'Arşiv sayfaları' : 'Archive pages'}
        >
          {Array.from({ length: pages }, (_, i) => (
            <Link
              href={url({ page: String(i + 1) })}
              key={url({ page: String(i + 1) })}
              aria-label={`${locale === 'tr' ? 'Sayfa' : 'Page'} ${i + 1}`}
              aria-current={i + 1 === current ? 'page' : undefined}
            >
              {i + 1}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
