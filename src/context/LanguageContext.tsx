import React, { createContext, useState, useEffect } from 'react';
import i18n from '../util/i18n';

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  changeLanguage: () => {}
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
