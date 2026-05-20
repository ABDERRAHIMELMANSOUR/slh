import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useData } from '../context/DataContext'
import useSEO from '../hooks/useSEO'
import Layout from '../components/layout/Layout'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
export default function BlogPost() {
  const {slug}=useParams(); const {t,lang}=useLang(); const {blog}=useData()
  const post=blog.find(p=>p.slug===slug)
  useSEO({title:post?`${post.title} | SLH Service Nederland`:'Article | SLH',description:post?.description||'',path:`/blog/${slug}`,lang})
  if (!post) return <Layout><div className="pt-32 pb-24 text-center wrap"><h1 className="text-3xl font-extrabold text-slate-800 mb-4" style={{ fontFamily:"'Sora',sans-serif" }}>Article not found</h1><Link to="/blog" className="btn-primary gap-2"><ArrowLeft size={16}/>Back to Blog</Link></div></Layout>
  return (
    <Layout>
      <div className="relative pt-32 pb-20 overflow-hidden" style={{ background:'linear-gradient(160deg,#051C38,#0D3A6E,#005E78)' }}>
        <div className="absolute inset-0 dots opacity-[0.22] pointer-events-none"/>
        <div className="wrap relative z-10 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/55 hover:text-white text-sm font-medium mb-8 transition-colors"><ArrowLeft size={14}/>{t.blog.viewAll}</Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white" style={{ background:'rgba(0,194,224,.3)',border:'1px solid rgba(0,194,224,.4)' }}>{post.category}</span>
            <span className="text-white/50 text-sm flex items-center gap-1.5"><Clock size={13}/>{post.readTime} {t.blog.minRead}</span>
          </div>
          <h1 className="font-extrabold text-white mb-5 leading-tight text-balance" style={{ fontFamily:"'Sora',sans-serif",fontSize:'clamp(1.8rem,4vw,3rem)' }}>{post.title}</h1>
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <span className="flex items-center gap-1.5"><User size={13}/>{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13}/>{post.date}</span>
          </div>
        </div>
      </div>
      <article className="py-16 bg-white">
        <div className="wrap max-w-4xl">
          {post.image&&<img src={post.image} alt={post.title} className="w-full rounded-3xl mb-12 shadow-card-lg"/>}
          <div className="text-slate-600 leading-relaxed">
            <p className="text-xl text-slate-700 mb-6 font-medium">{post.description}</p>
            <p className="mb-4">This article provides expert analysis on {post.title}. SLH Service Nederland offers world-class consulting in green hydrogen, energy transition, and Morocco-Netherlands strategic partnerships.</p>
            <p>For more information, contact us at <a href="mailto:contact@slhservice.nl" className="text-cyan hover:underline">contact@slhservice.nl</a>.</p>
          </div>
          {post.tags?.length>0&&<div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-slate-100">{post.tags.map(tag=><span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-100">#{tag}</span>)}</div>}
        </div>
      </article>
    </Layout>
  )
}
