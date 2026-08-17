# Site photography

Drop real project photographs here, then set `USE_LOCAL_PHOTOS = true` in
`src/config/images.js`. Nothing else needs to change — the app reads this
directory through that one config file.

Self-hosting is what makes images reliable. A third-party host (Unsplash and
friends) can rate-limit, change its hotlink policy, or be blocked on a visitor's
corporate network — all of which show up as missing images with no warning.

Until a file exists, its slot renders a designed industrial motif rather than a
broken image, so the site is never visually incomplete.

## Expected filenames

Homepage hero (wide, ~1800px, landscape):

| File                              | Subject                                              |
|-----------------------------------|------------------------------------------------------|
| `hero-technical-engineering.jpg`  | Engineer with drawings on an installation project     |
| `hero-welding-pipefitting.jpg`    | Welder joining stainless process piping on site       |
| `hero-green-hydrogen.jpg`         | Hydrogen / renewable energy infrastructure            |
| `hero-economic-missions.jpg`      | International delegation or industrial site visit     |

Technical services gallery (~1200px, landscape, 4:3 or 16:9):

| File                             | Subject                                       |
|----------------------------------|-----------------------------------------------|
| `work-industrial-welding.jpg`    | TIG / MIG welding of a pipe joint             |
| `work-pipefitting.jpg`           | Spool assembly, process piping                |
| `work-heat-pump-install.jpg`     | Commercial heat pump installation             |
| `work-3d-engineering.jpg`        | 3D CAD piping model or isometrics on screen   |
| `work-food-pharma-piping.jpg`    | Hygienic stainless piping in food/pharma      |
| `work-building-utilities.jpg`    | Building-bound heating/cooling installation   |

Founder portrait is set separately, through the admin panel (Settings → CEO Image).

## Notes

- Compress before committing: aim for under ~300 KB per hero image, ~150 KB for
  gallery images. WebP is fine — just keep the `.jpg` name or update the config.
- Alt text is **not** taken from the filename; it lives in `imageAlt` in
  `src/translations/{nl,en}.js` so it is written in the visitor's language.
- If you use licensed stock rather than your own work, keep the licence records.
  Original photographs of SLH's own installations will outperform stock for
  image search and for credibility on a service page.
