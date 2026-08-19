/**
 * Language architecture — Dutch (nl) and English (en) only.
 *
 * Every page exists on its own fully-separated URL so Google can index the two
 * language versions independently:
 *
 *   /nl/technische-ontzorging   ←→   /en/technical-engineering-services
 *
 * There is no locale-less content URL: `/` and any legacy path redirect into `/nl`,
 * which is also the `x-default` target.
 */
import { SITE_URL } from '../config/site.js'

export const DEFAULT_LOCALE = 'nl'
export const LOCALES = ['nl', 'en']

export const LANGUAGES = [
  { code: 'nl', label: 'Dutch',   nativeLabel: 'Nederlands', flag: '🇳🇱', htmlLang: 'nl-NL', ogLocale: 'nl_NL' },
  { code: 'en', label: 'English', nativeLabel: 'English',    flag: '🇬🇧', htmlLang: 'en',    ogLocale: 'en_GB' },
]

/**
 * Localized slugs per page key. The slug carries the primary keyword in each language,
 * which is why the NL and EN URLs deliberately differ rather than sharing one path.
 */
export const ROUTES = {
  home:      { nl: '',                      en: '' },
  about:     { nl: 'over-ons',              en: 'about' },
  services:  { nl: 'diensten',              en: 'services' },
  technical: { nl: 'technische-ontzorging', en: 'technical-engineering-services' },
  hydrogen:  { nl: 'groene-waterstof',      en: 'green-hydrogen' },
  projects:  { nl: 'projecten',             en: 'projects' },
  events:    { nl: 'evenementen',           en: 'events' },
  blog:      { nl: 'nieuws',                en: 'news' },
  partners:  { nl: 'partners',              en: 'partners' },
  contact:   { nl: 'contact',               en: 'contact' },
}

/** Page keys that live under another key and take a URL parameter. */
const NESTED = { blogPost: { parent: 'blog', param: 'slug' } }

export const PAGE_KEYS = Object.keys(ROUTES)

/** Old, language-less paths kept alive as redirects so existing inbound links survive. */
export const LEGACY_PATHS = {
  '/about':    'about',
  '/services': 'services',
  '/hydrogen': 'hydrogen',
  '/projects': 'projects',
  '/events':   'events',
  '/blog':     'blog',
  '/partners': 'partners',
  '/contact':  'contact',
}

export const isLocale = (value) => LOCALES.includes(value)

export const normalizeLocale = (value) => (isLocale(value) ? value : DEFAULT_LOCALE)

/** Build the canonical in-app path for a page in a given language. */
export function pathFor(locale, key = 'home', params = {}) {
  const loc = normalizeLocale(locale)

  const nested = NESTED[key]
  if (nested) {
    const parentSlug = ROUTES[nested.parent][loc]
    const value = params?.[nested.param]
    return value ? `/${loc}/${parentSlug}/${value}` : `/${loc}/${parentSlug}`
  }

  const slug = ROUTES[key]?.[loc]
  return slug ? `/${loc}/${slug}` : `/${loc}`
}

/** Absolute, indexable URL for a page in a given language. */
export const urlFor = (locale, key = 'home', params = {}) => `${SITE_URL}${pathFor(locale, key, params)}`

/**
 * Resolve a browser pathname back into { locale, key, params }.
 * Returns locale `null` for anything outside the localized tree (e.g. `/admin`).
 */
export function parsePath(pathname = '/') {
  const segments = pathname.split('/').filter(Boolean)

  if (!isLocale(segments[0])) return { locale: null, key: null, params: {} }
  const locale = segments[0]

  if (segments.length === 1) return { locale, key: 'home', params: {} }

  const key = PAGE_KEYS.find((k) => ROUTES[k][locale] === segments[1]) ?? null

  for (const [nestedKey, { parent, param }] of Object.entries(NESTED)) {
    if (key === parent && segments.length > 2) {
      return { locale, key: nestedKey, params: { [param]: segments.slice(2).join('/') } }
    }
  }

  return { locale, key, params: {} }
}

/**
 * Equivalent URL of the current page in the other language — used by the language
 * switcher and by the hreflang alternates, so both always agree.
 */
export function alternatePath(pathname, targetLocale) {
  const { key, params } = parsePath(pathname)
  if (!key) return pathFor(targetLocale, 'home')
  return pathFor(targetLocale, key, params)
}

/** hreflang set for one page: every locale plus x-default (Dutch). */
export function hreflangAlternates(key = 'home', params = {}) {
  return [
    ...LOCALES.map((loc) => ({ hreflang: loc, href: urlFor(loc, key, params) })),
    { hreflang: 'x-default', href: urlFor(DEFAULT_LOCALE, key, params) },
  ]
}
