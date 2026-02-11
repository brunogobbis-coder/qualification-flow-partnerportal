'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { type Locale, translations } from './i18n';

// ── Context ──────────────────────────────────────────────────────────

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Look up a translation key using dot notation, e.g. `t('common.continue')` */
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────

interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LocaleProvider({
  children,
  defaultLocale = 'pt-BR',
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[locale];
      const value = key.split('.').reduce<unknown>((obj, segment) => {
        if (obj !== null && typeof obj === 'object') {
          return (obj as Record<string, unknown>)[segment];
        }
        return undefined;
      }, dict);

      if (typeof value === 'string') {
        return value;
      }

      // Fallback: return the key itself so missing translations are visible
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[i18n] Missing translation for key "${key}" in locale "${locale}"`);
      }
      return key;
    },
    [locale],
  );

  const contextValue = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────

export function useTranslation(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (ctx === undefined) {
    throw new Error('useTranslation must be used within a <LocaleProvider>');
  }
  return ctx;
}
