# Chris Bonifacio — Portfolio

Rebuild of the Canva prototype as an interactive Next.js site: scroll-driven
reveals, a pinned-scroll Experience timeline, and video backgrounds throughout.

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion (reveals,
nav, hover) · GSAP + ScrollTrigger (the Experience page's pinned filmstrip —
this is the one interaction Framer Motion can't do natively, since it needs
true scroll-position pinning per row).

## 0. Round-6 fixes (read this first)

**All your manual edits applied**: `mypicture.png` sizing kept as-is (no
code was included for that specific edit — let me know the exact classes
if you want something different from the current `h-[85vh] w-auto
max-w-[45vw]` box), `glass.png` opacity/z-index, the discipline card text
sizes, the extra tech-stack tags, the popup quote size, the "Hi, I'm CJ"
sizes, and the "As a data scientist..." headline wording/wrapping — all
copied in exactly as you specified.

**Cursor swapped**: Fluid Trail removed, **Spin Cursor** ported in at
`components/SpinCursor.tsx` and mounted globally in `app/layout.tsx` —
fill color and glow both set to the site's sky blue (`#5CE1E6`), label
turned off (its default "HOVER AROUND" text is meant for a contained demo
box, not a full-page cursor).

**About page**: background swapped to `whatibuiltpage.mp4`. The photo is
now the **ASCII Reveal** component (`components/AsciiReveal.tsx`, ported
exactly from what you sent) instead of the plain image — it renders
`mypicture.png` as green monochrome ASCII art that reveals the real photo
in a soft trailing radius around the cursor, sized to the same box as
before. Text content otherwise untouched (already covered by your manual
edits above).

**Projects list — hover-turns-blue, actually fixed this time**: the
previous round's white-sweep animation set each row's text color via
inline styles (`element.style.color = ...`), and inline styles beat plain
CSS classes — so the `hover:text-accent` class was fighting a losing
battle after a row had ever swept white. Fixed by clearing the inline
color (`clearProps: "color"`) once each sweep fully exits, handing control
back to CSS so hover works reliably regardless of a row's sweep history.

**Tech Stack page**: no changes beyond your manual edits, as requested.

**Ending page, two real fixes:**
- GITHUB/LINKEDIN/INDEED shifted right (`translate-x-24`/`32` at larger
  breakpoints) so it clears the nav pill instead of sitting directly
  behind it.
- **Root cause found for "the hand animation isn't working":** it wasn't
  broken — it was pointed at `/images/ending/hands.jpg`, a file that
  doesn't exist in the project. Because that's a non-empty path string,
  the component never fell back to its own built-in demo image; it just
  tried (and failed) to load a 404, leaving the canvas on its 1×1
  placeholder texture — which reads as a blank near-black box, exactly
  what you saw. Removed that broken override so it now uses the
  component's guaranteed-working default image. If you want your own
  photo dithered instead, drop it at `public/images/ending/hands.jpg` and
  pass `image={{ src: "/images/ending/hands.jpg" }}` back into the
  `<DitherReveal>` call in `Ending.tsx` — the component itself doesn't
  need any changes for that, just that one prop.

## 0.1 Round-5 fixes (read this first)

**Likely real root cause of the "still black" backgrounds, found and fixed
everywhere:** `VideoBackground` renders its video with `z-index: -10` so it
sits behind your page content. That only stays contained *within its own
section* if that section establishes its own CSS "stacking context" —
which happens automatically for GSAP-pinned sections (transforms create
one) and `position: sticky` elements, but NOT for a plain section with no
transform/sticky/opacity. Without that containment, a negative-z-index
element can escape all the way up to the page root and end up rendered
behind *unrelated* content elsewhere on the page — which matches exactly
what you saw (Hero and Experience worked, since both happen to get
stacking contexts for free; Projects/Tech-Stack/project-detail/About-Part-1
didn't, and were plain black). Fix: added `isolate` (forces a stacking
context via `isolation: isolate`, no transform needed) to every section
using `VideoBackground` — Projects list, Tech Stack, every project detail
page, and the rebuilt About section. This should resolve all four
"plain black" pages at once.

