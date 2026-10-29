// Shared brand + layout primitives.
import { Handshake, BadgeCheck, UsersRound, Truck, Activity, Sprout, Car, Bike, BatteryCharging, BatteryFull, Wrench, Gauge, Smartphone, Home, Store, Tractor, Building2, LifeBuoy, Zap, ChevronRight } from 'lucide-react'
import { BlurFade } from './components/magicui/blur-fade'
import { DotPattern } from './components/magicui/dot-pattern'
import { cn } from './lib/utils'

export const ease = [0.22, 1, 0.36, 1]
export const ORANGE = '#F58220'

/* ---------- Brand ---------- */
export function Mark({ className, petal = '#1E3A8A', base = '#0D1F4D', dark = false }) {
  const c1 = dark ? '#E9EEFA' : base, c2 = dark ? '#A9BCEB' : petal
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 82 C34 80 14 72 4 56 C20 52 38 60 50 82Z" fill={c1} />
      <path d="M50 82 C66 80 86 72 96 56 C80 52 62 60 50 82Z" fill={c1} />
      <path d="M50 82 C36 72 22 52 22 26 C40 36 50 56 50 82Z" fill={c2} />
      <path d="M50 82 C64 72 78 52 78 26 C60 36 50 56 50 82Z" fill={c2} />
      <path fillRule="evenodd" fill={ORANGE} d="M50 6 C62 22 66 40 66 54 C66 68 58 78 50 84 C42 78 34 68 34 54 C34 40 38 22 50 6Z M54 20 L40 52 L49 52 L45 72 L61 40 L52 40 L56 20Z" />
      <rect x="24" y="88" width="52" height="5" rx="2.5" fill={c1} />
    </svg>
  )
}

export function Logo({ dark = false, className }) {
  return (
    <a href="#top" className={cn('flex shrink-0 items-center gap-2.5 whitespace-nowrap', className)} aria-label="Laxmi Power home">
      <Mark dark={dark} className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[21px] tracking-tight', dark ? 'text-white' : 'text-fg')}><b className="font-semibold">Laxmi</b> <span className="font-normal">Power</span></span>
        <span className="mt-1 font-deva text-[13px] text-gold">लक्ष्मी पॉवर</span>
      </span>
    </a>
  )
}

const Icons = { Handshake, BadgeCheck, UsersRound, Truck, Activity, Sprout, Car, Bike, BatteryCharging, BatteryFull, Wrench, Gauge, Smartphone, Home, Store, Tractor, Building2, LifeBuoy }
export function Icon({ name, className }) { const C = Icons[name] || Zap; return <C className={className} aria-hidden="true" strokeWidth={1.75} /> }

export function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/* ---------- Typography scale (one heading style for every section) ---------- */
export function SectionHead({ eyebrow, title, intro, center = false, onInk = false, className }) {
  return (
    <BlurFade className={cn('max-w-2xl', center && 'mx-auto text-center', className)}>
      <p className={cn('eyebrow mb-3', onInk ? 'text-gold' : 'text-gold-text')}>{eyebrow}</p>
      <h2 className={cn('text-[clamp(1.6rem,2.8vw,2.25rem)] font-semibold', onInk ? 'text-on-ink' : 'text-fg')}>{title}</h2>
      {intro && <p className={cn('mt-4 text-lg', onInk ? 'text-on-ink-muted' : 'text-muted')}>{intro}</p>}
    </BlurFade>
  )
}

// Name and designation share one size; the designation sits directly below the name.
export function NameRole({ name, role, onInk = false, as: H = 'h3', className }) {
  return (
    <div className={cn('text-lg leading-snug sm:text-xl', className)}>
      <H className={cn('font-semibold', onInk ? 'text-white' : 'text-fg')}>{name}</H>
      <p className={cn('font-display font-medium', onInk ? 'text-gold' : 'text-gold-text')}>{role}</p>
    </div>
  )
}

// Every section uses the same vertical rhythm and width.
export function Section({ id, className, children, tone = 'bg', ...rest }) {
  const tones = { bg: 'bg-bg', surface: 'bg-surface border-y border-line', ink: 'bg-ink text-on-ink' }
  return (
    <section id={id} className={cn('gutter relative py-20 md:py-24', tones[tone], className)} {...rest}>
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

// Navy title band used at the top of inner pages (Products, Gallery).
export function PageHeader({ crumb, title, accent, intro, children }) {
  return (
    <section className="gutter relative overflow-hidden bg-ink text-on-ink">
      <DotPattern className="text-white/[0.06] [mask-image:radial-gradient(60%_80%_at_70%_30%,#000,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(245,130,32,0.25),transparent)]" />
      <div className="relative mx-auto max-w-7xl pb-14 pt-10 md:pb-16 md:pt-14">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-on-ink-muted">
          <a href="#top" className="hover:text-white">Home</a><ChevronRight className="h-3.5 w-3.5" aria-hidden /><span className="text-white" aria-current="page">{crumb}</span>
        </nav>
        <h1 className="mt-5 text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold">{title} <span className="text-gold">{accent}</span></h1>
        <p className="mt-4 max-w-2xl text-lg text-on-ink-muted">{intro}</p>
        {children}
      </div>
    </section>
  )
}

// Pill-shaped filter / jump chip on the navy page header.
export const chip = (on) => cn('inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors',
  on ? 'border-gold bg-gold text-[#0D1F4D]' : 'border-white/15 bg-white/5 text-white hover:border-gold hover:bg-gold hover:text-[#0D1F4D]')

export const btn = {
  primary: 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-[#0D1F4D] shadow-[0_8px_24px_-8px_rgba(245,130,32,0.7)] transition hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0',
  whatsapp: 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#1FAF5A] px-6 py-3 font-semibold text-white transition hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0',
  ghostInk: 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10',
  outline: 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-line bg-bg px-5 py-2.5 font-semibold text-fg transition-colors hover:border-gold hover:text-gold-text',
}
