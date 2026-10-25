// Products page: every category with image, key specifications and enquiry options, then buying FAQs.
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ChevronDown, Phone, Info } from 'lucide-react'
import { BlurFade } from '../components/magicui/blur-fade'
import { cn } from '../lib/utils'
import { ease, Icon, WhatsAppIcon, SectionHead, Section, PageHeader, chip, btn } from '../ui'
import { openEnquiry } from '../contact'
import * as D from '../data'

export const goToCategory = (id) => {
  const el = document.getElementById(`cat-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#/products/${id}`)
}

function Header() {
  return (
    <PageHeader crumb="Products" title="Our" accent="Products" intro="Batteries for every vehicle and inverter solutions for every home and business, with installation and after-sales service from our Barshi team.">
      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Jump to a category">
        {D.PRODUCTS.map((p) => (
          <li key={p.id}><button onClick={() => goToCategory(p.id)} className={chip(false)}><Icon name={p.icon} className="h-4 w-4" />{p.short}</button></li>
        ))}
      </ul>
    </PageHeader>
  )
}

function Category({ p, i }) {
  const flip = i % 2 === 1
  return (
    <BlurFade as="article" id={`cat-${p.id}`} aria-labelledby={`cat-${p.id}-title`}
      className="grid scroll-mt-24 overflow-hidden rounded-3xl border border-gold/30 bg-bg shadow-[0_1px_0_rgba(13,31,77,0.04)] lg:grid-cols-12">
      <div className={cn('relative min-h-[260px] bg-surface lg:col-span-5', flip && 'lg:order-2')}>
        <img loading="lazy" src={p.img} alt={p.alt} className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-gold text-[#0D1F4D] shadow-lg"><Icon name={p.icon} className="h-6 w-6" /></span>
      </div>
      <div className="flex flex-col p-6 sm:p-8 lg:col-span-7">
        <p className="eyebrow text-muted">{String(i + 1).padStart(2, '0')} / {String(D.PRODUCTS.length).padStart(2, '0')}</p>
        <h2 id={`cat-${p.id}-title`} className="mt-2 text-[clamp(1.4rem,2.2vw,1.75rem)] font-semibold text-gold-text">{p.title}</h2>
        <p className="mt-3 text-[17px] text-muted">{p.text}</p>
        <dl className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-line">
          {p.specs.map(([k, v], j) => (
            <div key={k} className={cn('p-4', j % 2 === 1 && 'border-l border-line', j > 1 && 'border-t border-line')}>
              <dt className="eyebrow text-[10px] text-muted">{k}</dt>
              <dd className="mt-1 font-semibold text-fg">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Suitable for">
          {p.tags.map((t) => <li key={t} className="rounded-full bg-surface px-3 py-1 text-sm text-fg/80">{t}</li>)}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
          <button onClick={() => openEnquiry(p.need)} className={btn.primary}>Enquire now <ArrowRight className="h-4 w-4" /></button>
          <a href={D.WA(`Hello Laxmi Power, I would like to enquire about ${p.title.toLowerCase()}. My vehicle / requirement: `)} target="_blank" rel="noopener" className={btn.whatsapp}><WhatsAppIcon className="h-5 w-5" />WhatsApp</a>
          <a href={D.TEL} className={btn.outline}><Phone className="h-4 w-4" />Call</a>
        </div>
      </div>
    </BlurFade>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Frequently asked questions" title="Good questions, straight answers" />
          <BlurFade delay={0.08} className="mt-8">
            <a href={D.WA('Hello Laxmi Power, I have a question.')} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold-text hover:underline"><WhatsAppIcon className="h-5 w-5" />Ask us something else</a>
          </BlurFade>
        </div>
        <div className="lg:col-span-8">
          {D.FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="border-b border-line">
                <h3 className="text-lg">
                  <button id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-p-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold tracking-tight sm:text-xl">
                    <span className="flex gap-4"><span className="pt-1 text-sm font-normal text-gold-text tnum">Q{i + 1}</span>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line"><ChevronDown className="h-4 w-4" /></motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pl-10 text-[17px] text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Section tone="surface">
        <div className="grid gap-8">
          {D.PRODUCTS.map((p, i) => <Category key={p.id} p={p} i={i} />)}
        </div>
        <p className="mt-8 flex items-start gap-2 text-sm text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />Specifications show typical ranges for each category. Exact models, brands and prices depend on current stock. Contact us for availability.</p>
      </Section>
      <FAQ />
    </>
  )
}
