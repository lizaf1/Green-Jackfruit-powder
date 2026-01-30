
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
import JackfruitLogo from './components/JackfruitLogo';
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

      {/* REFINED HERO SECTION */}
      <section className="relative bg-white pt-24 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50/40 to-transparent -z-10"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-100/30 blur-[100px] -z-10 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <div className="w-full lg:w-3/5 text-center lg:text-left relative z-20">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100/50 text-green-700 px-4 py-2 rounded-full text-[10px] font-black mb-8 tracking-[0.2em] uppercase shadow-sm">
                <i className="fas fa-microscope text-xs"></i>
                <span>{t.hero.badge}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-gray-900 font-display leading-[0.95] mb-8 tracking-tighter">
                {t.hero.titleMain}
                <div className="mt-4 flex justify-center lg:justify-start items-center">
                  <JackfruitLogo iconSize="w-20 h-24 lg:w-28 lg:h-32" textSize="text-6xl sm:text-8xl lg:text-9xl" />
                </div>
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium italic">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => setView('evidence')} 
                  className="bg-[#014737] text-white px-12 py-5 rounded-2xl text-lg font-bold hover:bg-[#026b53] transition-all shadow-xl shadow-green-900/10 active:scale-95"
                >
                  {t.hero.ctaEvidence}
                </button>
                <button 
                  onClick={() => { setView('blog'); setSelectedPostId(null); }} 
                  className="bg-white border-2 border-gray-100 text-gray-700 px-12 py-5 rounded-2xl text-lg font-bold hover:border-green-600 hover:text-green-600 transition-all active:scale-95"
                >
                  {t.common.readBlog}
                </button>
              </div>
            </div>
            
            <div className="w-full lg:w-2/5 relative">
              <div className="relative p-2 bg-gray-50 rounded-[4rem] shadow-inner border border-gray-100">
                <img src={t.hero.heroImage} alt="TeWELL+ MNT" className="rounded-[3.8rem] shadow-2xl border-4 border-white object-cover aspect-[4/5] w-full" />
                <div className="absolute -bottom-10 -left-6 lg:-left-12 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 border border-green-50 min-w-[200px]">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.hero.chartLabel}</p>
                    <p className="text-5xl font-black text-[#16c694] tracking-tighter">-0.25%</p>
                    <div className="mt-2 text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">{locale === 'id' ? 'Hasil Teruji' : 'Proven Results'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UsageSection />
      <RecipeSection />
      <OrderSection />

      <section className="py-24 bg-[#014737] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <blockquote className="text-3xl md:text-4xl font-display italic mb-10 leading-snug max-w-4xl mx-auto">"{t.evidence.quote}"</blockquote>
           <button 
             onClick={() => setView('evidence')} 
             className="bg-[#16c694] text-[#014737] px-12 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white transition-all shadow-xl"
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
    <footer className="bg-[#0b1311] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column - More Compact */}
          <div className="lg:col-span-5">
            <JackfruitLogo light textSize="text-3xl" iconSize="w-12 h-16" className="mb-6" />
            <p className="text-gray-400 mb-8 text-base leading-relaxed max-w-sm font-medium">
              {t.footer.mission}
            </p>
            <div className="flex gap-2">
               {(['id', 'en'] as const).map(l => (
                 <button 
                  key={l} 
                  onClick={() => setLocale(l)} 
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${locale === l ? 'bg-white text-gray-900' : 'text-gray-500 border border-white/10 hover:border-white/20'}`}
                 >
                   {l}
                 </button>
               ))}
            </div>
          </div>
          
          {/* Sitemap - Organized and Tight */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-8">{t.footer.navHeading}</h4>
            <ul className="space-y-4">
              {[
                { label: t.footer.backToTop, action: () => window.scrollTo({top: 0, behavior: 'smooth'}) },
                { label: t.nav.evidence, action: () => setView('evidence') },
                { label: t.nav.blog, action: () => setView('blog') },
                { label: t.nav.investment, action: () => setView('investment') },
                { label: 'Brand Kit', action: () => setView('brand-kit') }
              ].map((item, i) => (
                <li key={i}>
                  <button onClick={item.action} className="text-gray-400 hover:text-white font-bold text-sm transition-colors">{item.label}</button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact - Modern Typography */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-8">{t.footer.contactHeading}</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1">Email</p>
                <a href="mailto:hello@tewellplus.com" className="text-white font-black text-xl hover:text-[#16c694] transition-colors">hello@tewellplus.com</a>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1">WhatsApp</p>
                <a href="https://wa.me/62881036139972" className="text-white font-black text-lg hover:text-[#16c694] transition-colors">+62 881-0361-39972</a>
              </div>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{t.footer.hours}</p>
            </div>
          </div>
        </div>
        
        {/* Tightened Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold max-w-2xl text-center md:text-left leading-relaxed">
             {t.footer.disclaimer}
           </p>
           <button onClick={() => setView('admin')} className="text-gray-700 text-[9px] hover:text-[#16c694] transition-all uppercase tracking-[0.3em] font-black flex items-center gap-2">
             <i className="fas fa-lock text-[8px]"></i> Admin Portal
           </button>
        </div>
        
        <div className="mt-10 flex justify-between items-center text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">
           <p>© 2024 TeWELL+ Solutions. {t.common.rights}</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
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
