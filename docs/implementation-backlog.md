# DENİZTÖREN.COM — Uygulama backlog'u

Bu görevler yalnız P-E4N-7 projesine aittir. Linear workspace ücretsiz issue
sınırı nedeniyle kart oluşturulamadı; bu belge kayıpsız görev kaydıdır.
Proje ve beş milestone oluşturuldu. Kurulum sonrası durum setup-report'tadır.

## Faz A — Araştırma ve kurulum

### DT-01 — Kaynak ve skill doğrulaması

- [x] Proje-yerel frontend-design, vercel-react-best-practices,
      web-design-guidelines, gsap-react, gsap-scrolltrigger, gsap-performance ve
      ui-ux-pro-max dosyalarını kur ve incele.
- [x] Kaynak/sürüm veya commit kaydı, list/check çıktısı ve lisansları koru.
- [x] Node/pnpm/Git ortamını raporla; sistem veya diğer projeleri değiştirme.

### DT-02 — Next.js ve CMS temeli

- [x] App Router, strict TypeScript, Tailwind, next-intl, Keystatic/Markdoc,
      Motion ve stil yardımcılarını uyumlu sürümlerle kur; pnpm lockfile oluştur.
- [x] README, .env.example, mimari kararlar ve marka token'larını yaz.
- [x] lint, typecheck ve build başarılı; DB veya ORM yok.

## Faz B — Marka ve tasarım sistemi

### DT-03 — Editorial tasarım sistemi

- [x] Navy/ivory/gold; Source Serif 4 + Inter; referansın responsive grid düzeni ve 720px okuma alanı.
- [x] DT wordmark/favicon, header/footer, buton, ayraç, kart, article layout.
- [x] Showcase: mobile, dark-on-navy, focus ve reduced-motion varyantları.
- [x] Gerçek portre sağlanana kadar soyut fallback; gold küçük metin yok.

### DT-04 — Hareket ve navigasyon

- [x] Hero girişi, article hover ve işlevsel okuma göstergesi; kaynaklı grafik statik.
- [x] Motion ana motor; GSAP yalnız gerekçeli ihtiyaçla ve cleanup ile.
- [x] SSR okunabilir; reduced motion; drawer focus trap/Escape; native scroll.

## Faz C — Public site

### DT-05 — TR/EN routing ve ana sayfa

- [x] Brief bölüm 05'teki Türkçe/İngilizce yerel adresler ve menüler.
- [x] Çeviri ilişkili dil geçişi; yoksa doğru arşiv ve açıklama.
- [x] Hero, featured, asimetrik son yazılar, piyasa, kitap, medya, bülten, about.
- [x] CMS'de olmayan içerik ve boş bloklar gerçekçi davranır; sahte içerik yok.

### DT-06 — Arşiv, filtre ve arama

- [x] Kategori, tarih, etiket; URL query state; RSC üzerinde gerçek içerik araması.
- [x] Sonuç bildirimi, erişilebilir boş state; gereksiz tüm içerik hydration yok.
- [x] Beş kategori master brief ile aynı; kitap notları post kind olabilir.

### DT-07 — Makale ve piyasa analizi

- [x] Localized slug; rich text, içindekiler, okuma süresi/progress, paylaş.
- [x] İlgili yazılar, güncellenme tarihi, executive summary ve risk açıklaması.
- [x] Grafiklerde kaynak/tarih/birim, metinsel özet ve tablo alternatifi.
- [x] Canlı veri yoksa demo yalnız geliştirmede açıkça etiketli; prod'da gizli.

### DT-08 — Diğer sayfalar

- [x] Medya video/podcast filtreleri, gerçek URL; lazy ve tıklamayla embed.
- [x] Hakkımda yalnız gerçek biyografi/portre; uzmanlık ve sosyal linkler onaylı.
- [x] İletişim mailto; servis yokken sahte form/başarı yok.
- [x] Gizlilik, çerez ve yatırım uyarısı TR/EN; gerçek hizmetlere göre düzenlenir.

### DT-09 — SEO ve performans

- [ ] Canonical, hreflang, alternates, OG, sitemap/robots, 404/redirect.
- [ ] Article/Person schema yalnız doğrulanabilir alanlarla; duplicate önleme.
- [ ] next/image, next/font, RSC; chart/embed sayfa ihtiyacında lazy.
- [ ] Gerçek ölçümle LCP <=2.5s, CLS <=0.1, INP <=200ms hedeflerini değerlendir.

## Faz D — Git-backed editing

### DT-10 — Keystatic modeli

- [x] Posts: locale, translationGroup, title/subtitle/excerpt, kind, category,
      tags, cover/alt/credit, date/update, draft, featured, body, SEO, kaynak/risk.
- [x] MediaItems; locale home/about singletons; site settings.
- [x] Resmi /keystatic ve API; local/GitHub storage; public/media git-izlenen.

### DT-11 — Yerel editör ve taslak güvenliği

- [ ] Tarayıcıdan yeni TR yazı+görsel ekle, metadata değiştir, isteğe bağlı EN ekle.
- [ ] Draft/future/demo içerik list/detail/search/sitemap'te sızmaz.
- [ ] Üretimde local dosya yazan admin ve API kapalı; unsafe Markdoc/script yok.

### DT-12 — GitHub auth ve yayın

- [ ] Kullanıcının seçtiği ayrı GitHub reposu, resmi Keystatic GitHub App.
- [ ] Repo write izni; client bundle'da token yok; yanlış yetkiliyi test et.
- [ ] İki içerik ekle+düzenle -> commit -> Vercel build -> canlı içerik testi.
- [ ] Gerçek repo/auth/host erişimi sağlanmadan bu görev tamamlanmış sayılmaz.

## Faz E — QA ve yayın

### DT-13 — Kalite denetimi

- [ ] lint/typecheck/build; 1440/390 screenshot, 360/768/1024 responsive kontrol.
- [ ] Overflow, keyboard/focus, heading/alt/contrast, 44px hedefler, reduced motion.
- [ ] UI/UX Pro Max + Web Interface Guidelines; çalışan link/arama/filtre/locale.
- [ ] Lighthouse/Playwright gerçek ölçümleri; Ek A on soruya gerekçeli cevap.

### DT-14 — Kılavuz ve teslim

- [ ] brand-kit.md, editorial-guide.md, content-management-guide.md (Türkçe),
      architecture-and-design-decisions.md, deployment-checklist.md.
- [ ] GitHub/Keystatic/Vercel env ve yayın gecikmesi; domain DNS'i ayrıca ele al.
- [ ] Gerçek fotoğraf, biyografi, e-posta ve erişim eksiklerini dürüstçe raporla.

## 3 Kasım 2026 uygulama notu

DT-03–08 ve DT-10 uygulandı. DT-09 SEO altyapısı hazır; gerçek Web Vitals ölçümü
bekliyor. DT-11 yerel TR taslak/görsel ekleme+düzenleme doğrulandı; GitHub ve
canlı yayın DT-12 kapsamında açık. DT-13 beş genişlikte taşma, mobil Escape/focus,
kopyalama, çeviri ve ilk görsel QA geçti; tam WCAG/Lighthouse denetimi açık.
DT-14 kılavuzlar yazıldı; gerçek içerik ve üretim erişimi bekleniyor.
Ayrıntılar implementation-report.md içindedir.

## V1 dışında

Anonim yorum, üyelik, community, ücretli üyelik, checkout ve abone veritabanı.
Giscus/bülten servisi ancak daha sonra açık kararla. Domain DNS'i bu kurulumda
değiştirilmez. Diğer projelerin kartları silinmez veya bu projeye taşınmaz.
