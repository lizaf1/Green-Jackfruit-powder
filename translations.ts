
import { Translations, FAQItem, StudyData, Article, Recipe, BlogPost, AppContentData, InvestmentContent, ProductVariant } from './types';

const translationsID: Translations = {
  common: {
    brandTagline: "Pangan Fungsional Nangka Muda Mentah",
    orderNow: "Pesan TeWELL+",
    backToHome: "Kembali ke Beranda",
    readBlog: "Baca Edukasi",
    viewData: "Data Klinis",
    securePayment: "Transaksi Aman & Terenkripsi",
    rights: "Seluruh Hak Dilindungi.",
  },
  nav: { home: "Beranda", evidence: "Bukti Klinis", usage: "Cara Pakai", recipes: "Resep", blog: "Edukasi", faq: "FAQ", investment: "Investasi" },
  hero: {
    badge: "Dipublikasikan di Nature Scientific Reports",
    titleMain: "Kendalikan Gula Darah Anda dengan ",
    description: "Bubuk Nangka Muda Mentah Premium (TeWELL+) yang diproses melalui teknologi Cold-Process suhu rendah. Terbukti secara klinis dalam jurnal Nature untuk membantu menurunkan kadar HbA1c dan mengelola indeks glikemik.",
    ctaEvidence: "Pelajari Hasil Studi",
    chartLabel: "Penurunan HbA1c",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800"
  },
  order: {
    heading: "Langkah Hidup Sehat",
    subheading: "Pilih paket TeWELL+ yang sesuai dengan kebutuhan manajemen glikemik harian Anda.",
    buyWA: "Pesan via WhatsApp", buyShopee: "Beli di Shopee", buyTikTok: "Beli di TikTok Shop",
    linkWA: "https://wa.me/yournumber", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "REKOMENDASI KLINIS",
    benefitRaw: "100% Nangka Muda Hijau Mentah",
    benefitProven: "Teruji di Jurnal Nature",
    benefitClean: "Tanpa Pengawet & Gula Tambahan",
    benefitCold: "Teknologi Cold-Process <50°C"
  },
  blog: { heading: "Pusat Edukasi", subheading: "Wawasan mendalam mengenai kesehatan metabolisme dan manfaat serat nangka muda mentah.", readMore: "Baca Selengkapnya", backToBlog: "Kembali", viewAll: "Lihat Semua", readArticle: "Baca Artikel" },
  evidence: {
    heading: "Bukti Klinis Teruji",
    quote: "\"Penggantian 30g pati dengan tepung nangka hijau secara signifikan meningkatkan kontrol glikemik pada pasien diabetes tipe 2.\"",
    studyTitle: "Uji Coba Terkontrol Acak (RCT)",
    studyDesc: "Studi Double-Blind selama 90 hari menunjukkan penurunan HbA1c dari 8,2% menjadi 7,3% (rata-rata penurunan 0,9%).",
    analysisTitle: "Efikasi Standar Emas",
    analysisDesc: "Publikasi di Scientific Reports (Nature Portfolio) mengonfirmasi bahwa konsumsi harian 30g TeWELL+ efektif dalam pengelolaan glukosa darah.",
    chartTitle: "Data Penurunan HbA1c (Studi 90 Hari)",
    chartDisclaimer: "*Sumber: Gopal dkk., Nature Scientific Reports (2021). Hasil dapat bervariasi.",
    pageTitle: "Sains & Metodologi",
    pageSubtitle: "Efikasi TeWELL+ didasarkan pada riset klinis transparan dan teknologi pemrosesan suhu rendah.",
    readMore: "Lihat Jurnal Nature",
    coldProcessTitle: "Teknologi Cold-Process",
    coldProcessDesc: "Suhu tinggi merusak struktur serat pangan. Kami memproses nangka muda pada suhu ultra-rendah (<50°C) untuk memastikan seluruh enzim dan serat alami tetap aktif.",
    labels: {
      hba1c: "Penurunan HbA1c",
      period: "Durasi 90 Hari",
      baseline: "Baseline (Awal)",
      result: "Hasil Akhir",
      goldStandard: "Studi Standar Emas",
      retention: "Retensi Nutrisi",
      integrity: "Integritas Serat",
      pure: "100% Alami"
    }
  },
  usage: {
    heading: "Integrasi Praktis",
    description: "TeWELL+ memiliki rasa netral dan aroma yang sangat minim sehingga cocok untuk segala jenis masakan.",
    riceTitle: "Campur Nasi", riceDesc: "Tambahkan 1 sendok makan per cup beras sebelum dimasak. Menurunkan indeks glikemik nasi putih secara efektif.",
    flourTitle: "Substitusi Tepung", flourDesc: "Ganti 1/3 porsi terigu dengan TeWELL+ untuk membuat bakwan, martabak, atau roti yang lebih sehat.",
    cookTitle: "Siap Sajikan", cookDesc: "Taburkan langsung ke dalam kuah soto, sup, atau bubur selagi hangat sebelum dinikmati."
  },
  recipes: { heading: "Inspirasi Menu Sehat", subheading: "Ubah makanan pokok harian Anda menjadi sajian super ramah diabetes.", howLabel: "Cara Pakai:", diabetesFriendly: "Ramah Diabetes" },
  faq: { heading: "Tanya Jawab", subheading: "Pertanyaan umum mengenai penggunaan dan manfaat TeWELL+." },
  footer: {
    mission: "Menghadirkan solusi alami berbasis sains untuk membantu pengelolaan diabetes melalui inovasi pangan fungsional terbaik.",
    navHeading: "Tautan", contactHeading: "Hubungi Kami", disclaimer: "PENTING: Produk ini adalah makanan kesehatan. Konsultasikan dengan dokter Anda sebelum mengubah rejimen pengobatan diabetes.",
    backToTop: "Kembali ke Atas", orderProducts: "Daftar Produk", hours: "Senin - Jumat: 09:00 - 18:00"
  }
};

