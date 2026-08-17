import { useEffect, useState } from 'react'
import ImageMotif from './ImageMotif'

/**
 * A photo that cannot render broken.
 *
 * The motif is painted first and stays mounted; the photo fades in on top only once it
 * has actually decoded. A 404, a hotlink refusal, a blocked CDN or a slow connection
 * therefore degrades to a designed industrial graphic rather than a broken-image icon
 * or an empty box.
 *
 * `src` may be empty — that is treated as "no photo supplied yet", not as a failure,
 * so image slots can be wired up before the photography exists.
 *
 * @param {object}  props
 * @param {string}  props.src       URL to attempt; '' renders the motif alone.
 * @param {string}  props.alt       Descriptive alt text. Pass '' only for pure decoration.
 * @param {string}  props.motif     Fallback graphic key (see MOTIF in config/images.js).
 * @param {'light'|'dark'} [props.tone]
 * @param {boolean} [props.priority] Set on the LCP image: eager + high fetch priority.
 */
export default function SmartImage({
  src,
  alt = '',
  motif = 'engineering',
  tone = 'dark',
  priority = false,
  className = '',
  imgClassName = '',
}) {
  const [status, setStatus] = useState(src ? 'loading' : 'empty')

  // A slide's src can change (language switch, config edit) — restart the cycle.
  useEffect(() => { setStatus(src ? 'loading' : 'empty') }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ImageMotif motif={motif} tone={tone}/>

      {src && status !== 'failed' && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('failed')}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'auto'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
