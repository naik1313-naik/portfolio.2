import { repos } from '../../data/repos'
import { site } from '../../config/site'

const langColor: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  CSS: '#563d7c',
  HTML: '#e34c26',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function GitHubArchive() {
  return (
    <div className="relative z-[2] border-t border-line bg-bg">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              03.5 — GitHub · the bench
            </span>
            <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Sharpened in the open
              <span className="text-accent">.</span>
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {repos.length} repos · synced from GitHub
            </span>
            <a
              href={site.socials.github.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              Profile
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <Arrow />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <div key={repo.name} className="group relative flex flex-col justify-between gap-10 bg-bg p-7 transition-colors duration-300 hover:bg-surface md:p-8">
              <div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="flex items-start justify-between gap-4"
                >
                  <h4 className="font-display text-xl font-bold tracking-tight text-ink underline-offset-4 group-hover:text-accent-hover">
                    {repo.title}
                    {repo.archived && <span className="ml-2 align-middle text-[10px] font-mono uppercase tracking-widest text-faint">archived</span>}
                  </h4>
                  <span className="mt-0.5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    <Arrow />
                  </span>
                </a>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{repo.summary}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: langColor[repo.lang] ?? '#888' }}
                      aria-hidden="true"
                    />
                    {repo.lang}
                  </span>
                  <span className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    · {repo.updated}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {repo.topics.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-sm border border-line-strong px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                {repo.demo && (
                  <a
                    href={repo.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline"
                  >
                    <Arrow />
                    Demo
                    <span className="ml-1 max-w-[220px] truncate text-faint normal-case tracking-normal">{repo.demo.replace('https://', '')}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          Pulled from GitHub — every link opens the live repo or build.
        </p>
      </div>
    </div>
  )
}