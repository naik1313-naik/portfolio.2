import { useEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../../lib/utils'
import { projects, type Project } from '../../data/work'
import Button from '../ui/Button'
import Chip from '../ui/Chip'

interface ProjectStageProps {
  project: Project
  position: number
  total: number
  onOpen: (project: Project) => void
}

export default function ProjectStage({ project, position, total, onOpen }: ProjectStageProps) {
  const outer = useRef<HTMLDivElement>(null)
  const art = useRef<HTMLDivElement>(null)
  const ghost = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleWrap = useRef<HTMLDivElement>(null)
  const metaWrap = useRef<HTMLDivElement>(null)

  const num = String(position + 1).padStart(2, '0')
  const words = project.title.split(' ')
  const lastWord = words.pop()
  const nextTitle = position < total - 1 ? projects[position + 1].title : null

  useEffect(() => {
    const el = outer.current
    const titleEl = titleRef.current
    const metaEl = metaWrap.current
    if (!el) return

    const reduced = prefersReducedMotion()
    const split = titleEl && !reduced ? SplitText.create(titleEl, { type: 'chars' }) : null

    let entrance: gsap.core.Timeline | null = null
    let scrub: gsap.core.Timeline | null = null

    if (reduced) {
      gsap.set(titleEl, { autoAlpha: 1, clearProps: 'all' })
      gsap.set(metaEl, { autoAlpha: 1, y: 0 })
      gsap.set(art.current, { scale: 1, yPercent: 0 })
      gsap.set(ghost.current, { opacity: 0.14 })
    } else {
      entrance = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
      if (split) {
        entrance.fromTo(
          split.chars,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.02 },
        )
      }
      entrance.fromTo([metaEl], { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, '-=0.45')

      scrub = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            onEnter: () => entrance?.play(),
            onEnterBack: () => entrance?.play(),
          },
        })
        .fromTo(art.current, { yPercent: 14, scale: 1.12 }, { yPercent: -8, scale: 1, ease: 'none' }, 0)
        .fromTo(ghost.current, { yPercent: 30, opacity: 0.5 }, { yPercent: -30, opacity: 0.1, ease: 'none' }, 0)
        .fromTo(titleWrap.current, { yPercent: 20 }, { yPercent: -20, ease: 'none' }, 0)
    }

    return () => {
      entrance?.kill()
      scrub?.scrollTrigger?.kill()
      scrub?.kill()
      split?.revert()
    }
  }, [project.id])

  return (
    <div ref={outer} className="relative h-[132vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={art} className="absolute inset-0 will-change-transform" style={{ background: project.visual.background }} aria-hidden="true">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 120deg at 50% 50%, transparent 0deg, ${project.visual.accent}22 40deg, transparent 80deg, transparent 200deg, ${project.visual.accent}1f 260deg, transparent 320deg)`,
            }}
          />
          <div className="scanlines absolute inset-0 opacity-30" />
          <div
            className="absolute left-[-10%] top-[60%] aspect-square w-[60%] rounded-full"
            style={{ background: `radial-gradient(circle, ${project.visual.accent}33, transparent 65%)` }}
          />
        </div>

        <div ref={ghost} className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span
            className="select-none font-display text-[34vw] font-extrabold leading-none tracking-tighter"
            style={{ color: 'transparent', WebkitTextStroke: `1px ${project.visual.accent}55` }}
          >
            {num}
          </span>
        </div>

        <div className="relative z-[2] mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 md:px-10">
          <div ref={titleWrap} className="will-change-transform">
            <div className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:flex">
              <span className="text-accent">
                {num} / {total.toString().padStart(2, '0')}
              </span>
              <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
              <span>{project.category}</span>
            </div>

            <h3
              ref={titleRef}
              className="mt-4 font-display text-[clamp(3.2rem,11vw,8.5rem)] font-extrabold leading-[0.92] tracking-tighter"
            >
              {words.map((w) => (
                <span key={w} className="mr-[0.3em] inline-block text-ink">
                  {w}
                </span>
              ))}
              <span className="inline-block text-outline-accent">{lastWord}</span>
              <span className="text-accent">.</span>
            </h3>

            <div ref={metaWrap}>
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft md:hidden">
                <span className="text-accent">
                  {num} / {total.toString().padStart(2, '0')}
                </span>
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                <span>{project.category}</span>
              </div>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Chip>{project.mode}</Chip>
                {project.tags.slice(0, 3).map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button variant="primary" size="lg" dataCursor="hover" onClick={() => onOpen(project)}>
                  Open case study ↗
                </Button>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">{project.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-8 left-5 right-5 z-[2] flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-faint md:left-10 md:right-10"
          aria-hidden="true"
        >
          <span>Signal {num}</span>
          <span className="hidden md:inline">Scroll to move — drag or wheel</span>
          {nextTitle && <span>Next — {nextTitle}</span>}
        </div>
      </div>
    </div>
  )
}