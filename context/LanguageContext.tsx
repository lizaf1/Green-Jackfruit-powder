
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
  updateContent: (newLocaleContent: AppContentData, l: Locale) => void;
  resetToDefaults: () => void;
  // Security
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateAdminPassword: (newPassword: string) => void;
}

const STORAGE_KEY = 'tewell_plus_multi_cms_data_v2';
const AUTH_KEY = 'tewell_plus_admin_password_v2'; // Bumped version

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
  
  // Auth logic prioritizes localStorage but falls back to MASTER_ADMIN_PASSWORD from code
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem(AUTH_KEY) || MASTER_ADMIN_PASSWORD;
  });

  const [cmsData, setCmsData] = useState<CMSData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          id: parsed.id || INITIAL_CMS_DATA.id,
          en: parsed.en || INITIAL_CMS_DATA.en
        };
      } catch (e) {
        return INITIAL_CMS_DATA;
      }
    }
    return INITIAL_CMS_DATA;
  });

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  const updateContent = (newLocaleContent: AppContentData, l: Locale) => {
    const nextData = { ...cmsData, [l]: newLocaleContent };
    setCmsData(nextData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  };

  const resetToDefaults = () => {
    if (confirm('Reset all content to defaults? This will revert all local changes to the version currently in the source code.')) {
      setCmsData(INITIAL_CMS_DATA);
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const login = (password: string) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setView('home');
  };

  const updateAdminPassword = (newPassword: string) => {
    setAdminPassword(newPassword);
    localStorage.setItem(AUTH_KEY, newPassword);
  };

  return (
    <LanguageContext.Provider value={{ 
      view, setView, 
      locale, setLocale,
      selectedPostId, setSelectedPostId,
      cmsData, updateContent, resetToDefaults,
      isAuthenticated, login, logout, updateAdminPassword
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
