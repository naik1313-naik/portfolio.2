import { cx } from '../../lib/utils'

interface ChipProps {
  children: string
  className?: string
}

export default function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] tracking-wide text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent',
        className,
      )}
    >
      {children}
    </span>
  )
}