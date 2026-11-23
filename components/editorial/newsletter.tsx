import { Mail, ArrowUpRight } from 'lucide-react';
import { textFor } from '@/lib/copy';
import { safeExternalUrl, type Locale } from '@/lib/site';
export function Newsletter({
  locale,
  url,
}: {
  locale: Locale;
  url?: string | null;
}) {
  const t = textFor(locale);
  const signup = safeExternalUrl(url);
  return (
    <section className="newsletter-band" aria-labelledby="newsletter-heading">
      <div className="newsletter-inner container">
        <Mail
          className="newsletter-icon"
          size={48}
          strokeWidth={1}
          aria-hidden="true"
        />
        <div className="newsletter-copy">
          <h2 id="newsletter-heading">{t.newsletter}</h2>
          <p>{t.newsletterIntro}</p>
        </div>
        <div className="newsletter-action">
          {signup ? (
            <a
              className="button button-gold"
              href={signup}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.newsletterAction}
              <ArrowUpRight size={17} />
            </a>
          ) : (
            <p>{t.newsletterClosed}</p>
          )}
        </div>
      </div>
    </section>
  );
}
