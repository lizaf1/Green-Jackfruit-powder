
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { View, Locale, AppContentData, CMSData } from '../types';
import { getDefaultContent } from '../translations';

interface LanguageContextType {
  view: View;
  setView: (view: View) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
  cmsData: CMSData;
  updateContent: (newLocaleContent: AppContentData, l: Locale) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'tewell_plus_multi_cms_data';

const INITIAL_CMS_DATA: CMSData = {
  id: getDefaultContent('id'),
  en: getDefaultContent('en')
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<View>('home');
  const [locale, setLocale] = useState<Locale>('id');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [cmsData, setCmsData] = useState<CMSData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CMS_DATA;
      }
    }
    return INITIAL_CMS_DATA;
  });

  const updateContent = (newLocaleContent: AppContentData, l: Locale) => {
    const nextData = { ...cmsData, [l]: newLocaleContent };
    setCmsData(nextData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  };

  const resetToDefaults = () => {
    if (confirm('Reset content to factory defaults? This will erase custom translations for BOTH languages.')) {
      setCmsData(INITIAL_CMS_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      view, setView, 
      locale, setLocale,
      selectedPostId, setSelectedPostId,
      cmsData, updateContent, resetToDefaults 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
