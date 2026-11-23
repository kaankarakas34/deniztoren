'use client';
import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import { motion, useScroll, useReducedMotion } from 'motion/react';
import { textFor } from '@/lib/copy';
import type { Locale } from '@/lib/site';
export function ReadingTools({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const t = textFor(locale);
  const [status, setStatus] = useState('');
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus(t.copied);
    } catch {
      setStatus(
        locale === 'tr'
          ? 'Bağlantıyı adres çubuğundan kopyalayabilirsiniz.'
          : 'You can copy the link from the address bar.',
      );
    }
  }
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError'))
          await copy();
      }
    } else await copy();
  }
  return (
    <>
      {!reduced ? (
        <motion.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      ) : null}
      <div className="article-tools">
        <button type="button" onClick={share}>
          <Share2 size={16} />
          {t.share}
        </button>
        <button type="button" onClick={copy}>
          <Copy size={16} />
          {t.copy}
        </button>
        <span role="status" aria-live="polite">
          {status}
        </span>
      </div>
    </>
  );
}
