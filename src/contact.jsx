// Contact form, Contact Us section, floating WhatsApp button and the enquiry pop-up.
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ArrowUpRight, Check, Copy, X, Phone, Mail, Clock, MapPin, Loader2 } from 'lucide-react'
import { BlurFade } from './components/magicui/blur-fade'
import { cn } from './lib/utils'
import { ease, Mark, WhatsAppIcon, SectionHead, Section } from './ui'
import * as D from './data'

/** Open the enquiry pop-up from anywhere, optionally with a requirement pre-selected. */
export const openEnquiry = (need) => window.dispatchEvent(new CustomEvent('lp:enquire', { detail: { need } }))

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
        <a data-v href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})} translate={label === 'Location' ? undefined : 'no'} className={cn('block select-all break-words text-lg font-semibold text-white hover:text-gold', label !== 'Location' && 'notranslate')}>{display || value}</a>
      </div>
      <button onClick={copy} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-on-ink-muted hover:bg-white/10 hover:text-white" aria-label={`Copy ${label}`}>
        {done ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
      </button>
      <span className="sr-only" aria-live="polite">{done ? `${label} copied` : ''}</span>
    </div>
  )
}

const emptyForm = (need) => ({ name: '', phone: '', email: '', need: D.NEEDS.includes(need) ? need : D.NEEDS[0], details: '', company: '' })

function checkForm(f) {
  const errors = {}
  if (f.name.trim().length < 2) errors.name = 'Please enter your name so we know who to reply to.'
  const digits = f.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = 'Please enter a valid email address, or leave it blank.'
  return errors
}