const translationsEN: Translations = {
  common: {
    brandTagline: "Raw Young Jackfruit Functional Food",
    orderNow: "Order TeWELL+",
    backToHome: "Back to Home",
    readBlog: "Health Education",
    viewData: "Clinical Data",
    securePayment: "Secure & Encrypted Payments",
    rights: "All Rights Reserved.",
  },
  nav: { home: "Home", evidence: "Evidence", usage: "Usage", recipes: "Recipes", blog: "Education", faq: "FAQ", investment: "Investment" },
  hero: {
    badge: "Published in Nature Scientific Reports",
    titleMain: "Master Your Blood Sugar with ",
    description: "Premium Raw Young Jackfruit Powder (TeWELL+) processed using cold-process technology. Clinically proven in Nature journals to lower HbA1c levels and manage glycemic index naturally.",
    ctaEvidence: "See Clinical Results",
    chartLabel: "HbA1c Reduction",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800"
  },
  order: {
    heading: "Health Starts Here",
    subheading: "Choose the TeWELL+ pack that fits your daily glycemic management goals.",
    buyWA: "Order via WhatsApp", buyShopee: "Buy on Shopee", buyTikTok: "Buy on TikTok Shop",
    linkWA: "https://wa.me/yournumber", linkShopee: "https://shopee.co.id/tewellplus", linkTikTok: "https://www.tiktok.com/@tewellplus",
    variantTagPopular: "CLINICALLY RECOMMENDED",
    benefitRaw: "100% Raw Green Jackfruit",
    benefitProven: "Nature Journal Certified",
    benefitClean: "No Preservatives or Added Sugar",
    benefitCold: "Cold-Processed <50°C"
  },
  blog: { heading: "Education Hub", subheading: "Insights into metabolic health and the science of raw young jackfruit fiber.", readMore: "Read More", backToBlog: "Back", viewAll: "View All", readArticle: "Read Article" },
  evidence: {
    heading: "Clinically Proven Efficacy",
    quote: "\"Replacement of 30g of starch with green jackfruit flour significantly improved glycemic control in type 2 diabetes mellitus.\"",
    studyTitle: "Randomized Controlled Trial (RCT)",
    studyDesc: "A 90-day double-blind study showed an HbA1c reduction from 8.2% to 7.3% (0.9% absolute drop).",
    analysisTitle: "Gold Standard Research",
    analysisDesc: "Publication in Scientific Reports (Nature Portfolio) confirms that daily 30g consumption of TeWELL+ effectively manages blood glucose.",
    chartTitle: "HbA1c Reduction (90-Day Study)",
    chartDisclaimer: "*Source: Gopal et al., Nature Scientific Reports (2021). Results may vary.",
    pageTitle: "Science & Methodology",
    pageSubtitle: "The efficacy of TeWELL+ is built on transparent clinical research and proprietary cold-process technology.",
    readMore: "View Nature Journal",
    coldProcessTitle: "Cold-Process Advantage",
    coldProcessDesc: "High heat destroys nutrient structure. We process at <50°C to ensure fibers and enzymes stay active and effective for your body.",
    labels: {
      hba1c: "HbA1c Reduction",
      period: "90-Day Duration",
      baseline: "Baseline",
      result: "Final Result",
      goldStandard: "Gold Standard Study",
      retention: "Nutrient Retention",
      integrity: "Fiber Integrity",
      pure: "100% Natural"
    }
  },
  usage: {
    heading: "Seamless Integration",
    description: "TeWELL+ has a neutral taste and fits perfectly into your favorite daily meals.",
    riceTitle: "Mix with Rice", riceDesc: "Add 1 tablespoon per cup of rice before cooking. Effectively lowers the GI of white rice.",
    flourTitle: "Flour Substitute", flourDesc: "Replace 1/3 of wheat flour with TeWELL+ for healthier fritters, pancakes, or bread.",
    cookTitle: "Ready to Stir", cookDesc: "Stir directly into warm soups, porridge, or stews before serving."
  },
  recipes: { heading: "Healthy Inspiration", subheading: "Transform your daily staples into diabetes-friendly superfoods.", howLabel: "Usage:", diabetesFriendly: "Diabetes Friendly" },
  faq: { heading: "Frequently Asked Questions", subheading: "Common questions about TeWELL+ usage and clinical benefits." },
  footer: {
    mission: "Providing science-backed natural solutions to help people manage diabetes through innovative functional foods.",
    navHeading: "Navigation", contactHeading: "Support", disclaimer: "IMPORTANT: This is a health food. Always consult your physician before altering your medical diabetes treatment.",
    backToTop: "Back to Top", orderProducts: "Order Products", hours: "Mon - Fri: 09:00 - 18:00"
  }
};

