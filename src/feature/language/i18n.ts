import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file per page
import enHome from "./locales/en/home.json";
import idHome from "./locales/id/home.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            home: enHome,
        },
        id: {
            home: idHome,
        }
    },
    lng: "en", // default bahasa
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;