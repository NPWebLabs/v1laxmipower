import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/utils'
export function NumberTicker({ value, startValue = 0, delay = 0, grouping = true, className }) {
  const ref = useRef(null)
  const mv = useMotionValue(startValue)
  const spring = useSpring(mv, { damping: 60, stiffness: 100 })
  const inView = useInView(ref, { once: true, margin: '0px' })
  const reduce = useReducedMotion()
  const fmt = (v) => Intl.NumberFormat('en-IN', { useGrouping: grouping, maximumFractionDigits: 0 }).format(Math.round(v))
  useEffect(() => {
    if (!inView || reduce) return
    if (ref.current) ref.current.textContent = fmt(startValue)
    const t = setTimeout(() => mv.set(value), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, reduce])
  useEffect(() => spring.on('change', (v) => { if (ref.current) ref.current.textContent = fmt(v) }), [spring])
  return <span ref={ref} className={cn('inline-block tnum', className)}>{fmt(value)}</span>
}
