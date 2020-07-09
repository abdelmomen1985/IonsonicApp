import LocalizedStrings from "react-localization";
import arabic from "./arabic";
import english from "./english";
import ur from "./ur";
import hi from "./hi";
import bn from "./bn";

const setLanguage = (reload: boolean = false) => {
  const currentLanguage = localStorage.getItem("lang");

  if (currentLanguage === null || currentLanguage === "ar") {
    localStorage.setItem("lang", "en");
  } else if (currentLanguage === "en") {
    localStorage.setItem("lang", "ar");
  }
  if (reload) window.location.reload();
};

const strings = new LocalizedStrings({
  en: english,
  ar: arabic,
  ur: ur,
  hi: hi,
  bn: bn,
});

const language = localStorage.getItem("lang");
strings.setLanguage(language === null ? "en" : language);

export { setLanguage, strings };
