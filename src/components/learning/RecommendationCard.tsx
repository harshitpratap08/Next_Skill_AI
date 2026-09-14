import React, { useState } from 'react'
import { Recommendation } from '@/types'
import { Badge } from '@/components/common/Badge'
import { Modal } from '@/components/common/Modal'
import { CheckCircle2, Info, Sparkles, ArrowRight } from 'lucide-react'

export function RecommendationCard({
  rec,
  onEnroll,
  enrolled,
}: {
  rec: Recommendation
  onEnroll: () => void
  enrolled: boolean
}) {
  const [showWhy, setShowWhy] = useState(false)
  return (
    <div className="card p-5 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <p className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors leading-snug">
              {rec.title}
            </p>
            <div className="mt-1">
              <Badge tone={rec.type.includes('iGOT') ? 'info' : 'purple'}>{rec.type}</Badge>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shrink-0">
            {rec.score}% match
          </span>
        </div>

        <div className="space-y-1 mt-3 text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
          <p>
            <span className="font-medium text-slate-400">Target Gap:</span> <strong>{rec.gapAddressed}</strong>
          </p>
          <p>
            <span className="font-medium text-slate-400">Impact:</span> <strong className="text-emerald-700">{rec.expectedImprovement}</strong>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => setShowWhy(true)}
          className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
        >
          <Info size={14} />
          <span>Why this?</span>
        </button>

        <button
          onClick={onEnroll}
          disabled={enrolled}
          className={`text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs ${
            enrolled
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
              : 'btn-primary'
          }`}
        >
          {enrolled ? (
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} /> Enrolled
            </span>
          ) : (
            'Enroll Now'
          )}
        </button>
      </div>

      {showWhy && (
        <Modal title="AI Recommendation Rationale" onClose={() => setShowWhy(false)}>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-brand-50/70 border border-brand-100 text-xs text-brand-900">
              Scored <strong className="text-brand-700">{rec.score}/100</strong> based on role priorities, gap severity, and prerequisite alignment.
            </div>
            <ul className="space-y-2.5 pt-1">
              {rec.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  )
}

