import { motion } from 'motion/react'
// Magic UI BlurFade, adapted: content rests fully visible and only settles into place on view.
export function BlurFade({ children, className, delay = 0, y = 22, as = 'div', ...props }) {
  const M = motion[as]
  return (
    <M className={className}
      initial={{ y, scale: 0.985 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.04 + delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      {...props}>
      {children}
    </M>
  )
}
