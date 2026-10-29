// About Us page: our story, vision & mission, why Laxmi Power and the full team stories.
// Each block has an id so links like #/about/team or #/about/sushma land on it.
import { Check, Plus, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { BlurFade } from '../components/magicui/blur-fade'
import { DotPattern } from '../components/magicui/dot-pattern'
import { cn } from '../lib/utils'
import { ease, Icon, SectionHead, Section, PageHeader, NameRole, chip } from '../ui'
import * as D from '../data'

const PARTS = [
  { id: 'story', label: 'Our story' },
  { id: 'vision', label: 'Vision & mission' },
  { id: 'why', label: 'Why Laxmi Power' },
  { id: 'team', label: 'Our team' },
]

export const goToAbout = (id) => {
  const el = document.getElementById(`about-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#/about/${id}`)
}

function Story() {
  const steps = [
    { icon: 'BatteryFull', k: 'Battery' }, { icon: 'BatteryCharging', k: 'Inverter' },
    { icon: 'Wrench', k: 'Installation' }, { icon: 'LifeBuoy', k: 'Service' },
  ]
  return (
    <Section id="about-story" tone="surface" className="scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <SectionHead eyebrow="Our story" title="Powering your needs with trust and reliability" />
          <BlurFade delay={0.05} className="mt-6 space-y-4 text-[17px] text-muted">
            <p>Established in 2018 in Barshi, Maharashtra, Laxmi Power is engaged in the wholesale and retail distribution of batteries for motorcycles, cars, tractors and inverter applications.</p>
            <p>Over the years, Laxmi Power has developed a network serving battery dealers, automobile garages, spare-parts retailers and individual customers across Barshi and nearby markets.</p>
            <p>With a focus on customer convenience and dependable service, we are expanding towards an integrated Battery + Inverter + Installation + Service model, including digital ordering, doorstep support, battery health check-ups and reliable after-sales assistance.</p>
            <p className="text-fg">Our objective is to become a trusted regional power-solutions provider by combining quality products, accessible service and technology-enabled customer support.</p>
          </BlurFade>
          <BlurFade delay={0.1} className="mt-8 rounded-3xl border border-line bg-bg p-5 sm:p-6">
            <p className="eyebrow text-muted">The integrated model we are building</p>
            <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <motion.span aria-hidden className="absolute left-6 right-6 top-1/2 hidden h-[2px] origin-left bg-gold sm:block"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
              {steps.map((s, i) => (
                <div key={s.k} className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-4 text-center">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-gold"><Icon name={s.icon} className="h-5 w-5" /></span>
                  <span className="font-display font-medium">{s.k}</span>
                  {i < 3 && <Plus className="absolute -right-[13px] top-1/2 z-20 hidden h-[22px] w-[22px] -translate-y-1/2 rounded-full bg-gold p-1 text-[#0D1F4D] sm:block" aria-hidden />}
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
        <BlurFade className="grid h-[460px] grid-cols-6 grid-rows-6 gap-3 sm:h-[560px] sm:gap-4 lg:col-span-6">
          <figure className="col-span-6 row-span-3 overflow-hidden rounded-3xl"><img loading="lazy" src="img/store-team.webp" alt="The Laxmi Power team with fresh battery stock" className="h-full w-full object-cover" /></figure>
          <figure className="col-span-3 row-span-3 overflow-hidden rounded-3xl"><img loading="lazy" src="img/store-rack.webp" alt="Batteries sorted by model on store shelves" className="h-full w-full object-cover" /></figure>
          <div className="col-span-3 row-span-3 flex flex-col justify-between rounded-3xl bg-ink p-5 text-on-ink sm:p-6">
            <Quote className="h-6 w-6 text-gold" aria-hidden />
            <p className="font-display text-lg font-medium leading-snug text-white sm:text-xl">More than a battery supplier.</p>
            <p className="text-sm text-on-ink-muted">Product supply, installation and ongoing support, together.</p>
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}

function VisionMission() {
  return (
    <Section id="about-vision" className="scroll-mt-20">
      <SectionHead eyebrow="Vision, mission & goals" title="Where we are headed" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {[{ k: 'Our Vision', v: D.VISION, ink: true }, { k: 'Our Mission', v: D.MISSION }].map((b, i) => (
          <BlurFade key={b.k} delay={i * 0.08} className={cn('relative overflow-hidden rounded-3xl p-7 sm:p-9', b.ink ? 'bg-ink text-on-ink' : 'border border-line bg-surface')}>
            {b.ink && <DotPattern className="text-white/[0.06]" />}
            <h3 className={cn('relative text-2xl', b.ink ? 'text-gold' : 'text-fg')}>{b.k}</h3>
            <p className={cn('relative mt-4 text-[17px] leading-relaxed', b.ink ? 'text-on-ink-muted' : 'text-muted')}>{b.v}</p>
          </BlurFade>
        ))}
      </div>
      <BlurFade className="mt-6 rounded-3xl border border-line bg-surface p-7 sm:p-9">
        <h3 className="text-2xl">Our Goals</h3>
        <ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
          {D.GOALS.map((g) => (
            <li key={g} className="flex gap-3 text-[17px]"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-[#0D1F4D]"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span><span>{g}</span></li>
          ))}
        </ul>
      </BlurFade>
      <div className="mt-16">
        <SectionHead eyebrow="Our core values" title="Six commitments behind every battery we sell" />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {D.VALUES.map((v, i) => (
            <BlurFade as="li" key={v.k} delay={0.04 * i} className="bg-bg p-6 sm:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/15 text-gold-text"><Icon name={v.icon} className="h-5 w-5" /></span>
              <h3 className="mt-5 text-xl">{v.k}</h3>
              <p className="mt-1.5 text-muted">{v.v}</p>
            </BlurFade>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function Why() {
  return (
    <Section id="about-why" tone="surface" className="scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Why Laxmi Power" title="More than a battery supplier" intro="We aim to make battery and inverter purchasing and servicing simpler by bringing product supply, installation and ongoing support together." />
          <BlurFade delay={0.1} className="mt-8 overflow-hidden rounded-3xl">
            <img loading="lazy" src="img/tester.webp" alt="Battery tester showing a good battery result" className="aspect-[4/3] w-full object-cover" />
          </BlurFade>
        </div>
        <ol className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          {D.WHY.map((w, i) => (
            <BlurFade as="li" key={w.k} delay={0.05 * i} className="rounded-3xl border border-line bg-bg p-6 sm:p-7">
              <span className="text-sm text-gold-text tnum">{String(i + 1).padStart(2, '0')} / {String(D.WHY.length).padStart(2, '0')}</span>
              <h3 className="mt-3 text-xl">{w.k}</h3>
              <p className="mt-1.5 text-muted">{w.v}</p>
            </BlurFade>
          ))}
        </ol>
      </div>
    </Section>
  )
}

function Team() {
  const [founder, ...team] = D.TEAM
  return (
    <Section id="about-team" className="scroll-mt-20">
      <SectionHead eyebrow="Meet our founder & team" title="A business built by women, for Barshi" />
      <BlurFade id={`about-${founder.id}`} className="mt-10 grid scroll-mt-24 overflow-hidden rounded-[28px] bg-ink text-on-ink lg:grid-cols-12">
        <div className="relative min-h-[380px] lg:col-span-5">
          <img loading="lazy" src={founder.img} alt={`${founder.name}, ${founder.role} of Laxmi Power`} className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
        <div className="relative p-7 sm:p-10 lg:col-span-7">
          <DotPattern className="text-white/[0.05]" />
          <NameRole onInk as="h3" name={founder.name} role={founder.role} className="relative sm:text-2xl" />
          <p className="relative mt-1 text-sm text-on-ink-muted">{founder.since}</p>
          <div className="relative mt-6 space-y-4 text-on-ink-muted">
            {founder.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <blockquote className="relative mt-7 border-l-2 border-gold pl-5">
            <p className="font-display text-lg font-medium leading-relaxed text-white sm:text-xl">“{founder.quote}”</p>
          </blockquote>
        </div>
      </BlurFade>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {team.map((t, i) => (
          <BlurFade key={t.id} id={`about-${t.id}`} delay={i * 0.08} className="flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-line bg-surface sm:flex-row">
            <img loading="lazy" src={t.img} alt={`${t.name}, ${t.role} at Laxmi Power`} className="aspect-[4/5] w-full object-cover object-top sm:w-[40%]" />
            <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
              <NameRole name={t.name} role={t.role} />
              <p className="mt-1 text-sm text-muted">{t.since}</p>
              {t.quote && <p className="mt-4 font-display text-base font-medium leading-relaxed">“{t.quote}”</p>}
              {t.bio.map((p) => <p key={p.slice(0, 24)} className="mt-4 text-[15px] text-muted">{p}</p>)}
            </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHeader crumb="About Us" title="About" accent="Laxmi Power" intro="A women-led battery and inverter business in Barshi, serving homes, farms, garages and businesses since 2018.">
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Jump to a section">
          {PARTS.map((p) => <li key={p.id}><button onClick={() => goToAbout(p.id)} className={chip(false)}>{p.label}</button></li>)}
        </ul>
      </PageHeader>
      <Story />
      <VisionMission />
      <Why />
      <Team />
    </>
  )
}
