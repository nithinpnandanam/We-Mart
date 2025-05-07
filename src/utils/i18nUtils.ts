import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '@/locales/english/translation.json';
import translationHI from '@/locales/hindi/translation.json';
import translationML from '@/locales/malayalam/translation.json';

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  ml: { translation: translationML }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
