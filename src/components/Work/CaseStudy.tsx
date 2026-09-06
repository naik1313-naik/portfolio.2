import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../data/work'
import { getLenis } from '../../lib/scroll'
import Chip from '../ui/Chip'
import Button from '../ui/Button'
import { scrollToId } from '../../lib/scroll'

interface CaseStudyProps {
  project: Project
  onClose: () => void
}

export default function CaseStudy({ project, onClose }: CaseStudyProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { caseStudy } = project

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    const lenis = getLenis()
    lenis?.stop()
    return () => {
      cancelAnimationFrame(t)
      lenis?.start()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && scrollRef.current) {
        const focusables = scrollRef.current.querySelectorAll<HTMLElement>('a[href], button')
        const first = focusables[0]
        if (first) first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const panels = [
    { label: 'Problem', text: caseStudy.problem },
    { label: 'Concept', text: caseStudy.concept },
    { label: 'Solution', text: caseStudy.solution },
    { label: 'Outcome', text: caseStudy.outcome },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-bg/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={scrollRef}
        onClick={(e) => e.stopPropagation()}
        className={`my-6 w-[min(900px,calc(100vw-2rem))] rounded-3xl border border-line bg-elevated shadow-2xl transition-all duration-500 ${
          mounted ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.98] opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
            Case study — {project.index} / 04
          </span>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-accent"
            aria-label="Close case study"
            data-cursor="hover"
          >
            Close
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-accent group-hover:text-accent">
              ×
            </span>
          </button>
        </div>

        <div className="relative overflow-hidden" style={{ background: project.visual.background }}>
          <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="scanlines absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative flex items-center justify-center py-16 md:py-24">
            <span
              className="font-display text-[10rem] font-extrabold leading-none tracking-tighter text-transparent md:text-[14rem]"
              style={{ WebkitTextStroke: `1.5px ${project.visual.accent}` }}
              aria-hidden="true"
            >
              {project.visual.glyph}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <span className="text-accent">{project.mode}</span>
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                <span>{project.category}</span>
                <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                <span>{project.year}</span>
              </div>
              <h3 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">{project.title}</h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">{project.role}</p>
            </div>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-2">
            {panels.map((p) => (
              <div key={p.label} className={p.label === 'Concept' ? 'md:row-span-2' : undefined}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">— {p.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {caseStudy.features.map((f) => (
              <Chip key={f}>{f}</Chip>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-8">
            {project.link && <Button href={project.link} variant="primary">Visit project ↗</Button>}
            <Button href="#contact" variant="outline" onClick={() => { onClose(); scrollToId('#contact') }}>
              Start a project
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}