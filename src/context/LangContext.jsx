import { createContext, useContext, useState, useEffect } from 'react'
import en from '../translations/en'
import nl from '../translations/nl'
import fr from '../translations/fr'
import ar from '../translations/ar'
import es from '../translations/es'

const TRANSLATIONS = { en, nl, fr, ar, es }

export const LANGUAGES = [
  { code: 'en', label: 'English',    nativeLabel: 'English',    flag: '🇬🇧', dir: 'ltr' },
  { code: 'nl', label: 'Dutch',      nativeLabel: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'fr', label: 'French',     nativeLabel: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'Arabic',     nativeLabel: 'العربية',    flag: '🇲🇦', dir: 'rtl' },
  { code: 'es', label: 'Spanish',    nativeLabel: 'Español',    flag: '🇪🇸', dir: 'ltr' },
]

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('slh_lang')
    return LANGUAGES.find(l => l.code === saved) ? saved : 'en'
  })

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en
  const langConfig = LANGUAGES.find(l => l.code === lang)
  const isRTL = langConfig?.dir === 'rtl'

  useEffect(() => {
    localStorage.setItem('slh_lang', lang)
    document.documentElement.lang = lang
    document.body.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    if (isRTL) {
      document.body.style.fontFamily = "'Tajawal', sans-serif"
    } else {
      document.body.style.fontFamily = "'Inter', system-ui, sans-serif"
    }
  }, [lang, isRTL])

  const switchLang = (code) => {
    if (LANGUAGES.find(l => l.code === code)) setLang(code)
  }

  return (
    <LangContext.Provider value={{ lang, t, isRTL, langConfig, switchLang, LANGUAGES }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
