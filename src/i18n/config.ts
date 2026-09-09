import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import uz from './locales/uz.json';
import ru from './locales/ru.json';

const urlParams = new URLSearchParams(window.location.search);
const initialLang = urlParams.get('lang') || localStorage.getItem('i18nextLng') || 'uz';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        translation: uz
      },
      ru: {
        translation: ru
      }
    },
    lng: initialLang, // default language
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
