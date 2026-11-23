import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container">
      <div className="simple-content">
        <span className="eyebrow">404</span>
        <h1
          style={{
            fontFamily: 'var(--font-source-serif)',
            fontSize: 44,
            color: 'var(--color-navy)',
          }}
        >
          Bu sayfa bulunamadı.
          <br />
          Page not found.
        </h1>
        <p>
          Aradığınız içerik henüz yayınlanmamış veya adresi değişmiş olabilir.
        </p>
        <p>
          The content may not have been published or its address may have
          changed.
        </p>
        <Link className="button button-gold" href="/tr">
          Türkçe
        </Link>{' '}
        <Link className="button button-outline" href="/en">
          English
        </Link>
      </div>
    </div>
  );
}
