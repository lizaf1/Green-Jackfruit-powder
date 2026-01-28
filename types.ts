
export type View = 'home' | 'evidence' | 'blog' | 'admin' | 'investment';
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

// Map of Locale to Content
export interface CMSData {
  id: AppContentData;
  en: AppContentData;
}

export interface Translations {
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
    titleHighlight: string;
    description: string;
    ctaEvidence: string;
    chartLabel: string;
    heroImage: string;
  };
  order: {
    heading: string;
    subheading: string;
    variantStarter: string;
    variantStandard: string;
    variantValue: string;
    buyWA: string;
    buyShopee: string;
    buyTikTok: string;
    linkWA: string;
    linkShopee: string;
    linkTikTok: string;
  };
  blog: {
    heading: string;
    subheading: string;
    readMore: string;
    backToBlog: string;
  };
  evidence: {
    heading: string;
    quote: string;
    studyTitle: string;
    studyDesc: string;
    analysisTitle: string;
    analysisDesc: string;
    fiberTitle: string;
    fiberDesc: string;
    chartTitle: string;
    chartDisclaimer: string;
    pageTitle: string;
    pageSubtitle: string;
    readMore: string;
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
  };
  recipes: {
    heading: string;
    subheading: string;
    howLabel: string;
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
  };
}
