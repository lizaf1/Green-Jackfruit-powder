
import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  canonical?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, type = 'website', image, canonical, schema }) => {
  const { locale } = useLanguage();
  
  const siteName = "TeWELL+";
  const defaultTitle = locale === 'id' 
    ? "TeWELL+ | Bubuk Nangka Hijau Mentah untuk Diabetes" 
    : "TeWELL+ | Green Jackfruit Powder for Diabetes MNT";
    
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  
  // AEO/SEO descriptions
  const defaultDesc = locale === 'id' 
    ? "Solusi alami pengelolaan gula darah dengan Bubuk Nangka Hijau Mentah. Terbukti klinis menurunkan HbA1c dengan metode MNT."
    : "Natural blood sugar management with Green Jackfruit Powder. Clinically proven to lower HbA1c via Medical Nutrition Therapy (MNT).";

  // Default Image for social sharing - highlighting the green jackfruit powder branding
  const defaultImage = "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1200";

  useEffect(() => {
    // Update Document Lang attribute
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';

    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description || defaultDesc);

    // Update OG Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description || defaultDesc);

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', image || defaultImage);

    // Handle Schema Injection
    if (schema) {
      const scriptId = 'json-ld-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    }
  }, [fullTitle, description, image, schema, locale, defaultDesc, defaultImage]);

  return null;
};

export default SEO;
