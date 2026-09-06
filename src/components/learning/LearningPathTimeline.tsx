import React from 'react'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

export interface PathStep {
  title: string
  source: string
  duration: string
  status: 'done' | 'active' | 'upcoming'
}

export function LearningPathTimeline({ steps }: { steps: PathStep[] }) {
  return (
    <div className="space-y-0">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            {s.status === 'done' ? (
              <CheckCircle2 size={20} className="text-emerald-500" />
            ) : s.status === 'active' ? (
              <Clock size={20} className="text-indigo-500" />
            ) : (
              <Circle size={20} className="text-slate-300" />
            )}
            {i < steps.length - 1 && <div className={`w-px flex-1 min-h-8 ${s.status === 'done' ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
          </div>
          <div className="pb-6">
            <p className={`text-sm font-medium ${s.status === 'upcoming' ? 'text-slate-400' : 'text-navy-900'}`}>{s.title}</p>
            <p className="text-xs text-slate-400">{s.source} • {s.duration}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
