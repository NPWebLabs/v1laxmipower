import { useId } from 'react'
import { cn } from '../../lib/utils'
export function DotPattern({ width = 18, height = 18, cr = 1, className }) {
  const id = useId()
  return (
    <svg aria-hidden="true" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}>
      <defs><pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse"><circle cx={width / 2} cy={height / 2} r={cr} fill="currentColor" /></pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
