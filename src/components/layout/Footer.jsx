import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { useData } from '../../context/DataContext'
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from 'lucide-react'
import Logo from '../ui/Logo'

export default function Footer() {
  const { t } = useLang()
  const { settings } = useData()
  const year = new Date().getFullYear()

  const links1 = [
    { to:'/', label:t.nav.home },
    { to:'/about', label:t.nav.about },
    { to:'/services', label:t.nav.services },
    { to:'/hydrogen', label:t.nav.hydrogen },
    { to:'/projects', label:t.nav.projects },
    { to:'/events', label:t.nav.events },
  ]
  const links2 = [
    'Green Hydrogen Consulting',
    'Renewable Energy Strategy',
    'Economic Missions',
    'Investment Facilitation',
    'PPP Development',
    'Energy Transition Support',
  ]

  return (
    <footer>
      {/* CTA strip */}
      <div className="py-14 relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>
        <div className="absolute inset-0 dots opacity-[0.18] pointer-events-none"/>
        <div className="wrap flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2"
              style={{ fontFamily:"'Sora',sans-serif" }}>{t.contact.title.replace('\n',' ')}</h3>
            <p className="text-white/70 text-[15px] leading-relaxed">{t.footer.tagline}</p>
          </div>
          <Link to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-white font-semibold px-7 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group"
            style={{ color:'#0D3A6E' }}>
            {t.common.contactUs}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform"/>
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="bg-slate-900 text-white">
        <div className="wrap py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="bg-white rounded-xl px-3 py-2 inline-block mb-5 shadow-sm">
                <Logo h={34} variant="default"/>
              </div>
              <p className="text-slate-400 text-[14px] leading-relaxed mb-5">{t.footer.tagline}</p>
              <div className="space-y-3">
                {[
                  { Icon:Mail,   v:settings.email,   href:`mailto:${settings.email}` },
                  { Icon:Phone,  v:settings.phone,   href:`tel:${settings.phone}` },
                  { Icon:MapPin, v:settings.address },
                ].map(({ Icon, v, href }) => (
                  <div key={v} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background:'rgba(0,194,224,.12)' }}>
                      <Icon size={13} className="text-cyan"/>
                    </div>
                    {href
                      ? <a href={href} className="text-slate-400 hover:text-cyan text-[13px] transition-colors">{v}</a>
                      : <span className="text-slate-400 text-[13px]">{v}</span>
                    }
                  </div>
                ))}
              </div>
              <a href={settings.linkedIn} target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex w-9 h-9 rounded-xl bg-white/5 hover:bg-cyan/18 border border-white/10 hover:border-cyan/35 items-center justify-center text-slate-400 hover:text-cyan transition-all">
                <Linkedin size={14}/>
              </a>
            </div>
            {/* Quick links */}
            <div>
              <h4 className="text-white font-bold text-[11px] tracking-widest uppercase mb-5">{t.footer.quickLinks}</h4>
              <ul className="space-y-2.5">
                {links1.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="flex items-center gap-2 text-slate-400 hover:text-cyan text-[13px] transition-colors group">
                      <span className="w-1 h-1 rounded-full bg-cyan/40 group-hover:bg-cyan transition-colors flex-shrink-0"/>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-[11px] tracking-widest uppercase mb-5">{t.footer.services}</h4>
              <ul className="space-y-2.5">
                {links2.map(l => (
                  <li key={l} className="flex items-center gap-2 text-slate-500 text-[13px]">
                    <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0"/>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            {/* CEO */}
            <div>
              <h4 className="text-white font-bold text-[11px] tracking-widest uppercase mb-5">{t.footer.contact}</h4>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full border-2 border-cyan/28 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background:'linear-gradient(135deg,rgba(0,194,224,.22),rgba(13,58,110,.22))' }}>NG</div>
                  <div>
                    <div className="text-white font-semibold text-sm">{settings.ceoName}</div>
                    <div className="text-slate-500 text-xs">CEO & Founder</div>
                  </div>
                </div>
                <div className="h-px bg-white/[0.08]"/>
                <Link to="/contact"
                  className="block text-center py-2.5 rounded-xl text-cyan text-[13px] font-semibold hover:text-white transition-all"
                  style={{ background:'rgba(0,194,224,.08)', border:'1px solid rgba(0,194,224,.22)' }}>
                  {t.contact.scheduleCall}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/6">
          <div className="wrap py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">{t.footer.copyright.replace('2024', year)}</p>
            <div className="flex gap-5">
              <a href="#" className="text-slate-600 hover:text-slate-300 text-xs transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-slate-600 hover:text-slate-300 text-xs transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
