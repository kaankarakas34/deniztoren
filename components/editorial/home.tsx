import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  Clock,
  GraduationCap,
  Layers,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  getAbout,
  getHome,
  getMedia,
  getPosts,
  getSettings,
} from '@/lib/content';
import { textFor } from '@/lib/copy';
import {
  categoryNames,
  formatDate,
  href,
  safeExternalUrl,
  type Locale,
} from '@/lib/site';
import { EditorialIntro } from '@/components/motion/editorial-intro';
import { Newsletter } from './newsletter';
import { storyHref } from './story-card';

export async function EditorialHome({ locale }: { locale: Locale }) {
  const [home, posts, settings, media, about] = await Promise.all([
    getHome(locale),
    getPosts(locale),
    getSettings(),
    getMedia(locale),
    getAbout(locale),
  ]);
  const t = textFor(locale);
  const tr = locale === 'tr';
  const featured = posts.find((post) => post.entry.featured) ?? posts[0];
  const latest = posts
    .filter((post) => post.slug !== featured?.slug)
    .slice(0, 4);
  const newsletter = safeExternalUrl(settings?.newsletterUrl);
  const portrait = home?.heroPortrait || about?.portrait;
  const portraitAlt = home?.heroPortrait
    ? home.heroPortraitAlt
    : about?.portraitAlt;

  const defaultServices = tr
    ? [
        {
          title: 'Stratejik Finans & Yatırım Danışmanlığı',
          tag: 'Öne Çıkan · Yönetici Danışmanlığı',
          description:
            'Sermaye yapısının optimize edilmesi, yatırım fizibilite çalışmaları, şirket değerlemesi ve büyüme kararlarında üst düzey finansal ortaklık.',
          deliverables: [
            'Dinamik finansal modelleme ve senaryo simülasyonları',
            'Yatırım fizibilitesi ve şirket değerleme analizi',
            'Çalışma sermayesi ve nakit akış optimizasyonu',
          ],
          actionText: 'Görüşme Talep Edin',
        },
        {
          title: 'Kurumsal Hazine & Finansal Risk Yönetimi',
          tag: 'Hazine & Risk Mimarisi',
          description:
            'Döviz kurları, faiz oranları ve likidite dalgalanmalarına karşı şirketinizi koruyan proaktif risk yönetimi modelleri.',
          deliverables: [
            'Şirkete özel kur ve faiz risk haritası tespiti',
            'Türev ürünler ve korunma (hedging) stratejileri',
            'Kurumsal hazine yönetmeliği ve nakit güvencesi',
          ],
          actionText: 'Teklif & Detay Alın',
        },
        {
          title: 'Yönetim Kurulu & C-Level Karar Desteği',
          tag: 'Stratejik Akıl & Mentörlük',
          description:
            'CEO, CFO ve Yönetim Kurulları için makroekonomik trendler, küresel dengeler ve kritik eşiklerde bağımsız stratejik akıl.',
          deliverables: [
            'Aylık makroekonomik yönetici brifingi',
            'Yönetim kurulu toplantılarına bağımsız katılım',
            'Belirsizlik ve piyasa şokları dönemi kriz masası',
          ],
          actionText: 'Görüşme Planlayın',
        },
      ]
    : [
        {
          title: 'Strategic Corporate Advisory & Valuation',
          tag: 'Flagship · Executive Advisory',
          description:
            'Optimising capital structure, investment appraisal, corporate valuation, and strategic growth financing for enterprises.',
          deliverables: [
            'Dynamic financial modeling and scenario stress-testing',
            'Investment feasibility and valuation analysis',
            'Working capital and cash-flow optimization',
          ],
          actionText: 'Request a Consultation',
        },
        {
          title: 'Corporate Treasury & Financial Risk Management',
          tag: 'Treasury & Risk Architecture',
          description:
            'Proactive risk management architectures shielding your corporate balance sheet against FX volatility and interest rate shocks.',
          deliverables: [
            'Tailored corporate FX and interest rate risk mapping',
            'Derivative instruments and strategic hedging execution',
            'Treasury policy architecture and liquidity safeguards',
          ],
          actionText: 'Request Proposal',
        },
        {
          title: 'Boardroom & C-Level Strategic Counsel',
          tag: 'Strategic Counsel',
          description:
            'Independent macro counsel and decision-support for CEOs, CFOs, and Boards navigating geopolitical and market transitions.',
          deliverables: [
            'Monthly macroeconomic executive briefings',
            'Independent advisory participation in board meetings',
            'Crisis decision-support during market disruptions',
          ],
          actionText: 'Schedule a Meeting',
        },
      ];

  const defaultCourses = tr
    ? [
        {
          title: 'Makroekonomi & Küresel Piyasaları Okuma Masterclass',
          tag: 'Yeni Dönem · Canlı & İnteraktif',
          duration: '4 Hafta · 16 Saat · Canlı Online',
          targetAudience: 'Yatırımcılar, Finans Yöneticileri, Analistler',
          description:
            'Merkez bankaları bilançoları, faiz döngüleri, küresel likidite akımları ve döviz-emtia hareketlerini profesyonel bir fon yöneticisi gözüyle okumayı öğrenin.',
          curriculum: [
            'Fed, ECB ve TCMB Faiz & Likidite Politikaları',
            'Enflasyon, Getiri Eğrisi (Yield Curve) ve Varlık Fiyatlaması',
            'Canlı Piyasa Verileriyle Makro Senaryo Simülasyonu',
          ],
          actionText: 'Müfredatı Gör & Ön Kayıt Ol',
        },
        {
          title: 'Kurumsal Finans, Şirket Değerleme ve Modelleme',
          tag: 'Yönetici Serisi · Uygulamalı Excel',
          duration: '3 Hafta · 12 Saat · Uygulamalı Atölye',
          targetAudience: 'CFO’lar, Finans Müdürleri, Şirket Ortakları',
          description:
            'Bir şirketin gerçek değerini hesaplama, bilanço dinamiklerini analiz etme ve yatırım fizibilitesini profesyonelce modelleme yetkinliği kazanın.',
          curriculum: [
            'İndirgenmiş Nakit Akımları (DCF) ve Çarpanlar Yöntemi',
            'Şirket Birleşmeleri (M&A) ve Sinerji Modellemesi',
            'Çalışma Sermayesi ve Sermaye Maliyeti (WACC) Hesabı',
          ],
          actionText: 'Müfredatı Gör & Ön Kayıt Ol',
        },
        {
          title: 'Kurumlara Özel Finans Eğitimi & Şirket İçi Atölyeler',
          tag: 'Kurumsal Çözüm · Hibrit',
          duration: 'Özel Takvim · Şirketinize Uyarlanmış',
          targetAudience: 'Yönetim Ekipleri, Hazine ve Finans Dışı Yöneticiler',
          description:
            'Şirketinizin kendi mali tabloları ve sektör dinamikleri üzerinden kurgulanan; karar kalitesini ve finansal okuryazarlığı artıran kurumsal program.',
          curriculum: [
            'Finans Dışı Yöneticiler İçin Bilanço ve Kârlılık Okuma',
            'Departman Bütçeleri ve Nakit Akışı Yönetimi',
            'Risk Farkındalığı ve Kriz Dönemi Karar Alma Simülasyonu',
          ],
          actionText: 'Kurumsal Teklif İsteyin',
        },
      ]
    : [
        {
          title: 'Macroeconomics & Global Markets Masterclass',
          tag: 'New Cohort · Live & Interactive',
          duration: '4 Weeks · 16 Hours · Live Cohort',
          targetAudience: 'Investors, Finance Directors, Analysts',
          description:
            'Learn to interpret central bank balance sheets, interest rate regimes, global liquidity cycles and asset pricing like an institutional investor.',
          curriculum: [
            'Fed, ECB & Emerging Market Central Bank Mechanics',
            'Inflation Dynamics, Yield Curves & Asset Valuation',
            'Live Market Data & Real-Time Macro Scenario Modeling',
          ],
          actionText: 'View Syllabus & Register',
        },
        {
          title: 'Corporate Finance, Business Valuation & Modeling',
          tag: 'Executive Series · Hands-on Excel',
          duration: '3 Weeks · 12 Hours · Workshop',
          targetAudience: 'CFOs, Finance Managers, Founders',
          description:
            'Master intrinsic enterprise valuation, balance sheet forensics, and actionable investment decision modeling with real corporate cases.',
          curriculum: [
            'Discounted Cash Flow (DCF) & Multiples Valuation',
            'M&A Financial Architecture & Synergy Modeling',
            'Working Capital Management & Cost of Capital (WACC)',
          ],
          actionText: 'View Syllabus & Register',
        },
        {
          title: 'Custom Corporate Finance Training & Workshops',
          tag: 'Corporate Cohorts · Hybrid',
          duration: 'Flexible Schedule · Tailored Curriculum',
          targetAudience: 'Executive Teams, Treasury & Non-Finance Leaders',
          description:
            'Built around your own corporate balance sheet and industry dynamics to sharpen decision quality and financial intelligence across teams.',
          curriculum: [
            'Financial Statement & Profitability Mastery for Non-Finance Leaders',
            'Departmental Budgeting & Cash-Flow Discipline',
            'Risk Awareness & Crisis Management Simulation',
          ],
          actionText: 'Request Corporate Proposal',
        },
      ];

  const services = home?.services?.length ? home.services : defaultServices;
  const courses = home?.courses?.length ? home.courses : defaultCourses;
  const [flagshipCourse, ...secondaryCourses] = courses;

  return (
    <div className="executive-home">
      {/* 1. HERO SECTION */}
      <section className="executive-hero" aria-labelledby="home-heading">
        {/* Ultra-subtle institutional financial chart & coordinate grid backdrop */}
        <svg
          className="hero-financial-backdrop"
          viewBox="0 0 1440 680"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="heroChartFill"
              x1="0"
              y1="140"
              x2="0"
              y2="680"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#B99562" stopOpacity="0.16" />
              <stop offset="55%" stopColor="#B99562" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#172B45" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="heroChartStroke"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#B99562" stopOpacity="0.04" />
              <stop offset="45%" stopColor="#B99562" stopOpacity="0.26" />
              <stop offset="85%" stopColor="#BFD5E6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#BFD5E6" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient
              id="heroFadeMaskGrad"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="38%" stopColor="white" stopOpacity="0.55" />
              <stop offset="78%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.45" />
            </linearGradient>
            <mask id="heroFadeMask">
              <rect width="1440" height="680" fill="url(#heroFadeMaskGrad)" />
            </mask>
            <pattern
              id="heroGridPattern"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 72 0 L 0 0 0 72"
                fill="none"
                stroke="#BFD5E6"
                strokeWidth="0.6"
                strokeOpacity="0.08"
              />
            </pattern>
          </defs>

          <g mask="url(#heroFadeMask)">
            {/* Subtle Coordinate Grid */}
            <rect width="1440" height="680" fill="url(#heroGridPattern)" />

            {/* Subtle Volume / Market Breadth Bars along lower horizon */}
            <g fill="#BFD5E6" fillOpacity="0.06">
              <rect x="420" y="612" width="6" height="68" />
              <rect x="444" y="628" width="6" height="52" />
              <rect x="468" y="596" width="6" height="84" />
              <rect x="492" y="618" width="6" height="62" />
              <rect x="516" y="582" width="6" height="98" />
              <rect x="540" y="604" width="6" height="76" />
              <rect x="564" y="566" width="6" height="114" />
              <rect x="588" y="592" width="6" height="88" />
              <rect x="612" y="610" width="6" height="70" />
              <rect x="636" y="574" width="6" height="106" />
              <rect x="660" y="552" width="6" height="128" />
              <rect x="684" y="586" width="6" height="94" />
              <rect x="708" y="544" width="6" height="136" />
              <rect x="732" y="568" width="6" height="112" />
              <rect x="756" y="528" width="6" height="152" />
              <rect x="780" y="556" width="6" height="124" />
              <rect x="804" y="514" width="6" height="166" />
              <rect x="828" y="542" width="6" height="138" />
              <rect x="852" y="572" width="6" height="108" />
              <rect x="876" y="534" width="6" height="146" />
              <rect x="900" y="502" width="6" height="178" />
              <rect x="924" y="526" width="6" height="154" />
              <rect x="948" y="488" width="6" height="192" />
              <rect x="972" y="516" width="6" height="164" />
              <rect x="996" y="540" width="6" height="140" />
              <rect x="1020" y="496" width="6" height="184" />
              <rect x="1044" y="472" width="6" height="208" />
              <rect x="1068" y="508" width="6" height="172" />
              <rect x="1092" y="464" width="6" height="216" />
              <rect x="1116" y="492" width="6" height="188" />
              <rect x="1140" y="520" width="6" height="160" />
              <rect x="1164" y="478" width="6" height="202" />
              <rect x="1188" y="454" width="6" height="226" />
              <rect x="1212" y="488" width="6" height="192" />
              <rect x="1236" y="446" width="6" height="234" />
              <rect x="1260" y="472" width="6" height="208" />
              <rect x="1284" y="438" width="6" height="242" />
              <rect x="1308" y="468" width="6" height="212" />
              <rect x="1332" y="496" width="6" height="184" />
              <rect x="1356" y="458" width="6" height="222" />
            </g>

            {/* Primary Macro Trend Curve + Soft Area Fill */}
            <path
              d="M0 548 L112 522 L218 536 L332 478 L440 494 L552 426 L660 442 L776 364 L888 386 L1004 294 L1116 318 L1238 228 L1344 246 L1440 176 L1440 680 L0 680 Z"
              fill="url(#heroChartFill)"
            />
            <path
              d="M0 548 L112 522 L218 536 L332 478 L440 494 L552 426 L660 442 L776 364 L888 386 L1004 294 L1116 318 L1238 228 L1344 246 L1440 176"
              stroke="url(#heroChartStroke)"
              strokeWidth="1.5"
            />

            {/* Secondary Yield Curve / Moving Average Dashed Line */}
            <path
              d="M0 584 Q240 540 480 488 T960 356 T1440 232"
              stroke="#BFD5E6"
              strokeOpacity="0.16"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* Discreet Data Nodes along the Primary Curve */}
            <g fill="#B99562" fillOpacity="0.38">
              <circle cx="552" cy="426" r="2.5" />
              <circle cx="776" cy="364" r="2.5" />
              <circle cx="1004" cy="294" r="3" />
              <circle cx="1238" cy="228" r="2.5" />
            </g>
            <g stroke="#B99562" strokeOpacity="0.2" strokeWidth="0.75">
              <line x1="776" y1="350" x2="776" y2="378" />
              <line x1="762" y1="364" x2="790" y2="364" />
              <line x1="1004" y1="278" x2="1004" y2="310" />
              <line x1="988" y1="294" x2="1020" y2="294" />
            </g>
          </g>
        </svg>

        <div className="executive-hero-inner container">
          <EditorialIntro>
            <h1 id="home-heading" className="hero-title">
              {home?.headline ||
                (tr
                  ? 'Finansal Kararlarda Stratejik Netlik,\nGüncel Piyasa Analizleri ve İleri Düzey Eğitimler.'
                  : 'Strategic Financial Clarity,\nActionable Macro Insights & Executive Academy.')}
            </h1>

            <p className="hero-intro">
              {home?.intro ||
                (tr
                  ? 'Küresel piyasalarda yönü doğru tayin etmek için derinlikli analizler; şirketiniz için kurumsal finans danışmanlığı; kariyeriniz ve yatırımlarınız için yönetici düzeyinde eğitim programları.'
                  : 'In-depth research to navigate global financial markets; executive corporate advisory for institutions; rigorous masterclasses designed for decision-makers and investors.')}
            </p>

            <div className="hero-actions">
              <a className="button-gold" href="#services">
                {tr ? 'Danışmanlık Hizmetleri' : 'Consulting Services'}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="button-secondary-light" href="#education">
                <GraduationCap size={17} aria-hidden="true" />
                {tr ? 'Eğitim Programları' : 'Executive Academy'}
              </a>
              <a className="hero-text-link" href="#news">
                {tr ? 'Son Piyasa Analizleri' : 'Latest Market Insights'}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="hero-capabilities">
              <span className="cap-item">
                <Building2 size={15} className="cap-icon" aria-hidden="true" />
                {tr ? 'Kurumsal Danışmanlık' : 'Corporate Advisory'}
              </span>
              <span className="cap-sep" aria-hidden="true">
                ·
              </span>
              <span className="cap-item">
                <GraduationCap
                  size={15}
                  className="cap-icon"
                  aria-hidden="true"
                />
                {tr ? 'Finans Akademisi' : 'Finance Academy'}
              </span>
              <span className="cap-sep" aria-hidden="true">
                ·
              </span>
              <span className="cap-item">
                <TrendingUp size={15} className="cap-icon" aria-hidden="true" />
                {tr ? 'Makro & Piyasa Yayını' : 'Macro Research'}
              </span>
            </div>
          </EditorialIntro>

          {/* Right Column: Portrait or Architectural Guilloche Monogram Plate */}
          <div className="hero-visual-column">
            {portrait ? (
              <figure className="portrait-frame">
                <Image
                  src={portrait}
                  alt={portraitAlt || 'Deniz Tören'}
                  fill
                  sizes="(max-width: 760px) 100vw, 440px"
                  className="portrait-image"
                  priority
                />
                <figcaption className="portrait-caption">
                  <strong>Deniz Tören</strong>
                  <span>
                    {tr
                      ? 'Finansal Danışman & Yazar'
                      : 'Financial Advisor & Writer'}
                  </span>
                </figcaption>
              </figure>
            ) : (
              <div className="dossier-plate">
                {/* Subtle Guilloche Financial Engraving SVG */}
                <svg
                  className="dossier-guilloche"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="320"
                    cy="80"
                    r="160"
                    stroke="currentColor"
                    strokeWidth="0.6"
                  />
                  <circle
                    cx="320"
                    cy="80"
                    r="130"
                    stroke="currentColor"
                    strokeWidth="0.6"
                  />
                  <circle
                    cx="320"
                    cy="80"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="0.6"
                  />
                  <circle
                    cx="320"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="0.6"
                  />
                  <line
                    x1="0"
                    y1="260"
                    x2="400"
                    y2="260"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>

                <div className="dossier-top">
                  <div className="dossier-seal" aria-hidden="true">
                    DT
                  </div>
                  <div className="dossier-identity">
                    <strong>Deniz Tören</strong>
                    <span>
                      {tr
                        ? 'Danışmanlık · Akademi · Yayın'
                        : 'Advisory · Academy · Research'}
                    </span>
                  </div>
                </div>

                <nav
                  className="dossier-index"
                  aria-label={tr ? 'Hızlı erişim' : 'Quick navigation'}
                >
                  <a href="#services" className="dossier-row">
                    <div>
                      <span className="dossier-row-title">
                        {tr
                          ? 'Kurumsal Finans & Risk'
                          : 'Corporate Finance & Risk'}
                      </span>
                      <span className="dossier-row-sub">
                        {tr
                          ? 'Sermaye yapısı, hazine ve C-level karar desteği'
                          : 'Capital structure, treasury & boardroom counsel'}
                      </span>
                    </div>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <a href="#education" className="dossier-row">
                    <div>
                      <span className="dossier-row-title">
                        {tr
                          ? 'Yönetici Finans Akademisi'
                          : 'Executive Finance Academy'}
                      </span>
                      <span className="dossier-row-sub">
                        {tr
                          ? 'Canlı makroekonomi, değerleme ve kurum içi atölyeler'
                          : 'Live macroeconomics, valuation & corporate cohorts'}
                      </span>
                    </div>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <a href="#news" className="dossier-row">
                    <div>
                      <span className="dossier-row-title">
                        {tr
                          ? 'Güncel Piyasa Analizleri'
                          : 'Market Analysis & News'}
                      </span>
                      <span className="dossier-row-sub">
                        {tr
                          ? 'Merkez bankaları, küresel likidite ve strateji notları'
                          : 'Central banks, global liquidity & strategy briefs'}
                      </span>
                    </div>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. HİZMETLER — STICKY CONSULTING PRACTICE ARCHITECTURE (WHITE SURFACE) */}
      <section
        className="practice-section"
        id="services"
        aria-labelledby="services-heading"
      >
        <div className="practice-layout container">
          <div className="practice-sticky-lead">
            <h2 id="services-heading" className="section-heading-serif">
              {tr
                ? 'Karmaşık Finansal Kararlarınızda Güvenilir Stratejik Ortaklık'
                : 'Trusted Strategic Partnership for High-Stakes Financial Decisions'}
            </h2>
            <p className="section-lead-text">
              {home?.servicesIntro ||
                (tr
                  ? 'Şirketinizin sermaye yapısından kur risklerine, yatırım kararlarından yönetim kurulu stratejilerine kadar bağımsız ve ölçülebilir finansal rehberlik.'
                  : 'Independent, measurable guidance spanning capital allocation, currency exposure, investment valuation and boardroom foresight.')}
            </p>
            <div className="practice-lead-cta">
              <Link className="button-navy" href={href(locale, 'contact')}>
                {tr ? 'Gizlilik Esaslı Ön Görüşme' : 'Book Confidential Call'}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <span className="practice-lead-note">
                {tr
                  ? 'Kurumlara ve üst düzey yöneticilere özel çalışma modeli'
                  : 'Tailored engagements for enterprises & C-suite leaders'}
              </span>
            </div>
          </div>

          <div className="practice-list">
            {services.map((service, index) => {
              const deliverables =
                'deliverables' in service && Array.isArray(service.deliverables)
                  ? service.deliverables
                  : (defaultServices[index % defaultServices.length]
                      ?.deliverables ?? []);
              const tag =
                'tag' in service && typeof service.tag === 'string'
                  ? service.tag
                  : (defaultServices[index % defaultServices.length]?.tag ??
                    (tr ? 'Danışmanlık' : 'Advisory'));
              const actionText =
                'actionText' in service && typeof service.actionText === 'string'
                  ? service.actionText
                  : tr
                    ? 'Görüşme Talep Edin'
                    : 'Request Consultation';
              const isFlagship = index === 0;

              return (
                <article
                  key={service.title}
                  className={`practice-item${isFlagship ? ' practice-item-flagship' : ''}`}
                >
                  <div className="practice-item-head">
                    <span className="practice-tag">{tag}</span>
                  </div>
                  <h3 className="practice-item-title">{service.title}</h3>
                  <p className="practice-item-desc">{service.description}</p>

                  <ul className="practice-deliverables">
                    {deliverables.map((item) => (
                      <li key={item}>
                        <Check
                          size={15}
                          className="practice-check"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    className="practice-action-link"
                    href={`${href(locale, 'contact')}?service=${encodeURIComponent(service.title)}`}
                  >
                    <span>{actionText}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FİNANS AKADEMİSİ — FLAGSHIP + 2-UP SHOWCASE (DEEP NAVY SURFACE) */}
      <section
        className="academy-section"
        id="education"
        aria-labelledby="education-heading"
      >
        <div className="container">
          <div className="academy-header">
            <h2 id="education-heading" className="section-heading-serif light">
              {home?.educationTitle ||
                (tr
                  ? 'Karar Vericiler ve Profesyoneller İçin İleri Düzey Finans Programları'
                  : 'Executive Finance Programmes for Leaders & Investors')}
            </h2>
            <p className="section-lead-text light">
              {home?.educationIntro ||
                (tr
                  ? 'Teoriden uzak, doğrudan gerçek piyasa verileri, bilanço analizleri ve canlı vaka simülasyonlarıyla zenginleştirilmiş uygulamalı eğitimler.'
                  : 'Rigorous masterclasses grounded in real market dynamics, balance sheet forensics, and live scenario simulations.')}
            </p>
          </div>

          {/* Flagship Masterclass Full-Width Feature */}
          {flagshipCourse ? (
            <article className="academy-flagship">
              <div className="flagship-main">
                <div className="course-meta-row">
                  <span className="course-pill-gold">
                    {'tag' in flagshipCourse &&
                    typeof flagshipCourse.tag === 'string'
                      ? flagshipCourse.tag
                      : tr
                        ? 'Yeni Dönem · Canlı'
                        : 'New Cohort · Live'}
                  </span>
                  <span className="course-meta-chip">
                    <Clock size={14} aria-hidden="true" />
                    {'duration' in flagshipCourse &&
                    typeof flagshipCourse.duration === 'string'
                      ? flagshipCourse.duration
                      : '4 Hafta · 16 Saat'}
                  </span>
                </div>

                <h3 className="flagship-title">{flagshipCourse.title}</h3>
                <p className="flagship-desc">{flagshipCourse.description}</p>

                <div className="flagship-audience">
                  <Users size={15} className="gold-icon" aria-hidden="true" />
                  <span>
                    {'targetAudience' in flagshipCourse &&
                    typeof flagshipCourse.targetAudience === 'string'
                      ? flagshipCourse.targetAudience
                      : tr
                        ? 'Yatırımcılar, Finans Yöneticileri, Analistler'
                        : 'Investors, Finance Directors, Analysts'}
                  </span>
                </div>

                <div className="flagship-actions">
                  <Link
                    className="button-gold"
                    href={`${href(locale, 'contact')}?course=${encodeURIComponent(flagshipCourse.title)}`}
                  >
                    {'actionText' in flagshipCourse &&
                    typeof flagshipCourse.actionText === 'string'
                      ? flagshipCourse.actionText
                      : tr
                        ? 'Müfredatı Gör & Ön Kayıt Ol'
                        : 'View Syllabus & Register'}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <Link
                    className="academy-secondary-link"
                    href={`${href(locale, 'contact')}?course=${encodeURIComponent(flagshipCourse.title)}&intent=syllabus`}
                  >
                    <BookOpen size={15} aria-hidden="true" />
                    {tr ? 'Örnek Müfredat Talep Et' : 'Request Sample Syllabus'}
                  </Link>
                </div>
              </div>

              <div className="flagship-syllabus">
                <h4 className="syllabus-heading">
                  {tr ? 'Program Kapsamı ve Modüller' : 'Programme Curriculum'}
                </h4>
                <ul className="syllabus-list">
                  {(
                    ('curriculum' in flagshipCourse &&
                    Array.isArray(flagshipCourse.curriculum)
                      ? flagshipCourse.curriculum
                      : defaultCourses[0].curriculum) ?? []
                  ).map((topic) => (
                    <li key={topic}>
                      <Check
                        size={16}
                        className="gold-icon"
                        aria-hidden="true"
                      />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ) : null}

          {/* Secondary Two Courses Split */}
          {secondaryCourses.length ? (
            <div className="academy-secondary-grid">
              {secondaryCourses.map((course, idx) => {
                const fallback =
                  defaultCourses[(idx + 1) % defaultCourses.length];
                const curriculum =
                  'curriculum' in course && Array.isArray(course.curriculum)
                    ? course.curriculum
                    : fallback.curriculum;
                const tag =
                  'tag' in course && typeof course.tag === 'string'
                    ? course.tag
                    : fallback.tag;
                const duration =
                  'duration' in course && typeof course.duration === 'string'
                    ? course.duration
                    : fallback.duration;
                const audience =
                  'targetAudience' in course &&
                  typeof course.targetAudience === 'string'
                    ? course.targetAudience
                    : fallback.targetAudience;
                const actionText =
                  'actionText' in course &&
                  typeof course.actionText === 'string'
                    ? course.actionText
                    : fallback.actionText;

                return (
                  <article key={course.title} className="academy-course-item">
                    <div className="course-meta-row">
                      <span className="course-pill-subtle">{tag}</span>
                      <span className="course-meta-chip">
                        <Clock size={13} aria-hidden="true" />
                        {duration}
                      </span>
                    </div>

                    <h3 className="secondary-course-title">{course.title}</h3>
                    <p className="secondary-course-desc">
                      {course.description}
                    </p>

                    <div className="secondary-course-audience">
                      <Users
                        size={14}
                        className="gold-icon"
                        aria-hidden="true"
                      />
                      <span>{audience}</span>
                    </div>

                    <ul className="secondary-syllabus-list">
                      {curriculum.map((topic) => (
                        <li key={topic}>
                          <Check
                            size={15}
                            className="gold-icon"
                            aria-hidden="true"
                          />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      className="secondary-course-cta"
                      href={`${href(locale, 'contact')}?course=${encodeURIComponent(course.title)}`}
                    >
                      <span>{actionText}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : null}

          {/* Academy Guarantee Bar */}
          <div className="academy-trust-bar">
            <div className="trust-item">
              <ShieldCheck size={18} className="gold-icon" aria-hidden="true" />
              <span>
                {tr
                  ? 'Deniz Tören Onaylı Katılım Sertifikası'
                  : 'Verified Certificate of Completion'}
              </span>
            </div>
            <div className="trust-item">
              <Layers size={18} className="gold-icon" aria-hidden="true" />
              <span>
                {tr
                  ? 'Gerçek Vaka Analizleri & Excel Modelleri'
                  : 'Real Case Studies & Excel Models'}
              </span>
            </div>
            <div className="trust-item">
              <Users size={18} className="gold-icon" aria-hidden="true" />
              <span>
                {tr
                  ? 'Canlı Soru-Cevap & Doğrudan Etkileşim'
                  : 'Live Q&A & Direct Instructor Access'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GÜNCEL HABERLER & ANALİZLER — ASYMMETRIC EDITORIAL JOURNAL (IVORY SURFACE) */}
      <section
        className="journal-editorial-section"
        id="news"
        aria-labelledby="news-heading"
      >
        <div className="container">
          <div className="editorial-section-header">
            <div>
              <h2 id="news-heading" className="section-heading-serif">
                {tr
                  ? 'Haberler, Piyasa Yorumları ve Analizler'
                  : 'News, Market Commentary & Analysis'}
              </h2>
              <div className="category-filter-row">
                {(
                  [
                    'global-economy',
                    'corporate-finance',
                    'perspectives',
                    'book-notes',
                  ] as const
                ).map((cat) => (
                  <Link
                    key={cat}
                    href={`${href(locale, 'articles')}?category=${cat}`}
                    className="cat-link-pill"
                  >
                    {categoryNames[locale][cat]}
                  </Link>
                ))}
              </div>
            </div>
            <Link className="archive-inline-link" href={href(locale, 'articles')}>
              <span>{tr ? 'Tüm Yazı Arşivi' : 'Full Archive'}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          {featured ? (
            <div className="editorial-asymmetric-grid">
              {/* Left 62%: Lead Feature Article */}
              <article className="editorial-lead-story">
                <Link
                  href={storyHref(featured)}
                  className="editorial-lead-media"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {featured.entry.coverImage ? (
                    <Image
                      src={featured.entry.coverImage}
                      alt={featured.entry.coverAlt || ''}
                      fill
                      sizes="(max-width: 900px) 100vw, 60vw"
                      className="editorial-lead-img"
                    />
                  ) : (
                    <div className="image-fallback" />
                  )}
                </Link>
                <div className="editorial-lead-body">
                  <div className="editorial-meta-line">
                    <span className="editorial-cat-label">
                      {categoryNames[locale][featured.entry.category]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {featured.entry.demo
                        ? t.demo
                        : featured.entry.publishDate
                          ? formatDate(featured.entry.publishDate, locale)
                          : ''}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {featured.entry.estimatedReadingMinutes} {t.min}
                    </span>
                  </div>
                  <h3 className="editorial-lead-title">
                    <Link href={storyHref(featured)}>
                      {featured.entry.title}
                    </Link>
                  </h3>
                  <p className="editorial-lead-excerpt">
                    {featured.entry.excerpt}
                  </p>
                  <Link
                    className="editorial-read-cta"
                    href={storyHref(featured)}
                  >
                    <span>
                      {tr ? 'Analizin Tamamını Oku' : 'Read Full Analysis'}
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>

              {/* Right 38%: Scannable Briefing Rail (FT Style) */}
              <div className="editorial-briefing-rail">
                <div className="briefing-rail-header">
                  <span>{tr ? 'Güncel Notlar' : 'Latest Dispatches'}</span>
                </div>
                <div className="briefing-list">
                  {latest.map((post) => (
                    <article key={post.slug} className="briefing-item">
                      <div className="editorial-meta-line compact">
                        <span className="editorial-cat-label">
                          {categoryNames[locale][post.entry.category]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {post.entry.estimatedReadingMinutes} {t.min}
                        </span>
                      </div>
                      <h4 className="briefing-title">
                        <Link href={storyHref(post)}>{post.entry.title}</Link>
                      </h4>
                      <p className="briefing-excerpt">{post.entry.excerpt}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="journal-empty">
              <h2>{t.noArticles}</h2>
              <p>{t.noArticlesText}</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. EDITORIAL PERSPECTIVE (CRISP WHITE SURFACE) */}
      <section
        className="perspective-band"
        aria-labelledby="perspective-heading"
      >
        <div className="container perspective-band-inner">
          <blockquote className="perspective-statement">
            <h2 id="perspective-heading">
              {tr
                ? '“Veriyi bağlamıyla okumak, farklı olasılıkları birlikte düşünmek ve büyük resmi gözden kaçırmamak.”'
                : '“Reading data in context, considering possibilities together, and never losing sight of the bigger picture.”'}
            </h2>
            <footer>— Deniz Tören</footer>
          </blockquote>

          <div className="perspective-copy">
            <p>
              {home?.editorialNote ||
                (tr
                  ? 'Finansı karmaşık terminolojiden arındırarak stratejik değere dönüştürmek, kararlarınızda rasyonel ve sağlam bir zemin inşa etmek bu yayının ve danışmanlık anlayışımın temelidir.'
                  : 'Transforming finance from opaque jargon into actionable strategic value and building a rational foundation for your decisions is the bedrock of this advisory.')}
            </p>
            <div className="perspective-links">
              <Link className="button-navy" href={href(locale, 'about')}>
                {tr ? 'Deniz Tören Hakkında' : 'About Deniz Tören'}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                className="text-secondary-link"
                href={href(locale, 'contact')}
              >
                {tr ? 'İletişime Geçin' : 'Get in Touch'}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEDIA (IF AVAILABLE) */}
      {media[0] ? (
        <section
          className="executive-media-section container"
          aria-labelledby="media-heading"
        >
          <div className="editorial-section-header">
            <h2 id="media-heading" className="section-heading-serif">
              {t.media}
            </h2>
            <Link className="archive-inline-link" href={href(locale, 'media')}>
              <span>{t.allMedia}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <Link className="journal-media-link" href={href(locale, 'media')}>
            {media[0].entry.thumbnail ? (
              <div className="journal-media-image">
                <Image
                  src={media[0].entry.thumbnail}
                  alt={media[0].entry.thumbnailAlt || ''}
                  fill
                  sizes="(max-width: 760px) 100vw, 360px"
                  className="cover-image"
                />
              </div>
            ) : null}
            <h3>{media[0].entry.title}</h3>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      ) : null}

      {/* 7. NEWSLETTER DISPATCH */}
      {newsletter ? <Newsletter locale={locale} url={newsletter} /> : null}
    </div>
  );
}
