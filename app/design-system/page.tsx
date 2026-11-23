import { notFound } from 'next/navigation';
import { HeroArt } from '@/components/editorial/hero-art';
import { SectionHeading } from '@/components/editorial/section-heading';
import { Newsletter } from '@/components/editorial/newsletter';
export default function DesignSystem() {
  if (process.env.NODE_ENV !== 'development') notFound();
  const colors = [
    'navy',
    'ivory',
    'gold',
    'slate',
    'mist',
    'ink',
    'border',
    'muted',
    'white',
    'warm-neutral',
  ];
  return (
    <main>
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Deniz Tören</p>
          <h1>Tasarım sistemi</h1>
          <p>
            Yalnız geliştirme ortamı. Serif başlık, Inter gövde; görünür focus
            ve reduced motion desteği.
          </p>
        </div>
        <div className="design-showcase">
          <SectionHeading title="Renkler" />
          <div className="swatches">
            {colors.map((color) => (
              <div
                className="swatch"
                style={{
                  background: `var(--color-${color})`,
                  color: ['navy', 'slate', 'ink'].includes(color)
                    ? '#fff'
                    : '#172b45',
                }}
                key={color}
              >
                {color}
              </div>
            ))}
          </div>
          <SectionHeading title="Etkileşimler" />
          <div className="hero-actions">
            <a className="button button-gold" href="/tr">
              Birincil bağlantı →
            </a>
            <a className="button button-outline" href="/tr/yazilar">
              İkincil bağlantı
            </a>
            <button className="button button-outline" type="button">
              Focus örneği
            </button>
          </div>
          <HeroArt />
        </div>
      </div>
      <Newsletter locale="tr" />
    </main>
  );
}
