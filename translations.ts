
import { Translations, FAQItem, StudyData, Article, Recipe, BlogPost, AppContentData, InvestmentContent, ProductVariant } from './types';

// INDONESIAN TRANSLATIONS
const translationsID: Translations = {
  nav: {
    home: "Beranda",
    evidence: "Bukti Klinis",
    usage: "Penggunaan",
    recipes: "Resep",
    blog: "Blog",
    faq: "FAQ",
    investment: "Investasi"
  },
  hero: {
    badge: "Terbukti Klinis di Jurnal Nature",
    titleMain: "Kendalikan Gula Darah Anda dengan ",
    titleHighlight: "TeWELL+",
    description: "Bubuk Nangka Muda Mentah Premium yang diproses dengan suhu ultra-rendah (<50°C) untuk menjaga 100% serat alami. Terbukti secara klinis menurunkan kadar HbA1c dalam 90 hari.",
    ctaEvidence: "Lihat Bukti Klinis",
    chartLabel: "Penurunan HbA1c",
    heroImage: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800"
  },
  order: {
    heading: "Pesan TeWELL+",
    subheading: "Pilih ukuran yang sesuai dengan kebutuhan kesehatan harian Anda.",
    variantStarter: "Paket Pemula",
    variantStandard: "Paket Kesehatan",
    variantValue: "Paket Keluarga",
    buyWA: "Pesan via WhatsApp",
    buyShopee: "Beli di Shopee",
    buyTikTok: "Beli di TikTok Shop",
    linkWA: "https://wa.me/yournumber",
    linkShopee: "https://shopee.co.id/tewellplus",
    linkTikTok: "https://www.tiktok.com/@tewellplus"
  },
  blog: {
    heading: "Blog",
    subheading: "Wawasan tentang kesehatan glikemik, riset klinis, dan ilmu nangka muda mentah.",
    readMore: "Baca Selengkapnya",
    backToBlog: "Kembali ke Blog"
  },
  evidence: {
    heading: "Mengapa Nangka Muda Mentah?",
    quote: "\"Penggantian 30g nasi atau tepung dengan bubuk nangka muda mentah secara signifikan meningkatkan kontrol glikemik pada pasien diabetes tipe 2.\"",
    studyTitle: "Uji Coba Terkontrol Acak",
    studyDesc: "Uji coba double-blind selama 90 hari dengan pasien diabetes tipe 2 yang mengonsumsi 30g bubuk nangka setiap hari.",
    analysisTitle: "Analisis HbA1c & Glukosa",
    analysisDesc: "Hasil menunjukkan penurunan signifikan pada HbA1c, glukosa puasa, dan berat badan.",
    fiberTitle: "Serat Tidak Larut",
    fiberDesc: "Kandungan serat yang sangat tinggi membantu pelepasan gula secara perlahan ke aliran darah.",
    chartTitle: "Hasil Studi Klinis (Data 90 Hari)",
    chartDisclaimer: "*Data berdasarkan studi 'Efficacy of green jackfruit flour' yang dipublikasikan di Nature Scientific Reports.",
    pageTitle: "Bukti Ilmiah & Data",
    pageSubtitle: "Efikasi TeWELL+ didukung oleh riset klinis standar emas (Double-Blind) dan teknologi cold-process kami.",
    readMore: "Buka Artikel Lengkap"
  },
  usage: {
    heading: "Integrasi Mudah ke Makanan",
    description: "Cukup tambahkan TeWELL+ ke makanan yang sudah Anda makan sehari-hari tanpa merubah rasa secara signifikan.",
    riceTitle: "Campur ke Nasi",
    riceDesc: "Tambahkan 1 sendok makan per cup beras sebelum dimasak untuk menurunkan indeks glikemik nasi putih Anda.",
    flourTitle: "Campur ke Tepung",
    flourDesc: "Dapat dicampur ke adonan kue, biskuit, martabak, atau tepung terigu untuk nutrisi tambahan.",
    cookTitle: "Tanpa Merubah Rasa",
    cookDesc: "Rasa nangka muda mentah yang netral membuatnya cocok untuk hampir semua masakan gurih Indonesia."
  },
  recipes: {
    heading: "Penggunaan & Resep",
    subheading: "Ubah makanan pokok harian Anda menjadi makanan super yang ramah diabetes.",
    howLabel: "Cara Penggunaan:"
  },
  faq: {
    heading: "Pertanyaan yang Sering Diajukan",
    subheading: "Pelajari lebih lanjut tentang sains di balik Bubuk Nangka Muda TeWELL+."
  },
  footer: {
    mission: "Kami menghadirkan solusi alami berbasis sains untuk membantu pengelolaan diabetes melalui inovasi pangan fungsional yang diproses secara dingin.",
    navHeading: "Navigasi",
    contactHeading: "Hubungi Kami",
    disclaimer: "PENAFIAN: Produk ini adalah suplemen makanan. Konsultasikan dengan dokter Anda sebelum merubah rejimen pengobatan diabetes Anda."
  }
};

