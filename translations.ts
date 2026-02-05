
// This file manages localized content and default application data.
import { Translations, AppContentData, Locale } from './types';

// Admin authentication key
export const MASTER_ADMIN_PASSWORD = 'admin007'; 

// Default translations for Indonesian locale
const translationsID: Translations = {
  common: {
    brandTagline: "Medical Nutrition Therapy (MNT) Green Jackfruit Powder",
    orderNow: "Pesan Sekarang",
    backToHome: "Beranda",
    readBlog: "Pelajari Sains",
    viewData: "Data Klinis",
    securePayment: "Transaksi Aman & Terenkripsi",
    rights: "Seluruh Hak Dilindungi.",
    socialMetaImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg",
    consultWA: "Konsultasi via WhatsApp"
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
    badge: "Publikasi Nature Scientific Reports (2021)",
    titleMain: "Green Jackfruit Powder: Nutrisi Medis (MNT) untuk Stabilkan Gula Darah",
    description: "Bukan sekadar tepung. Superfood alami pengganti nasi yang teruji klinis menurunkan HbA1c.",
    ctaEvidence: "Lihat Hasil Studi Nature",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
  },
  order: {
    heading: "Mulai Terapi Nutrisi Medis",
    subheading: "30g per hari (1 sdm setiap makan) terbukti secara klinis menurunkan kadar gula darah.",
    buyWA: "Pesan via WhatsApp", buyShopee: "Beli di Shopee", buyTikTok: "Beli di TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "PILIHAN UTAMA",
    benefitRaw: "100% Green Jackfruit Powder Mentah",
    benefitProven: "Efikasi Nature 2021 (HbA1c -0.25%)",
    benefitClean: "Indeks Glikemik Sangat Rendah",
    benefitCold: "Teknologi Proses Dingin (Pectin Retained)"
  },
  blog: { heading: "Pusat Edukasi", subheading: "Wawasan ilmiah mengenai Green Jackfruit Powder.", readMore: "Baca", backToBlog: "Kembali", viewAll: "Lihat Semua", readArticle: "Baca Artikel" },
  evidence: {
    heading: "Bukti Klinis Teruji (RCT)",
    quote: "\"Penurunan HbA1c, FPG, dan PPG secara signifikan lebih tinggi pada kelompok nangka muda dibandingkan kelompok placebo.\"",
    studyTitle: "Uji Coba Terkontrol Acak (RCT)",
    studyDesc: "Studi 12 minggu terhadap 40 pasien T2DM yang dipublikasikan di jurnal Nature.",
    analysisTitle: "Hasil Signifikan Secara Medis",
    analysisDesc: "Penelitian menunjukkan bahwa mengganti satu sendok makan nasi/tepung dengan bubuk nangka muda mentah memberikan kontrol glikemik yang superior.",
    chartTitle: "Data Komparatif (Nature Scientific Reports)",
    chartDisclaimer: "*Nature Scientific Reports (2021) 11:11528. Hasil bervariasi per individu.",
    pageTitle: "Validasi Ilmiah Nature 2021",
    pageSubtitle: "Hasil Uji Klinis Terkontrol Acak (RCT) Standar Emas.",
    readMore: "Baca Jurnal Lengkap",
    coldProcessTitle: "Metode Terapi Nutrisi (MNT)",
    coldProcessDesc: "Gunakan 30 gram per hari (1 sendok makan setiap waktu makan) untuk hasil optimal.",
    labels: { hba1c: "HbA1c Drop", period: "12 Minggu", baseline: "Placebo", result: "Jackfruit Powder", goldStandard: "Nature Verified", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "Protokol 30 Gram",
    description: "Cukup tambahkan 1 sendok makan ke piring Anda setiap kali makan.",
    riceTitle: "Campuran Nasi", riceDesc: "Aduk 1 sdm ke nasi hangat atau campur sebelum dimasak.",
    flourTitle: "Campuran Tepung", flourDesc: "Ganti 1/3 porsi tepung terigu dengan bubuk nangka muda.",
    cookTitle: "Konsistensi", cookDesc: "Gunakan 3x sehari (total 30g) untuk hasil seperti studi klinis.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Inspirasi Menu", subheading: "Sajian sehat yang ramah untuk diabetes.", howLabel: "Saran:", diabetesFriendly: "Low Glycemic Index" },
  faq: { heading: "Pertanyaan Umum", subheading: "Pelajari lebih lanjut tentang manfaat dan penggunaan." },
  footer: { 
    mission: "Inovasi pangan fungsional berbasis bukti klinis untuk manajemen diabetes alami.", 
    navHeading: "Tautan", 
    contactHeading: "Kontak", 
    disclaimer: "Produk ini adalah makanan fungsional (Functional Food), bukan pengganti obat dokter. Konsultasikan dengan ahli medis Anda.", 
    backToTop: "Kembali ke Atas", 
    orderProducts: "Daftar Produk", 
    hours: "Senin - Jumat: 09:00 - 18:00 WIB",
    address: "Office & Production: Jember, Jawa Timur, Indonesia"
  }
};

// Default translations for English locale
const translationsEN: Translations = {
  common: {
    brandTagline: "Raw Green Jackfruit Powder Medical Nutrition Therapy",
    orderNow: "Order Now",
    backToHome: "Home",
    readBlog: "Learn Science",
    viewData: "Clinical Data",
    securePayment: "Secure & Encrypted",
    rights: "All Rights Reserved.",
    socialMetaImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg",
    consultWA: "Consult via WhatsApp"
  },
  nav: { home: "Home", evidence: "Evidence", usage: "Usage", recipes: "Recipes", blog: "Education", faq: "FAQ", investment: "Investment" },
  hero: {
    badge: "Published in Nature Scientific Reports (2021)",
    titleMain: "Green Jackfruit Powder: Medical Nutrition (MNT) for Blood Sugar Stability",
    description: "More than just flour. A clinically proven natural superfood rice replacement to lower HbA1c.",
    ctaEvidence: "View Nature Study",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
  },
  order: {
    heading: "Start Your Therapy",
    subheading: "30g per day (1 tbsp per meal) is clinically proven to reduce blood sugar levels.",
    buyWA: "Order via WhatsApp", buyShopee: "Shop on Shopee", buyTikTok: "Shop on TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "CLINICALLY RECOMMENDED",
    benefitRaw: "100% Green Jackfruit Powder",
    benefitProven: "Nature 2021 Efficacy (HbA1c -0.25%)",
    benefitClean: "Very Low Glycemic Index",
    benefitCold: "Cold-Processed Pectin Retention"
  },
  blog: { heading: "Education Hub", subheading: "Evidence-based insights into Green Jackfruit Powder.", readMore: "Read", backToBlog: "Back", viewAll: "View All", readArticle: "Read Article" },
  evidence: {
    heading: "Clinical Evidence (RCT)",
    quote: "\"Mean reduction in HbA1c, FPG, and PPG was significantly higher in the jackfruit group than in the placebo group.\"",
    studyTitle: "Randomized Controlled Trial (RCT)",
    studyDesc: "Double-blind study of 40 patients published in Nature Scientific Reports.",
    analysisTitle: "Clinically Significant Outcomes",
    analysisDesc: "Replacing one tablespoon of carbohydrate staples with green jackfruit powder provides superior glycemic control.",
    chartTitle: "Nature 2021 Comparative Data",
    chartDisclaimer: "*Source: Nature Scientific Reports 11, 11528 (2021). Results may vary.",
    pageTitle: "The Science of Green Jackfruit",
    pageSubtitle: "Gold-standard Randomized Controlled Trial (RCT) validation.",
    readMore: "Full Journal",
    coldProcessTitle: "Medical Nutrition Therapy (MNT)",
    coldProcessDesc: "The 30g/day protocol (1 tbsp per meal) is the target for clinical effectiveness.",
    labels: { hba1c: "HbA1c Drop", period: "12 Weeks", baseline: "Placebo", result: "Jackfruit Powder", goldStandard: "Nature Verified", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "The 30g Protocol",
    description: "Simply add 1 tablespoon to your plate at every meal.",
    riceTitle: "Rice Mix", riceDesc: "Mix 1 tbsp into your cooked rice or add to cooker.",
    flourTitle: "Flour Mix", flourDesc: "Replace 1/3 of your flour with jackfruit powder.",
    cookTitle: "Consistency", cookDesc: "Use 3x daily (total 30g) to match clinical trial results.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Menu Inspiration", subheading: "Nutritious and delicious diabetes-friendly ideas.", howLabel: "Tip:", diabetesFriendly: "Low GI" },
  faq: { heading: "FAQ", subheading: "Everything you need to know about TeWELL+." },
  footer: { 
    mission: "Functional food innovation based on clinical evidence for natural diabetes management.", 
    navHeading: "Links", 
    contactHeading: "Contact", 
    disclaimer: "This product is a functional food, not a substitute for prescribed medication. Consult your healthcare professional.", 
    backToTop: "Back to Top", 
    orderProducts: "Product List", 
    hours: "Mon - Fri: 09:00 - 18:00 WIB",
    address: "Office & Production: Jember, East Java, Indonesia"
  }
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
      { title: "Efficacy of Green Jackfruit Flour in Patients with Type 2 Diabetes Mellitus", journal: "Nature Scientific Reports", year: "2021", summary: l === 'id' ? "Uji klinis menunjukkan penurunan HbA1c, FPG, dan PPG yang secara signifikan lebih tinggi pada kelompok nangka." : "Clinical trial showed significantly higher reduction in HbA1c, FPG, and PPG in the jackfruit group.", link: "https://www.nature.com/articles/s41598-021-92931-w", tags: ["RCT", "Nature", "Clinical"] }
    ],
    faqs: [
      { question: l === 'id' ? "Apa perbedaan TeWELL+ dengan nangka biasa?" : "What's the difference between TeWELL+ and normal jackfruit?", answer: l === 'id' ? "TeWELL+ terbuat dari nangka muda mentah yang dikeringkan dengan suhu rendah untuk menjaga kadar serat dan nutrisi terapeutiknya." : "TeWELL+ is made from raw young jackfruit dried at low temperatures to preserve therapeutic fiber and nutrients." }
    ],
    studyData: [
      { category: l === 'id' ? "HbA1c (%)" : "HbA1c (%)", before: 7.5, after: 7.25 },
      { category: l === 'id' ? "Gula Darah Puasa (mg/dL)" : "Fasting Glucose (mg/dL)", before: 140, after: 125 }
    ],
    blogPosts: [
      { id: "nature-study-deep-dive", title: l === 'id' ? "Analisis Studi Nature 2021" : "Nature 2021 Study Deep Dive", date: "2024-01-10", author: "Medical Team", category: "Science", excerpt: l === 'id' ? "Mengapa 30g bubuk nangka setiap hari bisa merubah profil HbA1c Anda." : "Why 30g of jackfruit powder daily can transform your HbA1c profile.", content: "The study published in Nature Scientific Reports 2021 proved that adding Green Jackfruit to staples significantly improves glycemic control. Participants were given 30g of green jackfruit flour per day, replacing an equal volume of their regular staples like rice or wheat. After 12 weeks, the intervention group saw a mean reduction in HbA1c of 0.25% compared to 0.02% in the placebo group.", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800" }
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
