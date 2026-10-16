import { cn } from '../../lib/utils'
export function Marquee({ className, reverse = false, pauseOnHover = false, children, repeat = 4, ...props }) {
  return (
    <div {...props} className={cn('group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] flex-row', className)}>
      {Array.from({ length: repeat }).map((_, i) => (
        <div key={i} aria-hidden={i > 0 ? 'true' : undefined}
          className={cn('flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row',
            pauseOnHover && 'group-hover:[animation-play-state:paused]', reverse && '[animation-direction:reverse]')}>
          {children}
        </div>
      ))}
    </div>
  )
}