// ENGLISH TRANSLATIONS
const translationsEN: Translations = {
  nav: {
    home: "Home",
    evidence: "Evidence",
    usage: "Usage",
    recipes: "Recipes",
    blog: "Blog",
    faq: "FAQ",
    investment: "Investment"
  },
  hero: {
    badge: "Clinically Proven in Nature Journal",
    titleMain: "Master Your Blood Sugar with ",
    titleHighlight: "TeWELL+",
    description: "Premium Raw Young Jackfruit Powder processed at ultra-low temperatures (<50°C) to preserve 100% natural fiber. Clinically proven to reduce HbA1c levels in 90 days.",
    ctaEvidence: "See Clinical Proof",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800"
  },
  order: {
    heading: "Order TeWELL+",
    subheading: "Select the variant that fits your daily dietary management needs.",
    variantStarter: "Starter Pack",
    variantStandard: "Health Pack",
    variantValue: "Family Pack",
    buyWA: "Order via WhatsApp",
    buyShopee: "Buy on Shopee",
    buyTikTok: "Buy on TikTok Shop",
    linkWA: "https://wa.me/yournumber",
    linkShopee: "https://shopee.co.id/tewellplus",
    linkTikTok: "https://www.tiktok.com/@tewellplus"
  },
  blog: {
    heading: "The",
    subheading: "Insights into glycemic health, clinical research, and the science of raw young jackfruit.",
    readMore: "Read Full Article",
    backToBlog: "Back to Blog"
  },
  evidence: {
    heading: "Why Raw Young Jackfruit?",
    quote: "\"Replacement of 30g of starch with young jackfruit powder significantly improved glycemic control in type 2 diabetes mellitus.\"",
    studyTitle: "Randomized Controlled Trial",
    studyDesc: "A 90-day double-blind trial where participants replaced 30g of staple grain with jackfruit powder.",
    analysisTitle: "HbA1c & Glucose Analysis",
    analysisDesc: "Results showed significant reductions in HbA1c, Fasting Blood Glucose, and body weight.",
    fiberTitle: "High Insoluble Fiber",
    fiberDesc: "The exceptionally high fiber content slows glucose absorption into the bloodstream.",
    chartTitle: "Clinical Study Results (90-Day Data)",
    chartDisclaimer: "*Data based on the 'Efficacy of green jackfruit flour' study published in Nature Scientific Reports.",
    pageTitle: "Scientific Evidence & Data",
    pageSubtitle: "The efficacy of TeWELL+ is backed by Gold-Standard clinical research and our proprietary cold-process technology.",
    readMore: "Open Full Article"
  },
  usage: {
    heading: "Effortless Integration",
    description: "Simply add TeWELL+ to the meals you already enjoy. It's designed to fit your lifestyle, not change it.",
    riceTitle: "Add to Rice",
    riceDesc: "Add 1 tablespoon per cup of rice before cooking to lower the glycemic index of your white rice.",
    flourTitle: "Mix with Flour",
    flourDesc: "Perfectly complements wheat flour, pastry mixes, or batter for added fiber and nutrition.",
    cookTitle: "Neutral Taste",
    cookDesc: "The neutral flavor of raw young jackfruit ensures your favorite Indonesian dishes taste exactly as they should."
  },
  recipes: {
    heading: "Usage & Recipes",
    subheading: "Transform your daily staples into diabetes-friendly superfoods.",
    howLabel: "How to Use:"
  },
  faq: {
    heading: "Frequently Asked Questions",
    subheading: "Learn more about the science of TeWELL+ Raw Young Jackfruit Powder."
  },
  footer: {
    mission: "Providing science-backed, natural solutions to help people manage diabetes through innovative cold-processed functional foods.",
    navHeading: "Navigation",
    contactHeading: "Contact Us",
    disclaimer: "DISCLAIMER: This product is a diabetes-friendly food. Always consult your physician before altering your medical diabetes treatment."
  }
};

