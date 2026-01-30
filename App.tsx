
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
      <section className="relative bg-white pt-24 pb-16 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50/50 to-transparent -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100/30 blur-[120px] -z-10 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-3/5 text-center lg:text-left relative z-20">
              <div className="inline-flex items-center gap-2 bg-white border border-green-100 text-green-700 px-4 py-2 rounded-full text-[10px] font-black mb-10 tracking-[0.25em] uppercase shadow-sm">
                <i className="fas fa-microscope text-xs"></i>
                <span>{t.hero.badge}</span>
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-900 font-display leading-[0.85] mb-8 tracking-tighter">
                {t.hero.titleMain}
                <div className="mt-6 flex justify-center lg:justify-start items-center">
                  <JackfruitLogo iconSize="w-24 h-28 lg:w-32 lg:h-36" textSize="text-7xl sm:text-9xl lg:text-[10rem]" />
                </div>
              </h1>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium italic">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => setView('evidence')} 
                  className="bg-[#014737] text-white px-12 py-5 rounded-2xl text-lg font-bold hover:bg-[#16c694] transition-all shadow-xl shadow-green-900/10 active:scale-95"
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
              <div className="relative p-3 bg-white rounded-[4rem] shadow-2xl border border-gray-100">
                <img src={t.hero.heroImage} alt="TeWELL+ MNT" className="rounded-[3.5rem] shadow-inner object-cover aspect-square w-full" />
                <div className="absolute -bottom-12 -right-6 lg:-right-12 bg-white p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] z-20 border border-green-50 min-w-[240px]">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{t.hero.chartLabel}</p>
                    <p className="text-6xl font-black text-[#16c694] tracking-tighter">-0.25%</p>
                    <div className="mt-3 w-10 h-1 bg-green-100 mx-auto rounded-full"></div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          
          {/* Brand - Compact */}
          <div className="lg:col-span-4">
            <JackfruitLogo light textSize="text-3xl" iconSize="w-12 h-16" className="mb-6" />
            <p className="text-gray-400 mb-8 text-sm leading-relaxed max-w-xs font-medium">
              {t.footer.mission}
            </p>
            <div className="flex gap-2">
               {(['id', 'en'] as const).map(l => (
                 <button 
                  key={l} 
                  onClick={() => setLocale(l)} 
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${locale === l ? 'bg-white text-gray-900' : 'text-gray-500 border border-white/10 hover:border-white/20'}`}
                 >
                   {l}
                 </button>
               ))}
            </div>
          </div>
          
          {/* Links - High Density */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-6 opacity-60">Company</h4>
              <ul className="space-y-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors">Top</button></li>
                <li><button onClick={() => setView('evidence')} className="hover:text-white transition-colors">Evidence</button></li>
                <li><button onClick={() => setView('blog')} className="hover:text-white transition-colors">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-6 opacity-60">Resources</h4>
              <ul className="space-y-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                <li><button onClick={() => setView('investment')} className="hover:text-white transition-colors">Investment</button></li>
                <li><button onClick={() => setView('brand-kit')} className="hover:text-white transition-colors">Brand Kit</button></li>
              </ul>
            </div>
          </div>
          
          {/* Contact - Direct & Modern */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-6 opacity-60">Get in touch</h4>
            <div className="space-y-4">
              <a href="mailto:hello@tewellplus.com" className="text-white font-black text-lg block hover:text-[#16c694] transition-colors">hello@tewellplus.com</a>
              <a href="https://wa.me/62881036139972" className="text-white font-black text-lg block hover:text-[#16c694] transition-colors">+62 881-0361-39972</a>
              <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest pt-4 border-t border-white/5">{t.footer.hours}</p>
            </div>
          </div>
        </div>
        
        {/* Simplified Legal Bar */}
        <div className="pt-8 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
           <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black leading-relaxed opacity-60">
             {t.footer.disclaimer}
           </p>
           <div className="flex flex-wrap justify-center lg:justify-end gap-8 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em]">
              <p>© 2024 TeWELL+</p>
              <button onClick={() => setView('admin')} className="hover:text-[#16c694] transition-all flex items-center gap-2">
                <i className="fas fa-fingerprint text-[8px]"></i> Admin
              </button>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
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
