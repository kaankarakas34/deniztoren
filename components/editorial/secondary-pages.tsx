import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  GraduationCap,
  Mail,
  TrendingUp,
} from 'lucide-react';
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
  const tr = locale === 'tr';
  const bio = about
    ? prepareDocument((await about.biography()).node)
    : undefined;
  const portrait = about?.portrait || home?.heroPortrait;
  const portraitAlt = about?.portraitAlt || home?.heroPortraitAlt || 'Deniz Tören';

  const focusAreas = about?.expertise?.length
    ? about.expertise
    : tr
      ? [
          'Küresel Makroekonomi ve Merkez Bankası Politikaları',
          'Kurumsal Finans, Sermaye Yapısı ve Şirket Değerleme',
          'Kurumsal Hazine, Likidite ve Finansal Risk Yönetimi',
          'Yönetici Finans Eğitimi ve Karar Okuryazarlığı',
        ]
      : [
          'Global Macroeconomics & Central Bank Policy Regimes',
          'Corporate Finance, Capital Structure & Valuation',
          'Corporate Treasury, Liquidity & Financial Risk Management',
          'Executive Finance Education & Decision Literacy',
        ];

  return (
    <div className="subpage-shell">
      <section className="subpage-hero">
        <div className="container about-hero-grid">
          <div className="subpage-hero-copy">
            <h1>Deniz Tören</h1>
            <p className="subpage-hero-lead">
              {about?.intro ||
                (tr
                  ? 'Finansı anlamak, küresel gelişmeleri bağlamıyla yorumlamak ve stratejik kararlarda büyük resmi görmek.'
                  : 'Understanding finance, interpreting global markets in context and keeping the bigger picture in view.')}
            </p>
            <div className="subpage-hero-actions">
              <Link className="button-gold" href={href(locale, 'services')}>
                {tr ? 'Danışmanlık Hizmetleri' : 'Advisory Services'}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                className="button-secondary-light"
                href={href(locale, 'contact')}
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>

          {portrait ? (
            <figure className="portrait-frame about-portrait">
              <Image
                src={portrait}
                alt={portraitAlt}
                fill
                sizes="(max-width: 760px) 100vw, 360px"
                className="portrait-image"
                priority
              />
            </figure>
          ) : (
            <div className="about-monogram-box" aria-hidden="true">
              <span>DT</span>
            </div>
          )}
        </div>
      </section>

      <section className="subpage-section bg-white">
        <div className="container about-content-grid">
          <div className="about-narrative">
            <h2 className="section-heading-serif">{t.editorial}</h2>
            {bio ? (
              <div className="prose">{bio.content}</div>
            ) : (
              <div className="about-prose-stack">
                <p>
                  {home?.editorialNote ||
                    (tr
                      ? 'Veriyi bağlamıyla okumak, farklı olasılıkları birlikte düşünmek ve büyük resmi gözden kaçırmamak. Bu yayının ve danışmanlık anlayışının odağında, finansı karmaşıklıktan arındırıp stratejik değere dönüştürmek var.'
                      : 'Reading data in context, weighing competing scenarios and never losing sight of the broader picture. Transforming financial complexity into strategic clarity sits at the core of this practice.')}
                </p>
                <p>
                  {tr
                    ? 'Deniz Tören platformu üç birbirini besleyen disiplini bir araya getirir: kurumlar ve yönetim kurulları için bağımsız finansal danışmanlık, profesyoneller için uygulamalı finans akademisi ve piyasa gürültüsünden uzak editoryal makro analizler.'
                    : 'This platform brings together three mutually reinforcing disciplines: independent financial advisory for enterprises and boards, an applied executive finance academy, and calm, noise-free macroeconomic research.'}
                </p>
              </div>
            )}
          </div>

          <aside className="about-focus-panel">
            <h3>{tr ? 'Çalışma ve Odak Alanları' : 'Areas of Focus'}</h3>
            <ul>
              {focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="subpage-section bg-ivory">
        <div className="container">
          <div className="about-bridge-grid">
            <Link href={href(locale, 'services')} className="bridge-link-row">
              <Building2 size={20} className="gold-icon" aria-hidden="true" />
              <div>
                <strong>{tr ? 'Hizmetler & Danışmanlık' : 'Advisory & Services'}</strong>
                <span>
                  {tr
                    ? 'Kurumsal finans, hazine, değerleme ve C-level karar desteği'
                    : 'Corporate finance, treasury, valuation & boardroom counsel'}
                </span>
              </div>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link href={href(locale, 'education')} className="bridge-link-row">
              <GraduationCap
                size={20}
                className="gold-icon"
                aria-hidden="true"
              />
              <div>
                <strong>{tr ? 'Finans Akademisi' : 'Finance Academy'}</strong>
                <span>
                  {tr
                    ? 'Canlı makroekonomi, şirket değerleme ve kurum içi atölyeler'
                    : 'Live macroeconomics, valuation & custom corporate cohorts'}
                </span>
              </div>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link href={href(locale, 'articles')} className="bridge-link-row">
              <TrendingUp size={20} className="gold-icon" aria-hidden="true" />
              <div>
                <strong>{tr ? 'Yazılar & Analizler' : 'Articles & Analysis'}</strong>
                <span>
                  {tr
                    ? 'Küresel ekonomi, piyasalar ve strateji üzerine derinlemesine notlar'
                    : 'In-depth commentary on the global economy and financial markets'}
                </span>
              </div>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
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

  const pathways = tr
    ? [
        {
          icon: Building2,
          title: 'Kurumsal Danışmanlık & Ön Görüşme',
          desc: 'Sermaye yapısı, hazine/risk yönetimi veya yönetim kurulu danışmanlığı için gizli ön toplantı talep edin.',
          subject: 'Danışmanlık Talebi — Ön Görüşme',
        },
        {
          icon: GraduationCap,
          title: 'Eğitim Ön Kayıt & Kurumsal Teklif',
          desc: 'Masterclass dönem takvimi, örnek müfredat veya şirket içi grup eğitimi için bilgi alın.',
          subject: 'Finans Akademisi — Kayıt / Bilgi Talebi',
        },
        {
          icon: TrendingUp,
          title: 'Basın, Konuşma & Editoryal İletişim',
          desc: 'Konferans konuşmaları, medya değerlendirmeleri veya yayınlara dair okuyucu soruları.',
          subject: 'Medya & Editoryal İletişim',
        },
      ]
    : [
        {
          icon: Building2,
          title: 'Corporate Advisory & Discovery Call',
          desc: 'Request a confidential introductory meeting for corporate finance, treasury risk or boardroom counsel.',
          subject: 'Advisory Inquiry — Discovery Call',
        },
        {
          icon: GraduationCap,
          title: 'Academy Registration & Corporate Cohorts',
          desc: 'Enquire about upcoming masterclass dates, sample syllabi or custom in-house workshops.',
          subject: 'Finance Academy — Registration / Enquiry',
        },
        {
          icon: TrendingUp,
          title: 'Media, Speaking & Editorial',
          desc: 'Keynote invitations, press commentary and reader correspondence regarding published research.',
          subject: 'Media & Editorial Enquiry',
        },
      ];

  return (
    <div className="subpage-shell">
      <section className="subpage-hero">
        <div className="container subpage-hero-inner">
          <div className="subpage-hero-copy">
            <h1>{t.nav.contact}</h1>
            <p className="subpage-hero-lead">
              {tr
                ? 'Kurumsal danışmanlık, yönetici eğitimleri, medya talepleri veya analizler hakkında gizlilik esaslı doğrudan iletişime geçebilirsiniz.'
                : 'Reach out directly and confidentially for corporate advisory, executive finance programmes, speaking engagements or editorial enquiries.'}
            </p>
          </div>
        </div>
      </section>

      <section className="subpage-section bg-white">
        <div className="container contact-split-layout">
          <div className="contact-primary-column">
            {selectedTopic ? (
              <div className="inquiry-context-banner">
                <span className="inquiry-context-label">{topicTypeLabel}</span>
                <p className="inquiry-context-title">{selectedTopic}</p>
                <p className="inquiry-context-note">
                  {tr
                    ? 'Aşağıdaki e-posta bağlantısına tıkladığınızda konu başlığı otomatik olarak doldurulacaktır.'
                    : 'Clicking the email button below pre-fills the subject line for this inquiry.'}
                </p>
              </div>
            ) : null}

            <h2 className="section-heading-serif">
              {tr ? 'Doğrudan E-Posta & Kanallar' : 'Direct Channels'}
            </h2>
            <p className="section-lead-text">
              {tr
                ? 'Tüm kurumsal ve bireysel talepler doğrudan değerlendirilir ve en geç 2 iş günü içinde yanıtlanır.'
                : 'All corporate and individual enquiries are reviewed directly and answered within two business days.'}
            </p>

            {email && mailtoHref ? (
              <div className="contact-direct-actions">
                <a className="button-navy" href={mailtoHref}>
                  <Mail size={17} aria-hidden="true" />
                  <span>{email}</span>
                </a>
                {linkedin ? (
                  <a
                    className="text-secondary-link"
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="notice">
                {tr
                  ? 'İletişim e-posta adresi henüz yayınlanmadı.'
                  : 'The contact email has not been published yet.'}
              </p>
            )}
          </div>

          <div className="contact-pathways-column">
            <h3>{tr ? 'Konuya Göre Hızlı İletişim' : 'Select an Enquiry Topic'}</h3>
            <div className="contact-pathways-list">
              {pathways.map((item) => {
                const Icon = item.icon;
                const pathwayHref = email
                  ? `mailto:${email}?subject=${encodeURIComponent(item.subject)}`
                  : '#';
                return (
                  <a key={item.title} href={pathwayHref} className="pathway-row">
                    <Icon size={19} className="gold-icon" aria-hidden="true" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
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
