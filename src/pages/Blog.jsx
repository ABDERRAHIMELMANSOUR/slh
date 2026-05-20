import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import PageHero from '../components/ui/PageHero'
import { ArrowRight, Search, Globe, Clock, User } from 'lucide-react'
const fUp={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.65,ease:[.16,1,.3,1]}}}
const stg={hidden:{},show:{transition:{staggerChildren:.09}}}
export default function Blog() {
  const {t,lang}=useLang(); const {blog}=useData()
  const [q,setQ]=useState(''); const [cat,setCat]=useState('all')
  useSEO({title:`${t.nav.blog} | SLH Service Nederland`,description:t.blog.subtitle,path:'/blog',lang})
  const pub=blog.filter(p=>p.published)
  const cats=['all',...new Set(pub.map(p=>p.category).filter(Boolean))]
  const fil=pub.filter(p=>{const mc=cat==='all'||p.category===cat;const ms=!q||p.title.toLowerCase().includes(q.toLowerCase())||p.description.toLowerCase().includes(q.toLowerCase());return mc&&ms})
  const feat=fil[0]; const rest=fil.slice(1)
  return (
    <Layout>
      <PageHero badge={t.blog.badge} title={t.blog.title} subtitle={t.blog.subtitle}/>
      <section className="py-16 bg-white">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.blog.search} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-cyan focus:bg-white transition-all"/>
            </div>
            <div className="flex flex-wrap gap-2">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all capitalize ${cat===c?'text-white border-transparent':'bg-white text-slate-600 border-slate-200 hover:border-cyan/40 hover:text-cyan'}`} style={cat===c?{background:'linear-gradient(135deg,#00C2E0,#0D3A6E)'}:{}}>{c==='all'?t.blog.all:c}</button>)}</div>
          </div>
          {fil.length===0?<div className="text-center py-20 text-slate-400">{t.blog.noPosts}</div>:
            <>
              {feat&&(
                <Link to={`/blog/${feat.slug}`} className="group block card shimmer mb-8 overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="h-64 md:h-auto relative" style={{ background:'linear-gradient(135deg,#EAF9FD,#E6EEFF)',minHeight:'260px' }}>
                      {feat.image?<img src={feat.image} alt={feat.title} className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:scale-105 transition-transform duration-500"/>:<div className="absolute inset-0 flex items-center justify-center"><Globe size={48} className="text-cyan/20"/></div>}
                      <span className="absolute top-4 left-4 px-3 py-1 text-white text-xs font-bold rounded-full" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>Featured</span>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full" style={{ background:'rgba(0,194,224,.08)',border:'1px solid rgba(0,194,224,.22)',color:'#009AB5' }}>{feat.category}</span>
                        <span className="text-slate-400 text-xs flex items-center gap-1"><Clock size={11}/>{feat.readTime} {t.blog.minRead}</span>
                      </div>
                      <h2 className="font-extrabold text-slate-800 text-2xl md:text-3xl mb-3 group-hover:text-cyan transition-colors" style={{ fontFamily:"'Sora',sans-serif" }}>{feat.title}</h2>
                      <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">{feat.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-xs"><User size={12}/>{feat.author} · {feat.date}</div>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-cyan">{t.blog.readMore} <ArrowRight size={13}/></span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
              <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stg} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map(post=>(
                  <motion.div key={post.id} variants={fUp}>
                    <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full card shimmer overflow-hidden">
                      <div className="h-48 relative" style={{ background:'linear-gradient(135deg,#EAF9FD,#E6EEFF)' }}>
                        {post.image?<img src={post.image} alt={post.title} className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:scale-105 transition-transform duration-500"/>:<div className="flex items-center justify-center h-full"><Globe size={36} className="text-cyan/20"/></div>}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full" style={{ background:'rgba(0,194,224,.08)',border:'1px solid rgba(0,194,224,.22)',color:'#009AB5' }}>{post.category}</span>
                          <span className="text-slate-400 text-xs">{post.readTime} {t.blog.minRead}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan transition-colors line-clamp-2 flex-none" style={{ fontFamily:"'Sora',sans-serif",fontSize:'15px' }}>{post.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed flex-1 mb-4">{post.description}</p>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-cyan group-hover:gap-2.5 transition-all">{t.blog.readMore} <ArrowRight size={13}/></span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          }
        </div>
      </section>
    </Layout>
  )
}
