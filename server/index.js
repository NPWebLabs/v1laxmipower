// Production server: contact-form API + static host for the built site.
// Run: npm run server   (reads settings from .env — see .env.example)
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createContactHandler } from './contact.js'

const env = process.env
const PORT = Number(env.PORT) || 3001
const handleContact = createContactHandler(env)

const app = express()
app.set('trust proxy', true)
app.use(express.json({ limit: '20kb' }))
app.use('/api', (req, res, next) => { // allow the site to be hosted on a different origin than the API
  res.set('Access-Control-Allow-Origin', env.CORS_ORIGIN || '*')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.post('/api/contact', async (req, res) => {
  const { status, json } = await handleContact(req.body, req.ip)
  res.status(status).json(json)
})

// Serve the production build (npm run build) from the same server.
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
app.use(express.static(dist))

app.listen(PORT, () => console.log(`Laxmi Power server on http://localhost:${PORT}`))
