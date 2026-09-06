import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/utils'
import { useSectionSpy, type SectionId } from '../hooks/useSectionSpy'
import { scrollToId } from '../lib/scroll'
import { navLinks } from '../config/site'

const ids = navLinks.map((l) => l.id as SectionId)

export default function SectionRail() {
  const active = useSectionSpy(ids)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = railRef.current
    if (!el) return
    gsap.fromTo(el, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 1, delay: 2.2, ease: 'power3.out' })
  }, [])

  return (
    <div
      ref={railRef}
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex"
      aria-label="Section index"
    >
      <span className="mb-2 h-12 w-px bg-line-strong" aria-hidden="true" />
      {navLinks.map((link) => {
        const isActive = active === link.id
        return (
          <button
            key={link.id}
            onClick={() => scrollToId(`#${link.id}`)}
            className="group relative flex h-6 w-8 items-center justify-center"
            aria-label={`Go to ${link.label}`}
            aria-current={isActive ? 'true' : undefined}
            data-cursor-label={link.label}
            data-cursor="hover"
          >
            <span
              className={`font-mono text-[10px] tracking-widest transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-faint group-hover:text-ink'
              }`}
            >
              {link.index}
            </span>
            <span
              aria-hidden="true"
              className={`absolute -left-3 h-px rounded-full bg-accent transition-all duration-500 ${
                isActive ? 'w-3 opacity-100' : 'w-0 opacity-0'
              }`}
            />
          </button>
        )
      })}
      <span className="mt-2 h-12 w-px bg-line-strong" aria-hidden="true" />
    </div>
  )
}