import React, { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

export function UploadZone({ onFileSelected }: { onFileSelected: (file: File) => void }) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files?.[0]
        if (file) onFileSelected(file)
      }}
      onClick={() => inputRef.current?.click()}
      className={`card border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
        dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 hover:border-indigo-300'
      }`}
    >
      <UploadCloud size={36} className="mx-auto text-indigo-500 mb-3" />
      <p className="font-medium text-navy-900">Upload approved learning material</p>
      <p className="text-sm text-slate-400 mt-1">PDF, PPT, PPTX, DOC, DOCX or TXT — drag & drop or click to browse</p>
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
