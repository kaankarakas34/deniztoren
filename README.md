# DENİZTÖREN.COM

Deniz Tören için Türkçe/İngilizce ekonomi ve finans yayını.
Durum: **Referans tasarıma dayalı çalışan ilk sürüm**. TR/EN public sayfalar ve
yerel görsel editör hazır; GitHub/Vercel üretim bağlantısı henüz kurulmadı.

- [Linear projesi](https://linear.app/e4n/project/deniztorencom-iki-dilli-editoryal-web-sitesi-a36d97594eef)
- [Orijinal brief](docs/master-build-brief.md)
- [Görev ve kabul listesi](docs/implementation-backlog.md)
- [Mimari kararlar](docs/architecture-and-design-decisions.md)
- [Kurulum raporu](docs/setup-report.md)
- [Tasarım ve doğrulama raporu](docs/implementation-report.md)

## Geliştirme

Node >=22.20 (24 LTS önerilir), pnpm 11.25.0. Sistem Node'unu değiştirmeden
Codex'in paketli Node 24.22.1 ortamıyla kurulum yapılmıştır.

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Adresler: `http://127.0.0.1:3000/tr`, `/en`, `/keystatic`.
Geliştirme sunucusu varsayılan olarak yalnız loopback'e bağlanır.
`.env.example` içeriğini `.env.local` olarak kopyalamak local mode için isteğe
bağlıdır; gerçek secret'ları Git'e eklemeyin.

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Kurulu temel

Next.js App Router, React, strict TypeScript, Tailwind CSS, next-intl,
Keystatic/Markdoc, Motion, Lucide, clsx/tailwind-merge/CVA, Prettier.
Bağımlılıklar bu repo içindedir; proje-yerel skill'ler `.agents/skills/` altında.
Motion hero girişi/okuma ilerlemesinde; Lucide arayüzde; CVA/clsx/tailwind-merge
ortak butonlarda kullanılır. GSAP/Lenis/registry bileşenleri eklenmedi. Kaynaklı
grafikler küçük SVG ve erişilebilir veri tablosu ile gösterilir. Markdoc sürümü,
Keystatic Reader AST uyumu için 0.4.0 olarak sabitlendi.

## İçerik yönetimi ve güvenlik

Yerel `/keystatic` gerçek zengin metin editörüdür. Yazılar, medya, TR/EN ana sayfa
ve biyografi, SEO/iletişim/bülten ayarları yönetilir. İçerik `content/`, yüklenen
görseller `public/media/uploads/` içine yazılır. Arşiv, arama, kategori/yıl/etiket,
makale/analiz, içindekiler, paylaşım, kaynaklar ve çeviri fallback'i çalışır.

`draft` işaretli, gelecekteki tarihli ve tarihsiz yazılar görünmez. `demo` içerik
yalnız development'ta gösterilir; üretimde listeler, arama ve direkt URL'de
gizlenir. Sekiz örnek yayın ve bir yayınlanmayan editör QA taslağı bulunur.
Gerçek yazı girerken DEMO kapalı, yayın tarihi dolu olmalı; son onayda Taslak
kaldırılmalıdır. [Türkçe editör rehberi](docs/content-management-guide.md).

Production'da local editör/API kapalıdır. GitHub mode için public owner/repo ve
resmi GitHub App secret'ları gerekir. Repo/auth/deploy bağlantısı bu aşamada
kurulmadı; kullanıcıya ait token/erişim uydurulmaz. Ayrıntılar
[yayın kontrol listesinde](docs/deployment-checklist.md).

Site ayarlarındaki **Yayın onayı** açılana kadar noindex/robots koruması vardır.
Fotoğraf, biyografi, sosyal link, piyasa verisi,
yorum/abone sayıları uydurulmaz. DB, ORM ve ödeme altyapısı yoktur.

Türkiye'de KVKK/çerez gereklilikleri gerçek kullanılan hizmetlere göre ayrıca
incelenmelidir; bu kurulum tam hukuki uyum garantisi vermez.

## Önizleme ve tasarım kontrolü

`/design-system` yalnız development'ta açıktır. 1440/390 ekran görüntüleri ve
360/390/768/1024/1440 taşma kontrolü `output/playwright/` altında bulunur.
Bu sohbetin önizlemesi 3110 portunda başlatıldı; normal `pnpm dev` 3000'i kullanır.
Piyasa paneli gerçek besleme yokken fiyat göstermez. Bülten, gerçek harici kayıt
URL'si olmadan form sunmaz. Referanstaki portre kullanılmadı.
