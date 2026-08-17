import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../../context/LangContext'
import { useData } from '../../context/DataContext'
import { ArrowRight, CheckCircle2, Award, Globe, Target, BarChart3, Users, Zap, Leaf, TrendingUp, Wrench } from 'lucide-react'

const fUp = { hidden:{opacity:0,y:26}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}} }
const stg = { hidden:{}, show:{transition:{staggerChildren:.09}} }
const stgF = { hidden:{}, show:{transition:{staggerChildren:.06}} }

/* ── Animated counter ───────────────────────────────────── */
function Counter({ value }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const num = parseInt(value) || 0
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const dur = 1800, step = 16
      let cur = 0
      const inc = num / (dur / step)
      const t = setInterval(() => {
        cur += inc
        if (cur >= num) { setN(num); clearInterval(t) }
        else setN(Math.floor(cur))
      }, step)
    }, { threshold:.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [num])
  return <span ref={ref}>{n}</span>
}

/* ── Stats strip ────────────────────────────────────────── */
export function StatsStrip() {
  const { t } = useLang()
  const { settings } = useData()
  const { heroStats } = settings
  const stats = [
    { v:heroStats.years,     suf:'+', l:t.hero.stat1Label, Icon:Award },
    { v:heroStats.countries, suf:'+', l:t.hero.stat2Label, Icon:Globe },
    { v:heroStats.projects,  suf:'+', l:t.hero.stat3Label, Icon:BarChart3 },
    { v:heroStats.partners,  suf:'+', l:t.hero.stat4Label, Icon:Users },
  ]
  return (
    <section className="py-16 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 dots-light opacity-70 pointer-events-none"/>
      <div className="wrap">
        <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}} variants={stgF}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-slate-100">
          {stats.map(({ v, suf, l, Icon }) => (
            <motion.div key={l} variants={fUp} className="flex flex-col items-center text-center md:px-8 group py-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ background:'linear-gradient(135deg,rgba(0,194,224,.10),rgba(13,58,110,.07))' }}>
                <Icon size={22} className="text-cyan"/>
              </div>
              <div className="text-[3rem] font-extrabold leading-none mb-1.5 grad-text" style={{ fontFamily:"'Sora',sans-serif" }}>
                <Counter value={v}/>{suf}
              </div>
              <div className="text-slate-500 text-sm font-medium">{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Services ───────────────────────────────────────────── */
export function HomeServices() {
  const { t, path } = useLang()
  const svcs = [
    { Icon:Zap,        k:'s1', c:'#00C2E0' },
    { Icon:Leaf,       k:'s2', c:'#22C55E' },
    { Icon:Globe,      k:'s3', c:'#3B82F6' },
    { Icon:TrendingUp, k:'s4', c:'#8B5CF6' },
    { Icon:Users,      k:'s5', c:'#F59E0B' },
    { Icon:BarChart3,  k:'s6', c:'#EF4444' },
  ]
  return (
    <section className="sec relative overflow-hidden" style={{ background:'linear-gradient(180deg,#F8FAFC 0%,#fff 100%)' }}>
      <div className="absolute inset-0" style={{ backgroundImage:'linear-gradient(rgba(0,194,224,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,194,224,.04) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
      <div className="wrap relative">
        <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fUp} className="max-w-2xl mb-14">
          <span className="pill mb-5 inline-flex">{t.services.badge}</span>
          <h2 className="h-lg text-slate-800 mb-4">{t.services.title}</h2>
          <p className="text-slate-500 text-lg leading-relaxed">{t.services.subtitle}</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:'-50px'}} variants={stg}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {svcs.map(({ Icon, k, c }) => (
            <motion.div key={k} variants={fUp} className="group card shimmer p-7">
              <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background:`${c}14` }}>
                <Icon size={24} style={{ color:c }}/>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-cyan transition-colors"
                style={{ fontFamily:"'Sora',sans-serif", fontSize:'15px' }}>{t.services[`${k}Title`]}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.services[`${k}Desc`]}</p>
              <div className="mt-5 h-[2px] rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-0 group-hover:w-full transition-all duration-700 rounded-full"
                  style={{ background:`linear-gradient(90deg,${c},#0D3A6E)` }}/>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link to={path('services')} className="btn-outline group">
            {t.services.viewAll}<ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform"/>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Technical services teaser ──────────────────────────────
   Primary internal link into the technical services page from the homepage. */
export function HomeTechnical() {
  const { t, path } = useLang()
  const c = t.technical
  return (
    <section className="sec bg-white relative overflow-hidden">
      <div className="absolute inset-0 dots-light opacity-50 pointer-events-none"/>
      <div className="wrap relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}} variants={stg}>
            <motion.span variants={fUp} className="pill mb-5 inline-flex">{c.badge}</motion.span>
            <motion.h2 variants={fUp} className="h-lg text-slate-800 mb-5">
              {c.title.split('\n').map((l,i) => (
                <span key={i} className="block">{i>0 ? <span className="grad-text">{l}</span> : l}</span>
              ))}
            </motion.h2>
            <motion.p variants={fUp} className="text-slate-500 text-lg leading-relaxed mb-8">{c.subtitle}</motion.p>
            <motion.div variants={fUp} className="grid sm:grid-cols-2 gap-3 mb-9">
              {c.specs.slice(0,6).map(s => (
                <div key={s.title} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all">
                  <CheckCircle2 size={17} className="text-cyan flex-shrink-0 mt-0.5"/>
                  <span className="text-slate-600 text-sm font-medium">{s.title}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fUp} className="flex flex-wrap gap-3">
              <Link to={path('technical')} className="btn-primary group">
                {t.nav.technical}<ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform"/>
              </Link>
              <Link to={path('contact')} className="btn-outline">{c.ctaBtn}</Link>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}} variants={stg}
            className="grid grid-cols-2 gap-4">
            {c.stats.map(({ v, l }) => (
              <motion.div key={l} variants={fUp} className="card p-6 text-center hover:border-cyan/20 hover:shadow-card-md">
                <div className="text-[2.4rem] font-extrabold leading-none mb-2 grad-text" style={{ fontFamily:"'Sora',sans-serif" }}>{v}</div>
                <div className="text-slate-500 text-[13px] leading-snug">{l}</div>
              </motion.div>
            ))}
            <div className="col-span-2 flex items-center gap-3 p-5 rounded-2xl text-white"
              style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>
              <Wrench size={20} className="flex-shrink-0"/>
              <span className="text-sm font-semibold leading-snug">{c.introTitle}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Hydrogen banner ────────────────────────────────────── */
export function HomeHydrogenBanner() {
  const { t, path } = useLang()
  return (
    <section className="sec relative overflow-hidden"
      style={{ background:'linear-gradient(135deg,#EAF9FD 0%,#EBF0FF 60%,#F3EEFF 100%)' }}>
      <div className="absolute right-[-80px] top-[-80px] w-[420px] h-[420px] rounded-full opacity-[0.18] pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(0,194,224,.3),transparent 70%)' }}/>
      <div className="absolute left-[-80px] bottom-[-60px] w-[320px] h-[320px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(13,58,110,.25),transparent 70%)' }}/>
      <div className="wrap relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="pill mb-5 inline-flex">{t.hydrogen.badge}</span>
            <h2 className="h-lg text-slate-800 mb-5">
              {t.hydrogen.title.split('\n').map((l,i)=><span key={i} className={`block ${i>0?'grad-text':''}`}>{l}</span>)}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">{t.hydrogen.subtitle}</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {[t.hydrogen.why1,t.hydrogen.why2,t.hydrogen.why3,t.hydrogen.why4].map(w=>(
                <div key={w} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all">
                  <CheckCircle2 size={17} className="text-cyan flex-shrink-0 mt-0.5"/>
                  <span className="text-slate-600 text-sm font-medium">{w}</span>
                </div>
              ))}
            </div>
            <Link to={path('hydrogen')} className="btn-primary group">
              {t.hydrogen.exploreMore}<ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform"/>
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { flag:'🇲🇦', title:t.hydrogen.morocco, text:t.hydrogen.moroccoText, stats:[['3,000+','Sun hrs/yr'],['3,500 km','Coastline'],['52 GW','RE Target']] },
              { flag:'🇳🇱', title:t.hydrogen.europe,  text:t.hydrogen.europeText,  stats:[['10 MT','EU Import 2030'],['55%','GHG Target'],['€5.4B','Investment']] },
            ].map(({ flag, title, text, stats }) => (
              <div key={title} className="card p-6 group hover:shadow-card-md">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{flag}</span>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1 group-hover:text-cyan transition-colors text-[15px]"
                      style={{ fontFamily:"'Sora',sans-serif" }}>{title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-50">
                  {stats.map(([v,l])=>(
                    <div key={l} className="text-center p-2 rounded-xl" style={{ background:'rgba(0,194,224,.07)', border:'1px solid rgba(0,194,224,.15)' }}>
                      <div className="font-extrabold text-cyan text-base leading-none" style={{ fontFamily:"'Sora',sans-serif" }}>{v}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 p-4 rounded-2xl text-white"
              style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>
              <span className="text-2xl">🇲🇦</span>
              <div className="flex-1 h-0.5 rounded-full bg-white/30"/>
              <span className="text-sm font-bold text-white/90 text-center whitespace-nowrap">SLH Service Nederland</span>
              <div className="flex-1 h-0.5 rounded-full bg-white/30"/>
              <span className="text-2xl">🇳🇱</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA banner ─────────────────────────────────────────── */
export function HomeContactCTA() {
  const { t, path } = useLang()
  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background:'linear-gradient(135deg,#00C2E0 0%,#0D3A6E 100%)' }}>
      <div className="absolute inset-0 dots opacity-20 pointer-events-none"/>
      <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none"/>
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"/>
      <div className="wrap relative z-10 text-center">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <span className="pill-white mb-6 inline-flex">{t.footer.readyToCollaborate}</span>
          <h2 className="h-lg text-white mb-5 text-balance">{t.contact.title.replace('\n',' ')}</h2>
          <p className="text-white/75 text-lg mb-10 max-w-lg mx-auto">{t.contact.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={path('contact')} className="btn-white group">
              {t.common.contactUs}<ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform"/>
            </Link>
            <Link to={path('projects')} className="btn-ghost-white">{t.nav.projects}</Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

