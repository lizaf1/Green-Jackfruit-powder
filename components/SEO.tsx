
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
  const { cmsData, locale } = useLanguage();
  const t = cmsData[locale].translations;
  
  const siteName = "TeWELL+";
  const defaultTitle = locale === 'id' 
    ? "TeWELL+ | green Jackfruit powder untuk Diabetes" 
    : "TeWELL+ | green Jackfruit powder for Diabetes MNT";
    
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  
  const defaultDesc = locale === 'id' 
    ? "Solusi alami pengelolaan gula darah dengan green Jackfruit powder. Terbukti klinis menurunkan HbA1c dengan metode MNT."
    : "Natural blood sugar management with green Jackfruit powder. Clinically proven to lower HbA1c via Medical Nutrition Therapy (MNT).";

  // Use the image defined in Admin Panel (General Tab), otherwise fallback to provided prop or hardcoded default
  const metaImage = image || t.common.socialMetaImage || "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1200";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description || defaultDesc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description || defaultDesc);

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', metaImage);

    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (twitterImg) twitterImg.setAttribute('content', metaImage);

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
  }, [fullTitle, description, metaImage, schema, locale, defaultDesc]);

  return null;
};

export default SEO;
