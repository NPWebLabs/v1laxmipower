import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react'
import { Handshake, BadgeCheck, UsersRound, Truck, Activity, Sprout, Car, BatteryCharging, BatteryFull, Wrench, Gauge, Smartphone, Home, Store, Tractor, Building2, LifeBuoy } from 'lucide-react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Copy, Menu, X, Quote, Phone, Mail, Clock, MapPin, MessageCircle, Zap, Plus, Loader2 } from 'lucide-react'
import { Marquee } from './components/magicui/marquee'
import { NumberTicker } from './components/magicui/number-ticker'
import { BlurFade } from './components/magicui/blur-fade'
import { BorderBeam } from './components/magicui/border-beam'
import { ShimmerButton } from './components/magicui/shimmer-button'
import { AnimatedShinyText } from './components/magicui/animated-shiny-text'
import { DotPattern } from './components/magicui/dot-pattern'
import { MagicCard } from './components/magicui/magic-card'
import { cn } from './lib/utils'
import * as D from './data'

const ease = [0.22, 1, 0.36, 1]

/* ---------- Brand ---------- */
function Mark({ className, petal = '#36407A', base = '#1B2140', dark = false }) {
  const c1 = dark ? '#E9ECF8' : base, c2 = dark ? '#A9B2E0' : petal
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 82 C34 80 14 72 4 56 C20 52 38 60 50 82Z" fill={c1} />
      <path d="M50 82 C66 80 86 72 96 56 C80 52 62 60 50 82Z" fill={c1} />
      <path d="M50 82 C36 72 22 52 22 26 C40 36 50 56 50 82Z" fill={c2} />
      <path d="M50 82 C64 72 78 52 78 26 C60 36 50 56 50 82Z" fill={c2} />
      <path fillRule="evenodd" fill="#F2A23A" d="M50 6 C62 22 66 40 66 54 C66 68 58 78 50 84 C42 78 34 68 34 54 C34 40 38 22 50 6Z M54 20 L40 52 L49 52 L45 72 L61 40 L52 40 L56 20Z" />
      <rect x="24" y="88" width="52" height="5" rx="2.5" fill={c1} />
    </svg>
  )
}
function Logo({ dark = false, className }) {
  return (
    <a href="#top" className={cn('flex items-center gap-2.5', className)} aria-label="Laxmi Power home">
      <Mark dark={dark} className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[21px] tracking-tight', dark ? 'text-white' : 'text-fg')}><b className="font-extrabold">Laxmi</b> <span className="font-normal">Power</span></span>
        <span className="font-deva text-[13px] text-gold mt-1">लक्ष्मी पॉवर</span>
      </span>
    </a>
  )
}
const Icons = { Handshake, BadgeCheck, UsersRound, Truck, Activity, Sprout, Car, BatteryCharging, BatteryFull, Wrench, Gauge, Smartphone, Home, Store, Tractor, Building2, LifeBuoy }
function Icon({ name, className }) { const C = Icons[name] || Zap; return <C className={className} aria-hidden="true" strokeWidth={1.75} /> }

function SectionHead({ eyebrow, title, intro, center = false, onInk = false }) {
  return (
    <BlurFade className={cn('max-w-2xl', center && 'mx-auto text-center')}>
      <p className={cn('eyebrow mb-4', onInk ? 'text-gold' : 'text-gold-text')}>{eyebrow}</p>
      <h2 className={cn('text-[clamp(2rem,4.4vw,3.4rem)] font-bold', onInk ? 'text-on-ink' : 'text-fg')}>{title}</h2>
      {intro && <p className={cn('mt-5 text-lg', onInk ? 'text-on-ink-muted' : 'text-muted')}>{intro}</p>}
    </BlurFade>
  )
}

