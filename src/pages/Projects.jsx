import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { HomeContactCTA } from '../components/home/HomeSections'
import { MapPin, Clock, Users } from 'lucide-react'
const fUp={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}}}
const stg={hidden:{},show:{transition:{staggerChildren:.08}}}
const HEADS=['linear-gradient(135deg,#EAF9FD,#E6EEFF)','linear-gradient(135deg,#E6EEFF,#EEF0FF)','linear-gradient(135deg,#EAF9FD,#EDFDF4)','linear-gradient(135deg,#FEF9ED,#E6EEFF)']
function PC({ p, i }) {
  const [ex,setEx]=useState(false)
  return (
    <motion.div variants={fUp} className="group card shimmer overflow-hidden flex flex-col">
      <div className="relative h-48 flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ background:HEADS[i%4] }}>
        {p.image?<img src={p.image} alt={p.title} className="w-full h-full object-cover absolute inset-0 opacity-75 group-hover:scale-105 transition-transform duration-500"/>:
          <svg viewBox="0 0 120 120" width="72" height="72" fill="none" className="opacity-[0.18]"><circle cx="60" cy="60" r="52" stroke="url(#pcc)" strokeWidth="1.5"/><circle cx="60" cy="60" r="32" stroke="url(#pcc)" strokeWidth="1.5"/><circle cx="60" cy="60" r="12" fill="url(#pcc)" opacity=".5"/><defs><linearGradient id="pcc" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#00C2E0"/><stop offset="1" stopColor="#0D3A6E"/></linearGradient></defs></svg>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-transparent"/>
        <div className="absolute bottom-3 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white" style={{ background:p.status==='Active'?'linear-gradient(135deg,#00C2E0,#0D3A6E)':p.status==='Completed'?'linear-gradient(135deg,#22C55E,#16A34A)':'#94A3B8' }}>{p.status}</span>
          {p.category&&<span className="px-2.5 py-0.5 bg-white/[0.08]0 text-slate-600 text-[10px] font-semibold rounded-lg">{p.category}</span>}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
          <span className="flex items-center gap-1"><MapPin size={10}/>{p.country}</span>
          {p.timeline&&<><span>·</span><span className="flex items-center gap-1"><Clock size={10}/>{p.timeline}</span></>}
        </div>
        <h3 className="font-bold text-slate-800 mb-2.5 group-hover:text-cyan transition-colors line-clamp-2 flex-none" style={{ fontFamily:"'Sora',sans-serif",fontSize:'15px' }}>{p.title}</h3>
        <p className={`text-slate-500 text-[13.5px] leading-relaxed flex-1 mb-3 ${ex?'':'line-clamp-3'}`}>{p.description}</p>
        {p.description?.length>150&&<button onClick={()=>setEx(v=>!v)} className="text-cyan text-xs font-semibold mb-3 text-left hover:underline">{ex?'Less':'More'}</button>}
        {p.technologies?.length>0&&<div className="flex flex-wrap gap-1.5 mb-3">{p.technologies.map(t=><span key={t} className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full" style={{ background:'rgba(0,194,224,.08)',border:'1px solid rgba(0,194,224,.22)',color:'#009AB5' }}>{t}</span>)}</div>}
        {p.partners?.length>0&&<div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-3 border-t border-slate-50"><Users size={11}/>{p.partners.slice(0,2).join(' · ')}</div>}
      </div>
    </motion.div>
  )
}
export default function Projects() {
  const {t,lang}=useLang(); const {projects}=useData(); const [f,setF]=useState('All')
  useSEO({title:`${t.nav.projects} | SLH Service Nederland`,description:t.projects.subtitle,path:'/projects',lang})
  const cats=['All',...new Set(projects.map(p=>p.category).filter(Boolean))]
  const shown=f==='All'?projects:projects.filter(p=>p.category===f)
  return (
    <Layout>
      <PageHero badge={t.projects.badge} title={t.projects.title} subtitle={t.projects.subtitle}/>
      <section className="py-16 bg-white relative">
        <div className="wrap">
          <div className="flex flex-wrap gap-2 mb-10">{cats.map(c=><button key={c} onClick={()=>setF(c)} className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${f===c?'text-white border-transparent':'bg-white text-slate-600 border-slate-200 hover:border-cyan/40 hover:text-cyan'}`} style={f===c?{background:'linear-gradient(135deg,#00C2E0,#0D3A6E)'}:{}}>{c}</button>)}</div>
          {shown.length===0?<div className="text-center py-20 text-slate-400">{t.projects.noProjects}</div>:
            <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {shown.map((p,i)=><PC key={p.id} p={p} i={i}/>)}
            </motion.div>}
        </div>
      </section>
      <HomeContactCTA/>
    </Layout>
  )
}
