import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * PageHero — used on all inner pages.
 * Matches the Home hero quality: dark image overlay, large white heading, cyan accent line,
 * clearly visible subtitle text, optional CTA button.
 */
export default function PageHero({ badge, title, subtitle, cta, ctaTo }) {
  const lines = (title || '').split('\n')
  return (
    <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>

      {/* Background — same deep navy gradient as hero slides */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg,#030F1F 0%,#0A2847 45%,#0D3A6E 75%,#005E78 100%)' }}/>

      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.6,
        }}/>

      {/* Cyan radial glow — right side, matches hero style */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 85% 50%, rgba(0,194,224,0.14), transparent 70%)' }}/>

      {/* Left text protection gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(3,15,35,0.55) 0%, rgba(3,15,35,0.25) 55%, transparent 80%)' }}/>

      {/* Decorative water-drop SVG */}
      <svg viewBox="0 0 70 92" width="70" height="92" fill="none"
        className="absolute right-[8%] top-[15%] hidden lg:block pointer-events-none"
        style={{ opacity: 0.12 }}
        aria-hidden="true">
        <path d="M35 3C35 3 3 35 3 57C3 77 18 89 35 89C52 89 67 77 67 57C67 35 35 3 35 3Z" fill="url(#phd_inner)"/>
        <defs>
          <linearGradient id="phd_inner" x1="35" y1="3" x2="35" y2="89" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.9"/>
            <stop offset="1" stopColor="#00C2E0" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <div className="wrap relative z-10 pt-36 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge pill */}
          {badge && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
              text-[11px] font-semibold tracking-[0.14em] uppercase
              text-white bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}/>
              {badge}
            </span>
          )}

          {/* Heading */}
          <h1
            className="font-extrabold text-white mb-6 text-balance leading-[1.1] tracking-tight"
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
            }}
          >
            {lines.map((line, i) => (
              <span key={i} className="block">
                {i > 0
                  ? <span style={{ color: '#00C2E0' }}>{line}</span>
                  : line
                }
              </span>
            ))}
          </h1>

          {/* Subtitle — bright and readable */}
          {subtitle && (
            <p
              className="text-lg leading-relaxed max-w-2xl font-normal"
              style={{
                color: 'rgba(255,255,255,0.88)',
                textShadow: '0 1px 6px rgba(0,0,0,0.45)',
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Optional CTA */}
          {cta && ctaTo && (
            <div className="mt-8">
              <Link to={ctaTo}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white border-2 border-white/40 hover:bg-white hover:text-navy-700 transition-all duration-300 group"
              >
                {cta}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform"/>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
