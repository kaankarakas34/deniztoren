import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Layers,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { getHome } from '@/lib/content';
import { href, type Locale } from '@/lib/site';

export async function ServicesPage({ locale }: { locale: Locale }) {
  const home = await getHome(locale);
  const tr = locale === 'tr';

  const defaultServices = tr
    ? [
        {
          title: 'Stratejik Finans & Yatırım Danışmanlığı',
          tag: 'Öne Çıkan · Yönetici Danışmanlığı',
          audience: 'Büyüyen şirketler, yatırım aşamasındaki gruplar ve CFO ofisleri',
          description:
            'Sermaye yapısının optimize edilmesi, yatırım fizibilite çalışmaları, şirket değerlemesi ve büyüme senaryolarında üst düzey finansal karar desteği.',
          deliverables: [
            '3–5 yıllık dinamik finansal modelleme ve senaryo simülasyonları',
            'Yatırım fizibilitesi ve birleşme/satın alma (M&A) değerlemesi',
            'Çalışma sermayesi ve nakit akış yönetimi optimizasyonu',
            'Yatırımcı ve kredi komitesi sunum dosyası mimarisi',
          ],
          actionText: 'Görüşme Talep Edin',
        },
        {
          title: 'Kurumsal Hazine & Finansal Risk Yönetimi',
          tag: 'Hazine & Risk Mimarisi',
          audience: 'İhracat/ithalat yapan şirketler ve yüksek kur/faiz hassasiyetli yapılar',
          description:
            'Döviz kurları, faiz oranları ve küresel likidite dalgalanmalarına karşı bilançonuzu koruyan proaktif risk yönetimi modelleri.',
          deliverables: [
            'Şirkete özel döviz ve faiz risk haritası oluşturulması',
            'Türev ürünler ve korunma (hedging) stratejileri',
            'Kurumsal hazine yönetmeliği ve nakit koruma politikaları',
            'Banka limit ve finansman maliyeti yapılandırma değerlendirmesi',
          ],
          actionText: 'Teklif & Detay Alın',
        },
        {
          title: 'Yönetim Kurulu & C-Level Karar Desteği',
          tag: 'Stratejik Akıl & Mentörlük',
          audience: 'Yönetim kurulları, CEO’lar ve aile şirketi üst yönetimleri',
          description:
            'Üst düzey karar vericiler için makroekonomik trendler, küresel dengeler ve kritik stratejik eşiklerde bağımsız danışmanlık.',
          deliverables: [
            'Aylık makroekonomik yönetici brifingi ve piyasa projeksiyonları',
            'Yönetim kurulu toplantılarına bağımsız stratejik katılım',
            'Belirsizlik ve piyasa şokları dönemi kriz karar destek masası',
            'Üst yönetim için yıllık bütçe ve sermaye tahsisi denetimi',
          ],
          actionText: 'Görüşme Planlayın',
        },
      ]
    : [
        {
          title: 'Strategic Corporate Advisory & Valuation',
          tag: 'Flagship · Executive Advisory',
          audience: 'Scaling enterprises, investment committees and CFO offices',
          description:
            'Optimising capital structure, investment appraisal, corporate valuation, and strategic growth financing for high-stakes decisions.',
          deliverables: [
            '3–5 year dynamic financial modeling & scenario stress-testing',
            'Investment appraisal, M&A valuation & financial feasibility',
            'Working capital and cash-flow optimization',
            'Investor and credit-committee presentation architecture',
          ],
          actionText: 'Request a Consultation',
        },
        {
          title: 'Corporate Treasury & Financial Risk Management',
          tag: 'Treasury & Risk Architecture',
          audience: 'Cross-border businesses and FX/rate-sensitive balance sheets',
          description:
            'Proactive risk architectures shielding corporate balance sheets against currency volatility, interest rate spikes and liquidity shocks.',
          deliverables: [
            'Tailored corporate FX and interest rate risk mapping',
            'Derivative instruments & corporate hedging strategies',
            'Treasury guidelines, policy architecture & cash security',
            'Bank facility & funding cost structure assessment',
          ],
          actionText: 'Request Proposal',
        },
        {
          title: 'Boardroom & C-Level Strategic Counsel',
          tag: 'Strategic Counsel',
          audience: 'Boards of directors, CEOs and family enterprise principals',
          description:
            'Independent strategic insight and macro forecasting for executive leadership navigating inflection points and market transitions.',
          deliverables: [
            'Monthly macroeconomic executive briefings & market outlook',
            'Independent advisory participation in board meetings',
            'Crisis decision-support desk during macro disruptions',
            'Annual budget and capital allocation review',
          ],
          actionText: 'Schedule a Meeting',
        },
      ];

  const services = home?.services?.length
    ? home.services.map((item, idx) => ({
        ...defaultServices[idx % defaultServices.length],
        ...item,
        deliverables:
          'deliverables' in item &&
          Array.isArray(item.deliverables) &&
          item.deliverables.length
            ? item.deliverables
            : defaultServices[idx % defaultServices.length].deliverables,
      }))
    : defaultServices;

  const processSteps = tr
    ? [
        {
          step: '1',
          title: 'Gizlilik Esaslı Ön Görüşme',
          text: 'Kurumunuzun mevcut durumunu, öncelikli finansal hedeflerini ve zaman çizelgesini 30 dakikalık ön toplantıda netleştiriyoruz.',
        },
        {
          step: '2',
          title: 'Bilanço & Risk Teşhisi',
          text: 'Mevcut mali tablolar, nakit akışı, döviz/faiz maruziyeti ve sermaye maliyeti detaylı biçimde inceleniyor.',
        },
        {
          step: '3',
          title: 'Stratejik Mimari & Modelleme',
          text: 'Alternatif makro senaryolara dayalı karar modelleri, değerleme analizleri ve uygulanabilir aksiyon planı hazırlanıyor.',
        },
        {
          step: '4',
          title: 'Uygulama & Yönetim Kurulu Takibi',
          text: 'Kararların hayata geçirilmesi sürecinde üst yönetim ve finans ekibiyle düzenli gözden geçirme oturumları yürütülüyor.',
        },
      ]
    : [
        {
          step: '1',
          title: 'Confidential Discovery Call',
          text: 'A focused 30-minute conversation to clarify your balance sheet priorities, strategic goals and timeline.',
        },
        {
          step: '2',
          title: 'Balance Sheet & Risk Diagnostics',
          text: 'Comprehensive review of financial statements, cash-flow resilience, FX/rate exposure and cost of capital.',
        },
        {
          step: '3',
          title: 'Strategic Modeling & Architecture',
          text: 'Scenario-tested financial models, valuation frameworks and an actionable roadmap tailored to your governance.',
        },
        {
          step: '4',
          title: 'Execution & Boardroom Follow-Through',
          text: 'Periodic executive reviews alongside your CFO and board as market conditions evolve.',
        },
      ];

  const faqs = tr
    ? [
        {
          q: 'Danışmanlık süreci nasıl ve hangi gizlilik koşullarıyla başlar?',
          a: 'Tüm kurumsal görüşmeler karşılıklı gizlilik sözleşmesi (NDA) çerçevesinde yürütülür. İlk adım, kapsamı ve öncelikleri belirlemek için planlanan 30 dakikalık ön görüşmedir.',
        },
        {
          q: 'Proje bazlı mı yoksa sürekli (retainer) danışmanlık mı sunuyorsunuz?',
          a: 'Her iki model de mümkündür. Şirket değerleme, fizibilite veya hazine politikası kurulumu gibi çalışmalar proje bazlı; yönetim kurulu brifingleri ve C-level karar desteği ise aylık retainer modeliyle yürütülür.',
        },
        {
          q: 'Kişiye özel hisse senedi veya yatırım tavsiyesi veriyor musunuz?',
          a: 'Hayır. Tüm çalışmalar kurumsal finans, stratejik yönetim, bilanço/risk mimarisi ve makroekonomik karar çerçevesi kapsamındadır; bireysel yatırım tavsiyesi niteliği taşımaz.',
        },
      ]
    : [
        {
          q: 'How does an engagement begin and how is confidentiality handled?',
          a: 'Every corporate engagement operates under a mutual NDA. We begin with a 30-minute discovery call to define scope, deliverables and cadence.',
        },
        {
          q: 'Do you work on fixed-scope projects or ongoing retainers?',
          a: 'Both structures are available. Valuation, feasibility and treasury architecture are typically fixed-scope; boardroom briefings and C-level counsel run on monthly or quarterly retainers.',
        },
        {
          q: 'Do you provide individual stock picks or retail investment advice?',
          a: 'No. Advisory work focuses strictly on corporate finance, treasury risk management, valuation and strategic macroeconomic frameworks.',
        },
      ];

  return (
    <div className="subpage-shell">
      {/* Page Hero */}
      <section className="subpage-hero">
        <div className="container subpage-hero-inner">
          <div className="subpage-hero-copy">
            <h1>
              {tr
                ? 'Kurumsal ve Yönetici Finans Danışmanlığı'
                : 'Corporate & Executive Financial Advisory'}
            </h1>
            <p className="subpage-hero-lead">
              {home?.servicesIntro ||
                (tr
                  ? 'Sermaye yapısından hazine ve kur risklerine, yatırım kararlarından yönetim kurulu stratejilerine kadar bağımsız, ölçülebilir ve gizlilik esaslı finansal ortaklık.'
                  : 'Independent, measurable and confidential financial counsel spanning capital structure, treasury risk, valuation and boardroom strategy.')}
            </p>
            <div className="subpage-hero-actions">
              <Link className="button-gold" href={href(locale, 'contact')}>
                {tr ? 'Gizlilik Esaslı Ön Görüşme' : 'Book Confidential Call'}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                className="button-secondary-light"
                href={href(locale, 'education')}
              >
                {tr ? 'Kurumsal Eğitimleri İncele' : 'Explore Corporate Training'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Practice Areas */}
      <section className="subpage-section bg-white">
        <div className="container">
          <div className="offerings-stack">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`offering-detail-row${index === 0 ? ' offering-detail-featured' : ''}`}
              >
                <div className="offering-detail-main">
                  <span className="practice-tag">{service.tag}</span>
                  <h2>{service.title}</h2>
                  <p className="offering-detail-desc">{service.description}</p>
                  <div className="offering-audience-note">
                    <Building2
                      size={15}
                      className="gold-icon"
                      aria-hidden="true"
                    />
                    <span>{service.audience}</span>
                  </div>
                  <Link
                    className="button-navy"
                    href={`${href(locale, 'contact')}?service=${encodeURIComponent(service.title)}`}
                  >
                    {service.actionText ||
                      (tr ? 'Görüşme Talep Edin' : 'Request Consultation')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>

                <div className="offering-detail-scope">
                  <h3>{tr ? 'Kapsam ve Teslimatlar' : 'Scope & Deliverables'}</h3>
                  <ul className="offering-check-list">
                    {service.deliverables.map((item) => (
                      <li key={item}>
                        <Check
                          size={16}
                          className="practice-check"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Engagement Process */}
      <section className="subpage-section bg-ivory">
        <div className="container">
          <div className="subpage-section-head">
            <h2 className="section-heading-serif">
              {tr ? 'Çalışma Metodolojisi' : 'How We Work Together'}
            </h2>
            <p className="section-lead-text">
              {tr
                ? 'Her danışmanlık çalışması, kurumunuzun karar ritmine ve gizlilik standartlarına göre yapılandırılır.'
                : 'Every engagement is structured around your governance cadence and confidentiality standards.'}
            </p>
          </div>
          <ol className="process-grid">
            {processSteps.map((item) => (
              <li key={item.step} className="process-step">
                <span className="process-step-num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="subpage-section bg-white">
        <div className="container faq-layout">
          <div>
            <h2 className="section-heading-serif">
              {tr ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}
            </h2>
            <p className="section-lead-text">
              {tr
                ? 'Danışmanlık kapsamı, çalışma modeli ve gizlilik süreci hakkında en sık sorulan başlıklar.'
                : 'Key details on engagement scope, retainer models and confidentiality.'}
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="subpage-cta-band">
        <div className="container subpage-cta-inner">
          <div>
            <h2>
              {tr
                ? 'Kurumunuza Özel Çalışma Kapsamını Konuşalım'
                : 'Discuss a Tailored Scope for Your Organisation'}
            </h2>
            <p>
              {tr
                ? 'İlk tanışma toplantısı için doğrudan e-posta üzerinden tarih belirleyebilirsiniz.'
                : 'Reach out directly to schedule an introductory confidential discussion.'}
            </p>
          </div>
          <Link className="button-gold" href={href(locale, 'contact')}>
            {tr ? 'Ön Görüşme Planla' : 'Schedule Discovery Call'}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function AcademyPage({ locale }: { locale: Locale }) {
  const home = await getHome(locale);
  const tr = locale === 'tr';

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
            'Hafta 1: Fed, ECB ve TCMB Faiz & Likidite Mekanizmaları',
            'Hafta 2: Enflasyon Dinamikleri, Getiri Eğrisi (Yield Curve) ve Tahvil Piyasası',
            'Hafta 3: Küresel Sermaye Akımları, Döviz Kurları ve Emtia Döngüleri',
            'Hafta 4: Canlı Piyasa Verileriyle Makro Senaryo Simülasyonu & Soru-Cevap',
          ],
          actionText: 'Müfredatı Gör & Ön Kayıt Ol',
        },
        {
          title: 'Kurumsal Finans, Şirket Değerleme ve Modelleme',
          tag: 'Yönetici Serisi · Uygulamalı Excel',
          duration: '3 Hafta · 12 Saat · Uygulamalı Atölye',
          targetAudience: 'CFO’lar, Finans Müdürleri, Girişimciler',
          description:
            'Bir şirketin gerçek değerini hesaplama, bilanço dinamiklerini analiz etme ve yatırım kararlarını profesyonelce modelleme yetkinliği kazanın.',
          curriculum: [
            'Modül 1: Bilanço, Gelir Tablosu ve Nakit Akışı Bütünleşik Analizi',
            'Modül 2: İndirgenmiş Nakit Akımları (DCF), WACC ve Çarpanlar Yöntemi',
            'Modül 3: Şirket Birleşmeleri (M&A), Sinerji ve Duyarlılık Modellemesi',
          ],
          actionText: 'Müfredatı Gör & Ön Kayıt Ol',
        },
        {
          title: 'Kurumlara Özel Finans Eğitimi & Şirket İçi Atölyeler',
          tag: 'Kurumsal Özel · Yüz Yüze / Hibrit',
          duration: 'Esnek Takvim · Şirketinize Uyarlanmış',
          targetAudience: 'Yönetim Ekipleri, Hazine ve Finans Dışı Yöneticiler',
          description:
            'Şirketinizin kendi mali tabloları ve sektör dinamikleri üzerinden kurgulanan; karar kalitesini ve finansal okuryazarlığı artıran kurumsal program.',
          curriculum: [
            'Finans Dışı Yöneticiler İçin Bilanço ve Kârlılık Okuma',
            'Departman Bütçeleri, Maliyet Yapısı ve Nakit Akışı Yönetimi',
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
            'Week 1: Fed, ECB & Emerging Market Central Bank Mechanics',
            'Week 2: Inflation Dynamics, Yield Curves & Sovereign Bond Pricing',
            'Week 3: Global Capital Flows, FX Regimes & Commodity Cycles',
            'Week 4: Live Market Data & Real-Time Macro Scenario Modeling',
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
            'Module 1: Integrated Balance Sheet, P&L & Cash-Flow Forensics',
            'Module 2: Discounted Cash Flow (DCF), WACC & Multiples Valuation',
            'Module 3: M&A Financial Architecture, Synergies & Sensitivity Testing',
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
            'Departmental Budgeting, Cost Drivers & Cash-Flow Discipline',
            'Risk Awareness & Crisis Management Simulation',
          ],
          actionText: 'Request Corporate Proposal',
        },
      ];

  const courses = home?.courses?.length
    ? home.courses.map((item, idx) => ({
        ...defaultCourses[idx % defaultCourses.length],
        ...item,
        curriculum:
          'curriculum' in item &&
          Array.isArray(item.curriculum) &&
          item.curriculum.length
            ? item.curriculum
            : defaultCourses[idx % defaultCourses.length].curriculum,
      }))
    : defaultCourses;

  const faqs = tr
    ? [
        {
          q: 'Eğitimler canlı mı yoksa önceden kayıtlı video mu?',
          a: 'Tüm masterclass programları canlı ve interaktif oturumlar şeklinde yürütülür. Katılımcılar canlı oturum kayıtlarına ve kullanılan Excel çalışma dosyalarına dönem boyunca erişebilir.',
        },
        {
          q: 'Program sonunda sertifika veriliyor mu?',
          a: 'Evet. Programı tamamlayan tüm katılımcılara Deniz Tören onaylı, LinkedIn ve özgeçmişte paylaşılabilir dijital katılım sertifikası sunulur.',
        },
        {
          q: 'Şirketimizden 5+ kişilik grup kaydı veya kurum içi eğitim alabilir miyiz?',
          a: 'Evet. Kurum içi özel atölyeler şirketinizin sektörüne ve kendi finansal yapısına göre özelleştirilir; grup kayıtları için iletişim sayfasından teklif isteyebilirsiniz.',
        },
      ]
    : [
        {
          q: 'Are programmes live or pre-recorded?',
          a: 'All masterclasses are delivered as live, interactive cohorts. Participants also receive session recordings and all Excel modeling workbooks.',
        },
        {
          q: 'Is a certificate issued upon completion?',
          a: 'Yes. Participants who complete a cohort receive a verified digital certificate of completion signed by Deniz Tören.',
        },
        {
          q: 'Can we enrol a corporate team or request an in-house workshop?',
          a: 'Yes. In-house cohorts are tailored to your industry and financial statements; use the contact page to request a corporate proposal.',
        },
      ];

  return (
    <div className="subpage-shell">
      {/* Academy Hero */}
      <section className="subpage-hero">
        <div className="container subpage-hero-inner">
          <div className="subpage-hero-copy">
            <h1>
              {home?.educationTitle ||
                (tr
                  ? 'Deniz Tören Finans Akademisi'
                  : 'Deniz Tören Finance Academy')}
            </h1>
            <p className="subpage-hero-lead">
              {home?.educationIntro ||
                (tr
                  ? 'Teoriyi gerçek piyasa verileri, bilanço vakaları ve canlı simülasyonlarla buluşturan; yöneticiler, yatırımcılar ve finans ekipleri için tasarlanmış ileri düzey programlar.'
                  : 'Rigorous live programmes bridging macroeconomic theory with real market data, balance sheet cases and hands-on financial modeling.')}
            </p>
            <div className="subpage-trust-inline">
              <span>
                <ShieldCheck
                  size={16}
                  className="gold-icon"
                  aria-hidden="true"
                />
                {tr ? 'Katılım Sertifikası' : 'Verified Certificate'}
              </span>
              <span>
                <Layers size={16} className="gold-icon" aria-hidden="true" />
                {tr
                  ? 'Gerçek Vaka & Excel Modelleri'
                  : 'Live Cases & Excel Models'}
              </span>
              <span>
                <Users size={16} className="gold-icon" aria-hidden="true" />
                {tr ? 'Küçük Yönetici Grupları' : 'Small Executive Cohorts'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="subpage-section bg-white">
        <div className="container">
          <div className="offerings-stack">
            {courses.map((course, index) => (
              <article
                key={course.title}
                className={`offering-detail-row${index === 0 ? ' offering-detail-featured' : ''}`}
              >
                <div className="offering-detail-main">
                  <div className="course-meta-row light-surface">
                    <span className="practice-tag">{course.tag}</span>
                    <span className="meta-chip-dark">
                      <Clock size={14} aria-hidden="true" />
                      {course.duration}
                    </span>
                  </div>
                  <h2>{course.title}</h2>
                  <p className="offering-detail-desc">{course.description}</p>
                  <div className="offering-audience-note">
                    <Users
                      size={15}
                      className="gold-icon"
                      aria-hidden="true"
                    />
                    <span>{course.targetAudience}</span>
                  </div>
                  <div className="offering-cta-group">
                    <Link
                      className="button-gold"
                      href={`${href(locale, 'contact')}?course=${encodeURIComponent(course.title)}`}
                    >
                      {course.actionText}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                    <Link
                      className="text-secondary-link"
                      href={`${href(locale, 'contact')}?course=${encodeURIComponent(course.title)}&intent=syllabus`}
                    >
                      <BookOpen size={15} aria-hidden="true" />
                      {tr ? 'Örnek Müfredat İste' : 'Request Sample Syllabus'}
                    </Link>
                  </div>
                </div>

                <div className="offering-detail-scope">
                  <h3>
                    {tr ? 'Program Müfredatı' : 'Curriculum Breakdown'}
                  </h3>
                  <ul className="offering-check-list">
                    {course.curriculum.map((topic) => (
                      <li key={topic}>
                        <Check
                          size={16}
                          className="practice-check"
                          aria-hidden="true"
                        />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="subpage-section bg-ivory">
        <div className="container faq-layout">
          <div>
            <h2 className="section-heading-serif">
              {tr ? 'Eğitimler Hakkında' : 'Programme FAQ'}
            </h2>
            <p className="section-lead-text">
              {tr
                ? 'Katılım formatı, canlı oturumlar, sertifika ve kurumsal grup kayıtları hakkında sık sorulan sorular.'
                : 'Details on live format, recordings, certification and corporate team enrolment.'}
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Corporate CTA */}
      <section className="subpage-cta-band">
        <div className="container subpage-cta-inner">
          <div>
            <h2>
              {tr
                ? 'Ekibiniz İçin Kurum İçi Finans Atölyesi Planlayın'
                : 'Plan an In-House Finance Workshop for Your Team'}
            </h2>
            <p>
              {tr
                ? 'Şirketinizin finansal tablolarına ve sektör dinamiklerine özel hazırlanmış eğitim takvimi için iletişime geçin.'
                : 'Get in touch for a bespoke corporate workshop built around your sector and balance sheet.'}
            </p>
          </div>
          <Link
            className="button-gold"
            href={`${href(locale, 'contact')}?course=${encodeURIComponent(
              tr ? 'Kurumlara Özel Finans Eğitimi' : 'Custom Corporate Training',
            )}`}
          >
            {tr ? 'Kurumsal Teklif İsteyin' : 'Request Corporate Proposal'}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
