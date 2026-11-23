import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|keystatic|design-system|opengraph-image|_next|_vercel|.*\\..*).*)',
  ],
};
