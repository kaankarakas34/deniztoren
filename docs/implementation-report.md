# Referans tasarım ve yerel editör — 3 Kasım 2026

Durum: Kullanıcının masaüstü/mobil referansına göre çalışan ilk sürüm uygulandı.
Canlı yayın, GitHub App yetkilendirmesi ve Vercel bağlantısı henüz kurulmadı.

## Tamamlanan uygulama

- Navy header/footer, serif wordmark, Source Serif 4 + Inter, ivory/gold token'lar.
- Portre kullanılmadı; kullanıcının kararıyla kodla çizilmiş soyut DT kompozisyonu.
- Desktop: hero, geniş öne çıkan analiz, piyasa paneli, dört editoryal yazı,
  bülten bandı, medya/editoryal yaklaşım/iletişim alanları. Mobile: sanat alanı
  başlığın üstünde, içerik tek kolon, yazılar küçük görselli liste.
- Erişilebilir native dialog menüsü, Escape/focus dönüşü, klavye ile piyasa sekmeleri.
- TR/EN ana sayfa, yerelleştirilmiş arşiv ve detay, medya, hakkımda, iletişim,
  arama, gizlilik, çerez ve yatırım uyarısı sayfaları.
- Arşivde kategori/yıl/etiket, URL query state, sayfalama ve gerçek arama.
  Arama sunucuda yalnız yayınlanabilir başlık/özet/etiketleri tarar; gövdeler
  gereksiz yere tarayıcıya taşınmaz. Başka bir veri servisi veya DB yoktur.
- Makale: içindekiler ve çalışan anchor'lar, özet, rich text, kaynaklar, okuma
  göstergesi, gerçek kopyalama/paylaşım, ilgili yazılar ve risk açıklaması.
- Kaynak/tarih/birim zorunlu küçük SVG grafik ve erişilebilir veri tablosu.
- Çeviri varsa karşı yazıya, yoksa ilgili dilin arşivine açıklamalı yönlendirme.
- Canonical/hreflang/OG, marka sosyal görseli, BlogPosting JSON-LD,
  robots/sitemap ve noindex yayın onayı. İndeksleme varsayılan kapalıdır.

## Keystatic

Posts geniş şeması, mediaItems, TR/EN home/about singletons ve site ayarları
eklendi. Gerçek kayıtlar content/ altında, yüklenen görseller public/media/uploads/
altında saklanır. Zengin metin için kod yazmak gerekmez.

Tarayıcıdan qa-local-editor-tr taslağı oluşturuldu; Türkçe metin girildi,
kitap görseli/alt metin/telif yüklendi ve özet ikinci kez düzenlenip Save ile
kaydedildi. .mdoc dosyası ve görsel diskte doğrulandı. Taslak, demo işareti açık
ve yayın tarihi boş olarak bırakıldı; hiçbir public route'a çıkmaz.

Sekiz örnek yayın yalnız development'ta açık demo işaretlidir. Bunlar gerçek
yayın, güncel piyasa yorumu veya kitap incelemesi olarak sunulmaz. Üretimde
ana sayfa, arşiv, arama, detay ve sitemap'te gösterilmez.

## Doğrulama

| Kontrol              | Kanıt / sonuç                                                                  |
| -------------------- | ------------------------------------------------------------------------------ |
| Lint                 | 48 kaynak/yapılandırma dosyası; geçti                                          |
| TypeScript           | Route typegen + tsc; geçti                                                     |
| Build                | Next.js production build; geçti                                                |
| Unit test            | 6/6: draft/demo/future/geçersiz tarih/Istanbul gece yarısı/JSON-LD güvenliği   |
| HTTP                 | TR/EN sayfalar ve detaylar 200; yanlış tür/slug 404                            |
| Arama ve filtre      | Kur araması sonuç üretti; corporate-finance tek ilgili yazı döndürdü           |
| Dil geçişi           | Karşı EN makale açıldı; olmayan çeviri ilgili arşive gitti                     |
| Tarayıcı             | Mobil menü açıldı; Escape kapattı, focus ve scroll kilidi geri döndü           |
| Kopyalama            | Gerçek clipboard işlemi sonrası “Bağlantı kopyalandı” görüldü                  |
| Piyasa paneli        | Tahvil sekmesi gerçek panel içeriğini değiştirdi; fiyat uydurulmadı            |
| Taslak               | Dosya kaydı var; ana sayfa/arşiv/arama/direkt URL'de görünmüyor                |
| Responsive           | 360/390/768/1024/1440 px: yatay taşma yok                                      |
| OG görseli           | /opengraph-image 200, image/png                                                |
| Production güvenliği | Demo ve QA taslak listelerde yok; doğrudan URL, local CMS/API ve showcase 404  |
| İndeksleme onayı     | robots Disallow /; sitemap boş; meta noindex; göreli dil redirect'i doğrulandı |
| Paket audit          | Üretim bağımlılıklarında bilinen açık bulunamadı                               |

Responsive ölçümleri output/playwright/responsive-checks.json içinde. Masaüstü ve
mobil ekran görüntüleri aynı klasörde. Web Interface Guidelines incelemesinde
görsel boyut rezervi, form etiketleri, native kontroller ve klavye davranışları
kontrol edildi. Reduced-motion CSS ve Motion hook'ları uygulanmıştır; farklı
donanımlarda işletim sistemi emülasyonu ve tam WCAG denetimi yapılmış sayılmaz.
Lighthouse/Core Web Vitals skoru ölçülmedi; bir performans puanı iddia edilmez.
Production HTTP kontrollerinin ayrıntılı sonuçları production-checks.json içinde.

## Referans kalite kontrolü — Ek A

1. İsim ilk ekranda görünür: wordmark ve DT kompozisyonu kullanıldı.
2. Değer önerisi ve yazılara erişim net: hero başlığı ve iki gerçek CTA.
3. Serif/sans hiyerarşi tutarlı: başlıklarda Source Serif, UI'da Inter.
4. Featured, yatay kartlar ve mobil liste farklı kompozisyonlarda.
5. Neon/glass/SaaS kartları yok; fotoğraf üstü okunabilirlik için sınırlı overlay.
6. Hareket kısa ve işleve bağlı; sürekli ticker, scroll-jacking veya loop yok.
7. Mobil başlıklar ve 17px makale gövdesi okunabilir; küçük metalar ikincil rolde.
8. Güncel veri yanılsaması yok: değerler yerine çizgi ve bağlantı durumu var.
9. Navigasyon/filtre/arama/kopyalama gerçek; bülten servis olmadan form değildir.
10. Public sayfalar aynı token, header/footer ve okuma bileşenlerini kullanıyor.

## Açık kalanlar

- Gerçek portre istenmiyor; onaylı biyografi, yayınlar, iletişim ve sosyal URL'ler
  kullanıcı içeriğiyle doldurulmalı. Gerçek yayın yokken üretim temiz boş durumdur.
- GitHub repo/App auth, repo write izni, yetkisiz hesap ve commit -> Vercel
  deploy zinciri gerçek erişimle ayrıca kurulup test edilmeli.
- Gerçek medya sağlayıcıları ve bülten servisi girildikten sonra onların akışı,
  gizlilik/çerez metinleri ve hukuki yayın metinleri kontrol edilmeli.
- Lighthouse, saha verileri ve tam erişilebilirlik denetimi sonraki QA işidir.
- Linear ücretsiz issue sınırı devam ediyor; kart yerine proje belgeleri ve
  milestone açıklamaları güncellendi. Diğer projelere dokunulmadı.
