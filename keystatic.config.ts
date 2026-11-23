import { collection, config, fields, singleton } from '@keystatic/core';

const owner = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER;
const repo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;
const github = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND === 'github';
if (github && (!owner || !repo))
  throw new Error('GitHub storage requires owner and repo.');

const locale = () =>
  fields.select({
    label: 'Dil / Language',
    options: [
      { label: 'Türkçe', value: 'tr' },
      { label: 'English', value: 'en' },
    ],
    defaultValue: 'tr',
  });
const image = (label: string) =>
  fields.image({
    label,
    directory: 'public/media/uploads',
    publicPath: '/media/uploads/',
  });
const richText = (label: string) =>
  fields.markdoc({
    label,
    options: {
      image: {
        directory: 'public/media/uploads',
        publicPath: '/media/uploads/',
      },
    },
  });
const home = (label: string, lang: string) =>
  singleton({
    label,
    path: `content/pages/home-${lang}`,
    format: { data: 'json' },
    schema: {
      headline: fields.text({ label: 'Ana başlık', multiline: true }),
      intro: fields.text({ label: 'Giriş', multiline: true }),
      heroPortrait: image('Hero — Deniz Tören gerçek fotoğrafı'),
      heroPortraitAlt: fields.text({
        label: 'Hero fotoğrafı alternatif metni',
      }),
      servicesIntro: fields.text({
        label: 'Hizmetler giriş metni',
        multiline: true,
      }),
      educationTitle: fields.text({ label: 'Eğitimler bölüm başlığı' }),
      educationIntro: fields.text({
        label: 'Eğitimler tanıtım metni',
        multiline: true,
      }),
      servicesPublished: fields.checkbox({
        label: 'Hizmet içerikleri onaylı — yayında göster',
        defaultValue: true,
      }),
      services: fields.array(
        fields.object({
          title: fields.text({
            label: 'Hizmet adı',
            validation: { length: { min: 1 } },
          }),
          tag: fields.text({ label: 'Hizmet etiketi' }),
          description: fields.text({
            label: 'Hizmet kapsamı',
            multiline: true,
          }),
          deliverables: fields.array(fields.text({ label: 'Kapsam / Çıktı' }), {
            label: 'Çıktılar',
            itemLabel: (props) => props.value,
          }),
          actionText: fields.text({ label: 'Buton metni' }),
        }),
        {
          label: 'Gerçek hizmetler',
          itemLabel: (props) => props.fields.title.value || 'Yeni hizmet',
        },
      ),
      educationPublished: fields.checkbox({
        label: 'Eğitim içerikleri onaylı — yayında göster',
        defaultValue: true,
      }),
      courses: fields.array(
        fields.object({
          title: fields.text({
            label: 'Eğitim / Masterclass Adı',
            validation: { length: { min: 1 } },
          }),
          tag: fields.text({
            label: 'Etiket (Örn: Canlı Masterclass / Yönetici Eğitimi)',
          }),
          duration: fields.text({ label: 'Süre & Format' }),
          targetAudience: fields.text({ label: 'Hedef Kitle' }),
          description: fields.text({
            label: 'Eğitim kapsamı',
            multiline: true,
          }),
          curriculum: fields.array(fields.text({ label: 'Konu başlığı' }), {
            label: 'Müfredat konuları',
            itemLabel: (props) => props.value,
          }),
          actionText: fields.text({ label: 'Buton metni' }),
        }),
        {
          label: 'Eğitim Programları',
          itemLabel: (props) => props.fields.title.value || 'Yeni eğitim',
        },
      ),
      editorialNote: fields.text({
        label: 'Editoryal yaklaşım',
        multiline: true,
      }),
    },
  });
const about = (label: string, lang: string) =>
  singleton({
    label,
    path: `content/pages/about-${lang}`,
    format: { data: 'json' },
    schema: {
      intro: fields.text({
        label: 'Kısa biyografi — yalnız onaylı gerçek bilgi',
        multiline: true,
      }),
      biography: richText('Biyografi'),
      portrait: image('Gerçek portre'),
      portraitAlt: fields.text({ label: 'Portre alternatif metni' }),
      expertise: fields.array(fields.text({ label: 'Uzmanlık alanı' }), {
        label: 'Uzmanlık alanları',
        itemLabel: (props) => props.value,
      }),
    },
  });

