
export type View = 'home' | 'evidence' | 'blog' | 'admin' | 'investment' | 'brand-kit' | 'sitemap';
export type Locale = 'id' | 'en';

export interface StudyData {
  category: string;
  before: number;
  after: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  title: string;
  journal: string;
  year: string;
  summary: string;
  link?: string;
  tags: string[];
}

export interface Recipe {
  name: string;
  description: string;
  howToAdd: string;
  image: string;
}

export interface ProductVariant {
  name: string;
  weight: string;
  price: string;
  currency: string;
  tag: string;
  popular: boolean;
  duration: string;
  linkWA?: string;
  linkShopee?: string;
  linkTikTok?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface InvestmentContent {
  heading: string;
  subheading: string;
  marketStats: { label: string; value: string }[];
  pitchText: string;
  growthTitle: string;
  growthItems: { title: string; desc: string }[];
  ctaText: string;
  image: string;
}

export interface AppContentData {
  translations: Translations;
  recipes: Recipe[];
  articles: Article[];
  faqs: FAQItem[];
  studyData: StudyData[];
  blogPosts: BlogPost[];
  investment: InvestmentContent;
  variants: ProductVariant[];
}

export interface CMSData {
  id: AppContentData;
  en: AppContentData;
}

export interface Translations {
  common: {
    brandTagline: string;
    orderNow: string;
    backToHome: string;
    readBlog: string;
    viewData: string;
    securePayment: string;
    rights: string;
    customLogo?: string;
    socialMetaImage?: string;
    consultWA: string;
  };
  nav: {
    home: string;
    evidence: string;
    usage: string;
    recipes: string;
    blog: string;
    faq: string;
    investment: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    description: string;
    ctaEvidence: string;
    chartLabel: string;
    heroImage: string;
  };
  order: {
    heading: string;
    subheading: string;
    buyWA: string;
    buyShopee: string;
    buyTikTok: string;
    linkWA: string;
    linkShopee: string;
    linkTikTok: string;
    variantTagPopular: string;
    benefitRaw: string;
    benefitProven: string;
    benefitClean: string;
    benefitCold: string;
  };
  blog: {
    heading: string;
    subheading: string;
    readMore: string;
    backToBlog: string;
    viewAll: string;
    readArticle: string;
  };
  evidence: {
    heading: string;
    quote: string;
    studyTitle: string;
    studyDesc: string;
    analysisTitle: string;
    analysisDesc: string;
    chartTitle: string;
    chartDisclaimer: string;
    pageTitle: string;
    pageSubtitle: string;
    readMore: string;
    coldProcessTitle: string;
    coldProcessDesc: string;
    labels: {
      hba1c: string;
      period: string;
      baseline: string;
      result: string;
      goldStandard: string;
      retention: string;
      integrity: string;
      pure: string;
    };
  };
  usage: {
    heading: string;
    description: string;
    riceTitle: string;
    riceDesc: string;
    flourTitle: string;
    flourDesc: string;
    cookTitle: string;
    cookDesc: string;
    usageImage: string;
  };
  recipes: {
    heading: string;
    subheading: string;
    howLabel: string;
    diabetesFriendly: string;
  };
  faq: {
    heading: string;
    subheading: string;
  };
  footer: {
    mission: string;
    navHeading: string;
    contactHeading: string;
    disclaimer: string;
    backToTop: string;
    orderProducts: string;
    hours: string;
    address: string;
  };
}
