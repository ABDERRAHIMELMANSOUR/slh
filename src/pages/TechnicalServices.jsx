import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import SmartImage from '../components/ui/SmartImage'
import { TECHNICAL_GALLERY, resolveSrc } from '../config/images'
import { urlFor } from '../i18n/routes'
import useSchema from '../hooks/useSchema'
import {
  ArrowRight, Boxes, CheckCircle2, ClipboardList, Compass, Droplets,
  Factory, Flame, Layers, Mail, Ruler, Snowflake, Sparkles, Users,
  Wind, Wrench, Zap,
} from 'lucide-react'

const fUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:.6, ease:[.16,1,.3,1] } } }
const stg = { hidden:{}, show:{ transition:{ staggerChildren:.07 } } }

/* Icons and accents are positional: they follow the order of the copy in the
   translation files, so both language variants render identically. */
const SERVICE_VISUALS = [
  { Icon: Ruler,         c: '#00C2E0' },
  { Icon: Layers,        c: '#3B82F6' },
  { Icon: ClipboardList, c: '#8B5CF6' },
  { Icon: Wrench,        c: '#22C55E' },
  { Icon: Users,         c: '#F59E0B' },
]

const SPEC_VISUALS = [
  { Icon: Zap,      c: '#EF4444' },
  { Icon: Boxes,    c: '#00C2E0' },
  { Icon: Droplets, c: '#3B82F6' },
  { Icon: Flame,    c: '#F97316' },
  { Icon: Snowflake,c: '#06B6D4' },
  { Icon: Factory,  c: '#8B5CF6' },
  { Icon: Sparkles, c: '#22C55E' },
  { Icon: Wind,     c: '#14B8A6' },
]

