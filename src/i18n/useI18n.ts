import { create } from 'zustand';
import { strings, AppLanguage } from './strings';

interface I18nState {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string) => string;
}

export const useI18n = create<I18nState>((set, get) => ({
  language: 'ko',

  setLanguage: (lang: AppLanguage) => {
    set({ language: lang });
  },

  t: (key: string) => {
    const { language } = get();
    return strings[language]?.[key] ?? strings.ko[key] ?? key;
  },
}));
