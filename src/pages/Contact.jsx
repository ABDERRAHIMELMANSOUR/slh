import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { CONTACT_FORM_ENDPOINT } from '../config/site'
import { breadcrumbSchema, organizationSchema } from '../lib/schema'
import { urlFor } from '../i18n/routes'
import { Mail, Phone, Globe, CheckCircle2, AlertCircle, Loader2, Wrench } from 'lucide-react'

const EMPTY = { name:'', company:'', email:'', phone:'', service:'', message:'', privacy:false }

export default function Contact() {
  const { t, lang } = useLang()
  const { settings } = useData()

  useSEO({
    lang,
    pageKey: 'contact',
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    jsonLd: [
      organizationSchema(lang),
      breadcrumbSchema([
        { name: t.nav.home, url: urlFor(lang, 'home') },
        { name: t.nav.contact, url: urlFor(lang, 'contact') },
      ]),
    ],
  })

  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const serviceOptions = t.contact.serviceOptions

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t.common.required
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.contact.emailInvalid
    if (!form.service) e.service = t.common.required
    if (!form.message.trim()) e.message = t.common.required
    if (!form.privacy) e.privacy = t.common.required
    return e
  }

  const chg = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  const submit = async (e) => {
    e.preventDefault()
    const er = validate()
    if (Object.keys(er).length) { setErrors(er); return }
    setStatus('loading')

    const serviceLabel = serviceOptions.find(o => o.value === form.service)?.label || form.service

    try {
      // Delivered straight to info@slhservice.nl (see CONTACT_FORM_ENDPOINT in src/config/site.js).
      const r = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[SLH Website] ${serviceLabel} — ${form.company || form.name}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
          'Full Name': form.name,
          'Company Name': form.company,
          'Email': form.email,
          'Phone Number': form.phone,
          'Selected Service': serviceLabel,
          'Project Scope': form.message,
          'Language': lang === 'nl' ? 'Nederlands' : 'English',
          'Source Page': typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const fc = k => `w-full px-4 py-3.5 rounded-2xl border text-slate-800 text-sm transition-all placeholder-slate-400 focus:outline-none ${errors[k] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:border-cyan focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,194,224,.08)]'}`

  return (
    <Layout>
      <PageHero badge={t.contact.badge} title={t.contact.title} subtitle={t.contact.subtitle}/>
      <section className="py-16 bg-white">
        <div className="wrap">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="space-y-4">
              {[
                { Icon:Mail,  l:t.contact.emailLabel, v:settings.email,  h:`mailto:${settings.email}` },
                { Icon:Phone, l:t.contact.phoneLabel, v:settings.phone,  h:`tel:${(settings.phone || '').replace(/\s/g, '')}` },
                { Icon:Globe, l:t.contact.office,     v:settings.address },
              ].map(({ Icon, l, v, h }) => (
                <div key={l} className="flex items-start gap-4 p-5 card hover:border-cyan/20">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(0,194,224,.10)' }}><Icon size={18} className="text-cyan"/></div>
                  <div>
                    <div className="text-slate-400 text-[11px] font-bold tracking-widest uppercase mb-0.5">{l}</div>
                    {h ? <a href={h} className="text-slate-800 font-semibold text-sm hover:text-cyan transition-colors">{v}</a> : <div className="text-slate-800 font-semibold text-sm">{v}</div>}
                  </div>
                </div>
              ))}
              {/* Company-level intake note — the founder profile lives on the About page */}
              <div className="p-5 rounded-2xl border" style={{ background:'linear-gradient(135deg,#EAF9FD,#E6EEFF)', borderColor:'rgba(0,194,224,.2)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-cyan" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>
                    <Wrench size={20}/>
                  </div>
                  <div className="font-bold text-slate-800 text-sm">{t.contact.availabilityTitle}</div>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">{t.contact.availabilityNote}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              {status === 'success' ? (
                <motion.div initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} className="text-center py-16 px-8 rounded-3xl border" style={{ background:'linear-gradient(135deg,#EAF9FD,#E6EEFF)', borderColor:'rgba(0,194,224,.2)' }}>
                  <CheckCircle2 size={56} className="text-cyan mx-auto mb-5"/>
                  <h2 className="text-2xl font-extrabold text-slate-800 mb-3" style={{ fontFamily:"'Sora',sans-serif" }}>{t.contact.successTitle}</h2>
                  <p className="text-slate-500">{t.contact.success}</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary mt-8">{t.contact.sendAnother}</button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cf-name" className="block text-slate-700 font-semibold text-sm mb-2">{t.contact.name} *</label>
                      <input id="cf-name" name="name" autoComplete="name" value={form.name} onChange={e => chg('name', e.target.value)} placeholder={t.contact.namePlaceholder} className={fc('name')}/>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="cf-company" className="block text-slate-700 font-semibold text-sm mb-2">{t.contact.company}</label>
                      <input id="cf-company" name="company" autoComplete="organization" value={form.company} onChange={e => chg('company', e.target.value)} placeholder={t.contact.companyPlaceholder} className={fc('company')}/>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cf-email" className="block text-slate-700 font-semibold text-sm mb-2">{t.contact.email} *</label>
                      <input id="cf-email" name="email" type="email" autoComplete="email" value={form.email} onChange={e => chg('email', e.target.value)} placeholder={t.contact.emailPlaceholder} className={fc('email')}/>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="cf-phone" className="block text-slate-700 font-semibold text-sm mb-2">{t.contact.phone}</label>
                      <input id="cf-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={e => chg('phone', e.target.value)} placeholder={t.contact.phonePlaceholder} className={fc('phone')}/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cf-service" className="block text-slate-700 font-semibold text-sm mb-2">{t.contact.service} *</label>
                    <select id="cf-service" name="service" value={form.service} onChange={e => chg('service', e.target.value)} className={`${fc('service')} appearance-none cursor-pointer`}>
                      <option value="">{t.contact.servicePlaceholder}</option>
                      {serviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                  </div>

                  <div>
                    <label htmlFor="cf-message" className="block text-slate-700 font-semibold text-sm mb-2">{t.contact.message} *</label>
                    <textarea id="cf-message" name="message" rows={6} value={form.message} onChange={e => chg('message', e.target.value)} placeholder={t.contact.messagePlaceholder} className={`${fc('message')} resize-none`}/>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.privacy} onChange={e => chg('privacy', e.target.checked)} className="mt-0.5 w-4 h-4 accent-cyan rounded"/>
                    <span className="text-slate-500 text-sm">{t.contact.privacy} <a href="#" className="text-cyan hover:underline">{t.contact.privacyLink}</a></span>
                  </label>
                  {errors.privacy && <p className="text-red-500 text-xs">{errors.privacy}</p>}

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                      <AlertCircle size={16}/>{t.contact.error} <a href={`mailto:${settings.email}`} className="underline font-semibold">{settings.email}</a>
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
                    {status === 'loading' ? <><Loader2 size={18} className="animate-spin"/>{t.contact.sending}</> : t.contact.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
