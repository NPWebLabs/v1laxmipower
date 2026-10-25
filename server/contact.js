// Contact-form handler, shared by the production server (server/index.js) and the Vite dev server (vite.config.js).
import nodemailer from 'nodemailer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { adminEmail, userEmail } from './templates.js'
import { NEEDS } from '../src/needs.js'

const LOG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'enquiries.jsonl')

// Basic per-IP limit: 5 submissions / 10 minutes.
const hits = new Map()
function rateLimited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000
  const list = (hits.get(ip) || []).filter((t) => now - t < win)
  list.push(now); hits.set(ip, list)
  return list.length > 5
}

function validate(b) {
  const clean = (v, max) => String(v ?? '').trim().slice(0, max)
  const e = {
    name: clean(b.name, 80),
    phone: clean(b.phone, 20).replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, ''),
    email: clean(b.email, 120).toLowerCase(),
    need: NEEDS.includes(b.need) ? b.need : 'Other',
    details: clean(b.details, 1500),
    source: b.source === 'popup' ? 'welcome pop-up' : 'contact section',
  }
  const errors = {}
  if (e.name.length < 2) errors.name = 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(e.phone)) errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.email)) errors.email = 'Please enter a valid email address.'
  return { e, errors }
}

export function createContactHandler(env = process.env) {
  const BIZ = { phone: '8208580903', phoneDisplay: '+91 82085 80903', email: env.ADMIN_EMAIL || 'laxmipower607@gmail.com' }
  const smtpReady = !!(env.SMTP_USER && env.SMTP_PASS)
  const transporter = smtpReady && nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(env.SMTP_PORT) || 465,
    secure: (env.SMTP_SECURE || 'true') === 'true',
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS.replace(/\s/g, '') }, // Gmail shows app passwords with spaces
  })
  const FROM = `"Laxmi Power" <${env.MAIL_FROM || env.SMTP_USER}>`

  if (!smtpReady) console.warn('⚠ [contact] SMTP_USER / SMTP_PASS not set in .env — enquiries are saved to server/enquiries.jsonl but NOT emailed.')
  else transporter.verify().then(() => console.log('✓ [contact] SMTP ready, emails will be sent to', BIZ.email)).catch((err) => console.warn('⚠ [contact] SMTP login failed:', err.message))

  // (body, ip) -> { status, json }
  return async function handleContact(body = {}, ip = '') {
    if (body.company) return { status: 200, json: { ok: true } } // honeypot: bots fill hidden fields
    if (rateLimited(ip)) return { status: 429, json: { ok: false, message: 'Too many requests. Please try again in a few minutes or call us.' } }

    const { e, errors } = validate(body)
    if (Object.keys(errors).length) return { status: 400, json: { ok: false, errors, message: 'Please check the highlighted fields.' } }
    e.receivedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })

    // Always keep a copy, so no enquiry is lost even if email is down.
    let saved = false
    try { fs.appendFileSync(LOG, JSON.stringify(e) + '\n'); saved = true } catch (err) { console.error('[contact] could not save enquiry:', err.message) }

    if (!smtpReady) {
      console.log(`[contact] new enquiry (not emailed): ${e.name}, +91 ${e.phone}, ${e.need}`)
      return saved ? { status: 200, json: { ok: true, emailed: false } } : { status: 500, json: { ok: false, message: 'We could not send your message right now.' } }
    }

    try {
      await transporter.sendMail({ from: FROM, to: BIZ.email, replyTo: e.email || undefined, ...adminEmail(e, BIZ) })
      if (e.email) {
        // A failed confirmation should not fail the enquiry — the team already has it.
        await transporter.sendMail({ from: FROM, to: e.email, replyTo: BIZ.email, ...userEmail(e, BIZ) }).catch((err) => console.error('[contact] user mail failed:', err.message))
      }
      console.log(`[contact] enquiry emailed: ${e.name}, +91 ${e.phone}`)
      return { status: 200, json: { ok: true, emailed: true } }
    } catch (err) {
      console.error('[contact] admin mail failed:', err.message)
      // The enquiry is saved on disk, so tell the customer it went through.
      return saved ? { status: 200, json: { ok: true, emailed: false } } : { status: 500, json: { ok: false, message: 'We could not send your message right now.' } }
    }
  }
}
