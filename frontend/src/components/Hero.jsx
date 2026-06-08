import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const titles = [
  'AI Engineer',
  'Machine Learning Developer',
  'Python Developer',
  'Deep Learning Enthusiast',
  'Computer Vision Developer'
]

export default function Hero(){
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [forward, setForward] = useState(true)

  useEffect(()=>{
    let i = 0
    const title = titles[idx]
    const t = setInterval(()=>{
      if(forward){
        if(i <= title.length){
          setText(title.slice(0,i))
          i++
        } else {
          setForward(false)
          clearInterval(t)
          setTimeout(()=> setForward(true), 1200)
        }
      }
    }, 50)
    return ()=> clearInterval(t)
  }, [idx])

  useEffect(()=>{
    const cycle = setInterval(()=>{
      setIdx((s)=> (s+1) % titles.length)
    }, 3000)
    return ()=> clearInterval(cycle)
  },[])

  return (
    <section className="max-w-6xl mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.div initial={{x:-30,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.6}}>
            <div className="px-6 py-2 mb-4 inline-block rounded-full bg-gradient-to-r from-purple-700 to-cyan-500 text-sm font-medium">Available for opportunities</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-200">Ajay Shirke</span></h1>
            <h2 className="mt-3 text-2xl text-slate-300">{text}<span className="blink">|</span></h2>
            <p className="mt-6 text-slate-300 max-w-xl">Engineer specializing in AI, ML and Python. I design and deploy production-ready machine learning systems focused on computer vision, NLP, and intelligent assistants.</p>
            <div className="mt-6 flex gap-4">
              <a className="px-5 py-3 rounded-lg bg-transparent border border-slate-700 hover:bg-slate-800" href="#projects">View Projects</a>
              <a className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-black" href="/resume/Ajayresume.pdf">Download Resume</a>
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <motion.div className="w-full h-80 md:h-96 rounded-2xl backdrop-glass p-6 flex items-center justify-center" initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.2}}>
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r="80" stroke="url(#g)" strokeWidth="2" strokeOpacity="0.9"/>
              <circle cx="110" cy="110" r="46" stroke="url(#g)" strokeWidth="1" strokeOpacity="0.5"/>
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#cbd5e1" fontSize="12">AI Engineer</text>
            </svg>
          </motion.div>
          <div className="absolute -bottom-6 right-6 text-xs text-slate-400">Interactive AI product style UI</div>
        </div>
      </div>
    </section>
  )
}
