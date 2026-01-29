
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const OrderSection: React.FC = () => {
  const { cmsData, locale } = useLanguage();
  const t = cmsData[locale].translations;
  const variants = cmsData[locale].variants;

  const benefits = [
    t.order.benefitRaw,
    t.order.benefitProven,
    t.order.benefitClean,
    t.order.benefitCold
  ];

  return (
    <section id="order" className="py-20 sm:py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
            <i className="fas fa-shopping-cart"></i>
            {locale === 'id' ? 'Pilihan Produk' : 'Product Selection'}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-display tracking-tight leading-tight">
            {t.order.heading}
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t.order.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {variants.map((variant, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col group ${
                variant.popular 
                  ? 'border-green-500 shadow-2xl shadow-green-200/50 lg:scale-105 z-10' 
                  : 'border-gray-100 shadow-xl shadow-gray-200/20 hover:border-green-200'
              }`}
            >
              {variant.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 sm:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg whitespace-nowrap">
                  {t.order.variantTagPopular}
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8">
                {!variant.popular && variant.tag && (
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-green-600 bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                    {variant.tag}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-display">{variant.name}</h3>
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-4 sm:mb-6 font-medium text-xs">
                  <i className="fas fa-weight-hanging text-[10px]"></i>
                  <span>{variant.weight}</span>
                  <span className="mx-2">•</span>
                  <span>{variant.duration}</span>
                </div>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg sm:text-xl font-bold text-gray-400">{variant.currency}</span>
                  <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter">{variant.price}</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 border-t border-gray-50 pt-6 sm:pt-8 flex-1">
                {benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px]">
                      <i className="fas fa-check"></i>
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <a 
                  href={t.order.linkWA} 
                  target="_blank" 
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-green-200/50 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <i className="fab fa-whatsapp text-lg sm:text-xl"></i> {t.order.buyWA}
                </a>
                
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={t.order.linkShopee} 
                    target="_blank" 
                    className="flex items-center justify-center gap-2 w-full bg-[#EE4D2D] text-white py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    <i className="fas fa-shopping-bag"></i> Shopee
                  </a>
                  <a 
                    href={t.order.linkTikTok} 
                    target="_blank" 
                    className="flex items-center justify-center gap-2 w-full bg-black text-white py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    <i className="fab fa-tiktok"></i> TikTok
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-2">
            <i className="fas fa-lock text-green-600"></i>
            {t.common.securePayment}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
