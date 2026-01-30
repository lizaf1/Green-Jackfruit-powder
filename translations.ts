
import { Translations, FAQItem, StudyData, Article, Recipe, BlogPost, AppContentData, InvestmentContent, ProductVariant } from './types';

const translationsID: Translations = {
  common: {
    brandTagline: "Terapi Nutrisi Medis Nangka Hijau Mentah",
    orderNow: "Pesan TeWELL+",
    backToHome: "Kembali ke Beranda",
    readBlog: "Baca Edukasi",
    viewData: "Data Klinis",
    securePayment: "Transaksi Aman & Terenkripsi",
    rights: "Seluruh Hak Dilindungi.",
  },
  nav: { home: "Beranda", evidence: "Bukti Klinis", usage: "Cara Pakai", recipes: "Resep", blog: "Edukasi", faq: "FAQ", investment: "Investasi" },
  hero: {
    badge: "Efektivitas Teruji Secara Klinis",
    titleMain: "Kendalikan Gula Darah Anda dengan ",
    description: "Bubuk Nangka Hijau Mentah Premium (TeWELL+) sebagai Terapi Nutrisi Medis (MNT). Terbukti secara klinis menurunkan HbA1c sebesar 0.25%, serta menurunkan FPG dan PPG secara signifikan dengan mengganti volume nasi atau terigu harian.",
    ctaEvidence: "Pelajari Hasil Studi",
    chartLabel: "Penurunan HbA1c",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800"
  },
  order: {
    heading: "Langkah Hidup Sehat",
    subheading: "Pilih paket TeWELL+ untuk memulai Terapi Nutrisi Medis (MNT) harian Anda dengan penggantian volume yang setara.",
    buyWA: "Pesan via WhatsApp", buyShopee: "Beli di Shopee", buyTikTok: "Beli di TikTok Shop",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "REKOMENDASI KLINIS",
    benefitRaw: "100% Nangka Hijau Mentah",
    benefitProven: "Efikasi Signifikan Teruji",
    benefitClean: "Tanpa Pengawet & Gula Tambahan",
    benefitCold: "Teknologi Cold-Process <50°C"
  },
  blog: { heading: "Pusat Edukasi", subheading: "Wawasan mendalam mengenai kesehatan metabolisme dan manfaat serat nangka hijau mentah.", readMore: "Baca Selengkapnya", backToBlog: "Kembali", viewAll: "Lihat Semua", readArticle: "Baca Artikel" },
  evidence: {
    heading: "Bukti Klinis Teruji",
    quote: "\"Pasien Kelompok A memiliki penurunan HbA1c, FPG, dan PPG yang secara signifikan lebih tinggi daripada Kelompok B demonstrasikan efikasi bubuk nangka sebagai terapi nutrisi medis harian.\"",
    studyTitle: "Uji Coba Terkontrol Acak (RCT)",
    studyDesc: "Penurunan HbA1c sebesar 0.25 pada kelompok TeWELL+ dibandingkan -0.02 pada kelompok placebo dengan signifikansi tinggi.",
    analysisTitle: "Efikasi Standar Emas",
    analysisDesc: "Publikasi di Scientific Reports (Nature Portfolio) mengonfirmasi efektivitas bubuk nangka hijau sebagai Terapi Nutrisi Medis (MNT) untuk kontrol glikemik yang unggul.",
    chartTitle: "Data Penurunan HbA1c (Studi Gopal dkk.)",
    chartDisclaimer: "*Sumber: Gopal dkk., Scientific Reports 2021. Hasil menunjukkan perbedaan signifikan antara Kelompok A dan Kelompok B.",
    pageTitle: "Sains & Metodologi",
    pageSubtitle: "Efikasi TeWELL+ didasarkan pada riset klinis transparan yang mengukur HbA1c, glukosa puasa (FPG), dan glukosa setelah makan (PPG).",
    readMore: "Lihat Jurnal Nature",
    coldProcessTitle: "Terapi Nutrisi Medis (MNT)",
    coldProcessDesc: "Penggantian volume nasi atau tepung secara setara memastikan asupan serat meningkat tanpa merubah rasa makanan, menjaga integritas metabolisme.",
    labels: {
      hba1c: "Penurunan HbA1c",
      period: "Kontrol Glikemik",
      baseline: "Placebo",
      result: "TeWELL+",
      goldStandard: "Studi Teruji Klinis",
      retention: "FPG Improved",
      integrity: "PPG Improved",
      pure: "MNT Certified"
    }
  },
  usage: {
    heading: "Terapi Nutrisi Medis",
    description: "Gantikan volume nasi atau terigu Anda dengan takaran TeWELL+ yang setara untuk hasil optimal.",
    riceTitle: "Substitusi Nasi", riceDesc: "Ganti 1 sendok makan beras dengan 1 sendok makan TeWELL+ (equal volume) sebelum dimasak.",
    flourTitle: "Substitusi Tepung", flourDesc: "Ganti sebagian porsi terigu dengan volume yang sama dari TeWELL+ untuk adonan yang lebih ramah diabetes.",
    cookTitle: "Equal Volume", cookDesc: "Metode penggantian volume yang setara memastikan asupan pati berkurang dan serat meningkat secara presisi.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Inspirasi Menu Sehat", subheading: "Ubah makanan pokok harian Anda menjadi sajian super ramah diabetes.", howLabel: "Metode MNT Setara Volume:", diabetesFriendly: "Ramah Diabetes" },
  faq: { heading: "Tanya Jawab", subheading: "Pertanyaan umum mengenai penggunaan dan manfaat TeWELL+." },
  footer: {
    mission: "Menghadirkan solusi alami berbasis sains untuk membantu pengelolaan diabetes melalui inovasi pangan fungsional terbaik.",
    navHeading: "Tautan", contactHeading: "Hubungi Kami", disclaimer: "PENTING: Produk ini adalah makanan kesehatan untuk Terapi Nutrisi Medis. Konsultasikan dengan dokter Anda.",
    backToTop: "Kembali ke Atas", orderProducts: "Daftar Produk", hours: "Senin - Jumat: 09:00 - 18:00"
  }
};

