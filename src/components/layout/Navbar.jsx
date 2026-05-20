import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { Menu, X, ChevronDown, Globe, ArrowRight } from 'lucide-react'
import Logo from '../ui/Logo'

export default function Navbar() {
  const { t, lang, switchLang, LANGUAGES } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [drawer,   setDrawer]   = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const loc     = useLocation()
  const moreRef = useRef(null)
  const langRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    fn(); window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setDrawer(false); setMoreOpen(false); setLangOpen(false) }, [loc])
  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : '' }, [drawer])
  useEffect(() => {
    const fn = e => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const cur = LANGUAGES.find(l => l.code === lang)

  const primary = [
    { to: '/',         label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/projects', label: t.nav.projects },
    { to: '/contact',  label: t.nav.contact },
  ]
  const more = [
    { to: '/about',    label: t.nav.about },
    { to: '/hydrogen', label: t.nav.hydrogen },
    { to: '/events',   label: t.nav.events },
    { to: '/blog',     label: t.nav.blog },
    { to: '/partners', label: t.nav.partners },
  ]
  const moreActive = more.some(l =>
    loc.pathname === l.to || (l.to !== '/' && loc.pathname.startsWith(l.to))
  )

  const navLinkCls = (active) =>
    `relative px-3.5 py-2 rounded-lg text-[13.5px] font-semibold tracking-wide transition-all duration-200 ${
      active
        ? 'text-cyan-500 bg-cyan-50'
        : 'text-slate-600 hover:text-navy-600 hover:bg-slate-50'
    }`

  const ddItem = active =>
    `flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
      active
        ? 'text-cyan-500 bg-cyan-50 font-semibold'
        : 'text-slate-600 hover:text-navy-600 hover:bg-slate-50'
    }`

  const shadow = scrolled
    ? 'shadow-[0_2px_24px_rgba(0,0,0,0.09)]'
    : 'shadow-[0_1px_0_rgba(0,0,0,0.06)]'

  return (
    <>
      {/* ── Main bar — always white ── */}
      <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${shadow}`}>
        <div className="wrap">
          <div className="flex items-center h-[72px] gap-4">

            {/* Logo — always visible, solid */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 mr-4" aria-label="SLH Service Nederland">
              <Logo h={44} variant="default"/>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" aria-label="Primary navigation">
              {primary.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === '/'}
                  className={({ isActive }) => navLinkCls(isActive)}>
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-gradient-to-r from-cyan to-navy-600"/>
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(v => !v)}
                  className={`${navLinkCls(moreActive || moreOpen)} flex items-center gap-1`}
                >
                  More
                  <ChevronDown size={13} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}/>
                </button>
                {moreOpen && (
                  <div className="absolute top-full mt-1.5 right-0 w-52 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-50 p-1.5">
                    {more.map(({ to, label }) => (
                      <NavLink key={to} to={to} className={({ isActive }) => ddItem(isActive)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan to-navy-600 flex-shrink-0"/>
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right group */}
            <div className="flex items-center gap-2 ml-auto flex-shrink-0">

              {/* Language switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium border border-slate-200 text-slate-600 bg-slate-50 hover:border-cyan/40 hover:text-cyan-500 transition-all duration-200"
                  aria-label="Switch language"
                >
                  <Globe size={13}/>
                  <span className="hidden sm:inline">{cur?.nativeLabel}</span>
                  <span className="sm:hidden">{cur?.flag}</span>
                  <ChevronDown size={11} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}/>
                </button>
                {langOpen && (
                  <div className="absolute top-full mt-1.5 right-0 w-44 bg-white border border-slate-100 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-50 p-1.5">
                    {LANGUAGES.map(l => (
                      <button key={l.code}
                        onClick={() => { switchLang(l.code); setLangOpen(false) }}
                        className={ddItem(l.code === lang)}
                      >
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.nativeLabel}</span>
                        {l.dir === 'rtl' && <span className="ml-auto text-[9px] text-slate-400 font-mono">RTL</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA button */}
              <Link to="/contact" className="hidden md:flex btn-primary items-center gap-2 text-[13px] py-2.5 px-5">
                {t.nav.getInTouch}
                <ArrowRight size={14}/>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setDrawer(v => !v)}
                className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-navy-600 hover:bg-slate-50 transition-all"
                aria-label={drawer ? 'Close menu' : 'Open menu'}
              >
                {drawer ? <X size={18}/> : <Menu size={18}/>}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {drawer && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawer(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-[min(300px,88vw)] bg-white shadow-2xl border-l border-slate-100 flex flex-col lg:hidden transition-transform duration-300 ${drawer ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-slate-100 flex-shrink-0">
          <Logo h={40} variant="default"/>
          <button
            onClick={() => setDrawer(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all"
          >
            <X size={17}/>
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-3 pb-2 pt-1">Navigation</p>
          {[...primary, ...more].map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setDrawer(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-0.5 transition-all ${
                  isActive
                    ? 'text-cyan-500 bg-cyan-50 font-semibold'
                    : 'text-slate-600 hover:text-navy-600 hover:bg-slate-50'
                }`
              }
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 flex-shrink-0"/>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="p-4 border-t border-slate-100 space-y-3 flex-shrink-0">
          <div className="grid grid-cols-5 gap-1.5">
            {LANGUAGES.map(l => (
              <button key={l.code}
                onClick={() => { switchLang(l.code); setDrawer(false) }}
                className={`py-2 rounded-xl text-base text-center transition-all border ${
                  l.code === lang ? 'border-cyan/40 bg-cyan/[0.08]' : 'border-transparent hover:bg-slate-50'
                }`}
                title={l.nativeLabel}
              >
                {l.flag}
              </button>
            ))}
          </div>
          <Link to="/contact" onClick={() => setDrawer(false)}
            className="btn-primary w-full justify-center py-3.5 text-sm">
            {t.nav.getInTouch} <ArrowRight size={14}/>
          </Link>
        </div>
      </div>
    </>
  )
}
