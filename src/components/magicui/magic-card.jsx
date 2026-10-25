import { useCallback } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { cn } from '../../lib/utils'
export function MagicCard({ children, className, gradientSize = 260, gradientColor = 'rgba(245,130,32,0.18)' }) {
  const x = useMotionValue(-gradientSize), y = useMotionValue(-gradientSize)
  const onMove = useCallback((e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top) }, [x, y])
  const onLeave = useCallback(() => { x.set(-gradientSize); y.set(-gradientSize) }, [x, y, gradientSize])
  const bg = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientColor}, transparent 100%)`
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={cn('group relative overflow-hidden', className)}>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: bg }} />
      {children}
    </div>
  )
}
