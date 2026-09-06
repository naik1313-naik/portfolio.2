import type { ReactNode } from 'react'
import { cx } from '../../lib/utils'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  dataCursor?: string
}

const base =
  'group inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] transition-colors duration-300'

const variants: Record<string, string> = {
  primary:
    'bg-accent text-bg hover:bg-accent-soft py-4 px-7 rounded-full',
  outline:
    'border border-line-strong text-ink hover:border-accent hover:text-accent py-4 px-7 rounded-full',
  ghost: 'text-muted hover:text-accent py-2 px-1 rounded-none',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  dataCursor,
}: ButtonProps) {
  const cls = cx(base, variants[variant], size === 'lg' ? 'text-[13px] py-5 px-9' : '', className)

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} data-cursor={dataCursor}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick} data-cursor={dataCursor}>
      {children}
    </button>
  )
}