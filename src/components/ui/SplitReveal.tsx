import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '../../lib/utils'
import { cx } from '../../lib/utils'

interface SplitRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  type?: 'chars' | 'words'
  stagger?: number
}

export default function SplitReveal({
  text,
  as: Tag = 'h2',
  className,
  type = 'chars',
  stagger = 0.015,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: 'all' })
      return
    }

    const split = SplitText.create(el, { type, mask: 'lines' })
    el.setAttribute('data-split', 'true')
    const target = split[type] as Element[]

    const tween = gsap.from(target, {
      yPercent: 120,
      autoAlpha: 0,
      duration: 1.1,
      stagger,
      ease: 'power4.out',
      paused: true,
      overwrite: true,
    })

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => tween.play(),
    })

    return () => {
      st.kill()
      tween.kill()
      el.removeAttribute('data-split')
      split.revert()
    }
  }, [text, type, stagger])

  return (
    <Tag
      ref={ref as any}
      className={cx('inline-block', className)}
      data-split-root
    >
      {text}
    </Tag>
  )
}