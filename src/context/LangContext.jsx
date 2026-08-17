import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import en from '../translations/en'
import nl from '../translations/nl'
import {
  LANGUAGES,
  LOCALES,
  DEFAULT_LOCALE,
  alternatePath,
  isLocale,
  parsePath,
  pathFor,
} from '../i18n/routes'

const TRANSLATIONS = { nl, en }
const STORAGE_KEY = 'slh_lang'

const LangContext = createContext(null)

/** Language preference is only a fallback for non-localized routes (admin); the URL always wins. */
function storedLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return isLocale(saved) ? saved : null
  } catch {
    return null
  }
}

export function LangProvider({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Memoized so the context value keeps a stable identity between renders.
  const { locale: urlLocale, key: pageKey, params: pageParams } = useMemo(() => parsePath(pathname), [pathname])
  const lang = urlLocale ?? storedLocale() ?? DEFAULT_LOCALE

  const t = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LOCALE]
  const langConfig = LANGUAGES.find((l) => l.code === lang)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* storage disabled */ }
    document.documentElement.lang = langConfig?.htmlLang || lang
    document.documentElement.setAttribute('dir', 'ltr')
  }, [lang, langConfig])

  const value = useMemo(() => ({
    lang,
    t,
    langConfig,
    LANGUAGES,
    LOCALES,
    /** Current page identity, so components can build their own alternates. */
    pageKey,
    pageParams,
    /** Localized href for a page key in the active language. */
    path: (key = 'home', params = {}) => pathFor(lang, key, params),
    /** Same page in another language — used by the switcher and hreflang tags. */
    altPath: (targetLocale) => alternatePath(pathname, targetLocale),
    /** Switch language while staying on the equivalent page. */
    switchLang: (code) => {
      if (!isLocale(code) || code === lang) return
      navigate(alternatePath(pathname, code))
    },
  }), [lang, t, langConfig, pageKey, pageParams, pathname, navigate])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

export { LANGUAGES }
