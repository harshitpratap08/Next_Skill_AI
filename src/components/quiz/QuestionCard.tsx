import React from 'react'
import { Question } from '@/types'

export function QuestionCard({
  question, index, total, selected, onSelect,
}: {
  question: Question
  index: number
  total: number
  selected: number | null
  onSelect: (i: number) => void
}) {
  return (
    <div className="card p-6">
      <p className="text-xs font-medium text-indigo-600 mb-2">Question {index + 1} of {total}</p>
      <h3 className="text-lg font-semibold text-navy-900 mb-5">{question.prompt}</h3>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
              selected === i ? 'border-indigo-500 bg-indigo-50 text-indigo-800 font-medium' : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
