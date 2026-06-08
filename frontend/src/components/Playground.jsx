import React from 'react'

export default function Playground(){
  return (
    <section className="max-w-6xl mx-auto my-20" id="playground">
      <h3 className="text-2xl font-semibold mb-6">AI Playground</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="backdrop-glass p-6 rounded-2xl">
          <h4 className="font-medium">Resume Analyzer</h4>
          <p className="text-slate-300 mt-2">Upload a resume and get an ATS-friendly score and improvement suggestions.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-3 py-2 rounded-lg border">Try Demo</button>
          </div>
        </div>
        <div className="backdrop-glass p-6 rounded-2xl">
          <h4 className="font-medium">Sentiment Analysis</h4>
          <p className="text-slate-300 mt-2">Quick sentiment analysis demo for text input.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-3 py-2 rounded-lg border">Try Demo</button>
          </div>
        </div>
        <div className="backdrop-glass p-6 rounded-2xl">
          <h4 className="font-medium">AI Chat Assistant</h4>
          <p className="text-slate-300 mt-2">Ask questions about my projects and resume.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-3 py-2 rounded-lg border">Open Chat</button>
          </div>
        </div>
        <div className="backdrop-glass p-6 rounded-2xl">
          <h4 className="font-medium">Image Classification</h4>
          <p className="text-slate-300 mt-2">Upload an image to classify common objects or digits.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-3 py-2 rounded-lg border">Try Demo</button>
          </div>
        </div>
      </div>
    </section>
  )
}
