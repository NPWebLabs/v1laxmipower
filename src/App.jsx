import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
import { ArrowRight, ArrowUpRight, Menu, X, Phone, Mail, Clock, MapPin, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Marquee } from './components/magicui/marquee'
import { NumberTicker } from './components/magicui/number-ticker'
import { BlurFade } from './components/magicui/blur-fade'
import { ShimmerButton } from './components/magicui/shimmer-button'
import { DotPattern } from './components/magicui/dot-pattern'
import { cn } from './lib/utils'
import { ease, Logo, Icon, WhatsAppIcon, SectionHead, Section, NameRole, btn } from './ui'
import { Contact, WhatsAppFloat, EnquiryModal, openEnquiry } from './contact'
import ProductsPage from './pages/Products'
import GalleryPage from './pages/Gallery'
import AboutPage from './pages/About'
import * as D from './data'

/* ---------- Routing (hash based, so the single-file build works anywhere) ---------- */
const PAGES = ['about', 'products', 'gallery']
const routeOf = (h) => PAGES.find((p) => h.startsWith(`#/${p}`)) || 'home'
const TITLES = { home: 'Laxmi Power – Batteries & Inverters in Barshi', about: 'About Us – Laxmi Power, Barshi', products: 'Products – Laxmi Power, Barshi', gallery: 'Gallery – Laxmi Power, Barshi' }
// #/products/<id> → #cat-<id>, #/about/<id> → #about-<id>, #section → #section
function scrollToHash() {
  const h = location.hash
  const sub = h.match(/^#\/(products|about)\/(.+)/)
  const el = sub ? document.getElementById(`${sub[1] === 'products' ? 'cat' : 'about'}-${sub[2]}`) : h.length > 1 && !h.startsWith('#/') ? document.getElementById(h.slice(1)) : null
  if (el) el.scrollIntoView({ block: 'start' })
  else if (h.startsWith('#/')) window.scrollTo(0, 0)
}
function useRoute() {
  const [route, setRoute] = useState(() => routeOf(location.hash))
  useEffect(() => {
    const f = () => { setRoute(routeOf(location.hash)); setTimeout(scrollToHash, 30) } // wait for the new page to render
    window.addEventListener('hashchange', f)
    setTimeout(scrollToHash, 30)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  useEffect(() => { document.title = TITLES[route] }, [route])
  return route
}

/* ---------- Nav ---------- */
// Desktop menu item with a dropdown: opens on hover, keyboard focus or a click on the arrow; Esc / outside click closes.
function NavDropdown({ item, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const hovering = useRef(false) // a mouse is over the item: the arrow then never toggles it shut
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('a')?.focus() } }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])
  const id = `menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <li ref={ref} className="relative"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') { hovering.current = true; setOpen(true) } }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') { hovering.current = false; setOpen(false) } }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false) }}>
      <div className="flex items-center">
        <a href={item.href} aria-current={active ? 'page' : undefined}
          className={cn('whitespace-nowrap rounded-l-full py-2 pl-3 pr-1 text-[15px] transition-colors hover:text-white', active ? 'text-gold' : 'text-on-ink-muted')}>{item.label}</a>
        <button type="button" onClick={() => setOpen((v) => (hovering.current ? true : !v))} aria-expanded={open} aria-controls={id} aria-label={`${item.label} sections`}
          className={cn('grid h-8 w-7 place-items-center rounded-r-full transition-colors hover:text-white', active ? 'text-gold' : 'text-on-ink-muted')}>
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} aria-hidden />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id={id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }} transition={{ duration: 0.18, ease }}
            className="absolute left-0 top-full z-50 pt-2">
            <ul className="min-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]">
              {item.children.map((c) => (
                <li key={c.href}>
                  <a href={c.href} onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center justify-between gap-6 whitespace-nowrap rounded-xl px-3.5 text-[15px] text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10">
                    {c.label}<ArrowRight className="h-3.5 w-3.5 text-gold" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function Nav({ route }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  const active = (n) => route !== 'home' && n.href === `#/${route}`
  return (
    <header className="sticky z-50" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className={cn('gutter transition-colors duration-300', scrolled ? 'border-b border-white/10 bg-ink/90 backdrop-blur-xl' : 'bg-ink')}>
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4" aria-label="Main">
          <Logo dark />
          <ul className="hidden items-center gap-0.5 xl:flex">
            {D.NAV.map((n) => n.children ? <NavDropdown key={n.href} item={n} active={active(n)} /> : (
              <li key={n.href}><a href={n.href} aria-current={active(n) ? 'page' : undefined}
                className={cn('whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors hover:bg-white/5 hover:text-white', active(n) ? 'text-gold' : 'text-on-ink-muted')}>{n.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ShimmerButton href={D.TEL} aria-label={`Call ${D.PHONE_DISPLAY}`} className="hidden min-h-[44px] shrink-0 px-5 py-2 text-[15px] sm:inline-flex"><Phone className="h-4 w-4" />Call<span className="xl:hidden">{D.PHONE_DISPLAY}</span></ShimmerButton>
            <button onClick={() => setOpen((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 xl:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease }}
            className="gutter absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-white/10 bg-ink xl:hidden">
            <ul className="mx-auto flex max-w-7xl flex-col py-3">
              {D.NAV.map((n, i) => (
                <motion.li key={n.href} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.03 * i }}>
                  <a onClick={() => setOpen(false)} href={n.href} className="flex min-h-[48px] items-center justify-between border-b border-white/5 text-lg text-white">{n.label}<ArrowRight className="h-4 w-4 text-gold" /></a>
                  {n.children && (
                    <ul className="border-b border-white/5 py-1 pl-4">
                      {n.children.map((c) => (
                        <li key={c.href}><a onClick={() => setOpen(false)} href={c.href} className="flex min-h-[44px] items-center text-[16px] text-on-ink-muted hover:text-white">{c.label}</a></li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
              <li className="pt-4"><ShimmerButton href={D.TEL} className="w-full"><Phone className="h-4 w-4" />Call {D.PHONE_DISPLAY}</ShimmerButton></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- 1. Hero ---------- */
// Background: a 12 s seamless loop made with HyperFrames (source: ../laxmi-power-hero-video).
// Muted + playsInline so phones autoplay it; visitors who prefer reduced motion get the still poster.
function HeroVideo() {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true // React doesn't reliably reflect `muted`, and autoplay requires it
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => { if (mq.matches) v.pause(); else v.play().catch(() => {}) }
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])
  return (
    <video ref={ref} className="absolute inset-0 h-full w-full object-cover" poster="video/hero-loop-poster.jpg"
      muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
      <source src="video/hero-loop.webm" type="video/webm" />
      <source src="video/hero-loop.mp4" type="video/mp4" />
    </video>
  )
}

function Hero() {
  const words = ['Your', 'Trusted', 'Partner', 'for', 'Complete', 'Power', 'Solutions.']
  return (
    <section id="top" className="relative flex min-h-[min(86vh,780px)] items-center overflow-hidden bg-ink text-on-ink">
      <HeroVideo />
      {/* Readability: a navy shade under the text (left) that clears toward the right, and a soft fade into the next section */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#081332]/90 via-[#081332]/55 to-[#081332]/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#081332]/70 to-transparent" />
      <div className="gutter relative w-full">
        <div className="mx-auto max-w-7xl pb-20 pt-14 lg:pb-24 lg:pt-20">
          <div className="max-w-3xl">
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] text-white/90 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_#F58220]" />Welcome to Laxmi Power
            </motion.p>
            <h1 className="mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.1] [text-shadow:0_2px_24px_rgba(6,16,43,0.55)]">
              {words.map((w, i) => (
                <motion.span key={i} className={cn('mr-[0.22em] inline-block', (w === 'Power' || w === 'Solutions.') && 'text-gold')}
                  initial={{ y: '0.4em', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease }}>
                  {w}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-6 max-w-xl text-lg text-white/85">
              Car, tractor, two-wheeler, commercial and inverter batteries, inverters, installation and after-sales service, all under one roof in Barshi.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="mt-8 flex flex-wrap gap-3">
              <a href="#/products" className={btn.primary}>Explore Products <ArrowRight className="h-4 w-4" /></a>
              <a href={D.WA('Hello Laxmi Power, I would like to enquire about a battery / inverter.')} target="_blank" rel="noopener" className={btn.whatsapp}><WhatsAppIcon className="h-5 w-5" />WhatsApp Enquiry</a>
            </motion.div>
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.6 }} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6 sm:gap-6">
              <div><dt className="eyebrow text-[10px] text-white/70">Established</dt><dd className="mt-1 whitespace-nowrap font-display text-xl font-semibold text-white sm:text-2xl"><NumberTicker value={2018} startValue={2000} grouping={false} /></dd></div>
              <div><dt className="eyebrow text-[10px] text-white/70">We serve</dt><dd className="mt-1 whitespace-nowrap font-display text-xl font-semibold text-white sm:text-2xl">B2B<span className="text-gold">+</span>B2C</dd></div>
              <div><dt className="eyebrow text-[10px] text-white/70">Open</dt><dd className="mt-1 whitespace-nowrap font-display text-xl font-semibold text-white sm:text-2xl">Mon–Sat</dd></div>
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 2. Product categories ---------- */
function Categories() {
  return (
    <Section id="categories">
      <SectionHead center eyebrow="Our products" title="Power solutions for every requirement" intro="Batteries for every vehicle and backup power for every home and business." />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {D.PRODUCTS.map((p, i) => (
          <BlurFade as="li" key={p.id} delay={0.04 * i}>
            <a href={`#/products/${p.id}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/30 bg-bg transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_-20px_rgba(13,31,77,0.35)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <img loading="lazy" src={p.img} alt={p.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-center gap-2.5 text-xl font-semibold text-gold-text"><Icon name={p.icon} className="h-5 w-5 shrink-0" />{p.title}</h3>
                <p className="mt-2 flex-1 text-muted">{p.text}</p>
                <p className="mt-4 text-sm text-fg/80"><span className="font-semibold text-fg">{p.specs[1][1]}</span> · {p.specs[2][1]}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-fg group-hover:text-gold-text">View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </a>
          </BlurFade>
        ))}
      </ul>
      <BlurFade className="mt-10 text-center">
        <a href="#/products" className={btn.primary}>View all products <ArrowRight className="h-4 w-4" /></a>
      </BlurFade>
    </Section>
  )
}

/* ---------- 3. Our brands ---------- */
function Brands() {
  return (
    <Section id="brands" tone="surface">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Our brands" title="Trusted brands, chosen for your need" intro="We stock leading battery and inverter brands and help you pick the right one for your vehicle, load and budget." />
        </div>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 lg:col-span-8">
          {D.BRANDS.map((b, i) => (
            <BlurFade as="li" key={b.name} delay={0.04 * i} className="flex min-h-[132px] flex-col items-center justify-center bg-bg p-6 text-center">
              <span className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">{b.name}</span>
              <span className="mt-1.5 text-sm text-muted">{b.note}</span>
            </BlurFade>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/* ---------- 4. Services ---------- */
function Services() {
  return (
    <Section id="services">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="Services" title="More than selling a battery" intro="Installation, health check-ups and after-sales support, from the same team that sold you the product." />
        <a href={D.WA('Hello Laxmi Power, I need service support for my battery / inverter.')} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold-text hover:underline">Book a service on WhatsApp <ArrowUpRight className="h-4 w-4" /></a>
      </div>
      <div className="mt-12 grid auto-rows-[minmax(300px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
        {D.SERVICES.map((s, i) => (
          <BlurFade key={s.title} delay={0.04 * i} className={cn('min-w-0', s.span)}>
            <motion.article whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-ink text-on-ink">
              <img loading="lazy" src={s.img} alt={s.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06102B] via-[#06102B]/70 to-[#06102B]/5" />
              <div className="relative p-6 sm:p-7">
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-[#0D1F4D]"><Icon name={s.icon} className="h-5 w-5" /></span>
                  {s.planned && <span className="rounded-full border border-white/25 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-white/85">Coming soon</span>}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 max-w-md text-[15px] text-white/80">{s.text}</p>
              </div>
            </motion.article>
          </BlurFade>
        ))}
        <BlurFade delay={0.2} className="min-w-0 lg:col-span-2">
          <div className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-gold/30 bg-surface p-7 sm:p-8">
            <DotPattern className="text-fg/[0.06]" />
            <div className="relative">
              <p className="eyebrow text-gold-text">Dealers, garages & retailers</p>
              <h3 className="mt-3 text-xl font-semibold sm:text-2xl">Need regular wholesale supply?</h3>
              <p className="mt-3 max-w-md text-muted">We supply battery shops, spare-parts dealers, electrical retailers and service centres across Barshi and nearby markets.</p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <button onClick={() => openEnquiry('Wholesale / dealer enquiry')} className={btn.primary}>Wholesale enquiry <ArrowRight className="h-4 w-4" /></button>
              <a href={D.WA('Hello Laxmi Power, I would like to discuss a wholesale / dealer enquiry.')} target="_blank" rel="noopener" className={btn.whatsapp}><WhatsAppIcon className="h-5 w-5" />WhatsApp</a>
            </div>
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}

/* ---------- 5. Why Laxmi Power (reasons, team, store) ---------- */
function Why() {
  return (
    <Section id="why" tone="surface">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Why Laxmi Power" title="Trusted in Barshi since 2018" />
          <BlurFade delay={0.05} className="mt-5 space-y-4 text-[17px] text-muted">
            <p>Laxmi Power is engaged in the wholesale and retail distribution of batteries for motorcycles, cars, tractors and inverter applications, serving dealers, garages, spare-parts retailers and individual customers across Barshi and nearby markets.</p>
            <p>We bring product supply, installation and ongoing support together, so buying and servicing a battery or inverter is simple.</p>
          </BlurFade>
          <BlurFade delay={0.1} className="relative mt-8 overflow-hidden rounded-3xl">
            <img loading="lazy" src="img/tester.webp" alt="Battery tester showing a good battery result" className="aspect-[4/3] w-full object-cover" />
          </BlurFade>
        </div>
        <ol className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          {D.WHY.map((w, i) => (
            <BlurFade as="li" key={w.k} delay={0.05 * i} className="rounded-3xl border border-line bg-bg p-6 sm:p-7">
              <span className="text-sm text-gold-text tnum">{String(i + 1).padStart(2, '0')} / {String(D.WHY.length).padStart(2, '0')}</span>
              <h3 className="mt-3 text-xl font-semibold">{w.k}</h3>
              <p className="mt-1.5 text-muted">{w.v}</p>
            </BlurFade>
          ))}
        </ol>
      </div>

      {/* Team: photo, name and designation only — full stories live on the About page */}
      <div className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Meet our founder & team" title="A business built by women" />
          <a href="#/about/team" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold-text hover:underline">Read our team's story <ArrowRight className="h-4 w-4" /></a>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {D.TEAM.map((t, i) => (
            <BlurFade as="li" key={t.id} delay={i * 0.06}>
              <a href={`#/about/${t.id}`} className="group block overflow-hidden rounded-3xl border border-line bg-bg transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_-20px_rgba(13,31,77,0.35)]"
                aria-label={`${t.name}, ${t.role} — read more on the About page`}>
                <div className="aspect-[4/5] overflow-hidden bg-surface">
                  <img loading="lazy" src={t.img} alt={`${t.name}, ${t.role} at Laxmi Power`} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-end justify-between gap-3 p-5">
                  <NameRole name={t.name} role={t.role} />
                  <ArrowUpRight className="mb-1 h-5 w-5 shrink-0 text-gold-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </div>
              </a>
            </BlurFade>
          ))}
        </ul>
      </div>

      {/* Store gallery */}
      <div className="mt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Inside our store" title="Stocked, sorted and ready in Barshi" />
          <div className="max-w-sm">
            <p className="text-muted">Two-wheeler, car, tractor and inverter batteries, kept on hand for dealers, garages and walk-in customers.</p>
            <a href="#/gallery" className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold-text hover:underline">View full gallery <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="relative mx-[calc((100%-100vw)/2)]">
        <Marquee pauseOnHover className="[--duration:60s] [--gap:1rem]" repeat={3}>
          {D.GALLERY.map((g) => (
            <figure key={g.src} className={cn('h-[200px] shrink-0 overflow-hidden rounded-2xl md:h-[260px]', g.w)}>
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover" />
            </figure>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface md:w-24" />
      </div>
    </Section>
  )
}

/* ---------- 6. Testimonials (swipeable row; arrows on larger screens) ---------- */
function Testimonials() {
  const row = useRef(null)
  const scroll = (dir) => {
    const el = row.current
    const card = el?.querySelector('li')
    if (card) el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' })
  }
  const arrow = 'grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:bg-gold hover:text-[#0D1F4D]'
  return (
    <Section id="testimonials" tone="ink" className="overflow-hidden">
      <DotPattern className="text-white/[0.05] [mask-image:radial-gradient(60%_70%_at_80%_40%,#000,transparent)]" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead onInk eyebrow="Testimonials" title="What our partners say" intro="Battery dealers, garages and businesses across Barshi, Solapur, Dharashiv and Pune." />
        <div className="flex items-center gap-2">
          <button onClick={() => scroll(-1)} className={arrow} aria-label="Previous testimonials"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => scroll(1)} className={arrow} aria-label="Next testimonials"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
      <ul ref={row} className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 md:-mx-8 md:scroll-px-8 md:px-8" aria-label="Testimonials">
        {D.TESTIMONIALS.map((t) => (
          <li key={t.name} className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:w-[calc((100%-1.25rem)/2)] sm:p-8">
            <figure className="flex h-full flex-col">
              <figcaption className="flex items-center gap-4">
                <img src={t.img} alt={`${t.name}, ${t.business}`} loading="lazy" width="96" height="96"
                  className="h-20 w-20 shrink-0 rounded-full border-2 border-gold/70 bg-ink-2 object-cover sm:h-24 sm:w-24" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-snug text-white">{t.name}</p>
                  <p className="text-sm text-gold">{t.business}</p>
                  <p className="text-sm text-on-ink-muted">{t.place}</p>
                </div>
              </figcaption>
              <blockquote className="mt-5 flex-1 text-[16px] leading-relaxed text-white/90">{t.text}</blockquote>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <a href={D.WA('Hello Laxmi Power, I would like to share feedback about your service: ')} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold hover:underline">Share your experience <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </Section>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="gutter border-t border-white/10 bg-ink pb-10 pt-16 text-on-ink">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo dark />
            <p className="mt-6 max-w-sm font-display text-xl font-semibold leading-snug text-white">Your Trusted Partner for Complete Power Solutions.</p>
            <p className="mt-3 max-w-sm text-on-ink-muted">Automotive batteries, inverter solutions, installation and service support in Barshi and surrounding markets.</p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-gold">Quick links</p>
            <ul className="mt-5 space-y-1">
              {D.NAV.map((n) => <li key={n.href}><a href={n.href} className="inline-flex min-h-[36px] items-center text-on-ink-muted hover:text-white">{n.label}</a></li>)}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-gold">Products</p>
            <ul className="mt-5 space-y-1">
              {D.PRODUCTS.map((p) => <li key={p.id}><a href={`#/products/${p.id}`} className="inline-flex min-h-[36px] items-center text-on-ink-muted hover:text-white">{p.short}</a></li>)}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow text-gold">Visit or call</p>
            <ul className="mt-5 space-y-3 text-on-ink-muted">
              <li><a href={D.MAPS} target="_blank" rel="noopener" className="flex gap-3 hover:text-white"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />{D.ADDRESS}</a></li>
              <li><a href={D.TEL} className="flex gap-3 hover:text-white"><Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />{D.PHONE_DISPLAY}</a></li>
              <li><a href={D.WA()} target="_blank" rel="noopener" className="flex gap-3 hover:text-white"><WhatsAppIcon className="mt-1 h-4 w-4 shrink-0 text-gold" />WhatsApp {D.WHATSAPP_DISPLAY}</a></li>
              <li><a href={D.MAILTO} className="flex gap-3 break-all hover:text-white"><Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />{D.EMAIL}</a></li>
              <li className="flex gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />Mon–Sat, 10 am – 7 pm</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-sm text-on-ink-muted">
          <p>© 2026 Laxmi Power. All rights reserved.</p>
          <p className="font-deva text-base text-gold">लक्ष्मी पॉवर · बार्शी</p>
        </div>
      </div>
    </footer>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gold" />
}

export default function App() {
  const route = useRoute()
  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); const m = document.getElementById('main'); m.tabIndex = -1; m.focus() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <ScrollProgress />
      <Nav route={route} />
      <main id="main">
        {route === 'about' ? <AboutPage /> : route === 'products' ? <ProductsPage /> : route === 'gallery' ? <GalleryPage /> : (
          <>
            <Hero />
            <Categories />
            <Brands />
            <Services />
            <Why />
            <Testimonials />
          </>
        )}
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <EnquiryModal />
    </>
  )
}
