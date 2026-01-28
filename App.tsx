
import React from 'react';
import Navbar from './components/Navbar';
import EvidenceChart from './components/EvidenceChart';
import EvidencePage from './components/EvidencePage';
import BlogPage from './components/BlogPage';
import BlogSection from './components/BlogSection';
import RecipeSection from './components/RecipeSection';
import FAQSection from './components/FAQSection';
import AdminPanel from './components/AdminPanel';
import InvestmentPage from './components/InvestmentPage';
import OrderSection from './components/OrderSection';
import JackfruitLogo, { BrandText } from './components/JackfruitLogo';
import SEO from './components/SEO';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const { cmsData, locale, setLocale, view, setView, setSelectedPostId } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;

  const mainSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "TeWELL+ Raw Young Jackfruit Powder",
    "description": t.hero.description,
    "brand": {
      "@type": "Brand",
      "name": "TeWELL+"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "85.000",
      "highPrice": "245.000",
      "priceCurrency": "IDR"
    }
  };

  if (view === 'admin') {
    return <AdminPanel />;
  }

  if (view === 'investment') {
    return (
      <div className="min-h-screen">
        <SEO title={locale === 'id' ? "Peluang Investasi" : "Investment Opportunity"} />
        <Navbar />
        <InvestmentPage />
        <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} setLocale={setLocale} />
      </div>
    );
  }

  if (view === 'evidence') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <EvidencePage />
        <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} setLocale={setLocale} />
      </div>
    );
  }

  if (view === 'blog') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <BlogPage />
        <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} setLocale={setLocale} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO schema={mainSchema} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-24 lg:pt-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left relative z-10">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block tracking-widest uppercase">
              <i className="fas fa-check-circle mr-2"></i>{t.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 font-display leading-tight mb-8">
              {t.hero.titleMain}
              <div className="mt-6 flex justify-center lg:justify-start">
                <JackfruitLogo 
                  iconSize="w-16 h-16 md:w-20 md:h-20" 
                  textSize="text-6xl md:text-8xl" 
                />
              </div>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <button 
                onClick={() => setView('evidence')}
                className="bg-green-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-green-700 transition shadow-2xl shadow-green-200/50"
              >
                {t.hero.ctaEvidence}
              </button>
              <button 
                onClick={() => { setView('blog'); setSelectedPostId(null); }}
                className="border-2 border-gray-100 text-gray-700 px-10 py-5 rounded-full text-lg font-bold hover:border-green-600 hover:text-green-700 transition"
              >
                {locale === 'id' ? 'Baca Blog Kami' : 'Read our Blog'}
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <img 
                src={t.hero.heroImage} 
                alt={locale === 'id' ? "Bubuk Nangka Muda TeWELL+" : "TeWELL+ Raw Young Jackfruit Powder"} 
                className="rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-square"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl z-20 border border-green-50 max-w-[240px]">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl shadow-inner">
                    <i className="fas fa-chart-line text-green-600 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t.hero.chartLabel}</p>
                    <p className="text-3xl font-black text-green-600">-0.9%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-50 rounded-full blur-3xl opacity-40 z-0"></div>
          </div>
        </div>
      </section>

      {/* Blog Preview on Homepage */}
      <BlogSection />

      {/* Order Section */}
      <OrderSection />

      {/* Cold Process USP Section */}
      <section className="py-24 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-8">
                  {locale === 'id' ? 'Keunggulan Cold-Process Murni' : 'The Pure Cold-Process Difference'}
                </h2>
                <p className="text-green-100 text-lg mb-8 leading-relaxed">
                  {locale === 'id' 
                    ? 'Sebagian besar suplemen diproduksi menggunakan penggilingan industri panas tinggi yang dapat merusak nutrisi penting.' 
                    : 'Most supplements are produced using high-heat industrial milling which can denature the very nutrients you\'re trying to consume.'}
                </p>
                <div className="space-y-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-700/50 rounded-xl flex items-center justify-center">
                      <i className="fas fa-temperature-low text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">
                        {locale === 'id' ? 'Suhu Terkendali (<50°C)' : 'Temperature Managed (<50°C)'}
                      </h4>
                      <p className="text-green-200/80 text-sm">
                        {locale === 'id' 
                          ? 'Kami memantau kecepatan penggilingan dan waktu pengeringan untuk menjaga integritas termal.' 
                          : 'We strictly monitor milling speeds and drying times to ensure thermal integrity.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-700/50 rounded-xl flex items-center justify-center">
                      <i className="fas fa-dna text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">
                        {locale === 'id' ? 'Perlindungan Enzim' : 'Enzyme Protection'}
                      </h4>
                      <p className="text-green-200/80 text-sm">
                        {locale === 'id' 
                          ? 'Menjaga enzim alami mentah yang membantu metabolisme sehat.' 
                          : 'Preserving raw natural enzymes that aid in healthy metabolism.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-sm">
                <blockquote className="text-2xl font-display italic mb-8 leading-relaxed">
                  "{t.evidence.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-green-500"></div>
                  <p className="font-bold text-sm tracking-widest uppercase">
                    {locale === 'id' ? 'KUTIPAN STUDI KLINIS' : 'CLINICAL STUDY CITATION'}
                  </p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Evidence Highlight Section */}
      <section id="evidence" className="py-32 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-display leading-tight">{t.evidence.heading}</h2>
              <div className="space-y-8 mb-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-green-600 text-xl border border-green-50">
                    <i className="fas fa-vial"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">{t.evidence.studyTitle}</h4>
                    <p className="text-gray-600 leading-relaxed">{t.evidence.studyDesc}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-green-600 text-xl border border-green-50">
                    <i className="fas fa-microscope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">{t.evidence.analysisTitle}</h4>
                    <p className="text-gray-600 leading-relaxed">{t.evidence.analysisDesc}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setView('evidence')}
                className="text-green-600 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all"
              >
                {locale === 'id' ? 'Lihat Data Ilmiah Lengkap' : 'View Full Scientific Data'} <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="lg:w-1/2 w-full">
              <EvidenceChart />
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <RecipeSection />

      {/* Usage Section */}
      <section id="usage" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-display">{t.usage.heading}</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{t.usage.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: t.usage.riceTitle, desc: t.usage.riceDesc, icon: 'fa-bowl-rice' },
              { title: t.usage.flourTitle, desc: t.usage.flourDesc, icon: 'fa-blender' },
              { title: t.usage.cookTitle, desc: t.usage.cookDesc, icon: 'fa-fire-burner' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-10 rounded-[3rem] text-center border border-transparent hover:border-green-200 hover:bg-white hover:shadow-2xl transition duration-500 group">
                <div className="w-20 h-20 bg-green-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl group-hover:rotate-6 transition shadow-lg">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} setLocale={setLocale} />
    </div>
  );
};

