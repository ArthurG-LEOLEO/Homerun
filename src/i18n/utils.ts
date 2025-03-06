import ui from "./ui";
import { defaultLocale } from "./config";

export function useTranslations(lang: string | undefined) {
    const locale = lang && ui[lang] ? lang : defaultLocale;

    return function t(key: string) {
        return ui[locale][key] || ui[defaultLocale][key] || key;
    };
}
