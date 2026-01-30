
import React, { useEffect } from 'react';
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
import SitemapPage from './components/SitemapPage';
import OrderSection from './components/OrderSection';
import JackfruitLogo from './components/JackfruitLogo';
import SEO from './components/SEO';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Define siteName for use in SEO title and product names
const siteName = "TeWELL+";

const AppContent: React.FC = () => {
  const { cmsData, locale, view, setView, setSelectedPostId, selectedPostId, isLoading } = useLanguage();
  const content = cmsData[locale];
  const t = content.translations;

  // GLOBAL SCROLL RESET
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [view, selectedPostId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <JackfruitLogo iconSize="w-16 h-20" className="animate-pulse mb-4" iconOnly />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Syncing with Cloud...</p>
      </div>
    );
  }

  if (view === 'admin') return <AdminPanel />;

  const NavigationFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer t={t} setView={setView} setSelectedPostId={setSelectedPostId} locale={locale} />
    </div>
  );

  if (view === 'brand-kit') return <NavigationFrame><BrandKitPage /></NavigationFrame>;
  if (view === 'sitemap') return <NavigationFrame><SitemapPage /></NavigationFrame>;
  if (view === 'investment') {
    return (
      <NavigationFrame>
        <SEO title={locale === 'id' ? "Peluang Investasi" : "Investment Opportunities"} description={content.investment.subheading} />
        <InvestmentPage />
      </NavigationFrame>
    );
  }
  if (view === 'evidence') {
    return (
      <NavigationFrame>
        <SEO type="medical" title={t.evidence.pageTitle} description={t.evidence.pageSubtitle} />
        <EvidencePage />
      </NavigationFrame>
    );
  }
  if (view === 'blog') {
    return (
      <NavigationFrame>
        <BlogPage />
      </NavigationFrame>
    );
  }

  // Home Page Specific SEO
  const mainProduct = content.variants.find(v => v.popular) || content.variants[0];

  return (
    <div className="min-h-screen selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      <SEO 
        productData={mainProduct ? {
          name: `${siteName} ${mainProduct.name}`,
          description: t.hero.description,
          price: mainProduct.price,
          currency: mainProduct.currency,
          sku: `TEWELL-${mainProduct.weight}`,
          image: t.hero.heroImage
        } : undefined}
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-white pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-green-50/40 to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
            
            <div className="w-full lg:w-3/5 text-center lg:text-left z-20">
              <div className="inline-flex items-center gap-2 bg-white border border-green-100 text-green-700 px-4 py-1.5 rounded-full text-[9px] font-black mb-6 tracking-[0.2em] uppercase shadow-sm">
                <i className="fas fa-certificate text-[10px]"></i>
                <span>{t.hero.badge}</span>
              </div>
              
              <h1 className="text-[clamp(2rem,10vw,5.5rem)] font-black text-gray-900 font-display leading-[1.05] mb-6 tracking-tighter max-w-4xl">
                {t.hero.titleMain}
                <div className="mt-4 lg:mt-6 flex justify-center lg:justify-start items-center">
                  <JackfruitLogo 
                    iconSize="w-[clamp(3.5rem,12vw,8rem)] h-[clamp(4.5rem,16vw,9rem)]" 
                    textSize="text-[clamp(2.5rem,9vw,9rem)]" 
                  />
                </div>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 mb-8 lg:mb-12 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium italic opacity-80">
                {t.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => setView('evidence')} 
                  className="bg-[#014737] text-white px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-sm lg:text-lg font-bold hover:bg-[#16c694] transition-all shadow-xl shadow-green-900/10 active:scale-95"
                >
                  {t.hero.ctaEvidence}
                </button>
                <button 
                  onClick={() => { setView('blog'); setSelectedPostId(null); }} 
                  className="bg-white border-2 border-gray-100 text-gray-700 px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-sm lg:text-lg font-bold hover:border-green-600 hover:text-green-600 transition-all active:scale-95"
                >
                  {t.common.readBlog}
                </button>
              </div>
            </div>
            
            <div className="w-full lg:w-2/5 relative mt-10 lg:mt-0 flex justify-center lg:block">
              <div className="relative p-2 lg:p-3 bg-white rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl border border-gray-100 w-full max-w-[280px] sm:max-w-md lg:max-w-none">
                <img src={t.hero.heroImage} alt="TeWELL+ Nangka Muda powder pouch packaging" className="rounded-[2.2rem] lg:rounded-[3.5rem] shadow-inner object-cover aspect-square w-full" />
                
                <div className="absolute -bottom-6 -right-2 lg:-bottom-12 lg:-right-12 bg-white p-5 lg:p-10 rounded-[2rem] lg:rounded-[3rem] shadow-2xl z-20 border border-green-50 min-w-[130px] lg:min-w-[240px]">
                  <div className="text-center">
                    <p className="text-[7px] lg:text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{t.hero.chartLabel}</p>
                    <p className="text-3xl lg:text-6xl font-black text-[#16c694] tracking-tighter">-0.25%</p>
                    <div className="mt-2 w-8 h-1 bg-green-100 mx-auto rounded-full"></div>
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

      <section className="py-20 bg-[#014737] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <blockquote className="text-xl md:text-3xl font-display italic mb-10 leading-snug max-w-4xl mx-auto opacity-90">"{t.evidence.quote}"</blockquote>
           <button 
             onClick={() => setView('evidence')} 
             className="bg-[#16c694] text-[#014737] px-10 py-4 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-white transition-all shadow-xl"
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
    <footer className="bg-[#0b1311] text-white pt-16 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
          
          <div className="lg:col-span-4">
            <JackfruitLogo light textSize="text-2xl" iconSize="w-10 h-12" className="mb-6" />
            <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-xs font-medium">
              {t.footer.mission}
            </p>
            <div className="flex gap-2">
               {(['id', 'en'] as const).map(l => (
                 <button 
                  key={l} 
                  onClick={() => setLocale(l)} 
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${locale === l ? 'bg-white text-gray-900' : 'text-gray-600 border border-white/5 hover:border-white/10'}`}
                 >
                   {l}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-6 opacity-40">Navigate</h4>
              <ul className="space-y-4 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                <li><button onClick={() => setView('evidence')} className="hover:text-white transition-colors">Evidence</button></li>
                <li><button onClick={() => setView('blog')} className="hover:text-white transition-colors">Education</button></li>
                <li><button onClick={() => setView('investment')} className="hover:text-white transition-colors">Investment</button></li>
                <li><button onClick={() => setView('sitemap')} className="hover:text-white transition-colors">Sitemap</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-6 opacity-40">Assets</h4>
              <ul className="space-y-4 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                <li><button onClick={() => setView('brand-kit')} className="hover:text-white transition-colors">Brand Kit</button></li>
                <li><button onClick={() => setView('admin')} className="hover:text-white text-[#16c694] transition-colors">Admin Panel</button></li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#16c694] mb-6 opacity-40">Support</h4>
            <div className="space-y-4">
              <a href="mailto:hello@tewellplus.com" className="text-white font-black text-sm block hover:text-[#16c694] transition-colors">hello@tewellplus.com</a>
              <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest pt-4 border-t border-white/5">{t.footer.hours}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
           <p className="text-[8px] text-gray-600 uppercase tracking-widest font-black opacity-50 max-w-2xl text-center lg:text-left">
             {t.footer.disclaimer}
           </p>
           <p className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em]">© 2024 TeWELL+</p>
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
