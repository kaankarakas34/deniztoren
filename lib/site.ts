export type Locale = 'tr' | 'en';
export const siteUrl = 'https://deniztoren.com';
export const categories = [
  'global-economy',
  'corporate-finance',
  'perspectives',
  'book-notes',
  'financial-literacy',
] as const;
export type Category = (typeof categories)[number];
export const categoryNames: Record<Locale, Record<Category, string>> = {
  tr: {
    'global-economy': 'Küresel Ekonomi',
    'corporate-finance': 'Kurumsal Finans',
    perspectives: 'Perspektif',
    'book-notes': 'Kitap Notları',
    'financial-literacy': 'Finansal Okuryazarlık',
  },
  en: {
    'global-economy': 'Global Economy',
    'corporate-finance': 'Corporate Finance',
    perspectives: 'Perspectives',
    'book-notes': 'Book Notes',
    'financial-literacy': 'Financial Literacy',
  },
};
export const segments = {
  tr: {
    services: 'hizmetler',
    education: 'egitimler',
    articles: 'yazilar',
    analysis: 'piyasa-analizleri',
    media: 'medya',
    about: 'hakkimda',
    contact: 'iletisim',
    search: 'arama',
    privacy: 'gizlilik',
    cookies: 'cerez-politikasi',
    disclaimer: 'uyari',
  },
  en: {
    services: 'services',
    education: 'academy',
    articles: 'articles',
    analysis: 'market-analysis',
    media: 'media',
    about: 'about',
    contact: 'contact',
    search: 'search',
    privacy: 'privacy',
    cookies: 'cookie-policy',
    disclaimer: 'disclaimer',
  },
} as const;
export type Section = keyof typeof segments.tr;
export function href(locale: Locale, section?: Section, slug?: string) {
  return `/${locale}${section ? `/${segments[locale][section]}` : ''}${slug ? `/${encodeURIComponent(slug)}` : ''}`;
}
export function isLocale(value: string): value is Locale {
  return value === 'tr' || value === 'en';
}
export function opposite(locale: Locale): Locale {
  return locale === 'tr' ? 'en' : 'tr';
}
export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
export function safeExternalUrl(value: string | null | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}
