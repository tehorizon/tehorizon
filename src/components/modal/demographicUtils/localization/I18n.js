import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as RNLocalize from "react-native-localize";
import i18n from "i18next";

import { reactI18nextModule, setI18n } from "react-i18next";
import moment from "moment";

import { en, fr, ar } from "./locales";

const locales = RNLocalize.getLocales();

const languageDetector: DetectionPluginOptions = {
  type: "languageDetector",
  async: true,
  detect: () => {
    return locales[0].languageTag; //also give en-GB
  },
  init: () => {
    // Empty
  },
  cacheUserLanguage: () => {
    // Empty
  },
};

// const currentLocale = locales[0].languageCode;

const i18nNext = i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init(
    {
      // debug: __DEV__, //remove missing key warning for speed up
      fallbackLng: "en",
      resources: {
        // English
        en: { global: en },
        ar: { global: ar },
      },
      ns: ["global"],
      defaultNS: "global",
      interpolation: {
        escapeValue: false,
      },
      react: {
        wait: true,
        bindI18n: "languageChanged loaded",
        bindStore: "added removed",
        nsMode: "default",
      },
    },
    (error) => {
      if (error) {
        // tslint:disable
        console.log(error, "errr");
      }
    }
  );

const pickValue = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, ".$1");
  s = s.replace(/^\./, "");
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

export const translate = (key) => {
  let languageObject = {};
  //console.log(i18n.language,'language' ,'register')
  switch (i18n.language) {
    case "en":
      languageObject = en;
      break;

    case "ar":
      languageObject = ar;
      break;
  }
  let value = pickValue(languageObject, key) || key;
  return value;
};

RNLocalize.addEventListener("change", ({ language }) => {
  i18nNext.changeLanguage(language);
});

const checkRTL = (value) => {
  if (["ar", "he"].indexOf(value) > -1) {
    return true;
  } else {
    return false;
  }
};

let isRTL = false;
i18nNext.on("languageChanged", (lng) => {
  isRTL = checkRTL(lng);
});

export const getFlipForRTLStyle = () => {
  return {
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  };
};

export { isRTL };

// Add fallback for brackets variables in the translation key (e.g {0})
const replaceWithParams = (text, params) => {
  let result = text;
  params.forEach((value, index) => {
    const reg = new RegExp(`({)${index}(})`, "g");
    result = result.replace(reg, value);
  });
  return result;
};
// @ts-ignore
i18nNext.tf = (key, ...params) => {
  return replaceWithParams(i18nNext.t(key), params);
};

setI18n(i18nNext);

export default {
  t: translate,
};

const appLang = i18nNext.language;
const defaultAppLang = ["en", "ar"].indexOf(appLang) > 0 ? appLang : "en";
export const phoneLang = locales[0];
export const i18n_Init = async () => {
  if (isRTL) {
    moment.locale("ar");
  } else {
    moment.locale("en");
  }
  const lang = await AsyncStorage.getItem("lang");
  if (lang) {
    i18nNext.changeLanguage(lang);
  } else {
    const defaultLang = defaultAppLang;
    i18nNext.changeLanguage(defaultLang);
  }
};

export const changeLanguage = async (lang) => {
  await AsyncStorage.setItem("lang", lang);
  i18nNext.changeLanguage(lang);
};

export const withTransation = (Component) => (props) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  i18nNext.on("languageChanged", function (lng) {
    //this is due to rerender component
    setCurrentLanguage(lng);
  });
  return <Component {...props} />;
};

export const currentLanguage = () => {
  return i18n.language || "en";
};
