import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Playground from './components/Playground'
import Contact from './components/Contact'
import LoadingScreen from './components/LoadingScreen'

export default function App(){
  const [loaded, setLoaded] = useState(false)
  useEffect(()=>{
    const t = setTimeout(()=> setLoaded(true), 900)
    return ()=> clearTimeout(t)
  },[])

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#04050a] via-[#071026] to-[#05101a] text-white">
      {!loaded ? <LoadingScreen /> : null}
      <div className={`relative ${loaded? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}> 
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 backdrop-glass rounded-xl px-6 py-3 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="text-xl font-semibold">Ajay <span className="text-accent">Shirke</span></div>
            <div className="ml-4 text-sm text-slate-300">AI Engineer / ML Developer</div>
          </div>
        </nav>
        <main className="pt-28 px-6">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Playground />
          <Contact />
        </main>
        <footer className="text-center py-10 text-slate-400">© {new Date().getFullYear()} Ajay Shirke • Built with passion</footer>
      </div>
    </div>
  )
}
