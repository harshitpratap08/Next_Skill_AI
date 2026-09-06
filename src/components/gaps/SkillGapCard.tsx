import React from 'react'
import { SkillGap } from '@/types'
import { SeverityBadge } from '@/components/common/Badge'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Link } from 'react-router-dom'

export function SkillGapCard({ gap }: { gap: SkillGap }) {
  return (
    <div className="card p-4 fade-in">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-navy-900">{gap.competencyName}</h4>
        <SeverityBadge severity={gap.severity} />
      </div>
      <div className="text-xs text-slate-500 flex justify-between mb-1">
        <span>Current: {gap.current.toFixed(1)}</span>
        <span>Required: {gap.required.toFixed(1)}</span>
      </div>
      <ProgressBar value={gap.current} max={5} colorClass="bg-indigo-500" />
      <dl className="mt-3 space-y-1 text-xs text-slate-500">
        <div className="flex gap-1"><dt className="font-medium text-slate-600">Evidence:</dt><dd>{gap.evidence}</dd></div>
        <div className="flex gap-1"><dt className="font-medium text-slate-600">Prerequisite:</dt><dd>{gap.prerequisite}</dd></div>
        <div className="flex gap-1"><dt className="font-medium text-slate-600">Recommended:</dt><dd>{gap.recommendedAction}</dd></div>
      </dl>
      <Link to="/learning-path" className="inline-block mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700">
        View Learning Path →
      </Link>
    </div>
  )
}
