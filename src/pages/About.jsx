import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { HomeContactCTA } from '../components/home/HomeSections'
import { CheckCircle2, Target, Eye, Award, Users, Globe } from 'lucide-react'
import Logo from '../components/ui/Logo'

const fUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}} }
const stg  = { hidden:{}, show:{transition:{staggerChildren:.09}} }

export default function About() {
  const { t, lang } = useLang()
  const { settings } = useData()
  useSEO({ title:`${t.nav.about} | SLH Service Nederland`, description:t.about.p1, path:'/about', lang })
  return (
    <Layout>
      <PageHero badge={t.about.badge} title={t.about.title} subtitle={t.about.p1}/>

      <section className="sec bg-white relative overflow-hidden">
        <div className="absolute inset-0 dots-light opacity-50 pointer-events-none"/>
        <div className="wrap relative">
          <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}} variants={stg}
            className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fUp}>
              <div className="relative max-w-[400px]">
                <div className="absolute -inset-6 rounded-full opacity-[0.22] pointer-events-none"
                  style={{ background:'radial-gradient(circle,rgba(0,194,224,.22),transparent 65%)' }}/>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-card-lg"
                  style={{ background:'linear-gradient(145deg,#EAF9FD,#E6EEFF)' }}>
                  <div className="absolute inset-0 dots-light opacity-40"/>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Logo h={65} variant="default" className="opacity-10 mb-10 grayscale"/>
                    {settings.ceoImage
                      ? <img src={settings.ceoImage} alt={settings.ceoName} className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-card-lg mb-5"/>
                      : <div className="w-36 h-36 rounded-full border-4 border-white shadow-card-lg flex items-center justify-center mb-5"
                          style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>
                          <span className="text-5xl font-extrabold text-white" style={{ fontFamily:"'Sora',sans-serif" }}>NG</span>
                        </div>
                    }
                    <p className="font-bold text-xl text-slate-800" style={{ fontFamily:"'Sora',sans-serif" }}>{settings.ceoName}</p>
                    <p className="text-cyan text-sm font-semibold mt-1">CEO & Founder</p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent"/>
                </div>
                <div className="absolute -bottom-4 -right-4 text-white rounded-2xl px-5 py-3 shadow-cyan"
                  style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>
                  <div className="text-2xl font-extrabold" style={{ fontFamily:"'Sora',sans-serif" }}>15+</div>
                  <div className="text-white/75 text-xs">Years Experience</div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={stg}>
              <motion.blockquote variants={fUp} className="italic text-slate-600 text-xl leading-relaxed mb-6 pl-5 border-l-[3px] border-cyan">
                "{t.about.missionText}"
              </motion.blockquote>
              <motion.p variants={fUp} className="text-slate-500 leading-relaxed mb-4 text-[15px]">{t.about.p1}</motion.p>
              <motion.p variants={fUp} className="text-slate-500 leading-relaxed mb-8 text-[15px]">{t.about.p2}</motion.p>
              {[{l:t.about.mission,tx:t.about.missionText,Icon:Target},{l:t.about.vision,tx:t.about.visionText,Icon:Eye}].map(({l,tx,Icon})=>(
                <motion.div key={l} variants={fUp} className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 mb-4 hover:border-cyan/20 hover:shadow-card transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(0,194,224,.10)' }}>
                    <Icon size={20} className="text-cyan"/>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm mb-1">{l}</div>
                    <div className="text-slate-500 text-sm leading-relaxed">{tx}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sec relative" style={{ background:'linear-gradient(180deg,#F8FAFC,#fff)' }}>
        <div className="wrap">
          <div className="text-center mb-14">
            <span className="pill mb-5 inline-flex">Our Values</span>
            <h2 className="h-lg text-slate-800">What Drives Us</h2>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {l:t.about.value1Title,tx:t.about.value1Text,Icon:Award,c:'#00C2E0'},
              {l:t.about.value2Title,tx:t.about.value2Text,Icon:Users,c:'#8B5CF6'},
              {l:t.about.value3Title,tx:t.about.value3Text,Icon:Globe,c:'#3B82F6'},
              {l:t.about.value4Title,tx:t.about.value4Text,Icon:CheckCircle2,c:'#22C55E'},
            ].map(v=>(
              <motion.div key={v.l} variants={fUp} className="group card shimmer p-6 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ background:`${v.c}14` }}>
                  <v.Icon size={26} style={{ color:v.c }}/>
                </div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{v.l}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.tx}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="sec bg-white">
        <div className="wrap">
          <div className="text-center mb-12">
            <span className="pill mb-5 inline-flex">Areas of Focus</span>
            <h2 className="h-lg text-slate-800">Our Expertise</h2>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {['Green Hydrogen Value Chains','Morocco–Netherlands Energy Corridor','International Economic Missions','Renewable Energy Ecosystems','Public–Private Partnership Development','Energy Transition Strategy','Investment Facilitation','EU Green Deal Alignment'].map(item=>(
              <motion.div key={item} variants={fUp} className="group flex items-center gap-3 p-4 card hover:border-cyan/20 hover:shadow-card-md">
                <CheckCircle2 size={16} className="text-cyan flex-shrink-0"/>
                <span className="text-slate-700 text-sm font-medium group-hover:text-navy transition-colors">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <HomeContactCTA/>
    </Layout>
  )
}
