import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TeWELLLogo from './TeWELLLogo';
import { Locale, View } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { view, setView, locale, setLocale, cmsData, setSelectedPostId } = useLanguage();
  const t = cmsData[locale].translations;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (v: View, anchor?: string) => {
    setView(v);
    setIsOpen(false);
    
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          const navHeight = scrolled ? 80 : 100;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const LanguageToggle = () => {
    const labels: Record<Locale, string> = {
      id: 'ID',
      en: 'EN'
    };

    return (
      <div className="flex items-center gap-1 p-1 border border-gray-100 rounded-full bg-gray-50/50">
        {(['id', 'en'] as const).map((l) => (
          <button 
            key={l}
            onClick={() => setLocale(l)}
            className={`transition-all px-3 py-1.5 rounded-full font-black text-[10px] flex items-center justify-center min-w-[36px] ${
              locale === l 
                ? 'bg-[#014737] text-white shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {labels[l]}
          </button>
        ))}
      </div>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-gray-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center group"
            onClick={() => navigateTo('home')}
          >
            <TeWELLLogo iconSize={scrolled ? "w-10 h-12" : "w-12 h-14"} />
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex items-baseline space-x-8 text-[11px] font-black uppercase tracking-widest">
              <button onClick={() => navigateTo('home')} className={`transition-all hover:text-green-600 ${view === 'home' ? 'text-green-600' : 'text-gray-500'}`}>{t.nav.home}</button>
              <button onClick={() => navigateTo('evidence')} className={`transition-all hover:text-green-600 ${view === 'evidence' ? 'text-green-600' : 'text-gray-500'}`}>{t.nav.evidence}</button>
              <button onClick={() => navigateTo('blog')} className={`transition-all hover:text-green-600 ${view === 'blog' ? 'text-green-600' : 'text-gray-500'}`}>{t.nav.blog}</button>
              <button onClick={() => navigateTo('home', 'recipes')} className="text-gray-500 hover:text-green-600 transition-all">{t.nav.recipes}</button>
              <button onClick={() => navigateTo('home', 'faq')} className="text-gray-500 hover:text-green-600 transition-all">{t.nav.faq}</button>
            </div>
            
            <div className="flex items-center gap-6">
              <LanguageToggle />
              <button 
                onClick={() => navigateTo('home', 'order')}
                className="bg-[#014737] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#16c694] transition-all shadow-lg shadow-green-900/10 active:scale-95"
              >
                {t.common.orderNow}
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <LanguageToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 flex items-center justify-center text-gray-600 bg-gray-50 rounded-xl"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 py-8 px-6 space-y-4 shadow-xl">
          <button onClick={() => navigateTo('home')} className="block w-full text-left text-gray-800 hover:text-green-600 font-black text-2xl tracking-tighter py-2 border-b border-gray-50">{t.nav.home}</button>
          <button onClick={() => navigateTo('evidence')} className="block w-full text-left text-gray-800 hover:text-green-600 font-black text-2xl tracking-tighter py-2 border-b border-gray-50">{t.nav.evidence}</button>
          <button onClick={() => navigateTo('blog')} className="block w-full text-left text-gray-800 hover:text-green-600 font-black text-2xl tracking-tighter py-2 border-b border-gray-50">{t.nav.blog}</button>
          <button onClick={() => navigateTo('home', 'recipes')} className="block w-full text-left text-gray-800 hover:text-green-600 font-black text-2xl tracking-tighter py-2 border-b border-gray-50">{t.nav.recipes}</button>
          <button onClick={() => navigateTo('home', 'faq')} className="block w-full text-left text-gray-800 hover:text-green-600 font-black text-2xl tracking-tighter py-2">{t.nav.faq}</button>
          <div className="pt-6">
            <button 
              onClick={() => navigateTo('home', 'order')}
              className="block w-full bg-[#014737] text-white text-center py-5 rounded-2xl font-black text-lg tracking-widest shadow-xl uppercase"
            >
              {t.common.orderNow}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;