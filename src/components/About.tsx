import { site } from '../config/site'
import Eyebrow from './ui/Eyebrow'
import SplitReveal from './ui/SplitReveal'
import Reveal from './ui/Reveal'
import portrait from '../assets/portrait.jpg'

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Eyebrow index="01" label="About / Who I am" />
        </Reveal>

        <div className="mt-10 max-w-5xl">
          <SplitReveal
            as="h2"
            text="A creative developer building digital instruments — interfaces where motion, type and three-dimensional space tune into one tactile experience."
            className="text-[clamp(1.8rem,4.6vw,3.4rem)] leading-[1.04] font-bold tracking-tight text-ink"
          />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="space-y-6 text-base leading-relaxed text-ink-soft md:text-lg max-w-2xl">
              <Reveal delay={0.05}>
                <p>{site.bioOne}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>{site.bioTwo}</p>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {(
                [
                  ['AI & Software', 'Role'],
                  [site.status === 'open' ? 'Open' : 'Booked', 'Availability'],
                  ['Bengaluru', 'Based in'],
                ] as const
              ).map(([value, label]) => (
                <Reveal key={label} className="bg-surface p-5">
                  <p className="font-display text-2xl font-bold tracking-tight text-ink">{value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="lg:sticky lg:top-28">
                <figure className="overflow-hidden rounded-2xl border border-line">
                  <div className="relative aspect-square">
                    <img
                      src={portrait}
                      alt="Portrait of Sumeet Naik"
                      loading="lazy"
                      className="h-full w-full object-cover saturate-[0.9] transition duration-700 group-hover:saturate-100"
                    />
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background:
                          'radial-gradient(circle at 80% 10%, rgba(255,75,31,0.35), transparent 50%), linear-gradient(to top, rgba(9,9,11,0.7), transparent 40%)',
                      }}
                      aria-hidden="true"
                    />
                    <div className="scanlines absolute inset-0 opacity-30" aria-hidden="true" />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    <span>Fig. 01 — the instrument</span>
                    <span className="text-accent">© 2026</span>
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}