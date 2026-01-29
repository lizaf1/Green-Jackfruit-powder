
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import EvidenceChart from './EvidenceChart';

const EvidencePage: React.FC = () => {
  const { cmsData, locale, setView } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;
  const articles = content.articles;

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-green-900 text-white py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <button onClick={() => setView('home')} className="mb-12 text-green-300 hover:text-white flex items-center gap-2 mx-auto transition font-bold">
            <i className="fas fa-arrow-left"></i> {t.common.backToHome}
          </button>
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-8 tracking-tight">{t.evidence.pageTitle}</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed font-light">{t.evidence.pageSubtitle}</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500 rounded-full blur-[160px] opacity-10"></div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            <div className="lg:w-1/2">
              <span className="bg-green-100 text-green-800 px-5 py-2 rounded-full text-xs font-black tracking-widest mb-6 inline-block uppercase">{t.evidence.labels.goldStandard}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-display leading-tight">{t.evidence.analysisTitle}</h2>
              <p className="text-gray-600 text-xl leading-relaxed mb-12">{t.evidence.analysisDesc}</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-green-50 text-center">
                  <p className="text-5xl font-black text-green-600 mb-2 tracking-tighter">18.2%</p>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">{t.evidence.labels.hba1c}</p>
                </div>
                <div className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-green-50 text-center">
                  <p className="text-5xl font-black text-green-600 mb-2 tracking-tighter">90</p>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">{t.evidence.labels.period}</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full"><EvidenceChart /></div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <i className="fas fa-microscope text-9xl text-green-900"></i>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  {article.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-black bg-green-50 text-green-700 px-4 py-1.5 rounded-full uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 font-display leading-tight">{article.title}</h3>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-400 mb-8">
                  <span className="text-green-700">{article.journal}</span>
                  <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                  <span>{article.year}</span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-12 flex-1 italic">"{article.summary}"</p>
                {article.link && (
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold gap-3 hover:bg-green-600 transition-all self-start">
                    {t.evidence.readMore} <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block bg-green-50 text-green-600 p-6 rounded-full mb-10 shadow-inner"><i className="fas fa-snowflake text-5xl"></i></div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-display">{t.evidence.coldProcessTitle}</h2>
          <p className="text-gray-500 text-xl mb-20 max-w-3xl mx-auto leading-relaxed">{t.evidence.coldProcessDesc}</p>
          <div className="grid md:grid-cols-3 gap-16">
             {[
               { icon: 'fa-temperature-low', title: t.evidence.labels.retention },
               { icon: 'fa-vial', title: t.evidence.labels.integrity },
               { icon: 'fa-leaf', title: t.evidence.labels.pure }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center group">
                  <div className="w-24 h-24 bg-gray-50 text-green-600 rounded-[2rem] flex items-center justify-center mb-6 text-3xl shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all duration-500"><i className={`fas ${item.icon}`}></i></div>
                  <h4 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-sm">{item.title}</h4>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EvidencePage;
