/**
 * Real repositories pulled from the user's GitHub (github.com/naik1313-naik)
 * via the GitHub API on 2026-09-05. Summaries are derived from each repo's
 * README / metadata. Re-run the sync anytime to refresh.
 */
export interface Repo {
  name: string
  title: string
  summary: string
  lang: string
  topics: string[]
  url: string
  demo?: string
  updated: string
  archived?: boolean
}

export const repos: Repo[] = [
  {
    name: 'gvplumbing',
    title: 'GV Enterprises',
    summary:
      'Premium business website for a Belagavi plumbing, sanitary & hardware showroom — a luxury royal-blue & silver brand system with glassmorphic surfaces.',
    lang: 'TypeScript',
    topics: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    url: 'https://github.com/naik1313-naik/gvplumbing',
    demo: 'https://gvplumbing-eta.vercel.app',
    updated: 'Aug 2026',
  },
  {
    name: 'college-management-system',
    title: 'College Management System',
    summary:
      'Full-stack college management platform with JWT role-based access for admin, teacher and student — plus Razorpay fee payments.',
    lang: 'JavaScript',
    topics: ['Node.js', 'Express', 'PostgreSQL', 'React', 'JWT'],
    url: 'https://github.com/naik1313-naik/college-management-system',
    updated: 'Aug 2026',
  },
  {
    name: 'COURSE-REGISTRATION',
    title: 'NexGen Learning',
    summary:
      'Production-ready online course registration — student marketplace with Stripe checkout, instructor analytics dashboards and an AI recommendation engine.',
    lang: 'JavaScript',
    topics: ['React', 'Express', 'MySQL', 'Docker', 'Stripe'],
    url: 'https://github.com/naik1313-naik/COURSE-REGISTRATION',
    demo: 'https://online-course-theta-henna.vercel.app',
    updated: 'Mar 2026',
  },
  {
    name: 'Ai-waste-management-',
    title: 'Smart Waste Management',
    summary:
      'Intelligent waste platform — real-time bin monitoring, optimised collection routing and role-based citizen dashboards.',
    lang: 'HTML',
    topics: ['HTML', 'CSS', 'JavaScript', 'Maps'],
    url: 'https://github.com/naik1313-naik/Ai-waste-management-',
    demo: 'https://ai-waste-management-wine.vercel.app',
    updated: 'Mar 2026',
  },
  {
    name: 'linways',
    title: '3D Astro Portfolio',
    summary:
      'A WebGL portfolio built with Astro + Three.js — full-screen 3D hero, glassmorphism navigation and 3D project cards with hover tilt.',
    lang: 'TypeScript',
    topics: ['Astro', 'Three.js', 'GSAP', 'Tailwind CSS'],
    url: 'https://github.com/naik1313-naik/linways',
    updated: 'Mar 2026',
  },
  {
    name: 'big-biceps',
    title: 'Big Biceps Fitness',
    summary:
      'Premium dark, gold-accented website for a fitness & gym studio — timings, essentials, membership requirements and scroll animations.',
    lang: 'CSS',
    topics: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    url: 'https://github.com/naik1313-naik/big-biceps',
    demo: 'https://big-biceps.vercel.app',
    updated: 'Mar 2026',
  },
  {
    name: 'ecommerce-website',
    title: 'E-Commerce Storefront',
    summary:
      'A focused e-commerce product page — layout, product cards and interactions for an online storefront.',
    lang: 'HTML',
    topics: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/naik1313-naik/ecommerce-website',
    demo: 'https://ecommerce-website-rust-eight.vercel.app',
    updated: 'Dec 2025',
  },
  {
    name: 'ttt',
    title: 'Finance Web App',
    summary:
      'A Vercel-deployed web app — the repository itself is undocumented, but the live build is running.',
    lang: 'JavaScript',
    topics: ['JavaScript'],
    url: 'https://github.com/naik1313-naik/ttt',
    demo: 'https://finance-kappa-sepia.vercel.app',
    updated: 'Mar 2026',
  },
  {
    name: 'mental-health',
    title: 'Mental Health Project',
    summary:
      'A personal front-end build on the bench — repository awaiting documentation.',
    lang: 'JavaScript',
    topics: ['JavaScript'],
    url: 'https://github.com/naik1313-naik/mental-health',
    updated: 'Dec 2025',
  },
  {
    name: 'portfolio-new',
    title: 'Previous Portfolio',
    summary:
      'An earlier portfolio build on a React + Vite foundation — the draft this studio grew from.',
    lang: 'JavaScript',
    topics: ['React', 'Vite'],
    url: 'https://github.com/naik1313-naik/portfolio-new',
    updated: 'Mar 2026',
  },
  {
    name: 'bday',
    title: 'Happy Birthday Microsite',
    summary:
      'A small HTML/CSS gift — a birthday card experience shipped as a live page.',
    lang: 'CSS',
    topics: ['HTML', 'CSS'],
    url: 'https://github.com/naik1313-naik/bday',
    demo: 'https://happy-bday-cutie-phi.vercel.app',
    updated: 'Mar 2026',
  },
  {
    name: 'bhabhi-birthday-site',
    title: 'Birthday Site for Family',
    summary:
      'A handmade birthday page for family — quick, warm and responsive.',
    lang: 'HTML',
    topics: ['HTML', 'CSS'],
    url: 'https://github.com/naik1313-naik/bhabhi-birthday-site',
    updated: 'Apr 2026',
  },
  {
    name: 'praposal',
    title: 'Proposal Page',
    summary:
      'A playful, single-page HTML proposal experiment (archived).',
    lang: 'HTML',
    topics: ['HTML', 'CSS'],
    url: 'https://github.com/naik1313-naik/praposal',
    updated: 'May 2026',
    archived: true,
  },
]