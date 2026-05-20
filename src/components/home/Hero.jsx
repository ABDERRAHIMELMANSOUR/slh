import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { useData } from '../../context/DataContext'

const SLIDES = [
  {
    id: 1,
    bg: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&w=1800&q=80',
    kicker: 'Green Hydrogen · Morocco–Netherlands',
    title: ['Driving International', 'Green Hydrogen', 'Partnerships'],
    accent: 2,
    sub: 'SLH Service Nederland builds strategic alliances and develops green hydrogen value chains connecting Morocco, the Netherlands, and Europe\'s clean energy future.',
    cta1: { label: 'Explore Projects', to: '/projects' },
    cta2: { label: 'Our Services',     to: '/services' },
  },
  {
    id: 2,
    bg: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&w=1800&q=80',
    kicker: 'Renewable Energy · Innovation',
    title: ['Connecting Morocco &', 'Europe Through', 'Sustainable Innovation'],
    accent: 2,
    sub: 'Accelerating the energy transition through high-impact economic missions, bilateral partnerships, and renewable energy ecosystem development.',
    cta1: { label: 'Green Hydrogen',  to: '/hydrogen' },
    cta2: { label: 'Contact Us',      to: '/contact' },
  },
  {
    id: 3,
    bg: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&w=1800&q=80',
    kicker: 'Strategic Consulting · Energy Transition',
    title: ['Strategic Consulting', 'for the Global', 'Energy Transition'],
    accent: 2,
    sub: 'Expert advisory on investment facilitation, public-private partnerships, and regulatory frameworks for sustainable industrial development across two continents.',
    cta1: { label: 'About SLH',    to: '/about' },
    cta2: { label: 'Our Partners', to: '/partners' },
  },
  {
    id: 4,
    bg: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&w=1800&q=80',
    kicker: 'Economic Missions · International Delegations',
    title: ['Leading International', 'Economic Missions &', 'Delegations'],
    accent: 1,
    sub: 'Organizing high-level bilateral trade missions, ministerial delegations, and B2B matchmaking events at the global intersection of clean energy diplomacy.',
    cta1: { label: 'Events & Missions', to: '/events' },
    cta2: { label: 'Get in Touch',      to: '/contact' },
  },
]

/* static drop SVGs so gradient IDs never collide */
function Drops() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
      <svg viewBox="0 0 90 118" width="90" height="118" fill="none"
        className="absolute top-[8%] right-[5%] opacity-[0.18] animate-float">
        <path d="M45 3C45 3 4 42 4 68C4 92 22 115 45 115C68 115 86 92 86 68C86 42 45 3 45 3Z" fill="url(#da)"/>
        <ellipse cx="34" cy="62" rx="9" ry="15" fill="rgba(255,255,255,.22)" transform="rotate(-18,34,62)"/>
        <defs>
          <linearGradient id="da" x1="45" y1="3" x2="45" y2="115" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity=".8"/>
            <stop offset="1" stopColor="#00C2E0" stopOpacity=".4"/>
          </linearGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 62 81" width="62" height="81" fill="none"
        className="absolute bottom-[28%] right-[10%] opacity-[0.14] animate-float-alt">
        <path d="M31 2C31 2 3 30 3 50C3 67 16 79 31 79C46 79 59 67 59 50C59 30 31 2 31 2Z" fill="url(#db)"/>
        <defs>
          <linearGradient id="db" x1="31" y1="2" x2="31" y2="79" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity=".6"/>
            <stop offset="1" stopColor="#00C2E0" stopOpacity=".3"/>
          </linearGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 44 57" width="44" height="57" fill="none"
        className="absolute top-[22%] right-[18%] opacity-[0.12] animate-float-sm">
        <path d="M22 2C22 2 2 22 2 36C2 47 11 55 22 55C33 55 42 47 42 36C42 22 22 2 22 2Z" fill="url(#dc)"/>
        <defs>
          <linearGradient id="dc" x1="22" y1="2" x2="22" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3FCEED" stopOpacity=".7"/>
            <stop offset="1" stopColor="#0D3A6E" stopOpacity=".3"/>
          </linearGradient>
        </defs>
      </svg>
      {/* soft glow blob */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(0,194,224,.1) 0%,transparent 65%)', transform:'translate(30%,-20%)' }}/>
    </div>
  )
}

const textV = {
  enter:  { opacity:0, y:30, filter:'blur(4px)' },
  show:   { opacity:1, y:0,  filter:'blur(0px)', transition:{ duration:.72, ease:[.16,1,.3,1] } },
  exit:   { opacity:0, y:-18, filter:'blur(2px)', transition:{ duration:.35 } },
}
const kickV = {
  enter:  { opacity:0, x:-22 },
  show:   { opacity:1, x:0, transition:{ duration:.6, ease:[.16,1,.3,1], delay:.1 } },
  exit:   { opacity:0, transition:{ duration:.25 } },
}
const ctaV = {
  enter:  { opacity:0, y:18 },
  show:   { opacity:1, y:0,  transition:{ duration:.6, ease:[.16,1,.3,1], delay:.32 } },
  exit:   { opacity:0, transition:{ duration:.2 } },
}