const Footer: React.FC<{ t: any, setView: any, setSelectedPostId: any, locale: any, setLocale: any }> = ({ t, setView, setSelectedPostId, locale, setLocale }) => (
  <footer className="bg-gray-900 text-white py-24">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16">
      <div className="col-span-2">
        <div className="mb-8">
          <JackfruitLogo light />
        </div>
        <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-sm">
          {t.footer.mission}
        </p>
        <div className="flex gap-5">
           <button onClick={() => setLocale('id')} className={`text-xs font-bold px-3 py-1 rounded border ${locale === 'id' ? 'bg-white text-gray-900 border-white' : 'text-gray-500 border-gray-800'}`}>ID</button>
           <button onClick={() => setLocale('en')} className={`text-xs font-bold px-3 py-1 rounded border ${locale === 'en' ? 'bg-white text-gray-900 border-white' : 'text-gray-500 border-gray-800'}`}>EN</button>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-8">{t.footer.navHeading}</h4>
        <nav>
          <ul className="space-y-5 text-gray-400 font-medium">
            <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-green-500 transition">{locale === 'id' ? 'Kembali ke Atas' : 'Back to Top'}</button></li>
            <li><a href="#order" className="hover:text-green-500 transition">{locale === 'id' ? 'Pesan Produk' : 'Order Products'}</a></li>
            <li><button onClick={() => { setView('blog'); setSelectedPostId(null); }} className="hover:text-green-500 transition">{t.nav.blog}</button></li>
            <li><a href="#recipes" className="hover:text-green-500 transition">{t.nav.recipes}</a></li>
            <li><a href="#faq" className="hover:text-green-500 transition">{t.nav.faq}</a></li>
            <li><button onClick={() => setView('investment')} className="hover:text-green-500 transition">{t.nav.investment}</button></li>
            <li><button onClick={() => setView('admin')} className="text-xs text-gray-600 hover:text-green-500 mt-4 border border-gray-800 px-2 py-1 rounded">Admin Console</button></li>
          </ul>
        </nav>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-8">{t.footer.contactHeading}</h4>
        <p className="text-gray-400 mb-3 font-medium">support@tewellplus.com</p>
        <p className="text-gray-400 font-medium">{locale === 'id' ? 'Sen - Jum: 09:00 - 18:00' : 'Mon - Fri: 9:00 AM - 6:00 PM'}</p>
        <div className="mt-10 p-6 bg-gray-800/50 border border-gray-700 rounded-2xl">
          <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-wider font-bold">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-24 pt-10 border-t border-gray-800 text-center text-gray-500 font-medium">
      &copy; {new Date().getFullYear()} <BrandText size="text-sm" light />. {locale === 'id' ? 'Seluruh Hak Dilindungi.' : 'All Rights Reserved.'}
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
