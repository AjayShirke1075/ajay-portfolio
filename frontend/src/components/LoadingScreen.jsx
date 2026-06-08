import React from 'react'

export default function LoadingScreen(){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center loading-screen">
      <div className="text-center">
        <div className="mb-4 animate-spin inline-block w-12 h-12 border-4 border-t-transparent rounded-full border-purple-500"></div>
        <div className="text-slate-300">Initializing AI Interface...</div>
      </div>
    </div>
  )
}
