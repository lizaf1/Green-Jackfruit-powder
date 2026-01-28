
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const InvestmentPage: React.FC = () => {
  const { cmsData, locale, setView } = useLanguage();
  const content = cmsData[locale].investment;
  const t = cmsData[locale].translations;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-green-900 text-white py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <button 
            onClick={() => setView('home')}
            className="mb-12 text-green-300 hover:text-white flex items-center gap-2 mx-auto transition font-bold"
          >
            <i className="fas fa-arrow-left"></i> {locale === 'id' ? 'Kembali' : 'Back'}
          </button>
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-8 tracking-tight">{content.heading}</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            {content.subheading}
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500 rounded-full blur-[120px] opacity-10 z-0"></div>
      </section>

      {/* Stats Grid - Updated to 4 Columns */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.marketStats.map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-2xl border border-green-50 text-center flex flex-col justify-center items-center h-full">
                <p className="text-4xl font-black text-green-600 mb-4 tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight px-4">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pitch Details */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-display leading-tight">
                {content.growthTitle}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                {content.pitchText}
              </p>
              <div className="space-y-8">
                {content.growthItems.map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-4 rounded-[4rem] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                  alt="Indonesian Growth Analysis" 
                  className="rounded-[3rem] w-full h-[600px] object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-green-900 text-white p-12 rounded-[3rem] shadow-2xl max-w-xs">
                <p className="text-3xl font-bold font-display mb-4">"Localized Production. Global Efficacy."</p>
                <div className="w-12 h-1 bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 font-display">Ready to discuss our future in Indonesia?</h2>
          <button className="bg-green-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-green-700 transition shadow-2xl shadow-green-200">
            {content.ctaText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default InvestmentPage;
