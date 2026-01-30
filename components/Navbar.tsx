
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import JackfruitLogo from './JackfruitLogo';
import { Locale } from '../types';

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

  const navigateTo = (v: 'home' | 'evidence' | 'blog' | 'admin' | 'investment' | 'brand-kit', anchor?: string) => {
    setView(v);
    setSelectedPostId(null);
    setIsOpen(false);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
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
            className={`transition-all px-3 py-1.5 rounded-full font-black text-[10px] flex items-center justify-center min-w-[40px] ${
              locale === l 
                ? 'bg-[#014737] text-white shadow-md' 
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-gray-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center group"
            onClick={() => navigateTo('home')}
          >
            <JackfruitLogo iconSize={scrolled ? "w-10 h-12" : "w-12 h-14"} />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex items-baseline space-x-8 text-xs font-black uppercase tracking-[0.15em]">
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
                className="bg-[#014737] text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#16c694] transition-all shadow-xl shadow-green-900/10 active:scale-95"
              >
                {t.common.orderNow}
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-12 h-12 flex items-center justify-center text-gray-600 bg-gray-50 rounded-2xl transition-all active:scale-90"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-[88px] bg-white z-40 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="p-8 space-y-6">
          <button onClick={() => navigateTo('home')} className="block w-full text-left text-gray-900 hover:text-green-600 font-black text-3xl tracking-tighter py-4 border-b border-gray-50">{t.nav.home}</button>
          <button onClick={() => navigateTo('evidence')} className="block w-full text-left text-gray-900 hover:text-green-600 font-black text-3xl tracking-tighter py-4 border-b border-gray-100">{t.nav.evidence}</button>
          <button onClick={() => navigateTo('blog')} className="block w-full text-left text-gray-900 hover:text-green-600 font-black text-3xl tracking-tighter py-4 border-b border-gray-100">{t.nav.blog}</button>
          <button onClick={() => navigateTo('home', 'recipes')} className="block w-full text-left text-gray-900 hover:text-green-600 font-black text-3xl tracking-tighter py-4 border-b border-gray-100">{t.nav.recipes}</button>
          <button onClick={() => navigateTo('home', 'faq')} className="block w-full text-left text-gray-900 hover:text-green-600 font-black text-3xl tracking-tighter py-4">{t.nav.faq}</button>
          
          <div className="pt-10">
            <button 
              onClick={() => navigateTo('home', 'order')}
              className="block w-full bg-[#014737] text-white text-center py-6 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-green-900/10 uppercase tracking-widest"
            >
              {t.common.orderNow}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
