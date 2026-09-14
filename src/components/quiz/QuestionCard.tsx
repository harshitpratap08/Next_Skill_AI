import React from 'react'
import { Question } from '@/types'
import { CheckCircle2, HelpCircle } from 'lucide-react'

export function QuestionCard({
  question,
  index,
  total,
  selected,
  onSelect,
}: {
  question: Question
  index: number
  total: number
  selected: number | null
  onSelect: (i: number) => void
}) {
  const letters = ['A', 'B', 'C', 'D']

  return (
    <div className="card p-6 sm:p-8 shadow-md border-slate-200/90 animate-fade-in">
      {/* Top Meta */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
            Question {index + 1} of {total}
          </span>
          <span className="text-xs text-slate-400 font-medium">· {question.competency}</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
          Concept: {question.concept}
        </span>
      </div>

      {/* Prompt */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
        {question.prompt}
      </h3>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 group ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/70 text-brand-950 font-medium shadow-sm ring-1 ring-brand-500/50'
                  : 'border-slate-200 hover:border-brand-200 hover:bg-slate-50/80 text-slate-700'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-700'
                }`}
              >
                {letters[i]}
              </div>
              <span className="text-xs sm:text-sm mt-0.5 leading-relaxed">{opt}</span>
              {isSelected && <CheckCircle2 size={18} className="text-brand-600 ml-auto shrink-0 mt-0.5" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

