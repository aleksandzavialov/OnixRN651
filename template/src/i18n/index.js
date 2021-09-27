import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en';
import { IS_IOS } from '../constants/general';

const resources = {
  en: { translation: en }
};
const appLocales = Object.keys(resources);

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => {
    const { I18nManager, SettingsManager } = NativeModules;
    const locale = IS_IOS ? SettingsManager.settings.AppleLanguages[0] : I18nManager.localeIdentifier;
    const localeShort = locale.split(/_|-/)[0];
    const isPresent = appLocales.find((item) => item === localeShort);
    return AsyncStorage.getItem('language').then((lang) => {
      const language = isPresent ? localeShort : appLocales[0];
      cb(lang || language);
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: appLocales,
    debug: true,
    resources,
    react: {
      useSuspense: true
    }
  });
