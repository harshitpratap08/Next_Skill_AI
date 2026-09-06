import React, { useState } from 'react'
import { Recommendation } from '@/types'
import { Badge } from '@/components/common/Badge'
import { Modal } from '@/components/common/Modal'
import { CheckCircle2, Info } from 'lucide-react'

export function RecommendationCard({ rec, onEnroll, enrolled }: { rec: Recommendation; onEnroll: () => void; enrolled: boolean }) {
  const [showWhy, setShowWhy] = useState(false)
  return (
    <div className="card p-4 fade-in">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-navy-900 text-sm">{rec.title}</p>
          <Badge tone="info">{rec.type}</Badge>
        </div>
        <span className="text-xs font-semibold text-indigo-600">{rec.score}% match</span>
      </div>
      <p className="text-xs text-slate-500 mt-2">Addresses: {rec.gapAddressed}</p>
      <p className="text-xs text-slate-500">Expected: {rec.expectedImprovement}</p>
      <div className="flex items-center gap-2 mt-3">
        <button onClick={() => setShowWhy(true)} className="text-xs font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-1">
          <Info size={13} /> Why recommended?
        </button>
        <button
          onClick={onEnroll}
          disabled={enrolled}
          className={`ml-auto text-xs font-medium px-3 py-1.5 rounded-lg ${enrolled ? 'bg-emerald-50 text-emerald-600' : 'btn-primary'}`}
        >
          {enrolled ? <span className="flex items-center gap-1"><CheckCircle2 size={13} /> Enrolled</span> : 'Enroll'}
        </button>
      </div>
      {showWhy && (
        <Modal title="Why recommended?" onClose={() => setShowWhy(false)}>
          <ul className="space-y-2">
            {rec.reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  )
}