export default function TechnicalServices() {
  const { t, lang, path } = useLang()
  const schema = useSchema()
  const { settings } = useData()
  const c = t.technical

  const pageUrl = urlFor(lang, 'technical')

  useSEO({
    lang,
    pageKey: 'technical',
    title: c.metaTitle,
    description: c.metaDescription,
    jsonLd: [
      schema.organization(),
      schema.service({
        name: c.title.replace('\n', ' '),
        description: c.metaDescription,
        serviceType: c.serviceType,
        url: pageUrl,
        offers: c.specs.map(s => s.title),
      }),
      schema.breadcrumb([
        { name: t.nav.home, url: urlFor(lang, 'home') },
        { name: t.nav.technical, url: pageUrl },
      ]),
      schema.faq(c.faqs),
    ],
  })

  return (
    <Layout>
      {/* h1 lives inside PageHero */}
      <PageHero
        badge={c.badge}
        title={c.title}
        subtitle={c.subtitle}
        cta={c.heroCta}
        ctaTo={path('contact')}
      />

      {/* ── Intro + stats ─────────────────────────────────────── */}
      <section className="sec bg-white relative overflow-hidden">
        <div className="absolute inset-0 dots-light opacity-50 pointer-events-none"/>
        <div className="wrap relative">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }} variants={stg}>
              <motion.span variants={fUp} className="pill mb-5 inline-flex">{c.introBadge}</motion.span>
              <motion.h2 variants={fUp} className="h-lg text-slate-800 mb-5">{c.introTitle}</motion.h2>
              <motion.p variants={fUp} className="text-slate-500 leading-relaxed mb-4 text-[15px]">{c.introP1}</motion.p>
              <motion.p variants={fUp} className="text-slate-500 leading-relaxed mb-8 text-[15px]">{c.introP2}</motion.p>
              <motion.div variants={fUp} className="flex flex-wrap gap-3">
                <Link to={path('contact')} className="btn-primary group">
                  {c.ctaBtn}<ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform"/>
                </Link>
                <a href={`mailto:${settings.email}`} className="btn-outline gap-2">
                  <Mail size={15}/>{settings.email}
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }} variants={stg}
              className="grid grid-cols-2 gap-4">
              {c.stats.map(({ v, l }) => (
                <motion.div key={l} variants={fUp} className="card p-6 text-center hover:border-cyan/20 hover:shadow-card-md">
                  <div className="text-[2.4rem] font-extrabold leading-none mb-2 grad-text" style={{ fontFamily:"'Sora',sans-serif" }}>{v}</div>
                  <div className="text-slate-500 text-[13px] leading-snug">{l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core services ─────────────────────────────────────── */}
      <section className="sec relative" style={{ background:'linear-gradient(180deg,#F8FAFC,#fff)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage:'linear-gradient(rgba(0,194,224,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,194,224,.04) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
        <div className="wrap relative">
          <div className="max-w-2xl mb-14">
            <h2 className="h-lg text-slate-800 mb-4">{c.servicesTitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{c.servicesSubtitle}</p>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-50px' }} variants={stg}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.services.map((s, i) => {
              const { Icon, c: accent } = SERVICE_VISUALS[i % SERVICE_VISUALS.length]
              return (
                <motion.article key={s.title} variants={fUp} className="group card shimmer p-7 flex flex-col">
                  <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background:`${accent}14` }}>
                    <Icon size={24} style={{ color:accent }}/>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-[14.5px] mb-5">{s.desc}</p>
                  <ul className="mt-auto space-y-2">
                    {s.points.map(p => (
                      <li key={p} className="flex items-start gap-2.5 text-slate-600 text-[13px]">
                        <CheckCircle2 size={15} className="text-cyan flex-shrink-0 mt-0.5"/>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 h-[2px] rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background:`linear-gradient(90deg,${accent},#0D3A6E)` }}/>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Specializations ───────────────────────────────────── */}
      <section className="sec bg-white">
        <div className="wrap">
          <div className="max-w-2xl mb-14">
            <h2 className="h-lg text-slate-800 mb-4">{c.specTitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{c.specSubtitle}</p>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-50px' }} variants={stg}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.specs.map((s, i) => {
              const { Icon, c: accent } = SPEC_VISUALS[i % SPEC_VISUALS.length]
              return (
                <motion.article key={s.title} variants={fUp} className="group card p-6 hover:border-cyan/20 hover:shadow-card-md">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ background:`${accent}14` }}>
                    <Icon size={20} style={{ color:accent }}/>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors text-[15px]" style={{ fontFamily:"'Sora',sans-serif" }}>{s.title}</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{s.desc}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Craft gallery ─────────────────────────────────────────
          Photo slots are wired and resilient: each renders a designed industrial
          motif until a photograph is supplied, and falls back to it if one fails. */}
      <section className="sec" style={{ background:'linear-gradient(180deg,#fff,#F8FAFC)' }}>
        <div className="wrap">
          <div className="max-w-2xl mb-12">
            <h2 className="h-lg text-slate-800 mb-4">{c.galleryTitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{c.gallerySubtitle}</p>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-50px' }} variants={stg}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.gallery.map((item, i) => {
              const image = TECHNICAL_GALLERY[i % TECHNICAL_GALLERY.length]
              return (
                <motion.figure key={item.title} variants={fUp}
                  className="group card overflow-hidden hover:border-cyan/20 hover:shadow-card-md">
                  <SmartImage
                    src={resolveSrc(image)}
                    alt={t.imageAlt[image.altKey] || item.title}
                    motif={image.motif}
                    tone="light"
                    className="h-52 w-full"
                    imgClassName="group-hover:scale-105 transition-transform duration-500"
                  />
                  <figcaption className="p-5">
                    <h3 className="font-bold text-slate-800 mb-1.5 text-[15px] group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{item.title}</h3>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed">{item.caption}</p>
                  </figcaption>
                </motion.figure>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────── */}
      <section className="sec relative overflow-hidden" style={{ background:'linear-gradient(135deg,#EAF9FD 0%,#EBF0FF 60%,#F3EEFF 100%)' }}>
        <div className="absolute right-[-80px] top-[-80px] w-[420px] h-[420px] rounded-full opacity-[0.18] pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(0,194,224,.3),transparent 70%)' }}/>
        <div className="wrap relative">
          <div className="max-w-2xl mb-14">
            <h2 className="h-lg text-slate-800 mb-4">{c.processTitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{c.processSubtitle}</p>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-50px' }} variants={stg}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.process.map(({ n, title, desc }) => (
              <motion.div key={n} variants={fUp} className="group bg-white rounded-3xl border border-slate-100 shadow-card p-7 hover:shadow-card-md hover:-translate-y-0.5 transition-all">
                <div className="text-4xl font-extrabold mb-4 leading-none grad-text" style={{ fontFamily:"'Sora',sans-serif" }}>{n}</div>
                <h3 className="font-bold text-slate-800 mb-2.5 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why us ────────────────────────────────────────────── */}
      <section className="sec bg-white">
        <div className="wrap">
          <div className="max-w-2xl mb-14">
            <h2 className="h-lg text-slate-800 mb-4">{c.whyTitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{c.whySubtitle}</p>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true, margin:'-50px' }} variants={stg}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.why.map(({ title, desc }) => (
              <motion.div key={title} variants={fUp} className="flex items-start gap-4 p-6 card hover:border-cyan/20">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(0,194,224,.10)' }}>
                  <CheckCircle2 size={17} className="text-cyan"/>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1.5 text-[15px]" style={{ fontFamily:"'Sora',sans-serif" }}>{title}</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sectors ───────────────────────────────────────────── */}
      <section className="sec" style={{ background:'linear-gradient(180deg,#F8FAFC,#fff)' }}>
        <div className="wrap">
          <div className="max-w-2xl mb-12">
            <h2 className="h-lg text-slate-800 mb-4">{c.sectorsTitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{c.sectorsSubtitle}</p>
          </div>
          <motion.ul initial="hidden" whileInView="show" viewport={{ once:true }} variants={stg}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {c.sectors.map(s => (
              <motion.li key={s} variants={fUp}
                className="flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-card px-5 py-4 hover:border-cyan/25 hover:shadow-card-md transition-all">
                <Compass size={16} className="text-cyan flex-shrink-0"/>
                <span className="text-slate-600 text-sm font-medium">{s}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── FAQ (mirrors the FAQPage schema above) ────────────── */}
      <section className="sec bg-white">
        <div className="wrap max-w-4xl">
          <div className="mb-12">
            <h2 className="h-lg text-slate-800 mb-4">{c.faqTitle}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{c.faqSubtitle}</p>
          </div>
          <div className="space-y-3">
            {c.faqs.map(({ q, a }) => (
              <details key={q} className="group card p-6 hover:border-cyan/20 cursor-pointer">
                <summary className="flex items-start justify-between gap-4 list-none">
                  <h3 className="font-bold text-slate-800 text-[15px] leading-snug" style={{ fontFamily:"'Sora',sans-serif" }}>{q}</h3>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-cyan transition-transform group-open:rotate-45"
                    style={{ background:'rgba(0,194,224,.10)' }} aria-hidden="true">+</span>
                </summary>
                <p className="text-slate-500 text-[14px] leading-relaxed mt-4">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#00C2E0 0%,#0D3A6E 100%)' }}>
        <div className="absolute inset-0 dots opacity-20 pointer-events-none"/>
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none"/>
        <div className="wrap relative z-10 text-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span className="pill-white mb-6 inline-flex">{c.ctaBadge}</span>
            <h2 className="h-lg text-white mb-5 text-balance">{c.ctaTitle}</h2>
            <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">{c.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={path('contact')} className="btn-white group">
                {c.ctaBtn}<ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform"/>
              </Link>
              <a href={`mailto:${settings.email}`} className="btn-ghost-white gap-2">
                <Mail size={16}/>{c.ctaBtn2}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
