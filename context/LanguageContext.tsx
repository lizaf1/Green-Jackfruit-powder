
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { View, Locale, AppContentData, CMSData } from '../types';
import { getDefaultContent, MASTER_ADMIN_PASSWORD } from '../translations';

interface LanguageContextType {
  view: View;
  setView: (view: View) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
  cmsData: CMSData;
  updateContent: (newLocaleContent: AppContentData, l: Locale) => Promise<boolean>;
  resetToDefaults: () => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
  cloudStatus: 'connected' | 'error' | 'local-only' | 'initializing';
}

const STORAGE_KEY = 'tewell_plus_v7_cache';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://uptstkvqkvequnlufxkl.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_1LVOeXolvYTDAUJiMHlfXA_uXDX0F7Y';

const INITIAL_CMS_DATA: CMSData = {
  id: getDefaultContent('id'),
  en: getDefaultContent('en')
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * BRUTE FORCE SANITIZER
 * Explicitly kills the "Equal Volume" text if found in cloud data.
 */
const sanitizeCloudData = (data: CMSData): CMSData => {
  const cleanData = JSON.parse(JSON.stringify(data));
  const forbidden = ["equal volume", "1:1", "strategi", "volume replacement"];

  const checkSection = (locale: Locale) => {
    const usage = cleanData[locale]?.translations?.usage;
    if (!usage) return;
    
    // Check heading and description specifically
    const badText = JSON.stringify(usage).toLowerCase();
    const isInfected = forbidden.some(p => badText.includes(p.toLowerCase()));
    
    if (isInfected) {
      // OVERWRITE WITH CLEAN DEFAULTS
      cleanData[locale].translations.usage = getDefaultContent(locale).translations.usage;
      // Also check if any blog posts or recipes are infected
      if (cleanData[locale].recipes) {
        cleanData[locale].recipes = getDefaultContent(locale).recipes;
      }
    }
  };

  if (cleanData.id) checkSection('id');
  if (cleanData.en) checkSection('en');
  
  return cleanData;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<View>('home');
  const [locale, setLocale] = useState<Locale>('id');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cloudStatus, setCloudStatus] = useState<'connected' | 'error' | 'local-only' | 'initializing'>('initializing');
  const [cmsData, setCmsData] = useState<CMSData>(INITIAL_CMS_DATA);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        setCloudStatus('local-only');
        loadLocalFallback();
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/cms_data?id=eq.master`, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (response.ok) {
          const data = await response.json();
          let cloudContent = data[0]?.content;
          if (!cloudContent || Object.keys(cloudContent).length === 0) {
            await seedCloud(INITIAL_CMS_DATA);
            setCmsData(INITIAL_CMS_DATA);
          } else {
            setCmsData(sanitizeCloudData(cloudContent));
          }
          setCloudStatus('connected');
        } else {
          setCloudStatus('error');
          loadLocalFallback();
        }
      } catch (e) {
        setCloudStatus('error');
        loadLocalFallback();
      } finally {
        setIsLoading(false);
      }
    };
    const loadLocalFallback = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { 
          const parsed = JSON.parse(saved);
          setCmsData(sanitizeCloudData(parsed)); 
        } catch (e) { setCmsData(INITIAL_CMS_DATA); }
      }
    };
    const seedCloud = async (content: CMSData) => {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/cms_data`, {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: 'master', content: content })
        });
      } catch (e) {}
    };
    initData();
  }, []);

  const updateContent = async (newLocaleContent: AppContentData, l: Locale): Promise<boolean> => {
    const nextData = { ...cmsData, [l]: newLocaleContent };
    setCmsData(nextData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/cms_data?id=eq.master`, {
          method: 'PATCH',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: nextData, updated_at: new Date().toISOString() })
        });
        if (response.ok) { setCloudStatus('connected'); return true; }
      } catch (e) { setCloudStatus('error'); }
    }
    return false;
  };

  const login = (password: string) => { if (password === MASTER_ADMIN_PASSWORD) { setIsAuthenticated(true); return true; } return false; };
  const logout = () => { setIsAuthenticated(false); setView('home'); };

  return (
    <LanguageContext.Provider value={{ 
      view, setView, locale, setLocale, selectedPostId, setSelectedPostId,
      cmsData, updateContent, resetToDefaults: () => {}, 
      isAuthenticated, login, logout, isLoading, cloudStatus
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
