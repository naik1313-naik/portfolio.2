import { credentials } from '../data/credentials'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'

const Shield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2.5 14.6 9l6.9.5-5.2 4.5 1.6 6.7-5.9-3.6-5.9 3.6 1.6-6.7L2.5 9.5 9.4 9 12 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const Globe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3 12h18M12 3c2.4 2.4 3.6 5.2 3.6 9S14.4 18.6 12 21M12 3C9.6 5.4 8.4 8.2 8.4 12s1.2 6.6 3.6 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const Icon = ({ tag }: { tag: string }) => {
  if (/cyber|secur/i.test(tag)) return <Shield />
  if (/data/.test(tag)) return <Star />
  return <Globe />
}

const platformColor: Record<string, string> = {
  Forage: '#6fcf97',
  Tata: '#9aa0ad',
  Udemy: '#a435f0',
}

export default function Credentials() {
  return (
    <section id="credentials" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="03.5" label="Credentials / Verified skills" />
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Called up for the bench
              <span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-[240px] font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Verified certificates from real programmes — skills earned, not claimed.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((cred, i) => (
            <Reveal key={`${cred.platform}-${i}`} className="bg-surface p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-accent">
                  <Icon tag={cred.tag} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {cred.platform}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight text-ink">
                {cred.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{cred.issuer}</p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
                  style={{ color: platformColor[cred.platform] ?? undefined }}
                >
                  {cred.tag}
                </span>
                {cred.year && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{cred.year}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
