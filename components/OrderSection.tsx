
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
    <section id="order" className="py-24 sm:py-40 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm">
            <i className="fas fa-shopping-cart text-xs"></i>
            {locale === 'id' ? 'Opsi Terapi Nutrisi' : 'Medical Nutrition Options'}
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-gray-900 mb-8 font-display tracking-tight leading-tight">
            {t.order.heading}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium italic">
            {t.order.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch max-w-6xl mx-auto">
          {variants.map((variant, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white p-8 sm:p-12 rounded-[3.5rem] border-2 transition-all duration-700 flex flex-col group ${
                variant.popular 
                  ? 'border-[#16c694] shadow-[0_40px_100px_-20px_rgba(22,198,148,0.2)] lg:scale-110 z-10' 
                  : 'border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:border-green-200'
              }`}
            >
              {variant.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#16c694] text-[#014737] px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-xl whitespace-nowrap">
                  {t.order.variantTagPopular}
                </div>
              )}

              <div className="text-center mb-10">
                {!variant.popular && variant.tag && (
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-green-600 bg-green-50 px-4 py-1.5 rounded-full mb-6 inline-block">
                    {variant.tag}
                  </span>
                )}
                <h3 className="text-3xl font-black text-gray-900 mb-3 font-display tracking-tight">{variant.name}</h3>
                <div className="flex items-center justify-center gap-3 text-gray-400 mb-8 font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-2"><i className="fas fa-box text-xs"></i> {variant.weight}</span>
                  <span className="opacity-30">|</span>
                  <span className="flex items-center gap-2"><i className="fas fa-calendar-check text-xs"></i> {variant.duration}</span>
                </div>
                
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-2xl font-black text-gray-300">{variant.currency}</span>
                  <span className="text-6xl font-black text-gray-900 tracking-tighter">{variant.price}</span>
                </div>
              </div>

              <div className="space-y-4 mb-12 border-t border-gray-50 pt-10 flex-1">
                {benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-4 text-sm text-gray-600 font-medium">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <i className="fas fa-check text-[10px]"></i>
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <a 
                  href={t.order.linkWA} 
                  target="_blank" 
                  className="flex items-center justify-center gap-3 w-full bg-[#014737] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-green-900/10 hover:bg-[#16c694] active:scale-[0.98] transition-all"
                >
                  <i className="fab fa-whatsapp text-xl"></i> {t.order.buyWA}
                </a>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href={t.order.linkShopee} 
                    target="_blank" 
                    className="flex items-center justify-center gap-2 w-full bg-[#EE4D2D] text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/10"
                  >
                    Shopee Mall
                  </a>
                  <a 
                    href={t.order.linkTikTok} 
                    target="_blank" 
                    className="flex items-center justify-center gap-2 w-full bg-black text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-black/10"
                  >
                    TikTok Shop
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-gray-100"></span>
            <i className="fas fa-shield-halved text-green-600"></i>
            {t.common.securePayment}
            <span className="w-12 h-px bg-gray-100"></span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
