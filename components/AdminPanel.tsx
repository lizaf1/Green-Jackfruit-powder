
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

  const handleHardReset = async () => {
    if (!confirm("This will wipe cloud data for this language and replace it with clean defaults from code. Continue?")) return;
    setIsSaving(true);
    const clean = getDefaultContent(editLocale);
    await updateContent(clean, editLocale);
    setIsSaving(false);
    alert("Hard Reset Done.");
    window.location.reload();
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
          <textarea className="w-full p-4 bg-gray-50 border rounded-xl font-medium text-sm min-h-[100px]" value={val} onChange={(e) => updateNested(path, e.target.value)} />
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
      <aside className="w-64 bg-[#014737] text-white p-6 h-screen sticky top-0 flex flex-col shadow-2xl">
        <div className="mb-10 pb-6 border-b border-white/10 flex items-center gap-3">
          <JackfruitLogo light iconOnly iconSize="w-8 h-10" />
          <p className="font-black text-[10px] uppercase tracking-widest">Admin v7</p>
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

      <main className="flex-1 p-10 bg-white">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              {['id', 'en'].map(l => <button key={l} onClick={() => setEditLocale(l as any)} className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase ${editLocale === l ? 'bg-white shadow text-black' : 'text-gray-400'}`}>{l}</button>)}
            </div>
            <button onClick={handleHardReset} className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-[9px] font-black uppercase hover:bg-red-50">Hard Reset</button>
            <button onClick={save} disabled={isSaving} className="bg-[#16c694] text-[#014737] px-8 py-2 rounded-lg font-black text-[10px] uppercase hover:bg-[#014737] hover:text-white transition-all">{isSaving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </header>

        <div className="space-y-10">
          {activeTab === 'hero' && (
            <div className="grid grid-cols-2 gap-8">
              <ControlField label="Main Title" path="translations.hero.titleMain" />
              <ControlField label="Badge Text" path="translations.hero.badge" />
              <ControlField label="Description" path="translations.hero.description" type="textarea" />
              <ImageControl label="Hero Image" path="translations.hero.heroImage" />
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <ControlField label="Heading" path="translations.usage.heading" />
                <ControlField label="Description" path="translations.usage.description" />
              </div>
              <div className="grid grid-cols-3 gap-8">
                <ControlField label="Rice Step Title" path="translations.usage.riceTitle" />
                <ControlField label="Flour Step Title" path="translations.usage.flourTitle" />
                <ControlField label="Cook Step Title" path="translations.usage.cookTitle" />
                <ControlField label="Rice Step Desc" path="translations.usage.riceDesc" />
                <ControlField label="Flour Step Desc" path="translations.usage.flourDesc" />
                <ControlField label="Cook Step Desc" path="translations.usage.cookDesc" />
              </div>
              <ImageControl label="Usage Image" path="translations.usage.usageImage" />
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-8">
              {localContent.recipes.map((r, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-3xl grid grid-cols-2 gap-6">
                  <ControlField label={`Recipe ${i+1} Name`} path={`recipes.${i}.name`} />
                  <ControlField label="How to Add" path={`recipes.${i}.howToAdd`} />
                  <ControlField label="Description" path={`recipes.${i}.description`} type="textarea" />
                  <ImageControl label="Image" path={`recipes.${i}.image`} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="grid grid-cols-2 gap-8">
              <ControlField label="Quote" path="translations.evidence.quote" type="textarea" />
              <ControlField label="Analysis Title" path="translations.evidence.analysisTitle" />
              <ControlField label="Analysis Desc" path="translations.evidence.analysisDesc" type="textarea" />
              <ControlField label="HbA1c Drop Label" path="translations.evidence.labels.hba1c" />
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              {localContent.faqs.map((f, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-2xl space-y-4">
                   <ControlField label={`Question ${i+1}`} path={`faqs.${i}.question`} />
                   <ControlField label="Answer" path={`faqs.${i}.answer`} type="textarea" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'investment' && (
            <div className="space-y-8">
              <ControlField label="Pitch Heading" path="investment.heading" />
              <ControlField label="Pitch Text" path="investment.pitchText" type="textarea" />
              <div className="grid grid-cols-2 gap-4">
                {localContent.investment.marketStats.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <ControlField label="Stat Label" path={`investment.marketStats.${i}.label`} />
                    <ControlField label="Stat Value" path={`investment.marketStats.${i}.value`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
