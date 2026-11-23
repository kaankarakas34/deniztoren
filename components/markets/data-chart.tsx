import type { PostEntry } from '@/lib/content';
import { textFor } from '@/lib/copy';
import { formatDate, safeExternalUrl, type Locale } from '@/lib/site';
export function DataChart({
  chart,
  locale,
}: {
  chart: PostEntry['chart'];
  locale: Locale;
}) {
  const t = textFor(locale);
  const rows = chart.points.filter((point) => Number.isFinite(point.value));
  if (
    rows.length < 2 ||
    !chart.title ||
    !chart.source ||
    !chart.unit ||
    !chart.asOf
  )
    return null;
  const values = rows.map((row) => row.value as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const path = values
    .map(
      (v, i) =>
        `${i ? 'L' : 'M'}${45 + (i / (values.length - 1)) * 550},${190 - ((v - min) / span) * 140}`,
    )
    .join(' ');
  const source = safeExternalUrl(chart.sourceUrl);
  return (
    <figure className="data-chart">
      <h2>{chart.title}</h2>
      <svg
        viewBox="0 0 640 235"
        role="img"
        aria-label={`${chart.title}. ${rows.map((p) => `${p.label}: ${p.value}`).join('; ')}. ${chart.unit}`}
      >
        <title>{chart.title}</title>
        <path d="M45 35V190H600" fill="none" stroke="#c7cecF" />
        <path d={path} fill="none" stroke="#172B45" strokeWidth="2.5" />
        <text x="45" y="220" fontSize="12" fill="#536274">
          {rows[0].label}
        </text>
        <text x="600" y="220" textAnchor="end" fontSize="12" fill="#536274">
          {rows.at(-1)?.label}
        </text>
        <text x="45" y="20" fontSize="11" fill="#536274">
          {max.toLocaleString(locale)} {chart.unit}
        </text>
      </svg>
      <figcaption>
        {t.source}:{' '}
        {source ? (
          <a href={source} target="_blank" rel="noopener noreferrer">
            {chart.source}
          </a>
        ) : (
          chart.source
        )}{' '}
        · {t.date}: {formatDate(chart.asOf, locale)} · {t.unit}: {chart.unit}
      </figcaption>
      <details>
        <summary>{t.dataTable}</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">{locale === 'tr' ? 'Dönem' : 'Period'}</th>
              <th scope="col">{chart.unit}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value?.toLocaleString(locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
