/**
 * Designed fallbacks that sit behind every photo on the site.
 *
 * These are not "broken image" placeholders — each is a brand-coloured industrial
 * graphic that reads as an intentional design element. That matters, because it is
 * what a visitor sees whenever a photo is slow, missing, or blocked by their network.
 */

const PALETTE = {
  light: { bg: 'linear-gradient(145deg,#EAF9FD 0%,#E6EEFF 100%)', stroke: '#0D3A6E', accent: '#00C2E0', opacity: 0.30 },
  dark:  { bg: 'linear-gradient(160deg,#051C38 0%,#0D3A6E 55%,#007A91 100%)', stroke: '#8FD9EA', accent: '#00C2E0', opacity: 0.38 },
}

/* Isometric pipe run with flanges and elbows — piping / pipefitting work. */
function Piping({ stroke, accent, opacity }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth="2.5" opacity={opacity} strokeLinecap="round">
      <path d="M20 150 L110 100 L200 150 L290 100 L380 150"/>
      <path d="M20 178 L110 128 L200 178 L290 128 L380 178"/>
      {[[110, 100], [200, 150], [290, 100]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="11" stroke={accent} strokeWidth="3"/>
          <circle cx={x} cy={y + 28} r="11" stroke={accent} strokeWidth="3"/>
        </g>
      ))}
      <path d="M60 60 L60 210 M340 60 L340 210" strokeDasharray="7 9" opacity="0.55"/>
    </g>
  )
}

/* Weld seam with an arc burst — welding work. */
function Welding({ stroke, accent, opacity }) {
  return (
    <g fill="none" opacity={opacity} strokeLinecap="round">
      <path d="M30 165 L370 165" stroke={stroke} strokeWidth="14" opacity="0.35"/>
      <path d="M30 165 q22 -16 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0"
        stroke={accent} strokeWidth="4"/>
      <g stroke={accent} strokeWidth="3">
        {[[200, 90], [200, 118], [176, 104], [224, 104], [183, 87], [217, 87]].map(([x, y], i) => (
          <line key={i} x1="200" y1="150" x2={x} y2={y}/>
        ))}
      </g>
      <circle cx="200" cy="150" r="9" fill={accent} stroke="none"/>
      <path d="M30 205 L370 205" stroke={stroke} strokeWidth="2" strokeDasharray="6 10" opacity="0.5"/>
    </g>
  )
}

/* Heat exchanger coil and fan — heat pump, HVAC and cooling work. */
function Hvac({ stroke, accent, opacity }) {
  return (
    <g fill="none" opacity={opacity} strokeLinecap="round">
      <rect x="48" y="78" width="150" height="144" rx="14" stroke={stroke} strokeWidth="2.5"/>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <path key={i} d={`M68 ${100 + i * 21} h110`} stroke={accent} strokeWidth="3" opacity="0.85"/>
      ))}
      <circle cx="296" cy="150" r="62" stroke={stroke} strokeWidth="2.5"/>
      <g stroke={accent} strokeWidth="3.5">
        {[0, 60, 120, 180, 240, 300].map(a => (
          <path key={a} d="M296 150 L296 100" transform={`rotate(${a} 296 150)`}/>
        ))}
      </g>
      <circle cx="296" cy="150" r="13" fill={accent} stroke="none"/>
    </g>
  )
}

/* Technical drawing frame with dimension lines — engineering and 3D CAD work. */
function Engineering({ stroke, accent, opacity }) {
  return (
    <g fill="none" opacity={opacity} strokeLinecap="round">
      <rect x="52" y="62" width="296" height="176" rx="6" stroke={stroke} strokeWidth="2"/>
      <path d="M112 200 L112 104 L232 104 L232 200 Z" stroke={accent} strokeWidth="3"/>
      <path d="M112 104 L152 74 L272 74 L232 104" stroke={accent} strokeWidth="3"/>
      <path d="M232 200 L272 170 L272 74" stroke={accent} strokeWidth="3"/>
      <g stroke={stroke} strokeWidth="1.5" strokeDasharray="5 6" opacity="0.75">
        <path d="M112 224 L232 224 M112 218 L112 230 M232 218 L232 230"/>
        <path d="M84 104 L84 200 M78 104 L90 104 M78 200 L90 200"/>
      </g>
    </g>
  )
}

/* Neutral monogram frame — used where a person's photo is absent. */
function Portrait({ stroke, accent, opacity }) {
  return (
    <g fill="none" opacity={opacity} strokeLinecap="round">
      <circle cx="200" cy="126" r="46" stroke={accent} strokeWidth="3"/>
      <path d="M118 238 q82 -74 164 0" stroke={stroke} strokeWidth="3"/>
      <circle cx="200" cy="150" r="112" stroke={stroke} strokeWidth="1.5" strokeDasharray="6 10" opacity="0.6"/>
    </g>
  )
}

const SHAPES = { piping: Piping, welding: Welding, hvac: Hvac, engineering: Engineering, portrait: Portrait }

/**
 * @param {object}  props
 * @param {string}  props.motif  One of the keys in MOTIF (src/config/images.js).
 * @param {'light'|'dark'} [props.tone]  Match the surface the motif sits on.
 */
export default function ImageMotif({ motif = 'engineering', tone = 'dark', className = '' }) {
  const Shape = SHAPES[motif] || Engineering
  const p = PALETTE[tone] || PALETTE.dark

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background: p.bg }} aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <Shape stroke={p.stroke} accent={p.accent} opacity={p.opacity}/>
      </svg>
    </div>
  )
}
