import { motion } from 'motion/react'
import { cn } from '../../lib/utils'
export function BorderBeam({ className, size = 120, delay = 0, duration = 8, colorFrom = '#F2A23A', colorTo = '#FFE2B0', borderWidth = 2, reverse = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ borderWidth, borderStyle: 'solid' }}>
      <motion.div
        className={cn('absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent', className)}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)`, '--color-from': colorFrom, '--color-to': colorTo }}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration, delay: -delay }}
      />
    </div>
  )
}
