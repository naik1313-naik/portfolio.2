import { useEffect, useState } from 'react'

export type SectionId = 'hero' | 'about' | 'craft' | 'work' | 'path' | 'contact'

export function useSectionSpy(ids: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0] ?? 'hero')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId
          setActive(id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}