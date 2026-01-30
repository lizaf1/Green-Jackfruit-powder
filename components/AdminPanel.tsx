
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';
import JackfruitLogo from './JackfruitLogo';

// Assuming you have these env variables or can set them in a config tab
const SUPABASE_URL = (window as any).process?.env?.SUPABASE_URL || '';
const SUPABASE_KEY = (window as any).process?.env?.SUPABASE_ANON_KEY || '';

type AdminTab = 'general' | 'hero' | 'products' | 'usage' | 'recipes' | 'evidence' | 'blog' | 'faq' | 'investment';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, isAuthenticated, login, logout } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [isUploading, setIsUploading] = useState<string | null>(null);

  useEffect(() => {
    setLocalContent(cmsData[editLocale]);
  }, [editLocale, cmsData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b1311] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl border border-white/10">
          <div className="text-center mb-10">
            <JackfruitLogo iconSize="w-20 h-24" className="mb-6 justify-center" />
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">TeWELL+ Command</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Root Access Required</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); login(passwordInput); }} className="space-y-6">
            <input 
              type="password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#16c694] outline-none"
              placeholder="System Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full bg-[#014737] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-[#16c694] transition-all shadow-xl active:scale-95">
              Enter Dashboard
            </button>
            <button type="button" onClick={() => setView('home')} className="w-full text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-gray-600 transition-colors">
              Abort to Public Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  const save = () => {
    updateContent(localContent, editLocale);
    alert('Global System State Updated Successfully.');
  };

  const updateNested = (path: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(localContent));
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalContent(newData);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // This is the placeholder logic for your Supabase Storage.
    // Replace the URL with your actual Supabase endpoint.
    setIsUploading(path);
    try {
      // Logic for Supabase Storage Upload via REST
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/public/assets/${fileName}`;
      
      // Since we don't have the real keys here, we provide a simulation that asks for the URL
      // In your real app, use the Supabase JS client or fetch() to upload
      // const { data, error } = await supabase.storage.from('assets').upload(fileName, file);
      
      // For now, to keep the app functional:
      const manualUrl = prompt("Please enter the direct URL for this image, or upload to your Supabase bucket 'assets' and paste here:", "");
      if (manualUrl) {
        updateNested(path, manualUrl);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(null);
    }
  };

  const InputField = ({ label, path, type = "text", placeholder = "" }: { label: string, path: string, type?: string, placeholder?: string }) => {
    const getValue = (p: string) => p.split('.').reduce((obj, key) => obj?.[key], localContent as any);
    const value = getValue(path) || '';

    return (
      <div className="space-y-1.5 flex-1 min-w-[200px]">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
        {type === "textarea" ? (
          <textarea 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-medium text-sm focus:ring-2 focus:ring-[#16c694] outline-none min-h-[80px]"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
            placeholder={placeholder}
          />
        ) : (
          <input 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm focus:ring-2 focus:ring-[#16c694] outline-none"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  };

  const ImageField = ({ label, path }: { label: string, path: string }) => {
    const getValue = (p: string) => p.split('.').reduce((obj, key) => obj?.[key], localContent as any);
    const value = getValue(path) || '';

    return (
      <div className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
        <div className="flex gap-4">
          <input 
            className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-xs focus:ring-2 focus:ring-[#16c694] outline-none"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
            placeholder="https://..."
          />
          <label className="cursor-pointer bg-white border border-gray-200 hover:border-[#16c694] px-6 flex items-center justify-center rounded-xl transition-all shadow-sm">
             <i className={`fas ${isUploading === path ? 'fa-spinner fa-spin' : 'fa-upload'} text-gray-400`}></i>
             <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, path)} accept="image/*" />
          </label>
        </div>
        {value && <img src={value} alt="preview" className="mt-2 h-16 w-16 object-cover rounded-lg border border-gray-100" />}
      </div>
    );
  };

  const SidebarItem = ({ id, icon, label }: { id: AdminTab, icon: string, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
        activeTab === id ? 'bg-[#16c694] text-[#014737] shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <i className={`fas ${icon} w-5`}></i> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#014737] text-white p-6 space-y-8 h-screen sticky top-0 border-r border-white/5 flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 pb-6 border-b border-white/5">
          <JackfruitLogo light iconOnly iconSize="w-10 h-14" />
          <div>
            <p className="font-black text-xs tracking-tighter uppercase">Command Center</p>
            <p className="text-[8px] font-bold text-green-400 uppercase tracking-widest">Version 3.0.0</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
          <SidebarItem id="hero" icon="fa-bolt" label="Hero Section" />
          <SidebarItem id="products" icon="fa-shopping-cart" label="Products & Links" />
          <SidebarItem id="usage" icon="fa-hand-point-up" label="Usage Guide" />
          <SidebarItem id="recipes" icon="fa-utensils" label="Recipes MNT" />
          <SidebarItem id="evidence" icon="fa-flask" label="Clinical Data" />
          <SidebarItem id="blog" icon="fa-newspaper" label="Articles/Blog" />
          <SidebarItem id="investment" icon="fa-chart-line" label="Investment" />
          <SidebarItem id="faq" icon="fa-question-circle" label="FAQ Items" />
          <SidebarItem id="general" icon="fa-cog" label="Site Config" />
        </nav>
        <div className="pt-6 border-t border-white/5 space-y-4">
          <button onClick={() => setView('home')} className="w-full text-left px-6 py-2 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
            <i className="fas fa-external-link-alt mr-3"></i> Site Preview
          </button>
          <button onClick={logout} className="w-full text-left px-6 py-2 text-red-400 hover:text-red-300 text-[10px] font-black uppercase tracking-widest transition-colors">
            <i className="fas fa-power-off mr-3"></i> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-10 lg:p-14 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              {activeTab} Settings
            </h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Configuring {editLocale.toUpperCase()} Translation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-gray-200 rounded-xl">
              {(['id', 'en'] as const).map(l => (
                <button 
                  key={l} 
                  onClick={() => setEditLocale(l)} 
                  className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${editLocale === l ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button 
              onClick={save} 
              className="bg-[#16c694] text-[#014737] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#014737] hover:text-white transition-all shadow-xl active:scale-95"
            >
              Push Global Updates
            </button>
          </div>
        </header>

        <div className="space-y-10">
          {activeTab === 'hero' && (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <InputField label="Hero Badge (Nature text)" path="translations.hero.badge" />
                  <InputField label="Primary Headline" path="translations.hero.titleMain" />
                  <InputField label="Hero Description" path="translations.hero.description" type="textarea" />
                </div>
                <div className="space-y-8">
                  <ImageField label="Hero Main Image" path="translations.hero.heroImage" />
                  <InputField label="Chart Label (-0.25%)" path="translations.hero.chartLabel" />
                  <InputField label="Hero CTA Button" path="translations.hero.ctaEvidence" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-10">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 border-b pb-4">Order Section Header</h3>
                <div className="grid grid-cols-2 gap-8">
                  <InputField label="Section Heading" path="translations.order.heading" />
                  <InputField label="Section Subheading" path="translations.order.subheading" type="textarea" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {localContent.variants.map((v, i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-black uppercase tracking-widest text-green-600">Product Variant #{i + 1}</h3>
                      <div className="flex items-center gap-4">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Mark Popular</label>
                        <input 
                          type="checkbox" 
                          checked={v.popular} 
                          onChange={(e) => updateNested(`variants.${i}.popular`, e.target.checked)}
                          className="w-5 h-5 accent-[#16c694]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      <InputField label="Name" path={`variants.${i}.name`} />
                      <InputField label="Weight" path={`variants.${i}.weight`} />
                      <InputField label="Price (Number only)" path={`variants.${i}.price`} />
                      <InputField label="Tag (BEST VALUE etc)" path={`variants.${i}.tag`} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-50">
                      <InputField label="WhatsApp Link" path={`variants.${i}.linkWA`} placeholder="https://wa.me/..." />
                      <InputField label="Shopee Link" path={`variants.${i}.linkShopee`} placeholder="https://shopee.co.id/..." />
                      <InputField label="TikTok Link" path={`variants.${i}.linkTikTok`} placeholder="https://tiktok.com/..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <InputField label="Main Heading" path="translations.usage.heading" />
                <InputField label="Description" path="translations.usage.description" type="textarea" />
              </div>
              <ImageField label="Usage Illustration Image" path="translations.usage.usageImage" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-50">
                 <div className="space-y-4">
                    <InputField label="Rice Title" path="translations.usage.riceTitle" />
                    <InputField label="Rice Desc" path="translations.usage.riceDesc" type="textarea" />
                 </div>
                 <div className="space-y-4">
                    <InputField label="Flour Title" path="translations.usage.flourTitle" />
                    <InputField label="Flour Desc" path="translations.usage.flourDesc" type="textarea" />
                 </div>
                 <div className="space-y-4">
                    <InputField label="Consistency Title" path="translations.usage.cookTitle" />
                    <InputField label="Consistency Desc" path="translations.usage.cookDesc" type="textarea" />
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-8">
              {localContent.recipes.map((recipe, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Recipe #{i + 1}</h3>
                      <InputField label="Name" path={`recipes.${i}.name`} />
                      <InputField label="Description" path={`recipes.${i}.description`} type="textarea" />
                      <InputField label="How to add (The + step)" path={`recipes.${i}.howToAdd`} />
                   </div>
                   <div className="space-y-6">
                      <ImageField label="Recipe Hero Image" path={`recipes.${i}.image`} />
                   </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-10">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-8">
                <InputField label="Primary Clinical Quote" path="translations.evidence.quote" type="textarea" />
                <div className="grid grid-cols-2 gap-8">
                  <InputField label="Nature Analysis Title" path="translations.evidence.analysisTitle" />
                  <InputField label="Analysis Description" path="translations.evidence.analysisDesc" type="textarea" />
                </div>
              </div>
              
              {localContent.articles.map((art, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-8">
                   <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Study Reference #{i + 1}</h3>
                   <div className="grid grid-cols-2 gap-6">
                      <InputField label="Title" path={`articles.${i}.title`} />
                      <InputField label="Journal" path={`articles.${i}.journal`} />
                      <InputField label="Year" path={`articles.${i}.year`} />
                      <InputField label="External Link (URL)" path={`articles.${i}.link`} />
                   </div>
                   <InputField label="Summary / Findings" path={`articles.${i}.summary`} type="textarea" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'blog' && (
             <div className="space-y-8">
                {localContent.blogPosts.map((post, i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                           <InputField label="Post ID (slug)" path={`blogPosts.${i}.id`} />
                           <InputField label="Title" path={`blogPosts.${i}.title`} />
                           <InputField label="Author" path={`blogPosts.${i}.author`} />
                           <InputField label="Excerpt" path={`blogPosts.${i}.excerpt`} type="textarea" />
                        </div>
                        <div className="space-y-6">
                           <ImageField label="Featured Image" path={`blogPosts.${i}.image`} />
                           <InputField label="Category" path={`blogPosts.${i}.category`} />
                        </div>
                     </div>
                     <InputField label="Full Article Content" path={`blogPosts.${i}.content`} type="textarea" />
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'general' && (
             <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <div className="space-y-8">
                      <h3 className="text-xs font-black uppercase text-[#16c694] tracking-widest border-b pb-4">Brand Config</h3>
                      <InputField label="Tagline (Nav/Logo)" path="translations.common.brandTagline" />
                      <InputField label="Mission (Footer)" path="translations.footer.mission" type="textarea" />
                      <InputField label="Operating Hours" path="translations.footer.hours" />
                   </div>
                   <div className="space-y-8">
                      <h3 className="text-xs font-black uppercase text-[#16c694] tracking-widest border-b pb-4">Legal & Support</h3>
                      <InputField label="Medical Disclaimer" path="translations.footer.disclaimer" type="textarea" />
                      <InputField label="Global WhatsApp (Global only)" path="translations.order.linkWA" />
                      <InputField label="Support Email" path="translations.footer.contactHeading" placeholder="hello@tewellplus.com" />
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
