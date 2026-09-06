export interface Capability {
  index: string
  name: string
  description: string
  chips: string[]
}

export const capabilities: Capability[] = [
  {
    index: '01',
    name: 'Interaction & Motion',
    description:
      'Choreography that earns its frame-rate. Scroll systems, gesture design and micro-interactions where every millisecond of easing is decided on purpose.',
    chips: ['GSAP', 'ScrollTrigger', 'SplitType', 'Lenis', 'Framer Motion'],
  },
  {
    index: '02',
    name: '3D & WebGL',
    description:
      'Real-time scenes, shaders and point-clouds as a design material — not a tech demo. GPU work with DPR budgets and reduced-motion fallbacks baked in.',
    chips: ['React Three Fiber', 'Three.js', 'GLSL', 'Instancing', 'Post-processing'],
  },
  {
    index: '03',
    name: 'Interface Engineering',
    description:
      'React at the edge of its ergonomics — typed systems, token pipelines and architecture that stays fast while the design keeps moving.',
    chips: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Design tokens'],
  },
  {
    index: '04',
    name: 'Creative Direction',
    description:
      'The concept before the canvas. Art direction, typographic voice and narrative structure that give gimmick a reason to exist.',
    chips: ['Art direction', 'Editorial typography', 'Visual systems', 'Prototyping'],
  },
  {
    index: '05',
    name: 'AI & Data',
    description:
      'Turning numbers into decisions — the bridges between Python, data and machine learning, applied to real problems before theory gets the credit.',
    chips: ['Python', 'Pandas & NumPy', 'Machine Learning', 'Data analysis', 'Applied AI'],
  },
]