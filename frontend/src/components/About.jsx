import React from 'react'

export default function About(){
  return (
    <section className="max-w-6xl mx-auto my-20" id="about">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="col-span-1">
          <div className="backdrop-glass rounded-2xl p-6">
            <div className="w-full h-64 rounded-xl bg-gradient-to-br from-[#0b1220] to-[#071026] flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400"></div>
            </div>
            <h3 className="mt-6 text-xl font-semibold">Ajay Shirke</h3>
            <p className="text-slate-300 mt-2">Computer Science (AIML) graduate • AI/ML Engineer</p>
            <div className="mt-4 text-sm text-slate-400">Navi Mumbai • Open to roles in ML/AI</div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="backdrop-glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Professional Summary</h3>
            <p className="text-slate-300 mt-2">Engineer focused on building ML-driven products: real-time CV systems, NLP pipelines, and AI assistants. Strong Python background with production-facing experience in model deployment and data engineering.</p>
            <h4 className="mt-4 font-medium">Career Journey</h4>
            <ol className="mt-2 border-l border-slate-700 pl-4 text-slate-300">
              <li className="mb-2"><strong>2024 — Present:</strong> Freelance AI Engineer — client projects (emotion detection, career advisor)</li>
              <li className="mb-2"><strong>2022 — 2024:</strong> Student projects & internships — ML/DL projects with internships</li>
              <li className="mb-2"><strong>2020 — 2022:</strong> Foundations — Data Structures, Algorithms, Python</li>
            </ol>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-semibold">Education</h5>
                <div className="text-slate-300 text-sm">B.E. Computer Science (AIML)</div>
              </div>
              <div>
                <h5 className="text-sm font-semibold">Technical Strengths</h5>
                <div className="text-slate-300 text-sm">Python, TensorFlow, PyTorch, OpenCV, NLP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
