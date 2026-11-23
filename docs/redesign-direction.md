# Çağdaş editoryal yenileme — 3 Kasım 2026

Kullanıcı ilk uygulamayı eski buldu; önerilen çağdaş kişisel yayın yönünü onayladı.
Bu karar önceki referansın yoğun portal kompozisyonunu değiştirir. Portre kullanılmaz.

Palet: navy #172B45, white #FFFFFF, ivory #F7F5F0, slate #334B5E,
muted #536274, gold #B99562. Beyaz ana yüzey; altın yalnız küçük vurgu.
Inter büyük hero ve arayüz; Source Serif 4 yazı başlıkları ve editoryal odak.
Sol hizalama, 1328px içerik genişliği, 16px vurgu yüzeyi köşesi, 10px görsel köşesi.

Şema: `[sade wordmark / menü] / [büyük başlık | kısa giriş ve tek CTA] /
[geniş analiz görseli | başlık ve özet] / [bir büyük yazı | üç yazılık liste] /
[yayının odağı | açıklama ve konu bağlantıları] / [hafif footer]`.

Plan kontrolü: yinelenen küçük modüller, çerçeveli DT, etiket/rule dekorları,
görsel üstünde uzun metin ve boş piyasa/medya/sosyal/bülten alanları kaldırılır.
Her satırı aynı karta dönüştürmek yerine büyük görsel ile küçük listeler arasında
okuma hiyerarşisi kurulur. Mevcut gerçek içerik alanları kullanılır. Bülten ve
medya, yalnız kullanılabilir gerçek URL/içerik varsa ana sayfada görünür.
Arşiv, arama, dil geçişi ve Git tabanlı editör korunur.

Mobil: başlık/giriş/CTA, görsel ve ardından analiz özeti, büyük yazı ve liste,
tek sütun editoryal odak. Native scroll; mevcut küçük giriş animasyonu ve
reduced-motion desteği. Yeni bağımlılık veya harici servis yok.

UI/UX Pro Max ilk sorgusu kişisel finans dashboard önerdiği için kullanılmadı;
daraltılmış editorial magazine sorgusunun asimetrik grid/negatif alan ilkeleri
uygun bulundu. Glassmorphism ve scroll/parallax önerileri uygulanmadı.

## Doğrulama

Kullanıcının sonraki geri bildirimiyle header beyaz yerine tam genişlikte navy
oldu. Masaüstü yüksekliği 110px, mobil 84px; beyaz logo/menü, altın aktif dil ve
menü alt çizgisi kullanılıyor. Bu karar önceki beyaz header tarifinin yerini alır.

- Lint, TypeScript, production build ve format kontrolü başarılı; mevcut altı
  yayın/JSON-LD testi geçti.
- Tarayıcıda 360, 390, 768, 1024 ve 1440px genişliklerinde ana sayfa ölçüldü;
  belge genişliği viewport'u aşmıyor. EN ana sayfa 360px'te ayrıca kontrol edildi.
- Mobil menü açılıyor; Escape kapanışı, odağın düğmeye dönüşü ve body scroll
  kilidinin kalkması doğrulandı. Mobil alt bölümler ve footer görsel incelendi.
- Gerçek TR → EN bağlantısı, EN featured analiz ve TR hero → yazı arşivi
  bağlantıları tarayıcıdan açıldı. Geliştirme örnek etiketleri korunuyor.
- Ekran görüntüleri: output/playwright/redesign-preview.jpg ve
  redesign-mobile.jpg. Ölçümler redesign-responsive.json içinde.
- Yeni paket/servis kurulmadı. Gerçek içerik ve üretim yayını hâlâ bekliyor;
  Lighthouse veya tam WCAG denetimi yapılmış sayılmaz.