**Landing:** "Bonifacio." is pure white now (was a very slightly tinted
white, `#dfeef0`). Nav pill widened (now spans up to 1600px when
elongated, matching the wordmark's width). Tagline bumped up
(~13px→~17px equivalent). Real links wired in: GitHub, LinkedIn, and
Indeed (pointed at your LinkedIn until you have a real Indeed profile URL
— just swap `site.links.indeed` in `lib/content.ts` once you do).

**Popup:** the wordmark's resting point before it splits apart is now
lower (closer to true vertical center) — nothing else in this sequence
touched, per your note that it's otherwise perfect.

**About — significant rebuild:** Part 1 and Part 2 are no longer two
separate scroll sections; it's now ONE continuously pinned section (same
pattern as Experience), so the background video, the photo, and the
"About"/"(20)" labels all stay completely stationary while only the text
crossfades — "As a data scientist..." blur-reveals in, holds, then
fades/slides away as "Hi, I'm CJ" + the bio fade in to replace it. Your
real `mypicture.png` (with its transparent background, confirmed — it's a
proper RGBA PNG) is now actually in the project at
`public/images/about/mypicture.png`, rendered plain with no card/frame/
background fill around it, so it sits seamlessly over the video.

**Experience:** 3 images now visible by default per company (was 1) —
the rest still fan in on scroll the same way you liked. "Professional
Experience" heading enlarged (~24px→~28px equivalent). Dates repositioned
lower, roughly centered between the heading and the image row. Cover-card
company name enlarged to ~20px, role text to ~16px, and the smaller
caption text (4.1, 4.2, etc.) enlarged to ~14px.

**Projects list:** the white sweep now runs continuously down all 7 rows
as a sliding ~3-row-wide window (not just the first 3) — each row's
timing is scroll-distance-based so the window size stays consistent. Text
(project name, index number, and tags) now turns black while a row is
"white," and blue on hover regardless of that state. Added a soft pulsing
glow to the tag pills (a lightweight CSS box-shadow animation — see note
below on why not the full component). Video background fixed via the
`isolate` fix above.

**Project 7 added:** "Chronic Endometritis M.L." — all copy, tags, course/
field/recognition/tech-stack wired into `lib/content.ts`. One naming note:
you wrote the thumbnail as `proj7-thumbail.png` — I used the correctly-
spelled `proj7-thumbnail.png` to match the proj1–6 pattern; name your file
to match, or tell me to use your exact spelling instead.

**Project detail pages:** the hero preview image (beside the title/
description) now uses each project's `-thumbnail.png` instead of its
first showcase image. Projects 4–6 (the Ayala Land Inc. work) now blur
their images (~10%, via `blur-[3px]`) with an eye icon top-right that
shows a short privacy note on click. `proj5-5.png` removed — project 5's
showcase is 4 images now. `isolate` fix applied here too.

**Tech Stack page:** video background fixed via `isolate`. Wrapped tag
pill rows now use `justify-center` — a full row has no leftover space so
it looks unchanged, but a shorter trailing row (like your second row)
centers itself automatically, which is a clean CSS-only fix (no separate
alignment logic needed per row).

**Ending page:** top text enlarged (~9px→~14px equivalent region, bumped
to `text-lg`). "Chris Bonifacio." enlarged to match the Landing page's
size and centered horizontally (same vertical position as before). The
placeholder line-art hands were replaced with the **Dither Reveal**
component you provided — ported in full at `components/DitherReveal.tsx`,
placed as a full-width horizontal band. **This needs a real source photo
to dither** — it's currently pointed at `/images/ending/hands.jpg`, which
doesn't exist yet, so it's showing the component's built-in placeholder
photo so the section isn't blank. Drop your actual image at
`public/images/ending/hands.jpg` (any photo works — that's what gets
dithered/revealed) and it'll pick it up automatically.

**Cursor / Fluid Trail:** ported in full at `components/FluidTrail.tsx`
and mounted globally in `app/layout.tsx` as a fixed, click-through overlay
canvas — replaces the default cursor site-wide with the fluid dye trail,
using your brand sky blue. I removed one thing from your pasted code: a
Framer-specific `RenderTarget` check that only ran the simulation inside
Framer's live preview (not its canvas editor) — since this isn't running
inside Framer at all, that check is gone and the effect just always runs
in the browser.

**On the Neon Glow Button code you sent:** I didn't port that one
verbatim. It's built for a single large CTA button (measures itself,
tracks focus/hover state with Framer Motion springs, six blurred
conic-gradient rings per instance) — using it as-is for every tag pill in
a scrolling list (dozens of small elements) would be a meaningful perf
cost for a look that's mostly about a soft glow. I built a lightweight
CSS-only equivalent (`.pill-glow` in `globals.css`) that gets you the same
pulsing-glow feel at a fraction of the cost. If you specifically want the
full animated-ring version on the pills, say so and I'll wire it in as-is.

## 0.2 Round-4 fix: dev server crash from font loading

