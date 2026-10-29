// Site translation via Google's website translator, limited to English, Marathi and Hindi.
// Google keeps the chosen language in the `googtrans` cookie and translates the page on load
// (and any content added later, e.g. when switching pages), so choosing a language sets that
// cookie and reloads — a clean start avoids Google and React editing the same text mid-session.
import { useEffect, useState } from 'react'
import { Languages } from 'lucide-react'
import { cn } from './lib/utils'

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'mr', label: 'मराठी', short: 'मराठी' },
  { code: 'hi', label: 'हिंदी', short: 'हिंदी' },
]

// Menu labels are short and need exact wording (Google turns "Laxmi Power" into "लक्ष्मी शक्ती"
// and reorders around protected words), so they carry their own Marathi and Hindi.
const LABELS = {
  'Home': { mr: 'मुख्यपृष्ठ', hi: 'होम' },
  'About Us': { mr: 'आमच्याबद्दल', hi: 'हमारे बारे में' },
  'Products': { mr: 'उत्पादने', hi: 'उत्पाद' },
  'Our Brands': { mr: 'आमचे ब्रँड्स', hi: 'हमारे ब्रांड' },
  'Services': { mr: 'सेवा', hi: 'सेवाएँ' },
  'Why Laxmi Power': { mr: 'लक्ष्मी पॉवर का?', hi: 'लक्ष्मी पॉवर क्यों?' },
  'Testimonials': { mr: 'अभिप्राय', hi: 'प्रशंसापत्र' },
  'Gallery': { mr: 'गॅलरी', hi: 'गैलरी' },
  'Contact Us': { mr: 'संपर्क', hi: 'संपर्क करें' },
  'Our story': { mr: 'आमची कहाणी', hi: 'हमारी कहानी' },
  'Vision & mission': { mr: 'दृष्टी आणि ध्येय', hi: 'दृष्टि और मिशन' },
  'Our team': { mr: 'आमची टीम', hi: 'हमारी टीम' },
  // Headings that contain the brand name
  'Get in touch with Laxmi Power': { mr: 'लक्ष्मी पॉवरशी संपर्क साधा', hi: 'लक्ष्मी पॉवर से संपर्क करें' },
  'About Laxmi Power': { mr: 'लक्ष्मी पॉवरबद्दल', hi: 'लक्ष्मी पॉवर के बारे में' },
}

/** Heading text: our own Marathi / Hindi when we have it, otherwise left to Google. */
export function localize(text) {
  const own = typeof text === 'string' && LABELS[text]?.[currentLanguage()]
  return own ? <span className="notranslate" translate="no">{own}</span> : text
}

/** True when a translation is active and we have our own wording for this text. */
export const hasOwnLabel = (text) => !!(typeof text === 'string' && LABELS[text]?.[currentLanguage()])

/** A menu label in the active language, marked so Google leaves it alone. */
export function MenuLabel({ children }) {
  const text = LABELS[children]?.[currentLanguage()] || children
  return <span className="notranslate" translate="no">{text}</span>
}

export function currentLanguage() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/)
  const code = m ? decodeURIComponent(m[1]) : 'en'
  return LANGUAGES.some((l) => l.code === code) ? code : 'en'
}

function setLanguageCookie(code) {
  const host = location.hostname
  // Google may have written the cookie on the bare host and on the parent domain; set/clear both.
  const domains = ['', host.includes('.') && !/^\d+(\.\d+){3}$/.test(host) ? `; domain=.${host}` : '']
  for (const d of domains) {
    if (code === 'en') document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`
    else document.cookie = `googtrans=/en/${code}; path=/; max-age=31536000${d}`
  }
}

let loaded = false
function loadGoogleTranslate() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  const host = document.createElement('div')
  host.id = 'google_translate_element'
  host.setAttribute('aria-hidden', 'true')
  host.style.display = 'none'
  document.body.appendChild(host)
  window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,mr,hi', autoDisplay: false }, 'google_translate_element')
  }
  const s = document.createElement('script')
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  s.async = true
  document.body.appendChild(s)
}

/** Compact EN / मराठी / हिंदी switcher. `tone="ink"` for the navy header. */
export function LanguageSwitcher({ className, tone = 'ink', id = 'lang-switch' }) {
  const [lang, setLang] = useState('en')
  useEffect(() => {
    setLang(currentLanguage())
    // Only load Google's script when a translation is active or about to be chosen.
    if (currentLanguage() !== 'en') loadGoogleTranslate()
  }, [])
  const change = (e) => {
    const code = e.target.value
    setLang(code)
    setLanguageCookie(code)
    location.reload()
  }
  return (
    <label htmlFor={id} className={cn('notranslate relative inline-flex items-center', className)} translate="no">
      <span className="sr-only">Language</span>
      <Languages className={cn('pointer-events-none absolute left-3 h-4 w-4', tone === 'ink' ? 'text-gold' : 'text-gold-text')} aria-hidden />
      <select id={id} value={lang} onChange={change} onFocus={loadGoogleTranslate}
        className={cn('min-h-[44px] cursor-pointer appearance-none rounded-full border py-2 pl-9 pr-4 text-[15px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          tone === 'ink' ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-line bg-bg text-fg hover:border-gold')}>
        {LANGUAGES.map((l) => <option key={l.code} value={l.code} className="text-[#0D1F4D]">{l.label}</option>)}
      </select>
    </label>
  )
}
