import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';
import { isKeystaticEnabled } from '@/lib/keystatic-access';

export const runtime = 'nodejs';
const handlers = makeRouteHandler({ config });

export const GET: typeof handlers.GET = (...args) => {
  if (!isKeystaticEnabled())
    return Promise.resolve(new Response(null, { status: 404 }));
  return handlers.GET(...args);
};

export const POST: typeof handlers.POST = (...args) => {
  if (!isKeystaticEnabled())
    return Promise.resolve(new Response(null, { status: 404 }));
  return handlers.POST(...args);
};
