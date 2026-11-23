# Kodsuz içerik yönetimi — Türkçe kullanım rehberi

Bu rehber çalışan yerel Keystatic editörünü anlatır. GitHub/Vercel bağlantısı
kurulmadan kaydetmek, internette canlıya yayınlamak anlamına gelmez.

## Editörü açın

Geliştirme sunucusu açıkken /keystatic adresini ziyaret edin.
Normal geliştirme: http://127.0.0.1:3000/keystatic.
Bu sohbetin önizlemesi: http://127.0.0.1:3110/keystatic.
Üretimde resmi GitHub App ile giriş ve içerik reposunda write izni gerekir.

## Yeni yazı ve görsel ekleyin

1. **Yazılar / Articles** → **Add** seçin.
2. **Başlık / Title** girin. **Slug** adres adıdır; isterseniz değiştirin.
   İki dilde kayıt adları aynıysa birine -en ekleyin. Slug değiştirmek eski
   bağlantıyı değiştirdiğinden yayınlanmış yazılarda dikkatle kullanılmalıdır.
3. **Dil / Language** alanından Türkçe veya English seçin. Çeviri zorunlu değil.
   İki dilde karşılık varsa **Çeviri grubu** alanına aynı benzersiz kimliği yazın.
4. Özet, kategori, içerik türü ve isteğe bağlı etiketleri girin.
5. **Yayın tarihi** seçin. Gelecekteki tarihli ve tarihsiz kayıtlar sitede görünmez.
   Yayın başlangıcı Türkiye saatine göre ilgili günün 00:00'ıdır.
6. **Taslak** açık kalsın. Gerçek içerikte **DEMO** kapalı olmalı.
   Demo işareti üretimde her zaman gizler; development'ta örnek tasarıma izin verir.
7. **Kapak görseli → Choose file** ile resmi seçin. Alternatif metni ve
   kaynak/telif bilgisini mutlaka doldurun. Yalnız kullanma hakkınız olan görseli
   yükleyin. Büyük dosyalar Git geçmişini büyütür; makul boyutta görsel seçin.
8. **İçerik** alanına doğrudan yazın. Üst araç çubuğundan başlık, kalın metin,
   liste, bağlantı, tablo veya görsel ekleyin; Markdown veya kod gerekmez.
9. Gerekirse yönetici özeti, veri kaynakları, SEO başlık/açıklama ve sosyal
   paylaşım görselini doldurun. Grafik için dönem/değer satırlarını, başlık,
   kaynak, birim ve veri tarihini birlikte girin; eksik kaynaklı grafik gösterilmez.
10. Yeni kayıtta **Create**, sonraki değişikliklerde **Save** seçin.
    Yazı content/posts/ altına, yüklenen görsel public/media/uploads/ altına
    gerçek dosya olarak kaydedilir.

Görseller public dizinindedir; taslak işareti yazının metnini gizler fakat dosya
URL'si bilinen görselleri özel yapmaz. Özel belge veya gizli görsel yüklemeyin.

## Yayınlayın ve düzenleyin

Metni gözden geçirin; gerçek yayın tarihini kontrol edin, DEMO kapalı olduğundan
emin olun, **Taslak** işaretini kaldırın ve **Save** seçin. Yerel önizlemeyi
yenileyince yazı görünür. Üretimde resmi GitHub entegrasyonu kurulduğunda bu işlem
commit oluşturur; hosting build/deploy tamamlanınca canlı sayfa güncellenir.
Yayın anlık değildir. Özel/güvenli canlı draft preview bu sürümde yoktur.

Arşiv, arama, detay ve sitemap aynı yayın filtresini kullanır. Taslak doğrudan
adres yazılarak da açılmaz. Çeviri yoksa dil düğmesi ilgili dilin arşivine gider
ve çevirinin bulunmadığını açıklar.

## Ana sayfa, biyografi ve bağlantılar

- **Ana sayfa — Türkçe / Home — English**: hero başlığı, giriş, hero fotoğrafı,
  hizmetler, eğitim tanıtımı ve editoryal yaklaşım. Hero fotoğrafı boşsa Hakkımda
  bölümündeki gerçek portre kullanılır; iki alanda da yoksa nötr fotoğraf alanı görünür.
  Yeni portre yüklerken alternatif metni de doldurun.
- **Gerçek hizmetler**: hizmet adı/kapsamını ekleyin. **Hizmet içerikleri onaylı**
  kapalıyken üretimde hizmet adları gösterilmez. Geliştirme ortamındaki öneri
  başlıkları açıkça taslaktır ve gerçek hizmet olarak kabul edilmez.
- **Eğitimler bölüm başlığı / tanıtım metni**: eğitim alanını düzenler. Henüz
  gerçek program listesi, fiyat veya çalışan ödeme/katılımcı erişimi yoktur.
  Satış için sağlayıcı, ürünler ve gerçek hesap bağlantısı ayrıca kurulmalıdır.
- **İçerik türü → Haber / Güncel not**: haberler de yazılarla aynı taslak,
  tarih ve DEMO yayın kurallarını kullanır.
- **Hakkımda — Türkçe / About — English**: onaylı biyografi ve uzmanlık alanları.
  Gerçek fotoğraf ve kariyer bilgisi yoksa uydurma bilgi eklemeyin. Hero artık
  sağ sütunda gerçek portreyi gösterecek şekilde hazırlanmıştır.
- **Site ayarları**: e-posta, LinkedIn/YouTube/Spotify, gerçek bülten kayıt URL'si
  ve varsayılan SEO açıklamaları. Boş alanlar sahte bağlantı veya form oluşturmaz.
- **Yayın onayı**: yalnız gerçek içerik, hukuki metinler ve üretim QA tamamlanınca
  açılır. Açılana kadar public sayfalar noindex, robots kapalı ve sitemap boştur.

## Video ve podcast

**Video ve podcast → Add**: gerçek başlık, dil, yayın URL'si, sağlayıcı, tarih,
süre, kapak ve açıklamayı girin. Hazırsa Taslak işaretini kaldırın.
YouTube ve Spotify için güvenilir URL'den oynatıcı adresi türetilir; ziyaretçi
**Oynatıcıyı yükle** seçmeden üçüncü tarafa istek yapılmaz. Diğer sağlayıcılar
orijinal dış bağlantıyla açılır; rastgele iframe kodu çalıştırılmaz.

## Bu sürümde doğrulananlar

Tarayıcıdan Türkçe taslak oluşturma, zengin metin, kapak görseli/alt metin/telif
yükleme ve ikinci kez düzenleyip kaydetme test edildi. qa-local-editor-tr kaydı
yayınlanmayan test taslağıdır. Taslağın ana sayfa, arşiv, arama ve direkt adreste
gizli kaldığı doğrulandı. GitHub commit, auth ve Vercel yayın zinciri henüz
bağlanmadığından bu rehber o zincirin test edildiğini iddia etmez.
