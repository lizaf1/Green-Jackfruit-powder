
import React, { useState, useRef, ChangeEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';
import JackfruitLogo from './JackfruitLogo';

const AdminSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
      <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
      {title}
    </h3>
    {children}
  </div>
);

const Input = ({ label, value, onChange, area = false, disabled = false, type = "text" }: { label: string, value: string | number, onChange?: (val: string) => void, area?: boolean, disabled?: boolean, type?: string }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    {area ? (
      <textarea 
        className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500/50 transition-all outline-none min-h-[100px] text-sm text-slate-700 font-medium"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
    ) : (
      <input 
        type={type}
        className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500/50 transition-all outline-none text-sm text-slate-700 font-bold"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
    )}
  </div>
);

const ImageInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center transition-all hover:border-green-500 hover:bg-green-50/20"
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black uppercase tracking-widest">
              Replace Image
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <i className="fas fa-cloud-upload-alt text-3xl text-slate-300 mb-2"></i>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to Upload</p>
          </div>
        )}
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
  <div className="flex items-center gap-4 py-2">
    <button 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-all relative ${checked ? 'bg-green-600' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-7' : 'left-1'}`}></div>
    </button>
    <span className="text-sm font-bold text-slate-700">{label}</span>
  </div>
);

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, resetToDefaults } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'order' | 'usage' | 'evidence' | 'recipes' | 'faq' | 'blog' | 'investment'>('general');

  const switchEditLocale = (l: Locale) => {
    setEditLocale(l);
    setLocalContent(cmsData[l]);
  };

  const save = () => {
    updateContent(localContent, editLocale);
    alert(`Settings saved successfully for ${editLocale.toUpperCase()}!`);
  };

  const updateNested = (path: string, value: any) => {
    const newData = { ...localContent };
    const keys = path.split('.');
    let current: any = newData.translations;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalContent(newData);
  };

  const updateInvestment = (path: string, value: any) => {
    const newData = { ...localContent };
    const keys = path.split('.');
    let current: any = newData.investment;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalContent(newData);
  };

  const addListItem = (listName: keyof AppContentData, defaultItem: any) => {
    const newData = { ...localContent };
    (newData[listName] as any[]).unshift(defaultItem);
    setLocalContent(newData);
  };

  const removeListItem = (listName: keyof AppContentData, index: number) => {
    const newData = { ...localContent };
    (newData[listName] as any[]).splice(index, 1);
    setLocalContent(newData);
  };

  const updateListItem = (listName: keyof AppContentData, index: number, field: string, value: any) => {
    const newData = { ...localContent };
    (newData[listName] as any[])[index][field] = value;
    setLocalContent(newData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-black text-slate-900 shadow-lg shadow-green-500/20">A</div>
          <span className="font-bold text-xl tracking-tighter">TeWELL Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {[
            { id: 'general', icon: 'fa-cog', label: 'Settings' },
            { id: 'hero', icon: 'fa-star', label: 'Hero' },
            { id: 'order', icon: 'fa-shopping-cart', label: 'Products' },
            { id: 'usage', icon: 'fa-info-circle', label: 'Usage' },
            { id: 'evidence', icon: 'fa-microscope', label: 'Science' },
            { id: 'recipes', icon: 'fa-utensils', label: 'Recipes' },
            { id: 'blog', icon: 'fa-newspaper', label: 'Blog' },
            { id: 'faq', icon: 'fa-question-circle', label: 'FAQ' },
            { id: 'investment', icon: 'fa-hand-holding-usd', label: 'Investment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-xs ${
                activeTab === tab.id ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fas ${tab.icon} w-5 text-center`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800 space-y-3">
          <button onClick={() => setView('home')} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-3 transition">
            <i className="fas fa-eye"></i> View Site
          </button>
          <button onClick={resetToDefaults} className="w-full text-left px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-3 transition">
            <i className="fas fa-undo"></i> Factory Reset
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter capitalize">{activeTab}</h1>
               <div className="bg-slate-200 p-1 rounded-lg flex text-[9px] font-black uppercase tracking-widest">
                  <button onClick={() => switchEditLocale('id')} className={`px-4 py-1.5 rounded-md transition ${editLocale === 'id' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500'}`}>ID</button>
                  <button onClick={() => switchEditLocale('en')} className={`px-4 py-1.5 rounded-md transition ${editLocale === 'en' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500'}`}>EN</button>
               </div>
            </div>
            <p className="text-slate-400 font-medium text-sm">Editing <span className="text-green-600 font-bold">{editLocale.toUpperCase()}</span> version</p>
          </div>
          <button onClick={save} className="bg-green-600 text-white px-8 py-3.5 rounded-xl font-black shadow-xl shadow-green-100 hover:bg-green-700 transition-all flex items-center gap-2">
            <i className="fas fa-save"></i> SAVE CHANGES
          </button>
        </header>

        <div className="max-w-4xl space-y-10">
          {activeTab === 'general' && (
            <>
              <AdminSection title="Common Labels">
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Order Now" value={localContent.translations.common.orderNow} onChange={(val) => updateNested('common.orderNow', val)} />
                  <Input label="Read Blog" value={localContent.translations.common.readBlog} onChange={(val) => updateNested('common.readBlog', val)} />
                  <Input label="View Data" value={localContent.translations.common.viewData} onChange={(val) => updateNested('common.viewData', val)} />
                  <Input label="Rights Text" value={localContent.translations.common.rights} onChange={(val) => updateNested('common.rights', val)} />
                </div>
              </AdminSection>

              <AdminSection title="Footer Config">
                <Input label="Mission Statement" value={localContent.translations.footer.mission} onChange={(val) => updateNested('footer.mission', val)} area />
                <Input label="Medical Disclaimer" value={localContent.translations.footer.disclaimer} onChange={(val) => updateNested('footer.disclaimer', val)} area />
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Contact Email" value="hello@tewellplus.com" disabled />
                  <Input label="Opening Hours" value={localContent.translations.footer.hours} onChange={(val) => updateNested('footer.hours', val)} />
                </div>
              </AdminSection>
            </>
          )}

          {activeTab === 'hero' && (
            <AdminSection title="Hero Management">
              <Input label="Clinical Badge" value={localContent.translations.hero.badge} onChange={(val) => updateNested('hero.badge', val)} />
              <Input label="Headline" value={localContent.translations.hero.titleMain} onChange={(val) => updateNested('hero.titleMain', val)} />
              <Input label="Sub-headline" value={localContent.translations.hero.description} onChange={(val) => updateNested('hero.description', val)} area />
              <ImageInput 
                label="Hero Background" 
                value={localContent.translations.hero.heroImage} 
                onChange={(val) => updateNested('hero.heroImage', val)} 
              />
            </AdminSection>
          )}

          {activeTab === 'usage' && (
            <AdminSection title="Usage Steps">
              <Input label="Usage Section Heading" value={localContent.translations.usage.heading} onChange={(val) => updateNested('usage.heading', val)} />
              <Input label="Usage Section Description" value={localContent.translations.usage.description} onChange={(val) => updateNested('usage.description', val)} area />
              <ImageInput label="Usage Illustration Image" value={localContent.translations.usage.usageImage} onChange={(val) => updateNested('usage.usageImage', val)} />
              <div className="space-y-6 pt-4 border-t">
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <h4 className="font-bold text-sm mb-4">Step 1: Rice Replacement</h4>
                  <Input label="Title" value={localContent.translations.usage.riceTitle} onChange={(val) => updateNested('usage.riceTitle', val)} />
                  <Input label="Description" value={localContent.translations.usage.riceDesc} onChange={(val) => updateNested('usage.riceDesc', val)} area />
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <h4 className="font-bold text-sm mb-4">Step 2: Flour Substitution</h4>
                  <Input label="Title" value={localContent.translations.usage.flourTitle} onChange={(val) => updateNested('usage.flourTitle', val)} />
                  <Input label="Description" value={localContent.translations.usage.flourDesc} onChange={(val) => updateNested('usage.flourDesc', val)} area />
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <h4 className="font-bold text-sm mb-4">Step 3: Equal Volume Rule</h4>
                  <Input label="Title" value={localContent.translations.usage.cookTitle} onChange={(val) => updateNested('usage.cookTitle', val)} />
                  <Input label="Description" value={localContent.translations.usage.cookDesc} onChange={(val) => updateNested('usage.cookDesc', val)} area />
                </div>
              </div>
            </AdminSection>
          )}

          {activeTab === 'evidence' && (
            <>
              <AdminSection title="Evidence Page Intro">
                <Input label="Page Title" value={localContent.translations.evidence.pageTitle} onChange={(val) => updateNested('evidence.pageTitle', val)} />
                <Input label="Page Subtitle" value={localContent.translations.evidence.pageSubtitle} onChange={(val) => updateNested('evidence.pageSubtitle', val)} area />
              </AdminSection>

              <AdminSection title="Clinical Quote">
                <Input label="Quote Text" value={localContent.translations.evidence.quote} onChange={(val) => updateNested('evidence.quote', val)} area />
              </AdminSection>

              <AdminSection title="Analysis Section">
                <Input label="Analysis Heading" value={localContent.translations.evidence.analysisTitle} onChange={(val) => updateNested('evidence.analysisTitle', val)} />
                <Input label="Analysis Content" value={localContent.translations.evidence.analysisDesc} onChange={(val) => updateNested('evidence.analysisDesc', val)} area />
              </AdminSection>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black">Published Articles</h3>
                  <button onClick={() => addListItem('articles', { title: 'New Study', journal: 'Nature', year: '2024', summary: '', link: '', tags: ['MNT'] })} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">+ Add Article</button>
                </div>
                {localContent.articles.map((a, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 relative">
                    <button onClick={() => removeListItem('articles', i)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash"></i></button>
                    <Input label="Title" value={a.title} onChange={(val) => updateListItem('articles', i, 'title', val)} />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Input label="Journal" value={a.journal} onChange={(val) => updateListItem('articles', i, 'journal', val)} />
                      <Input label="Year" value={a.year} onChange={(val) => updateListItem('articles', i, 'year', val)} />
                    </div>
                    <Input label="Summary" value={a.summary} onChange={(val) => updateListItem('articles', i, 'summary', val)} area />
                    <Input label="Redirect Link (e.g. Nature Journal)" value={a.link || ''} onChange={(val) => updateListItem('articles', i, 'link', val)} />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'investment' && (
            <>
              <AdminSection title="Pitch Intro">
                <Input label="Heading" value={localContent.investment.heading} onChange={(val) => updateInvestment('heading', val)} />
                <Input label="Subheading" value={localContent.investment.subheading} onChange={(val) => updateInvestment('subheading', val)} area />
                <Input label="Pitch Text" value={localContent.investment.pitchText} onChange={(val) => updateInvestment('pitchText', val)} area />
                <ImageInput label="Investment Market Graphic" value={localContent.investment.image} onChange={(val) => updateInvestment('image', val)} />
              </AdminSection>

              <AdminSection title="Growth Strategy Items">
                {localContent.investment.growthItems.map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl mb-4 relative">
                    <button onClick={() => {
                        const items = [...localContent.investment.growthItems];
                        items.splice(i, 1);
                        updateInvestment('growthItems', items);
                    }} className="absolute top-4 right-4 text-slate-300 hover:text-red-500"><i className="fas fa-times"></i></button>
                    <Input label={`Strategy ${i+1} Title`} value={item.title} onChange={(val) => {
                         const items = [...localContent.investment.growthItems];
                         items[i].title = val;
                         updateInvestment('growthItems', items);
                    }} />
                    <Input label={`Strategy ${i+1} Description`} value={item.desc} onChange={(val) => {
                         const items = [...localContent.investment.growthItems];
                         items[i].desc = val;
                         updateInvestment('growthItems', items);
                    }} area />
                  </div>
                ))}
                <button onClick={() => {
                    const items = [...localContent.investment.growthItems];
                    items.push({ title: 'New Strategy', desc: '' });
                    updateInvestment('growthItems', items);
                }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold">+ Add Growth Item</button>
              </AdminSection>

              <AdminSection title="Market Statistics">
                <div className="grid grid-cols-2 gap-4">
                  {localContent.investment.marketStats.map((stat, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl">
                      <Input label={`Label ${i+1}`} value={stat.label} onChange={(val) => {
                         const stats = [...localContent.investment.marketStats];
                         stats[i].label = val;
                         updateInvestment('marketStats', stats);
                      }} />
                      <Input label={`Value ${i+1}`} value={stat.value} onChange={(val) => {
                         const stats = [...localContent.investment.marketStats];
                         stats[i].value = val;
                         updateInvestment('marketStats', stats);
                      }} />
                    </div>
                  ))}
                </div>
              </AdminSection>
            </>
          )}

          {activeTab === 'order' && (
            <>
              <AdminSection title="Product Intro">
                <Input label="Heading" value={localContent.translations.order.heading} onChange={(val) => updateNested('order.heading', val)} />
                <Input label="Description" value={localContent.translations.order.subheading} onChange={(val) => updateNested('order.subheading', val)} area />
              </AdminSection>

              <AdminSection title="Clinical Benefits (Shown in Cards)">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Benefit 1" value={localContent.translations.order.benefitRaw} onChange={(val) => updateNested('order.benefitRaw', val)} />
                  <Input label="Benefit 2" value={localContent.translations.order.benefitProven} onChange={(val) => updateNested('order.benefitProven', val)} />
                  <Input label="Benefit 3" value={localContent.translations.order.benefitClean} onChange={(val) => updateNested('order.benefitClean', val)} />
                  <Input label="Benefit 4" value={localContent.translations.order.benefitCold} onChange={(val) => updateNested('order.benefitCold', val)} />
                </div>
              </AdminSection>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black">Product Variants</h3>
                  <button onClick={() => addListItem('variants', { name: 'New Variant', weight: '300g', price: '0', currency: 'Rp', tag: '', popular: false, duration: '' })} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">+ Add Variant</button>
                </div>
                {localContent.variants.map((v, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 relative group">
                    <button onClick={() => removeListItem('variants', i)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash"></i></button>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <Input label="Variant Name" value={v.name} onChange={(val) => updateListItem('variants', i, 'name', val)} />
                      <Input label="Weight/Size" value={v.weight} onChange={(val) => updateListItem('variants', i, 'weight', val)} />
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <Input label="Price" value={v.price} onChange={(val) => updateListItem('variants', i, 'price', val)} />
                      <Input label="Currency" value={v.currency} onChange={(val) => updateListItem('variants', i, 'currency', val)} />
                      <Input label="Supply Duration" value={v.duration} onChange={(val) => updateListItem('variants', i, 'duration', val)} />
                    </div>
                    <Toggle label="Featured (Recommended)" checked={v.popular} onChange={(val) => updateListItem('variants', i, 'popular', val)} />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">Recipe Cards</h3>
                <button onClick={() => addListItem('recipes', { name: 'New Recipe', description: '', howToAdd: '', image: '' })} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">+ Add Recipe</button>
              </div>
              {localContent.recipes.map((r, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 relative grid grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <ImageInput label="Recipe Photo" value={r.image} onChange={(val) => updateListItem('recipes', i, 'image', val)} />
                  </div>
                  <div className="col-span-2 space-y-4">
                    <button onClick={() => removeListItem('recipes', i)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash"></i></button>
                    <Input label="Recipe Name" value={r.name} onChange={(val) => updateListItem('recipes', i, 'name', val)} />
                    <Input label="Short Description" value={r.description} onChange={(val) => updateListItem('recipes', i, 'description', val)} area />
                    <Input label="Equal Volume Instructions" value={r.howToAdd} onChange={(val) => updateListItem('recipes', i, 'howToAdd', val)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">Article Management</h3>
                <button onClick={() => addListItem('blogPosts', { id: `post-${Date.now()}`, title: 'Untitled', author: 'Team', date: new Date().toISOString().split('T')[0], category: 'Health', excerpt: '', content: '', image: '' })} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">+ New Article</button>
              </div>
              {localContent.blogPosts.map((p, i) => (
                <div key={p.id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 relative space-y-8">
                  <button onClick={() => removeListItem('blogPosts', i)} className="absolute top-8 right-8 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash"></i></button>
                  <div className="grid grid-cols-2 gap-10">
                    <ImageInput label="Cover Image" value={p.image} onChange={(val) => updateListItem('blogPosts', i, 'image', val)} />
                    <div className="space-y-6">
                      <Input label="Headline" value={p.title} onChange={(val) => updateListItem('blogPosts', i, 'title', val)} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Category" value={p.category} onChange={(val) => updateListItem('blogPosts', i, 'category', val)} />
                        <Input label="Date" value={p.date} onChange={(val) => updateListItem('blogPosts', i, 'date', val)} />
                      </div>
                    </div>
                  </div>
                  <Input label="Short Excerpt" value={p.excerpt} onChange={(val) => updateListItem('blogPosts', i, 'excerpt', val)} area />
                  <Input label="Full Article Body" value={p.content} onChange={(val) => updateListItem('blogPosts', i, 'content', val)} area />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
             <AdminSection title="FAQ Questions">
                <div className="space-y-6">
                   {localContent.faqs.map((f, i) => (
                     <div key={i} className="p-6 bg-slate-50 rounded-2xl relative">
                        <button onClick={() => removeListItem('faqs', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500"><i className="fas fa-times"></i></button>
                        <Input label="Question" value={f.question} onChange={(val) => updateListItem('faqs', i, 'question', val)} />
                        <Input label="Answer" value={f.answer} onChange={(val) => updateListItem('faqs', i, 'answer', val)} area />
                     </div>
                   ))}
                   <button onClick={() => addListItem('faqs', { question: '', answer: '' })} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-green-500 hover:text-green-600 transition-all">+ Add FAQ Item</button>
                </div>
             </AdminSection>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
