import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import '@/styles/globals.css';
import '@/styles/journal.css';
import '@/styles/profile.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});
const serif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://deniztoren.com'),
  title: 'Deniz Tören | Finance · Markets · Perspectives',
  // Keep this foundation out of search until the public site is ready.
  robots: { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
