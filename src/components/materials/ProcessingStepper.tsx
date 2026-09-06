import React from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

const stages = ['Uploading', 'Extracting content', 'Identifying concepts', 'Building knowledge map', 'Generating assessment']

export function ProcessingStepper({ currentStage }: { currentStage: number }) {
  return (
    <div className="card p-5">
      <div className="space-y-3">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center gap-3">
            {i < currentStage ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : i === currentStage ? (
              <Loader2 size={18} className="text-indigo-500 animate-spin" />
            ) : (
              <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-200" />
            )}
            <span className={`text-sm ${i <= currentStage ? 'text-navy-900 font-medium' : 'text-slate-400'}`}>{stage}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
