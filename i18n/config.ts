export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "EN",
  ar: "🇩🇿",
};

export function isRtl(locale: string) {
  return locale === "ar";
}