const translationsEN: Translations = {
  common: {
    brandTagline: "Raw Green Jackfruit Medical Nutrition Therapy",
    orderNow: "Order TeWELL+",
    backToHome: "Back to Home",
    readBlog: "Health Education",
    viewData: "Clinical Data",
    securePayment: "Secure & Encrypted Payments",
    rights: "All Rights Reserved.",
  },
  nav: { home: "Home", evidence: "Evidence", usage: "Usage", recipes: "Recipes", blog: "Education", faq: "FAQ", investment: "Investment" },
  hero: {
    badge: "Clinically Proven Efficacy",
    titleMain: "Master Your Blood Sugar with ",
    description: "Premium Raw Green Jackfruit Powder (TeWELL+) for Medical Nutrition Therapy (MNT). Clinically proven to lower HbA1c by 0.25%, with significant improvements in FPG and PPG by replacing equal volumes of staples.",
    ctaEvidence: "See Clinical Results",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800"
  },
  order: {
    heading: "Health Starts Here",
    subheading: "Start your daily Medical Nutrition Therapy (MNT) with the TeWELL+ clinical pack using the equal volume replacement method.",
    buyWA: "Order via WhatsApp", buyShopee: "Buy on Shopee", buyTikTok: "Buy on TikTok Shop",
    linkWA: "https://wa.me/62881036139972", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "CLINICALLY RECOMMENDED",
    benefitRaw: "100% Raw Green Jackfruit",
    benefitProven: "Significant Proven Efficacy",
    benefitClean: "No Preservatives or Added Sugar",
    benefitCold: "Cold-Processed <50°C"
  },
  blog: { heading: "Education Hub", subheading: "Insights into metabolic health and the science of raw green jackfruit fiber.", readMore: "Read More", backToBlog: "Back", viewAll: "View All", readArticle: "Read Article" },
  evidence: {
    heading: "Clinically Proven Efficacy",
    quote: "\"Patients from Group A had a significantly higher reduction in HbA1c, FPG, and PPG than Group B demonstrating the efficacy of jackfruit flour in glycemic control.\"",
    studyTitle: "Randomized Controlled Trial (RCT)",
    studyDesc: "Mean reduction of 0.25 in HbA1c for the TeWELL+ group vs -0.02 for the placebo group with high statistical significance.",
    analysisTitle: "Gold Standard Research",
    analysisDesc: "Peer-reviewed study in Scientific Reports demonstrates the efficacy of green jackfruit powder as medical nutrition therapy (MNT).",
    chartTitle: "Comparative Study Data (Gopal et al.)",
    chartDisclaimer: "*Source: Gopal et al. Significant decrease observed in HbA1c, FPG, and PPG for Group A compared to Group B.",
    pageTitle: "Science & Methodology",
    pageSubtitle: "The efficacy of TeWELL+ is validated by measuring HbA1c, Fasting Plasma Glucose (FPG), and Postprandial Glucose (PPG).",
    readMore: "View Journal",
    coldProcessTitle: "Medical Nutrition Therapy (MNT)",
    coldProcessDesc: "Replacing an equal volume of rice or wheat flour in daily meals ensures high-fiber, low-starch intake without compromising the taste of your favorite staples.",
    labels: {
      hba1c: "HbA1c Mean Diff",
      period: "Significant Control",
      baseline: "Placebo",
      result: "TeWELL+",
      goldStandard: "Clinically Validated Study",
      retention: "FPG Improved",
      integrity: "PPG Improved",
      pure: "MNT Ready"
    }
  },
  usage: {
    heading: "Medical Nutrition Therapy",
    description: "Use the 'Equal Volume' replacement strategy for effective glycemic management.",
    riceTitle: "Rice Replacement", riceDesc: "Replace 1 tablespoon of rice with 1 tablespoon of TeWELL+ before cooking in your rice cooker.",
    flourTitle: "Flour Substitution", flourDesc: "Replace a portion of wheat flour with an equal volume of TeWELL+ in your recipes.",
    cookTitle: "Equal Volume Rule", cookDesc: "Replacing equal volumes of starch with our green jackfruit powder significantly improves glucose levels.",
    usageImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },
  recipes: { heading: "Healthy Inspiration", subheading: "Transform your daily staples into diabetes-friendly superfoods.", howLabel: "Equal Volume Replacement:", diabetesFriendly: "Diabetes Friendly" },
  faq: { heading: "Frequently Asked Questions", subheading: "Common questions about TeWELL+ usage and clinical benefits." },
  footer: {
    mission: "Providing science-backed natural solutions to help people manage diabetes through innovative functional foods.",
    navHeading: "Navigation", contactHeading: "Support", disclaimer: "IMPORTANT: This product is intended for Medical Nutrition Therapy. Always consult your physician.",
    backToTop: "Back to Top", orderProducts: "Order Products", hours: "Mon - Fri: 09:00 - 18:00"
  }
};

