/**
 * Central, editable site content.
 * Real details sourced from the user's LinkedIn profile
 * (linkedin.com/in/sumeet-naik-engeneering-student) on 2026-09-05.
 * Anything marked PLACEHOLDER still needs a real value.
 */
export const site = {
  name: 'Sumeet Naik',
  firstName: 'Sumeet',
  lastName: 'Naik',
  initials: 'SN',
  role: "Engineering student · AI & software",
  domain: 'Software development / data analysis / AI / creative development',
  statement:
    "An engineering student working the seam where software, data and AI meet — building fast, expressive interfaces and 3D experiments along the way.",
  bioOne:
    "I'm an engineering student at Presidency University, Bengaluru, on a self-directed path that runs from Python and data into machine learning and applied AI — with a parallel obsession for motion, typography and three-dimensional interfaces.",
  bioTwo:
    "I've just completed an AI internship at Pratinik Infotech — turning the bench into a live laboratory for datasets, models and products — while honing a craft that treats the browser as an instrument.",
  email: 'sumeetnaik2005@gmail.com',
  location: 'Bengaluru, India — open to remote internships & collabs',
  availability: 'Open to internships & junior roles',
  status: 'open',
  meta: {
    focus: ['Software & data', 'AI / machine learning', 'Creative development'],
    tooling: ['Python', 'React', 'TypeScript', 'Three.js & WebGL', 'GSAP'],
  },
  socials: {
    linkedin: {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sumeet-naik-engeneering-student',
    },
    github: { label: 'GitHub', url: 'https://github.com/naik1313-naik' },
    x: { label: 'X', url: 'https://x.com/yourusername' }, // PLACEHOLDER
    dribbble: { label: 'Dribbble', url: 'https://dribbble.com/yourusername' }, // PLACEHOLDER
  },
} as const

export const navLinks = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'craft', label: 'Craft', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'path', label: 'Path', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
] as const