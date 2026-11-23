import { notFound } from 'next/navigation';
import { EditorialHome } from '@/components/editorial/home';
import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, 'Deniz Tören', `/${locale}`, undefined, {
    alternates: { tr: '/tr', en: '/en', 'x-default': '/tr' },
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <EditorialHome locale={locale} />;
}