export const getDefaultContent = (lang: 'id' | 'en'): AppContentData => ({
  translations: lang === 'id' ? translationsID : translationsEN,
  recipes: [
    { 
      name: lang === 'id' ? 'Nasi Putih Rendah GI' : 'Low GI White Rice', 
      description: lang === 'id' ? 'Cara termudah menjaga gula darah tanpa berpaling dari nasi.' : 'The easiest way to manage blood sugar without giving up rice.', 
      howToAdd: lang === 'id' ? 'Ganti 1 sdm beras dengan 1 sdm TeWELL+ per cup beras sebelum dimasak.' : 'Replace 1 tbsp of rice with 1 tbsp TeWELL+ per cup before cooking.', 
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: lang === 'id' ? 'Bakwan Sayur Sehat' : 'Healthy Vegetable Fritters', 
      description: lang === 'id' ? 'Camilan favorit kini dengan kandungan serat tinggi.' : 'Favorite snacks now with high fiber content.', 
      howToAdd: lang === 'id' ? 'Ganti sepertiga volume terigu dengan TeWELL+ dalam adonan bakwan.' : 'Replace 1/3 volume of wheat flour with TeWELL+ in your batter.', 
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: lang === 'id' ? 'Soto & Sup Glikemik' : 'Glycemic-Friendly Soups', 
      description: lang === 'id' ? 'Tambahan nutrisi rahasia dalam setiap mangkuk hangat.' : 'Secret nutrient boost in every warm bowl.', 
      howToAdd: lang === 'id' ? 'Aduk rata 1-2 sdm TeWELL+ langsung ke dalam mangkuk kuah sesaat sebelum dinikmati.' : 'Stir 1-2 tbsp TeWELL+ directly into your soup bowl before eating.', 
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' 
    }
  ], 
  blogPosts: [
    {
      id: "mnt-guide",
      title: lang === 'id' ? "Panduan Terapi Nutrisi Medis (MNT)" : "The Guide to Medical Nutrition Therapy (MNT)",
      date: "2024-03-20",
      author: "Dr. Fitriani",
      category: "Edukasi",
      excerpt: lang === 'id' ? "Apa itu MNT dan mengapa penggantian volume setara sangat krusial bagi penderita diabetes?" : "What is MNT and why is equal volume replacement crucial for diabetes management?",
      content: lang === 'id' ? "Medical Nutrition Therapy (MNT) adalah landasan dalam pengelolaan diabetes tipe 2. Berdasarkan studi yang dipublikasikan di Scientific Reports, nangka hijau mentah dapat bertindak sebagai agen MNT yang efektif. Kuncinya adalah penggantian volume yang setara. Jika Anda biasanya memasak 2 cup beras, gantilah 2 sdm beras tersebut dengan 2 sdm TeWELL+. Dengan cara ini, volume makanan tetap sama, rasa tetap lezat, namun asupan serat meningkat drastis sementara beban pati berkurang." : "Medical Nutrition Therapy (MNT) is the cornerstone of managing Type 2 Diabetes. According to clinical studies, raw green jackfruit acts as an effective MNT agent. The secret lies in 'equal volume replacement'. If you normally cook 2 cups of rice, simply replace 2 tbsp of that rice with 2 tbsp of TeWELL+. This keeps the volume consistent but significantly reduces starch while boosting fiber.",
      image: "https://images.unsplash.com/photo-1511688858344-1833878fcacc?auto=format&fit=crop&q=80&w=800"
    }
  ],
  faqs: [
    { 
      question: lang === 'id' ? 'Apa itu MNT?' : 'What is MNT?', 
      answer: lang === 'id' ? 'Medical Nutrition Therapy (MNT) adalah pendekatan terapeutik untuk mengobati kondisi medis melalui diet khusus. TeWELL+ digunakan sebagai MNT dengan mengganti sebagian volume karbohidrat pokok dengan volume nangka hijau mentah yang sama.' : 'Medical Nutrition Therapy (MNT) is a therapeutic approach to treating medical conditions through specifically tailored diets. TeWELL+ is used as MNT by replacing part of the carbohydrate volume with an equal volume of raw green jackfruit.' 
    }
  ],
  articles: [
    { 
      title: "Efficacy of green jackfruit flour in patients with type 2 diabetes mellitus: a randomized, double-blind study",
      journal: "Scientific Reports (Nature Portfolio)",
      year: "2021",
      summary: "Significant decrease in HbA1c observed in participants taking Green Jackfruit flour meal (0.25 vs -0.02) with high statistical certainty. Fasting (FPG) and Postprandial (PPG) levels also showed similar improvements.",
      link: "https://www.nature.com/articles/s41598-020-74916-z",
      tags: ["Nature", "MNT", "Clinically Proven"]
    }
  ], 
  studyData: [ { category: 'HbA1c Mean Diff', before: -0.02, after: 0.25 } ],
  investment: { 
    heading: lang === 'id' ? 'Investasi TeWELL+ Indonesia' : 'Invest in TeWELL+ Indonesia', 
    subheading: lang === 'id' ? 'Mendukung revolusi pangan fungsional untuk mengatasi krisis diabetes di Indonesia.' : 'Join the functional food revolution tackling the diabetes crisis in Indonesia.', 
    marketStats: [
      { label: lang === 'id' ? 'Jumlah Diabetisi RI' : 'Diabetes Cases in ID', value: lang === 'id' ? '19.5 Juta' : '19.5 Million' },
      { label: lang === 'id' ? 'Potensi Pasar RI' : 'ID Market Potential', value: 'Rp 40T+' },
      { label: lang === 'id' ? 'Target Penetrasi' : 'Penetration Target', value: '10%' },
      { label: lang === 'id' ? 'Ekspektasi ROI' : 'Expected ROI', value: 'High' }
    ], 
    pitchText: lang === 'id' ? 'Indonesia menduduki peringkat ke-5 dunia untuk jumlah penderita diabetes. TeWELL+ hadir sebagai solusi preventif yang scalable dan berbasis bukti ilmiah untuk pasar domestik yang masif.' : 'Indonesia ranks 5th globally in diabetes prevalence. TeWELL+ provides a scalable, science-backed solution specifically tailored for the massive Indonesian domestic market.', 
    growthTitle: lang === 'id' ? 'Strategi Pertumbuhan Indonesia' : 'Indonesia Growth Strategy', 
    growthItems: [
      { title: lang === 'id' ? 'Distribusi Digital (Online-First)' : 'Digital Distribution (Online-First)', desc: lang === 'id' ? 'Fase awal berfokus penuh pada penetrasi pasar online melalui marketplace dan D2C untuk efisiensi distribusi nasional yang cepat.' : 'The initial phase focuses entirely on online market penetration via marketplaces and D2C for rapid national distribution efficiency.' },
      { title: lang === 'id' ? 'Manufaktur Lokal Nangka Hijau' : 'Local Green Jackfruit Manufacturing', desc: lang === 'id' ? 'Mengoptimalkan rantai pasok nangka hijau mentah lokal dengan teknologi Cold-Process eksklusif untuk efisiensi biaya maksimal.' : 'Optimizing local green jackfruit supply chains with exclusive Cold-Process technology for maximum cost efficiency.' }
    ], 
    ctaText: lang === 'id' ? 'Hubungi Tim Investasi Indonesia' : 'Contact ID Investment Team',
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  variants: [
    { name: 'Home Starter Pack', weight: '300g', price: '89.000', currency: 'Rp', popular: false, tag: 'STARTER', duration: '10 Hari' },
    { name: 'Clinical Results Pack', weight: '900g', price: '255.000', currency: 'Rp', popular: true, tag: 'HEMAT', duration: '30 Hari' }
  ]
});
