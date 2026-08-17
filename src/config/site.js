/**
 * Single source of truth for company identity, canonical host and contact routing.
 *
 * NOTE ON THE CANONICAL HOST
 * --------------------------
 * SITE_URL drives every canonical tag, hreflang alternate and JSON-LD URL in the app.
 * It is intentionally the apex domain (no `www.`), matching how the site was already
 * published. If the production site is served from `https://www.slhservice.nl` instead,
 * change this one constant and regenerate `public/sitemap.xml` to match — canonical tags
 * must always point at the host that actually serves the page.
 */
export const SITE_URL = 'https://slhservice.nl'

/** Company contact email — used by the footer, contact page, form handler and schema markup. */
export const CONTACT_EMAIL = 'info@slhservice.nl'

/** Legacy address kept only so stored settings can be migrated away from it. */
export const LEGACY_CONTACT_EMAIL = 'contact@slhservice.nl'

/**
 * Contact form delivery endpoint.
 * FormSubmit relays the submission straight to CONTACT_EMAIL — no server component needed.
 * Swapping to Resend / SendGrid / Nodemailer later only requires changing this URL and the
 * payload shape in `src/pages/Contact.jsx`.
 */
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

export const COMPANY = {
  name: 'SLH Service Nederland',
  legalName: 'SLH Service Nederland B.V.',
  email: CONTACT_EMAIL,
  phone: '+31 6 00 00 00 00',
  country: 'Netherlands',
  countryCode: 'NL',
  linkedIn: 'https://linkedin.com/company/slhservice',
  logo: `${SITE_URL}/slh-logo.png`,
}

/** Markets we explicitly serve — mirrored into `areaServed` on the service schema. */
export const AREA_SERVED = ['Netherlands', 'Belgium', 'Germany', 'Europe']

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
