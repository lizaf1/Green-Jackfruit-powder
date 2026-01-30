
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';
import JackfruitLogo from './JackfruitLogo';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, isAuthenticated, login, logout } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'translations' | 'investment' | 'blog'>('translations');

  useEffect(() => {
    setLocalContent(cmsData[editLocale]);
  }, [editLocale, cmsData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b1311] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="text-center mb-10">
            <JackfruitLogo iconSize="w-20 h-24" className="mb-6 justify-center" />
            <h1 className="text-2xl font-black tracking-tighter">TeWELL Admin Access</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Authenticated Users Only</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); login(passwordInput); }} className="space-y-6">
            <input 
              type="password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium focus:ring-2 focus:ring-[#16c694] outline-none transition-all"
              placeholder="System Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full bg-[#014737] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-[#16c694] transition-all shadow-xl shadow-green-900/10 active:scale-[0.98]">Unlock Portal</button>
            <button type="button" onClick={() => setView('home')} className="w-full text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-gray-600">Cancel & Return</button>
          </form>
        </div>
      </div>
    );
  }

  const save = () => {
    updateContent(localContent, editLocale);
    alert('Content Synchronization Successful.');
  };

  const updateTranslation = (section: string, field: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(localContent));
    (newData.translations as any)[section][field] = value;
    setLocalContent(newData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-72 bg-[#014737] text-white p-10 space-y-12 h-screen sticky top-0 border-r border-white/5">
        <JackfruitLogo light iconOnly iconSize="w-20 h-24" className="justify-center" />
        <nav className="space-y-6">
          <button 
            onClick={() => setActiveTab('translations')}
            className={`w-full text-left font-black text-xs uppercase tracking-widest flex items-center gap-4 transition-all ${activeTab === 'translations' ? 'text-[#16c694]' : 'text-gray-400 hover:text-white'}`}
          >
             <i className="fas fa-edit"></i> Core Content
          </button>
          <button 
            onClick={() => setActiveTab('investment')}
            className={`w-full text-left font-black text-xs uppercase tracking-widest flex items-center gap-4 transition-all ${activeTab === 'investment' ? 'text-[#16c694]' : 'text-gray-400 hover:text-white'}`}
          >
             <i className="fas fa-chart-pie"></i> Investment Board
          </button>
          <button onClick={() => setView('home')} className="w-full text-left font-black text-xs uppercase tracking-widest text-gray-400 hover:text-white flex items-center gap-4 pt-12 border-t border-white/5">
             <i className="fas fa-eye"></i> View Live Site
          </button>
          <button onClick={logout} className="w-full text-left font-black text-xs uppercase tracking-widest text-red-400 hover:text-red-300 flex items-center gap-4">
             <i className="fas fa-power-off"></i> Terminate Session
          </button>
        </nav>
      </aside>
      
      <main className="flex-1 p-16 overflow-y-auto">
        <div className="max-w-4xl space-y-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-gray-900">Portal Control</h1>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Manage Clinical & Brand Data</p>
            </div>
            <div className="flex gap-2 p-1.5 bg-gray-200 rounded-2xl">
              <button onClick={() => setEditLocale('id')} className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-widest ${editLocale === 'id' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>INDONESIA</button>
              <button onClick={() => setEditLocale('en')} className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-widest ${editLocale === 'en' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>ENGLISH</button>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100 space-y-12">
            {activeTab === 'translations' && (
              <>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">Primary Headline</label>
                  <input 
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl font-black text-xl tracking-tight focus:ring-2 focus:ring-[#16c694] outline-none"
                    value={localContent.translations.hero.titleMain}
                    onChange={(e) => updateTranslation('hero', 'titleMain', e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">Product USP Summary</label>
                  <textarea 
                    className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl min-h-[140px] font-medium leading-relaxed italic text-gray-600 focus:ring-2 focus:ring-[#16c694] outline-none"
                    value={localContent.translations.hero.description}
                    onChange={(e) => updateTranslation('hero', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">Clinical Journal Quote</label>
                  <textarea 
                    className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl min-h-[100px] font-medium leading-relaxed italic text-[#014737] focus:ring-2 focus:ring-[#16c694] outline-none"
                    value={localContent.translations.evidence.quote}
                    onChange={(e) => updateTranslation('evidence', 'quote', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-10 pt-6 border-t border-gray-50">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">Global Support Email</label>
                    <input className="w-full p-5 bg-gray-100 border border-gray-100 rounded-2xl font-black text-gray-400 cursor-not-allowed" value="hello@tewellplus.com" readOnly />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">Support Contact (WhatsApp)</label>
                    <input className="w-full p-5 bg-gray-100 border border-gray-100 rounded-2xl font-black text-gray-400 cursor-not-allowed" value="+62 881-0361-39972" readOnly />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'investment' && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">Pitch Deck Heading</label>
                  <input 
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl font-black text-2xl tracking-tight"
                    value={localContent.investment.heading}
                    onChange={(e) => {
                      const newData = {...localContent};
                      newData.investment.heading = e.target.value;
                      setLocalContent(newData);
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">Market Subtext</label>
                  <textarea 
                    className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl min-h-[120px] font-medium text-gray-600"
                    value={localContent.investment.subheading}
                    onChange={(e) => {
                      const newData = {...localContent};
                      newData.investment.subheading = e.target.value;
                      setLocalContent(newData);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={save} 
            className="w-full bg-[#16c694] text-[#014737] py-6 rounded-3xl font-black text-lg tracking-widest uppercase shadow-2xl shadow-green-200 hover:bg-[#014737] hover:text-white transition-all hover:scale-[1.02] active:scale-95"
          >
            Deploy Changes Globally
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
