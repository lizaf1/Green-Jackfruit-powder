
import React from 'react';
import Navbar from './components/Navbar';
import EvidencePage from './components/EvidencePage';
import BlogPage from './components/BlogPage';
import BlogSection from './components/BlogSection';
import RecipeSection from './components/RecipeSection';
import UsageSection from './components/UsageSection';
import FAQSection from './components/FAQSection';
import AdminPanel from './components/AdminPanel';
import InvestmentPage from './components/InvestmentPage';
import BrandKitPage from './components/BrandKitPage';
import OrderSection from './components/OrderSection';
import JackfruitLogo, { BrandText } from './components/JackfruitLogo';
import SEO from './components/SEO';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const { cmsData, locale, view, setView, setSelectedPostId } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;

  if (view === 'admin') return <AdminPanel />;

  const NavigationFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} />
    </div>
  );

  if (view === 'brand-kit') return <NavigationFrame><BrandKitPage /></NavigationFrame>;
  if (view === 'investment') return <NavigationFrame><InvestmentPage /></NavigationFrame>;
  if (view === 'evidence') return <NavigationFrame><EvidencePage /></NavigationFrame>;
  if (view === 'blog') return <NavigationFrame><BlogPage /></NavigationFrame>;

  return (
    <div className="min-h-screen selection:bg-green-100 selection:text-green-900">
      <SEO />
      <Navbar />

      <section className="relative bg-white pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/30 blur-[120px] -z-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-green-50/20 blur-[100px] -z-10 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-20">
            <div className="inline-flex items-center gap-3 bg-white border border-green-100 text-green-700 px-6 py-2.5 rounded-full text-[10px] font-black mb-10 tracking-[0.2em] uppercase shadow-sm">
              <i className="fas fa-certificate text-xs animate-pulse"></i>{t.hero.badge}
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black text-gray-900 font-display leading-[1.0] mb-8 tracking-tighter">
              {t.hero.titleMain}
              <div className="mt-6 flex justify-center lg:justify-start">
                <JackfruitLogo iconSize="w-24 h-28 lg:w-32 lg:h-36" textSize="text-6xl sm:text-8xl lg:text-9xl" />
              </div>
            </h1>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium italic">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
              <button 
                onClick={() => setView('evidence')} 
                className="group relative bg-[#014737] text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-[#026b53] transition-all shadow-2xl shadow-green-900/20 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">{t.hero.ctaEvidence}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <button 
                onClick={() => { setView('blog'); setSelectedPostId(null); }} 
                className="bg-white border-2 border-gray-100 text-gray-700 px-10 py-5 rounded-2xl text-lg font-bold hover:border-green-600 hover:text-green-600 transition-all active:scale-95"
              >
                {t.common.readBlog}
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="relative p-3 bg-white rounded-[4rem] shadow-2xl border border-gray-100">
              <img src={t.hero.heroImage} alt="TeWELL+ MNT" className="rounded-[3.5rem] shadow-inner object-cover aspect-square w-full grayscale-[10%] hover:grayscale-0 transition-all duration-700" />
              <div className="absolute -bottom-10 -right-6 lg:-right-12 bg-white p-10 rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] z-20 border border-green-50 min-w-[240px]">
                <div className="flex items-center gap-5 text-center justify-center flex-col">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">{t.hero.chartLabel}</p>
                  <p className="text-6xl font-black text-[#16c694] tracking-tighter">-0.25%</p>
                  <div className="w-12 h-1 bg-green-100 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UsageSection />
      <RecipeSection />
      <OrderSection />

      <section className="py-28 bg-[#014737] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
           <blockquote className="text-3xl md:text-4xl font-display italic mb-12 leading-snug max-w-4xl mx-auto">"{t.evidence.quote}"</blockquote>
           <button 
             onClick={() => setView('evidence')} 
             className="bg-[#16c694] text-[#014737] px-12 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-white hover:scale-105 transition-all shadow-xl shadow-black/10"
           >
              {t.common.viewData}
           </button>
        </div>
      </section>

      <BlogSection />
      <FAQSection />
      <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} />
    </div>
  );
};

const Footer: React.FC<{ t: any, setView: any, setSelectedPostId: any, locale: any }> = ({ t, setView, setSelectedPostId, locale }) => {
  const { setLocale } = useLanguage();
  return (
    <footer className="bg-[#0b1311] text-white pt-32 pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
        <div className="md:col-span-2">
          <JackfruitLogo light textSize="text-4xl" iconSize="w-16 h-20" className="mb-10" />
          <p className="text-gray-400 mb-12 text-lg leading-relaxed max-w-md font-medium">{t.footer.mission}</p>
          <div className="flex gap-4">
             {(['id', 'en'] as const).map(l => (
               <button 
                key={l} 
                onClick={() => setLocale(l)} 
                className={`text-[10px] font-black px-6 py-3 rounded-xl border uppercase transition-all duration-300 ${locale === l ? 'bg-white text-gray-900 border-white shadow-lg shadow-white/10' : 'text-gray-500 border-white/10 hover:border-white/30 hover:text-white'}`}
               >
                 {l}
               </button>
             ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-12">{t.footer.navHeading}</h4>
          <ul className="space-y-6 text-gray-400 font-bold text-sm">
            <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i> {t.footer.backToTop}</button></li>
            <li><button onClick={() => setView('evidence')} className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i> {t.nav.evidence}</button></li>
            <li><button onClick={() => setView('blog')} className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i> {t.nav.blog}</button></li>
            <li><button onClick={() => setView('investment')} className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i> {t.nav.investment}</button></li>
            <li><button onClick={() => setView('brand-kit')} className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i> Brand Identity Assets</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-12">{t.footer.contactHeading}</h4>
          <div className="space-y-8">
            <div className="group">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-3">Direct Support</p>
              <p className="text-white font-black text-2xl group-hover:text-[#16c694] transition-colors">hello@tewellplus.com</p>
            </div>
            <div className="group">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-3">WhatsApp Inquiry</p>
              <p className="text-white font-black text-xl group-hover:text-[#16c694] transition-colors">+62 881-0361-39972</p>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-gray-500 text-xs font-medium italic">{t.footer.hours}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-32 pt-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
           <div className="max-w-3xl">
             <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black leading-relaxed opacity-60 hover:opacity-100 transition-opacity">
               {t.footer.disclaimer}
             </p>
           </div>
           <button 
            onClick={() => setView('admin')} 
            className="flex items-center gap-2 text-gray-600 text-[10px] hover:text-[#16c694] transition-all uppercase tracking-[0.3em] font-black px-6 py-3 border border-white/5 rounded-xl hover:border-[#16c694]/20"
           >
             <i className="fas fa-lock text-[8px]"></i> TeWELL Admin Portal
           </button>
        </div>
        <div className="mt-16 flex flex-col md:row justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em] gap-6">
           <p>© 2024 TeWELL+ Wellness Solutions. {t.common.rights}</p>
           <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1">Privacy</a>
              <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1">Terms</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