export default config({
  storage:
    github && owner && repo
      ? { kind: 'github', repo: { owner, name: repo } }
      : { kind: 'local' },
  ui: { brand: { name: 'Deniz Tören' } },
  collections: {
    posts: collection({
      label: 'Yazılar / Articles',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Başlık / Title' } }),
        subtitle: fields.text({ label: 'Alt başlık' }),
        locale: locale(),
        translationGroup: fields.text({
          label: 'Çeviri grubu — iki dilde aynı kimlik',
        }),
        excerpt: fields.text({
          label: 'Özet / Excerpt',
          multiline: true,
          validation: { length: { max: 400 } },
        }),
        category: fields.select({
          label: 'Kategori',
          options: [
            { label: 'Küresel Ekonomi', value: 'global-economy' },
            { label: 'Kurumsal Finans', value: 'corporate-finance' },
            { label: 'Perspektif', value: 'perspectives' },
            { label: 'Kitap Notları', value: 'book-notes' },
            { label: 'Finansal Okuryazarlık', value: 'financial-literacy' },
          ],
          defaultValue: 'perspectives',
        }),
        kind: fields.select({
          label: 'İçerik türü',
          options: [
            { label: 'Yazı', value: 'article' },
            { label: 'Haber / Güncel not', value: 'news' },
            { label: 'Piyasa analizi', value: 'market-analysis' },
            { label: 'Kitap notu', value: 'book-review' },
          ],
          defaultValue: 'article',
        }),
        tags: fields.array(fields.text({ label: 'Etiket' }), {
          label: 'Etiketler',
          itemLabel: (props) => props.value,
        }),
        publishDate: fields.date({ label: 'Yayın tarihi' }),
        updatedDate: fields.date({ label: 'Güncelleme tarihi' }),
        draft: fields.checkbox({
          label: 'Taslak — sitede gösterme',
          defaultValue: true,
        }),
        demo: fields.checkbox({
          label: 'DEMO — yalnız geliştirme ortamında',
          defaultValue: false,
        }),
        featured: fields.checkbox({ label: 'Öne çıkar', defaultValue: false }),
        coverImage: image('Kapak görseli'),
        coverAlt: fields.text({ label: 'Görsel alternatif metni' }),
        coverCredit: fields.text({ label: 'Görsel kaynağı / telif' }),
        estimatedReadingMinutes: fields.integer({
          label: 'Okuma süresi (dakika)',
          defaultValue: 5,
          validation: { min: 1, max: 120 },
        }),
        executiveSummary: fields.text({
          label: 'Yönetici özeti',
          multiline: true,
        }),
        body: richText('İçerik — görsel zengin metin editörü'),
        seoTitle: fields.text({ label: 'SEO başlık' }),
        seoDescription: fields.text({ label: 'SEO açıklama', multiline: true }),
        socialImage: image('Sosyal paylaşım görseli'),
        dataSourceNotes: fields.text({
          label: 'Veri kaynakları / yöntem',
          multiline: true,
        }),
        riskDisclaimer: fields.checkbox({
          label: 'Yatırım risk açıklamasını göster',
          defaultValue: true,
        }),
        chart: fields.object(
          {
            title: fields.text({ label: 'Grafik başlığı' }),
            source: fields.text({ label: 'Veri kaynağı' }),
            sourceUrl: fields.url({ label: 'Kaynak URL' }),
            asOf: fields.date({ label: 'Veri tarihi' }),
            unit: fields.text({ label: 'Birim' }),
            points: fields.array(
              fields.object({
                label: fields.text({ label: 'Dönem' }),
                value: fields.number({ label: 'Değer' }),
              }),
              {
                label: 'Veri satırları',
                itemLabel: (props) => props.fields.label.value,
              },
            ),
          },
          { label: 'Grafik verisi — yalnız kaynaklı veriler' },
        ),
      },
    }),
    mediaItems: collection({
      label: 'Video ve podcast',
      slugField: 'title',
      path: 'content/media/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Başlık' } }),
        locale: locale(),
        summary: fields.text({ label: 'Açıklama', multiline: true }),
        type: fields.select({
          label: 'Tür',
          options: [
            { label: 'Video', value: 'video' },
            { label: 'Podcast', value: 'podcast' },
          ],
          defaultValue: 'video',
        }),
        provider: fields.select({
          label: 'Sağlayıcı',
          options: [
            { label: 'YouTube', value: 'youtube' },
            { label: 'Spotify', value: 'spotify' },
            { label: 'Apple Podcasts', value: 'apple' },
            { label: 'Diğer (harici bağlantı)', value: 'other' },
          ],
          defaultValue: 'youtube',
        }),
        url: fields.url({ label: 'Orijinal yayın URL' }),
        thumbnail: image('Kapak görseli'),
        thumbnailAlt: fields.text({ label: 'Görsel alternatif metni' }),
        publishDate: fields.date({ label: 'Yayın tarihi' }),
        duration: fields.text({ label: 'Süre' }),
        featured: fields.checkbox({ label: 'Öne çıkar' }),
        draft: fields.checkbox({ label: 'Taslak', defaultValue: true }),
      },
    }),
  },
  singletons: {
    homeTr: home('Ana sayfa — Türkçe', 'tr'),
    homeEn: home('Home — English', 'en'),
    aboutTr: about('Hakkımda — Türkçe', 'tr'),
    aboutEn: about('About — English', 'en'),
    site: singleton({
      label: 'Site ayarları',
      path: 'content/settings/site',
      format: { data: 'json' },
      schema: {
        email: fields.text({ label: 'Gerçek iletişim e-postası' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        youtube: fields.url({ label: 'YouTube URL' }),
        spotify: fields.url({ label: 'Spotify URL' }),
        newsletterUrl: fields.url({
          label: 'Gerçek bülten abonelik URL — boşsa form kapalı',
        }),
        seoDescriptionTr: fields.text({
          label: 'Varsayılan SEO açıklama — TR',
          multiline: true,
        }),
        seoDescriptionEn: fields.text({
          label: 'Default SEO description — EN',
          multiline: true,
        }),
        publicationReady: fields.checkbox({
          label: 'Yayın onayı — SEO indekslemeyi aç',
          defaultValue: false,
        }),
      },
    }),
  },
});
