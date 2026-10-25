// Gallery page: every photo, filterable by group, with a full-screen viewer.
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { BlurFade } from '../components/magicui/blur-fade'
import { ease, Section, PageHeader, chip } from '../ui'
import * as D from '../data'

function Lightbox({ photos, index, onClose, onMove }) {
  const p = photos[index]
  const touch = useRef(null)
  const closeBtn = useRef(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    document.addEventListener('keydown', onKey)
    closeBtn.current?.focus()
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [onClose, onMove])

  const navBtn = 'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-gold hover:text-[#0D1F4D]'
  return (
    <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[95] flex flex-col bg-[#06102B]/95"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1) }}>
      <div className="gutter flex h-16 shrink-0 items-center justify-between text-on-ink-muted" style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}>
        <p className="text-sm tnum" aria-live="polite">{index + 1} / {photos.length}</p>
        <button ref={closeBtn} onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10" aria-label="Close viewer"><X className="h-6 w-6" /></button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
        <button onClick={() => onMove(-1)} className={`${navBtn} left-3 sm:left-6`} aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={p.src} src={p.src} alt={p.alt} className="max-h-full max-w-full rounded-2xl object-contain"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease }} />
        </AnimatePresence>
        <button onClick={() => onMove(1)} className={`${navBtn} right-3 sm:right-6`} aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
      </div>
      <div className="gutter shrink-0 py-5 text-center" style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom, 0px))' }}>
        <p className="text-white">{p.alt}</p>
        <p className="mt-1 text-sm text-gold">{p.group}</p>
      </div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [group, setGroup] = useState('All')
  const [open, setOpen] = useState(-1)
  const photos = group === 'All' ? D.PHOTOS : D.PHOTOS.filter((p) => p.group === group)
  const lastFocus = useRef(null)

  const show = (i) => { lastFocus.current = document.activeElement; setOpen(i) }
  const close = useCallback(() => { setOpen(-1); lastFocus.current?.focus?.({ preventScroll: true }) }, [])
  const move = useCallback((d) => setOpen((i) => (i + d + photos.length) % photos.length), [photos.length])

  return (
    <>
      <PageHeader crumb="Gallery" title="Photo" accent="Gallery" intro="A look inside our Barshi store, our team, our installation and service work, and the customers we power.">
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter photos">
          {['All', ...D.PHOTO_GROUPS].map((g) => {
            const n = g === 'All' ? D.PHOTOS.length : D.PHOTOS.filter((p) => p.group === g).length
            return (
              <button key={g} onClick={() => setGroup(g)} aria-pressed={group === g} className={chip(group === g)}>
                {g}<span className="text-sm opacity-70 tnum">{n}</span>
              </button>
            )
          })}
        </div>
      </PageHeader>

      <Section tone="surface">
        <motion.ul layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          <AnimatePresence initial={false}>
            {photos.map((p, i) => (
              <motion.li layout key={p.src} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3, ease }}
                className="break-inside-avoid">
                <button onClick={() => show(i)} className="group relative block w-full overflow-hidden rounded-2xl bg-bg text-left" aria-label={`Open photo: ${p.alt}`}>
                  <img src={p.src} alt={p.alt} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#06102B]/85 to-transparent p-4 pt-12 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="text-[15px] text-white">{p.alt}</span>
                    <Expand className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <BlurFade className="mt-10 text-center text-muted">
          Visit us in Barshi, Mon–Sat, 10 am – 7 pm. <a href="#contact" className="font-semibold text-gold-text hover:underline">Get directions</a>
        </BlurFade>
      </Section>

      <AnimatePresence>
        {open >= 0 && photos[open] && <Lightbox photos={photos} index={open} onClose={close} onMove={move} />}
      </AnimatePresence>
    </>
  )
}
