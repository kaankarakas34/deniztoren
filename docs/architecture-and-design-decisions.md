# Mimari ve tasarım kararları

Tarih: 3 Kasım 2026. Güncel durum: Faz A altyapısı üzerinde referans tasarım,
public site ve yerel editör uygulandı. Üretim bağlantıları ayrı aşamadır.

## Başlangıç ve hedef

Başlangıç klasörü yalnız boş bir Git deposu içeriyordu; mevcut uygulama, lockfile,
commit veya remote yoktu. Bu klasör yalnız Deniz Tören projesine aittir.
Next.js App Router + React Server Components, strict TypeScript, Tailwind CSS ve
next-intl kurulacak. pnpm lockfile sürümleri sabitler. Veritabanı veya ORM yoktur.

Resmi Next.js kurulum kılavuzu, Keystatic Next.js/GitHub belgeleri ve npm peer
dependencies incelendi. Keystatic kılavuzundaki eski Next.js örneği aynen
kopyalanmaz; güncel async route parametreleri ve proxy.ts kullanılacaktır.

## Skill kaynakları ve sürümler

Skill'ler global profil yerine `.agents/skills/` içine kurulur. Kaynaklar:

- anthropics/skills: frontend-design.
- vercel-labs/agent-skills: gerçek skill adı `vercel-react-best-practices`
  (brief'teki `react-best-practices` dizin adıdır); web-design-guidelines.
- greensock/gsap-skills: gsap-react, gsap-scrolltrigger, gsap-performance.
- nextlevelbuilder/ui-ux-pro-max-skill: ui-ux-pro-max.

İlk frontend-design kurulumu Node 22.16 ile uyumlu Skills CLI 1.5.2 üzerinden
tamamlandı. Skills CLI 1.7.6 Node >=22.20 istediğinden sonraki adımlarda Codex'in
mevcut Node 24.22.1 binary'si yalnız komut sürecinde PATH'e eklendi. Sistem Node
ve diğer projelerin ayarları değiştirilmedi. Son kurulum/list/check sonuçları
`docs/setup-report.md` içine kaydedilecektir. Skill ve lisans dosyaları kullanım
öncesi incelenir; markaya aykırı öneriler uygulanmaz.

PowerShell'deki npx.ps1 sistem Node'una doğrudan bağlı olduğu için yalnız PATH
değişimi npx için yeterli olmadı; güncellik kontrolü daha sonra Node 24 executable
ile npx-cli.js doğrudan çağrılarak çalıştırıldı. pnpm'in paketli shim'i zaten
Node 24 kullanır. UI/UX Pro Max, skill-installer helper ile commit'e sabitlenerek
kuruldu; kaynağı ayrıca docs/skill-sources.json içinde tutulur. Skills CLI bu
manuel kurulumu `untracked` olarak gösterir; bu eksik kurulum anlamına gelmez.

pnpm ilk kurulumda @swc/core ve @parcel/watcher install script'lerini engelledi.
Betikler okundu: SWC native binding kontrolü/wasm fallback'i, Parcel ise yalnız
build-from-source ortamında node-gyp çalıştırır. Bu iki paket için proje-yerel
allowBuilds tanımlandı; genel script koruması kapatılmadı.

Linter: Biome 2.6.4. Registry ESLint 9'u deprecated olarak işaretledi; Next'in
eslint-plugin-react bağımlılığı ESLint 10 peer desteği sunmuyordu. Bakımı bitmiş
bir sürümü temele koymamak için Next.js'in resmi olarak desteklediği Biome
seçildi, deneme ESLint bağımlılıkları kaldırıldı. TypeScript 5.9.3 uyumluluk için
sabitlendi; en yeni TypeScript sürümü olduğu iddia edilmez.

Bağımlılık audit'i Keystatic'in minimatch 10.2.6 bağımlılığında
GHSA-g3hv-75wg-m249 (moderate DoS) buldu. Keystatic yalnız public `filter` API'sini
import ediyor. API ve Node gereklilikleri kontrol edilerek yalnız
`@keystatic/core>minimatch` için 11.0.4 override tanımlandı; genel sürüm
zorlaması yapılmadı. Sonuç build ve CMS smoke testiyle doğrulanacak. Kaynak:
https://github.com/advisories/GHSA-g3hv-75wg-m249

## Tasarım yönü

### Güncel kapsam — kişisel uzman sitesi

Kullanıcı hero'da sağda gerçek portre, altında haber/yazılar, hizmetler ve ileride
satılacak eğitimleri istedi. Yeni tasarım `docs/hero-and-sections-plan.md` ile
tanımlıdır. Navy header/hero, beyaz ve açık mavi bölümler; kişisel navigasyon,
sağ fotoğraf çerçevesi ve editörden yönetilen hizmet/eğitim tanıtım alanları var.
Önceki portresiz karar yalnız gerçek fotoğraf gelene kadarki duruma dönüşmüştür.
Gerçek dosya henüz verilmedi; mockup'taki yapay kişi kullanılmaz. Onaysız hizmet
başlıkları üretimde gösterilmez. Eğitim satışı sağlayıcı, gerçek program/fiyat
ve hesap bağlantısı gerektirir; tanıtım alanı çalışan ödeme akışı değildir.

### Güncel karar — çağdaş editoryal yenileme

Kullanıcı ilk sürümü eski buldu ve çağdaş kişisel yayın önerisini onayladı.
Güncel kompozisyon `docs/redesign-direction.md` içindedir; aşağıdaki referans
uygulaması tarihsel kayıttır. Beyaz hafif header, büyük Inter hero, görsel yanında
analiz metni, asimetrik yazı akışı ve koyu editoryal odak kullanılır. DT süslemesi
kaldırıldı. Boş piyasa, medya, sosyal ve bülten modülleri ana sayfada gösterilmez.
Source Serif yazı başlıklarında, marka paleti ve portresiz ilerleme korunur.

### Kullanıcının 3 Kasım 2026 görsel referansı — Faz B/C

Soldaki kompozisyon masaüstü, sağdaki mobil düzendir. Uygulama mevcut Next.js
reposunda yerel geliştirilecektir; yeni hosting servisi veya yayın kaydı açılmaz.
Kullanıcı referanstaki portrenin gerçek olmadığını belirtti: portre kullanılmaz.
Hero sağında navy/ivory/gold, soyut ve kodla çizilmiş bir DT kompozisyonu seçildi.

Uygulama notları: Markdoc root paketi Keystatic'in Reader AST sürümüyle aynı
0.4.0'a sabitlendi; 0.5.11 ile TypeScript Node tipleri uyumsuzdu. Tam tür kontrolü
ve gerçek editör dosya okuması bu seçimle geçti. Arama RSC üzerinde yayınlanabilir
başlık/özet/etiketlerden hesaplanır; tüm yazı gövdeleri tarayıcıya gönderilmez.
Bu arama için ayrı API, veri tabanı veya harici indeks servisi kurulmadı.

Yerel Next.js request.url host'u localhost olarak normalize edebildiğinden dil
geçişi güvenilir dahili yola göreli Location başlığı döndürür. Böylece ziyaretçi
127.0.0.1/localhost veya üretim host'undan başka bir origin'e yönlendirilmez.

Referans kararları: navy masthead, 7/5 başlık/görsel hero, altında geniş featured
story + dar piyasa görünümü, dört yatay editoryal kart, navy bülten bandı,
üç sütunlu alt editoryal alan ve navy footer. Mobilde sanat alanı üstte, sonra
başlık/CTA; featured ve piyasa paneli tek kolon; yazılar görsel+başlık listesi.
Görseldeki tarih/fiyat/makale/alıntılar gerçek içerik kabul edilmez.

UI/UX Pro Max araştırmasında ilk finans eşleşmesi kurumsal satış yönüne gitti;
editorial magazine daraltması 12 kolon ve serif/sans hiyerarşisiyle ilgili
eşleşti. Palet/font/scroll-scrub önerileri kullanıcı brief'iyle çeliştiği için
alınmadı. Navy/ivory/gold ve Source Serif 4/Inter korunuyor. Üç imza etkileşimi:
hero'nun hafif girişi, makale görsel/altçizgi hover'ı ve erişilebilir mobil drawer.

Geliştirme ortamında örnek yazılar `demo` işaretli; production reader bunları
reddeder. Piyasa paneli canlı feed yokken fiyat üretmez. Bülten gerçek signup URL
yoksa form göstermez. Gerçek biyografi/medya/sosyal bağlantılar uydurulmaz.

Executive Editorial × Modern Financial Journal. Navy #172B45, ivory #F7F5F0,
gold #B99562, slate #334B5E, ink #1C2733. Display: Source Serif 4; UI: Inter.
Sol hizalı güçlü serif başlık; 7/5 asimetrik hero; 1280px genişlik; 720px okuma
kolonu. Gerçek portre gelene kadar soyut DT geometrisi. Sahte biyografi yok.

Şema: `[wordmark | navigation] / [headline 7 | portrait/fallback 5] /
[featured analysis] / [asymmetric latest writing] / [footer]`.
Brief'in sıcak kağıt ve hairline tercihleri bilinçli marka kararıdır. Her bölümü
aynı yuvarlak kartlara dönüştürme. Gold, ivory üzerinde küçük metin değildir.

## Motion ve seçmeli paketler

Motion for React ana motor olacak. En fazla editorial reveal, article hover ve
kaynaklı data transition. Transform/opacity; SSR görünür metin; reduced motion.
GSAP skill'leri hazır tutulur; GSAP runtime ancak karmaşık bir sahne gerekirse
kurulur. Recharts yerine küçük erişilebilir SVG grafik tercih edilebilir.
Lenis, React Bits, Magic UI, Motion Primitives ve shadcn registry bileşenleri
varsayılan eklenmez; somut ihtiyaç ve lisans doğrulamasıyla seçilir.
Hiçbir premium registry veya lisans anahtarı istenmez.

## Keystatic ve yayın akışı

Geliştirmede local storage; git-izlenen `content/` ve `public/media/` dosyaları.
Üretimde `NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=github` ve public owner/repo
ayarları; yalnız repo write izni olan editörler resmi GitHub App auth kullanır.
Secret alanları server-only env'dedir. Public env'de token bulunmaz.
Üretimde local dosya yazan admin/API kapalı kalır. GitHub yapılandırması yoksa
editör üretimde 404 verir. GitHub erişimi sağlanmadan uçtan uca yayın test edildi
denmez. Commit -> Vercel build -> deploy tamamlanınca yeni içerik görünür;
yayın anlık değildir. Canlı preview henüz vaat edilmez.

## Harici veri saklamanın sınırları

Anonim kalıcı yorumlar, üyelik oturumları ve abone kayıtları yalnız dosyadan
oluşan bu yapı ile sunulmaz. V1 yorum alternatifi yapılandırılmış mailto'dur.
Giscus isteğe bağlı ve kapalı; GitHub hesabı gerektirir. Bülten yalnız gerçek
harici signup URL ile açılır; servis aboneleri kendi sisteminde saklar.
Form servisi kurulana kadar iletişim formu ve sahte başarı mesajı yoktur.

## Linear

Proje: P-E4N-7. Beş milestone ve orijinal brief ayrı projeye kaydedildi.
Workspace ücretsiz issue sınırı yeni kartları engelledi; görevler proje
belgesinde ve `docs/implementation-backlog.md` içinde korunur. Diğer projelerde
silme, taşıma veya düzenleme yapılmaz. get_agent_context aracı sunucuda
bulunamadığı için paylaşılan alan notları okunamadı.

## Resmi kaynaklar

- https://nextjs.org/docs/app/getting-started/installation
- https://next-intl.dev/docs/routing/setup
- https://keystatic.com/docs/installation-next-js
- https://keystatic.com/docs/github-mode
- https://github.com/vercel-labs/skills
- https://github.com/anthropics/skills
- https://github.com/vercel-labs/agent-skills
- https://github.com/greensock/gsap-skills
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