export function ContactForm({ source = 'section', idPrefix = 'c', compact = false, initialNeed, onSent }) {
  const [form, setForm] = useState(() => emptyForm(initialNeed))
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
  const fieldCls = (k) => cn('mt-2 w-full min-h-[48px] rounded-xl border bg-bg px-4 py-3 text-[16px] text-fg placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40', errors[k] ? 'border-danger' : 'border-line')
  const Err = ({ k }) => errors[k] ? <p id={id(`${k}-err`)} role="alert" className="mt-2 text-sm text-danger">{errors[k]}</p> : null
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? id(`${k}-err`) : undefined })

  if (status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start py-6" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"><Check className="h-7 w-7" strokeWidth={2.5} /></span>
        <h3 className="mt-5 text-xl font-semibold">Thank you, {form.name.trim().split(' ')[0]}!</h3>
        <p className="mt-2 max-w-md text-muted">We have received your enquiry and will call you on <b className="text-fg">{form.phone}</b> during business hours (Mon–Sat, 10 am – 7 pm).{form.email && emailed && <> A confirmation has been sent to <b className="text-fg">{form.email}</b>.</>}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={D.WA(waText)} target="_blank" rel="noopener" className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#1FAF5A] px-6 py-3 font-semibold text-white hover:brightness-110"><WhatsAppIcon className="h-5 w-5" />Also send on WhatsApp</a>
          {!compact && <button type="button" onClick={() => { setForm(emptyForm()); setStatus('idle') }} className="inline-flex min-h-[48px] items-center rounded-full border border-line px-6 py-3 font-semibold hover:bg-surface">Send another enquiry</button>}
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
        <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-[#0D1F4D] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100">
          {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Send enquiry <ArrowRight className="h-4 w-4" /></>}
        </button>
        <a href={D.WA(waText)} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#168A46] hover:underline dark:text-[#3DDC84]"><WhatsAppIcon className="h-5 w-5" />or WhatsApp us</a>
      </div>
      {status === 'failed' && <p role="alert" className="mt-4 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{message} <a href={D.TEL} className="font-semibold underline">Call {D.PHONE_DISPLAY}</a></p>}
    </form>
  )
}

export function Contact() {
  return (
    <Section id="contact" tone="surface">
      <SectionHead eyebrow="Contact us" title="Get in touch with Laxmi Power" intro="Looking for a battery, inverter or installation support? Contact us for product enquiries, wholesale requirements and service information." />
      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <BlurFade className="relative overflow-hidden rounded-3xl bg-ink p-7 text-on-ink sm:p-9 lg:col-span-5">
          <CopyRow icon={Phone} label="Phone" value={`+91${D.PHONE}`} display={D.PHONE_DISPLAY} href={D.TEL} />
          <CopyRow icon={WhatsAppIcon} label="WhatsApp" value={`+91${D.WHATSAPP}`} display={D.WHATSAPP_DISPLAY} href={D.WA('Hello Laxmi Power, I would like to enquire about a battery / inverter.')} external />
          <CopyRow icon={Mail} label="Email" value={D.EMAIL} href={D.MAILTO} />
          <CopyRow icon={MapPin} label="Location" value={D.ADDRESS} href={D.MAPS} external />
          <div className="flex items-center gap-4 py-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-gold"><Clock className="h-5 w-5" aria-hidden /></span>
            <div><p className="eyebrow text-[10px] text-on-ink-muted">Business hours</p><p className="text-lg font-semibold text-white">Monday to Saturday</p><p className="text-on-ink-muted tnum">10:00 am – 7:00 pm</p></div>
          </div>
          <a href={D.MAPS} target="_blank" rel="noopener" className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-semibold text-gold hover:underline">Open Barshi in Google Maps <ArrowUpRight className="h-4 w-4" /></a>
        </BlurFade>
        <BlurFade delay={0.08} className="relative rounded-3xl border border-line bg-bg p-7 sm:p-9 lg:col-span-7">
          <h3 className="text-xl font-semibold sm:text-2xl">Send us an enquiry</h3>
          <p className="mb-7 mt-2 text-muted">Share your details and our team will call you back. Add your email to get a confirmation.</p>
          <ContactForm source="section" idPrefix="c" />
        </BlurFade>
      </div>
    </Section>
  )
}

export function WhatsAppFloat() {
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

/** Pop-up enquiry form: opens once on a visitor's first visit, and whenever openEnquiry() is called. */
const POPUP_KEY = 'lp_welcome_popup_seen'
export function EnquiryModal() {
  const [state, setState] = useState(null) // null | { welcome: bool, need?: string, key: number }
  const panel = useRef(null)
  const lastFocus = useRef(null)
  const show = (s) => { lastFocus.current = document.activeElement; setState({ ...s, key: Date.now() }) }
  const close = () => setState(null)

  useEffect(() => {
    const onOpen = (e) => show({ welcome: false, need: e.detail?.need })
    window.addEventListener('lp:enquire', onOpen)
    let seen = false
    try { seen = localStorage.getItem(POPUP_KEY) === '1' } catch {}
    const t = !seen && setTimeout(() => {
      try { localStorage.setItem(POPUP_KEY, '1') } catch {}
      if (!panel.current) show({ welcome: true }) // skip if an enquiry pop-up is already open
    }, 4000)
    return () => { window.removeEventListener('lp:enquire', onOpen); clearTimeout(t) }
  }, [])

  const open = !!state
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') close()
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

  const welcome = state?.welcome
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#06102B]/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-labelledby="enquiry-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.4, ease }}
            className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-bg shadow-2xl sm:rounded-[28px] md:grid-cols-5"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <div className="relative hidden overflow-hidden bg-ink p-7 text-on-ink md:col-span-2 md:flex md:flex-col md:justify-between">
              <img src="img/store-shelves.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
              <Mark dark className="relative h-12 w-12" />
              <div className="relative">
                <p className="eyebrow text-gold">Since 2018 · Barshi</p>
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-white">Batteries, inverters, installation & service.</p>
                <a href={D.TEL} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold"><Phone className="h-4 w-4 text-gold" />{D.PHONE_DISPLAY}</a>
              </div>
            </div>
            <div className="p-6 sm:p-8 md:col-span-3">
              <button onClick={close} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
              <p className="eyebrow text-gold-text">{welcome ? 'Welcome to Laxmi Power' : 'Product enquiry'}</p>
              <h2 id="enquiry-title" className="mt-2 pr-10 text-2xl font-semibold">{welcome ? 'Need a battery or inverter?' : state.need ? `Enquire: ${state.need}` : 'Request a call back'}</h2>
              <p className="mb-6 mt-2 text-muted">Leave your number and our team will call you back with suitable options and prices.</p>
              <ContactForm key={state.key} source="popup" idPrefix="p" compact initialNeed={state.need} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
