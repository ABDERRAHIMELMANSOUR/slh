import { useEffect } from 'react'
import { COMPANY, SITE_URL } from '../config/site'
import { LANGUAGES, hreflangAlternates, urlFor } from '../i18n/routes'

/**
 * Head manager for the SPA.
 *
 * Everything this hook injects is tagged `data-seo` and cleared on each run, so a page
 * never inherits the previous page's canonical, hreflang set or structured data.
 *
 * The hreflang block is what lets Google treat /nl/... and /en/... as two independent,
 * mutually-referencing documents rather than duplicates.
 */
const MANAGED = 'data-seo'

/**
 * Tags that must exist exactly once per page. index.html ships static versions of
 * these for crawlers and social scrapers that read the HTML before React mounts;
 * they are purged here on every navigation so the page never carries a stale
 * canonical or a duplicated hreflang set alongside the freshly-written one.
 */
const SINGLETON_SELECTOR = [
  `[${MANAGED}]`,
  'link[rel="canonical"]',
  'link[rel="alternate"][hreflang]',
  'meta[property="og:locale:alternate"]',
].join(',')

function clearManaged() {
  document.head.querySelectorAll(SINGLETON_SELECTOR).forEach((el) => el.remove())
}

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function appendLink(rel, href, extra = {}) {
  const el = document.createElement('link')
  el.setAttribute('rel', rel)
  el.setAttribute('href', href)
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
  el.setAttribute(MANAGED, '')
  document.head.appendChild(el)
}

function appendJsonLd(schema) {
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.textContent = JSON.stringify(schema)
  el.setAttribute(MANAGED, '')
  document.head.appendChild(el)
}

/**
 * @param {object}   options
 * @param {string}   options.lang         Active locale ('nl' | 'en').
 * @param {string}   options.pageKey      Key from the i18n route map — drives canonical + alternates.
 * @param {object}   [options.params]     Route params (e.g. `{ slug }` for a blog post).
 * @param {string}   options.title        Full <title>; ` | SLH Service Nederland` is appended if missing.
 * @param {string}   options.description  Meta description for this language variant.
 * @param {object[]} [options.jsonLd]     Schema.org objects to embed on this page.
 * @param {string}   [options.image]      Absolute or root-relative OG image.
 * @param {boolean}  [options.noindex]    Keep the page out of the index (admin screens).
 */
export default function useSEO({
  lang = 'nl',
  pageKey = 'home',
  params = {},
  title,
  description,
  jsonLd = [],
  image = '/slh-logo.png',
  noindex = false,
}) {
  const paramsKey = JSON.stringify(params)
  const schemaKey = JSON.stringify(jsonLd)

  useEffect(() => {
    const resolvedParams = JSON.parse(paramsKey)
    const schemas = JSON.parse(schemaKey)

    const canonical = urlFor(lang, pageKey, resolvedParams)
    const fullTitle = title?.includes('SLH') ? title : `${title} | ${COMPANY.name}`
    const ogImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`
    const current = LANGUAGES.find((l) => l.code === lang)

    clearManaged()

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('name', 'googlebot', noindex ? 'noindex, nofollow' : 'index, follow')

    // Canonical + language alternates: one unique URL per language variant.
    appendLink('canonical', canonical)
    if (!noindex) {
      hreflangAlternates(pageKey, resolvedParams).forEach(({ hreflang, href }) =>
        appendLink('alternate', href, { hreflang }),
      )
    }

    upsertMeta('property', 'og:site_name', COMPANY.name)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:locale', current?.ogLocale || 'nl_NL')

    LANGUAGES.filter((l) => l.code !== lang).forEach((l) => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:locale:alternate')
      el.setAttribute('content', l.ogLocale)
      el.setAttribute(MANAGED, '')
      document.head.appendChild(el)
    })

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    schemas.filter(Boolean).forEach(appendJsonLd)

    return clearManaged
  }, [lang, pageKey, paramsKey, title, description, schemaKey, image, noindex])
}
