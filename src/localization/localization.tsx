import LocalizedStrings from "react-localization";
import arabic from "./arabic";
import english from "./english";

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
});

const language = localStorage.getItem("lang");
strings.setLanguage(language === null ? "en" : language);

export { setLanguage, strings };
