'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';
import type { Locale } from '@/lib/site';
export function MediaPlayer({
  title,
  thumbnail,
  alt,
  embed,
  locale,
}: {
  title: string;
  thumbnail?: string | null;
  alt: string;
  embed: string;
  locale: Locale;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div className="embed-area">
        {loaded ? (
          <iframe
            src={embed}
            title={title}
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        ) : (
          <>
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={alt}
                fill
                sizes="(max-width:760px) 100vw, 50vw"
                className="cover-image"
              />
            ) : null}
            <button type="button" onClick={() => setLoaded(true)}>
              <Play size={18} />
              {locale === 'tr' ? 'Oynatıcıyı yükle' : 'Load player'}
            </button>
          </>
        )}
      </div>
      {!loaded ? (
        <p className="embed-consent">
          {locale === 'tr'
            ? 'Oynatıcıyı yüklediğinizde ilgili medya sağlayıcısına bağlanırsınız. Sağlayıcı çerez kullanabilir.'
            : 'Loading the player connects you to the media provider, which may use cookies.'}
        </p>
      ) : null}
    </>
  );
}
