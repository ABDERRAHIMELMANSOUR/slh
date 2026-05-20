import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { HomeContactCTA } from '../components/home/HomeSections'
import { Globe, ExternalLink } from 'lucide-react'
const fUp={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}}}
const stg={hidden:{},show:{transition:{staggerChildren:.08}}}
export default function Partners() {
  const {t,lang}=useLang(); const {partners}=useData()
  useSEO({title:`${t.nav.partners} | SLH Service Nederland`,description:t.partners.subtitle,path:'/partners',lang})
  const active=partners.filter(p=>p.active)
  return (
    <Layout>
      <PageHero badge={t.partners.badge} title={t.partners.title} subtitle={t.partners.subtitle}/>
      <section className="sec bg-white">
        <div className="wrap">
          {active.length===0?<div className="text-center py-20 text-slate-400">{t.partners.noPartners}</div>:
            <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {active.map(p=>(
                <motion.div key={p.id} variants={fUp}>
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center text-center p-6 card shimmer h-full hover:border-cyan/20 hover:shadow-card-md">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:border-cyan/25 group-hover:bg-cyan/5 transition-all">
                      {p.logo?<img src={p.logo} alt={p.name} className="w-10 h-10 object-contain"/>:<Globe size={28} className="text-slate-400 group-hover:text-cyan transition-colors"/>}
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{p.name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3 flex-1">{p.description}</p>
                    <div className="flex items-center gap-1.5 text-cyan text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Visit <ExternalLink size={11}/></div>
                  </a>
                </motion.div>
              ))}
            </motion.div>}
        </div>
      </section>
      <section className="py-20 bg-slate-50">
        <div className="wrap text-center">
          <h2 className="h-lg text-slate-800 mb-4" style={{ fontFamily:"'Sora',sans-serif" }}>{t.partners.bePartner}</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">Join our growing network of strategic partners driving the global green hydrogen and energy transition forward.</p>
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </section>
      <HomeContactCTA/>
    </Layout>
  )
}
