import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { HomeContactCTA } from '../components/home/HomeSections'
import { ArrowRight, Zap, Leaf, Globe, TrendingUp, Users, BarChart3, Shield, Lightbulb } from 'lucide-react'
const fUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}} }
const stg  = { hidden:{}, show:{transition:{staggerChildren:.08}} }
export default function Services() {
  const { t, lang } = useLang()
  useSEO({ title:`${t.nav.services} | SLH Service Nederland`, description:t.services.subtitle, path:'/services', lang })
  const svcs = [
    {Icon:Zap,k:'s1',c:'#00C2E0'},{Icon:Leaf,k:'s2',c:'#22C55E'},{Icon:Globe,k:'s3',c:'#3B82F6'},
    {Icon:TrendingUp,k:'s4',c:'#8B5CF6'},{Icon:Users,k:'s5',c:'#F59E0B'},{Icon:BarChart3,k:'s6',c:'#EF4444'},
    {Icon:Shield,k:'s7',c:'#06B6D4'},{Icon:Lightbulb,k:'s8',c:'#14B8A6'},
  ]
  return (
    <Layout>
      <PageHero badge={t.services.badge} title={t.services.title} subtitle={t.services.subtitle}/>
      <section className="sec bg-white relative">
        <div className="absolute inset-0 opacity-35 pointer-events-none" style={{ backgroundImage:'linear-gradient(rgba(0,194,224,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,194,224,.04) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
        <div className="wrap relative">
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid md:grid-cols-2 gap-5">
            {svcs.map(({Icon,k,c})=>(
              <motion.div key={k} variants={fUp} className="group card shimmer p-7">
                <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background:`${c}14` }}>
                  <Icon size={24} style={{ color:c }}/>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{t.services[`${k}Title`]}</h3>
                <p className="text-slate-500 leading-relaxed">{t.services[`${k}Desc`]}</p>
                <div className="mt-5 h-[2px] rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background:`linear-gradient(90deg,${c},#0D3A6E)` }}/>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="sec relative" style={{ background:'linear-gradient(180deg,#F8FAFC,#fff)' }}>
        <div className="wrap">
          <div className="text-center mb-14">
            <span className="pill mb-5 inline-flex">Our Approach</span>
            <h2 className="h-lg text-slate-800">How We Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[['01','Discovery','We assess your goals and market landscape.'],['02','Strategy','We design a customized strategic roadmap.'],['03','Execution','We facilitate partnerships and project delivery.'],['04','Impact','We measure outcomes and optimize for long-term impact.']].map(([n,ti,tx])=>(
              <div key={n} className="group card p-7 text-center hover:border-cyan/20 hover:shadow-card-md">
                <div className="text-4xl font-extrabold mb-4 leading-none grad-text" style={{ fontFamily:"'Sora',sans-serif" }}>{n}</div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{ti}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tx}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeContactCTA/>
    </Layout>
  )
}