export const getDefaultContent = (lang: 'id' | 'en'): AppContentData => ({
  translations: lang === 'id' ? translationsID : translationsEN,
  recipes: [
    { 
      name: lang === 'id' ? 'Nasi Putih Rendah GI' : 'Low GI White Rice', 
      description: lang === 'id' ? 'Cara termudah menjaga gula darah tanpa berpaling dari nasi.' : 'The easiest way to manage blood sugar without giving up rice.', 
      howToAdd: lang === 'id' ? 'Campurkan 1 sdm TeWELL+ ke dalam 1 cup beras sebelum dimasak di rice cooker.' : 'Mix 1 tbsp TeWELL+ per cup of rice before cooking.', 
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: lang === 'id' ? 'Bakwan Sayur Sehat' : 'Healthy Vegetable Fritters', 
      description: lang === 'id' ? 'Camilan favorit kini dengan kandungan serat tinggi.' : 'Favorite snacks now with high fiber content.', 
      howToAdd: lang === 'id' ? 'Ganti sepertiga takaran tepung terigu dengan TeWELL+ dalam adonan bakwan.' : 'Replace 1/3 of wheat flour with TeWELL+ in your batter.', 
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      name: lang === 'id' ? 'Soto & Sup Glikemik' : 'Glycemic-Friendly Soups', 
      description: lang === 'id' ? 'Tambahan nutrisi rahasia dalam setiap mangkuk hangat.' : 'Secret nutrient boost in every warm bowl.', 
      howToAdd: lang === 'id' ? 'Aduk rata 1-2 sdm TeWELL+ langsung ke dalam mangkuk kuah sesaat sebelum dinikmati.' : 'Stir 1-2 tbsp TeWELL+ directly into your soup bowl before eating.', 
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' 
    }
  ], 
  blogPosts: [],
  faqs: [
    { 
      question: lang === 'id' ? 'Bagaimana cara kerjanya?' : 'How does it work?', 
      answer: lang === 'id' ? 'Serat alami dalam nangka muda mentah memperlambat penyerapan glukosa di usus halus, sehingga mencegah lonjakan gula darah setelah makan.' : 'Natural fiber in raw young jackfruit slows down glucose absorption in the small intestine, preventing blood sugar spikes after meals.' 
    }
  ],
  articles: [
    { 
      title: "Efficacy of green jackfruit flour in patients with type 2 diabetes mellitus: a randomized, double-blind study",
      journal: "Scientific Reports (Nature Portfolio)",
      year: "2021",
      summary: "Significant reduction in HbA1c (0.9% absolute) observed in 90 days with daily consumption of 30g raw green jackfruit powder.",
      link: "https://www.nature.com/articles/s41598-020-74916-z",
      tags: ["Nature", "Scientific Reports", "Clinical Trial"]
    }
  ], 
  studyData: [ { category: 'HbA1c', before: 8.2, after: 7.3 } ],
  investment: { heading: '', subheading: '', marketStats: [], pitchText: '', growthTitle: '', growthItems: [], ctaText: '' },
  variants: [
    { name: 'Home Starter Pack', weight: '300g', price: '89.000', currency: 'Rp', popular: false, tag: 'STARTER', duration: '10 Hari' },
    { name: 'Clinical Results Pack', weight: '900g', price: '255.000', currency: 'Rp', popular: true, tag: 'HEMAT', duration: '30 Hari' }
  ]
});