**What happened:** `next/font/google` doesn't just download fonts once —
it needs the Next.js dev server itself to reach `fonts.gstatic.com` on
every fresh `npm run dev` (and sometimes mid-session). If your network
blocks that (firewall/antivirus update, VPN, a captive portal, even a
temporary DNS blip), the *entire app* 500s, which is exactly the error
you hit — it wasn't caused by any of the code changes, since nothing in
`layout.tsx`'s font setup had changed since it last worked for you.

**Fix:** fonts are no longer loaded via `next/font/google`. They're now
loaded via a standard `<link>` tag to Google's CDN in `app/layout.tsx`'s
`<head>`, the same way any plain HTML website loads Google Fonts. This
moves the font fetch out of the Next.js build/dev pipeline entirely and
into a normal browser request:
- The dev server itself no longer needs network access to boot or run.
- If the *browser's* font request is slow or blocked, the page still
  renders (with a system-font fallback for a moment) instead of hard
  crashing with a 500.

I verified this by running `npm run build` with zero network access in my
own environment — it succeeded, which is the same failure mode you hit
with the old setup.

**If you still see a blank/unstyled page after this fix:** that means
your machine currently can't reach `fonts.googleapis.com` at all (not a
Next.js-specific problem anymore) — check whether antivirus, a VPN, or a
browser extension is blocking Google Fonts specifically, or try a
different network. The site will still function, just with fallback
fonts until that connection works.

## 0.3 Round-3 fixes

**Video backgrounds — likely root cause found.** You mentioned `profexppage.mp4`
and the popup video worked while `landingpage.mp4`, `aboutmepage.mp4`, and
`4disciplinespage.mp4` didn't — and that the "broken" ones play fine in
Windows File Explorer's preview. That combination (works in Explorer, fails
in-browser, some files fine and others not) is the signature of a **codec
mismatch**: Explorer's thumbnail preview can decode far more codecs
(HEVC/H.265, unusual profiles, etc.) than Chrome/Firefox/Edge can, which
only reliably support H.264 (High/Main profile) with AAC audio in an MP4
container. If your export tool used a different codec/profile for some
files, that fully explains file-specific failures.

Two things now protect against this:
1. **`VideoBackground` now always mounts the `<video>` tag immediately**
   (removed a two-stage conditional render that could race with
   IntersectionObserver) and retries `.play()` on both `canplay` and
   `loadeddata` events.
2. **Automatic fallback**: if a section's own video fails to decode
   (`onError` fires), it now automatically swaps to `profexppage.mp4`
   (your confirmed-working file) instead of showing black, exactly as you
   suggested. Check the browser console — a failed video now logs exactly
   which file 404'd or failed to decode.

If sections still show `profexppage.mp4` as their background after you
drop in the real files, that confirms the specific file is the problem —
re-export it as H.264 MP4 (e.g. via HandBrake, "Fast 1080p30" preset) and
it should resolve.

**Nav:** links regrouped near the hamburger on the right (not centered);
fixed the routing bug where nav links from a project page (e.g.
`/projects/predictor`) appended the hash to that URL instead of going to
`/#about` — all nav hrefs are now absolute (`/#about` etc.) so they work
from any page.

**Hero (Landing + Popup merged):** these are now one component, one
continuous pinned scroll sequence, matching your frame-by-frame
description — tagline/footer fade away on first scroll, wordmark rises
from its position near the divider to screen-center, splits apart, the
panel grows to fullscreen while crossfading to `popuppage.mp4`, and the
quote now renders as a single centered line (`whitespace-nowrap`). The
wordmark's resting position now sits ~2cm above the footer divider instead
of vertically centered.

**About:** blur-in is now GSAP scroll-scrubbed (was a CSS transition gated
by IntersectionObserver, which could be too fast/subtle to notice) —
you'll see it clearly sharpen as the section scrolls into view now.
`mypicture.png` no longer gets cropped by `object-cover` inside a fixed
box (which could clip a transparent PNG oddly) — it's `object-contain`
now, so the full cutout renders regardless of its actual aspect ratio,
sitting on a soft gray backing. Headline now uses explicit line breaks
matching your exact wording, and the four accent words (data scientist,
analyst, complex, intelligence) are now italic Playfair Display in sky
blue, not the sans-serif accent color treatment they had before. Part 2 is
now a genuine sticky-scroll: background + photo pin in place while only
the text block animates in.

**Experience:** this was restructured from "4 separate full-page pinned
sections" into **one continuous pinned section** — the background video
and "Professional Experience" heading now stay fixed on screen for the
whole journey through all 4 companies; only the date/line/image-track
cross-fade between companies. Heading is now sized close to the Four
Disciplines heading, and both the heading and the image track sit ~1 inch
to the right of the vertical line (images can no longer visually
disappear past/left of the line). Fixed the bug where 2 images appeared
simultaneously at a row's start — only the cover image shows now until
you scroll.

