import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  y?: number
  delay?: number
}

export default function Reveal({ children, className, y = 28, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduces = prefersReducedMotion()
    if (reduces) {
      gsap.set(el, { clearProps: 'all' })
      return
    }

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      { autoAlpha: 1, y: 0, duration: 1, delay, ease: 'power3.out', overwrite: true },
    )

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => tween.play(),
    })

    return () => {
      st.kill()
      tween.kill()
    }
  }, [y, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}