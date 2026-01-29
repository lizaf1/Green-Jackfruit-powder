
import React from 'react';
import Navbar from './components/Navbar';
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
    }
  };

  if (view === 'admin') return <AdminPanel />;

  const NavigationFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} setLocale={setLocale} />
    </div>
  );

  if (view === 'investment') return <NavigationFrame><InvestmentPage /></NavigationFrame>;
  if (view === 'evidence') return <NavigationFrame><EvidencePage /></NavigationFrame>;
  if (view === 'blog') return <NavigationFrame><BlogPage /></NavigationFrame>;

  return (
    <div className="min-h-screen">
      <SEO schema={mainSchema} />
      <Navbar />

      <section className="relative bg-white pt-12 pb-20 sm:pt-20 sm:pb-32 lg:pt-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-20">
            <div className="inline-flex items-center gap-3 bg-green-50 text-green-700 px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-black mb-6 sm:mb-8 tracking-[0.2em] uppercase">
              <i className="fas fa-certificate text-sm"></i>{t.hero.badge}
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-black text-gray-900 font-display leading-[1.1] sm:leading-[0.9] mb-8 sm:mb-10 tracking-tighter">
              {t.hero.titleMain}
              <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                <JackfruitLogo iconSize="w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 xl:w-24 xl:h-24" textSize="text-5xl sm:text-7xl lg:text-6xl xl:text-8xl" />
              </div>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-8 sm:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6">
              <button onClick={() => setView('evidence')} className="w-full sm:w-auto bg-green-600 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-lg sm:text-xl font-bold hover:bg-green-700 transition shadow-2xl shadow-green-200/50 active:scale-95">
                {t.hero.ctaEvidence}
              </button>
              <button onClick={() => { setView('blog'); setSelectedPostId(null); }} className="w-full sm:w-auto border-2 border-gray-100 text-gray-700 px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-lg sm:text-xl font-bold hover:border-green-600 hover:text-green-700 transition active:scale-95">
                {t.common.readBlog}
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="relative p-2 sm:p-4 bg-gray-100 rounded-[2.5rem] sm:rounded-[4rem] shadow-inner">
              <img src={t.hero.heroImage} alt="TeWELL+ Medical Nutrition Therapy" className="rounded-[2.2rem] sm:rounded-[3.5rem] shadow-2xl border-4 sm:border-8 border-white object-cover aspect-square w-full" />
              <div className="absolute -bottom-6 -start-6 sm:-bottom-10 sm:-start-10 bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl z-20 border border-green-50 max-w-[200px] sm:max-w-[280px]">
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="bg-green-600 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-3xl shadow-lg"><i className="fas fa-microscope"></i></div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.hero.chartLabel}</p>
                    <p className="text-2xl sm:text-4xl font-black text-green-600 tracking-tighter">-0.25%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-green-50 rounded-full blur-[80px] sm:blur-[140px] opacity-30 z-0"></div>
          </div>
        </div>
      </section>

      <RecipeSection />
      <OrderSection />

      <section className="py-20 sm:py-32 bg-green-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="grid md:grid-cols-2 gap-12 sm:gap-24 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display mb-6 sm:mb-10 leading-tight">{t.evidence.coldProcessTitle}</h2>
                <p className="text-green-100 text-lg sm:text-xl mb-8 sm:mb-10 leading-relaxed font-light">{t.evidence.coldProcessDesc}</p>
                <button onClick={() => setView('evidence')} className="bg-white text-green-900 px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl hover:bg-green-50 transition-all">
                   {t.common.viewData}
                </button>
              </div>
              <div className="bg-white/5 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-white/10 backdrop-blur-md relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-20"></div>
                <blockquote className="text-xl sm:text-3xl font-display italic mb-8 sm:mb-10 leading-snug">"{t.evidence.quote}"</blockquote>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-1 bg-green-500"></div>
                  <p className="font-black text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-60">Nature Scientific Reports (2021)</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      <BlogSection />
      <FAQSection />
      <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} setLocale={setLocale} />
    </div>
  );
};

const Footer: React.FC<{ t: any, setView: any, setSelectedPostId: any, locale: any, setLocale: any }> = ({ t, setView, setSelectedPostId, locale, setLocale }) => (
  <footer className="bg-gray-900 text-white py-20 sm:py-32 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
      <div className="sm:col-span-2">
        <div className="mb-8 sm:mb-10"><JackfruitLogo light textSize="text-3xl sm:text-4xl" iconSize="w-12 h-12 sm:w-14 h-14" /></div>
        <p className="text-gray-400 mb-8 sm:mb-12 text-lg sm:text-xl leading-relaxed max-w-md font-light">{t.footer.mission}</p>
        <div className="flex gap-4">
           {(['id', 'en'] as const).map(l => (
             <button key={l} onClick={() => setLocale(l)} className={`text-[10px] sm:text-xs font-black px-4 py-2 rounded-xl border uppercase transition-all ${locale === l ? 'bg-white text-gray-900 border-white shadow-lg' : 'text-gray-500 border-gray-800 hover:text-white hover:border-gray-600'}`}>{l}</button>
           ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-green-500 mb-6 sm:mb-10">{t.footer.navHeading}</h4>
        <nav>
          <ul className="space-y-4 sm:space-y-6 text-gray-400 font-bold text-base sm:text-lg">
            <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-green-500 transition text-left">{t.footer.backToTop}</button></li>
            <li><a href="#order" className="hover:text-green-500 transition block">{t.footer.orderProducts}</a></li>
            <li><button onClick={() => { setView('blog'); setSelectedPostId(null); }} className="hover:text-green-500 transition text-left">{t.nav.blog}</button></li>
            <li><button onClick={() => setView('investment')} className="hover:text-green-500 transition text-left">{t.nav.investment}</button></li>
          </ul>
        </nav>
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-green-500 mb-6 sm:mb-10">{t.footer.contactHeading}</h4>
        <p className="text-gray-100 mb-4 font-black text-lg sm:text-xl">hello@tewellplus.id</p>
        <p className="text-gray-400 font-medium text-sm sm:text-base">{t.footer.hours}</p>
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem]">
          <p className="text-[9px] sm:text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest font-black">{t.footer.disclaimer}</p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-20 sm:mt-32 pt-8 sm:pt-12 border-t border-white/5 text-center text-gray-600 font-bold tracking-widest text-[10px] sm:text-xs uppercase">
      &copy; {new Date().getFullYear()} <BrandText size="text-[10px] sm:text-xs" light /> • {t.common.rights}
    </div>
  </footer>
);

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