**Projects list:** tag pill text is sky blue now (was white/60). Project
names are bigger. Added the Luke-Baffait-style scroll-triggered white
sweep on the first 3 rows — a white bar fills left-to-right as each row
scrolls into focus, holds, then recedes; the project name switches to sky
blue while the bar is filled, for contrast against white.

**Project detail pages:** restructured the header grid so the showcase
thumbnail's top edge aligns with "← BACK" (was aligned with the title,
leaving dead space below the shorter text column). Showcase grid is now 2
columns instead of 3 (each image reads bigger). Video backgrounds are now
`eager`-loaded since they're the primary background for that page.

## 0.4 Round-2 fixes

- **The black-background bug is fixed.** It was a real React/Next.js bug,
  not missing files: the JSX `muted` prop only sets the video's DOM
  *property* after hydration, not the `muted` HTML *attribute* in the
  server-rendered markup, so browsers were silently blocking autoplay
  before React ever ran. `VideoBackground.tsx` now sets `.muted = true`
  imperatively on mount, which is the reliable fix. It also now logs a
  console error naming the exact expected path if a video 404s, so any
  future "still black" issue is diagnosable in one glance at devtools.
- **⚠️ .HEIC files won't render in any browser except Safari/iOS.**
  Chrome, Firefox, and Edge cannot decode HEIC. Three of your experience
  photos are HEIC (`ali5.HEIC`, `alp3.HEIC`, `alp5.HEIC`) — convert these to
  `.jpg` or `.png` before dropping them in, then update the three matching
  lines in `lib/content.ts` (`experience` array) to the new extension.
  Everything else already matches your real folder's extensions exactly
  (including the mixed-case `alp1.JPG` and the `proj3-*.jpg`/`.png` mix).
- Nav: all-caps links, added "TECH STACK" (routes to the Four Disciplines
  section via `#tech-stack`), nav pill enlarged.
- Landing: wordmark and GITHUB/LINKEDIN/INDEED enlarged and centered;
  sizes now use `clamp()` so they scale smoothly across laptop screen
  sizes rather than jumping at fixed breakpoints (per your note: desktop/
  laptop-adaptive only, no mobile layout needed — I've dropped the mobile
  breakpoints accordingly across all sections touched this round).
- Popup: rebuilt as one pinned GSAP timeline matching your frame-by-frame
  description — wordmark centers, splits apart left/right, a panel grows
  from a small box to fullscreen while crossfading `landingpage.mp4` →
  `popuppage.mp4`, then the quote fades in.
- About: play button removed, background wired to `aboutmepage.mp4`,
  line-breaks now match the prototype's exact wrapping, and both the photo
  and text are sized up.
- Experience: added the "Professional Experience" heading (italic serif +
  bold sans, matching the prototype) to every row, bigger/clearer dates,
  thicker timeline rail, wider rectangular cards, green gradient + caption
  + transparent badge on **every** image (not just the cover), and all
  real per-image captions from your list. Overflow is handled by shifting
  the card track left as each new image reveals (no manual scrollbar
  needed) — badge numbering is now `4.0–4.5 / 3.0–3.5 / 2.0–2.4 / 1.0–1.4`,
  confirming the earlier "0.3" was indeed meant to be "3.0."

## 1. Drop your real assets in here before deploying

Nothing is invented — every path below is already wired up in the code and
just needs the real file dropped in with the exact filename.

**Videos** → `public/videos/`
```
landingpage.mp4  popuppage.mp4  aboutmepage.mp4  profexppage.mp4
whatibuiltpage.mp4  4disciplinespage.mp4  endpage.mp4
proj1page.mp4  proj2page.mp4  proj3page.mp4  proj4page.mp4  proj5page.mp4  proj6page.mp4  proj7page.mp4
```

**About page photo** → already in place at `public/images/about/mypicture.png`
(copied in from your upload this round — nothing to do here).

**Ending page dither photo** → `public/images/ending/hands.jpg` (any photo —
this is what the Dither Reveal component dithers/reveals on hover; doesn't
need to literally be hands, just needs to exist).

**Experience timeline images** →
```
public/images/experience/alp/alp1.jpg … alp6.jpg
public/images/experience/ali/ali1.jpg … ali6.jpg
public/images/experience/infinito/infinito1.png … infinito5.png
public/images/experience/amazon/amazon1.png … amazon5.png
```

