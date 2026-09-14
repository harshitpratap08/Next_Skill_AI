import React from 'react'
import { Competency } from '@/types'
import { CompetencyRing } from '@/components/common/ProgressBar'
import { SeverityBadge } from '@/components/common/Badge'
import { ShieldCheck, ChevronRight } from 'lucide-react'

function severityFor(current: number, target: number) {
  const d = target - current
  if (d >= 1.8) return 'Critical' as const
  if (d >= 1.2) return 'High' as const
  if (d >= 0.5) return 'Medium' as const
  return 'Low' as const
}

export function CompetencyCard({ c, onClick }: { c: Competency; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card p-4 text-left w-full hover:shadow-md hover:border-brand-300 transition-all duration-200 group flex items-center justify-between"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <CompetencyRing value={c.current} size={52} />
        <div className="min-w-0">
          <p className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-brand-600 transition-colors">
            {c.name}
          </p>
          <p className="text-[11px] text-slate-400 font-medium">{c.domain}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <SeverityBadge severity={severityFor(c.current, c.target)} />
            <span className="text-[10px] font-semibold text-slate-500">
              Target: {c.target.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
    </button>
  )
}

