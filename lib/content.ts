import 'server-only';
import { createReader, type Entry } from '@keystatic/core/reader';
import { cache } from 'react';
import config from '@/keystatic.config';
import { href, type Locale } from './site';
import { isPublished, type PublicationState } from './publishing';

export const reader = createReader(process.cwd(), config);
export type PostEntry = Entry<typeof config.collections.posts>;
export type Post = { slug: string; entry: PostEntry };
export type MediaEntry = Entry<typeof config.collections.mediaItems>;
export type MediaItem = { slug: string; entry: MediaEntry };
export const isDemoMode = process.env.NODE_ENV === 'development';
export function isPublic(entry: PublicationState, now = new Date()) {
  return isPublished(entry, { allowDemo: isDemoMode, now });
}
const allVisiblePosts = cache(async () =>
  (await reader.collections.posts.all())
    .filter((post) => isPublic(post.entry))
    .sort((a, b) =>
      (b.entry.publishDate ?? '').localeCompare(a.entry.publishDate ?? ''),
    ),
);
export const getPosts = cache(async (locale: Locale) =>
  (await allVisiblePosts()).filter((post) => post.entry.locale === locale),
);
export const getPost = cache(async (locale: Locale, slug: string) =>
  (await getPosts(locale)).find((post) => post.slug === slug),
);
export const getTranslation = cache(async (post: Post, locale: Locale) =>
  post.entry.translationGroup
    ? (await getPosts(locale)).find(
        (item) => item.entry.translationGroup === post.entry.translationGroup,
      )
    : undefined,
);
export function postHref(post: Post) {
  return href(
    post.entry.locale,
    post.entry.kind === 'market-analysis' ? 'analysis' : 'articles',
    post.slug,
  );
}
export const getMedia = cache(async (locale: Locale) =>
  (await reader.collections.mediaItems.all())
    .filter(
      (item) =>
        item.entry.locale === locale && isPublic(item.entry) && item.entry.url,
    )
    .sort((a, b) =>
      (b.entry.publishDate ?? '').localeCompare(a.entry.publishDate ?? ''),
    ),
);
export const getSettings = cache(
  async () => await reader.singletons.site.read(),
);
export const getHome = cache(async (locale: Locale) => {
  const home =
    locale === 'tr'
      ? await reader.singletons.homeTr.read()
      : await reader.singletons.homeEn.read();
  return home
    ? {
        ...home,
        services:
          home.servicesPublished || isDemoMode || home.services?.length
            ? (home.services ?? [])
            : [],
        courses:
          home.educationPublished || isDemoMode || home.courses?.length
            ? (home.courses ?? [])
            : [],
      }
    : null;
});
export const getAbout = cache(async (locale: Locale) =>
  locale === 'tr'
    ? await reader.singletons.aboutTr.read()
    : await reader.singletons.aboutEn.read(),
);
export function mediaEmbed(provider: string, value: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return undefined;
    if (
      provider === 'youtube' &&
      ['www.youtube.com', 'youtube.com', 'youtu.be'].includes(url.hostname)
    ) {
      const id =
        url.hostname === 'youtu.be'
          ? url.pathname.slice(1)
          : url.searchParams.get('v');
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id)
        ? `https://www.youtube-nocookie.com/embed/${id}`
        : undefined;
    }
    if (
      provider === 'spotify' &&
      url.hostname === 'open.spotify.com' &&
      /^\/(episode|show)\/[a-zA-Z0-9]+$/.test(url.pathname)
    )
      return `https://open.spotify.com/embed${url.pathname}`;
  } catch {
    return undefined;
  }
  return undefined;
}
