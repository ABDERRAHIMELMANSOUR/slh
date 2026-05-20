import { useEffect } from 'react'

const BASE = 'https://slhservice.nl'

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', value)
}
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}

export default function useSEO({ title, description, path = '', lang = 'en' }) {
  useEffect(() => {
    const full = title.includes('SLH') ? title : `${title} | SLH Service Nederland`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('name', 'robots', 'index, follow')
    setLink('canonical', `${BASE}${path}`)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${BASE}${path}`)
    setMeta('property', 'og:locale', lang)
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    return () => { setLink('canonical', BASE + '/') }
  }, [title, description, path, lang])
}
