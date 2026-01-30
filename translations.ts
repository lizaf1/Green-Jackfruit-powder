// This file manages localized content and default application data.
import { Translations, AppContentData, Locale } from './types';

// Admin authentication key
export const MASTER_ADMIN_PASSWORD = 'admin007'; 

// Default translations for Indonesian locale
const translationsID: Translations = {
  common: {
    brandTagline: "Terapi Nutrisi Medis (MNT) Nangka Muda powder",
    orderNow: "Pesan Sekarang",
    backToHome: "Beranda",
    readBlog: "Pelajari Sains",
    viewData: "Data Klinis",
    securePayment: "Transaksi Aman & Terenkripsi",
    rights: "Seluruh Hak Dilindungi.",
    socialMetaImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
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
    badge: "Teruji Klinis: Nature Scientific Reports (2021)",
    titleMain: "Kendalikan Gula Darah dengan ",
    description: "Satu-satunya Bubuk Nangka Muda Mentah yang terbukti secara klinis dalam Uji Coba Terkontrol Acak (RCT) untuk menurunkan HbA1c, Gula Darah Puasa (FPG), dan Gula Darah Pasca Makan (PPG).",
    ctaEvidence: "Lihat Hasil Studi Nature",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
  },
  order: {
    heading: "Mulai Terapi Nutrisi Medis",
    subheading: "Tersedia dalam kemasan 300g dan 900g. 100% Alami, Tinggi Serat & Tanpa Pengawet.",
    buyWA: "WhatsApp Support", buyShopee: "Beli di Shopee", buyTikTok: "Beli di TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "PILIHAN UTAMA",
    benefitRaw: "100% Nangka Muda powder Mentah",
    benefitProven: "Efikasi Klinis Teruji (HbA1c -0.25%)",
    benefitClean: "Alami, Tanpa Pewarna & Pengawet",
    benefitCold: "Diproses Dingin (Teknologi Cold-Processed)"
  },
  blog: { heading: "Pusat Edukasi", subheading: "Wawasan mendalam mengenai Nangka Muda powder.", readMore: "Baca", backToBlog: "Kembali", viewAll: "Lihat Semua", readArticle: "Baca Artikel" },
  evidence: {
    heading: "Bukti Klinis Teruji (RCT)",
    quote: "\"Konsumsi harian Nangka Muda powder menghasilkan penurunan HbA1c yang signifikan dibandingkan placebo dalam studi 12 minggu.\"",
    studyTitle: "Uji Coba Terkontrol Acak (RCT)",
    studyDesc: "Studi Double-Blind selama 12 minggu dipublikasikan di Nature Scientific Reports.",
    analysisTitle: "Efikasi Standar Emas",
    analysisDesc: "Nangka Muda powder divalidasi sebagai terapi nutrisi yang efektif untuk manajemen glikemik.",
    chartTitle: "Data Komparatif HbA1c (Nature 2021)",
    chartDisclaimer: "*Data berdasarkan Nature Scientific Reports (2021) 11:11528.",
    pageTitle: "Sains Nangka Muda powder",
    pageSubtitle: "Validasi ilmiah internasional dari jurnal medis terkemuka dunia.",
    readMore: "Jurnal Lengkap",
    coldProcessTitle: "Metode Terapi Nutrisi (MNT)",
    coldProcessDesc: "Cukup tambahkan Nangka Muda powder ke nasi atau tepung untuk menurunkan beban glikemik hidangan Anda.",
    labels: { hba1c: "Penurunan HbA1c", period: "12 Minggu", baseline: "Placebo", result: "TeWELL+ Jackfruit", goldStandard: "Klinis", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "Cara Penggunaan",
    description: "Sangat mudah dicampur dengan makanan pokok harian.",
    riceTitle: "Campuran Nasi", riceDesc: "Cukup 1 sdm untuk setiap cup beras sebelum dimasak.",
    flourTitle: "Campuran Tepung", flourDesc: "1 sdm untuk setiap 3 sdm tepung terigu/gandum.",
    cookTitle: "Konsistensi", cookDesc: "Gunakan setiap hari untuk hasil optimal pada kadar HbA1c.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Inspirasi Menu", subheading: "Sajian sehat dan lezat yang ramah untuk diabetes.", howLabel: "Saran:", diabetesFriendly: "Low Glycemic Index" },
  faq: { heading: "Pertanyaan Umum", subheading: "Pelajari lebih lanjut tentang manfaat dan penggunaan." },
  footer: { mission: "Inovasi pangan fungsional berbasis bukti klinis untuk manajemen diabetes alami di Indonesia.", navHeading: "Tautan", contactHeading: "Kontak", disclaimer: "Informasi ini bukan pengganti saran medis. Konsultasikan dengan dokter Anda.", backToTop: "Kembali ke Atas", orderProducts: "Daftar Produk", hours: "Senin - Jumat: 09:00 - 18:00 WIB" }
};

// Default translations for English locale
const translationsEN: Translations = {
  common: {
    brandTagline: "Raw Young Jackfruit powder Medical Nutrition Therapy",
    orderNow: "Order Now",
    backToHome: "Home",
    readBlog: "Learn Science",
    viewData: "Clinical Data",
    securePayment: "Secure & Encrypted",
    rights: "All Rights Reserved.",
    socialMetaImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
  },
  nav: { home: "Home", evidence: "Evidence", usage: "Usage", recipes: "Recipes", blog: "Education", faq: "FAQ", investment: "Investment" },
  hero: {
    badge: "Clinically Proven: Nature Scientific Reports (2021)",
    titleMain: "Master Your Blood Sugar with ",
    description: "The only Raw Young Jackfruit powder clinically proven in a Randomized Controlled Trial (RCT) to lower HbA1c, Fasting Blood Glucose (FPG), and Postprandial Glucose (PPG).",
    ctaEvidence: "View Nature Study",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
  },
  order: {
    heading: "Start Your Therapy",
    subheading: "Available in 300g and 900g packs. Natural, High Fiber and Low GI.",
    buyWA: "WhatsApp Support", buyShopee: "Shop on Shopee", buyTikTok: "Shop on TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "CLINICALLY RECOMMENDED",
    benefitRaw: "100% Young Jackfruit powder",
    benefitProven: "Proven Clinical Efficacy (HbA1c -0.25%)",
    benefitClean: "Natural, No Preservatives",
    benefitCold: "Cold-Processed Technology"
  },
  blog: { heading: "Education Hub", subheading: "Evidence-based insights into Young Jackfruit powder.", readMore: "Read", backToBlog: "Back", viewAll: "View All", readArticle: "Read Article" },
  evidence: {
    heading: "Clinical Evidence (RCT)",
    quote: "\"Daily consumption of Young Jackfruit powder resulted in a significantly higher reduction in HbA1c in 12 weeks.\"",
    studyTitle: "Randomized Controlled Trial (RCT)",
    studyDesc: "12-week study published in Nature Scientific Reports (2021).",
    analysisTitle: "Gold Standard Evidence",
    analysisDesc: "Peer-reviewed confirmation of young jackfruit's role in sustainable diabetes management.",
    chartTitle: "HbA1c Comparative Data (Nature 2021)",
    chartDisclaimer: "*Source: Nature Scientific Reports 11, 11528 (2021).",
    pageTitle: "The Science of Jackfruit",
    pageSubtitle: "Internationally validated medical nutrition therapy.",
    readMore: "Full Journal",
    coldProcessTitle: "Medical Nutrition Therapy (MNT)",
    coldProcessDesc: "Add to your standard staples to reduce the glycemic load of every meal.",
    labels: { hba1c: "HbA1c Drop", period: "12 Weeks", baseline: "Placebo", result: "TeWELL+ Jackfruit", goldStandard: "Clinical", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "Simple Steps to Use",
    description: "Easily integrate into your daily meals.",
    riceTitle: "Rice Mix", riceDesc: "1 tbsp for every cup of rice before cooking.",
    flourTitle: "Flour Mix", flourDesc: "1 tbsp for every 3 tbsp of flour or wheat.",
    cookTitle: "Consistency", cookDesc: "Daily consumption ensures optimal glycemic stability.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Menu Inspiration", subheading: "Nutritious and delicious diabetes-friendly ideas.", howLabel: "Tip:", diabetesFriendly: "Low GI" },
  faq: { heading: "FAQ", subheading: "Everything you need to know about TeWELL+." },
  footer: { mission: "Functional food innovation based on clinical evidence for natural diabetes management.", navHeading: "Links", contactHeading: "Contact", disclaimer: "This product is for nutritional support. Consult your physician.", backToTop: "Back to Top", orderProducts: "Product List", hours: "Mon - Fri: 09:00 - 18:00 WIB" }
};

// Generates the complete initial content structure for the application
export const getDefaultContent = (l: Locale): AppContentData => {
  const trans = l === 'id' ? translationsID : translationsEN;
  return {
    translations: trans,
    recipes: [
      { name: l === 'id' ? "Nasi Campur TeWELL+" : "TeWELL+ Rice Mix", description: l === 'id' ? "Metode termudah untuk menurunkan indeks glikemik nasi putih harian Anda." : "The easiest way to lower the GI of your daily white rice.", howToAdd: l === 'id' ? "1 sdm per cup beras" : "1 tbsp per cup rice", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800" },
      { name: l === 'id' ? "Roti Sehat Rendah Karbo" : "Low-Carb Health Bread", description: l === 'id' ? "Campuran tepung untuk baking yang lebih sehat dan tinggi serat." : "Flour mix for healthier, fiber-rich baking.", howToAdd: l === 'id' ? "Rasio campuran 30%" : "30% mixing ratio", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" }
    ],
    articles: [
      { title: "Efficacy of young jackfruit flour in patients with type 2 diabetes mellitus", journal: "Nature Scientific Reports", year: "2021", summary: l === 'id' ? "Uji klinis menunjukkan penurunan HbA1c, FPG, dan PPG yang secara signifikan lebih tinggi." : "Clinical trial showed significantly higher reduction in HbA1c, FPG, and PPG.", link: "https://www.nature.com/articles/s41598-020-73593-1", tags: ["RCT", "Nature", "Clinical"] }
    ],
    faqs: [
      { question: l === 'id' ? "Apa perbedaan TeWELL+ dengan nangka biasa?" : "What's the difference between TeWELL+ and normal jackfruit?", answer: l === 'id' ? "TeWELL+ terbuat dari nangka muda mentah yang dikeringkan dengan suhu rendah untuk menjaga kadar serat dan nutrisi terapeutiknya." : "TeWELL+ is made from raw young jackfruit dried at low temperatures to preserve therapeutic fiber and nutrients." }
    ],
    studyData: [
      { category: l === 'id' ? "Penurunan HbA1c (%)" : "HbA1c Reduction (%)", before: 7.5, after: 7.25 },
      { category: l === 'id' ? "Gula Darah (mg/dL)" : "Blood Sugar (mg/dL)", before: 140, after: 125 }
    ],
    blogPosts: [
      { id: "nature-study-deep-dive", title: l === 'id' ? "Analisis Studi Nature 2021" : "Nature 2021 Study Deep Dive", date: "2024-01-10", author: "Medical Team", category: "Science", excerpt: l === 'id' ? "Mengapa 30g bubuk nangka setiap hari bisa merubah profil HbA1c Anda." : "Why 30g of jackfruit powder daily can transform your HbA1c profile.", content: "The study published in Nature Scientific Reports 2021 proved that adding young jackfruit to staples significantly improves glycemic control...", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800" }
    ],
    investment: {
      heading: l === 'id' ? "Peluang Investasi TeWELL+" : "Investment Opportunity",
      subheading: l === 'id' ? "Membangun masa depan diabetes care berbasis pangan fungsional." : "Building the future of functional-food based diabetes care.",
      marketStats: [{ label: l === 'id' ? "Populasi Diabetes ID" : "ID Diabetes Population", value: "19.5M" }],
      pitchText: l === 'id' ? "Kami menggabungkan kearifan pangan lokal dengan sains modern untuk skala nasional." : "We merge local food wisdom with modern science for national scalability.",
      growthTitle: l === 'id' ? "Strategi Pertumbuhan" : "Growth Strategy",
      growthItems: [{ title: l === 'id' ? "Ekspansi Retail" : "Retail Expansion", desc: l === 'id' ? "Target ketersediaan di seluruh apotek modern." : "Targeting availability in all modern pharmacies." }],
      ctaText: l === 'id' ? "Hubungi Kami" : "Contact Us",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    variants: [
      { name: "Starter Kit", weight: "300g", price: "150.000", currency: "Rp", tag: "Trial Pack", popular: false, duration: l === 'id' ? "10 Hari" : "10 Days" },
      { name: "Clinical Pack", weight: "900g", price: "400.000", currency: "Rp", tag: "Most Effective", popular: true, duration: l === 'id' ? "30 Hari" : "30 Days" }
    ]
  };
};