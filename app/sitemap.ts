import type { MetadataRoute } from 'next';
import { getPosts, getSettings, getTranslation, postHref } from '@/lib/content';
import { href, opposite, siteUrl, type Locale, type Section } from '@/lib/site';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  if (!settings?.publicationReady) return [];
  const result: MetadataRoute.Sitemap = [];
  for (const locale of ['tr', 'en'] as Locale[]) {
    for (const section of [
      undefined,
      'articles',
      'analysis',
      'media',
      'about',
      'contact',
      'privacy',
      'cookies',
      'disclaimer',
    ] as (Section | undefined)[])
      result.push({
        url: siteUrl + href(locale, section),
        alternates: {
          languages: {
            tr: siteUrl + href('tr', section),
            en: siteUrl + href('en', section),
          },
        },
      });
    for (const post of await getPosts(locale)) {
      if (post.entry.demo) continue;
      const other = opposite(locale);
      const translation = await getTranslation(post, other);
      result.push({
        url: siteUrl + postHref(post),
        lastModified:
          post.entry.updatedDate || post.entry.publishDate || undefined,
        alternates: {
          languages: {
            [locale]: siteUrl + postHref(post),
            ...(translation
              ? { [other]: siteUrl + postHref(translation) }
              : {}),
          },
        },
      });
    }
  }
  return result;
}
