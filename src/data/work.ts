export interface Project {
  id: string
  index: string
  title: string
  category: string
  mode: 'Concept'
  year: string
  role: string
  summary: string
  tags: string[]
  visual: {
    background: string
    glyph: string
    accent: string
  }
  caseStudy: {
    problem: string
    concept: string
    solution: string
    outcome: string
    features: string[]
  }
  link?: string
}

export const projects: Project[] = [
  {
    id: 'meridian',
    index: '01',
    title: 'Meridian',
    category: 'Spatial music interface',
    mode: 'Concept',
    year: '2026',
    role: 'Concept · Design · WebGL engineering',
    summary:
      'A music player rebuilt as a 3D instrument — spectral waveforms rendered live on a reactive sphere you can orbit, turn and fold.',
    tags: ['Three.js', 'Web Audio', 'WebGL shaders', 'R3F'],
    visual: {
      background:
        'radial-gradient(circle at 30% 20%, rgba(255,75,31,0.35), transparent 55%), radial-gradient(circle at 75% 80%, rgba(124,156,255,0.28), transparent 55%), linear-gradient(135deg, #120f0d, #0a0a0c)',
      glyph: '◍',
      accent: '#ff4b1f',
    },
    caseStudy: {
      problem:
        'Music players are one-dimensional lists. The gesture, the shape and the feeling of the music are invisible — interface reduces sound to a scrub bar.',
      concept:
        'Render the track as a physical object. The spectrum becomes a wireframe sphere whose vertices breathe with the audio; every interaction is spatial.',
      solution:
        'A React Three Fiber scene with a vertex-displaced sphere, a Web Audio analyser driving the vertex shader, and custom billboards for transport. Orbit, pinch and tilt replace the classic bar.',
      outcome:
        'A concept instrument tuned as a live scene — the playlist becomes the sculpture, not the other way around. Built to sit way past the standard music UI.',
      features: ['Audio-reactive vertex shader', 'Spatial transport controls', 'Immersive track gallery', 'Reduced-motion fallback'],
    },
  },
  {
    id: 'inke-stein',
    index: '02',
    title: 'Ink & Steel',
    category: 'Studio launch-site concept',
    mode: 'Concept',
    year: '2025',
    role: 'Concept · Design · Motion · Build',
    summary:
      'A founding narrative for an industrial-design studio — heavy Syne typography, scroll-scrubbed ink textures and a horizontal case archive.',
    tags: ['GSAP', 'ScrollTrigger', 'Editorial web', 'Custom cursor'],
    visual: {
      background:
        'radial-gradient(circle at 70% 30%, rgba(244,240,232,0.12), transparent 50%), linear-gradient(180deg, #141414, #0a0a0c)',
      glyph: '✜',
      accent: '#7c9cff',
    },
    caseStudy: {
      problem:
        'A workshop manufacturing tools deserved a presence that felt machined — not a stock template dressed in serifs.',
      concept:
        'Treat the page like a casting: real ink scans, feathered edges, and type that moves like a press stamping onto the page.',
      solution:
        'ScrollTrigger-scrubbed texture overlays, a pinned horizontal archive of commissions, and a grain that stays visible on every viewport.',
      outcome:
        'A launch-site concept machined from type and ink textures — rehearsing a studio presence long before any press cycle begins.',
      features: ['Pinned horizontal archive', 'Ink texture reveals', 'Split-type headline choreography', 'Editorial detail pages'],
    },
  },
  {
    id: 'perigee',
    index: '03',
    title: 'Perigee',
    category: 'Data observatory concept',
    mode: 'Concept',
    year: '2024',
    role: 'Concept · Engineering · Interface',
    summary:
      'A live observatory for orbital debris — tens of thousands of tracked objects rendered as a breathing constellation with a scrubbable timeline.',
    tags: ['WebGL', 'Instanced geometry', 'Data viz', 'R3F'],
    visual: {
      background:
        'radial-gradient(circle at 50% 60%, rgba(124,156,255,0.3), transparent 60%), linear-gradient(160deg, #0a0e14, #08080a)',
      glyph: '◎',
      accent: '#7c9cff',
    },
    caseStudy: {
      problem:
        'Space-adjacency data is dense, dry and intimidating. Stakeholders needed to feel the scale of the problem, not read a spreadsheet.',
      concept:
        'Turn 40,000 data points into a constellation you can fly through — the density of the ring the only word needed.',
      solution:
        'Instanced sphere points in a single draw call, a scroll-driven camera that dives through the belt, and a 24-month timeline scrubbed by scroll position.',
      outcome:
        'A concept observatory for dense data — the scroll camera makes scale legible in seconds, a designed argument where raw numbers could not.',
      features: ['Instanced rendering', 'Scroll-driven camera flight', 'Scroll-scrubbed timeline', 'DPR-aware detail'],
    },
  },
  {
    id: 'vanta',
    index: '04',
    title: 'Vanta',
    category: 'Design-systems engine concept',
    mode: 'Concept',
    year: '2024',
    role: 'Concept · Architecture · Build',
    summary:
      'A token-first component engine with a live 3D theme inspector — swap palette, radius and tone, and watch every surface re-materialise in real time.',
    tags: ['React', 'TypeScript', 'Design tokens', 'R3F'],
    visual: {
      background:
        'radial-gradient(circle at 25% 25%, rgba(255,75,31,0.4), transparent 55%), radial-gradient(circle at 80% 70%, rgba(244,240,232,0.1), transparent 50%), linear-gradient(135deg, #161012, #0a0a0c)',
      glyph: '◮',
      accent: '#ff7a55',
    },
    caseStudy: {
      problem:
        'Multi-team product surfaces diverged — every vendor had learned a different shade of the same brand.',
      concept:
        'Make the design language a live object: a single token graph, visualised and editable in 3D, not a wall of markdown.',
      solution:
        'A React + TypeScript token pipeline with typed exports, and an inspector scene where radius and palette mutations re-render a 3D specimen lab in real time.',
      outcome:
        'A concept for token-life — the 3D inspector turns brand decisions into an interactive demo instead of a meeting.',
      features: ['Typed token pipeline', '3D theme inspector', 'Live specimen lab', 'Zero-runtime CSS output'],
    },
  },
]