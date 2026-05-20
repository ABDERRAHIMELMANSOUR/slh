import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { HomeContactCTA } from '../components/home/HomeSections'
import { CheckCircle2, Zap, Battery, Ship, Factory } from 'lucide-react'
const fUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}} }
const stg  = { hidden:{}, show:{transition:{staggerChildren:.09}} }
export default function GreenHydrogen() {
  const { t, lang } = useLang()
  useSEO({ title:`${t.nav.hydrogen} | SLH Service Nederland`, description:'Green hydrogen value chains, Morocco-Netherlands.', path:'/hydrogen', lang })
  const chain=[{Icon:Zap,l:'Production',tx:'Solar & wind-powered electrolysis in Morocco',c:'#00C2E0'},{Icon:Battery,l:'Storage',tx:'Liquid hydrogen & ammonia carriers',c:'#8B5CF6'},{Icon:Ship,l:'Transport',tx:'Pipeline or shipping to European ports',c:'#3B82F6'},{Icon:Factory,l:'End Use',tx:'Industrial decarbonization in Netherlands & EU',c:'#22C55E'}]
  return (
    <Layout>
      <PageHero badge={t.hydrogen.badge} title={t.hydrogen.title} subtitle={t.hydrogen.subtitle}/>
      <section className="sec bg-white relative">
        <div className="wrap">
          <div className="text-center mb-14"><span className="pill mb-5 inline-flex">Value Chain</span><h2 className="h-lg text-slate-800">From Source to Market</h2></div>
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {chain.map(({Icon,l,tx,c},i)=>(
              <motion.div key={l} variants={fUp} className="group card shimmer p-6 text-center hover:border-cyan/20">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ background:`${c}14` }}><Icon size={26} style={{ color:c }}/></div>
                <div className="text-[10px] font-bold tracking-widest uppercase mb-2 grad-text">Step {i+1}</div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{l}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tx}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="sec relative" style={{ background:'linear-gradient(135deg,#EAF9FD,#E6EEFF,#EEF0FF)' }}>
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-8">
            {[{flag:'🇲🇦',ti:t.hydrogen.morocco,tx:t.hydrogen.moroccoText,stats:[['3,000+','Sun hrs/yr'],['3,500 km','Coastline'],['52 GW','RE Target']]},{flag:'🇳🇱',ti:t.hydrogen.europe,tx:t.hydrogen.europeText,stats:[['10 MT','EU 2030'],['55%','GHG Target'],['€5.4B','Investment']]}].map(({flag,ti,tx,stats})=>(
              <motion.div key={ti} initial={fUp.hidden} whileInView={fUp.show} viewport={{once:true}} className="card p-8 hover:border-cyan/20 hover:shadow-card-md">
                <div className="text-5xl mb-5">{flag}</div>
                <h3 className="h-md text-slate-800 mb-4" style={{ fontFamily:"'Sora',sans-serif" }}>{ti}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{tx}</p>
                <div className="grid grid-cols-3 gap-3">
                  {stats.map(([v,l])=>(
                    <div key={l} className="text-center p-3 rounded-2xl" style={{ background:'rgba(0,194,224,.08)', border:'1px solid rgba(0,194,224,.15)' }}>
                      <div className="font-extrabold text-cyan text-lg leading-none" style={{ fontFamily:"'Sora',sans-serif" }}>{v}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec bg-white">
        <div className="wrap">
          <div className="text-center mb-12"><span className="pill mb-5 inline-flex">{t.hydrogen.why}</span><h2 className="h-lg text-slate-800">Key Benefits</h2></div>
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[t.hydrogen.why1,t.hydrogen.why2,t.hydrogen.why3,t.hydrogen.why4].map(w=>(
              <motion.div key={w} variants={fUp} className="group card shimmer p-6 text-center hover:border-cyan/20">
                <CheckCircle2 size={32} className="text-cyan mx-auto mb-3 group-hover:scale-110 transition-transform"/>
                <p className="text-slate-700 font-semibold text-sm">{w}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <HomeContactCTA/>
    </Layout>
  )
}
