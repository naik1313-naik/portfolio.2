import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/utils'
import { initLenis, destroyLenis } from './lib/scroll'
import { CursorProvider } from './context/CursorContext'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import SectionRail from './components/SectionRail'
import Hero from './components/Hero/Hero'
import Ribbon from './components/Ribbon'
import About from './components/About'
import Craft from './components/Craft'
import Credentials from './components/Credentials'
import Work from './components/Work/Work'
import Path from './components/Path'
import Contact from './components/Contact'
import Footer from './components/Footer'

const ribbonItems = [
  'Creative development',
  'Interaction design',
  '3D & WebGL',
  'Motion systems',
  'Interface engineering',
  'Type & layout',
]

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handleComplete = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  useEffect(() => {
    if (!loaded) return
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 60)
    return () => window.clearTimeout(t)
  }, [loaded])

  return (
    <CursorProvider>
      {!loaded && <Loader onComplete={handleComplete} />}
      <CustomCursor />
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-bg"
        >
          Skip to content
        </a>

        <Nav />
        <SectionRail />

        <main>
          <Hero loaded={loaded} />
          <Ribbon items={ribbonItems} />
          <About />
          <Craft />
          <Credentials />
          <Work />
          <Path />
          <Contact />
        </main>

        <Footer />
      </div>
    </CursorProvider>
  )
}