/* ---------- Nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return (
    <header className="sticky z-50" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className={cn('gutter transition-colors duration-300', scrolled ? 'bg-ink/90 backdrop-blur-xl border-b border-white/10' : 'bg-ink')}>
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6" aria-label="Main">
          <Logo dark />
          <ul className="hidden items-center gap-1 lg:flex">
            {D.NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} className="rounded-full px-3.5 py-2 text-[15px] text-on-ink-muted transition-colors hover:text-white hover:bg-white/5">{n.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ShimmerButton href={D.TEL} className="hidden sm:inline-flex min-h-[44px] px-5 py-2 text-[15px]"><Phone className="h-4 w-4" />{D.PHONE_DISPLAY}</ShimmerButton>
            <button onClick={() => setOpen((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease }}
            className="gutter absolute inset-x-0 top-full border-b border-white/10 bg-ink lg:hidden">
            <ul className="mx-auto flex max-w-7xl flex-col py-3">
              {D.NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.03 * i }}>
                  <a onClick={() => setOpen(false)} href={`#${n.id}`} className="flex min-h-[48px] items-center justify-between border-b border-white/5 text-lg text-white">{n.label}<ArrowRight className="h-4 w-4 text-gold" /></a>
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

/* ---------- Hero ---------- */
function ChargeCard() {
  return (
    <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9, duration: 0.6, ease }}
      className="absolute -bottom-6 -left-4 w-[230px] rounded-2xl border border-white/10 bg-ink-2/95 p-4 shadow-2xl backdrop-blur sm:-left-10">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-[10px] text-on-ink-muted">Battery health check</span>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">Good</span>
      </div>
      <div className="mt-3 flex items-end gap-3">
        <div className="relative flex h-10 w-[92px] items-center gap-[3px] rounded-md border-2 border-white/70 p-[3px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span key={i} className="h-full flex-1 rounded-[2px] bg-gold origin-left" initial={{ scaleY: 0.2, opacity: 0.25 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 1.1 + i * 0.12, duration: 0.3 }} />
          ))}
          <span className="absolute -right-[7px] top-1/2 h-4 w-[5px] -translate-y-1/2 rounded-r bg-white/70" />
        </div>
        <p className="font-mono text-2xl font-medium text-white tnum">12.6<span className="ml-0.5 text-sm text-on-ink-muted">V</span></p>
      </div>
      <p className="mt-2 text-[12px] leading-snug text-on-ink-muted">A fully charged 12 V battery at rest reads about 12.6 V.</p>
    </motion.div>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 60])
  const words = ['Your', 'Trusted', 'Partner', 'for', 'Complete', 'Power', 'Solutions.']
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-on-ink">
      <DotPattern className="text-white/[0.07] [mask-image:radial-gradient(70%_60%_at_30%_40%,#000,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(242,162,58,0.22),transparent)]" />
      <div className="gutter relative">
        <div className="mx-auto grid max-w-7xl items-center gap-14 pb-24 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20">
          <div className="lg:col-span-7 min-w-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px]">
              <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_#F2A23A]" />
              <AnimatedShinyText className="text-on-ink-muted">Barshi · Solapur district · Since 2018</AnimatedShinyText>
            </motion.div>
            <h1 className="mt-7 text-[clamp(2.6rem,6.6vw,5.4rem)] font-extrabold leading-[0.98]">
              <span className="sr-only">Laxmi Power: </span>
              {words.map((w, i) => (
                <motion.span key={i} className={cn('mr-[0.22em] inline-block', (w === 'Power') && 'text-gold')}
                  initial={{ y: '0.5em', opacity: 0, filter: 'blur(6px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease }}>
                  {w}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-7 max-w-xl text-lg text-on-ink-muted md:text-xl">
              Reliable batteries, inverters, professional installation and dependable after-sales service, all under one roof. Serving Barshi, Solapur district and surrounding markets for homes, businesses, vehicles and agricultural needs.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="mt-9 flex flex-wrap gap-3">
              <ShimmerButton href={D.WA('Hello Laxmi Power, I would like to enquire about a battery / inverter.')} target="_blank" rel="noopener"><MessageCircle className="h-5 w-5" />Enquire on WhatsApp</ShimmerButton>
              <a href="#products" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">Explore products <ArrowRight className="h-4 w-4" /></a>
            </motion.div>
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.6 }} className="mt-14 grid max-w-xl grid-cols-3 gap-4 sm:gap-6 border-t border-white/10 pt-7">
              <div><dt className="eyebrow text-[10px] text-on-ink-muted">Established</dt><dd className="mt-1 font-display text-[22px] sm:text-3xl font-bold text-white whitespace-nowrap"><NumberTicker value={2018} startValue={2000} grouping={false} /></dd></div>
              <div><dt className="eyebrow text-[10px] text-on-ink-muted">We serve</dt><dd className="mt-1 font-display text-[22px] sm:text-3xl font-bold text-white whitespace-nowrap">B2B<span className="text-gold">+</span>B2C</dd></div>
              <div><dt className="eyebrow text-[10px] text-on-ink-muted">Open</dt><dd className="mt-1 font-display text-[22px] sm:text-3xl font-bold text-white whitespace-nowrap">Mon–Sat</dd></div>
            </motion.dl>
          </div>
          <motion.div style={{ y }} className="relative lg:col-span-5">
            <motion.div initial={{ opacity: 0, scale: 0.96, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.25, duration: 0.9, ease }}
              className="relative ml-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-ink-2">
              <img src="img/store-shelves.webp" alt="Battery shelves at the Laxmi Power store in Barshi" className="h-full w-full object-cover" width="1600" height="1200" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 right-5 rounded-full bg-black/40 px-3 py-1 text-[12px] text-white backdrop-blur">Our store, Barshi</p>
              <BorderBeam size={180} duration={9} borderWidth={2} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.7, ease }}
              className="absolute -right-2 -top-6 hidden w-[130px] overflow-hidden rounded-2xl border-4 border-ink shadow-2xl sm:block lg:-right-6">
              <img src="img/store-tubular.webp" alt="Tubular inverter batteries" className="aspect-[3/4] w-full object-cover" />
            </motion.div>
            <ChargeCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AppMarquee() {
  return (
    <div className="relative border-y border-line bg-surface py-3" aria-label="Applications we serve">
      <Marquee pauseOnHover className="[--duration:45s] [--gap:2.5rem]">
        {D.APPLICATIONS.map((a) => (
          <span key={a} className="flex items-center gap-10 font-display text-xl font-semibold text-fg/80 md:text-2xl">{a}<Zap className="h-4 w-4 text-gold" fill="currentColor" aria-hidden /></span>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface" />
    </div>
  )
}

/* ---------- About ---------- */
function ModelChain() {
  const steps = [
    { icon: 'BatteryFull', k: 'Battery' }, { icon: 'BatteryCharging', k: 'Inverter' },
    { icon: 'Wrench', k: 'Installation' }, { icon: 'LifeBuoy', k: 'Service' },
  ]
  return (
    <div className="relative mt-10 rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <p className="eyebrow text-muted">The integrated model we are building</p>
      <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <motion.span aria-hidden className="absolute left-6 right-6 top-1/2 hidden h-[2px] origin-left bg-gradient-to-r from-gold via-gold to-gold/30 sm:block"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
        {steps.map((s, i) => (
          <motion.div key={s.k} initial={{ y: 10 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, type: 'spring', stiffness: 260, damping: 20 }}
            className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-line bg-bg px-3 py-5 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold"><Icon name={s.icon} className="h-5 w-5" /></span>
            <span className="font-display text-lg font-semibold">{s.k}</span>
            {i < 3 && <Plus className="absolute -right-[13px] top-1/2 z-20 hidden h-[22px] w-[22px] -translate-y-1/2 rounded-full bg-gold p-1 text-ink sm:block" aria-hidden />}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="gutter py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6 min-w-0">
          <SectionHead eyebrow="About us" title="Powering your needs with trust and reliability" />
          <BlurFade delay={0.05} className="mt-7 space-y-4 text-[17px] text-muted">
            <p>Established in 2018 in Barshi, Maharashtra, Laxmi Power is engaged in the wholesale and retail distribution of batteries for motorcycles, cars, tractors and inverter applications.</p>
            <p>Over the years, Laxmi Power has developed a network serving battery dealers, automobile garages, spare-parts retailers and individual customers across Barshi and nearby markets.</p>
            <p>With a focus on customer convenience and dependable service, we are expanding towards an integrated Battery + Inverter + Installation + Service model, including digital ordering, doorstep support, battery health check-ups and reliable after-sales assistance.</p>
            <p className="text-fg">Our objective is to become a trusted regional power-solutions provider by combining quality products, accessible service and technology-enabled customer support.</p>
          </BlurFade>
          <BlurFade delay={0.1}><ModelChain /></BlurFade>
        </div>
        <div className="relative lg:col-span-6">
          <BlurFade className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4 h-[520px] sm:h-[640px]">
            <figure className="col-span-6 row-span-3 overflow-hidden rounded-3xl"><img loading="lazy" src="img/store-team.webp" alt="The Laxmi Power team with fresh battery stock" className="h-full w-full object-cover" /></figure>
            <figure className="col-span-3 row-span-3 overflow-hidden rounded-3xl"><img loading="lazy" src="img/store-rack.webp" alt="Batteries sorted by model on store shelves" className="h-full w-full object-cover" /></figure>
            <div className="col-span-3 row-span-3 flex flex-col justify-between rounded-3xl bg-ink p-5 text-on-ink sm:p-7">
              <Quote className="h-7 w-7 text-gold" aria-hidden />
              <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">More than a battery supplier.</p>
              <p className="text-sm text-on-ink-muted">Product supply, installation and ongoing support, together.</p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

/* ---------- Values / Vision ---------- */
function Values() {
  return (
    <section className="gutter border-t border-line bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Our core values" title="Six commitments behind every battery we sell" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {D.VALUES.map((v, i) => (
            <BlurFade key={v.k} delay={0.04 * i} className="bg-surface">
              <MagicCard className="h-full p-7 sm:p-8">
                <div className="relative z-20">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold-text"><Icon name={v.icon} className="h-6 w-6" /></span>
                  <h3 className="mt-6 text-2xl font-bold">{v.k}</h3>
                  <p className="mt-2 text-muted">{v.v}</p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

function Vision() {
  return (
    <section className="gutter py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-gold-text">Vision, mission & goals</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[
            { k: 'Our Vision', v: 'To become a trusted and technology-enabled power-solutions provider in the region, delivering reliable batteries, inverters, installation and after-sales services through a strong local network, digital innovation and customer-centric solutions.' },
            { k: 'Our Mission', v: 'To provide quality batteries and inverter solutions with dependable installation, maintenance and after-sales service, while leveraging digital ordering, doorstep support and battery health monitoring to deliver a seamless customer experience.' },
          ].map((b, i) => (
            <BlurFade key={b.k} delay={i * 0.08} className={cn('relative overflow-hidden rounded-3xl p-8 sm:p-10', i === 0 ? 'bg-ink text-on-ink' : 'border border-line bg-surface')}>
              {i === 0 && <DotPattern className="text-white/[0.06]" />}
              <h3 className={cn('relative text-3xl font-bold', i === 0 ? 'text-gold' : 'text-fg')}>{b.k}</h3>
              <p className={cn('relative mt-5 text-lg leading-relaxed', i === 0 ? 'text-on-ink-muted' : 'text-muted')}>{b.v}</p>
            </BlurFade>
          ))}
        </div>
        <BlurFade className="mt-6 rounded-3xl border border-line bg-surface p-8 sm:p-10">
          <h3 className="text-3xl font-bold">Our Goals</h3>
          <ul className="mt-7 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {D.GOALS.map((g) => (
              <li key={g} className="flex gap-3 text-[17px]"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span><span>{g}</span></li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  )
}

/* ---------- Products ---------- */
function Products() {
  return (
    <section id="products" className="gutter border-t border-line bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Products & services" title="Power solutions for every requirement" intro="Power solutions for automotive, residential, commercial and agricultural requirements." />
          <a href={D.WA('Hello Laxmi Power, I need help choosing a battery / inverter.')} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold-text hover:underline">Ask for a recommendation <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-14 grid auto-rows-[minmax(300px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
          {D.SERVICES.map((s, i) => (
            <BlurFade key={s.title} delay={0.04 * i} className={cn('min-w-0', s.span)}>
              <motion.article whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl bg-ink text-on-ink">
                <img loading="lazy" src={s.img} alt={s.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F22] via-[#0B0F22]/70 to-[#0B0F22]/5" />
                <div className="relative p-6 sm:p-7">
                  <div className="flex items-center gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-ink"><Icon name={s.icon} className="h-5 w-5" /></span>
                    {s.planned && <span className="rounded-full border border-white/25 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-white/85">Planned</span>}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] text-white/80">{s.text}</p>
                </div>
              </motion.article>
            </BlurFade>
          ))}
          <BlurFade delay={0.2} className="min-w-0 lg:col-span-2">
            <div className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-bg p-7 sm:p-8">
              <DotPattern className="text-fg/[0.06]" />
              <div className="relative">
                <p className="eyebrow text-gold-text">Not sure what fits?</p>
                <h3 className="mt-3 text-3xl font-bold">Tell us your vehicle or inverter. We’ll suggest suitable options.</h3>
                <p className="mt-3 max-w-md text-muted">Share the model, or your backup load at home or shop, and our team will help you enquire about availability.</p>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-3">
                <ShimmerButton href={D.WA('Hello Laxmi Power, please suggest a battery for: ')} target="_blank" rel="noopener"><MessageCircle className="h-5 w-5" />Send details on WhatsApp</ShimmerButton>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

/* ---------- Customers ---------- */
function Customers() {
  const [active, setActive] = useState(0)
  const s = D.SEGMENTS[active]
  return (
    <section id="customers" className="gutter py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Who we serve" title="From village workshops to family homes" />
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5" role="tablist" aria-label="Customer groups">
            {D.SEGMENTS.map((seg, i) => (
              <button key={seg.title} role="tab" aria-selected={active === i} aria-controls="segment-panel" id={`seg-${i}`} onClick={() => setActive(i)}
                className={cn('relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors', active === i ? 'text-on-ink' : 'text-fg hover:bg-surface')}>
                {active === i && <motion.span layoutId="seg-pill" className="absolute inset-0 rounded-2xl bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className={cn('relative grid h-11 w-11 shrink-0 place-items-center rounded-xl', active === i ? 'bg-gold text-ink' : 'bg-surface border border-line text-gold-text')}><Icon name={seg.icon} className="h-5 w-5" /></span>
                <span className="relative min-w-0">
                  <span className="block font-display text-lg font-semibold">{seg.title}</span>
                  <span className={cn('block text-sm', active === i ? 'text-on-ink-muted' : 'text-muted')}>{seg.text}</span>
                </span>
              </button>
            ))}
          </div>
          <div id="segment-panel" role="tabpanel" aria-labelledby={`seg-${active}`} className="relative min-h-[360px] overflow-hidden rounded-3xl bg-ink lg:col-span-7 lg:min-h-[560px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img key={s.img} src={s.img} alt={s.alt} loading="lazy"
                initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.55, ease }}
                className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0F22] to-transparent p-7 pt-24">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={s.title} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }} transition={{ duration: 0.25 }}
                  className="font-display text-2xl font-bold text-white sm:text-3xl">{s.title}</motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Why choose ---------- */
function Why() {
  return (
    <section className="gutter border-t border-line bg-surface py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Why choose Laxmi Power" title="More than a battery supplier" intro="We aim to make battery and inverter purchasing and servicing simpler by bringing product supply, installation and ongoing support together." />
          <BlurFade delay={0.1} className="relative mt-10 overflow-hidden rounded-3xl">
            <img loading="lazy" src="img/tester.webp" alt="Battery tester showing a good battery result" className="aspect-[4/3] w-full object-cover" />
            <BorderBeam size={140} duration={10} />
          </BlurFade>
        </div>
        <ol className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          {D.WHY.map((w, i) => (
            <BlurFade as="li" key={w.k} delay={0.05 * i} className="rounded-3xl border border-line bg-bg p-7">
              <span className="font-mono text-sm text-gold-text tnum">{String(i + 1).padStart(2, '0')} / 06</span>
              <h3 className="mt-4 text-2xl font-bold">{w.k}</h3>
              <p className="mt-2 text-muted">{w.v}</p>
            </BlurFade>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Team ---------- */
function Team() {
  const team = [
    { name: 'Madhubala Vidhate', role: 'Sales & Purchase Manager', img: 'img/madhubala.webp', since: 'With Laxmi Power for five years',
      bio: 'A homemaker by background, Madhubala Vidhate has been associated with Laxmi Power for the past five years. With a strong desire to learn, work and become financially independent, she embraced the opportunity offered by Mrs. Sushma Sagar Agawane. Her journey reflects how the right opportunity can empower a homemaker to become confident, skilled and financially self-reliant.',
      quote: 'Sushma Ma’am gave me the opportunity to work and earn independently. Today, Laxmi Power has given me financial stability, confidence, and a sense of independence. I am truly grateful for this opportunity and proud to be part of Laxmi Power.' },
    { name: 'Dipali Ukirde', role: 'Accountant', img: 'img/dipali.webp', since: 'With Laxmi Power for two years',
      bio: 'Dipali Ukirde has been working as an Accountant with Laxmi Power for the past two years. A Commerce graduate with accounting experience, she was given the opportunity by Mrs. Sushma Sagar Agawane to contribute her skills and build a stable source of income. Alongside managing her responsibilities as a homemaker, Dipali is also passionate about painting and preparing and selling homemade products such as papad and pickles. Her journey reflects her dedication to work, willingness to learn, and determination to make the most of her skills and opportunities.' },
  ]
  return (
    <section id="team" className="gutter py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Meet our founder & team" title="A business built by women, for Barshi" />
        <BlurFade className="mt-14 grid overflow-hidden rounded-[32px] bg-ink text-on-ink lg:grid-cols-12">
          <div className="relative min-h-[420px] lg:col-span-5">
            <img loading="lazy" src="img/founder.webp" alt="Mrs. Sushma Sagar Agawane, Founder and CEO of Laxmi Power" className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
          <div className="relative p-8 sm:p-12 lg:col-span-7">
            <DotPattern className="text-white/[0.05]" />
            <p className="eyebrow relative text-gold">Founder & CEO</p>
            <h3 className="relative mt-3 text-4xl font-bold text-white sm:text-5xl">Mrs. Sushma Sagar Agawane</h3>
            <div className="relative mt-7 space-y-4 text-on-ink-muted">
              <p>Mrs. Sushma Sagar Agawane is a determined entrepreneur with nearly eight years of experience in the battery industry. A B.A. graduate, she began her entrepreneurial journey with an investment of just <span className="font-semibold text-white">₹10,000</span> and gradually built Laxmi Power into an established business through hard work, integrity and perseverance.</p>
              <p>Beyond the battery industry, her passion for beauty and wellness led her to receive professional training from renowned beauty expert Mrs. Sandhya Tasgaonkar and establish her own beauty parlour. A cooking enthusiast and yoga practitioner, she believes in continuous learning, discipline and personal growth.</p>
              <p>Under her leadership, Laxmi Power aims to become a trusted, technology-enabled provider of complete battery and power solutions while creating local employment opportunities and inspiring aspiring women entrepreneurs.</p>
            </div>
            <blockquote className="relative mt-9 border-l-2 border-gold pl-6">
              <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-[28px]">“Every successful journey begins with a small step, a strong belief and the determination to never give up.”</p>
            </blockquote>
          </div>
        </BlurFade>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {team.map((t, i) => (
            <BlurFade key={t.name} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface sm:flex-row">
              <img loading="lazy" src={t.img} alt={`${t.name}, ${t.role} at Laxmi Power`} className="aspect-[4/5] w-full object-cover object-top sm:w-[42%]" />
              <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
                <p className="eyebrow text-gold-text">{t.role}</p>
                <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
                <p className="mt-1 text-sm text-muted">{t.since}</p>
                {t.quote && <p className="mt-4 font-display text-[17px] font-medium leading-snug">“{t.quote}”</p>}
                <p className={cn('text-[15px] text-muted', t.quote ? 'mt-4' : 'mt-4')}>{t.bio}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Store gallery ---------- */
function Gallery() {
  return (
    <section className="border-t border-line bg-surface py-20" aria-labelledby="gallery-title">
      <div className="gutter mx-auto mb-10 flex max-w-7xl flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-gold-text">Inside our store</p>
          <h2 id="gallery-title" className="mt-3 text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold">Stocked, sorted and ready in Barshi</h2>
        </div>
        <p className="max-w-sm text-muted">Two-wheeler, car, tractor and inverter batteries, kept on hand for dealers, garages and walk-in customers.</p>
      </div>
      <div className="relative">
        <Marquee pauseOnHover className="[--duration:60s] [--gap:1rem]" repeat={3}>
          {D.GALLERY.map((g) => (
            <figure key={g.src} className={cn('h-[220px] shrink-0 overflow-hidden rounded-2xl md:h-[280px]', g.w)}>
              <img src={g.src} alt={g.alt} className="h-full w-full object-cover" />
            </figure>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface md:w-24" />
      </div>
    </section>
  )
}

/* ---------- Partners + Community ---------- */
function Partners() {
  return (
    <section className="gutter relative overflow-hidden bg-ink py-24 text-on-ink md:py-32">
      <DotPattern className="text-white/[0.06] [mask-image:radial-gradient(60%_70%_at_80%_50%,#000,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-[-200px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(242,162,58,0.18),transparent)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead onInk eyebrow="Our business partners" title="Interested in partnering with us?" intro="Laxmi Power serves a network of battery dealers, automobile garages, spare-parts retailers and other business customers. We aim to build long-term partnerships through dependable product supply, responsive communication and service support." />
          <BlurFade delay={0.1} className="mt-9 flex flex-wrap gap-3">
            <ShimmerButton href={D.WA('Hello Laxmi Power, I would like to discuss a wholesale / dealer enquiry.')} target="_blank" rel="noopener"><MessageCircle className="h-5 w-5" />Discuss a wholesale enquiry</ShimmerButton>
            <a href="#contact" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">Contact the team</a>
          </BlurFade>
        </div>
        <BlurFade delay={0.1} className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur sm:p-10">
          <p className="eyebrow text-gold">Our commitment to the community</p>
          <h3 className="mt-3 text-3xl font-bold text-white">Supporting local growth</h3>
          <p className="mt-4 text-on-ink-muted">Laxmi Power aims to contribute to the local economy by expanding its business and developing service capabilities in Barshi and surrounding markets. Our planned expansion focuses on:</p>
          <ul className="mt-6 space-y-3">
            {D.COMMUNITY.map((c) => <li key={c} className="flex gap-3 text-white/90"><Zap className="mt-1 h-4 w-4 shrink-0 text-gold" fill="currentColor" aria-hidden />{c}</li>)}
          </ul>
        </BlurFade>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="gutter py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Frequently asked questions" title="Good questions, straight answers" />
          <BlurFade delay={0.08} className="mt-8">
            <a href={D.WA('Hello Laxmi Power, I have a question.')} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold-text hover:underline">Ask us something else <ArrowUpRight className="h-4 w-4" /></a>
          </BlurFade>
        </div>
        <div className="lg:col-span-8">
          {D.FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="border-b border-line">
                <h3 className="text-lg">
                  <button id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-p-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-semibold tracking-tight">
                    <span className="flex gap-4"><span className="font-mono text-sm font-normal text-gold-text pt-1.5 tnum">Q{i + 1}</span>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line"><ChevronDown className="h-4 w-4" /></motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pl-10 text-[17px] text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */
function CopyRow({ icon: I, label, value, display, href, external = false }) {
  const [done, setDone] = useState(false)
  const copy = async (e) => {
    try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1800) }
    catch { const r = document.createRange(); r.selectNodeContents(e.currentTarget.parentElement.querySelector('[data-v]')); const s = getSelection(); s.removeAllRanges(); s.addRange(r) }
  }
  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-gold"><I className="h-5 w-5" aria-hidden /></span>
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-[10px] text-on-ink-muted">{label}</p>
        {href ? <a data-v href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})} className="block select-all break-words text-lg font-semibold text-white hover:text-gold">{display || value}</a>
          : <p data-v className="select-all break-words text-lg font-semibold text-white">{display || value}</p>}
      </div>
      {value && <button onClick={copy} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-on-ink-muted hover:bg-white/10 hover:text-white" aria-label={`Copy ${label}`}>
        {done ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
      </button>}
      <span className="sr-only" aria-live="polite">{done ? `${label} copied` : ''}</span>
    </div>
  )
}

const EMPTY_FORM = { name: '', phone: '', email: '', need: D.NEEDS[0], details: '', company: '' }

function checkForm(f) {
  const errors = {}
  if (f.name.trim().length < 2) errors.name = 'Please enter your name so we know who to reply to.'
  const digits = f.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = 'Please enter a valid email address, or leave it blank.'
  return errors
}

function ContactForm({ source = 'section', idPrefix = 'c', compact = false, onSent }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [message, setMessage] = useState('')
  const [emailed, setEmailed] = useState(false)
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined })) }
  const id = (k) => `${idPrefix}-${k}`

  const submit = async (e) => {
    e.preventDefault()
    const found = checkForm(form)
    setErrors(found)
    const first = ['name', 'phone', 'email'].find((k) => found[k])
    if (first) { document.getElementById(id(first))?.focus(); return }
    setStatus('sending'); setMessage('')
    try {
      const res = await fetch(D.CONTACT_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, source }) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors)
        throw new Error(data.message || 'We could not send your message right now.')
      }
      setEmailed(!!data.emailed); setStatus('sent')
      onSent?.()
    } catch (err) {
      setStatus('failed')
      setMessage(err.message === 'Failed to fetch' ? 'We could not reach our server. Please call or WhatsApp us instead.' : err.message)
    }
  }

  const waText = `Hello Laxmi Power,\nName: ${form.name}${form.phone ? `\nPhone: ${form.phone}` : ''}\nI need: ${form.need}${form.details ? `\nDetails: ${form.details}` : ''}`
  const field = 'mt-2 w-full min-h-[48px] rounded-xl border bg-bg px-4 py-3 text-[16px] text-fg placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40'
  const fieldCls = (k) => cn(field, errors[k] ? 'border-danger' : 'border-line')
  const Err = ({ k }) => errors[k] ? <p id={id(`${k}-err`)} role="alert" className="mt-2 text-sm text-danger">{errors[k]}</p> : null
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? id(`${k}-err`) : undefined })

  if (status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start py-6" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"><Check className="h-7 w-7" strokeWidth={2.5} /></span>
        <h3 className="mt-5 text-2xl font-bold">Thank you, {form.name.trim().split(' ')[0]}!</h3>
        <p className="mt-2 max-w-md text-muted">We have received your enquiry and will call you on <b className="text-fg">{form.phone}</b> during business hours (Mon–Sat, 10 am – 7 pm).{form.email && emailed && <> A confirmation has been sent to <b className="text-fg">{form.email}</b>.</>}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={D.WA(waText)} target="_blank" rel="noopener" className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#1FAF5A] px-6 py-3 font-semibold text-white hover:brightness-110"><WhatsAppIcon className="h-5 w-5" />Also send on WhatsApp</a>
          {!compact && <button type="button" onClick={() => { setForm(EMPTY_FORM); setStatus('idle') }} className="inline-flex min-h-[48px] items-center rounded-full border border-line px-6 py-3 font-semibold hover:bg-surface">Send another enquiry</button>}
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className={cn('grid gap-5 sm:grid-cols-2', compact && 'gap-4')}>
        <div><label htmlFor={id('name')} className="text-sm font-semibold">Your name <span className="text-gold-text" aria-hidden>*</span></label>
          <input id={id('name')} autoComplete="name" required value={form.name} onChange={set('name')} className={fieldCls('name')} placeholder="e.g. Rahul Patil" {...aria('name')} />
          <Err k="name" /></div>
        <div><label htmlFor={id('phone')} className="text-sm font-semibold">Mobile number <span className="text-gold-text" aria-hidden>*</span></label>
          <input id={id('phone')} type="tel" inputMode="tel" autoComplete="tel" required value={form.phone} onChange={set('phone')} className={fieldCls('phone')} placeholder="10-digit mobile number" {...aria('phone')} />
          <Err k="phone" /></div>
        <div className="sm:col-span-2"><label htmlFor={id('email')} className="text-sm font-semibold">Email <span className="font-normal text-muted">(optional, for a confirmation email)</span></label>
          <input id={id('email')} type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set('email')} className={fieldCls('email')} placeholder="you@example.com" {...aria('email')} />
          <Err k="email" /></div>
        <div className="sm:col-span-2"><label htmlFor={id('need')} className="text-sm font-semibold">What do you need?</label>
          <select id={id('need')} value={form.need} onChange={set('need')} className={fieldCls('need')}>
            {D.NEEDS.map((o) => <option key={o}>{o}</option>)}
          </select></div>
        <div className="sm:col-span-2"><label htmlFor={id('details')} className="text-sm font-semibold">Vehicle or inverter details <span className="font-normal text-muted">(optional)</span></label>
          <textarea id={id('details')} rows={compact ? 2 : 4} value={form.details} onChange={set('details')} className={fieldCls('details')} placeholder="e.g. Maruti Swift 2019 petrol, or 900 VA home inverter" /></div>
        {/* Honeypot: hidden from people, filled in by spam bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Company<input tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} /></label></div>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-fg px-6 py-3 font-semibold text-bg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100">
          {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Send enquiry <ArrowRight className="h-4 w-4" /></>}
        </button>
        <a href={D.WA(waText)} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#168A46] hover:underline dark:text-[#3DDC84]"><WhatsAppIcon className="h-5 w-5" />or WhatsApp us</a>
      </div>
      {status === 'failed' && <p role="alert" className="mt-4 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{message} <a href={D.TEL} className="font-semibold underline">Call {D.PHONE_DISPLAY}</a></p>}
    </form>
  )
}

function Contact() {
  return (
    <section id="contact" className="gutter border-t border-line bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Contact us" title="Get in touch with Laxmi Power" intro="Looking for a battery, inverter or installation support? Contact us for product enquiries, wholesale requirements and service information." />
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <BlurFade className="relative overflow-hidden rounded-3xl bg-ink p-7 text-on-ink sm:p-9 lg:col-span-5">
            <CopyRow icon={Phone} label="Phone" value={`+91${D.PHONE}`} display={D.PHONE_DISPLAY} href={D.TEL} />
            <CopyRow icon={WhatsAppIcon} label="WhatsApp" value={`+91${D.WHATSAPP}`} display={D.WHATSAPP_DISPLAY} href={D.WA('Hello Laxmi Power, I would like to enquire about a battery / inverter.')} external />
            <CopyRow icon={Mail} label="Email" value={D.EMAIL} href={D.MAILTO} />
            <CopyRow icon={MapPin} label="Location" value={D.ADDRESS} href={D.MAPS} external />
            <div className="flex items-center gap-4 py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-gold"><Clock className="h-5 w-5" aria-hidden /></span>
              <div><p className="eyebrow text-[10px] text-on-ink-muted">Business hours</p><p className="text-lg font-semibold text-white">Monday to Saturday</p><p className="font-mono text-on-ink-muted tnum">10:00 am – 7:00 pm</p></div>
            </div>
            <a href={D.MAPS} target="_blank" rel="noopener" className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold hover:underline">Open Barshi in Google Maps <ArrowUpRight className="h-4 w-4" /></a>
          </BlurFade>
          <BlurFade delay={0.08} className="relative rounded-3xl border border-line bg-bg p-7 sm:p-9 lg:col-span-7">
            <h3 className="text-2xl font-bold">Send us an enquiry</h3>
            <p className="mt-2 mb-7 text-muted">Share your details and our team will call you back. Add your email to get a confirmation.</p>
            <ContactForm source="section" idPrefix="c" />
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="gutter bg-ink pb-10 pt-20 text-on-ink">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo dark />
            <p className="mt-6 max-w-sm font-display text-2xl font-semibold leading-snug text-white">Your Trusted Partner for Complete Power Solutions.</p>
            <p className="mt-3 max-w-sm text-on-ink-muted">Automotive batteries, inverter solutions, installation and service support in Barshi and surrounding markets.</p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-gold">Quick links</p>
            <ul className="mt-5 space-y-1">
              {[{ id: 'top', label: 'Home' }, ...D.NAV].map((n) => <li key={n.id}><a href={`#${n.id}`} className="inline-flex min-h-[36px] items-center text-on-ink-muted hover:text-white">{n.label}</a></li>)}
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

/* ---------- WhatsApp float + welcome pop-up ---------- */
function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function WhatsAppFloat() {
  return (
    <motion.a href={D.WA('Hello Laxmi Power, I would like to enquire about a battery / inverter.')} target="_blank" rel="noopener"
      aria-label={`Chat with Laxmi Power on WhatsApp, ${D.WHATSAPP_DISPLAY}`}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      className="group fixed z-[60] flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 active:scale-95"
      style={{ right: 'max(16px, env(safe-area-inset-right, 0px))', bottom: 'max(16px, env(safe-area-inset-bottom, 0px))' }}>
      <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-1 sm:inline">Chat with us</span>
    </motion.a>
  )
}

const POPUP_KEY = 'lp_welcome_popup_seen'
function WelcomePopup() {
  const [open, setOpen] = useState(false)
  const panel = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    let seen = false
    try { seen = localStorage.getItem(POPUP_KEY) === '1' } catch {}
    if (seen) return
    const t = setTimeout(() => {
      lastFocus.current = document.activeElement
      setOpen(true)
      try { localStorage.setItem(POPUP_KEY, '1') } catch {}
    }, 4000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && panel.current) { // keep focus inside the dialog
        const f = panel.current.querySelectorAll('a[href],button:not([disabled]),input:not([tabindex="-1"]),select,textarea')
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    setTimeout(() => panel.current?.querySelector('input')?.focus({ preventScroll: true }), 50)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); lastFocus.current?.focus?.({ preventScroll: true }) }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#0B0F22]/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-labelledby="welcome-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.4, ease }}
            className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-surface shadow-2xl sm:rounded-[28px] md:grid-cols-5"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <div className="relative hidden overflow-hidden bg-ink p-7 text-on-ink md:col-span-2 md:flex md:flex-col md:justify-between">
              <img src="img/store-shelves.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
              <Mark dark className="relative h-12 w-12" />
              <div className="relative">
                <p className="eyebrow text-gold">Since 2018 · Barshi</p>
                <p className="mt-3 font-display text-2xl font-bold leading-tight text-white">Batteries, inverters, installation & service.</p>
                <a href={D.TEL} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold"><Phone className="h-4 w-4 text-gold" />{D.PHONE_DISPLAY}</a>
              </div>
            </div>
            <div className="p-6 sm:p-8 md:col-span-3">
              <button onClick={() => setOpen(false)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-bg hover:text-fg" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
              <p className="eyebrow text-gold-text">Welcome to Laxmi Power</p>
              <h2 id="welcome-title" className="mt-2 pr-10 text-[28px] font-bold">Need a battery or inverter?</h2>
              <p className="mt-2 mb-6 text-muted">Leave your number and our team will call you back with suitable options.</p>
              <ContactForm source="popup" idPrefix="p" compact />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gold" />
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <AppMarquee />
        <About />
        <Values />
        <Vision />
        <Products />
        <Customers />
        <Why />
        <Team />
        <Gallery />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <WelcomePopup />
    </>
  )
}
