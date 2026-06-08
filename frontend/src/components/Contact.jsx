import React from 'react'

export default function Contact(){
  return (
    <section className="max-w-6xl mx-auto my-20" id="contact">
      <h3 className="text-2xl font-semibold mb-6">Contact</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="backdrop-glass p-6 rounded-2xl">
          <h4 className="font-medium">Get In Touch</h4>
          <p className="text-slate-300 mt-2">I'm open to ML/AI roles and collaborations. Reach out for internships, freelancing, or full-time opportunities.</p>
          <div className="mt-4 space-y-2 text-slate-300">
            <div>Email: ajayshirke1075@gmail.com</div>
            <div>LinkedIn: https://www.linkedin.com/in/ajay-shirke-862334322/</div>
            <div>GitHub: https://github.com/AjayShirke1075</div>
          </div>
        </div>
        <div className="backdrop-glass p-6 rounded-2xl">
          <form className="space-y-4">
            <div>
              <label className="text-sm">Name</label>
              <input className="mt-1 w-full rounded-md bg-transparent border border-slate-700 p-2" />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input className="mt-1 w-full rounded-md bg-transparent border border-slate-700 p-2" />
            </div>
            <div>
              <label className="text-sm">Message</label>
              <textarea className="mt-1 w-full rounded-md bg-transparent border border-slate-700 p-2 h-28"></textarea>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-400 text-black">Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