const getRecipes = (lang: 'id' | 'en'): Recipe[] => [
  {
    name: lang === 'id' ? "Nasi Goreng Sehat Rendah GI" : "Healthy Low-GI Fried Rice",
    description: lang === 'id' ? "Ubah nasi goreng favorit Anda menjadi lebih sehat." : "Make your favorite fried rice healthier and fiber-rich.",
    howToAdd: lang === 'id' ? "Masak nasi putih dengan 1 sdm TeWELL+ sebelum diproses menjadi nasi goreng." : "Cook white rice with 1 tbsp TeWELL+ before turning it into fried rice.",
    image: "https://images.unsplash.com/photo-1596797038530-2c39bb91f939?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: lang === 'id' ? "Bakso Serat Tinggi" : "High Fiber Meatballs (Bakso)",
    description: lang === 'id' ? "Tekstur kenyal dengan tambahan serat alami nangka muda." : "Chewy texture with the added benefit of natural jackfruit fiber.",
    howToAdd: lang === 'id' ? "Campurkan 1 sdm TeWELL+ ke dalam adonan daging bakso sebelum dibentuk." : "Mix 1 tbsp TeWELL+ into the meatball dough before shaping.",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: lang === 'id' ? "Tumis Sayur Nutrisi" : "Nutritious Vegetable Stir-fry",
    description: lang === 'id' ? "Tambahan nutrisi tanpa merubah rasa gurih tumisan." : "A nutritional boost without changing the savory flavor of your stir-fry.",
    howToAdd: lang === 'id' ? "Taburkan 1 sdm TeWELL+ saat menumis bumbu sebelum sayuran dimasukkan." : "Sprinkle 1 tbsp TeWELL+ when sautéing spices before adding vegetables.",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800"
  }
];

const getBlogPosts = (lang: 'id' | 'en'): BlogPost[] => [
  {
    id: "1",
    title: lang === 'id' ? "Mengapa Nangka Muda Berbeda dengan Nangka Matang?" : "Why Young Jackfruit Differs from Ripe Jackfruit",
    date: "Oct 12, 2024",
    author: "Dr. Sarah Chen",
    category: lang === 'id' ? "Sains" : "Science",
    excerpt: lang === 'id' ? "Pelajari perbedaan kandungan glikemik antara buah mentah dan matang." : "Learn the glycemic differences between the raw and ripe fruit.",
    content: lang === 'id' ? "Banyak orang mengira nangka adalah buah yang manis dan harus dihindari oleh penderita diabetes..." : "Many people think jackfruit is a sweet fruit to avoid for diabetes...",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800"
  }
];

