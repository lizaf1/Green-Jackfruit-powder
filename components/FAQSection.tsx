
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';

const FAQSection: React.FC = () => {
  const { cmsData, locale } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;
  const faqs = content.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <SEO schema={faqSchema} />
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">{t.faq.heading}</h2>
          <p className="text-lg text-gray-600">{t.faq.subheading}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === idx 
                  ? 'border-green-600 bg-green-50 shadow-sm' 
                  : 'border-gray-100 hover:border-green-200'
              }`}
            >
              <button 
                onClick={() => toggle(idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={openIndex === idx}
              >
                <span className={`text-lg font-bold transition-colors ${
                  openIndex === idx ? 'text-green-800' : 'text-gray-800'
                }`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 transition-transform duration-300 ${
                  openIndex === idx ? 'rotate-180 text-green-600' : 'text-gray-400'
                }`}>
                  <i className="fas fa-chevron-down"></i>
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-green-100/50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
