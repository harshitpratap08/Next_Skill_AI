import React from 'react'
import { Competency } from '@/types'
import { CompetencyRing } from '@/components/common/ProgressBar'
import { SeverityBadge } from '@/components/common/Badge'

function severityFor(current: number, target: number) {
  const d = target - current
  if (d >= 1.8) return 'Critical' as const
  if (d >= 1.2) return 'High' as const
  if (d >= 0.5) return 'Medium' as const
  return 'Low' as const
}

export function CompetencyCard({ c, onClick }: { c: Competency; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="card p-4 text-left w-full hover:shadow-md hover:border-indigo-200 transition-all fade-in">
      <div className="flex items-center gap-4">
        <CompetencyRing value={c.current} size={56} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-navy-900 text-sm truncate">{c.name}</p>
          <p className="text-xs text-slate-400">{c.domain}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <SeverityBadge severity={severityFor(c.current, c.target)} />
            <span className="text-xs text-slate-400">Target {c.target.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
