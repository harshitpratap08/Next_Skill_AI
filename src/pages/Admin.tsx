import React, { useMemo, useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { MetricCard } from '@/components/common/MetricCard'
import { WorkforceHeatmap } from '@/components/charts/WorkforceHeatmap'
import { generateWorkforce, generateHeatmap, heatmapCompetencies, emergingSkills } from '@/data/mockData'
import { Users, Target, AlertTriangle, Award, Search, Building2, User, ChevronRight, X, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#ef4444', '#f59e0b', '#6366f1', '#10b981']

export function Admin() {
  const workforce = useMemo(() => generateWorkforce(), [])
  const heatmap = useMemo(() => generateHeatmap(), [])
  const [query, setQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [selected, setSelected] = useState<typeof workforce[0] | null>(null)

  const avgReadiness = Math.round(workforce.reduce((s, w) => s + w.readiness, 0) / workforce.length)
  const totalCritical = workforce.reduce((s, w) => s + w.criticalGaps, 0)
  const avgProgress = Math.round(workforce.reduce((s, w) => s + w.learningProgress, 0) / workforce.length)

  const gapDistribution = [
    { name: 'Critical Gaps (4+)', value: workforce.filter((w) => w.criticalGaps >= 4).length },
    { name: 'High Gaps (3)', value: workforce.filter((w) => w.criticalGaps === 3).length },
    { name: 'Moderate Gaps (1-2)', value: workforce.filter((w) => w.criticalGaps <= 2 && w.criticalGaps > 0).length },
    { name: 'Fully Ready (0 Gaps)', value: workforce.filter((w) => w.criticalGaps === 0).length },
  ]

  const departments: string[] = ['All', ...Array.from(new Set<string>(workforce.map((w) => w.department)))]
  const filtered = workforce.filter(
    (w) => (deptFilter === 'All' || w.department === deptFilter) && w.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Layout title="Workforce Intelligence &amp; Command Center">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard label="Total Tracked Officials" value={`${workforce.length}`} icon={Users} tone="indigo" sublabel="All active cadres" />
        <MetricCard label="National Avg Readiness" value={`${avgReadiness}%`} icon={Target} tone="emerald" sublabel="Benchmark: 80%" trend={{ text: 'Stable', positive: true }} />
        <MetricCard label="Total Critical Gaps" value={`${totalCritical}`} icon={AlertTriangle} tone="red" sublabel="Urgent remediation" trend={{ text: 'Priority', positive: false }} />
        <MetricCard label="Avg Learning Hours" value={`${avgProgress}h`} icon={Award} tone="amber" sublabel="Per official / quarter" trend={{ text: '+15%', positive: true }} />
      </div>

      {/* Heatmap & Gap Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-2 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Departmental Competency Heatmap</h3>
                <p className="text-xs text-slate-400">Readiness scores aggregated across divisions &amp; competencies</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                Live Aggregation
              </span>
            </div>
            <div className="py-2">
              <WorkforceHeatmap competencyLabels={heatmapCompetencies} matrix={heatmap} />
            </div>
          </div>
        </div>

        <div className="card p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Gap Severity Breakdown</h3>
            <p className="text-xs text-slate-400 mb-4">Official workforce distribution</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={gapDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={4}>
                  {gapDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {gapDistribution.map((g, i) => (
              <div key={g.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-slate-600 font-medium">{g.name}</span>
                </div>
                <span className="font-bold text-slate-900">{g.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emerging Skills & Department Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6 shadow-md">
          <h3 className="font-bold text-slate-900 text-base mb-1">Emerging Skill Horizon</h3>
          <p className="text-xs text-slate-400 mb-4">Current organizational readiness vs future strategic relevance</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={emergingSkills} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
              <Tooltip />
              <Bar dataKey="currentReadiness" name="Current Readiness" fill="#818cf8" radius={[0, 4, 4, 0]} />
              <Bar dataKey="futureRelevance" name="Future Relevance" fill="#4338ca" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6 shadow-md">
          <h3 className="font-bold text-slate-900 text-base mb-1">Divisional Readiness Comparison</h3>
          <p className="text-xs text-slate-400 mb-4">Average readiness score across MoSPI functional divisions</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={departments.slice(1).map((d: string) => ({
                name: d.split(' ')[0],
                readiness: Math.round(
                  workforce.filter((w) => w.department === d).reduce((s, w) => s + w.readiness, 0) /
                    (workforce.filter((w) => w.department === d).length || 1)
                ),
              }))}
            >
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="readiness" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workforce Directory */}
      <div className="card p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Statistical Cadre Workforce Directory</h3>
            <p className="text-xs text-slate-400">Click any official to view their complete skilling dossier</p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search official..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-500/20 w-48"
              />
            </div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 outline-none"
            >
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                <th className="pb-3">Official</th>
                <th className="pb-3">Designation / Role</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Readiness</th>
                <th className="pb-3">Critical Gaps</th>
                <th className="pb-3">Progress</th>
                <th className="pb-3">Last Assessed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.slice(0, 15).map((w) => (
                <tr
                  key={w.id}
                  onClick={() => setSelected(w)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <td className="py-3 font-bold text-slate-900 group-hover:text-brand-600 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-[10px]">
                      {w.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span>{w.name}</span>
                  </td>
                  <td className="py-3 text-slate-600 font-medium">{w.role}</td>
                  <td className="py-3 text-slate-500">{w.department}</td>
                  <td className="py-3">
                    <span className="font-bold text-slate-800">{w.readiness}%</span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      w.criticalGaps > 2 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {w.criticalGaps} gaps
                    </span>
                  </td>
                  <td className="py-3 text-slate-600 font-semibold">{w.learningProgress}%</td>
                  <td className="py-3 text-slate-400 font-mono text-[11px]">{w.lastAssessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drill-down Official Dossier Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {selected.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{selected.name}</h3>
                  <p className="text-xs text-slate-400">{selected.role} · {selected.department}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Competency Readiness</span>
                <span className="font-bold text-slate-900">{selected.readiness}%</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Critical Gaps Requiring Action</span>
                <span className="font-bold text-rose-600">{selected.criticalGaps}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Recorded Learning Completion</span>
                <span className="font-bold text-emerald-600">{selected.learningProgress}%</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">Last Baseline Evaluation</span>
                <span className="font-bold text-slate-700 font-mono">{selected.lastAssessment}</span>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="btn-primary w-full mt-6 py-2.5 text-xs font-bold"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

