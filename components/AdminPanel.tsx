
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, resetToDefaults } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'order' | 'evidence' | 'recipes' | 'faq' | 'studies' | 'blog' | 'investment'>('general');

  // Sync state when locale being edited changes
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black">A</div>
          <span className="font-bold text-lg tracking-tight">Admin Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'general', icon: 'fa-cog', label: 'General & Footer' },
            { id: 'hero', icon: 'fa-star', label: 'Hero Section' },
            { id: 'order', icon: 'fa-shopping-cart', label: 'Order Management' },
            { id: 'evidence', icon: 'fa-microscope', label: 'Evidence Text' },
            { id: 'studies', icon: 'fa-chart-bar', label: 'Study Data' },
            { id: 'blog', icon: 'fa-newspaper', label: 'Blog Posts' },
            { id: 'recipes', icon: 'fa-utensils', label: 'Recipes' },
            { id: 'faq', icon: 'fa-question-circle', label: 'FAQ' },
            { id: 'investment', icon: 'fa-hand-holding-usd', label: 'Investment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === tab.id ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <i className={`fas ${tab.icon} w-5 text-center`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <button onClick={() => setView('home')} className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <i className="fas fa-eye"></i> View Website
          </button>
          <button onClick={resetToDefaults} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 flex items-center gap-2">
            <i className="fas fa-undo"></i> Factory Reset
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
               <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab} Management</h1>
               <div className="bg-gray-200 p-1 rounded-lg flex text-xs font-bold">
                  <button onClick={() => switchEditLocale('id')} className={`px-4 py-1.5 rounded-md transition ${editLocale === 'id' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}>ID</button>
                  <button onClick={() => switchEditLocale('en')} className={`px-4 py-1.5 rounded-md transition ${editLocale === 'en' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}>EN</button>
               </div>
            </div>
            <p className="text-gray-500">Editing <span className="text-green-600 font-bold uppercase">{editLocale}</span> version of the website content.</p>
          </div>
          <button 
            onClick={save}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-green-200 hover:bg-green-700 transition-all flex items-center gap-2"
          >
            <i className="fas fa-save"></i> Save {editLocale.toUpperCase()} Changes
          </button>
        </header>

        <div className="max-w-4xl space-y-10">
          {activeTab === 'order' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
              <SectionTitle title="Order Section Copy" />
              <div className="grid grid-cols-2 gap-6">
                <Input label="Section Heading" value={localContent.translations.order.heading} onChange={(val) => updateNested('order.heading', val)} />
                <Input label="Section Subheading" value={localContent.translations.order.subheading} onChange={(val) => updateNested('order.subheading', val)} area />
              </div>
              
              <div className="flex justify-between items-center mb-4 mt-12">
                <SectionTitle title="Manage Product Variants" />
                <button onClick={() => addListItem('variants', { name: 'New Variant', weight: '300g', price: '0', currency: 'Rp', tag: '', popular: false, duration: '' })} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold">+ Add Variant</button>
              </div>
              <div className="grid gap-6">
                {localContent.variants.map((variant, idx) => (
                  <div key={idx} className={`p-8 rounded-3xl border-2 transition-all space-y-4 relative ${variant.popular ? 'border-green-500 bg-green-50/30' : 'border-gray-100 bg-gray-50/30'}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <Input label="Variant Name" value={variant.name} onChange={(val) => updateListItem('variants', idx, 'name', val)} />
                        <Input label="Weight/Size" value={variant.weight} onChange={(val) => updateListItem('variants', idx, 'weight', val)} />
                      </div>
                      <button onClick={() => removeListItem('variants', idx)} className="text-red-300 hover:text-red-600 p-2"><i className="fas fa-trash"></i></button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Input label="Price String" value={variant.price} onChange={(val) => updateListItem('variants', idx, 'price', val)} />
                      <Input label="Currency" value={variant.currency} onChange={(val) => updateListItem('variants', idx, 'currency', val)} />
                      <Input label="Badge Tag (e.g. Popular)" value={variant.tag} onChange={(val) => updateListItem('variants', idx, 'tag', val)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Duration Label (e.g. 10 Day Supply)" value={variant.duration} onChange={(val) => updateListItem('variants', idx, 'duration', val)} />
                      <div className="flex items-center gap-3 h-full pt-6">
                        <input 
                          type="checkbox" 
                          id={`pop-${idx}`}
                          checked={variant.popular} 
                          onChange={(e) => updateListItem('variants', idx, 'popular', e.target.checked)}
                          className="w-5 h-5 accent-green-600"
                        />
                        <label htmlFor={`pop-${idx}`} className="text-sm font-bold text-gray-700">Highlight as Popular (Large Card)</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SectionTitle title="Platform Labels & Links" />
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <Input label="WhatsApp Button Text" value={localContent.translations.order.buyWA} onChange={(val) => updateNested('order.buyWA', val)} />
                  <Input label="WhatsApp URL" value={localContent.translations.order.linkWA} onChange={(val) => updateNested('order.linkWA', val)} />
                </div>
                <div className="grid grid-cols-2 gap-6 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                  <Input label="Shopee Button Text" value={localContent.translations.order.buyShopee} onChange={(val) => updateNested('order.buyShopee', val)} />
                  <Input label="Shopee URL" value={localContent.translations.order.linkShopee} onChange={(val) => updateNested('order.linkShopee', val)} />
                </div>
                <div className="grid grid-cols-2 gap-6 p-6 bg-gray-100 rounded-2xl border border-gray-200">
                  <Input label="TikTok Button Text" value={localContent.translations.order.buyTikTok} onChange={(val) => updateNested('order.buyTikTok', val)} />
                  <Input label="TikTok URL" value={localContent.translations.order.linkTikTok} onChange={(val) => updateNested('order.linkTikTok', val)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'investment' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
              <SectionTitle title="Investment Pitch" />
              <Input label="Page Title" value={localContent.investment.heading} onChange={(val) => updateInvestment('heading', val)} />
              <Input label="Subheading" value={localContent.investment.subheading} onChange={(val) => updateInvestment('subheading', val)} area />
              
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Market Stats</label>
                {localContent.investment.marketStats.map((stat, i) => (
                  <div key={i} className="flex gap-4">
                    <input className="flex-1 px-4 py-2 bg-gray-50 border rounded-lg" value={stat.label} onChange={(e) => {
                      const newStats = [...localContent.investment.marketStats];
                      newStats[i].label = e.target.value;
                      updateInvestment('marketStats', newStats);
                    }} placeholder="Label" />
                    <input className="w-32 px-4 py-2 bg-gray-50 border rounded-lg" value={stat.value} onChange={(e) => {
                      const newStats = [...localContent.investment.marketStats];
                      newStats[i].value = e.target.value;
                      updateInvestment('marketStats', newStats);
                    }} placeholder="Value" />
                  </div>
                ))}
              </div>

              <Input label="Pitch Body Text" value={localContent.investment.pitchText} onChange={(val) => updateInvestment('pitchText', val)} area />
              <Input label="Growth Section Title" value={localContent.investment.growthTitle} onChange={(val) => updateInvestment('growthTitle', val)} />
              <Input label="CTA Button Text" value={localContent.investment.ctaText} onChange={(val) => updateInvestment('ctaText', val)} />
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <SectionTitle title="Footer & Mission" />
              <Input label="Brand Mission" value={localContent.translations.footer.mission} onChange={(val) => updateNested('footer.mission', val)} area />
              <Input label="Disclaimer" value={localContent.translations.footer.disclaimer} onChange={(val) => updateNested('footer.disclaimer', val)} area />
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <SectionTitle title="Manage Articles" />
                <button onClick={() => addListItem('blogPosts', { id: Date.now().toString(), title: 'New Article', author: 'Staff', date: new Date().toLocaleDateString(), category: 'General', excerpt: '', content: '', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b' })} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold">+ New Post</button>
              </div>
              <div className="grid gap-6">
                {localContent.blogPosts.map((post, idx) => (
                  <div key={post.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6 relative group">
                    <button onClick={() => removeListItem('blogPosts', idx)} className="absolute top-8 right-8 text-red-300 hover:text-red-600 transition-colors"><i className="fas fa-trash"></i></button>
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="Title" value={post.title} onChange={(val) => updateListItem('blogPosts', idx, 'title', val)} />
                      <Input label="Cover Image URL" value={post.image} onChange={(val) => updateListItem('blogPosts', idx, 'image', val)} />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <Input label="Author" value={post.author} onChange={(val) => updateListItem('blogPosts', idx, 'author', val)} />
                      <Input label="Category" value={post.category} onChange={(val) => updateListItem('blogPosts', idx, 'category', val)} />
                      <Input label="Date" value={post.date} onChange={(val) => updateListItem('blogPosts', idx, 'date', val)} />
                    </div>
                    <Input label="Short Excerpt" value={post.excerpt} onChange={(val) => updateListItem('blogPosts', idx, 'excerpt', val)} area />
                    <Input label="Full Content" value={post.content} onChange={(val) => updateListItem('blogPosts', idx, 'content', val)} area />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <SectionTitle title="Hero Main Content" />
              <Input label="Badge Text" value={localContent.translations.hero.badge} onChange={(val) => updateNested('hero.badge', val)} />
              <Input label="Title Main" value={localContent.translations.hero.titleMain} onChange={(val) => updateNested('hero.titleMain', val)} />
              <Input label="Hero Description" value={localContent.translations.hero.description} onChange={(val) => updateNested('hero.description', val)} area />
              <Input label="Hero Image URL" value={localContent.translations.hero.heroImage} onChange={(val) => updateNested('hero.heroImage', val)} />
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-8">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <SectionTitle title="Evidence Text" />
                <Input label="Heading" value={localContent.translations.evidence.heading} onChange={(val) => updateNested('evidence.heading', val)} />
                <Input label="Quote" value={localContent.translations.evidence.quote} onChange={(val) => updateNested('evidence.quote', val)} area />
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <SectionTitle title="Research Articles" />
                  <button onClick={() => addListItem('articles', { title: 'New Study', journal: 'Journal Name', year: '2024', summary: '', tags: [] })} className="text-green-600 font-bold text-sm">+ Add Article</button>
                </div>
                {localContent.articles.map((article, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-2xl relative">
                    <button onClick={() => removeListItem('articles', idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Title" value={article.title} onChange={(val) => updateListItem('articles', idx, 'title', val)} />
                      <Input label="Journal" value={article.journal} onChange={(val) => updateListItem('articles', idx, 'journal', val)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'studies' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <SectionTitle title="Bar Chart Data" />
              {localContent.studyData.map((data, idx) => (
                <div key={idx} className="flex gap-4 items-end bg-gray-50 p-4 rounded-xl">
                  <Input label="Label" value={data.category} onChange={(val) => updateListItem('studyData', idx, 'category', val)} />
                  <Input label="Baseline" value={data.before.toString()} onChange={(val) => updateListItem('studyData', idx, 'before', parseFloat(val))} type="number" />
                  <Input label="Result" value={data.after.toString()} onChange={(val) => updateListItem('studyData', idx, 'after', parseFloat(val))} type="number" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <SectionTitle title="Manage Recipes" />
                <button onClick={() => addListItem('recipes', { name: 'New Recipe', description: 'Description', howToAdd: 'Instructions', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b' })} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm">+ New Recipe</button>
              </div>
              <div className="grid gap-6">
                {localContent.recipes.map((recipe, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <Input label="Recipe Name" value={recipe.name} onChange={(val) => updateListItem('recipes', idx, 'name', val)} />
                        <Input label="Image URL" value={recipe.image} onChange={(val) => updateListItem('recipes', idx, 'image', val)} />
                      </div>
                      <button onClick={() => removeListItem('recipes', idx)} className="ml-4 text-red-500 p-2"><i className="fas fa-trash"></i></button>
                    </div>
                    <Input label="Short Description" value={recipe.description} onChange={(val) => updateListItem('recipes', idx, 'description', val)} area />
                    <Input label="How to add TeWELL+" value={recipe.howToAdd} onChange={(val) => updateListItem('recipes', idx, 'howToAdd', val)} area />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <SectionTitle title="FAQ Items" />
                <button onClick={() => addListItem('faqs', { question: 'New Question', answer: 'New Answer' })} className="text-green-600 font-bold">+ Add FAQ</button>
              </div>
              {localContent.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2 pb-6 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input 
                        className="w-full font-bold text-gray-800 bg-transparent border-none focus:ring-0 px-0"
                        value={faq.question}
                        onChange={(e) => updateListItem('faqs', idx, 'question', e.target.value)}
                      />
                    </div>
                    <button onClick={() => removeListItem('faqs', idx)} className="text-red-300 hover:text-red-500"><i className="fas fa-times-circle"></i></button>
                  </div>
                  <textarea 
                    className="w-full text-gray-600 bg-transparent border-none focus:ring-0 p-0 text-sm resize-none"
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => updateListItem('faqs', idx, 'answer', e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-lg font-bold text-gray-800 tracking-tight flex items-center gap-2">
    <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
    {title}
  </h3>
);

const Input = ({ label, value, onChange, area = false, type = "text" }: { label: string, value: string, onChange: (val: string) => void, area?: boolean, type?: string }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>
    {area ? (
      <textarea 
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none min-h-[100px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input 
        type={type}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

export default AdminPanel;
