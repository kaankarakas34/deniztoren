'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { textFor } from '@/lib/copy';
import { href, type Locale } from '@/lib/site';
const groups = {
  tr: [
    {
      label: 'Döviz',
      rows: [
        ['EUR/USD', 'Euro / ABD Doları'],
        ['GBP/USD', 'Sterlin / ABD Doları'],
        ['USD/TRY', 'ABD Doları / Türk Lirası'],
        ['EUR/TRY', 'Euro / Türk Lirası'],
      ],
    },
    {
      label: 'Tahvil',
      rows: [
        ['ABD 2Y', '2 yıllık devlet tahvili'],
        ['ABD 10Y', '10 yıllık devlet tahvili'],
        ['Almanya 10Y', '10 yıllık devlet tahvili'],
      ],
    },
    {
      label: 'Emtia',
      rows: [
        ['XAU/USD', 'Altın'],
        ['BRENT', 'Brent petrol'],
        ['XAG/USD', 'Gümüş'],
      ],
    },
    {
      label: 'Endeks',
      rows: [
        ['S&P 500', 'ABD hisse senetleri'],
        ['BIST 100', 'Türkiye hisse senetleri'],
        ['STOXX 600', 'Avrupa hisse senetleri'],
      ],
    },
  ],
  en: [
    {
      label: 'FX',
      rows: [
        ['EUR/USD', 'Euro / US Dollar'],
        ['GBP/USD', 'Pound / US Dollar'],
        ['USD/TRY', 'US Dollar / Turkish Lira'],
        ['EUR/TRY', 'Euro / Turkish Lira'],
      ],
    },
    {
      label: 'Bonds',
      rows: [
        ['US 2Y', '2-year Treasury'],
        ['US 10Y', '10-year Treasury'],
        ['Germany 10Y', '10-year government bond'],
      ],
    },
    {
      label: 'Commodities',
      rows: [
        ['XAU/USD', 'Gold'],
        ['BRENT', 'Brent crude'],
        ['XAG/USD', 'Silver'],
      ],
    },
    {
      label: 'Indices',
      rows: [
        ['S&P 500', 'US equities'],
        ['BIST 100', 'Turkish equities'],
        ['STOXX 600', 'European equities'],
      ],
    },
  ],
};
export function MarketGlance({ locale }: { locale: Locale }) {
  const t = textFor(locale);
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs = groups[locale];
  return (
    <section className="market-glance" aria-labelledby={`${id}-heading`}>
      <h2 className="eyebrow" id={`${id}-heading`}>
        {t.market}
      </h2>
      <div className="market-tabs" role="tablist" aria-label={t.market}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            id={`${id}-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.ctrlKey || event.metaKey || event.altKey) return;
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % tabs.length
                  : event.key === 'ArrowLeft'
                    ? (index + tabs.length - 1) % tabs.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? tabs.length - 1
                        : undefined;
              if (next !== undefined) {
                event.preventDefault();
                setActive(next);
                buttons.current[next]?.focus();
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
      >
        <table>
          <caption className="sr-only">{t.marketOffline}</caption>
          <tbody>
            {tabs[active].rows.map(([symbol, description]) => (
              <tr key={symbol}>
                <th scope="row">{symbol}</th>
                <td>{description}</td>
                <td aria-label={t.marketOffline}>—</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="market-status">
          <span />
          {t.marketOffline}
        </p>
      </div>
      <Link className="text-link market-link" href={href(locale, 'analysis')}>
        {t.marketLink}
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
