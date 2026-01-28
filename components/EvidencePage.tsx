
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
      {/* Header */}
      <section className="bg-green-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <button 
            onClick={() => setView('home')}
            className="mb-8 text-green-300 hover:text-white flex items-center gap-2 mx-auto transition font-bold"
          >
            <i className="fas fa-arrow-left"></i> {locale === 'id' ? 'Kembali ke Beranda' : `Back to ${t.nav.home}`}
          </button>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">{t.evidence.pageTitle}</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            {t.evidence.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Study Highlight */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
            <div className="lg:w-1/2">
              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                {locale === 'id' ? 'Riset Standar Emas' : 'Gold Standard Research'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display leading-tight">
                {locale === 'id' ? 'Hasil Terbukti dalam Pengelolaan Gula Darah' : 'Proven Results in Blood Sugar Management'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {locale === 'id' 
                  ? 'Landasan ilmiah kami dibangun di atas uji klinis acak dan double-blind. Dengan mengganti hanya 30g karbohidrat harian dengan Bubuk Nangka Muda TeWELL+, peserta menunjukkan peningkatan signifikan pada penanda kesehatan metabolik.'
                  : 'Our scientific foundation is built upon randomized, double-blind clinical trials. By replacing just 30g of daily starch with TeWELL+ Raw Young Jackfruit Powder, participants observed a significant improvement in metabolic health markers.'}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-green-50">
                  <p className="text-4xl font-bold text-green-600 mb-1">-0.9%</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{locale === 'id' ? 'Penurunan HbA1c' : 'HbA1c Reduction'}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-green-50">
                  <p className="text-4xl font-bold text-green-600 mb-1">90 {locale === 'id' ? 'Hari' : 'Days'}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{locale === 'id' ? 'Periode Studi' : 'Study Period'}</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <EvidenceChart />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  {article.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded uppercase">{tag}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display leading-snug">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span className="font-bold text-green-700">{article.journal}</span>
                  <span>•</span>
                  <span>{article.year}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {article.summary}
                </p>
                {article.link && (
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    {t.evidence.readMore} <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cold Process Benefits Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-blue-50 text-blue-600 p-4 rounded-full mb-6">
            <i className="fas fa-snowflake text-4xl"></i>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 font-display">
            {locale === 'id' ? 'Teknologi Cold-Process (<50°C)' : 'Cold-Process Technology (<50°C)'}
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            {locale === 'id' 
              ? 'Tidak seperti metode penggilingan standar yang menggunakan panas tinggi, TeWELL+ menggunakan metode pemrosesan dingin yang dipatenkan. Dengan menjaga suhu pengeringan dan penggilingan di bawah 50°C, kami memastikan struktur serat, enzim bio-aktif, dan vitamin tidak pernah rusak.'
              : 'Unlike standard milling methods that use high heat, TeWELL+ uses a proprietary cold-processing method. By keeping drying and milling temperatures below 50°C, we ensure that fiber structures, bio-active enzymes, and vitamins are never damaged.'}
          </p>
          <div className="grid md:grid-cols-3 gap-12">
             <div className="flex flex-col items-center p-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-inner">
                    <i className="fas fa-temperature-low"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{locale === 'id' ? 'Retensi Nutrisi' : 'Nutrient Retention'}</h4>
                <p className="text-sm text-gray-500">{locale === 'id' ? 'Suhu rendah mengunci 100% khasiat sehat buah mentah.' : 'Low temperature locks in 100% of the raw fruit\'s healthy properties.'}</p>
             </div>
             <div className="flex flex-col items-center p-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-inner">
                    <i className="fas fa-microscope"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{locale === 'id' ? 'Integritas Serat' : 'Fiber Integrity'}</h4>
                <p className="text-sm text-gray-500">{locale === 'id' ? 'Menjaga serat tidak larut rantai panjang untuk manfaat glikemik maksimal.' : 'Maintains long-chain insoluble fibers for maximum glycemic benefit.'}</p>
             </div>
             <div className="flex flex-col items-center p-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-inner">
                    <i className="fas fa-leaf"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{locale === 'id' ? 'Mentah & Murni' : 'Raw & Pure'}</h4>
                <p className="text-sm text-gray-500">{locale === 'id' ? 'Tanpa pemutih kimia atau zat tambahan. Hanya 100% nangka mentah murni.' : 'No chemical bleaches or additives. Just 100% pure raw jackfruit.'}</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EvidencePage;
