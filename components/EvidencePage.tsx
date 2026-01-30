
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const EvidencePage: React.FC = () => {
  const { cmsData, locale, setView } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;
  const articles = content.articles;

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-green-900 text-white py-20 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <button onClick={() => setView('home')} className="mb-8 sm:mb-12 text-green-300 hover:text-white flex items-center gap-2 mx-auto transition font-bold">
            <i className="fas fa-arrow-left"></i> {t.common.backToHome}
          </button>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display mb-6 sm:mb-8 tracking-tight leading-tight">{t.evidence.pageTitle}</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed font-light">{t.evidence.pageSubtitle}</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500 rounded-full blur-[100px] sm:blur-[160px] opacity-10"></div>
      </section>

      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 sm:gap-20 items-start mb-20 sm:mb-32">
            <div className="w-full lg:w-1/2">
              <span className="bg-green-100 text-green-800 px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black tracking-widest mb-6 inline-block uppercase">{t.evidence.labels.goldStandard}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 font-display leading-tight">{t.evidence.analysisTitle}</h2>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-12">
                {t.evidence.analysisDesc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8">
                <div className="p-6 sm:p-10 bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl border border-green-50 text-center">
                  <p className="text-3xl sm:text-5xl font-black text-green-600 mb-2 tracking-tighter">0.25</p>
                  <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{t.evidence.labels.hba1c} Mean Diff</p>
                </div>
                <div className="p-6 sm:p-10 bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl border border-green-50 text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-green-600 mb-2 tracking-tighter">Verified</p>
                  <p className="text-[8px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{locale === 'id' ? 'Signifikansi Tinggi' : 'Highly Significant'}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
               <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl border border-green-50">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 font-display">{locale === 'id' ? 'Hasil Komparatif Kelompok' : 'Group Comparative Results'}</h3>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-green-50 border border-green-100">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">A</div>
                      <div>
                        <p className="text-sm font-black text-green-700 uppercase tracking-widest mb-1">{locale === 'id' ? 'Kelompok Intervensi' : 'Intervention Group'}</p>
                        <p className="text-gray-700 leading-relaxed font-medium">
                          {locale === 'id' 
                            ? 'Pasien Kelompok A memiliki penurunan HbA1c (rata-rata 0.25), FPG, dan PPG yang secara signifikan lebih tinggi.' 
                            : 'Patients from Group A had a significantly higher reduction in HbA1c (mean 0.25), FPG, and PPG levels.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-400 text-white rounded-2xl flex items-center justify-center font-bold">B</div>
                      <div>
                        <p className="text-sm font-black text-gray-500 uppercase tracking-widest mb-1">{locale === 'id' ? 'Kelompok Kontrol (Placebo)' : 'Control Group (Placebo)'}</p>
                        <p className="text-gray-700 leading-relaxed opacity-80">
                          {locale === 'id' 
                            ? 'Menunjukkan perubahan minimal pada parameter glikemik (-0.02 rata-rata selisih).' 
                            : 'Showed minimal changes in glycemic parameters (-0.02 mean difference).'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-green-900 text-white rounded-2xl text-xs sm:text-sm italic leading-relaxed shadow-inner">
                    {t.evidence.quote}
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white p-8 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] border border-gray-100 shadow-xl flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <i className="fas fa-microscope text-6xl sm:text-9xl text-green-900"></i>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {article.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[8px] sm:text-[10px] font-black bg-green-50 text-green-700 px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-display leading-tight">{article.title}</h3>
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-gray-400 mb-6 sm:mb-8">
                  <span className="text-green-700">{article.journal}</span>
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-200 rounded-full"></span>
                  <span>{article.year}</span>
                </div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 flex-1 italic">"{article.summary}"</p>
                {article.link && (
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-3 text-green-600 font-black text-xs uppercase tracking-widest hover:text-green-700 transition"
                  >
                    {locale === 'id' ? 'Baca Studi Lengkap di Nature' : 'Read Full Study on Nature'} <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block bg-green-50 text-green-600 p-5 sm:p-6 rounded-full mb-8 sm:mb-10 shadow-inner"><i className="fas fa-hand-holding-medical text-4xl sm:text-5xl"></i></div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-display leading-tight">{t.evidence.coldProcessTitle}</h2>
          <p className="text-gray-500 text-lg sm:text-xl mb-12 sm:mb-20 max-w-3xl mx-auto leading-relaxed">{t.evidence.coldProcessDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
             {[
               { icon: 'fa-vials', title: t.evidence.labels.retention },
               { icon: 'fa-chart-line', title: t.evidence.labels.integrity },
               { icon: 'fa-hospital-user', title: t.evidence.labels.pure }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 text-green-600 rounded-2xl sm:rounded-[2rem] flex items-center justify-center mb-4 sm:mb-6 text-2xl sm:text-3xl shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all duration-500"><i className={`fas ${item.icon}`}></i></div>
                  <h4 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-xs sm:text-sm">{item.title}</h4>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EvidencePage;
