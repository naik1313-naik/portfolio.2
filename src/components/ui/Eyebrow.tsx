import { cx } from '../../lib/utils'

interface EyebrowProps {
  index?: string
  label: string
  className?: string
}

export default function Eyebrow({ index, label, className }: EyebrowProps) {
  return (
    <p className={cx('flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted', className)}>
      {index && (
        <>
          <span className="text-accent">/{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        </>
      )}
      <span>{label}</span>
    </p>
  )
}