**Project thumbnails (hover preview on the projects list, AND now also the
hero preview image on each project's detail page)** →
`public/images/projects/thumbnails/proj1-thumbnail.png` … `proj7-thumbnail.png`

**Project showcase screenshots** →
```
public/images/projects/proj1/proj1-1.png … proj1-6.png
public/images/projects/proj2/proj2-1.png … proj2-4.png
public/images/projects/proj3/proj3-1.png … proj3-6.png
public/images/projects/proj4/proj4-1.png … proj4-4.png
public/images/projects/proj5/proj5-1.png … proj5-4.png   (proj5-5 removed)
public/images/projects/proj6/proj6-1.png … proj6-6.png
public/images/projects/proj7/proj7-1.png … proj7-6.png   (new)
```

All folders already exist in this repo — just copy files in. No code
changes needed.

## 2. Fonts — one substitution to be aware of

- **Garet** and **Neue Montreal** aren't distributed on Google Fonts (no free
  license available), so this build substitutes **Poppins** (bold headers)
  and **Inter** (body copy) respectively, loaded via `next/font/google`.
  If you have licensed Garet/Neue Montreal `.woff2` files, drop them in
  `public/fonts/` and swap the `next/font/google` imports in `app/layout.tsx`
  for `next/font/local` — the CSS variable names (`--font-display`,
  `--font-body`) stay the same, so nothing else needs to change.
- Playfair Display, Roboto Mono, and Montserrat are all used as-is from
  Google Fonts.

## 3. What's built vs. what needs your decision

**Built and verified (typechecks + production build passing):**
- Preloader (plays once per session via `sessionStorage`, black → sky blue
  sweep, staggered "Chris"/"Bonifacio." reveal)
- Nav: elongated → compact on scroll, hamburger → full overlay menu
- Landing, Popup (scroll-scaled floating panel + quote reveal), About (two-part
  blur-to-focus), Experience (GSAP pinned per-row filmstrip), Projects List
  (cursor-follow thumbnail on hover), Four Disciplines (glassmorphism grid),
  Ending — plus all 6 project detail pages on one shared, data-driven template
  at `app/projects/[slug]/page.tsx`
- All real copy centralized in `lib/content.ts` — nothing invented; anything
  the source screenshots didn't specify is marked `TODO` there (currently:
  real GitHub/LinkedIn/Indeed URLs)

**Flagged for you to confirm before shipping:**
- The Experience badge sequence in your screenshots reads **4.0 / 0.3 / 2.0 /
  1.0** — the "0.3" looks like it might be a typo for "3.0" given the other
  three are whole numbers counting down. I copied it verbatim in
  `lib/content.ts`; change it there if it should be 3.0.
- **Mobile behavior wasn't specified** — I asked in Part 1 and it wasn't
  answered in Part 2. Everything is currently built responsive-first (it
  reflows down to mobile widths), but the Experience page's pinned-scroll
  filmstrip is a genuinely difficult interaction on short/mobile viewports.
  I'd recommend a simpler non-pinned fallback (e.g. horizontal swipe or a
  static fanned grid) below a `sm` breakpoint — tell me if you want that
  built, or if desktop-only is acceptable for now.
- The Ending page's hand-outline illustration is currently a simple inline
  placeholder SVG (two open curves), not the real Creation-of-Adam-style
  linework from your screenshot — that's a real illustration asset, not
  something to invent. Send the SVG/PNG and I'll swap it in.
- GitHub / LinkedIn / Indeed URLs are `#` placeholders in `lib/content.ts` —
  paste the real links there.

## 4. Run locally

```bash
npm install
npm run dev
```

## 5. Deploy to Vercel

Push to a GitHub repo, then import it in Vercel — zero config needed,
`next.config.ts` has no hard-coded local paths. Just make sure the real
video/image assets are committed (or uploaded to a CDN and the `src` paths
in `lib/content.ts` updated) before the first deploy, since videos in
particular can make the repo large — consider Git LFS or hosting videos on
a CDN/Vercel Blob if total size gets unwieldy.

## 6. Known follow-ups (not yet built)

- The `useScroll`/pin implementation in `Experience.tsx` is tested to compile
  and mount correctly, but real pinned-scroll timing needs to be tuned by eye
  once the real `profexppage.mp4` and experience images are in — the exact
  scroll distance per row (currently `images.length * 55%` of viewport height)
  is a starting estimate, not a final tuned value.
- The popup section's floating panel currently reuses `popuppage.mp4` as its
  content — confirm if you want a separate data-viz-specific video/image for
  that inner panel versus the background.
