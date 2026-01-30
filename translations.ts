
// This file manages localized content and default application data.
import { Translations, AppContentData, Locale } from './types';

// Admin authentication key
export const MASTER_ADMIN_PASSWORD = 'admin007'; 

// Default translations for Indonesian locale
const translationsID: Translations = {
  common: {
    brandTagline: "Terapi Nutrisi Medis (MNT) green Jackfruit powder",
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
    badge: "Teruji Klinis: Nature Scientific Reports",
    titleMain: "Kendalikan Gula Darah dengan ",
    description: "green Jackfruit powder mentah (BUBUK NANGKA MUDA HIJAU) yang terbukti secara klinis dalam Uji Coba Terkontrol Acak (RCT) untuk menurunkan HbA1c dan Gula Darah.",
    ctaEvidence: "Lihat Hasil Studi Nature",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
  },
  order: {
    heading: "Mulai Terapi Nutrisi Medis",
    subheading: "Tersedia dalam kemasan 300g dan 900g. Cukup tambahkan ke makanan harian Anda.",
    buyWA: "WhatsApp Support", buyShopee: "Beli di Shopee", buyTikTok: "Beli di TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "PILIHAN UTAMA",
    benefitRaw: "100% green Jackfruit powder Mentah",
    benefitProven: "Efikasi Teruji Secara Klinis",
    benefitClean: "Alami, Tinggi Serat & Sehat",
    benefitCold: "Diproses Dingin (Cold-Processed)"
  },
  blog: { heading: "Pusat Edukasi", subheading: "Wawasan mendalam mengenai green Jackfruit powder.", readMore: "Baca", backToBlog: "Kembali", viewAll: "Lihat Semua", readArticle: "Baca Artikel" },
  evidence: {
    heading: "Bukti Klinis Teruji (RCT)",
    quote: "\"Konsumsi harian green Jackfruit powder menghasilkan penurunan HbA1c yang signifikan dibandingkan placebo.\"",
    studyTitle: "Uji Coba Terkontrol Acak (RCT)",
    studyDesc: "Studi Double-Blind selama 12 minggu dipublikasikan di Nature Scientific Reports.",
    analysisTitle: "Efikasi Standar Emas",
    analysisDesc: " green Jackfruit powder divalidasi sebagai terapi nutrisi yang efektif.",
    chartTitle: "Data Komparatif HbA1c (2021)",
    chartDisclaimer: "*Data berdasarkan jurnal medis terkemuka.",
    pageTitle: "Sains green Jackfruit powder",
    pageSubtitle: "Validasi ilmiah internasional untuk manajemen diabetes.",
    readMore: "Jurnal Lengkap",
    coldProcessTitle: "Metode Terapi Nutrisi (MNT)",
    coldProcessDesc: "Tambahkan green Jackfruit powder ke nasi atau tepung untuk menurunkan beban glikemik.",
    labels: { hba1c: "Penurunan HbA1c", period: "90 Hari", baseline: "Placebo", result: "green Jackfruit powder", goldStandard: "Klinis", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "Cara Penggunaan",
    description: "Mudah dicampur dengan makanan pokok.",
    riceTitle: "Campuran Nasi", riceDesc: "1 sdm untuk setiap cup beras.",
    flourTitle: "Campuran Tepung", flourDesc: "1 sdm untuk setiap 3 sdm tepung.",
    cookTitle: "Konsistensi", cookDesc: "Gunakan setiap hari untuk hasil optimal.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Inspirasi Menu", subheading: "Sajian sehat ramah diabetes.", howLabel: "Saran:", diabetesFriendly: "Low GI" },
  faq: { heading: "FAQ", subheading: "Pertanyaan seputar green Jackfruit powder." },
  footer: { mission: "Inovasi pangan fungsional berbasis bukti klinis untuk manajemen diabetes alami.", navHeading: "Tautan", contactHeading: "Kontak", disclaimer: "Konsultasikan dengan dokter Anda sebelum merubah rejimen obat.", backToTop: "Kembali ke Atas", orderProducts: "Daftar Produk", hours: "Senin - Jumat: 09:00 - 18:00 WIB" }
};

// Default translations for English locale
const translationsEN: Translations = {
  common: {
    brandTagline: "Raw green Jackfruit powder Medical Nutrition Therapy",
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
    badge: "Clinically Proven: Nature Scientific Reports",
    titleMain: "Master Your Blood Sugar with ",
    description: "Raw green Jackfruit powder clinically proven to significantly lower HbA1c and Blood Sugar levels.",
    ctaEvidence: "View Nature Study",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg"
  },
  order: {
    heading: "Start Your Therapy",
    subheading: "Available in 300g and 900g packs. Natural, High Fiber & Healthy.",
    buyWA: "WhatsApp Support", buyShopee: "Shop on Shopee", buyTikTok: "Shop on TikTok",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "CLINICALLY RECOMMENDED",
    benefitRaw: "100% green Jackfruit powder",
    benefitProven: "Significant Proven Efficacy",
    benefitClean: "Natural, High Fiber & Healthy",
    benefitCold: "Cold-Processed (<50°C)"
  },
  blog: { heading: "Education Hub", subheading: "Deep insights into green Jackfruit powder.", readMore: "Read", backToBlog: "Back", viewAll: "View All", readArticle: "Read Article" },
  evidence: {
    heading: "Proven Clinical Efficacy (RCT)",
    quote: "\"Daily consumption of green Jackfruit powder resulted in a significantly higher reduction in HbA1c compared to placebo.\"",
    studyTitle: "Randomized Controlled Trial (RCT)",
    studyDesc: "12-week study published in Nature Scientific Reports.",
    analysisTitle: "Gold Standard Evidence",
    analysisDesc: "Confirmed role of green Jackfruit powder in diabetes management.",
    chartTitle: "HbA1c Comparative Data (2021)",
    chartDisclaimer: "*Data reflects clinical trial results.",
    pageTitle: "Science of green Jackfruit powder",
    pageSubtitle: "International scientific validation.",
    readMore: "Full Journal",
    coldProcessTitle: "Medical Nutrition Therapy (MNT)",
    coldProcessDesc: "Add green Jackfruit powder to your staples to lower glycemic load.",
    labels: { hba1c: "HbA1c Drop", period: "90 Days", baseline: "Placebo", result: "green Jackfruit powder", goldStandard: "Clinical", retention: "FPG Improved", integrity: "PPG Improved", pure: "MNT Ready" }
  },
  usage: {
    heading: "Usage Steps",
    description: "Easy to mix with your favorite foods.",
    riceTitle: "Rice Mix", riceDesc: "1 tbsp for every cup of rice.",
    flourTitle: "Flour Mix", flourDesc: "1 tbsp for every 3 tbsp of flour.",
    cookTitle: "Consistency", cookDesc: "Daily use ensures optimal glycemic stability.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Menu Inspiration", subheading: "Diabetes-friendly healthy dishes.", howLabel: "Tip:", diabetesFriendly: "Low GI" },
  faq: { heading: "FAQ", subheading: "Questions about green Jackfruit powder." },
  footer: { mission: "Functional food innovation based on clinical evidence for natural diabetes management.", navHeading: "Links", contactHeading: "Contact", disclaimer: "Consult your doctor before changing your medication regimen.", backToTop: "Back to Top", orderProducts: "Product List", hours: "Monday - Friday: 09:00 - 18:00 WIB" }
};

// Generates the complete initial content structure for the application
export const getDefaultContent = (l: Locale): AppContentData => {
  const trans = l === 'id' ? translationsID : translationsEN;
  return {
    translations: trans,
    recipes: [
      { name: l === 'id' ? "Campuran Nasi Diabetes" : "Diabetes Rice Mix", description: l === 'id' ? "Pengganti makanan pokok harian standar." : "Standard daily staple replacement.", howToAdd: l === 'id' ? "1 sdm per cup beras" : "1 tbsp per cup rice", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800" },
      { name: l === 'id' ? "Roti Rendah GI" : "Low-GI Bread", description: l === 'id' ? "Alternatif baking yang diperkaya serat." : "Fiber-enriched baking alternative.", howToAdd: l === 'id' ? "Rasio penggantian 30%" : "30% replacement ratio", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" }
    ],
    articles: [
      { title: l === 'id' ? "Hasil Uji Klinis" : "Clinical Trial Results", journal: "Nature Scientific Reports", year: "2021", summary: l === 'id' ? "Penurunan HbA1c yang signifikan diamati." : "Significant HbA1c reduction observed.", link: "https://www.nature.com/articles/s41598-020-73593-1", tags: ["RCT", "Peer Reviewed"] }
    ],
    faqs: [
      { question: l === 'id' ? "Bagaimana cara kerjanya?" : "How does it work?", answer: l === 'id' ? "Menggantikan makanan pokok karbohidrat tinggi dengan bubuk nangka mentah tinggi serat, menurunkan beban glikemik." : "It replaces high-carb staples with high-fiber raw jackfruit powder, lowering glycemic load." }
    ],
    studyData: [
      { category: l === 'id' ? "Penurunan HbA1c" : "HbA1c Reduction", before: 7.5, after: 7.25 },
      { category: l === 'id' ? "Gula Darah Puasa" : "Fasting Glucose", before: 140, after: 125 }
    ],
    blogPosts: [
      { id: "mnt-guide", title: l === 'id' ? "Panduan MNT" : "Guide to MNT", date: "2024-01-01", author: "Dr. Jack", category: "Education", excerpt: l === 'id' ? "Pelajari dasar-dasar Terapi Nutrisi Medis." : "Learn the basics of Medical Nutrition Therapy.", content: "Medical Nutrition Therapy (MNT) is evidence-based medical therapy provided by a registered dietitian or nutrition professional...", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800" }
    ],
    investment: {
      heading: l === 'id' ? "Masa Depan Pangan Fungsional" : "Future of Functional Food",
      subheading: l === 'id' ? "Berinvestasi dalam nutrisi berbasis klinis." : "Investing in clinical-first nutrition.",
      marketStats: [{ label: l === 'id' ? "Pertumbuhan Pasar" : "Market Growth", value: "15%" }],
      pitchText: l === 'id' ? "Pangan fungsional mewakili garis depan baru dalam perawatan kesehatan." : "Functional foods represent the next frontier in healthcare.",
      growthTitle: l === 'id' ? "Strategi" : "Strategy",
      growthItems: [{ title: l === 'id' ? "Ekspansi" : "Expansion", desc: l === 'id' ? "Skala di seluruh Asia Tenggara." : "Scaling across SE Asia." }],
      ctaText: l === 'id' ? "Hubungi Sekarang" : "Inquire Now",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    variants: [
      { name: "Starter Pack", weight: "300g", price: "150.000", currency: "Rp", tag: "Trial", popular: false, duration: l === 'id' ? "10 Hari" : "10 Days" },
      { name: "Treatment Pack", weight: "900g", price: "400.000", currency: "Rp", tag: "Best Value", popular: true, duration: l === 'id' ? "30 Hari" : "30 Days" }
    ]
  };
};
