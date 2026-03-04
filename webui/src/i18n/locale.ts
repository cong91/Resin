export type AppLocale = "zh-CN" | "en-US" | "vi-VN";

export const STORAGE_KEY = "resin.webui.locale";
export const DEFAULT_LOCALE: AppLocale = "zh-CN";
export const SUPPORTED_LOCALES: readonly AppLocale[] = ["zh-CN", "en-US", "vi-VN"];

let currentLocale: AppLocale = DEFAULT_LOCALE;

function isLocale(value: unknown): value is AppLocale {
  return value === "zh-CN" || value === "en-US" || value === "vi-VN";
}

export function normalizeLocale(value: string | null | undefined): AppLocale {
  if (value && isLocale(value)) {
    return value;
  }
  const normalized = value?.toLowerCase() ?? "";
  if (normalized.startsWith("zh")) {
    return "zh-CN";
  }
  if (normalized.startsWith("vi")) {
    return "vi-VN";
  }
  return "en-US";
}

export function detectInitialLocale(): AppLocale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) {
    return stored;
  }

  return normalizeLocale(window.navigator.language);
}

export function persistLocale(locale: AppLocale) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, locale);
}

export function getCurrentLocale(): AppLocale {
  return currentLocale;
}

export function setCurrentLocale(locale: AppLocale) {
  currentLocale = locale;
}

export function isEnglishLocale(locale: AppLocale): boolean {
  return locale === "en-US";
}

export function isVietnameseLocale(locale: AppLocale): boolean {
  return locale === "vi-VN";
}
