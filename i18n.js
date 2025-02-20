import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Hi!\nEnter your name',
      placeholder: 'Name',
      greeting: 'Hi, {{name}}!',
    },
  },
  de: {
    translation: {
      welcome: 'Hallo!\nGib deinen Namen ein',
      placeholder: 'Namen',
      greeting: 'Hallo, {{name}}!',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;