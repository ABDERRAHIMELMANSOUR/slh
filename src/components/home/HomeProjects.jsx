import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../../context/LangContext'
import { useData } from '../../context/DataContext'
import { ArrowRight, MapPin, Clock, Users, Globe } from 'lucide-react'

const fUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}} }
const stg  = { hidden:{}, show:{transition:{staggerChildren:.09}} }

const HEADS = [
  'linear-gradient(135deg,#EAF9FD,#E6EEFF)',
  'linear-gradient(135deg,#E6EEFF,#EEF0FF)',
  'linear-gradient(135deg,#EAF9FD,#EDFDF4)',
]

function PCard({ p, i }) {
  return (
    <motion.div variants={fUp} className="group card shimmer overflow-hidden flex flex-col h-full">
      <div className="relative h-48 flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{ background: HEADS[i%3] }}>
        {p.image
          ? <img src={p.image} alt={p.title} className="w-full h-full object-cover absolute inset-0 opacity-75 group-hover:scale-105 transition-transform duration-500"/>
          : <svg viewBox="0 0 120 120" width="72" height="72" fill="none" className="opacity-[0.18]">
              <circle cx="60" cy="60" r="52" stroke="url(#pc)" strokeWidth="1.5"/>
              <circle cx="60" cy="60" r="32" stroke="url(#pc)" strokeWidth="1.5"/>
              <circle cx="60" cy="60" r="12" fill="url(#pc)" opacity=".5"/>
              {[[60,8],[60,112],[8,60],[112,60]].map(([x,y],j)=><circle key={j} cx={x} cy={y} r="7" fill="url(#pc)"/>)}
              <defs><linearGradient id="pc" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00C2E0"/><stop offset="1" stopColor="#0D3A6E"/>
              </linearGradient></defs>
            </svg>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-transparent"/>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
            style={{ background:p.status==='Active'?'linear-gradient(135deg,#00C2E0,#0D3A6E)':p.status==='Completed'?'linear-gradient(135deg,#22C55E,#16A34A)':'#94A3B8' }}>
            {p.status}
          </span>
          {p.category && <span className="px-2.5 py-0.5 bg-white/[0.08]0 backdrop-blur-sm text-slate-600 text-[10px] font-semibold rounded-lg">{p.category}</span>}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
          <span className="flex items-center gap-1"><MapPin size={10}/>{p.country}</span>
          {p.timeline && <><span>·</span><span className="flex items-center gap-1"><Clock size={10}/>{p.timeline}</span></>}
        </div>
        <h3 className="font-bold text-slate-800 mb-2.5 group-hover:text-cyan transition-colors line-clamp-2 flex-none"
          style={{ fontFamily:"'Sora',sans-serif", fontSize:'15px' }}>{p.title}</h3>
        <p className="text-slate-500 text-[13.5px] leading-relaxed line-clamp-3 flex-1 mb-4">{p.description}</p>
        {p.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.technologies.slice(0,3).map(t=>(
              <span key={t} className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full"
                style={{ background:'rgba(0,194,224,.08)', border:'1px solid rgba(0,194,224,.22)', color:'#009AB5' }}>{t}</span>
            ))}
          </div>
        )}
        {p.partners?.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-3 border-t border-slate-50">
            <Users size={11}/>{p.partners.slice(0,2).join(' · ')}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function HomeProjects() {
  const { t } = useLang()
  const { projects } = useData()
  return (
    <section className="sec bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-35 pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(0,194,224,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,194,224,.04) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
      <div className="wrap relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <span className="pill mb-4 inline-flex">{t.projects.badge}</span>
            <h2 className="h-lg text-slate-800">{t.projects.title}</h2>
          </div>
          <Link to="/projects" className="hidden sm:flex items-center gap-2 text-cyan font-semibold text-sm hover:gap-3 transition-all pb-1">
            {t.projects.viewAll} <ArrowRight size={14}/>
          </Link>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}} variants={stg}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0,3).map((p,i) => <PCard key={p.id} p={p} i={i}/>)}
        </motion.div>
        <div className="text-center mt-8 sm:hidden">
          <Link to="/projects" className="btn-outline gap-2">{t.projects.viewAll}<ArrowRight size={14}/></Link>
        </div>
      </div>
    </section>
  )
}

export function HomeNews() {
  const { t } = useLang()
  const { blog } = useData()
  const posts = blog.filter(p => p.published).slice(0,3)
  if (!posts.length) return null
  return (
    <section className="sec relative" style={{ background:'linear-gradient(180deg,#F8FAFC,#fff)' }}>
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <span className="pill mb-4 inline-flex">{t.blog.badge}</span>
            <h2 className="h-lg text-slate-800">{t.blog.title}</h2>
          </div>
          <Link to="/blog" className="hidden sm:flex items-center gap-2 text-cyan font-semibold text-sm hover:gap-3 transition-all pb-1">{t.blog.viewAll} <ArrowRight size={14}/></Link>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map(post => (
            <motion.div key={post.id} variants={fUp}>
              <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full card shimmer overflow-hidden">
                <div className="h-44 relative flex items-center justify-center" style={{ background:'linear-gradient(135deg,#EAF9FD,#E6EEFF)' }}>
                  {post.image
                    ? <img src={post.image} alt={post.title} className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:scale-105 transition-transform duration-500"/>
                    : <Globe size={38} className="text-cyan/20"/>
                  }
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full" style={{ background:'rgba(0,194,224,.08)', border:'1px solid rgba(0,194,224,.22)', color:'#009AB5' }}>{post.category}</span>
                    <span className="text-slate-400 text-[11px]">{post.readTime} {t.blog.minRead}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors line-clamp-2 flex-none"
                    style={{ fontFamily:"'Sora',sans-serif", fontSize:'15px' }}>{post.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed flex-1 mb-4">{post.description}</p>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-cyan group-hover:gap-2.5 transition-all">
                    {t.blog.readMore} <ArrowRight size={13}/>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function HomePartners() {
  const { t } = useLang()
  const { partners } = useData()
  const active = partners.filter(p => p.active)
  if (!active.length) return null
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="wrap">
        <p className="text-center text-[10px] font-bold text-slate-400 tracking-[.2em] uppercase mb-8">{t.partners.badge}</p>
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="flex flex-wrap justify-center items-center gap-4">
          {active.map(p => (
            <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 bg-slate-50 hover:bg-white border border-slate-100 hover:border-cyan/25 rounded-2xl shadow-card hover:shadow-card-md transition-all duration-300 hover:-translate-y-0.5">
              {p.logo
                ? <img src={p.logo} alt={p.name} className="h-6 w-auto grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all"/>
                : <><Globe size={14} className="text-slate-400 group-hover:text-cyan transition-colors"/><span className="text-slate-600 group-hover:text-navy font-semibold text-sm">{p.name}</span></>
              }
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
