
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
  const brandDomain = "https://tewellplus.com";
  
  // High-focus metadata title
  const defaultTitle = locale === 'id' 
    ? "TeWELL+ | Green Jackfruit Powder (MNT) - Solusi Alami Diabetes & Pengganti Nasi" 
    : "TeWELL+ | Clinically Proven Green Jackfruit Powder for Diabetes (MNT)";
    
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  
  // High-focus metadata description
  const defaultDesc = locale === 'id' 
    ? "Solusi medis nutrisi (MNT) untuk diabetes. 100% Green Jackfruit Powder murni dari Jember. Teruji klinis menstabilkan gula darah & HbA1c. Konsultasi sekarang."
    : "Clinical grade Green Jackfruit powder specifically processed for Medical Nutrition Therapy (MNT) for diabetes management.";

  // Force product image for social previews
  const productPouchImage = "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/tewell_pouch_mockup.jpg";
  const metaImage = image || productPouchImage;
  
  // Static Keywords for SEO
  const keywords = "Green Jackfruit Powder, Bubuk Nangka Muda, Diabetes Indonesia, Makanan Rendah Indeks Glikemik, Obat Herbal Diabetes Jember";

  // Task 2: Specific Product Schema
  const taskProductSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "TeWELL+ Green Jackfruit Powder",
    "image": "https://tewellplus.com/assets/images/product-main.jpg",
    "description": "Clinical grade Green Jackfruit powder specifically processed for Medical Nutrition Therapy (MNT) for diabetes management.",
    "brand": {
      "@type": "Brand",
      "name": "TeWELL+"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://tewellplus.com",
      "priceCurrency": "IDR",
      "price": "255000",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  // Base Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TeWELL+",
    "url": brandDomain,
    "logo": `${brandDomain}/favicon.svg`,
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
          "name": "Efficacy of Green Jackfruit Flour in Patients with Type 2 Diabetes Mellitus",
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
          "url": brandDomain + window.location.pathname,
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
            "value": "Raw Green Jackfruit"
          }
        ]
      };
    }

    return taskProductSchema; // Default to task schema for home/other
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
    updateMeta('keywords', keywords);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description || defaultDesc, true);
    updateMeta('og:image', metaImage, true);
    updateMeta('og:image:width', '1200', true);
    updateMeta('og:image:height', '630', true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', brandDomain + window.location.pathname, true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:image', metaImage);
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description || defaultDesc);

    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) script.remove();
    
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify([getDynamicSchema(), orgSchema, taskProductSchema]);
    document.head.appendChild(script);

  }, [fullTitle, description, metaImage, schema, locale, view, productData]);

  return null;
};

export default SEO;
