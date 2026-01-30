
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

const STORAGE_KEY = 'tewell_plus_v4_cache';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const INITIAL_CMS_DATA: CMSData = {
  id: getDefaultContent('id'),
  en: getDefaultContent('en')
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<View>('home');
  const [locale, setLocale] = useState<Locale>('id');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cloudStatus, setCloudStatus] = useState<'connected' | 'error' | 'local-only' | 'initializing'>('initializing');
  const [cmsData, setCmsData] = useState<CMSData>(INITIAL_CMS_DATA);

  // Initialize: Fetch from Cloud and Auto-Provision if empty
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
          const cloudContent = data[0]?.content;

          // If DB exists but is empty/dummy, seed it with INITIAL_CMS_DATA
          if (!cloudContent || Object.keys(cloudContent).length === 0) {
            console.log("Cloud is empty. Provisioning initial data...");
            await seedCloud(INITIAL_CMS_DATA);
            setCmsData(INITIAL_CMS_DATA);
            setCloudStatus('connected');
          } else {
            setCmsData(cloudContent);
            setCloudStatus('connected');
          }
        } else {
          setCloudStatus('error');
          loadLocalFallback();
        }
      } catch (e) {
        console.error("Supabase Connection Failed:", e);
        setCloudStatus('error');
        loadLocalFallback();
      } finally {
        setIsLoading(false);
      }
    };

    const loadLocalFallback = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { setCmsData(JSON.parse(saved)); } catch (e) { setCmsData(INITIAL_CMS_DATA); }
      }
    };

    const seedCloud = async (content: CMSData) => {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/cms_data`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({ id: 'master', content: content })
        });
      } catch (e) {
        console.error("Seeding failed:", e);
      }
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
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ content: nextData, updated_at: new Date().toISOString() })
        });
        
        if (response.ok) {
          setCloudStatus('connected');
          return true;
        }
      } catch (e) {
        setCloudStatus('error');
      }
    }
    return false;
  };

  const login = (password: string) => {
    if (password === MASTER_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

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
