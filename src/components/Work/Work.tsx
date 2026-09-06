import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/utils'
import { projects, type Project } from '../../data/work'
import ProjectStage from './ProjectStage'
import CaseStudy from './CaseStudy'
import Eyebrow from '../ui/Eyebrow'
import GitHubArchive from './GitHubArchive'

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const rail = railRef.current
    if (!section || !rail) return

    const tween = gsap.fromTo(
      rail,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: 0.8,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative scroll-mt-20 overflow-x-clip">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-[2] mx-auto max-w-[1440px] px-5 pb-6 pt-24 md:px-10 md:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="03" label="Work / Selected projects" />
            <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
              The stage
              <span className="text-accent">.</span>
              <span className="text-outline-accent"> Turn it.</span>
            </h2>
          </div>
          <p className="max-w-[220px] font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Scroll to move between scenes. Each piece opens.
          </p>
        </div>
      </div>

      <div className="relative z-[2]">
        {projects.map((project, i) => (
          <ProjectStage key={project.id} project={project} position={i} total={projects.length} onOpen={setActive} />
        ))}
      </div>

      <GitHubArchive />

      <div ref={railRef} className="absolute bottom-10 right-6 top-24 z-[3] w-px origin-top bg-accent/80 md:right-10" aria-hidden="true" />

      {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
    </section>
  )
}