export default function Hero() {
  const { t } = useLang()
  const { settings } = useData()
  const { heroStats } = settings

  const [cur,     setCur]     = useState(0)
  const [playing, setPlaying] = useState(true)
  const [loaded,  setLoaded]  = useState({})
  const timerRef = useRef(null)

  const goTo = useCallback(i => setCur(i), [])
  const next = useCallback(() => setCur(c => (c+1) % SLIDES.length), [])
  const prev = useCallback(() => setCur(c => (c-1+SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (!playing) { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(next, 6000)
    return () => clearInterval(timerRef.current)
  }, [playing, next])

  const slide = SLIDES[cur]
  const stats = [
    { v: heroStats.years,     l: t.hero.stat1Label },
    { v: heroStats.countries, l: t.hero.stat2Label },
    { v: heroStats.projects,  l: t.hero.stat3Label },
    { v: heroStats.partners,  l: t.hero.stat4Label },
  ]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-navy-900">

      {/* Bg images */}
      {SLIDES.map((s, i) => (
        <div key={s.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity:i===cur?1:0, zIndex:1 }}>
          <img src={s.bg} alt="" className="w-full h-full object-cover"
            onLoad={() => setLoaded(p => ({ ...p, [i]:true }))}/>
          {!loaded[i] && (
            <div className="absolute inset-0"
              style={{ background:'linear-gradient(135deg,#051C38,#0D3A6E,#007A91)' }}/>
          )}
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-10"
        style={{ background:'linear-gradient(160deg,rgba(3,18,40,.96) 0%,rgba(8,40,85,.88) 40%,rgba(5,28,56,.75) 70%,rgba(0,90,115,.55) 100%)' }}/>
      {/* Extra left-side text protection */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:11 }}
        style={{ background:'linear-gradient(90deg,rgba(3,15,35,.70) 0%,rgba(3,15,35,.40) 50%,transparent 75%)' }}/>

      {/* Dot texture */}
      <div className="absolute inset-0 z-20 dots opacity-25 pointer-events-none"/>

      {/* Decorative drops (z-above overlay) */}
      <div className="relative" style={{ zIndex:25 }}><Drops/></div>

      {/* ── Content ── */}
      <div className="relative z-30 flex-1 flex items-center">
        <div className="wrap w-full pt-24 pb-8">
          <div className="max-w-[720px]">

            <AnimatePresence mode="wait">
              <motion.div key={`k-${cur}`} variants={kickV} initial="enter" animate="show" exit="exit">
                <span className="pill-white mb-7 inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse flex-shrink-0"/>
                  {slide.kicker}
                </span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1 key={`t-${cur}`} variants={textV} initial="enter" animate="show" exit="exit"
                className="h-xl text-white mb-5 text-balance"
                style={{ textShadow:'0 2px 12px rgba(0,0,0,0.45)' }}>
                {slide.title.map((line, i) => (
                  <span key={i} className="block">
                    {i === slide.accent
                      ? <span style={{ color:'#00C2E0' }}>{line}</span>
                      : line}
                  </span>
                ))}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p key={`s-${cur}`} variants={textV} initial="enter" animate="show" exit="exit"
                transition={{ delay:.18 }}
                className="text-white/90 text-lg md:text-[1.2rem] leading-relaxed mb-9 max-w-[600px] font-normal"
                style={{ textShadow:'0 1px 4px rgba(0,0,0,0.5)' }}>
                {slide.sub}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`c-${cur}`} variants={ctaV} initial="enter" animate="show" exit="exit"
                className="flex flex-col sm:flex-row gap-4">
                <Link to={slide.cta1.to} className="btn-white text-base px-8 py-4 group">
                  {slide.cta1.label}
                  <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform"/>
                </Link>
                <Link to={slide.cta2.to} className="btn-ghost-white text-base px-8 py-4">
                  {slide.cta2.label}
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* ── Slide controls — inside content, never overlaps stats bar ── */}
            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => setPlaying(v => !v)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all flex-shrink-0"
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>
                {playing ? <Pause size={11}/> : <Play size={11}/>}
              </button>
              <div className="flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i+1}`}
                    className={`rounded-full transition-all duration-300 ${i===cur ? 'w-8 h-2.5 bg-cyan' : 'w-2.5 h-2.5 hover:bg-white/50'}`}
                    style={{ background: i===cur ? undefined : 'rgba(255,255,255,0.35)' }}
                  />
                ))}
              </div>
              {playing && (
                <div className="w-16 h-0.5 rounded-full overflow-hidden ml-1" style={{ background:'rgba(255,255,255,0.18)' }}>
                  <div key={`prog-${cur}`} className="h-full bg-cyan rounded-full slide-progress"/>
                </div>
              )}
              {/* Scroll cue — desktop only */}
              <div className="hidden md:flex items-center gap-2 ml-auto opacity-50">
                <ChevronDown size={12} className="text-white animate-bounce"/>
                <span className="text-white text-[9px] tracking-[.2em] uppercase">Scroll</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom vignette for stats bar depth */}
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none" style={{ zIndex:25 }}
        style={{ background:'linear-gradient(to top, rgba(3,15,35,.65) 0%, transparent 100%)' }}/>

      {/* ── Stats bar ── */}
      <div className="relative z-30">
        <div style={{ background:'rgba(0,0,0,.35)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', borderTop:'1px solid rgba(255,255,255,.10)' }}>
          <div className="wrap">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map(({ v, l }, i) => (
                <div key={i} className="px-5 py-5 text-center group hover:bg-white/5 transition-colors cursor-default">
                  <div className="text-[2.2rem] font-extrabold text-white leading-none mb-0.5"
                    style={{ fontFamily:"'Sora',sans-serif" }}>{v}</div>
                  <div className="text-white/70 text-[11px] font-medium tracking-wider uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <button onClick={prev} className="absolute z-30 left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 hidden md:flex">
        <ChevronLeft size={19}/>
      </button>
      <button onClick={next} className="absolute z-30 right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 hidden md:flex">
        <ChevronRight size={19}/>
      </button>




    </section>
  )
}
