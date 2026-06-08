import React from 'react'

const projects = [
  {title:'Real-Time Facial Emotion Detection System', tech:['Python','TensorFlow','OpenCV'], repo:'#', demo:'#', summary:'Real-time facial emotion detection using CNNs and face landmarks.'},
  {title:'Voice Emotion Detection System', tech:['Python','PyTorch','Librosa'], repo:'#', demo:'#', summary:'Audio-based emotion detector trained on voice datasets.'},
  {title:'AI Career Advisor', tech:['Python','Streamlit','NLP'], repo:'#', demo:'#', summary:'Personalized career advice using skills matching and ML.'},
  {title:'Digit Recognition using Deep Learning', tech:['Python','Keras'], repo:'#', demo:'#', summary:'MNIST-based digit classifier with 98% accuracy.'},
  {title:'Intelligent Live AI Assistant', tech:['Python','Flask','WebRTC'], repo:'#', demo:'#', summary:'Voice-enabled AI assistant with live interactions.'}
]

export default function Projects(){
  return (
    <section className="max-w-6xl mx-auto my-20" id="projects">
      <h3 className="text-2xl font-semibold mb-6">Featured Projects</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p=> (
          <div key={p.title} className="backdrop-glass p-6 rounded-2xl">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold">{p.title}</h4>
              <div className="text-sm text-slate-300">{p.tech.join(' • ')}</div>
            </div>
            <p className="text-slate-300 mt-3">{p.summary}</p>
            <div className="mt-4 flex gap-3">
              <a className="px-3 py-2 rounded-lg border border-slate-700" href={p.repo}>GitHub</a>
              <a className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-400 text-black" href={p.demo}>Live Demo</a>
              <a className="px-3 py-2 rounded-lg border border-slate-700" href="#">Architecture</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
