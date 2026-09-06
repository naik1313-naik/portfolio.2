import { useEffect, useRef } from 'react'
import { gsap, cx } from '../lib/utils'
import { pathItems } from '../data/path'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import Chip from './ui/Chip'

export default function Path() {
  const lineRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    const list = listRef.current
    if (!line || !list) return

    const tween = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: list,
          start: 'top 78%',
          end: 'bottom 40%',
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
    <section id="path" className="relative scroll-mt-20 border-t border-line py-24 md:py-36">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow index="04" label="Path / Where I've been" />
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                  The route so far
                  <span className="text-accent">.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
                  A short vector from formal training into a self-directed studio practice — built project by project, shipped line by line.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div ref={listRef} className="relative border-l border-line pl-8 md:pl-12">
              <div
                ref={lineRef}
                className="absolute -left-px top-0 h-full w-px origin-top bg-accent"
                aria-hidden="true"
              />
              <ol className="flex flex-col gap-14">
                {pathItems.map((item, i) => (
                  <Reveal key={item.title} y={24} delay={i * 0.03}>
                    <li className="relative">
                      <span
                        className={cx(
                          'absolute -left-8 top-1.5 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full md:-left-12',
                          i === 0 ? 'bg-accent' : 'bg-bg',
                        )}
                        aria-hidden="true"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs tracking-[0.2em] text-accent">{item.date}</span>
                        <span
                          className={cx(
                            'rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]',
                            item.kind === 'work'
                              ? 'border-accent/40 text-accent'
                              : 'border-line-strong text-muted',
                          )}
                        >
                          {item.kind}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{item.org}</p>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Chip key={tag}>{tag}</Chip>
                        ))}
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}