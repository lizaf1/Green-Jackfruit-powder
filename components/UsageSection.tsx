
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const UsageSection: React.FC = () => {
  const { cmsData, locale } = useLanguage();
  const t = cmsData[locale].translations;

  const steps = [
    {
      title: t.usage.riceTitle,
      desc: t.usage.riceDesc,
      icon: 'fa-bowl-rice',
      tag: 'Step 01'
    },
    {
      title: t.usage.flourTitle,
      desc: t.usage.flourDesc,
      icon: 'fa-bread-slice',
      tag: 'Step 02'
    },
    {
      title: t.usage.cookTitle,
      desc: t.usage.cookDesc,
      icon: 'fa-fire-burner',
      tag: 'Step 03'
    }
  ];

  return (
    <section id="usage" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <span className="text-green-600 font-black text-xs tracking-[0.3em] uppercase mb-6 block">{t.usage.heading}</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 font-display leading-[1.1] tracking-tighter">
              {t.usage.description}
            </h2>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">{step.tag}</p>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 p-4 bg-gray-100 rounded-[3rem] shadow-inner">
               <img 
                 src={t.usage.usageImage} 
                 alt="Usage Illustration" 
                 className="rounded-[2.5rem] w-full aspect-square object-cover shadow-2xl border-4 border-white" 
               />
               <div className="absolute -top-8 -right-8 bg-green-600 text-white p-8 rounded-full shadow-2xl animate-bounce">
                  <p className="text-2xl font-black tracking-tighter">1:1</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest">Ratio</p>
               </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsageSection;
