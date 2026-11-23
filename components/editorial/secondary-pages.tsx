import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  getAbout,
  getHome,
  getMedia,
  getSettings,
  mediaEmbed,
} from '@/lib/content';
import { textFor } from '@/lib/copy';
import { formatDate, href, safeExternalUrl, type Locale } from '@/lib/site';
import { MediaPlayer } from '@/components/media/media-player';
import { prepareDocument } from '@/components/article/markdoc-body';

export async function MediaPage({
  locale,
  type,
}: {
  locale: Locale;
  type?: string;
}) {
  const t = textFor(locale);
  const all = await getMedia(locale);
  const items = all.filter((item) => !type || item.entry.type === type);
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Video · Podcast</p>
        <h1>{t.nav.media}</h1>
        <p>
          {locale === 'tr'
            ? 'Ekonomi ve finans üzerine konuşmalar, farklı sesler ve yeni perspektifler.'
            : 'Conversations on economics and finance. Different voices and new perspectives.'}
        </p>
      </div>
      <nav
        className="category-links"
        style={{ paddingTop: 24 }}
        aria-label={t.nav.media}
      >
        {[
          ['', t.all],
          ['video', 'Video'],
          ['podcast', 'Podcast'],
        ].map(([value, label]) => (
          <Link
            key={value}
            href={`${href(locale, 'media')}${value ? `?type=${value}` : ''}`}
            aria-current={(type || '') === value ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      {items.length ? (
        <div className="media-grid">
          {items.map(({ slug, entry: p }) => {
            const embed = mediaEmbed(p.provider, p.url);
            const url = safeExternalUrl(p.url);
            return (
              <article className="media-card" key={slug}>
                {embed ? (
                  <MediaPlayer
                    title={p.title}
                    thumbnail={p.thumbnail}
                    alt={p.thumbnailAlt || ''}
                    embed={embed}
                    locale={locale}
                  />
                ) : null}
                <span className="eyebrow">
                  {p.provider} · {p.type}
                </span>
                <h2>{p.title}</h2>
                <p>{p.summary}</p>
                <p>
                  {p.publishDate ? formatDate(p.publishDate, locale) : ''}
                  {p.duration ? ` · ${p.duration}` : ''}
                </p>
                {url ? (
                  <a
                    className="text-link"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {locale === 'tr'
                      ? 'Orijinal yayını aç'
                      : 'Open original publication'}
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{t.mediaEmpty}</h2>
          <p>{t.mediaEmptyText}</p>
        </div>
      )}
    </div>
  );
}
export async function AboutPage({ locale }: { locale: Locale }) {
  const [about, home] = await Promise.all([getAbout(locale), getHome(locale)]);
  const t = textFor(locale);
  const bio = about
    ? prepareDocument((await about.biography()).node)
    : undefined;
  return (
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Deniz Tören</p>
        <h1>{t.nav.about}</h1>
        <p>
          {about?.intro ||
            (locale === 'tr'
              ? 'Finansı anlamak. Gelişmeleri yorumlamak. Büyük resmi görmek.'
              : 'Understanding finance. Interpreting markets. Seeing the bigger picture.')}
        </p>
      </div>
      <div className="simple-content">
        {bio ? (
          <div className="prose">{bio.content}</div>
        ) : (
          <>
            <h2>{t.editorial}</h2>
            <p>{home?.editorialNote}</p>
            <p className="notice">
              {locale === 'tr'
                ? 'Biyografi ve profesyonel profil, onaylı bilgilerle yayına hazırlanıyor.'
                : 'The biography and professional profile are being prepared with verified information.'}
            </p>
          </>
        )}
        {about?.expertise.length ? (
          <>
            <h2>{locale === 'tr' ? 'Uzmanlık Alanları' : 'Areas of Focus'}</h2>
            <ul>
              {about.expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : null}
        <Link className="text-link" href={href(locale, 'contact')}>
          {t.nav.contact} →
        </Link>
      </div>
    </div>
  );
}
export async function ContactPage({
  locale,
  service,
  course,
  intent,
}: {
  locale: Locale;
  service?: string;
  course?: string;
  intent?: string;
}) {
  const t = textFor(locale);
  const tr = locale === 'tr';
  const settings = await getSettings();
  const email =
    settings?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)
      ? settings.email
      : undefined;
  const linkedin = safeExternalUrl(settings?.linkedin);

  const selectedTopic = service || course;
  const isSyllabus = intent === 'syllabus';
  const topicTypeLabel = service
    ? tr
      ? 'Danışmanlık Talebi'
      : 'Advisory Inquiry'
    : course
      ? isSyllabus
        ? tr
          ? 'Müfredat Talebi'
          : 'Syllabus Request'
        : tr
          ? 'Eğitim Ön Kayıt & Bilgi'
          : 'Programme Registration'
      : undefined;

  const mailtoHref = email
    ? selectedTopic
      ? `mailto:${email}?subject=${encodeURIComponent(`${topicTypeLabel}: ${selectedTopic}`)}`
      : `mailto:${email}`
    : undefined;

  return (
    <div className="container">
      <div className="page-heading">
        <h1>{t.nav.contact}</h1>
        <p>
          {tr
            ? 'Kurumsal danışmanlık, yönetici eğitimleri, medya talepleri veya analizler hakkında doğrudan iletişime geçebilirsiniz.'
            : 'Reach out directly for corporate advisory, executive finance programmes, media enquiries or editorial correspondence.'}
        </p>
      </div>
      <div className="simple-content">
        {selectedTopic ? (
          <div className="inquiry-context-banner">
            <span className="inquiry-context-label">{topicTypeLabel}</span>
            <p className="inquiry-context-title">{selectedTopic}</p>
            <p className="inquiry-context-note">
              {tr
                ? 'Aşağıdaki e-posta bağlantısına tıkladığınızda konu başlığı otomatik olarak doldurulacaktır.'
                : 'Clicking the email link below will pre-fill the subject line for this inquiry.'}
            </p>
          </div>
        ) : null}

        <h2>
          {tr ? 'Gizlilik esaslı doğrudan iletişim.' : 'Direct & confidential.'}
        </h2>
        <p>
          {tr
            ? 'Danışmanlık kapsamı, eğitim takvimi, kurum içi atölye teklifleri ve basın talepleri için doğrudan e-posta gönderebilirsiniz.'
            : 'Send an email directly for advisory scope, cohort dates, custom corporate workshops or press enquiries.'}
        </p>
        {email && mailtoHref ? (
          <p>
            <a className="contact-address" href={mailtoHref}>
              {email}
            </a>
          </p>
        ) : (
          <p className="notice">
            {tr
              ? 'İletişim e-posta adresi henüz yayınlanmadı. Güncel iletişim bilgileri burada paylaşılacak.'
              : 'The contact email has not been published yet. Updated contact details will be shared here.'}
          </p>
        )}
        {linkedin ? (
          <a
            className="text-link"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ArrowUpRight size={16} />
          </a>
        ) : null}
      </div>
    </div>
  );
}
const legal = {
  tr: {
    privacy: {
      title: 'Gizlilik',
      intro:
        'Bu yayının temelinde, gereksiz kişisel veri toplamayan bir okuma deneyimi var.',
      sections: [
        [
          'Ziyaret ve içerik',
          'Siteyi okumak için hesap açmanız gerekmez. Bu sürümde ziyaretçi hesabı, yorum veritabanı veya uygulama içi abone kaydı bulunmaz.',
        ],
        [
          'İletişim ve dış hizmetler',
          'Bir e-posta bağlantısını kullanırsanız mesajınız kendi e-posta uygulamanız üzerinden gönderilir. Harici abonelik ve sosyal medya bağlantılarında ilgili sağlayıcının politikası geçerlidir.',
        ],
        [
          'Medya ve teknik kayıtlar',
          'Medya oynatıcıları siz yüklemeyi seçene kadar üçüncü tarafa bağlanmaz. Hosting sağlayıcısı hizmetin sunulması için teknik erişim kayıtları işleyebilir. Gerçek hizmet sağlayıcıları yayın öncesi bu metinde güncellenmelidir.',
        ],
      ],
    },
    cookies: {
      title: 'Çerez Politikası',
      intro:
        'Bu sürümde reklam veya ziyaretçi analitiği hizmeti etkin değildir.',
      sections: [
        [
          'Dil ve yerel tercihler',
          'Dil seçimi ve editör gibi özellikler, gerekli yerel tercihler veya oturum bilgileri kullanabilir. Editör oturumu yalnız yetkili içerik yöneticileri içindir.',
        ],
        [
          'İsteğe bağlı medya',
          'YouTube veya Spotify oynatıcısını yüklemeyi seçerseniz ilgili sağlayıcıya bağlanırsınız; sağlayıcı kendi çerez ve gizlilik koşullarını uygular. Oynatıcı varsayılan olarak yüklenmez.',
        ],
        [
          'Değişiklikler',
          'Yeni bir analiz, abonelik veya medya hizmeti eklendiğinde bu açıklama ve gerekli tercihler gerçek uygulamaya göre güncellenmelidir.',
        ],
      ],
    },
    disclaimer: {
      title: 'Yatırım Uyarısı',
      intro:
        'Bu sitedeki içerikler genel bilgi ve editoryal değerlendirme amacı taşır.',
      sections: [
        [
          'Kişisel yatırım tavsiyesi değildir',
          'Yazılar, kişisel mali durumunuz veya risk tercihleriniz değerlendirilerek hazırlanmış bir yatırım önerisi değildir.',
        ],
        [
          'Risk ve veri',
          'Finansal varlıkların değeri değişebilir; geçmiş sonuçlar gelecekteki sonuçları garanti etmez. Veri kaynağı ve tarihi, ilgili içerikte belirtilir. Canlı veri bağlantısı olmayan alanlarda güncel fiyat iddiasında bulunulmaz.',
        ],
        [
          'Bağımsız değerlendirme',
          'Bir finansal karar vermeden önce bilgilerin güncelliğini ve kendi koşullarınıza uygunluğunu değerlendirmeniz gerekir.',
        ],
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy',
      intro:
        'This publication is designed around a reading experience that avoids unnecessary collection of personal data.',
      sections: [
        [
          'Reading and content',
          'You do not need an account to read the site. This version has no visitor accounts, comment database or in-app subscription records.',
        ],
        [
          'Contact and external services',
          'Email links use your own email application. External subscription and social media services apply their own privacy policies.',
        ],
        [
          'Media and technical records',
          'Media players do not connect to third parties until you choose to load them. The hosting provider may process technical access logs. Actual service providers must be added here before publication.',
        ],
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      intro:
        'No advertising or visitor analytics service is enabled in this version.',
      sections: [
        [
          'Language and preferences',
          'Language selection and the editor may use necessary preferences or session information. Editor sessions are for authorised content managers only.',
        ],
        [
          'Optional media',
          'Loading a YouTube or Spotify player connects you to that provider, which applies its own cookie and privacy policies. Players are not loaded by default.',
        ],
        [
          'Changes',
          'When analytics, subscription or media services change, this notice and any required controls must be updated to reflect the actual implementation.',
        ],
      ],
    },
    disclaimer: {
      title: 'Disclaimer',
      intro:
        'Content on this site is provided for general information and editorial discussion.',
      sections: [
        [
          'Not personalised investment advice',
          'Articles do not constitute investment recommendations prepared for your individual financial circumstances or risk preferences.',
        ],
        [
          'Risk and data',
          'Financial asset values can change. Past performance does not guarantee future outcomes. Data sources and dates are identified in the relevant content. Areas without live feeds do not claim to show current prices.',
        ],
        [
          'Independent assessment',
          'Before making a financial decision, consider whether the information is current and suitable for your own circumstances.',
        ],
      ],
    },
  },
};
export function LegalPage({
  locale,
  section,
}: {
  locale: Locale;
  section: 'privacy' | 'cookies' | 'disclaimer';
}) {
  const page = legal[locale][section];
  return (
    <div className="container">
      <div className="page-heading">
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </div>
      <div className="simple-content">
        {page.sections.map(([title, body]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
