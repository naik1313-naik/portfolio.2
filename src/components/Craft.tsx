import { useState } from 'react'
import { capabilities } from '../data/craft'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import Chip from './ui/Chip'
import { cx } from '../lib/utils'

export default function Craft() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="craft" className="relative scroll-mt-20 border-t border-line py-24 md:py-36">
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow index="02" label="Craft / What I do" />
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                  Five lines,
                  <br />
                  one <span className="text-outline-accent">bench</span>.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
                  Each capability is a stack of technique and taste. Open a line to inspect what runs underneath.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line">
              {capabilities.map((cap, i) => {
                const isOpen = open === i
                return (
                  <Reveal key={cap.index} y={20} delay={i * 0.04}>
                    <div className={cx('border-b border-line transition-colors duration-500', isOpen ? 'bg-surface' : 'hover:bg-surface/40')}>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-7"
                        aria-expanded={isOpen}
                        data-cursor="hover"
                      >
                        <span className={cx('font-mono text-xs transition-colors duration-300', isOpen ? 'text-accent' : 'text-muted')}>
                          /{cap.index}
                        </span>
                        <span className="flex-1 font-display text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-4xl">
                          {cap.name}
                        </span>
                        <span
                          className={cx(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-lg transition-all duration-500',
                            isOpen ? 'rotate-45 border-accent text-accent' : 'border-line-strong text-muted group-hover:border-accent group-hover:text-accent',
                          )}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={cx(
                          'grid transition-[grid-template-rows] duration-500 ease-out',
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-7 pl-12 pr-0 md:pl-[3.6rem] md:pr-24">
                            <p className="text-sm leading-relaxed text-ink-soft md:text-base">{cap.description}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {cap.chips.map((chip) => (
                                <Chip key={chip}>{chip}</Chip>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              — the listenable stack, no filler
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}