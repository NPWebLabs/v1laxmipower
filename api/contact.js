// Vercel serverless function for the contact form (POST /api/contact).
// Uses the same handler as the Express server and the Vite dev server.
// Set SMTP_USER, SMTP_PASS and ADMIN_EMAIL in Vercel → Project → Settings → Environment Variables.
import { createContactHandler } from '../server/contact.js'

let handle

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method not allowed' })
  }
  handle ||= createContactHandler(process.env)
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || ''
  let body = req.body
  if (typeof body === 'string') { try { body = JSON.parse(body) } catch { body = {} } }
  const { status, json } = await handle(body || {}, ip)
  res.status(status).json(json)
}
