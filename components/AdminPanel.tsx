
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';
import JackfruitLogo from './JackfruitLogo';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, isAuthenticated, login, logout } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'medical' | 'investment' | 'blog'>('content');

  useEffect(() => {
    setLocalContent(cmsData[editLocale]);
  }, [editLocale, cmsData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b1311] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#16c694] to-transparent"></div>
          <div className="text-center mb-10">
            <JackfruitLogo iconSize="w-20 h-24" className="mb-6 justify-center" />
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">TeWELL+ Command</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Identity Verification Required</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); login(passwordInput); }} className="space-y-6">
            <div className="relative">
              <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
              <input 
                type="password"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#16c694] outline-none transition-all placeholder:text-gray-300"
                placeholder="Access Token"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <button className="w-full bg-[#014737] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-[#16c694] transition-all shadow-xl shadow-green-900/10 active:scale-[0.98]">
              Authenticate
            </button>
            <button type="button" onClick={() => setView('home')} className="w-full text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-gray-600 transition-colors">
              Return to Public Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  const save = () => {
    updateContent(localContent, editLocale);
    alert('Changes synced to local storage successfully.');
  };

  const updateNested = (path: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(localContent));
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalContent(newData);
  };

  const SidebarItem = ({ id, icon, label }: { id: typeof activeTab, icon: string, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
        activeTab === id ? 'bg-[#16c694] text-[#014737] shadow-lg shadow-[#16c694]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <i className={`fas ${icon} text-sm`}></i>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-80 bg-[#014737] text-white p-8 space-y-12 h-screen sticky top-0 border-r border-white/5 flex flex-col">
        <div className="flex items-center gap-4 pb-8 border-b border-white/5">
          <JackfruitLogo light iconOnly iconSize="w-12 h-14" />
          <div>
            <p className="font-black text-sm tracking-tighter">TeWELL+ MNT</p>
            <p className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Admin Dashboard</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-3">
          <SidebarItem id="content" icon="fa-home" label="Core Content" />
          <SidebarItem id="medical" icon="fa-microscope" label="Clinical Data" />
          <SidebarItem id="investment" icon="fa-chart-line" label="Investment" />
          <SidebarItem id="blog" icon="fa-pen-nib" label="Articles" />
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-3">
          <button onClick={() => setView('home')} className="w-full flex items-center gap-4 px-6 py-3 text-gray-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
            <i className="fas fa-eye"></i> Live Preview
          </button>
          <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-3 text-red-400 hover:text-red-300 transition-colors text-[10px] font-black uppercase tracking-widest">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Editing Locale: {editLocale.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex p-1.5 bg-gray-200 rounded-2xl">
              <button onClick={() => setEditLocale('id')} className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${editLocale === 'id' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>ID</button>
              <button onClick={() => setEditLocale('en')} className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${editLocale === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>EN</button>
            </div>
            <button onClick={save} className="bg-[#16c694] text-[#014737] px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#16c694]/20">
              Save Changes
            </button>
          </div>
        </header>

        <div className="space-y-8">
          {activeTab === 'content' && (
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
                <h3 className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-3">
                  <span className="w-2 h-6 bg-[#16c694] rounded-full"></span>
                  Hero Section
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Headline</label>
                    <input 
                      className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl font-black text-xl focus:ring-2 focus:ring-[#16c694] outline-none"
                      value={localContent.translations.hero.titleMain}
                      onChange={(e) => updateNested('translations.hero.titleMain', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description Subtext</label>
                    <textarea 
                      className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl min-h-[120px] font-medium leading-relaxed italic text-gray-600 focus:ring-2 focus:ring-[#16c694] outline-none"
                      value={localContent.translations.hero.description}
                      onChange={(e) => updateNested('translations.hero.description', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
                <h3 className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-3">
                  <span className="w-2 h-6 bg-[#16c694] rounded-full"></span>
                  Contact Information (System Locked)
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Email</label>
                    <input className="w-full p-5 bg-gray-100 border border-gray-100 rounded-2xl font-bold text-gray-400 cursor-not-allowed" value="hello@tewellplus.com" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp Business</label>
                    <input className="w-full p-5 bg-gray-100 border border-gray-100 rounded-2xl font-bold text-gray-400 cursor-not-allowed" value="+62 881-0361-39972" readOnly />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
               <h3 className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-3">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Clinical Study Evidence
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Nature Quote</label>
                    <textarea 
                      className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl min-h-[100px] font-medium italic text-[#014737] focus:ring-2 focus:ring-[#16c694] outline-none"
                      value={localContent.translations.evidence.quote}
                      onChange={(e) => updateNested('translations.evidence.quote', e.target.value)}
                    />
                  </div>
                </div>
            </div>
          )}

          {activeTab === 'investment' && (
             <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
               <h3 className="text-lg font-black tracking-tight text-gray-900 flex items-center gap-3">
                  <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                  Pitch Deck Config
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment Heading</label>
                    <input 
                      className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl font-black text-xl"
                      value={localContent.investment.heading}
                      onChange={(e) => updateNested('investment.heading', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pitch Summary</label>
                    <textarea 
                      className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl min-h-[100px] font-medium text-gray-600"
                      value={localContent.investment.subheading}
                      onChange={(e) => updateNested('investment.subheading', e.target.value)}
                    />
                  </div>
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
