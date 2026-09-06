import { useState, type FormEvent } from 'react'
import { site } from '../config/site'
import Eyebrow from './ui/Eyebrow'
import SplitReveal from './ui/SplitReveal'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import { cx } from '../lib/utils'

type FormState = 'idle' | 'sending' | 'sent'

const inputCls =
  'w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-faint transition-colors duration-300 focus:border-accent focus:outline-none'

export default function Contact() {
  const [state, setState] = useState<FormState>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state !== 'idle') return
    setState('sending')
    window.setTimeout(() => setState('sent'), 900)
  }

  const socials = Object.entries(site.socials)

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 md:py-40">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,75,31,0.12), transparent 62%), radial-gradient(ellipse 40% 40% at 10% 90%, rgba(124,156,255,0.07), transparent 60%)',
        }}
      />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Eyebrow index="05" label="Contact / Transmission" />
        </Reveal>

        <div className="mt-10">
          <SplitReveal
            as="h2"
            text="Have a brief? Let's tune a signal."
            className="text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[0.95] tracking-tighter text-ink"
          />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {state === 'sent' ? (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center rounded-2xl border border-accent/30 bg-surface/60 p-8 md:p-12">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-xl font-bold text-bg">
                  ✓
                </span>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink">
                  Transmission received.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                  Thanks for writing — I'll get back within 48 hours. If it's urgent, mail me directly at{' '}
                  <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
                    {site.email}
                  </a>
                  .
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
                  data-cursor="hover"
                >
                  ← Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2" aria-label="Contact form">
                <Reveal>
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">/ Name</span>
                    <input required name="name" placeholder="Jane Studios" className={inputCls} autoComplete="name" />
                  </label>
                </Reveal>
                <Reveal delay={0.04}>
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">/ Email</span>
                    <input required name="email" type="email" placeholder="you@studio.com" className={inputCls} autoComplete="email" />
                  </label>
                </Reveal>
                <Reveal delay={0.08}>
                  <label className="block sm:col-span-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">/ Kind of signal</span>
                    <select name="type" className={cx(inputCls, 'appearance-none', state === 'sending' ? 'pointer-events-none opacity-50' : '')}>
                      <option>Creative website / portfolio</option>
                      <option>3D & WebGL experience</option>
                      <option>Product interface / system</option>
                      <option>Direction & motion</option>
                      <option>Something else</option>
                    </select>
                  </label>
                </Reveal>
                <Reveal delay={0.12}>
                  <label className="block sm:col-span-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">/ Message</span>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      placeholder="What are we building?"
                      className={cx(inputCls, 'resize-none')}
                    />
                  </label>
                </Reveal>
                <Reveal delay={0.16} className="sm:col-span-2">
                  <div className="flex flex-wrap items-center gap-6">
                    <Button type="submit" size="lg" variant="primary" dataCursor="hover">
                      {state === 'sending' ? 'Transmitting…' : 'Send transmission ↑'}
                    </Button>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                      Usually replies within 48h
                    </p>
                  </div>
                </Reveal>
              </form>
            )}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/60 p-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold tracking-tight text-ink">{site.availability}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{site.location}</p>
                  </div>
                </div>

                <a
                  href={`mailto:${site.email}`}
                  data-cursor="hover"
                  className="mt-8 block font-display text-2xl font-bold tracking-tight text-ink underline-offset-8 transition-colors hover:text-accent hover:underline md:text-3xl"
                >
                  {site.email}
                </a>

                <ul className="mt-10 space-y-1 border-t border-line pt-8">
                  {socials.map(([key, s]) => (
                    <li key={key}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="group flex items-center justify-between py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
                      >
                        <span>{s.label}</span>
                        <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-10 font-mono text-[10px] uppercase leading-loose tracking-[0.2em] text-faint">
                  Based anywhere.
                  <br />
                  Beats beyond borders.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}