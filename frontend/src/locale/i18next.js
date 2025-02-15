import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources.js';

export default async () => (i18next.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
}));
