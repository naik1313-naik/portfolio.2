import { Suspense, lazy, useEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../../lib/utils'
import { scrollToId } from '../../lib/scroll'
import { site } from '../../config/site'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'

const Orb = lazy(() => import('./Orb'))

interface HeroProps {
  loaded: boolean
}

const chips = [
  { text: 'lat 12.97° N', left: '62%', top: '24%' },
  { text: 'signal — ok', left: '78%', top: '68%' },
  { text: 'frame 60fps', left: '54%', top: '82%' },
]

export default function Hero({ loaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const orbWrap = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const subRefs = useRef<(HTMLDivElement | null)[]>([])
  const floatChips = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!loaded) return

    const reduced = prefersReducedMotion()
    const head = headRef.current
    const section = sectionRef.current

    const subs = subRefs.current.filter(Boolean) as HTMLDivElement[]
    const split = head && !reduced ? SplitText.create(head, { type: 'chars' }) : null

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    if (reduced) {
      gsap.set(head, { autoAlpha: 1, clearProps: 'all' })
      gsap.set(subs, { autoAlpha: 1, y: 0 })
      if (orbWrap.current) gsap.set(orbWrap.current, { autoAlpha: 1, scale: 1 })
    } else {
      if (split) {
        tl.fromTo(
          split.chars,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.018 },
          0.1,
        )
      }
      tl.fromTo(subs, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 }, 0.85)
      if (orbWrap.current) {
        tl.fromTo(
          orbWrap.current,
          { scale: 0.86, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.4, ease: 'power3.out' },
          0.4,
        )
      }
    }

    floatChips.current.forEach((chip, i) => {
      if (!chip || reduced) return
      gsap.to(chip, {
        y: '+=12',
        duration: 2.6 + i * 0.7,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1 + i * 0.4,
      })
    })

    if (section) {
      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
        .to(section.querySelector('[data-hero-fade]'), { yPercent: -14, autoAlpha: 0.15, ease: 'none' }, 0)
        .to(orbWrap.current, { yPercent: 10, scale: 1.06, ease: 'none' }, 0)
    }

    return () => {
      tl.kill()
      split?.revert()
    }
  }, [loaded])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 72% 40%, rgba(255,75,31,0.14), transparent 60%), radial-gradient(ellipse 45% 40% at 18% 80%, rgba(124,156,255,0.08), transparent 65%)',
        }}
      />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        ref={orbWrap}
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] h-[78svh] w-full opacity-0 md:opacity-100 lg:w-[46vw]"
        aria-hidden="true"
      >
        <div className="absolute right-[-6vw] top-1/2 aspect-square w-[80vh] max-w-[62vw] -translate-y-1/2 md:right-[-4vw] lg:right-0">
          <Suspense fallback={null}>
            <Orb />
          </Suspense>
        </div>
      </div>

      {chips.map((chip, i) => (
        <div
          key={chip.text}
          ref={(node) => {
            floatChips.current[i] = node
          }}
          className="pointer-events-none absolute z-[2] hidden rounded-full border border-line/80 bg-bg/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted backdrop-blur-sm md:block"
          style={{ left: chip.left, top: chip.top }}
          aria-hidden="true"
        >
          <span className="text-accent">› </span>
          {chip.text}
        </div>
      ))}

      <div className="relative z-[3] flex flex-1 flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pt-36 lg:pr-[46vw]" data-hero-fade>
        <div>
          <div className="opacity-0" ref={(node) => { subRefs.current[0] = node }}>
            <Eyebrow label={`${site.role} · Portfolio`} />
          </div>

          <h1
            ref={headRef}
            className="mt-6 whitespace-nowrap font-display text-[clamp(2.2rem,7.6vw,5.6rem)] font-extrabold leading-[0.9] tracking-tighter"
          >
            <span className="text-ink">SUMEET</span>
            <span className="text-outline-accent"> NAIK<span className="text-accent">*</span></span>
          </h1>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-md opacity-0" ref={(node) => { subRefs.current[1] = node }}>
            <p className="text-base leading-relaxed text-ink-soft md:text-lg">{site.statement}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.3}>
                <Button href="#work" onClick={() => scrollToId('#work')} variant="primary">
                  See the work ↑
                </Button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Button href="#contact" onClick={() => scrollToId('#contact')} variant="outline">
                  Get in touch
                </Button>
              </Magnetic>
            </div>
          </div>

          <div className="opacity-0 md:text-right" ref={(node) => { subRefs.current[2] = node }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {site.location}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {site.availability}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-[3] -translate-x-1/2" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">Scroll</span>
          <div className="h-12 w-px overflow-hidden bg-line-strong">
            <div className="h-1/2 w-px animate-scroll-cue bg-accent" />
          </div>
        </div>
      </div>

      <style>{`@keyframes scroll-cue { 0% { transform: translateY(-100%) } 100% { transform: translateY(200%) } } .animate-scroll-cue { animation: scroll-cue 1.8s cubic-bezier(0.65,0,0.35,1) infinite; }`}</style>
    </section>
  )
}