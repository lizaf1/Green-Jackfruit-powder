
import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'product' | 'medical';
  image?: string;
  canonical?: string;
  schema?: object;
  // Additional props for specific schemas
  productData?: {
    name: string;
    description: string;
    price: string;
    currency: string;
    sku: string;
    image: string;
  };
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  type = 'website', 
  image, 
  canonical, 
  schema,
  productData
}) => {
  const { cmsData, locale, view } = useLanguage();
  const t = cmsData[locale].translations;
  const siteName = "TeWELL+";
  
  const defaultTitle = locale === 'id' 
    ? "TeWELL+ | green Jackfruit powder untuk Diabetes" 
    : "TeWELL+ | green Jackfruit powder for Diabetes MNT";
    
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  
  const defaultDesc = locale === 'id' 
    ? "Solusi alami pengelolaan gula darah dengan green Jackfruit powder. Terbukti klinis menurunkan HbA1c dengan metode MNT."
    : "Natural blood sugar management with green Jackfruit powder. Clinically proven to lower HbA1c via Medical Nutrition Therapy (MNT).";

  const metaImage = image || t.common.socialMetaImage || "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg";
  const currentUrl = window.location.origin + window.location.pathname + window.location.hash;

  // Base Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TeWELL+",
    "url": "https://tewellplus.id",
    "logo": "https://tewellplus.id/favicon.svg",
    "sameAs": [
      t.order.linkShopee,
      t.order.linkTikTok,
      "https://wa.me/62881036139972"
    ],
    "description": t.footer.mission
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t.nav.home,
        "item": window.location.origin
      },
      view !== 'home' ? {
        "@type": "ListItem",
        "position": 2,
        "name": t.nav[view as keyof typeof t.nav] || view,
        "item": currentUrl
      } : null
    ].filter(Boolean)
  };

  // View-Specific Schema Generation
  const getDynamicSchema = () => {
    if (schema) return schema;

    if (view === 'evidence') {
      return {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": t.evidence.pageTitle,
        "description": t.evidence.pageSubtitle,
        "medicalAudience": "Patients",
        "aspect": "Evidence-Based Nutrition",
        "mainEntity": {
          "@type": "MedicalStudy",
          "name": "Efficacy of green jackfruit flour in patients with type 2 diabetes mellitus",
          "studySubject": "Type 2 Diabetes Mellitus",
          "publication": "Nature Scientific Reports"
        }
      };
    }

    if (productData) {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productData.name,
        "description": productData.description,
        "image": productData.image,
        "brand": { "@type": "Brand", "name": "TeWELL+" },
        "offers": {
          "@type": "Offer",
          "url": currentUrl,
          "priceCurrency": productData.currency,
          "price": productData.price.replace(/\./g, ''),
          "availability": "https://schema.org/InStock"
        }
      };
    }

    return orgSchema;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = fullTitle;

    // Standard Meta Tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description || defaultDesc);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description || defaultDesc, true);
    updateMeta('og:image', metaImage, true);
    updateMeta('og:type', type, true);
    updateMeta('og:site_name', siteName, true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description || defaultDesc);
    updateMeta('twitter:image', metaImage);

    // Canonical
    let canonEl = document.querySelector('link[rel="canonical"]');
    if (!canonEl) {
      canonEl = document.createElement('link');
      canonEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonEl);
    }
    canonEl.setAttribute('href', canonical || currentUrl);

    // Schema Script
    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) script.remove();
    
    const combinedSchema = [getDynamicSchema(), breadcrumbSchema, orgSchema];
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(combinedSchema);
    document.head.appendChild(script);

  }, [fullTitle, description, metaImage, schema, locale, view, productData]);

  return null;
};

export default SEO;
