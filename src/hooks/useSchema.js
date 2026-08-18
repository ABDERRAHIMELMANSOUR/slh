import { useMemo } from 'react'
import { useData } from '../context/DataContext'
import { useLang } from '../context/LangContext'
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from '../lib/schema'

/**
 * Schema.org builders pre-bound to the active language and the live contact details.
 *
 * Pages must go through this rather than calling `src/lib/schema.js` directly: phone
 * and email are editable in the admin panel, and a page that built its structured data
 * from the static config would advertise a different number than the one printed on the
 * page. Binding both here means a page cannot forget to pass them.
 *
 * @returns {{
 *   organization: () => object,
 *   website: () => object,
 *   service: (opts: object) => object,
 *   breadcrumb: (items: {name:string,url:string}[]) => object,
 *   faq: (faqs: {q:string,a:string}[]) => object|null,
 * }}
 */
export default function useSchema() {
  const { lang } = useLang()
  const { settings } = useData()

  const phone = settings?.phone
  const email = settings?.email

  return useMemo(() => {
    const contact = { phone, email }
    return {
      organization: () => organizationSchema(lang, contact),
      website: () => websiteSchema(lang),
      service: (opts) => serviceSchema({ lang, contact, ...opts }),
      breadcrumb: breadcrumbSchema,
      faq: faqSchema,
    }
  }, [lang, phone, email])
}
