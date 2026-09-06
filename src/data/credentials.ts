export interface Credential {
  title: string
  issuer: string
  platform: string
  tag: string
  year?: string
}

export const credentials: Credential[] = [
  {
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Tata',
    platform: 'Forage',
    tag: 'Cyber Security',
  },
  {
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata',
    platform: 'Forage',
    tag: 'Data Analytics',
  },
  {
    title: 'Cyber Security',
    issuer: 'Certificate',
    platform: 'Course',
    tag: 'Cyber Security',
  },
  {
    title: 'Data Analysis',
    issuer: 'Certificate',
    platform: 'Course',
    tag: 'Data',
  },
  {
    title: 'Web Development',
    issuer: 'Udemy',
    platform: 'Udemy',
    tag: 'Web',
  },
]
