
import { Translations, AppContentData } from './types';

export const MASTER_ADMIN_PASSWORD = 'admin007'; 

const translationsID: Translations = {
  common: {
    brandTagline: "Terapi Nutrisi Medis (MNT) green Jackfruit powder",
    orderNow: "Pesan Sekarang",
    backToHome: "Beranda",
    readBlog: "Pelajari Sains",
    viewData: "Data Klinis",
    securePayment: "Transaksi Aman & Terenkripsi",
    rights: "Seluruh Hak Dilindungi.",
    socialMetaImage: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1200"
  },
  nav: { 
    home: "Beranda", 
    evidence: "Bukti Klinis", 
    usage: "Cara Pakai", 
    recipes: "Resep MNT", 
    blog: "Edukasi", 
    faq: "FAQ", 
    investment: "Investasi" 
  },
  hero: {
    badge: "Teruji Klinis: Scientific Reports (Nature)",
    titleMain: "Kendalikan Gula Darah dengan ",
    description: "Satu-satunya green Jackfruit powder mentah yang terbukti secara klinis dalam Uji Coba Terkontrol Acak (RCT) untuk menurunkan HbA1c, Gula Darah Puasa (FPG), dan Gula Darah Pasca Makan (PPG).",
    ctaEvidence: "Lihat Hasil Studi Nature",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1200"
  },
  order: {
    heading: "Mulai Terapi Nutrisi Medis",
    subheading: "Cukup tambahkan 1 sdm green Jackfruit powder ke dalam makanan pokok Anda setiap hari untuk manajemen glikemik yang lebih baik.",
    buyWA: "WhatsApp Support", buyShopee: "Beli di Shopee", buyTikTok: "Beli di TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "REKOMENDASI STUDI",
    benefitRaw: "100% green Jackfruit powder Mentah",
    benefitProven: "Efikasi Signifikan Teruji",
    benefitClean: "Tanpa Pengawet & Gula",
    benefitCold: "Cold-Processed (<50°C)"
  },
  blog: { heading: "Pusat Edukasi Glikemik", subheading: "Wawasan mendalam mengenai kesehatan metabolisme dan serat green Jackfruit powder.", readMore: "Baca", backToBlog: "Kembali", viewAll: "Lihat Semua", readArticle: "Baca Artikel" },
  evidence: {
    heading: "Bukti Klinis Teruji (RCT)",
    quote: "\"Konsumsi 30g green Jackfruit powder mentah setiap hari menghasilkan penurunan HbA1c, Gula Darah Puasa (FPG), dan Gula Darah Pasca Makan (PPG) yang signifikan secara statistik dibandingkan placebo.\"",
    studyTitle: "Uji Coba Terkontrol Acak (RCT)",
    studyDesc: "Studi Double-Blind selama 12 minggu menunjukkan penurunan HbA1c sebesar 0.25 pada kelompok intervensi vs -0.02 pada placebo.",
    analysisTitle: "Efikasi Standar Emas",
    analysisDesc: "Dipublikasikan di Scientific Reports (Nature Portfolio), mengonfirmasi peran green Jackfruit powder sebagai terapi nutrisi yang efektif bagi penderita Diabetes Tipe 2.",
    chartTitle: "Data Komparatif HbA1c (Gopal et al. 2021)",
    chartDisclaimer: "*Data berdasarkan rata-rata perubahan HbA1c harian selama 90 hari.",
    pageTitle: "Sains di Balik green Jackfruit powder",
    pageSubtitle: "Kami menggunakan data transparan dari jurnal medis terkemuka untuk memvalidasi setiap klaim kesehatan kami.",
    readMore: "Jurnal Lengkap",
    coldProcessTitle: "Metode Terapi Nutrisi (MNT)",
    coldProcessDesc: "Cukup tambahkan sesendok green Jackfruit powder ke dalam porsi makanan harian Anda untuk membantu menurunkan beban glikemik tanpa merubah rasa.",
    labels: { hba1c: "Penurunan HbA1c", period: "90 Hari", baseline: "Placebo", result: "green Jackfruit powder", goldStandard: "Klinis", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "Langkah Penggunaan",
    description: "Cukup ikuti langkah mudah berikut ini.",
    riceTitle: "Campuran Nasi", riceDesc: "Tambahkan 1 sdm green Jackfruit powder untuk setiap cup beras sebelum dimasak.",
    flourTitle: "Campuran Tepung", flourDesc: "Campurkan 1 sdm green Jackfruit powder untuk setiap 3 sdm tepung terigu atau adonan.",
    cookTitle: "Kunci Konsistensi", cookDesc: "Gunakan secara rutin setiap hari untuk menjaga profil glikemik yang stabil.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Inspirasi Menu MNT", subheading: "Ubah makanan pokok menjadi sajian ramah diabetes.", howLabel: "Saran Penyajian:", diabetesFriendly: "Low GI Safe" },
  faq: { heading: "Pertanyaan Umum", subheading: "Informasi teknis mengenai penggunaan klinis green Jackfruit powder mentah." },
  footer: { mission: "Inovasi pangan fungsional berbasis bukti klinis untuk manajemen diabetes alami di Indonesia dan seluruh dunia.", navHeading: "Tautan Navigasi", contactHeading: "Hubungi Kami", disclaimer: "Produk ini dimaksudkan untuk Terapi Nutrisi Medis (MNT). Selalu konsultasikan dengan dokter Anda sebelum merubah rejimen obat.", backToTop: "Kembali ke Atas", orderProducts: "Daftar Produk", hours: "Senin - Jumat: 09:00 - 18:00 WIB" }
};

const translationsEN: Translations = {
  common: {
    brandTagline: "Raw green Jackfruit powder Medical Nutrition Therapy",
    orderNow: "Order Now",
    backToHome: "Home",
    readBlog: "Learn Science",
    viewData: "Clinical Data",
    securePayment: "Secure & Encrypted",
    rights: "All Rights Reserved.",
    socialMetaImage: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1200"
  },
  nav: { home: "Home", evidence: "Evidence", usage: "Usage", recipes: "Recipes", blog: "Education", faq: "FAQ", investment: "Investment" },
  hero: {
    badge: "Clinically Proven: Nature Scientific Reports",
    titleMain: "Master Your Blood Sugar with ",
    description: "The only green Jackfruit powder clinically proven in a Randomized Controlled Trial (RCT) to significantly lower HbA1c, FPG, and PPG levels.",
    ctaEvidence: "View Nature Study",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1200"
  },
  order: {
    heading: "Start Your Therapy",
    subheading: "Simply add 1 tbsp of green Jackfruit powder to your daily staples for significant glycemic improvement.",
    buyWA: "WhatsApp Support", buyShopee: "Shop on Shopee", buyTikTok: "Shop on TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "CLINICALLY RECOMMENDED",
    benefitRaw: "100% green Jackfruit powder",
    benefitProven: "Significant Proven Efficacy",
    benefitClean: "No Additives or Sugar",
    benefitCold: "Cold-Processed (<50°C)"
  },
  blog: { heading: "Glycemic Hub", subheading: "Deep insights into metabolic health and functional fibers.", readMore: "Read", backToBlog: "Back", viewAll: "View All", readArticle: "Read Article" },
  evidence: {
    heading: "Proven Clinical Efficacy (RCT)",
    quote: "\"Daily consumption of 30g green Jackfruit powder resulted in a significantly higher reduction in HbA1c, FPG, and PPG compared to placebo.\"",
    studyTitle: "Randomized Controlled Trial (RCT)",
    studyDesc: "12-week Double-blind study showed 0.25 HbA1c reduction in intervention group vs -0.02 in placebo.",
    analysisTitle: "Gold Standard Evidence",
    analysisDesc: "Published in Scientific Reports (Nature Portfolio), confirming green Jackfruit powder as a potent medical nutrition therapy for Type 2 Diabetes.",
    chartTitle: "HbA1c Comparative Data (Gopal et al. 2021)",
    chartDisclaimer: "*Data reflects mean HbA1c change over 90 days.",
    pageTitle: "The Science of TeWELL+ green Jackfruit powder",
    pageSubtitle: "We use transparent data from world-leading medical journals to validate our health claims.",
    readMore: "Full Journal",
    coldProcessTitle: "Medical Nutrition Therapy (MNT)",
    coldProcessDesc: "Adding just a spoonful of green Jackfruit powder to your daily meal helps lower the overall glycemic load without changing your eating habits.",
    labels: { hba1c: "HbA1c Drop", period: "90 Days", baseline: "Placebo", result: "green Jackfruit powder", goldStandard: "Clinical", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "Usage Steps",
    description: "Simply follow these easy daily steps.",
    riceTitle: "Rice Mix", riceDesc: "Add 1 tbsp of green Jackfruit powder for every cup of rice before cooking.",
    flourTitle: "Flour Mix", flourDesc: "Mix 1 tbsp of green Jackfruit powder for every 3 tbsp of flour or batter.",
    cookTitle: "Daily Consistency", cookDesc: "Consistency is key. Use it daily to maintain stable glycemic profiles.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "MNT Recipes", subheading: "Transform daily staples into diabetes-friendly meals.", howLabel: "Preparation Suggestion:", diabetesFriendly: "Low GI Safe" },
  faq: { heading: "FAQ", subheading: "Technical information for clinical usage of green Jackfruit powder." },
  footer: { mission: "Evidence-based functional food innovation for natural diabetes management in Indonesia and globally.", navHeading: "Navigation Links", contactHeading: "Get in Touch", disclaimer: "This product is intended for Medical Nutrition Therapy (MNT). Consult your physician before changing medication.", backToTop: "Top", orderProducts: "Products", hours: "Mon - Fri: 09:00 - 18:00 WIB" }
};

export const getDefaultContent = (lang: 'id' | 'en'): AppContentData => {
  const data: Record<'id' | 'en', AppContentData> = {
    id: {
      translations: translationsID,
      recipes: [
        { name: 'Nasi Rendah GI', description: 'Nasi putih pulen dengan beban glikemik 40% lebih rendah.', howToAdd: 'Tambahkan 1 sdm green Jackfruit powder per cup beras.', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800' },
        { name: 'Roti MNT Sehat', description: 'Roti gandum dengan tambahan serat fungsional nangka.', howToAdd: 'Campurkan green Jackfruit powder ke dalam adonan tepung.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800' },
        { name: 'Smoothie Hijau', description: 'Minuman serat tinggi untuk energi tanpa lonjakan gula.', howToAdd: 'Campurkan 1 sdm bubuk ke dalam jus atau smoothie.', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800' }
      ], 
      blogPosts: [
        { id: "nature-study-2021", title: "Terobosan Klinis: Penurunan HbA1c dengan green Jackfruit powder", date: "2024-03-25", author: "TeWELL+ Team", category: "Medis", excerpt: "Bagaimana studi RCT di jurnal Nature membuktikan efikasi green Jackfruit powder mentah?", content: "Studi yang dipublikasikan di Scientific Reports (Nature Portfolio) mengonfirmasi bahwa penambahan green Jackfruit powder mentah ke dalam porsi makanan harian secara signifikan menurunkan kadar HbA1c, Gula Darah Puasa (FPG), dan Gula Darah Pasca Makan (PPG). Hal ini disebabkan oleh tingginya kandungan serat fungsional dan resistensi pati dalam nangka hijau mentah yang diproses secara khusus.", image: "https://images.unsplash.com/photo-1579154235602-4c07920364e6?auto=format&fit=crop&q=80&w=800" }
      ],
      faqs: [
        { question: 'Apakah rasanya akan merubah masakan?', answer: 'Tidak. green Jackfruit powder mentah kami bersifat netral dan tidak memiliki rasa atau aroma yang kuat, sehingga tidak merubah cita rasa masakan asli Anda.' },
        { question: 'Berapa dosis harian yang disarankan?', answer: 'Berdasarkan studi klinis Gopal et al. 2021, dosis ideal adalah 30 gram per hari (sekitar 3 sendok makan) yang dibagi ke dalam beberapa waktu makan.' }
      ],
      articles: [{ title: "Efficacy of green jackfruit flour in patients with type 2 diabetes mellitus", journal: "Scientific Reports (Nature)", year: "2021", summary: "Significantly higher reduction in HbA1c observed in 30g jackfruit group (0.25 vs -0.02).", link: "https://www.nature.com/articles/s41598-021-92900-4", tags: ["Nature", "Gold Standard", "RCT"] }], 
      studyData: [{ category: 'HbA1c Reduction', before: -0.02, after: 0.25 }],
      investment: { heading: 'Masa Depan Manajemen Diabetes', subheading: 'Investasi di pasar diabetes terbesar ke-5 di dunia.', marketStats: [{ label: 'Penderita Diabetes ID', value: '19.5 Juta' }, { label: 'Potensi Pasar', value: '$2.4M+' }, { label: 'Peringkat Global', value: '#5' }, { label: 'Pertumbuhan Tahunan', value: '12.5%' }], pitchText: 'Indonesia adalah pasar krusial untuk solusi manajemen diabetes alami berbasis bukti. TeWELL+ memadukan kearifan lokal dengan validasi ilmiah internasional.', growthTitle: 'Strategi Pertumbuhan', growthItems: [{ title: 'DTC Digital', desc: 'Ekspansi agresif melalui Shopee Mall, TikTok Shop, dan platform e-commerce kesehatan.' }, { title: 'B2B Medical', desc: 'Kerjasama dengan jaringan rumah sakit dan klinik spesialis untuk rekomendasi MNT.' }], ctaText: 'Hubungi Tim Investasi', image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
      variants: [
        { name: 'Standard Pack', weight: '300g', price: '89.000', currency: 'Rp', popular: false, tag: 'COBA SEKARANG', duration: '10 Hari' },
        { name: 'Clinical Therapy Pack', weight: '900g', price: '255.000', currency: 'Rp', popular: true, tag: 'BEST VALUE', duration: '30 Hari' }
      ]
    },
    en: {
      translations: translationsEN,
      recipes: [
        { name: 'Low GI White Rice', description: 'Fluffy white rice with 40% lower glycemic load.', howToAdd: 'Add 1 tbsp green Jackfruit powder per cup of rice.', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800' },
        { name: 'MNT Healthy Bread', description: 'Wheat bread enriched with functional jackfruit fiber.', howToAdd: 'Mix green Jackfruit powder into your standard flour.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800' },
        { name: 'Fiber Smoothie', description: 'High fiber drink for energy without sugar spikes.', howToAdd: 'Mix 1 tbsp into your juice or smoothie.', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800' }
      ], 
      blogPosts: [
        { id: "nature-study-2021-en", title: "Clinical Breakthrough: HbA1c Reduction with green Jackfruit powder", date: "2024-03-25", author: "TeWELL+ Team", category: "Medical", excerpt: "How a Nature journal study proved the efficacy of green Jackfruit powder flour.", content: "The study published in Scientific Reports (Nature Portfolio) confirmed that adding raw green Jackfruit powder flour to daily meals significantly lowers HbA1c, FPG, and PPG levels. This is attributed to the high functional fiber content and resistant starch that slows glucose absorption.", image: "https://images.unsplash.com/photo-1579154235602-4c07920364e6?auto=format&fit=crop&q=80&w=800" }
      ],
      faqs: [
        { question: 'Will it change the taste of my food?', answer: 'No. Our green Jackfruit powder is neutral and processed to be flavorless, ensuring your meals taste exactly as intended.' },
        { question: 'What is the recommended daily dose?', answer: 'Per the Gopal et al. 2021 study, the ideal dose is 30 grams per day (approx. 3 tablespoons) distributed across meals.' }
      ],
      articles: [{ title: "Efficacy of green jackfruit flour in patients with type 2 diabetes mellitus", journal: "Scientific Reports (Nature)", year: "2021", summary: "Significantly higher reduction in HbA1c observed in 30g jackfruit group (0.25 vs -0.02).", link: "https://www.nature.com/articles/s41598-021-92900-4", tags: ["Nature", "Gold Standard", "RCT"] }], 
      studyData: [{ category: 'HbA1c Reduction', before: -0.02, after: 0.25 }],
      investment: { heading: 'The Future of Diabetes Management', subheading: 'Invest in the 5th largest diabetes market globally.', marketStats: [{ label: 'ID Diabetes Cases', value: '19.5M' }, { label: 'Market Potential', value: '$2.4M+' }, { label: 'Global Rank', value: '#5' }, { label: 'YOY Growth', value: '12.5%' }], pitchText: 'Indonesia is a critical market for natural, evidence-based diabetes management solutions. TeWELL+ combines local wisdom with international scientific validation.', growthTitle: 'Growth Strategy', growthItems: [{ title: 'Digital DTC', desc: 'Scaling via Shopee Mall, TikTok Shop, and professional health platforms.' }, { title: 'B2B Clinical', desc: 'Partnering with premium clinics and hospitals for MNT endorsement.' }], ctaText: 'Contact Investment Team', image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
      variants: [
        { name: 'Standard Pack', weight: '300g', price: '89.000', currency: 'Rp', popular: false, tag: 'TRY NOW', duration: '10 Days' },
        { name: 'Clinical Therapy Pack', weight: '900g', price: '255.000', currency: 'Rp', popular: true, tag: 'BEST VALUE', duration: '30 Hari' }
      ]
    }
  };
  return data[lang];
};
