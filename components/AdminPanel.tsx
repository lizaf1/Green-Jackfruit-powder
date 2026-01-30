
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale, ProductVariant, Recipe, Article, BlogPost } from '../types';
import JackfruitLogo from './JackfruitLogo';

type AdminTab = 'hero' | 'products' | 'usage' | 'recipes' | 'evidence' | 'investment' | 'blog' | 'common';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, isAuthenticated, login, logout } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');

  useEffect(() => {
    setLocalContent(cmsData[editLocale]);
  }, [editLocale, cmsData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b1311] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="text-center mb-10">
            <JackfruitLogo iconSize="w-20 h-24" className="mb-6 justify-center" />
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">TeWELL+ Command</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Enter System Credentials</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); login(passwordInput); }} className="space-y-6">
            <input 
              type="password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#16c694] outline-none transition-all"
              placeholder="System Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full bg-[#014737] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-[#16c694] transition-all shadow-xl active:scale-95">
              Authenticate
            </button>
            <button type="button" onClick={() => setView('home')} className="w-full text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-gray-600 transition-colors">
              Return to Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  const save = () => {
    updateContent(localContent, editLocale);
    alert('Global state updated successfully.');
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

  const SidebarButton = ({ id, icon, label }: { id: AdminTab, icon: string, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
        activeTab === id ? 'bg-[#16c694] text-[#014737] shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <i className={`fas ${icon} w-5 text-center`}></i> {label}
    </button>
  );

  const InputField = ({ label, path, type = "text" }: { label: string, path: string, type?: string }) => {
    const getValue = (p: string) => {
      return p.split('.').reduce((obj, key) => obj?.[key], localContent as any);
    };
    return (
      <div className="space-y-2">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
        {type === "textarea" ? (
          <textarea 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-medium text-sm focus:ring-2 focus:ring-[#16c694] outline-none min-h-[100px]"
            value={getValue(path) || ''}
            onChange={(e) => updateNested(path, e.target.value)}
          />
        ) : (
          <input 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm focus:ring-2 focus:ring-[#16c694] outline-none"
            value={getValue(path) || ''}
            onChange={(e) => updateNested(path, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">
      <aside className="w-72 bg-[#014737] text-white p-6 space-y-8 h-screen sticky top-0 border-r border-white/5 flex flex-col overflow-y-auto">
        <JackfruitLogo light iconSize="w-12 h-16" className="mb-4" />
        <nav className="flex-1 space-y-2">
          <SidebarButton id="hero" icon="fa-rocket" label="Hero & Badge" />
          <SidebarButton id="products" icon="fa-shopping-bag" label="Products & Links" />
          <SidebarButton id="usage" icon="fa-directions" label="Usage Guide" />
          <SidebarButton id="recipes" icon="fa-utensils" label="MNT Recipes" />
          <SidebarButton id="evidence" icon="fa-microscope" label="Clinical Data" />
          <SidebarButton id="investment" icon="fa-chart-pie" label="Investment" />
          <SidebarButton id="blog" icon="fa-newspaper" label="Blog Posts" />
          <SidebarButton id="common" icon="fa-cog" label="Footer & Misc" />
        </nav>
        <div className="pt-6 border-t border-white/5 space-y-4">
          <button onClick={() => setView('home')} className="w-full text-left px-6 py-2 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest"><i className="fas fa-eye mr-3"></i> Preview</button>
          <button onClick={logout} className="w-full text-left px-6 py-2 text-red-400 hover:text-red-300 text-[10px] font-black uppercase tracking-widest"><i className="fas fa-power-off mr-3"></i> Logout</button>
        </div>
      </aside>
      
      <main className="flex-1 p-10 lg:p-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Command Console</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Configuring: {activeTab}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-200 p-1 rounded-xl">
              {(['id', 'en'] as const).map(l => (
                <button key={l} onClick={() => setEditLocale(l)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${editLocale === l ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{l}</button>
              ))}
            </div>
            <button onClick={save} className="bg-[#16c694] text-[#014737] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#014737] hover:text-white transition-all shadow-lg">Push Updates</button>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <InputField label="Hero Heading" path="translations.hero.titleMain" />
                <InputField label="Hero Description" path="translations.hero.description" type="textarea" />
                <InputField label="CTA Button Text" path="translations.hero.ctaEvidence" />
              </div>
              <div className="space-y-8">
                <InputField label="Hero Main Image URL" path="translations.hero.heroImage" />
                <InputField label="Clinical Badge Text" path="translations.hero.badge" />
                <InputField label="HbA1c Reduction Label" path="translations.hero.chartLabel" />
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InputField label="Section Heading" path="translations.order.heading" />
                  <InputField label="Section Subheading" path="translations.order.subheading" type="textarea" />
               </div>
               <div className="space-y-10 border-t border-gray-50 pt-10">
                  {localContent.variants.map((v, i) => (
                    <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-6">
                       <h4 className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Variant Tier {i + 1}</h4>
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                          <InputField label="Tier Name" path={`variants.${i}.name`} />
                          <InputField label="Weight" path={`variants.${i}.weight`} />
                          <InputField label="Price" path={`variants.${i}.price`} />
                          <InputField label="Tag (e.g. BEST VALUE)" path={`variants.${i}.tag`} />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <InputField label="WhatsApp Link" path="translations.order.linkWA" />
                          <InputField label="Shopee Link" path="translations.order.linkShopee" />
                          <InputField label="TikTok Link" path="translations.order.linkTikTok" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <InputField label="Heading" path="translations.usage.heading" />
                <InputField label="Description" path="translations.usage.description" type="textarea" />
                <InputField label="Rice Replacement Title" path="translations.usage.riceTitle" />
                <InputField label="Rice Replacement Desc" path="translations.usage.riceDesc" type="textarea" />
              </div>
              <div className="space-y-8">
                <InputField label="Usage Illustration Image URL" path="translations.usage.usageImage" />
                <InputField label="Flour Substitution Title" path="translations.usage.flourTitle" />
                <InputField label="Flour Substitution Desc" path="translations.usage.flourDesc" type="textarea" />
                <InputField label="Consistency Title" path="translations.usage.cookTitle" />
                <InputField label="Consistency Desc" path="translations.usage.cookDesc" type="textarea" />
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <InputField label="Recipes Heading" path="translations.recipes.heading" />
                <InputField label="Subheading" path="translations.recipes.subheading" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {localContent.recipes.map((r, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <InputField label={`Recipe ${i+1} Name`} path={`recipes.${i}.name`} />
                    <InputField label="Description" path={`recipes.${i}.description`} type="textarea" />
                    <InputField label="Step (How to Add)" path={`recipes.${i}.howToAdd`} />
                    <InputField label="Image URL" path={`recipes.${i}.image`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InputField label="Nature Article Quote" path="translations.evidence.quote" type="textarea" />
                <InputField label="Page Title" path="translations.evidence.pageTitle" />
              </div>
              <div className="grid grid-cols-1 gap-8">
                {localContent.articles.map((art, i) => (
                  <div key={i} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 space-y-6">
                     <h4 className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Clinical Study {i + 1}</h4>
                     <div className="grid grid-cols-2 gap-6">
                        <InputField label="Study Title" path={`articles.${i}.title`} />
                        <InputField label="Nature Journal Link" path={`articles.${i}.link`} />
                     </div>
                     <InputField label="Summary" path={`articles.${i}.summary`} type="textarea" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'investment' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <InputField label="Heading" path="investment.heading" />
                <InputField label="Subheading" path="investment.subheading" type="textarea" />
                <InputField label="Main Pitch Text" path="investment.pitchText" type="textarea" />
              </div>
              <div className="space-y-8">
                <InputField label="Market Image URL" path="investment.image" />
                <InputField label="Market Stats Value 1" path="investment.marketStats.0.value" />
                <InputField label="Market Stats Label 1" path="investment.marketStats.0.label" />
                <InputField label="Market Stats Value 2" path="investment.marketStats.1.value" />
                <InputField label="Market Stats Label 2" path="investment.marketStats.1.label" />
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-8">
              {localContent.blogPosts.map((post, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                  <InputField label={`Post ${i+1} Title`} path={`blogPosts.${i}.title`} />
                  <InputField label="Excerpt" path={`blogPosts.${i}.excerpt`} type="textarea" />
                  <InputField label="Image URL" path={`blogPosts.${i}.image`} />
                  <InputField label="Category" path={`blogPosts.${i}.category`} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'common' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <InputField label="Brand Tagline" path="translations.common.brandTagline" />
                <InputField label="Footer Mission Statement" path="translations.footer.mission" type="textarea" />
              </div>
              <div className="space-y-8">
                <InputField label="Medical Disclaimer" path="translations.footer.disclaimer" type="textarea" />
                <InputField label="Operating Hours" path="translations.footer.hours" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
