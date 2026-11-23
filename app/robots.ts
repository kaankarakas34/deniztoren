import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { getSettings } from '@/lib/content';
export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  return {
    rules: settings?.publicationReady
      ? {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/api/',
            '/keystatic/',
            '/tr/arama',
            '/en/search',
            '/design-system',
          ],
        }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
