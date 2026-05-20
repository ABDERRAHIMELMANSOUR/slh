import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { HomeContactCTA } from '../components/home/HomeSections'
import { MapPin, Calendar } from 'lucide-react'
const fUp={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}}}
const stg={hidden:{},show:{transition:{staggerChildren:.08}}}
function EC({ ev }) {
  const [op,setOp]=useState(false); const d=new Date(ev.date)
  return (
    <motion.div variants={fUp} className="group card shimmer overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-24 flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0 p-5 flex-shrink-0" style={{ background:'linear-gradient(135deg,#EAF9FD,#E6EEFF)' }}>
          <div className="text-3xl sm:text-4xl font-extrabold leading-none grad-text" style={{ fontFamily:"'Sora',sans-serif" }}>{d.getDate()}</div>
          <div className="text-slate-500 text-sm font-semibold">{d.toLocaleDateString('en',{month:'short'})}</div>
          <div className="text-slate-400 text-xs">{d.getFullYear()}</div>
        </div>
        <div className="flex-1 p-5 border-t sm:border-t-0 sm:border-l border-slate-100">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full" style={{ background:'rgba(0,194,224,.08)',border:'1px solid rgba(0,194,224,.22)',color:'#009AB5' }}>{ev.type}</span>
            <span className="flex items-center gap-1.5 text-slate-400 text-[11px]"><MapPin size={10}/>{ev.location}, {ev.country}</span>
            {ev.featured&&<span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-bold rounded-full">★ Featured</span>}
          </div>
          <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif",fontSize:'15px' }}>{ev.title}</h3>
          <p className={`text-slate-500 text-[13.5px] leading-relaxed ${op?'':'line-clamp-2'}`}>{ev.description}</p>
          {ev.description?.length>120&&<button onClick={()=>setOp(v=>!v)} className="text-cyan text-xs font-semibold mt-2 hover:underline">{op?'Less':'More'}</button>}
          {ev.gallery?.length>0&&<div className="flex gap-2 mt-3">{ev.gallery.slice(0,4).map((img,i)=><div key={i} className="w-10 h-10 rounded-xl overflow-hidden bg-slate-50 border border-slate-100"><img src={img} alt="" className="w-full h-full object-cover"/></div>)}</div>}
        </div>
      </div>
    </motion.div>
  )
}
export default function Events() {
  const {t,lang}=useLang(); const {events}=useData(); const [tab,setTab]=useState('upcoming')
  useSEO({title:`${t.nav.events} | SLH Service Nederland`,description:t.events.subtitle,path:'/events',lang})
  const now=new Date()
  const up=events.filter(e=>new Date(e.date)>=now).sort((a,b)=>new Date(a.date)-new Date(b.date))
  const pa=events.filter(e=>new Date(e.date)<now).sort((a,b)=>new Date(b.date)-new Date(a.date))
  const shown=tab==='upcoming'?up:pa
  return (
    <Layout>
      <PageHero badge={t.events.badge} title={t.events.title} subtitle={t.events.subtitle}/>
      <section className="py-16 bg-white relative">
        <div className="wrap">
          <div className="flex gap-2 mb-10">
            {[['upcoming',t.events.upcoming,up.length],['past',t.events.past,pa.length]].map(([k,l,c])=>(
              <button key={k} onClick={()=>setTab(k)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${tab===k?'text-white border-transparent':'bg-white text-slate-600 border-slate-200 hover:border-cyan/40 hover:text-cyan'}`} style={tab===k?{background:'linear-gradient(135deg,#00C2E0,#0D3A6E)'}:{}}>
                <Calendar size={14}/>{l}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${tab===k?'bg-white/20 text-white':'bg-slate-100 text-slate-500'}`}>{c}</span>
              </button>
            ))}
          </div>
          {shown.length===0?<div className="text-center py-20 text-slate-400">{t.events.noEvents}</div>:
            <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="space-y-4">{shown.map(ev=><EC key={ev.id} ev={ev}/>)}</motion.div>}
        </div>
      </section>
      <HomeContactCTA/>
    </Layout>
  )
}
