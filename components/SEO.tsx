import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'product' | 'medical';
  image?: string;
  canonical?: string;
  schema?: object;
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
    ? "TeWELL+ | Nangka Muda powder Teruji Klinis untuk Diabetes" 
    : "TeWELL+ | Clinically Proven Young Jackfruit powder for Diabetes MNT";
    
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  
  const defaultDesc = locale === 'id' 
    ? "Solusi alami pengelolaan gula darah dengan Nangka Muda powder. Terbukti klinis menurunkan HbA1c 0.25% dalam 12 minggu via Medical Nutrition Therapy (MNT)."
    : "Natural blood sugar management with Young Jackfruit powder. Clinically proven to lower HbA1c by 0.25% in 12 weeks via Medical Nutrition Therapy (MNT).";

  const metaImage = image || t.common.socialMetaImage || "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg";
  const currentUrl = window.location.origin + window.location.pathname;

  // Base Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TeWELL+",
    "url": "https://jackfruit365.com",
    "logo": "https://jackfruit365.com/favicon.svg",
    "description": t.footer.mission,
    "brand": {
      "@type": "Brand",
      "name": "TeWELL+"
    }
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
        "mainEntity": {
          "@type": "MedicalStudy",
          "name": "Efficacy of green jackfruit flour in patients with type 2 diabetes mellitus",
          "studySubject": {
            "@type": "MedicalCondition",
            "name": "Type 2 Diabetes Mellitus"
          },
          "studyDesign": "Double-Blind, Randomized Controlled Trial (RCT)",
          "publication": {
            "@type": "ScholarlyArticle",
            "name": "Nature Scientific Reports",
            "datePublished": "2021",
            "url": "https://www.nature.com/articles/s41598-020-73593-1"
          },
          "outcome": "Significant reduction in HbA1c, Fasting Blood Glucose, and Postprandial Glucose"
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
        "sku": productData.sku,
        "brand": { "@type": "Brand", "name": "TeWELL+" },
        "offers": {
          "@type": "Offer",
          "url": currentUrl,
          "priceCurrency": productData.currency === 'Rp' ? 'IDR' : productData.currency,
          "price": productData.price.replace(/\./g, ''),
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Method",
            "value": "Medical Nutrition Therapy (MNT)"
          },
          {
            "@type": "PropertyValue",
            "name": "Key Ingredient",
            "value": "Raw Young Jackfruit"
          }
        ]
      };
    }

    return orgSchema;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = fullTitle;

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
    updateMeta('og:url', currentUrl, true);
    updateMeta('twitter:card', 'summary_large_image');

    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) script.remove();
    
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify([getDynamicSchema(), orgSchema]);
    document.head.appendChild(script);

  }, [fullTitle, description, metaImage, schema, locale, view, productData]);

  return null;
};

export default SEO;