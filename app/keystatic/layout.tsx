import { notFound } from 'next/navigation';
import { isKeystaticEnabled } from '@/lib/keystatic-access';
import KeystaticApp from './keystatic';

export default function KeystaticLayout() {
  if (!isKeystaticEnabled()) notFound();
  return <KeystaticApp />;
}
