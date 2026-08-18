/**
 * Schema.org JSON-LD builders.
 *
 * Kept in one place so the Organization / LocalBusiness identity is byte-identical on
 * every page and in both languages — inconsistent `@id` values are the usual reason
 * rich results fail to consolidate.
 *
 * CONTACT DETAILS ARE INJECTED, NOT IMPORTED
 * ------------------------------------------
 * Phone and email are editable at runtime through the admin panel, so they must come
 * from the settings store rather than from the static config — otherwise the page
 * would show one number while the structured data advertised another, which is exactly
 * the mismatch Google penalises. Callers should use the `useSchema` hook, which binds
 * the live settings for them; the COMPANY defaults below are only a safety net for a
 * caller that has no settings available.
 */
import { AREA_SERVED, COMPANY, SITE_URL } from '../config/site'
import { urlFor } from '../i18n/routes'

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

const areaServed = AREA_SERVED.map((name) => ({ '@type': 'Country', name }))

/** Normalise whatever the caller passed into a complete contact pair. */
const resolveContact = (contact) => ({
  phone: contact?.phone || COMPANY.phone,
  email: contact?.email || COMPANY.email,
})

/**
 * @param {string} lang
 * @param {{phone?:string,email?:string}} [contact] Live values from the settings store.
 */
export function organizationSchema(lang = 'nl', contact) {
  const { phone, email } = resolveContact(contact)
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: urlFor(lang, 'home'),
    logo: COMPANY.logo,
    image: COMPANY.logo,
    email,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: COMPANY.countryCode,
      addressRegion: COMPANY.country,
    },
    areaServed,
    sameAs: [COMPANY.linkedIn],
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'sales',
      email,
      telephone: phone,
      areaServed: AREA_SERVED,
      availableLanguage: ['nl', 'en'],
    }],
  }
}

export function websiteSchema(lang = 'nl') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: urlFor(lang, 'home'),
    name: COMPANY.name,
    inLanguage: lang,
    publisher: { '@id': ORG_ID },
  }
}

/**
 * @param {object}   options
 * @param {string}   options.lang
 * @param {string}   options.name           Service name in the page's language.
 * @param {string}   options.description
 * @param {string}   options.serviceType     Primary keyword for the service.
 * @param {string}   options.url             Canonical URL of the service page.
 * @param {string[]} [options.offers]        Individual specialisations offered.
 * @param {{phone?:string,email?:string}} [options.contact] Live values from the settings store.
 */
export function serviceSchema({ lang = 'nl', name, description, serviceType, url, offers = [], contact }) {
  const { phone, email } = resolveContact(contact)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    serviceType,
    url,
    inLanguage: lang,
    provider: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: COMPANY.name,
      email,
      telephone: phone,
      url: urlFor(lang, 'home'),
    },
    areaServed,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: urlFor(lang, 'contact'),
      servicePhone: phone,
      availableLanguage: ['nl', 'en'],
    },
    hasOfferCatalog: offers.length ? {
      '@type': 'OfferCatalog',
      name,
      itemListElement: offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: offer },
      })),
    } : undefined,
  }
}

/** @param {{name:string,url:string}[]} items Ordered breadcrumb trail. */
export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** @param {{q:string,a:string}[]} faqs */
export function faqSchema(faqs = []) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
