
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';
import JackfruitLogo from './JackfruitLogo';

// Environment variables provided by Vercel/Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const BUCKET_NAME = 'assets';

type AdminTab = 'hero' | 'products' | 'usage' | 'recipes' | 'evidence' | 'blog' | 'investment' | 'faq' | 'general';

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
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 uppercase">System Access</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Identity Verification Required</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); login(passwordInput); }} className="space-y-6">
            <input 
              type="password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#16c694] outline-none transition-all"
              placeholder="Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full bg-[#014737] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-[#16c694] transition-all shadow-xl active:scale-95">
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
    alert('SUCCESS: Global Application State Synchronized.');
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (!file || !SUPABASE_URL || !SUPABASE_KEY) {
      if (!SUPABASE_URL) alert("Supabase configuration missing in environment variables.");
      return;
    }

    setIsUploading(path);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
      const filePath = `cms/${fileName}`;

      const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${filePath}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'apikey': SUPABASE_KEY,
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!response.ok) throw new Error('Upload failed');

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;
      updateNested(path, publicUrl);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Ensure bucket "assets" is public and variables are correct.');
    } finally {
      setIsUploading(null);
    }
  };

  const ControlField = ({ label, path, type = "text" }: { label: string, path: string, type?: string }) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], localContent as any) || '';
    return (
      <div className="space-y-1.5 flex-1 min-w-[280px]">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
        {type === "textarea" ? (
          <textarea 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-medium text-sm focus:ring-2 focus:ring-[#16c694] outline-none min-h-[100px]"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
          />
        ) : (
          <input 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm focus:ring-2 focus:ring-[#16c694] outline-none"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
          />
        )}
      </div>
    );
  };

  const ImageControl = ({ label, path }: { label: string, path: string }) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], localContent as any) || '';
    return (
      <div className="space-y-1.5 flex-1 min-w-[280px]">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
        <div className="flex gap-3">
          <input 
            className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-xs focus:ring-2 focus:ring-[#16c694] outline-none"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
          />
          <label className="cursor-pointer bg-[#014737] text-white px-5 rounded-xl flex items-center justify-center hover:bg-[#16c694] transition-all">
            <i className={`fas ${isUploading === path ? 'fa-spinner fa-spin' : 'fa-upload'} text-sm`}></i>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, path)} />
          </label>
        </div>
        {value && <img src={value} alt="Preview" className="mt-2 h-16 w-16 object-cover rounded-lg border border-gray-200" />}
      </div>
    );
  };

  const NavItem = ({ id, icon, label }: { id: AdminTab, icon: string, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
        activeTab === id ? 'bg-[#16c694] text-[#014737] shadow-lg shadow-[#16c694]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <i className={`fas ${icon} w-5`}></i> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar Command Center */}
      <aside className="w-72 bg-[#014737] text-white p-6 h-screen sticky top-0 border-r border-white/5 flex flex-col">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
          <JackfruitLogo light iconOnly iconSize="w-10 h-14" />
          <div>
            <p className="font-black text-xs tracking-tighter uppercase">Command v3.0</p>
            <p className="text-[8px] font-bold text-green-400 uppercase tracking-widest">Global Master</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
          <NavItem id="hero" icon="fa-bolt" label="Hero Section" />
          <NavItem id="products" icon="fa-shopping-bag" label="Products & Links" />
          <NavItem id="usage" icon="fa-utensils" label="Usage Logic" />
          <NavItem id="recipes" icon="fa-concierge-bell" label="MNT Recipes" />
          <NavItem id="evidence" icon="fa-flask" label="Clinical Data" />
          <NavItem id="blog" icon="fa-newspaper" label="Blog Content" />
          <NavItem id="investment" icon="fa-chart-line" label="Investment" />
          <NavItem id="faq" icon="fa-question-circle" label="Technical FAQ" />
          <NavItem id="general" icon="fa-cog" label="Site Config" />
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <button onClick={() => setView('home')} className="w-full text-left px-6 py-2 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
            <i className="fas fa-eye mr-3"></i> Live Preview
          </button>
          <button onClick={logout} className="w-full text-left px-6 py-2 text-red-400 hover:text-red-300 text-[10px] font-black uppercase tracking-widest transition-all">
            <i className="fas fa-power-off mr-3"></i> Log Out
          </button>
        </div>
      </aside>

      {/* Configuration Area */}
      <main className="flex-1 p-10 lg:p-14 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Edit {activeTab}</h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Locale: {editLocale.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-gray-200 rounded-xl">
              {(['id', 'en'] as const).map(l => (
                <button key={l} onClick={() => setEditLocale(l)} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${editLocale === l ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>{l}</button>
              ))}
            </div>
            <button onClick={save} className="bg-[#16c694] text-[#014737] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#014737] hover:text-white transition-all shadow-xl">Push Updates</button>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-8">
                <ControlField label="Primary Headline" path="translations.hero.titleMain" />
                <ControlField label="Hero Description" path="translations.hero.description" type="textarea" />
                <ControlField label="Badge Text (Clinically Proven)" path="translations.hero.badge" />
              </div>
              <div className="space-y-8">
                <ImageControl label="Main Hero Image" path="translations.hero.heroImage" />
                <ControlField label="CTA Button Text" path="translations.hero.ctaEvidence" />
                <ControlField label="HbA1c Reduction Text" path="translations.hero.chartLabel" />
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-12">
               <div className="grid grid-cols-2 gap-8">
                 <ControlField label="Section Header" path="translations.order.heading" />
                 <ControlField label="Section Subheading" path="translations.order.subheading" type="textarea" />
               </div>
               
               <div className="space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-green-600 border-b pb-4">Variant Tiers</h3>
                  {localContent.variants.map((v, i) => (
                    <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pack Variant {i + 1}</span>
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] font-black uppercase text-gray-400">Popular</label>
                          <input type="checkbox" checked={v.popular} onChange={(e) => updateNested(`variants.${i}.popular`, e.target.checked)} className="w-4 h-4 accent-[#16c694]" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <ControlField label="Name" path={`variants.${i}.name`} />
                        <ControlField label="Weight" path={`variants.${i}.weight`} />
                        <ControlField label="Price" path={`variants.${i}.price`} />
                        <ControlField label="Tag (e.g. Best Value)" path={`variants.${i}.tag`} />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                        <ControlField label="WhatsApp Link" path={`variants.${i}.linkWA`} />
                        <ControlField label="Shopee Link" path={`variants.${i}.linkShopee`} />
                        <ControlField label="TikTok Link" path={`variants.${i}.linkTikTok`} />
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="space-y-8">
                  <ControlField label="Usage Heading" path="translations.usage.heading" />
                  <ControlField label="Description" path="translations.usage.description" type="textarea" />
                  <ImageControl label="Usage Illustration Image" path="translations.usage.usageImage" />
               </div>
               <div className="space-y-8">
                  <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                    <ControlField label="Rice Title" path="translations.usage.riceTitle" />
                    <ControlField label="Rice Description" path="translations.usage.riceDesc" type="textarea" />
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
                    <ControlField label="Flour Title" path="translations.usage.flourTitle" />
                    <ControlField label="Flour Description" path="translations.usage.flourDesc" type="textarea" />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'recipes' && (
             <div className="space-y-10">
                {localContent.recipes.map((r, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 border border-gray-100 rounded-[2rem] bg-gray-50">
                    <div className="space-y-6">
                      <ControlField label="Recipe Name" path={`recipes.${i}.name`} />
                      <ControlField label="Description" path={`recipes.${i}.description`} type="textarea" />
                      <ControlField label="The '+' Step (How to add)" path={`recipes.${i}.howToAdd`} />
                    </div>
                    <div className="space-y-6">
                      <ImageControl label="Recipe Image" path={`recipes.${i}.image`} />
                    </div>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'evidence' && (
             <div className="space-y-10">
                <ControlField label="Nature Study Quote" path="translations.evidence.quote" type="textarea" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {localContent.articles.map((art, i) => (
                      <div key={i} className="p-6 bg-gray-50 rounded-2xl space-y-4">
                        <ControlField label="Journal Title" path={`articles.${i}.title`} />
                        <ControlField label="Journal Source" path={`articles.${i}.journal`} />
                        <ControlField label="Full Paper Link" path={`articles.${i}.link`} />
                        <ControlField label="Short Summary" path={`articles.${i}.summary`} type="textarea" />
                      </div>
                   ))}
                </div>
             </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-10">
              {localContent.blogPosts.map((post, i) => (
                <div key={i} className="p-8 border border-gray-100 rounded-[2rem] bg-gray-50 space-y-6">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <ControlField label="Article Title" path={`blogPosts.${i}.title`} />
                      <ControlField label="Category" path={`blogPosts.${i}.category`} />
                      <ControlField label="Author" path={`blogPosts.${i}.author`} />
                      <ImageControl label="Featured Image" path={`blogPosts.${i}.image`} />
                   </div>
                   <ControlField label="Short Excerpt" path={`blogPosts.${i}.excerpt`} type="textarea" />
                   <ControlField label="Full Article Body" path={`blogPosts.${i}.content`} type="textarea" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'general' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                   <h3 className="text-xs font-black uppercase text-green-600 border-b pb-4">Brand & Global Links</h3>
                   <ControlField label="Brand Tagline" path="translations.common.brandTagline" />
                   <ControlField label="Global WhatsApp Link" path="translations.order.linkWA" />
                   <ControlField label="Global Shopee Link" path="translations.order.linkShopee" />
                   <ControlField label="Global TikTok Link" path="translations.order.linkTikTok" />
                </div>
                <div className="space-y-8">
                   <h3 className="text-xs font-black uppercase text-green-600 border-b pb-4">Footer & Legal</h3>
                   <ControlField label="Mission Statement" path="translations.footer.mission" type="textarea" />
                   <ControlField label="Medical Disclaimer" path="translations.footer.disclaimer" type="textarea" />
                   <ControlField label="Operating Hours" path="translations.footer.hours" />
                   <ControlField label="Contact Support Email" path="translations.footer.contactHeading" />
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
