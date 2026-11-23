import type { NextRequest } from 'next/server';
import { getPost, getTranslation, postHref } from '@/lib/content';
import { href, isLocale, segments, type Section } from '@/lib/site';
export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('locale');
  const path = request.nextUrl.searchParams.get('path') || '/tr';
  if (!target || !isLocale(target)) return new Response(null, { status: 400 });
  const parts = path.split('/').filter(Boolean);
  const current = parts[0];
  let destination = href(target);
  if (current && isLocale(current) && parts[1]) {
    const section = (Object.keys(segments[current]) as Section[]).find(
      (key) => segments[current][key] === parts[1],
    );
    if (section) {
      destination = href(target, section);
      if ((section === 'articles' || section === 'analysis') && parts[2]) {
        const post = await getPost(current, parts[2]);
        const translated = post
          ? await getTranslation(post, target)
          : undefined;
        destination = translated
          ? postHref(translated)
          : `${destination}?translation=missing`;
      }
    }
  }
  return new Response(null, {
    status: 302,
    headers: { Location: destination },
  });
}
