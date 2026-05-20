import { motion } from 'framer-motion'
export default function SectionTitle({ badge, title, subtitle, light=false, center=false }) {
  const lines = title.split('\n')
  return (
    <motion.div className={`${center?'text-center':''} mb-12 md:mb-16`}
      initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.65,ease:[.16,1,.3,1]}}>
      {badge && <span className={`mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[.14em] uppercase ${light?'text-white/90 bg-white/10 border border-white/20':'text-cyan bg-cyan/[0.08] border border-cyan/20'}`}>{badge}</span>}
      <h2 className={`font-extrabold leading-tight mb-4 text-4xl md:text-5xl ${light?'text-white':'text-slate-800'}`} style={{ fontFamily:"'Sora',sans-serif" }}>
        {lines.map((line,i) => (
          <span key={i} className="block">
            {i===lines.length-1&&lines.length>1
              ? <span className={light?'text-cyan-300':'grad-text'}>{line}</span>
              : line}
          </span>
        ))}
      </h2>
      {subtitle && <p className={`text-lg leading-relaxed max-w-2xl ${center?'mx-auto':''} ${light?'text-white/70':'text-slate-500'}`}>{subtitle}</p>}
    </motion.div>
  )
}
