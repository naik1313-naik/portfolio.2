import { useEffect, useState } from 'react'
import { useSectionSpy, type SectionId } from '../hooks/useSectionSpy'
import { getLenis, scrollToId } from '../lib/scroll'
import { navLinks, site } from '../config/site'
import { cx } from '../lib/utils'
import Magnetic from './ui/Magnetic'

const ids = navLinks.map((l) => l.id as SectionId)

export default function Nav() {
  const active = useSectionSpy(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(`#${id}`))
  }

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-[80] transition-[background-color,backdrop-filter,border-color] duration-500',
          scrolled && !open
            ? 'border-b border-line/70 bg-bg/70 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="relative flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <Magnetic strength={0.25}>
            <button
              onClick={() => go('hero')}
              className="group flex items-baseline gap-2 font-mono text-[13px] uppercase tracking-[0.25em] text-ink"
              aria-label="Back to top"
              data-cursor="hover"
            >
              <span className="text-accent">{site.initials}</span>
              <span className="transition-colors group-hover:text-accent">©26</span>
            </button>
          </Magnetic>

          <nav className="hidden items-center gap-1 rounded-full border border-line/60 bg-bg/40 px-2 py-1 backdrop-blur-md md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  data-cursor="hover"
                  className={cx(
                    'group relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300',
                    isActive ? 'text-bg' : 'text-ink-soft hover:text-ink',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-accent" aria-hidden="true" />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              data-cursor="hover"
              className="hidden items-center gap-2 rounded-full border border-line/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent hover:text-accent lg:flex"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
              </span>
              {site.status === 'open' ? 'Open to work' : 'Booked'}
            </a>

            <button
              onClick={() => setOpen(true)}
              data-cursor="hover"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line/70 transition-colors hover:border-accent md:hidden"
              aria-label="Open menu"
            >
              <span className="h-px w-4 bg-ink" />
              <span className="h-px w-4 bg-ink" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-6 pb-8 pt-24 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="group flex items-baseline gap-4 border-b border-line py-4 text-left"
                style={{ animation: `menu-rise .6s ${i * 0.06}s cubic-bezier(0.16,1,0.3,1) both` }}
              >
                <span className="font-mono text-xs text-accent">{link.index}</span>
                <span className="font-display text-4xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>
          <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
            <button onClick={() => setOpen(false)} className="text-accent" aria-label="Close menu">
              Close
            </button>
          </div>
          <style>{`@keyframes menu-rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }`}</style>
        </div>
      )}
    </>
  )
}