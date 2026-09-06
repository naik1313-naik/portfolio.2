export interface PathItem {
  date: string
  title: string
  org: string
  description: string
  tags: string[]
  kind: 'work' | 'education'
}

export const pathItems: PathItem[] = [
  {
    date: '2026',
    title: 'Artificial Intelligence Intern — completed',
    org: 'Pratinik Infotech · Bengaluru',
    description:
      'Completed the AI internship: built skills across machine learning and applied AI — datasets, models and products, shipped from a live bench.',
    tags: ['AI', 'Machine learning', 'Data'],
    kind: 'work',
  },
  {
    date: 'Ongoing',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'Presidency University · Bengaluru',
    description:
      'Engineering formalities aside, the degree is the hypothesis: software development, data analysis and artificial intelligence, tested build by build.',
    tags: ['Computer Science', 'Data', 'AI'],
    kind: 'education',
  },
  {
    date: 'Ongoing',
    title: 'Independent build practice',
    org: 'Self-directed — this site included',
    description:
      'Concept portfolios, WebGL instruments and interaction experiments — the discipline of taking an interface from idea to shipped, end to end.',
    tags: ['React', 'Three.js', 'GSAP'],
    kind: 'work',
  },
]