const getVariants = (lang: 'id' | 'en'): ProductVariant[] => [
  { 
    name: lang === 'id' ? 'Paket Pemula' : 'Starter Pack', 
    weight: '300g', 
    price: '85.000',
    currency: 'Rp',
    tag: lang === 'id' ? 'MULAI' : 'STARTER',
    popular: false,
    duration: lang === 'id' ? 'Stok 10 Hari' : '10 Day Supply'
  },
  { 
    name: lang === 'id' ? 'Paket Kesehatan' : 'Health Pack', 
    weight: '450g', 
    price: '120.000',
    currency: 'Rp',
    tag: lang === 'id' ? 'POPULER' : 'POPULAR',
    popular: true,
    duration: lang === 'id' ? 'Stok 15 Hari' : '15 Day Supply'
  },
  { 
    name: lang === 'id' ? 'Paket Keluarga' : 'Family Pack', 
    weight: '1kg', 
    price: '245.000',
    currency: 'Rp',
    tag: lang === 'id' ? 'HEMAT' : 'BEST VALUE',
    popular: false,
    duration: lang === 'id' ? 'Stok 1 Bulan' : '30 Day Supply'
  }
];

const getFaqs = (lang: 'id' | 'en'): FAQItem[] => [
  {
    question: lang === 'id' ? "Apa itu TeWELL+?" : "What is TeWELL+?",
    answer: lang === 'id' 
      ? "TeWELL+ adalah bubuk nangka muda mentah premium yang diproses secara dingin. Kaya serat dan memiliki indeks glikemik sangat rendah, menjadikannya pengganti karbohidrat alami yang ideal bagi penderita diabetes di Indonesia."
      : "TeWELL+ is a premium cold-processed raw young jackfruit powder. It is exceptionally high in fiber and has a very low glycemic index, making it an ideal natural staple replacement for people with diabetes."
  },
  {
    question: lang === 'id' ? "Apa bukti efektivitasnya secara global (Nature, ADA, USA)?" : "What is the global evidence of its effectiveness?",
    answer: lang === 'id'
      ? "TeWELL+ didukung oleh bukti klinis 'gold standard' (Double-Blind RCT) yang dipublikasikan di jurnal Nature Scientific Reports (2021), menunjukkan penurunan HbA1c rata-rata 0,9% dalam 90 hari. Efikasi nangka muda mentah juga telah divalidasi secara global melalui penelitian yang dipresentasikan di American Diabetes Association (ADA) di Amerika Serikat, serta diakui oleh para peneliti internasional sebagai intervensi pangan fungsional alami yang sangat efektif untuk kontrol glikemik tanpa obat-obatan kimia."
      : "TeWELL+ is backed by gold-standard clinical trials (Double-Blind RCT) published in Nature Scientific Reports (2021), demonstrating an average 0.9% reduction in HbA1c within 90 days. Its global effectiveness has been further validated by research presented at the American Diabetes Association (ADA) Scientific Sessions in the USA, and it is internationally recognized as a highly effective natural functional food intervention for glycemic management without chemical drugs."
  }
];

