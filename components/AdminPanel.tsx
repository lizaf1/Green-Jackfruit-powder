
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale, BlogPost, ProductVariant, Recipe, FAQItem, Article } from '../types';
import JackfruitLogo from './JackfruitLogo';
import { getDefaultContent } from '../translations';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://uptstkvqkvequnlufxkl.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_1LVOeXolvYTDAUJiMHlfXA_uXDX0F7Y';
const BUCKET_NAME = 'assets';

type AdminTab = 'hero' | 'products' | 'usage' | 'recipes' | 'evidence' | 'blog' | 'investment' | 'faq' | 'general';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, isAuthenticated, login, logout } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocalContent(cmsData[editLocale]);
  }, [editLocale, cmsData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b1311] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl">
          <div className="text-center mb-10">
            <JackfruitLogo iconSize="w-20 h-24" className="mb-6 justify-center" />
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 uppercase">Control Center</h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); login(passwordInput); }} className="space-y-6">
            <input type="password" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#16c694]" placeholder="Admin Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            <button className="w-full bg-[#014737] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-[#16c694] transition-all">Login to Command</button>
            <button type="button" onClick={() => setView('home')} className="w-full text-gray-400 text-[10px] font-black uppercase tracking-widest mt-4">Return Home</button>
          </form>
        </div>
      </div>
    );
  }

  const save = async () => {
    setIsSaving(true);
    const success = await updateContent(localContent, editLocale);
    setIsSaving(false);
    if (success) alert('SUCCESS: Cloud Updated.');
    else alert('ERROR: Cloud update failed.');
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

  const addItem = (path: string, template: any) => {
    const newData = JSON.parse(JSON.stringify(localContent));
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    if (Array.isArray(current)) {
      current.push(template);
      setLocalContent(newData);
    }
  };

  const removeItem = (path: string, index: number) => {
    const newData = JSON.parse(JSON.stringify(localContent));
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    if (Array.isArray(current)) {
      current.splice(index, 1);
      setLocalContent(newData);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(path);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filePath = `cms/${fileName}`;
      const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${filePath}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY, 'Content-Type': file.type },
        body: file,
      });
      if (!response.ok) throw new Error('Upload Failed');
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;
      updateNested(path, publicUrl);
    } catch (err) { alert(`Upload Failed.`); } finally { setIsUploading(null); }
  };

  const ControlField = ({ label, path, type = "text" }: { label: string, path: string, type?: string }) => {
    const val = path.split('.').reduce((obj, key) => obj?.[key], localContent as any) || '';
    return (
      <div className="space-y-1 flex-1 min-w-[200px]">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
        {type === "textarea" ? (
          <textarea className="w-full p-4 bg-gray-50 border rounded-xl font-medium text-sm min-h-[120px]" value={val} onChange={(e) => updateNested(path, e.target.value)} />
        ) : (
          <input className="w-full p-4 bg-gray-50 border rounded-xl font-bold text-sm" value={val} onChange={(e) => updateNested(path, e.target.value)} />
        )}
      </div>
    );
  };

  const ImageControl = ({ label, path }: { label: string, path: string }) => {
    const val = path.split('.').reduce((obj, key) => obj?.[key], localContent as any) || '';
    return (
      <div className="space-y-1 flex-1 min-w-[200px]">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
        <div className="flex gap-2">
          <input className="flex-1 p-4 bg-gray-50 border rounded-xl font-mono text-[10px]" value={val} onChange={(e) => updateNested(path, e.target.value)} />
          <label className="cursor-pointer bg-[#014737] text-white px-4 rounded-xl flex items-center justify-center"><i className={`fas ${isUploading === path ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i><input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, path)} /></label>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#014737] text-white p-6 h-screen sticky top-0 flex flex-col shadow-2xl z-30">
        <div className="mb-10 pb-6 border-b border-white/10 flex items-center gap-3">
          <JackfruitLogo light iconOnly iconSize="w-8 h-10" />
          <p className="font-black text-[10px] uppercase tracking-widest">Master Admin</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {(['hero', 'products', 'usage', 'recipes', 'evidence', 'blog', 'investment', 'faq', 'general'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#16c694] text-[#014737]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>{tab}</button>
          ))}
        </nav>
        <div className="pt-6 border-t border-white/10 space-y-4">
          <button onClick={() => setView('home')} className="w-full text-left px-5 py-2 text-white/40 text-[9px] font-black uppercase hover:text-white">Preview Site</button>
          <button onClick={logout} className="w-full text-left px-5 py-2 text-red-400 text-[9px] font-black uppercase hover:text-red-300">Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-10 bg-white overflow-y-auto h-screen relative">
        <header className="flex justify-between items-center mb-10 sticky top-0 bg-white py-4 z-20 border-b border-gray-100">
          <h1 className="text-4xl font-black uppercase tracking-tighter">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              {['id', 'en'].map(l => <button key={l} onClick={() => setEditLocale(l as any)} className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase ${editLocale === l ? 'bg-white shadow text-black' : 'text-gray-400'}`}>{l}</button>)}
            </div>
            <button onClick={save} disabled={isSaving} className="bg-[#16c694] text-[#014737] px-8 py-2 rounded-lg font-black text-[10px] uppercase hover:bg-[#014737] hover:text-white transition-all shadow-lg">{isSaving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </header>

        <div className="max-w-5xl space-y-12 pb-32">
          {activeTab === 'hero' && (
            <div className="grid grid-cols-2 gap-8">
              <ControlField label="Badge Text" path="translations.hero.badge" />
              <ControlField label="Main Title" path="translations.hero.titleMain" />
              <ControlField label="Description" path="translations.hero.description" type="textarea" />
              <ImageControl label="Hero Image" path="translations.hero.heroImage" />
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-8">
              {localContent.variants.map((v, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-3xl grid grid-cols-2 gap-6 border border-gray-100 relative group">
                   <button onClick={() => removeItem('variants', i)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"><i className="fas fa-trash"></i></button>
                   <ControlField label="Variant Name" path={`variants.${i}.name`} />
                   <ControlField label="Price" path={`variants.${i}.price`} />
                   <ControlField label="Weight" path={`variants.${i}.weight`} />
                   <ControlField label="Duration" path={`variants.${i}.duration`} />
                   <ControlField label="WA Link" path={`variants.${i}.linkWA`} />
                   <ControlField label="Shopee Link" path={`variants.${i}.linkShopee`} />
                </div>
              ))}
              <button onClick={() => addItem('variants', { name: 'New Variant', price: '0', weight: '300g', duration: '10 Days' })} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-black uppercase text-[10px] hover:border-[#16c694] hover:text-[#16c694] transition-all">+ Add Product Variant</button>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <ControlField label="Heading" path="translations.usage.heading" />
                <ControlField label="Intro Text" path="translations.usage.description" />
              </div>
              <div className="grid grid-cols-3 gap-8">
                <ControlField label="Step 1 Title" path="translations.usage.riceTitle" />
                <ControlField label="Step 1 Desc" path="translations.usage.riceDesc" />
                <ControlField label="Step 2 Title" path="translations.usage.flourTitle" />
                <ControlField label="Step 2 Desc" path="translations.usage.flourDesc" />
                <ControlField label="Step 3 Title" path="translations.usage.cookTitle" />
                <ControlField label="Step 3 Desc" path="translations.usage.cookDesc" />
              </div>
              <ImageControl label="Illustration Image" path="translations.usage.usageImage" />
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-8">
              {localContent.recipes.map((recipe, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6 shadow-sm relative group">
                  <button onClick={() => removeItem('recipes', i)} className="absolute top-4 right-4 w-10 h-10 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><i className="fas fa-trash"></i></button>
                  <div className="grid grid-cols-2 gap-6">
                    <ControlField label="Recipe Name" path={`recipes.${i}.name`} />
                    <ControlField label="How to Add" path={`recipes.${i}.howToAdd`} />
                  </div>
                  <ControlField label="Short Description" path={`recipes.${i}.description`} type="textarea" />
                  <ImageControl label="Recipe Image" path={`recipes.${i}.image`} />
                </div>
              ))}
              <button onClick={() => addItem('recipes', { name: 'New Recipe', description: '', howToAdd: '', image: '' })} className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[2.5rem] text-gray-400 font-black uppercase text-[10px] hover:border-[#16c694] hover:text-[#16c694] transition-all">+ Add New Recipe</button>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-12">
              <div className="grid grid-cols-2 gap-8">
                <ControlField label="Main Quote" path="translations.evidence.quote" type="textarea" />
                <ControlField label="Page Title" path="translations.evidence.pageTitle" />
                <ControlField label="Page Subtitle" path="translations.evidence.pageSubtitle" type="textarea" />
                <ControlField label="Analysis Title" path="translations.evidence.analysisTitle" />
                <ControlField label="Analysis Description" path="translations.evidence.analysisDesc" type="textarea" />
              </div>
              
              <div className="pt-8 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Journal Articles & External Study Links</h3>
                </div>
                <div className="space-y-6">
                  {localContent.articles.map((article, i) => (
                    <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4 relative group">
                      <button onClick={() => removeItem('articles', i)} className="absolute top-4 right-4 w-8 h-8 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><i className="fas fa-trash text-[10px]"></i></button>
                      <ControlField label="Study Title" path={`articles.${i}.title`} />
                      <div className="grid grid-cols-3 gap-4">
                        <ControlField label="Journal Name" path={`articles.${i}.journal`} />
                        <ControlField label="Year" path={`articles.${i}.year`} />
                        <ControlField label="Redirect Link (FULL URL)" path={`articles.${i}.link`} />
                      </div>
                      <ControlField label="Summary / Findings" path={`articles.${i}.summary`} type="textarea" />
                    </div>
                  ))}
                  <button onClick={() => addItem('articles', { title: 'New Study', journal: '', year: '2024', summary: '', link: '', tags: ['Research'] })} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 font-black uppercase text-[10px] hover:border-[#16c694] hover:text-[#16c694]">+ Add Journal Article</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-12">
               {localContent.blogPosts.map((post, i) => (
                 <div key={i} className="p-10 bg-gray-50 rounded-[3rem] space-y-6 border border-gray-100 shadow-sm relative group">
                    <button onClick={() => removeItem('blogPosts', i)} className="absolute top-6 right-6 w-12 h-12 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><i className="fas fa-trash"></i></button>
                    <div className="grid grid-cols-2 gap-6">
                      <ControlField label="Post ID (Slug)" path={`blogPosts.${i}.id`} />
                      <ControlField label="Title" path={`blogPosts.${i}.title`} />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <ControlField label="Author" path={`blogPosts.${i}.author`} />
                      <ControlField label="Category" path={`blogPosts.${i}.category`} />
                      <ControlField label="Date" path={`blogPosts.${i}.date`} />
                    </div>
                    <ControlField label="Excerpt" path={`blogPosts.${i}.excerpt`} type="textarea" />
                    <ControlField label="Full Content (Markdown)" path={`blogPosts.${i}.content`} type="textarea" />
                    <ImageControl label="Feature Image" path={`blogPosts.${i}.image`} />
                 </div>
               ))}
               <button onClick={() => addItem('blogPosts', { id: `post-${Date.now()}`, title: 'New Article', date: new Date().toISOString().split('T')[0], author: 'TeWELL Admin', category: 'Education', excerpt: '', content: '', image: '' })} className="w-full py-8 border-2 border-dashed border-gray-200 rounded-[3rem] text-gray-400 font-black uppercase text-[10px] hover:border-[#16c694] hover:text-[#16c694] transition-all">+ Write New Blog Post</button>
            </div>
          )}

          {activeTab === 'investment' && (
            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <ControlField label="Pitch Heading" path="investment.heading" />
                <ControlField label="Subheading" path="investment.subheading" type="textarea" />
              </div>
              <ControlField label="Main Pitch Body" path="investment.pitchText" type="textarea" />
              
              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Market Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  {localContent.investment.marketStats.map((stat, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl relative group">
                      <button onClick={() => removeItem('investment.marketStats', i)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px]"><i className="fas fa-times"></i></button>
                      <ControlField label="Label" path={`investment.marketStats.${i}.label`} />
                      <ControlField label="Value" path={`investment.marketStats.${i}.value`} />
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem('investment.marketStats', { label: 'Metric', value: '0' })} className="w-full mt-4 py-3 border border-dashed border-gray-200 rounded-xl text-gray-400 font-black uppercase text-[8px] hover:border-[#16c694] hover:text-[#16c694]">+ Add Statistic</button>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Growth Strategy Items</h3>
                <div className="space-y-4">
                  {localContent.investment.growthItems.map((item, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl space-y-4 relative group">
                      <button onClick={() => removeItem('investment.growthItems', i)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100"><i className="fas fa-trash"></i></button>
                      <ControlField label="Title" path={`investment.growthItems.${i}.title`} />
                      <ControlField label="Description" path={`investment.growthItems.${i}.desc`} type="textarea" />
                    </div>
                  ))}
                  <button onClick={() => addItem('investment.growthItems', { title: 'New Goal', desc: '' })} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-black uppercase text-[10px] hover:border-[#16c694] hover:text-[#16c694]">+ Add Growth Goal</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-8">
              {localContent.faqs.map((faq, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4 relative group">
                   <button onClick={() => removeItem('faqs', i)} className="absolute top-4 right-4 text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><i className="fas fa-trash"></i></button>
                   <ControlField label={`Question ${i+1}`} path={`faqs.${i}.question`} />
                   <ControlField label="Answer" path={`faqs.${i}.answer`} type="textarea" />
                </div>
              ))}
              <button onClick={() => addItem('faqs', { question: 'New Question?', answer: '' })} className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 font-black uppercase text-[10px] hover:border-[#16c694] hover:text-[#16c694]">+ Add FAQ Item</button>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="grid grid-cols-2 gap-8">
               <ControlField label="Brand Tagline" path="translations.common.brandTagline" />
               <ControlField label="Order Button Text" path="translations.common.orderNow" />
               <ControlField label="Footer Mission" path="translations.footer.mission" type="textarea" />
               <ControlField label="Footer Disclaimer" path="translations.footer.disclaimer" type="textarea" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
