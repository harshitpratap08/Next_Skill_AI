import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { SkillGapCard } from '@/components/gaps/SkillGapCard'
import { GapSeverity } from '@/types'
import { AlertTriangle, TrendingDown, Target, CheckCircle2 } from 'lucide-react'

const severities: GapSeverity[] = ['Critical', 'High', 'Medium', 'Low']

export function SkillGaps() {
  const { skillGaps } = useApp()
  const [filter, setFilter] = useState<GapSeverity | 'All'>('All')

  const filtered = filter === 'All' ? skillGaps : skillGaps.filter((g) => g.severity === filter)
  const criticalCount = skillGaps.filter((g) => g.severity === 'Critical').length
  const highCount = skillGaps.filter((g) => g.severity === 'High').length

  return (
    <Layout title="Skill Gap Radar">
      {/* Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Identified Competency Deficits</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time differential between current assessment score and required job performance benchmark.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200/80 text-xs font-bold text-rose-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {criticalCount} Critical Gaps
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 text-xs font-bold text-orange-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            {highCount} High Priority
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'All'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
          }`}
        >
          All Gaps ({skillGaps.length})
        </button>
        {severities.map((s) => {
          const count = skillGaps.filter((g) => g.severity === s).length
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === s
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {s} ({count})
            </button>
          )
        })}
      </div>

      {/* Grid of Gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((g) => (
          <SkillGapCard key={g.competencyId} gap={g} />
        ))}
      </div>
    </Layout>
  )
}

