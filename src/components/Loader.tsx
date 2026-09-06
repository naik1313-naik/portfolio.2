import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/utils'

interface LoaderProps {
  onComplete: () => void
}

const name = 'Sumeet Naik'
const wordGaps = name.split(' ').map((w, i, a) => (i === 0 ? w.split('') : a[i - 1].length === 0 ? w.split('') : w.split('')))

export default function Loader({ onComplete }: LoaderProps) {
  const root = useRef<HTMLDivElement>(null)
  const chars = useRef<(HTMLSpanElement | null)[]>([])
  const counter = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const reduced = prefersReducedMotion()
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => {
        if (done.current) return
        done.current = true
        onComplete()
      },
    })

    if (reduced) {
      tl.to(el, { autoAlpha: 0, duration: 0.2 })
      return
    }

    const spanChars = chars.current.filter(Boolean) as HTMLSpanElement[]

    const counterObj = { v: 0 }
    const counterTween = gsap.to(counterObj, {
      v: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counter.current) counter.current.textContent = String(Math.round(counterObj.v)).padStart(3, '0')
      },
    })

    const curtain = el.querySelector<HTMLDivElement>('[data-loader-curtain]')
    const nameWrap = el.querySelector<HTMLDivElement>('[data-loader-name]')

    tl.add(counterTween, 0)
      .fromTo(nameWrap, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out' }, 0.15)
      .fromTo(spanChars, { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.02 }, 0.15)
      .to(el.querySelector('[data-loader-meta]'), { autoAlpha: 1, y: 0, duration: 0.5 }, 0.3)
      .to(el.querySelector('[data-loader-clock]'), { autoAlpha: 1, duration: 0.5 }, 0.3)
      .to(curtain, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '+=0.15')
      .to(el, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '<')
      .set(el, { pointerEvents: 'none' })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[400] overflow-hidden bg-bg"
      aria-hidden="true"
      data-cursor="hidden"
    >
      <div data-loader-curtain className="absolute inset-x-0 bottom-0 top-0 bg-accent" />
      <div className="absolute inset-x-0 bottom-0 left-0 flex h-2/5 items-end justify-between p-6 md:p-10">
        <div data-loader-meta className="translate-y-2 font-mono text-[11px] uppercase tracking-[0.3em] text-bg opacity-0">
          Portfolio / 2026
        </div>
        <div data-loader-clock className="translate-y-2 text-right font-mono text-[11px] tracking-[0.2em] text-bg opacity-0">
          Transmission
          <br />
          <span ref={counter} className="mt-1 block font-display text-4xl font-bold md:text-6xl">
            000
          </span>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div data-loader-name className="overflow-hidden">
          <div className="flex flex-wrap justify-center gap-x-[0.5em]">
            {wordGaps.map((charsArr, w) => (
              <span key={w} className="inline-flex whitespace-nowrap">
                {charsArr.map((c, i) => (
                  <span
                    key={i}
                    ref={(node) => {
                      chars.current[w * 20 + i] = node
                    }}
                    className="font-display text-[13vw] font-extrabold leading-none tracking-tighter text-ink md:text-[7.5rem]"
                  >
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}