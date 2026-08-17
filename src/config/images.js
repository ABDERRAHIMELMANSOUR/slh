/**
 * Every photographic asset on the site, in one place.
 *
 * HOW IMAGE LOADING WORKS HERE
 * ----------------------------
 * Each entry has a `src` and a `motif`. `SmartImage` renders the motif — a designed,
 * brand-coloured industrial graphic — underneath the photo at all times. If the photo
 * loads, it fades in over the motif. If it 404s, is hotlink-blocked, or is blocked by a
 * corporate/CDN proxy, the motif simply stays. The result is that a failed image can
 * never leave a broken icon or an empty box on the page.
 *
 * SWAPPING IN REAL PROJECT PHOTOGRAPHY
 * ------------------------------------
 * Self-hosting is the only way to make photos genuinely reliable — a third-party host
 * can rate-limit, change its hotlink policy, or be blocked on the visitor's network.
 * To self-host: drop the file into `public/images/` using the filename in `local`
 * below, and nothing else needs to change — `resolveSrc` prefers the local file
 * whenever `USE_LOCAL_PHOTOS` is on.
 *
 * Real photographs of SLH's own welding, pipefitting and installation work are worth
 * more here than stock: they are unique content, they carry the company's actual
 * capability, and Google rewards original imagery on a service page.
 */

/**
 * Flip to `true` once the files listed under `local` exist in `public/images/`.
 * Left off so the site keeps its current imagery until real photos are supplied.
 */
export const USE_LOCAL_PHOTOS = false

/** Motif keys understood by `ImageMotif` — pick the one matching the subject. */
export const MOTIF = {
  piping: 'piping',
  welding: 'welding',
  hvac: 'hvac',
  engineering: 'engineering',
  portrait: 'portrait',
}

/**
 * Homepage hero backgrounds, in slide order. `altKey` resolves against
 * `t.imageAlt.*` so the alt text is written in the visitor's language.
 */
export const HERO_IMAGES = [
  {
    local: '/images/hero-technical-engineering.jpg',
    remote: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&w=1800&q=80',
    motif: MOTIF.engineering,
    altKey: 'heroEngineering',
  },
  {
    local: '/images/hero-welding-pipefitting.jpg',
    remote: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&w=1800&q=80',
    motif: MOTIF.welding,
    altKey: 'heroWelding',
  },
  {
    local: '/images/hero-green-hydrogen.jpg',
    remote: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&w=1800&q=80',
    motif: MOTIF.piping,
    altKey: 'heroHydrogen',
  },
  {
    local: '/images/hero-economic-missions.jpg',
    remote: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&w=1800&q=80',
    motif: MOTIF.engineering,
    altKey: 'heroMissions',
  },
]

/**
 * Craft gallery on the technical services page. These slots are live and resilient
 * today; dropping the named files into `public/images/` turns them into photographs.
 */
export const TECHNICAL_GALLERY = [
  { local: '/images/work-industrial-welding.jpg',  remote: '', motif: MOTIF.welding,     altKey: 'workWelding' },
  { local: '/images/work-pipefitting.jpg',         remote: '', motif: MOTIF.piping,      altKey: 'workPipefitting' },
  { local: '/images/work-heat-pump-install.jpg',   remote: '', motif: MOTIF.hvac,        altKey: 'workHeatPump' },
  { local: '/images/work-3d-engineering.jpg',      remote: '', motif: MOTIF.engineering, altKey: 'work3d' },
  { local: '/images/work-food-pharma-piping.jpg',  remote: '', motif: MOTIF.piping,      altKey: 'workFoodPharma' },
  { local: '/images/work-building-utilities.jpg',  remote: '', motif: MOTIF.hvac,        altKey: 'workUtilities' },
]

/**
 * Resolve which URL to attempt for an entry.
 * Returns '' when there is nothing to try, in which case SmartImage renders the
 * motif alone — deliberately, not as an error state.
 */
export function resolveSrc(entry) {
  if (!entry) return ''
  if (USE_LOCAL_PHOTOS && entry.local) return entry.local
  return entry.remote || ''
}
