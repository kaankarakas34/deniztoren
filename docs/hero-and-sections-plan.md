# Hero ve bölüm akışı — 3 Kasım 2026

Durum: Kullanıcı bu görsel uygulamayı yetersiz buldu; tasarım onaylanmış değildir.
Mevcut çalışan sürüm ara denemedir. Gerçek portre hâlâ sağlanmadı. Sonraki görsel
çalışma gerçek fotoğrafın kadrajı ve mavi-beyaz kişisel marka yönüyle yeniden
ele alınmalı; yalnız boş portre çerçevesi ve genel şablonlarla tamamlandı sayılmaz.

Kullanıcının yeni yönlendirmesi: hero içinde solda giriş, sağda Deniz Tören'in
gerçek fotoğrafı; ardından haber/yazı akışı ve hizmetler. Önceki portresiz tasarım
kararı, gerçek fotoğrafın sağlanması koşuluyla güncellendi. Eldeki mockup portresi
gerçek değil; kullanılmaz. Gerçek portre dosyası henüz gelmedi.

Palet: navy #172B45, slate #334B5E, white #FFFFFF, ivory #F7F5F0,
gold #B99562. Header ve hero aynı navy yüzey; altın yalnız küçük vurgu/eylem.
Inter hero ve UI; Source Serif 4 yazı başlıklarında. Sol hizalı 7/5 denge,
4:5 portre çerçevesi, mobilde metin/CTA ve ardından fotoğraf.

Akış: `[navy header] / [başlık, giriş, CTA | gerçek portre] /
[öne çıkan analiz] / [haberler ve yazılar] / [hizmetler] /
[editoryal yaklaşım] / [varsa medya ve bülten] / [footer]`.

Öz eleştiri: hero'nun sağını DT, uydurma insan veya stock iş insanıyla doldurma.
Fotoğraf gelene kadar nötr, açıkça fotoğraf bekleyen bir çerçeve kullan. Haberler
güncelmiş gibi üretilmez; CMS'ye Haber/Güncel not türü eklenir. Hizmet listesi
kullanıcıdan istenir; gerçek hizmetler CMS'de ayrıca onaylanır. Geliştirmedeki
taslak yerleşim teklifleri üretimde hizmet beyanı olarak gösterilmez.

Yeni bağımlılık veya veritabanı yok. Mevcut yayın filtresi ve TR/EN akışı korunur.

## Yeni kullanıcı yönlendirmesi

Sitenin kişisel uzman sitesi olması, finans hizmetlerinin yanı sıra gelecekte
eğitim satışı içermesi istendi. Gerçek hizmet adları henüz bilinmiyor. Menü
Hakkımda, Hizmetler, Eğitimler, Yazılar ve İletişim etrafında düzenlenir.
Hizmet alanı önerileri yalnız development'ta açıkça onaysız taslak olarak görünür.
Eğitimler için tanıtım ve bilgi alanı hazırdır; gerçek program, fiyat, ödeme ve
erişim sağlayıcısı belirlenmediğinden çalışan katalog/sepet/ödeme iddiası yoktur.
Vercel Marketplace ticaret rehberi incelendi; gerçek satış entegrasyonu bu
tasarım turunun dışında, sağlayıcı kurulumu ve gerçek hesap erişimiyle ele alınır.
