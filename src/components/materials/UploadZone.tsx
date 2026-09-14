import React, { useRef, useState } from 'react'
import { UploadCloud, FileType, CheckCircle2 } from 'lucide-react'

export function UploadZone({ onFileSelected }: { onFileSelected: (file: File) => void }) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files?.[0]
        if (file) onFileSelected(file)
      }}
      onClick={() => inputRef.current?.click()}
      className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${
        dragOver
          ? 'border-brand-500 bg-brand-50/70 shadow-glow-indigo scale-[1.005]'
          : 'border-slate-300 hover:border-brand-400 bg-white/80 hover:bg-slate-50/60 shadow-sm'
      }`}
    >
      <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 border border-brand-200/80 mx-auto mb-4 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        <UploadCloud size={32} />
      </div>

      <h4 className="font-extrabold text-base text-slate-900">
        Upload Official Skilling Documentation
      </h4>
      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
        Drag and drop your syllabus, guidelines, or handbook files here, or browse from your device.
      </p>

      <div className="flex items-center justify-center gap-2 mt-5">
        {['PDF', 'PPTX', 'DOCX', 'TXT'].map((ext) => (
          <span
            key={ext}
            className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200"
          >
            {ext}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelected(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}

