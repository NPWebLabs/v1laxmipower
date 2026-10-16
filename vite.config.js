import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { createContactHandler } from './server/contact.js'

// Runs the contact-form API inside `npm run dev` / `vite preview`, so no separate server is needed locally.
function contactApi(env) {
  let handle
  const mount = (server) => {
    server.middlewares.use('/api/contact', (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; return res.end() }
      handle ||= createContactHandler(env)
      let raw = ''
      req.on('data', (c) => { raw += c; if (raw.length > 20000) req.destroy() })
      req.on('end', async () => {
        let body = {}
        try { body = JSON.parse(raw || '{}') } catch {}
        const { status, json } = await handle(body, req.socket.remoteAddress)
        res.statusCode = status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(json))
      })
    })
  }
  return { name: 'contact-api', configureServer: mount, configurePreviewServer: mount }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // reads .env (all keys, not only VITE_*)
  return {
    base: './',
    plugins: [react(), viteSingleFile(), contactApi(env)],
  }
})
