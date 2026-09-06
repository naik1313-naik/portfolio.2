import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './utils'

let lenis: Lenis | null = null
let destroyed = false

export interface LenisHandle {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; duration?: number }) => void
  destroy: () => void
}

export function initLenis(): LenisHandle {
  if (destroyed && typeof window !== 'undefined') {
    destroyed = false
  }

  if (lenis) {
    return { lenis, scrollTo: scrollToId, destroy: destroyLenis }
  }

  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return { lenis: null, scrollTo: scrollToId, destroy: destroyLenis }
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return { lenis, scrollTo: scrollToId, destroy: destroyLenis }
}

function tick(time: number) {
  lenis?.raf(time * 1000)
}

export function destroyLenis() {
  if (lenis) {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
    destroyed = true
    ScrollTrigger.clearScrollMemory()
  }
}

export function scrollToId(target: string | number | HTMLElement, opts?: { offset?: number; duration?: number }) {
  const reduced = prefersReducedMotion()
  if (lenis) {
    lenis.scrollTo(target, {
      offset: opts?.offset ?? 0,
      duration: reduced ? 0 : (opts?.duration ?? 1.4),
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' })
  } else {
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }
}

export function getLenis(): Lenis | null {
  return lenis
}