import Link from 'next/link';
import { textFor } from '@/lib/copy';
import { href, type Locale } from '@/lib/site';

export function Footer({ locale }: { locale: Locale }) {
  const t = textFor(locale);
  const tr = locale === 'tr';

  return (
    <footer className="site-footer">
      <div className="footer-columns container">
        {/* Brand Column */}
        <div className="footer-col-brand">
          <Link className="wordmark" href={href(locale)}>
            <span className="wordmark-title">
              Deniz Tören
              <span className="wordmark-dot" aria-hidden="true">
                .
              </span>
            </span>
            <span className="wordmark-subtitle">
              {tr
                ? 'FİNANS · STRATEJİ · AKADEMİ'
                : 'FINANCE · STRATEGY · ACADEMY'}
            </span>
          </Link>
          <p className="footer-bio">
            {tr
              ? 'Karmaşık finansal dinamiklerde doğru kararlar almak için stratejik kurumsal danışmanlık, bağımsız piyasa analizleri ve ileri düzey eğitimler.'
              : 'Strategic corporate advisory, independent market research and executive masterclasses for sound decision-making in volatile markets.'}
          </p>
          <p className="footer-disclaimer-note">
            {tr
              ? 'Bu sitede yer alan analiz ve içerikler genel bilgilendirme niteliğindedir; kişiye özel yatırım tavsiyesi değildir.'
              : 'Analyses and contents on this site are for general informational purposes and do not constitute individual investment advice.'}
          </p>
        </div>

        {/* Services Column */}
        <div className="footer-col">
          <h5>{tr ? 'Hizmetler & Danışmanlık' : 'Advisory & Services'}</h5>
          <ul>
            <li>
              <Link href={href(locale, 'services')}>
                {tr
                  ? 'Stratejik Finans Danışmanlığı'
                  : 'Strategic Corporate Advisory'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'services')}>
                {tr
                  ? 'Kurumsal Hazine & Risk Yönetimi'
                  : 'Treasury & Risk Management'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'services')}>
                {tr
                  ? 'Yönetim Kurulu Karar Desteği'
                  : 'Boardroom & C-Level Counsel'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'contact')}>
                {tr ? 'Danışmanlık Talebi Başlat' : 'Request Advisory Call'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Academy Column */}
        <div className="footer-col">
          <h5>{tr ? 'Finans Akademisi' : 'Finance Academy'}</h5>
          <ul>
            <li>
              <Link href={href(locale, 'education')}>
                {tr ? 'Makroekonomi Masterclass' : 'Macroeconomics Masterclass'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'education')}>
                {tr
                  ? 'Şirket Değerleme & Modelleme'
                  : 'Corporate Valuation & Modeling'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'education')}>
                {tr
                  ? 'Kurumlara Özel Finans Atölyesi'
                  : 'Tailored Corporate Cohorts'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'contact')}>
                {tr
                  ? 'Ön Kayıt ve Müfredat Bilgisi'
                  : 'Syllabus & Registration'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Publication & Legal Column */}
        <div className="footer-col">
          <h5>{tr ? 'Yayın & Kurumsal' : 'Research & Legal'}</h5>
          <ul>
            <li>
              <Link href={href(locale, 'articles')}>
                {tr ? 'Tüm Yazılar & Analizler' : 'All Articles & Analysis'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'about')}>
                {tr ? 'Deniz Tören Hakkında' : 'About Deniz Tören'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'contact')}>
                {tr ? 'İletişim & Randevu' : 'Contact & Inquiries'}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'privacy')}>{t.privacy}</Link>
            </li>
            <li>
              <Link href={href(locale, 'cookies')}>{t.cookies}</Link>
            </li>
            <li>
              <Link href={href(locale, 'disclaimer')}>{t.disclaimer}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar container">
        <p>
          © {new Date().getFullYear()} Deniz Tören. {t.rights}
        </p>
        <p className="footer-tagline">{t.footer}</p>
      </div>
    </footer>
  );
}
