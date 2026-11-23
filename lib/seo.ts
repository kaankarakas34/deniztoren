import type { Metadata } from 'next';
import { getSettings } from './content';
import { siteUrl, type Locale } from './site';
export async function pageMetadata(
  locale: Locale,
  title: string,
  path: string,
  description?: string,
  options?: {
    demo?: boolean;
    image?: string | null;
    alternates?: Record<string, string>;
    noindex?: boolean;
  },
): Promise<Metadata> {
  const settings = await getSettings();
  const summary =
    description ||
    (locale === 'tr'
      ? settings?.seoDescriptionTr
      : settings?.seoDescriptionEn) ||
    'Finance · Markets · Perspectives';
  const index =
    Boolean(settings?.publicationReady) && !options?.demo && !options?.noindex;
  return {
    title:
      title === 'Deniz Tören'
        ? `${title} | Finance · Markets · Perspectives`
        : `${title} | Deniz Tören`,
    description: summary,
    alternates: { canonical: path, languages: options?.alternates },
    robots: { index, follow: index },
    openGraph: {
      type: 'website',
      title,
      description: summary,
      locale: locale === 'tr' ? 'tr_TR' : 'en_GB',
      url: new URL(path, siteUrl).href,
      siteName: 'Deniz Tören',
      images: [
        { url: options?.image || '/opengraph-image', width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [options?.image || '/opengraph-image'],
    },
  };
}
