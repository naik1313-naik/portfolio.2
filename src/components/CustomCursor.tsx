import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, prefersFinePointer } from '../lib/utils'

type CursorVariant = 'default' | 'hover' | 'label' | 'hidden'

interface LabelRef {
  text: string
  variant: CursorVariant
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<LabelRef>({ text: '', variant: 'default' })

  useEffect(() => {
    if (!prefersFinePointer() || prefersReducedMotion()) return

    document.documentElement.classList.add('custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, scale: 1 })
    gsap.set(ring, { autoAlpha: 0 })
    gsap.set(dot, { autoAlpha: 0 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    let visible = false
    const show = () => {
      if (visible) return
      visible = true
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
    }

    const onMove = (e: PointerEvent) => {
      show()
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const labeled = el?.closest<HTMLElement>('[data-cursor]')
      const interactive = el?.closest<HTMLElement>('a, button, input, textarea, select, [role="button"]')
      const newVariant: CursorVariant = labeled?.dataset.cursor === 'hidden' ? 'hidden' : 'default'

      if (newVariant === 'hidden') {
        setLabel({ text: '', variant: 'hidden' })
        gsap.to(ring, { scale: 0, duration: 0.3 })
        gsap.to(dot, { scale: 0, duration: 0.3 })
        return
      }

      const labelText = labeled?.dataset.cursorLabel
      if (labelText && labeled?.dataset.cursor) {
        setLabel({ text: labelText, variant: 'label' })
        gsap.to(ring, { scale: 2.6, backgroundColor: 'rgba(255,75,31,0.92)', borderColor: 'rgba(255,75,31,0)', duration: 0.35 })
        gsap.to(dot, { scale: 0, duration: 0.35 })
      } else if (interactive) {
        setLabel({ text: '', variant: 'hover' })
        gsap.to(ring, { scale: 1.7, borderColor: 'rgba(255,75,31,0.9)', duration: 0.35 })
        gsap.to(dot, { scale: 0.4, duration: 0.35 })
      } else {
        setLabel({ text: '', variant: 'default' })
        gsap.to(ring, { scale: 1, borderColor: 'rgba(244,240,232,0.5)', backgroundColor: 'rgba(255,75,31,0)', duration: 0.35 })
        gsap.to(dot, { scale: 1, duration: 0.35 })
      }
    }

    const onLeave = () => {
      if (document.documentElement.matches(':hover')) return
      visible = false
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  const hidden = label.variant === 'hidden'

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[500] flex h-10 w-10 items-center justify-center rounded-full border border-ink/50"
        aria-hidden="true"
      >
        {label.variant === 'label' && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg">{label.text}</span>
        )}
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[500] h-1.5 w-1.5 rounded-full bg-accent"
        aria-hidden="true"
        style={{ visibility: hidden ? 'hidden' : undefined }}
      />
    </>
  )
}