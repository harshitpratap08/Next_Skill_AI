import React from 'react'
import { SkillGap } from '@/types'
import { SeverityBadge } from '@/components/common/Badge'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, AlertCircle } from 'lucide-react'

export function SkillGapCard({ gap }: { gap: SkillGap }) {
  const delta = (gap.required - gap.current).toFixed(1)
  return (
    <div className="card p-4.5 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">
              {gap.competencyName}
            </h4>
            <span className="text-[11px] font-semibold text-rose-600">
              Gap: -{delta} pts
            </span>
          </div>
          <SeverityBadge severity={gap.severity} />
        </div>

        {/* Progress Display */}
        <div className="space-y-1.5 mb-3 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
          <div className="text-[11px] font-semibold text-slate-600 flex justify-between">
            <span>Score: <strong className="text-slate-900">{gap.current.toFixed(1)}</strong> / 5.0</span>
            <span className="text-slate-400">Target: <strong className="text-slate-700">{gap.required.toFixed(1)}</strong></span>
          </div>
          <ProgressBar
            value={gap.current}
            max={5}
            colorClass={
              gap.severity === 'Critical'
                ? 'bg-gradient-to-r from-rose-500 to-red-500'
                : gap.severity === 'High'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                : 'bg-gradient-to-r from-brand-600 to-indigo-500'
            }
          />
        </div>

        {/* Details list */}
        <div className="space-y-1 text-xs text-slate-500 mb-3">
          <p className="line-clamp-1">
            <span className="font-medium text-slate-700">Next Action:</span> {gap.recommendedAction}
          </p>
          <p className="text-[11px] text-slate-400">
            <span className="font-medium text-slate-600">Prereq:</span> {gap.prerequisite}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <Link
          to="/learning-path"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <span>Remediate Gap</span>
          <ArrowUpRight size={13} />
        </Link>
        <Link
          to="/quiz"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800"
        >
          <span>Quiz</span>
        </Link>
      </div>
    </div>
  )
}

