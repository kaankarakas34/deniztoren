import { notFound } from 'next/navigation';
import { Archive, type Query } from '@/components/editorial/archive';
import {
  AboutPage,
  ContactPage,
  LegalPage,
  MediaPage,
} from '@/components/editorial/secondary-pages';
import {
  AcademyPage,
  ServicesPage,
} from '@/components/editorial/offerings-pages';
import { Article } from '@/components/article/article';
import { getPost, getTranslation, postHref } from '@/lib/content';
import { textFor } from '@/lib/copy';
import {
  href,
  isLocale,
  opposite,
  segments as localizedSegments,
  type Locale,
  type Section,
} from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
type Props = {
  params: Promise<{ locale: string; segments: string[] }>;
  searchParams: Promise<
    Query & { service?: string; course?: string; intent?: string }
  >;
};
function sectionFor(locale: Locale, segment: string) {
  return (Object.keys(localizedSegments[locale]) as Section[]).find(
    (key) => localizedSegments[locale][key] === segment,
  );
}
export async function generateMetadata({ params, searchParams }: Props) {
  const { locale, segments } = await params;
  if (!isLocale(locale)) return {};
  const section = sectionFor(locale, segments[0]);
  if (!section) return {};
  if (
    segments.length === 2 &&
    (section === 'articles' || section === 'analysis')
  ) {
    const post = await getPost(locale, segments[1]);
    if (!post) return {};
    if ((post.entry.kind === 'market-analysis') !== (section === 'analysis'))
      return {};
    const other = opposite(locale);
    const translation = await getTranslation(post, other);
    return pageMetadata(
      locale,
      post.entry.seoTitle || post.entry.title,
      postHref(post),
      post.entry.seoDescription || post.entry.excerpt,
      {
        demo: post.entry.demo,
        image: post.entry.socialImage || post.entry.coverImage,
        alternates: {
          [locale]: postHref(post),
          ...(translation ? { [other]: postHref(translation) } : {}),
        },
      },
    );
  }
  const t = textFor(locale);
  const title =
    section === 'search'
      ? t.search
      : section === 'privacy'
        ? t.privacy
        : section === 'cookies'
          ? t.cookies
          : section === 'disclaimer'
            ? t.disclaimer
            : t.nav[section as keyof typeof t.nav];
  const query = await searchParams;
  return pageMetadata(locale, title, href(locale, section), undefined, {
    alternates: { tr: href('tr', section), en: href('en', section) },
    noindex:
      section === 'search' ||
      Boolean(
        query.q || query.category || query.tag || query.year || query.page,
      ),
  });
}
export default async function Page({ params, searchParams }: Props) {
  const { locale, segments } = await params;
  if (!isLocale(locale)) notFound();
  const section = sectionFor(locale, segments[0]);
  if (!section) notFound();
  if (
    segments.length === 2 &&
    (section === 'articles' || section === 'analysis')
  ) {
    const post = await getPost(locale, segments[1]);
    if (
      !post ||
      (post.entry.kind === 'market-analysis') !== (section === 'analysis')
    )
      notFound();
    return <Article post={post} locale={locale} />;
  }
  if (segments.length !== 1) notFound();
  const query = await searchParams;
  if (section === 'services') return <ServicesPage locale={locale} />;
  if (section === 'education') return <AcademyPage locale={locale} />;
  if (section === 'articles' || section === 'analysis' || section === 'search')
    return <Archive locale={locale} query={query} mode={section} />;
  if (section === 'about') return <AboutPage locale={locale} />;
  if (section === 'contact')
    return (
      <ContactPage
        locale={locale}
        service={typeof query.service === 'string' ? query.service : undefined}
        course={typeof query.course === 'string' ? query.course : undefined}
        intent={typeof query.intent === 'string' ? query.intent : undefined}
      />
    );
  if (section === 'media')
    return (
      <MediaPage
        locale={locale}
        type={typeof query.type === 'string' ? query.type : undefined}
      />
    );
  if (
    section === 'privacy' ||
    section === 'cookies' ||
    section === 'disclaimer'
  )
    return <LegalPage locale={locale} section={section} />;
  notFound();
}
