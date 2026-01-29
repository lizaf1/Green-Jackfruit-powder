
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import JackfruitLogo from './JackfruitLogo';
import { Locale } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { view, setView, locale, setLocale, cmsData, setSelectedPostId } = useLanguage();
  const t = cmsData[locale].translations;

  const navigateTo = (v: 'home' | 'evidence' | 'blog' | 'admin', anchor?: string) => {
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
            className={`transition-all px-3 py-1 rounded-full font-black text-[10px] flex items-center justify-center min-w-[36px] ${
              locale === l 
                ? 'bg-green-600 text-white shadow-sm' 
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
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center group"
            onClick={() => navigateTo('home')}
          >
            <JackfruitLogo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-baseline space-x-5 text-sm">
              <button onClick={() => navigateTo('home')} className={`font-semibold transition ${view === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>{t.nav.home}</button>
              <button onClick={() => navigateTo('evidence')} className={`font-semibold transition ${view === 'evidence' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>{t.nav.evidence}</button>
              <button onClick={() => navigateTo('blog')} className={`font-semibold transition ${view === 'blog' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>{t.nav.blog}</button>
              <button onClick={() => navigateTo('home', 'recipes')} className="text-gray-600 hover:text-green-600 font-semibold transition">{t.nav.recipes}</button>
              <button onClick={() => navigateTo('home', 'faq')} className="text-gray-600 hover:text-green-600 font-semibold transition">{t.nav.faq}</button>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <button 
                onClick={() => navigateTo('home', 'order')}
                className="bg-green-600 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
              >
                {t.common.orderNow}
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <button onClick={() => navigateTo('home')} className="block w-full text-left text-gray-800 hover:text-green-600 font-bold text-lg py-2">{t.nav.home}</button>
          <button onClick={() => navigateTo('evidence')} className="block w-full text-left text-gray-800 hover:text-green-600 font-bold text-lg py-2">{t.nav.evidence}</button>
          <button onClick={() => navigateTo('blog')} className="block w-full text-left text-gray-800 hover:text-green-600 font-bold text-lg py-2">{t.nav.blog}</button>
          <button onClick={() => navigateTo('home', 'recipes')} className="block w-full text-left text-gray-800 hover:text-green-600 font-bold text-lg py-2">{t.nav.recipes}</button>
          <button onClick={() => navigateTo('home', 'faq')} className="block w-full text-left text-gray-800 hover:text-green-600 font-bold text-lg py-2">{t.nav.faq}</button>
          <div className="pt-4 mt-4 border-t border-gray-100">
            <button 
              onClick={() => navigateTo('home', 'order')}
              className="block w-full bg-green-600 text-white text-center py-4 rounded-2xl font-bold shadow-lg shadow-green-200"
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
