import React from 'react'

const skills = [
  {group: 'Programming', items:["Python","SQL","JavaScript"]},
  {group: 'AI/ML', items:["Machine Learning","Deep Learning","TensorFlow","Keras","PyTorch","NLP","Computer Vision"]},
  {group: 'Data', items:["NumPy","Pandas","Data Visualization"]},
  {group: 'Web', items:["Streamlit","Flask","HTML","CSS"]}
]

export default function Skills(){
  return (
    <section className="max-w-6xl mx-auto my-20" id="skills">
      <h3 className="text-2xl font-semibold mb-6">Skills</h3>
      <div className="grid md:grid-cols-4 gap-6">
        {skills.map(s=> (
          <div key={s.group} className="backdrop-glass p-4 rounded-xl">
            <h4 className="font-medium mb-3">{s.group}</h4>
            <div className="space-y-3">
              {s.items.map(it=> (
                <div key={it} className="">
                  <div className="flex justify-between text-sm text-slate-300 mb-1"> 
                    <div>{it}</div>
                    <div>90%</div>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full" style={{width: Math.floor(Math.random()*25)+75 + '%'}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
