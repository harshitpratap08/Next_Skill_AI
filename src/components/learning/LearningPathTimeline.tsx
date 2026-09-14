import React from 'react'
import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react'

export interface PathStep {
  title: string
  source: string
  duration: string
  status: 'done' | 'active' | 'upcoming'
}

export function LearningPathTimeline({ steps }: { steps: PathStep[] }) {
  return (
    <div className="relative pl-1">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-4 group">
          {/* Timeline node & connector */}
          <div className="flex flex-col items-center">
            <div className="relative z-10">
              {s.status === 'done' ? (
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-300 shadow-2xs">
                  <CheckCircle2 size={15} />
                </div>
              ) : s.status === 'active' ? (
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 border border-brand-300 shadow-glow-indigo animate-pulse-subtle">
                  <Clock size={15} />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-0.5 flex-1 min-h-[36px] my-1 transition-colors ${
                  s.status === 'done' ? 'bg-emerald-300' : 'bg-slate-200'
                }`}
              />
            )}
          </div>

          {/* Timeline content */}
          <div className="pb-5 pt-0.5">
            <div className="flex items-center gap-2">
              <p
                className={`text-xs font-bold ${
                  s.status === 'upcoming'
                    ? 'text-slate-400'
                    : s.status === 'active'
                    ? 'text-brand-700 font-extrabold'
                    : 'text-slate-900'
                }`}
              >
                {s.title}
              </p>
              {s.status === 'active' && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-brand-50 text-brand-600 border border-brand-200">
                  Current Focus
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {s.source} {s.duration ? `• ${s.duration}` : ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

