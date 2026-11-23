# Yayın kontrol listesi

Bu liste gelecek yayın adımlarını tanımlar; bu kurulumda deploy/DNS yapılmadı.

- [ ] Ayrı GitHub repo seç/oluştur ve yalnız bu projeyi bağla.
- [ ] Git-backed içerik ve public/media klasörlerini commit et; .env dosyaları hariç.
- [ ] Keystatic GitHub mode: NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=github;
      NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER/REPO gerçek değerler.
- [ ] Yerelde resmi /keystatic yönlendirmesiyle GitHub App oluştur; hedef repo
      erişimini sınırla; client ID, client secret, KEYSTATIC_SECRET ve app slug'ı
      resmi kurulumun ürettiği biçimde host env'ye gir. Secret'lar server-only.
- [ ] Vercel veya Node hosting: Node 24, pnpm, build pnpm build, normal Next.js
      sunucusu. Static export kullanma; Keystatic auth/API sunucu gerektirir.
- [ ] GitHub App callback/URL'lerini gerçek preview/production adresine ayarla.
- [ ] Repo write izni olmayan hesap düzenleme yapamıyor mu test et.
- [ ] Production'da local mode admin/API 404 veriyor mu doğrula.
- [ ] TR/EN iki içerik oluştur, görsel yükle, düzenle; commit ve deploy zincirini
      baştan sona test et. Build bitene kadar içerik canlı değildir.
- [ ] Draft/future/demo içerik ve preview secret'ları public'te görünmesin.
- [ ] Gerçek içerik ve QA tamamlanınca Site ayarları → Yayın onayı seçeneğini aç;
      public noindex/robots/sitemap buna göre değişir. CMS/API ve taslaklar kapalı kalır.
- [ ] Gerçek domain ve DNS kayıtlarını mevcut sağlayıcıyla doğrula; kullanıcının
      alan adına bu kurulum kapsamında kendiliğinden müdahale etme.

Resmi kaynaklar:
https://keystatic.com/docs/github-mode
https://keystatic.com/docs/installation-next-js
