
import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BlogPost, ProductVariant } from '../types';

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
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Raw Young Jackfruit Powder for Diabetes`;
  const defaultDesc = locale === 'id' 
    ? "Solusi alami pengelolaan gula darah dengan Bubuk Nangka Muda Mentah. Terbukti klinis menurunkan HbA1c."
    : "Natural blood sugar management with Raw Young Jackfruit Powder. Clinically proven to lower HbA1c.";

  useEffect(() => {
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

    if (image) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', image);
    }

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

    return () => {
      // Cleanup schema on unmount if needed
    };
  }, [fullTitle, description, image, schema]);

  return null;
};

export default SEO;
