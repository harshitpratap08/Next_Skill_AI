import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { SkillGapCard } from '@/components/gaps/SkillGapCard'
import { GapSeverity } from '@/types'

const severities: GapSeverity[] = ['Critical', 'High', 'Medium', 'Low']

export function SkillGaps() {
  const { skillGaps } = useApp()
  const [filter, setFilter] = useState<GapSeverity | 'All'>('All')

  const filtered = filter === 'All' ? skillGaps : skillGaps.filter((g) => g.severity === filter)

  return (
    <Layout title="Skill Gaps">
      <h2 className="text-lg font-bold text-navy-900 mb-1">Your Competency Gap Map</h2>
      <p className="text-sm text-slate-500 mb-5">Evidence-based gaps between current and required competency levels.</p>

      <div className="flex gap-2 mb-5 flex-wrap">
        <button onClick={() => setFilter('All')} className={`chip border ${filter === 'All' ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-600 border-slate-200'}`}>
          All ({skillGaps.length})
        </button>
        {severities.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`chip border ${filter === s ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-600 border-slate-200'}`}
          >
            {s} ({skillGaps.filter((g) => g.severity === s).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((g) => (
          <SkillGapCard key={g.competencyId} gap={g} />
        ))}
      </div>
    </Layout>
  )
}