const getInvestmentContent = (lang: 'id' | 'en'): InvestmentContent => ({
  heading: lang === 'id' ? "Peluang Investasi Indonesia" : "Indonesian Investment Opportunity",
  subheading: lang === 'id' ? "Bergabunglah merevolusi pasar manajemen diabetes alami di negara dengan prevalensi tertinggi ke-5 di dunia." : "Join us in revolutionizing the natural diabetes management market in the world's 5th highest prevalence nation.",
  marketStats: [
    { label: lang === 'id' ? "Prevalensi di Indonesia" : "Prevalence in Indonesia", value: "19.5 Juta+" },
    { label: lang === 'id' ? "Potensi Pasar Nasional" : "National Market Potential", value: "Rp 150T+" },
    { label: lang === 'id' ? "CAGR Sektor Kesehatan" : "Health Sector CAGR", value: "9.2%" },
    { label: lang === 'id' ? "Keunggulan Biaya Produksi" : "Prod. Cost Advantage", value: "-40%" }
  ],
  pitchText: lang === 'id' ? 
    "Indonesia menempati peringkat ke-5 dunia dengan jumlah penderita diabetes terbanyak. TeWELL+ hadir sebagai solusi pangan fungsional berbasis nangka muda mentah lokal yang terintegrasi secara praktis dalam pola makan masyarakat, didukung oleh data klinis global dan efisiensi teknologi cold-process kami." : 
    "Indonesia ranks 5th globally in diabetes prevalence. TeWELL+ addresses this crisis with a raw young jackfruit-based functional food solution that fits seamlessly into the local diet, backed by global clinical validation and our efficient cold-process technology.",
  growthTitle: lang === 'id' ? "Mengapa Pasar Indonesia?" : "Why the Indonesian Market?",
  growthItems: [
    { title: lang === 'id' ? "Skalabilitas Bahan Baku" : "Raw Material Scalability", desc: lang === 'id' ? "Indonesia adalah salah satu produsen nangka terbesar di dunia." : "Indonesia is among the world's largest jackfruit producers." },
    { title: lang === 'id' ? "Hambatan Kompetisi" : "Competitive Moat", desc: lang === 'id' ? "Teknologi Cold-Process terpaten milik TeWELL+." : "TeWELL+'s proprietary Cold-Process technology." },
    { title: lang === 'id' ? "Penerimaan Kultural" : "Cultural Acceptance", desc: lang === 'id' ? "Nangka muda (tewel) adalah makanan pokok yang sudah dikenal luas di nusantara." : "Young jackfruit (tewel) is a widely recognized and accepted staple in Indonesia." }
  ],
  ctaText: lang === 'id' ? "Hubungi Hubungan Investor" : "Contact Investor Relations"
});

const getStudyData = (): StudyData[] => [
  { category: 'Avg HbA1c (%)', before: 8.1, after: 7.2 },
  { category: 'Fasting Sugar (mg/dL)', before: 154, after: 122 },
  { category: 'Body Weight (kg)', before: 74, after: 72 }
];

const getArticles = (lang: 'id' | 'en'): Article[] => [
  {
    title: lang === 'id' ? "Studi acak, double-blind, terkontrol plasebo untuk mengevaluasi efikasi tepung nangka mentah" : "A randomized, double-blind, placebo-controlled study to evaluate the efficacy of raw green jackfruit flour",
    journal: "Nutrition & Diabetes (Nature)",
    year: "2021",
    summary: lang === 'id' ? "Uji klinis yang menunjukkan penurunan signifikan pada kadar HbA1c dan glukosa darah puasa setelah 90 hari penggunaan tepung nangka muda." : "Clinical trial demonstrating a significant reduction in HbA1c and fasting blood glucose levels after 90 days of young jackfruit flour supplementation.",
    link: "https://www.nature.com/articles/s41387-021-00161-4",
    tags: ["Nature", "RCT", "HbA1c"]
  },
  {
    title: "719-P: A Randomized, Double-Blind, Placebo-Controlled Study",
    journal: "American Diabetes Association (ADA)",
    year: "2020",
    summary: lang === 'id' ? "Abstrak penelitian yang dipresentasikan di Sesi Ilmiah ADA ke-80, memvalidasi manfaat nangka muda mentah untuk kontrol glikemik." : "Research abstract presented at the 80th ADA Scientific Sessions, validating the glycemic control benefits of raw green jackfruit flour.",
    link: "https://diabetesjournals.org/diabetes/article/69/Supplement_1/719-P/57329/719-P-A-Randomized-Double-Blind-Placebo-Controlled",
    tags: ["ADA", "Gold Standard"]
  }
];

export const getDefaultContent = (lang: 'id' | 'en'): AppContentData => ({
  translations: lang === 'id' ? translationsID : translationsEN,
  recipes: getRecipes(lang),
  blogPosts: getBlogPosts(lang),
  faqs: getFaqs(lang),
  articles: getArticles(lang),
  studyData: getStudyData(),
  investment: getInvestmentContent(lang),
  variants: getVariants(lang)
});
