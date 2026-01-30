
import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';
import JackfruitLogo from './JackfruitLogo';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, resetToDefaults } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'order' | 'evidence' | 'recipes' | 'faq' | 'blog' | 'investment' | 'assets'>('general');
  const logoRef = useRef<HTMLDivElement>(null);

  const switchEditLocale = (l: Locale) => {
    setEditLocale(l);
    setLocalContent(cmsData[l]);
  };

  const save = () => {
    updateContent(localContent, editLocale);
    alert(`Settings saved successfully for ${editLocale.toUpperCase()}!`);
  };

  const updateNested = (path: string, value: string) => {
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

  // Utility to export SVG to PNG
  const downloadLogoAsPNG = () => {
    if (!logoRef.current) return;
    const svg = logoRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Set high resolution for PNG (2048x2048)
    const size = 2048;
    canvas.width = size;
    canvas.height = size;

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'TeWELL_Plus_Logo_HQ.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-black text-slate-900 shadow-lg shadow-green-500/20">A</div>
          <span className="font-bold text-xl tracking-tighter">Admin</span>
        </div>
        <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
          {[
            { id: 'general', icon: 'fa-cog', label: 'General' },
            { id: 'hero', icon: 'fa-star', label: 'Hero' },
            { id: 'order', icon: 'fa-shopping-cart', label: 'Products' },
            { id: 'evidence', icon: 'fa-microscope', label: 'Science' },
            { id: 'blog', icon: 'fa-newspaper', label: 'Education' },
            { id: 'recipes', icon: 'fa-utensils', label: 'Recipes' },
            { id: 'faq', icon: 'fa-question-circle', label: 'FAQ' },
            { id: 'investment', icon: 'fa-hand-holding-usd', label: 'Investment' },
            { id: 'assets', icon: 'fa-images', label: 'Brand Assets' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                activeTab === tab.id ? 'bg-green-600 text-white shadow-xl shadow-green-900/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fas ${tab.icon} w-5 text-center`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800 space-y-3">
          <button onClick={() => setView('home')} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-3 transition">
            <i className="fas fa-eye"></i> Preview Site
          </button>
          <button onClick={resetToDefaults} className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-3 transition">
            <i className="fas fa-undo"></i> Reset Data
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 lg:p-20">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-6 mb-3">
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">{activeTab}</h1>
               {activeTab !== 'assets' && (
                 <div className="bg-slate-200 p-1 rounded-xl flex text-[10px] font-black uppercase tracking-widest shadow-inner">
                    <button onClick={() => switchEditLocale('id')} className={`px-5 py-2 rounded-lg transition ${editLocale === 'id' ? 'bg-white shadow-md text-green-600' : 'text-slate-500'}`}>Bahasa</button>
                    <button onClick={() => switchEditLocale('en')} className={`px-5 py-2 rounded-lg transition ${editLocale === 'en' ? 'bg-white shadow-md text-green-600' : 'text-slate-500'}`}>English</button>
                 </div>
               )}
            </div>
            <p className="text-slate-500 font-medium italic">Configure the <span className="text-green-600 uppercase font-black">{editLocale}</span> translation layer.</p>
          </div>
          {activeTab !== 'assets' && (
            <button 
              onClick={save}
              className="w-full md:w-auto bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-green-200 hover:bg-green-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <i className="fas fa-check-circle"></i> SAVE CHANGES
            </button>
          )}
        </header>

        <div className="max-w-4xl space-y-12">
          {activeTab === 'assets' && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-12">
              <div>
                <SectionTitle title="Export Identity Assets" />
                <p className="text-slate-500 mt-4 leading-relaxed">Download high-resolution PNG versions of your brand assets for use in social media, printing, and other external marketing materials.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Primary Logo Preview</h4>
                  <div className="bg-gray-50 border border-slate-100 p-12 rounded-[2rem] flex items-center justify-center aspect-square" ref={logoRef}>
                    <JackfruitLogo iconOnly iconSize="w-48 h-48" />
                  </div>
                  <button 
                    onClick={downloadLogoAsPNG}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-600 transition shadow-xl"
                  >
                    <i className="fas fa-download"></i> DOWNLOAD PNG (2048px)
                  </button>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Light Variant Preview</h4>
                  <div className="bg-green-900 border border-slate-100 p-12 rounded-[2rem] flex items-center justify-center aspect-square">
                    <JackfruitLogo light iconOnly iconSize="w-48 h-48" />
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Use on dark backgrounds</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
                <SectionTitle title="Footer & Mission" />
                <Input label="Brand Mission" value={localContent.translations.footer.mission} onChange={(val) => updateNested('footer.mission', val)} area />
                <Input label="Medical Disclaimer" value={localContent.translations.footer.disclaimer} onChange={(val) => updateNested('footer.disclaimer', val)} area />
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
                <SectionTitle title="Navigation Labels" />
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Home" value={localContent.translations.nav.home} onChange={(val) => updateNested('nav.home', val)} />
                  <Input label="Evidence" value={localContent.translations.nav.evidence} onChange={(val) => updateNested('nav.evidence', val)} />
                  <Input label="Education" value={localContent.translations.nav.blog} onChange={(val) => updateNested('nav.blog', val)} />
                  <Input label="Investment" value={localContent.translations.nav.investment} onChange={(val) => updateNested('nav.investment', val)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <SectionTitle title="Hero Content" />
              <Input label="Clinical Badge" value={localContent.translations.hero.badge} onChange={(val) => updateNested('hero.badge', val)} />
              <Input label="Main Headline" value={localContent.translations.hero.titleMain} onChange={(val) => updateNested('hero.titleMain', val)} />
              <Input label="Sub-headline" value={localContent.translations.hero.description} onChange={(val) => updateNested('hero.description', val)} area />
              <Input label="Hero Image URL" value={localContent.translations.hero.heroImage} onChange={(val) => updateNested('hero.heroImage', val)} />
            </div>
          )}

          {activeTab === 'order' && (
            <div className="space-y-10">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
                <SectionTitle title="Product Section Intro" />
                <Input label="Heading" value={localContent.translations.order.heading} onChange={(val) => updateNested('order.heading', val)} />
                <Input label="Description" value={localContent.translations.order.subheading} onChange={(val) => updateNested('order.subheading', val)} area />
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <SectionTitle title="Product Cards" />
                  <button onClick={() => addListItem('variants', { name: 'New Pack', weight: '300g', price: '0', currency: 'Rp', tag: '', popular: false, duration: '' })} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest">+ Add Variant</button>
                </div>
                {localContent.variants.map((variant, idx) => (
                  <div key={idx} className={`p-10 rounded-[2.5rem] border-2 transition-all space-y-6 relative ${variant.popular ? 'border-green-500 bg-green-50/20' : 'border-slate-100 bg-white'}`}>
                    <button onClick={() => removeListItem('variants', idx)} className="absolute top-8 right-8 text-slate-300 hover:text-red-500 p-2 transition"><i className="fas fa-trash"></i></button>
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="Name" value={variant.name} onChange={(val) => updateListItem('variants', idx, 'name', val)} />
                      <Input label="Weight" value={variant.weight} onChange={(val) => updateListItem('variants', idx, 'weight', val)} />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <Input label="Price" value={variant.price} onChange={(val) => updateListItem('variants', idx, 'price', val)} />
                      <Input label="Currency" value={variant.currency} onChange={(val) => updateListItem('variants', idx, 'currency', val)} />
                      <Input label="Duration" value={variant.duration} onChange={(val) => updateListItem('variants', idx, 'duration', val)} />
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="checkbox" id={`pop-${idx}`} checked={variant.popular} onChange={(e) => updateListItem('variants', idx, 'popular', e.target.checked)} className="w-6 h-6 accent-green-600 rounded-lg cursor-pointer" />
                      <label htmlFor={`pop-${idx}`} className="text-sm font-black text-slate-700 cursor-pointer">Featured as Recommended</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center">
                <SectionTitle title="Education Articles" />
                <button onClick={() => addListItem('blogPosts', { id: `blog-${Date.now()}`, title: 'New Article', author: 'Team', date: new Date().toISOString().split('T')[0], category: 'Education', excerpt: '', content: '', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b' })} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest">+ New Article</button>
              </div>
              {localContent.blogPosts.map((post, idx) => (
                <div key={post.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8 relative">
                  <button onClick={() => removeListItem('blogPosts', idx)} className="absolute top-10 right-10 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash"></i></button>
                  <div className="grid grid-cols-2 gap-6">
                    <Input label="Headline" value={post.title} onChange={(val) => updateListItem('blogPosts', idx, 'title', val)} />
                    <Input label="Image URL" value={post.image} onChange={(val) => updateListItem('blogPosts', idx, 'image', val)} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <Input label="Category" value={post.category} onChange={(val) => updateListItem('blogPosts', idx, 'category', val)} />
                    <Input label="Date" value={post.date} onChange={(val) => updateListItem('blogPosts', idx, 'date', val)} />
                  </div>
                  <Input label="Excerpt" value={post.excerpt} onChange={(val) => updateListItem('blogPosts', idx, 'excerpt', val)} area />
                  <Input label="Article Content" value={post.content} onChange={(val) => updateListItem('blogPosts', idx, 'content', val)} area />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <div className="flex justify-between items-center">
                <SectionTitle title="Questions & Answers" />
                <button onClick={() => addListItem('faqs', { question: 'New Question', answer: 'New Answer' })} className="text-green-600 font-black text-xs uppercase tracking-widest hover:text-green-700 transition">+ Add Item</button>
              </div>
              <div className="space-y-8">
                {localContent.faqs.map((faq, idx) => (
                  <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group">
                    <button onClick={() => removeListItem('faqs', idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border shadow-sm rounded-full text-slate-300 hover:text-red-500 transition flex items-center justify-center"><i className="fas fa-times"></i></button>
                    <Input label="Question" value={faq.question} onChange={(val) => updateListItem('faqs', idx, 'question', val)} />
                    <div className="mt-4">
                      <Input label="Answer" value={faq.answer} onChange={(val) => updateListItem('faqs', idx, 'answer', val)} area />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'investment' && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-10">
              <SectionTitle title="Pitch Deck Info" />
              <Input label="Hero Title" value={localContent.investment.heading} onChange={(val) => updateInvestment('heading', val)} />
              <Input label="Sub-heading" value={localContent.investment.subheading} onChange={(val) => updateInvestment('subheading', val)} area />
              <div className="grid grid-cols-2 gap-6">
                {localContent.investment.marketStats.map((stat, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <Input label={`Stat ${i+1} Label`} value={stat.label} onChange={(val) => {
                      const newStats = [...localContent.investment.marketStats];
                      newStats[i].label = val;
                      updateInvestment('marketStats', newStats);
                    }} />
                    <Input label="Value" value={stat.value} onChange={(val) => {
                      const newStats = [...localContent.investment.marketStats];
                      newStats[i].value = val;
                      updateInvestment('marketStats', newStats);
                    }} />
                  </div>
                ))}
              </div>
              <Input label="Pitch Body" value={localContent.investment.pitchText} onChange={(val) => updateInvestment('pitchText', val)} area />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
    <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
    {title}
  </h3>
);

const Input = ({ label, value, onChange, area = false, type = "text" }: { label: string, value: string, onChange: (val: string) => void, area?: boolean, type?: string }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    {area ? (
      <textarea 
        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500/50 transition-all outline-none min-h-[140px] text-slate-700 font-medium leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input 
        type={type}
        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500/50 transition-all outline-none text-slate-700 font-bold"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

export default AdminPanel;
