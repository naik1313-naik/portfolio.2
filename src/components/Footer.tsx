import { navLinks } from '../config/site'
import { scrollToId } from '../lib/scroll'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Sumeet Naik — {new Date().getFullYear()}</p>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('#hero')
              }}
              className="group relative block overflow-hidden"
              aria-label="Back to top"
              data-cursor="hover"
            >
              <span className="block font-display text-[clamp(3.4rem,11vw,9rem)] font-extrabold leading-[0.9] tracking-tighter text-outline-ink transition-all duration-500 group-hover:text-ink">
                SUMEET NAIK
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-faint">↑ Scroll to top</span>
            </a>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToId(`#${link.id}`)}
                data-cursor="hover"
                className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
              >
                <span className="text-faint group-hover:text-accent">/{link.index}</span>
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          <span>React · Three.js · WebGL · GSAP</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            Built & shipped by hand
          </span>
        </div>
      </div>
    </footer>
  )
}