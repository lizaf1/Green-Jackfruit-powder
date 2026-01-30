
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppContentData, Locale } from '../types';
import JackfruitLogo from './JackfruitLogo';
import { getDefaultContent } from '../translations';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://uptstkvqkvequnlufxkl.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_1LVOeXolvYTDAUJiMHlfXA_uXDX0F7Y';
const BUCKET_NAME = 'assets';

type AdminTab = 'hero' | 'products' | 'usage' | 'recipes' | 'evidence' | 'blog' | 'investment' | 'faq' | 'general';

const AdminPanel: React.FC = () => {
  const { cmsData, updateContent, setView, isAuthenticated, login, logout, cloudStatus } = useLanguage();
  const [editLocale, setEditLocale] = useState<Locale>('id');
  const [localContent, setLocalContent] = useState<AppContentData>(cmsData[editLocale]);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPermissionsGuide, setShowPermissionsGuide] = useState(false);

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
            <input 
              type="password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#16c694]"
              placeholder="Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button className="w-full bg-[#014737] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-[#16c694] transition-all">
              Login to Command
            </button>
            <button type="button" onClick={() => setView('home')} className="w-full text-gray-400 text-[10px] font-black uppercase tracking-widest mt-4">
              Return Home
            </button>
          </form>
        </div>
      </div>
    );
  }

  const save = async () => {
    setIsSaving(true);
    const success = await updateContent(localContent, editLocale);
    setIsSaving(false);
    if (success) {
      alert('SUCCESS: Cloud Database Updated Globally.');
    } else {
      alert('WARNING: Cloud update failed. Check internet or Supabase project status.');
    }
  };

  const handleHardReset = async () => {
    if (!confirm("WARNING: This will wipe your current cloud content and replace it with the latest hardcoded defaults from the app code. Are you sure?")) return;
    
    setIsSaving(true);
    const defaultsID = getDefaultContent('id');
    const defaultsEN = getDefaultContent('en');
    
    // Update both locales to be safe
    await updateContent(defaultsID, 'id');
    await updateContent(defaultsEN, 'en');
    
    setIsSaving(false);
    alert("Hard Reset Successful. The app is now using the latest code-based text.");
    window.location.reload(); // Reload to sync state
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
    if (!file) return;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      alert("Config Error: Cloud keys missing.");
      return;
    }

    setIsUploading(path);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
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

      if (!response.ok) {
        const errData = await response.json();
        console.error("Supabase Upload Error:", errData);
        throw new Error(errData.message || 'Upload Failed');
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;
      updateNested(path, publicUrl);
    } catch (err: any) {
      console.error(err);
      alert(`UPLOAD FAILED: ${err.message}. This is usually a Permission (RLS) issue in Supabase.`);
      setShowPermissionsGuide(true);
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
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-[#16c694] min-h-[120px]"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
          />
        ) : (
          <input 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-[#16c694]"
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
            className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-xs outline-none"
            value={value}
            onChange={(e) => updateNested(path, e.target.value)}
          />
          <label className="cursor-pointer bg-[#014737] text-white px-5 rounded-xl flex items-center justify-center hover:bg-[#16c694] transition-all">
            <i className={`fas ${isUploading === path ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, path)} />
          </label>
        </div>
        {value && <img src={value} alt="Preview" className="mt-2 h-16 w-16 object-cover rounded-lg border" />}
      </div>
    );
  };

  const StatusBadge = () => {
    const colors = {
      connected: 'bg-green-400',
      error: 'bg-red-400',
      'local-only': 'bg-orange-400',
      initializing: 'bg-blue-400 animate-pulse'
    };
    const labels = {
      connected: 'Cloud Active',
      error: 'Sync Error',
      'local-only': 'Local Mode',
      initializing: 'Connecting...'
    };
    return (
      <div className="flex items-center gap-2 mt-2">
        <div className={`w-2 h-2 rounded-full ${colors[cloudStatus]}`}></div>
        <p className="text-[8px] font-bold uppercase tracking-widest text-white/70">{labels[cloudStatus]}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <aside className="w-72 bg-[#014737] text-white p-6 h-screen sticky top-0 flex flex-col shadow-2xl z-50">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
          <JackfruitLogo light iconOnly iconSize="w-10 h-14" />
          <div>
            <p className="font-black text-xs tracking-tighter uppercase">Master Admin</p>
            <StatusBadge />
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {(['hero', 'products', 'usage', 'recipes', 'evidence', 'blog', 'investment', 'faq', 'general'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-[#16c694] text-[#014737] shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`fas fa-${tab === 'products' ? 'shopping-bag' : tab === 'usage' ? 'hand-pointer' : tab === 'general' ? 'cog' : 'circle'} w-5`}></i> {tab}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <button onClick={() => setView('home')} className="w-full text-left px-6 py-2 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
            <i className="fas fa-eye mr-2"></i> Preview Site
          </button>
          <button onClick={logout} className="w-full text-left px-6 py-2 text-red-400 text-[10px] font-black uppercase tracking-widest hover:text-red-300 transition-all">
            <i className="fas fa-power-off mr-2"></i> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 lg:p-14 overflow-y-auto bg-gray-50">
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{activeTab}</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Configuring {editLocale.toUpperCase()} Market</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex p-1 bg-gray-200 rounded-xl">
              {(['id', 'en'] as const).map(l => (
                <button key={l} onClick={() => setEditLocale(l)} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${editLocale === l ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>{l}</button>
              ))}
            </div>
            
            <button 
              onClick={handleHardReset} 
              className="px-6 py-3 rounded-xl border-2 border-red-500 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              Hard Reset Defaults
            </button>

            <button 
              onClick={save} 
              disabled={isSaving}
              className="bg-[#16c694] text-[#014737] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#014737] hover:text-white transition-all shadow-xl disabled:opacity-50 min-w-[200px]"
            >
              {isSaving ? <i className="fas fa-spinner fa-spin"></i> : 'Push Changes'}
            </button>
          </div>
        </header>

        {showPermissionsGuide && (
          <div className="mb-10 p-8 bg-red-50 border-2 border-red-200 rounded-[2.5rem] relative overflow-hidden">
            <button onClick={() => setShowPermissionsGuide(false)} className="absolute top-6 right-6 text-red-400 hover:text-red-600"><i className="fas fa-times"></i></button>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-red-200 text-red-700 rounded-full flex items-center justify-center flex-shrink-0"><i className="fas fa-key"></i></div>
              <div className="flex-1">
                <h3 className="font-black text-red-900 uppercase text-sm tracking-tight mb-2">Fix Storage Permissions (RLS)</h3>
                <p className="text-red-700 text-xs font-medium mb-4 leading-relaxed">
                  Supabase blocks uploads by default. Run this code in your **Supabase SQL Editor** to enable image uploads to the <code>assets</code> bucket:
                </p>
                <pre className="bg-red-900 text-red-100 p-4 rounded-xl text-[10px] font-mono overflow-x-auto">
{`CREATE POLICY "Allow Public Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'assets');
CREATE POLICY "Allow Public View" ON storage.objects FOR SELECT USING (bucket_id = 'assets');`}
                </pre>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 min-h-[500px]">
           {activeTab === 'hero' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="space-y-8">
                  <ControlField label="Hero Title" path="translations.hero.titleMain" />
                  <ControlField label="Hero Description" path="translations.hero.description" type="textarea" />
               </div>
               <div className="space-y-8">
                  <ImageControl label="Hero Image" path="translations.hero.heroImage" />
                  <ControlField label="Green Badge" path="translations.hero.badge" />
               </div>
             </div>
           )}

           {activeTab === 'products' && (
             <div className="space-y-10">
                {localContent.variants.map((v, i) => (
                  <div key={i} className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 space-y-8">
                    <div className="flex justify-between items-center border-b pb-6">
                      <h4 className="font-black text-gray-400 text-[9px] uppercase tracking-widest">Variant {i+1}</h4>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-[10px] font-black uppercase">Featured</span>
                        <input type="checkbox" checked={v.popular} onChange={(e) => updateNested(`variants.${i}.popular`, e.target.checked)} className="w-5 h-5 accent-[#16c694]" />
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <ControlField label="Name" path={`variants.${i}.name`} />
                      <ControlField label="Price" path={`variants.${i}.price`} />
                      <ControlField label="Weight" path={`variants.${i}.weight`} />
                      <ControlField label="WhatsApp" path={`variants.${i}.linkWA`} />
                      <ControlField label="Shopee" path={`variants.${i}.linkShopee`} />
                      <ControlField label="TikTok" path={`variants.${i}.linkTikTok`} />
                    </div>
                  </div>
                ))}
             </div>
           )}

           {['usage', 'recipes', 'evidence', 'blog', 'investment', 'faq', 'general'].includes(activeTab) && (
             <div className="py-24 text-center">
                <i className="fas fa-magic text-4xl text-gray-200 mb-6"></i>
                <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Visual editor for {activeTab} coming soon.</p>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
