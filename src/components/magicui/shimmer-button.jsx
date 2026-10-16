import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
export const ShimmerButton = forwardRef(function ShimmerButton(
  { shimmerColor = '#FFE2B0', shimmerSize = '0.06em', shimmerDuration = '3s', borderRadius = '999px', background = 'rgb(var(--gold))', className, children, as: Tag = 'a', ...props }, ref) {
  return (
    <Tag ref={ref}
      style={{ '--spread': '90deg', '--shimmer-color': shimmerColor, '--radius': borderRadius, '--speed': shimmerDuration, '--cut': shimmerSize, '--bg': background }}
      className={cn('group relative z-0 inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-white/20 px-6 py-3 font-semibold text-[#141A33] [background:var(--bg)] [border-radius:var(--radius)]',
        'transform-gpu transition-transform duration-200 ease-out active:translate-y-px hover:scale-[1.02]', className)}
      {...props}>
      <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 rounded-[var(--radius)] px-4 py-1.5 shadow-[inset_0_-8px_10px_#ffffff3f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff5f]" />
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
    </Tag>
  )
})
