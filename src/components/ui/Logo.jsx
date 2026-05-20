/**
 * Logo — SLH Service Nederland
 *
 * variant="default"  → normal display (use on white/light backgrounds)
 * variant="invert"   → white version via CSS filter (use on dark/colored backgrounds)
 * variant="on-dark"  → displayed inside a white pill automatically
 *
 * The PNG has a white background, so on dark backgrounds wrap it in a white container
 * OR use variant="invert" for a white silhouette effect.
 */
export default function Logo({ h = 44, variant = 'default', className = '', style = {} }) {
  const base = { height: h, width: 'auto', display: 'block', objectFit: 'contain' }

  const filters = {
    default: {},
    invert:  { filter: 'brightness(0) invert(1)' },
    white:   { filter: 'brightness(0) invert(1)' },
  }

  return (
    <img
      src="/slh-logo.png"
      alt="SLH Service Nederland"
      style={{ ...base, ...(filters[variant] || {}), ...style }}
      className={className}
      draggable={false}
    />
  )
}
