import React, { useMemo, useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { MetricCard } from '@/components/common/MetricCard'
import { WorkforceHeatmap } from '@/components/charts/WorkforceHeatmap'
import { generateWorkforce, generateHeatmap, heatmapCompetencies, emergingSkills } from '@/data/mockData'
import { Users, Target, AlertTriangle, Award, Search } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#dc2626', '#d97706', '#4f46e5', '#059669']

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
    { name: 'Critical', value: workforce.filter((w) => w.criticalGaps >= 4).length },
    { name: 'High', value: workforce.filter((w) => w.criticalGaps === 3).length },
    { name: 'Medium', value: workforce.filter((w) => w.criticalGaps <= 2 && w.criticalGaps > 0).length },
    { name: 'Low', value: workforce.filter((w) => w.criticalGaps === 0).length },
  ]

  const departments: string[] = ['All', ...Array.from(new Set<string>(workforce.map((w) => w.department)))]
  const filtered = workforce.filter(
    (w) => (deptFilter === 'All' || w.department === deptFilter) && w.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Layout title="Admin Analytics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total Officials" value={`${workforce.length}`} icon={Users} tone="indigo" sublabel="Demo workforce sample" />
        <MetricCard label="Avg Competency Readiness" value={`${avgReadiness}%`} icon={Target} tone="emerald" />
        <MetricCard label="Total Critical Gaps" value={`${totalCritical}`} icon={AlertTriangle} tone="red" />
        <MetricCard label="Avg Learning Progress" value={`${avgProgress}%`} icon={Award} tone="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-semibold text-navy-900 mb-1">Workforce Competency Heatmap</h3>
          <p className="text-xs text-slate-400 mb-4">Prototype foresight view — readiness scores by department and competency</p>
          <WorkforceHeatmap competencyLabels={heatmapCompetencies} matrix={heatmap} />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-3">Skill Gap Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={gapDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75}>
                {gapDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-3">Emerging Skill Readiness</h3>
          <p className="text-xs text-slate-400 mb-3">Prototype foresight view — not an official prediction</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={emergingSkills} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
              <Tooltip />
              <Bar dataKey="currentReadiness" name="Current Readiness" fill="#c7d2fe" radius={[0, 4, 4, 0]} />
              <Bar dataKey="futureRelevance" name="Future Relevance" fill="#4f46e5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-3">Department Comparison — Avg Readiness</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={departments.slice(1).map((d: string) => ({
                name: d.split(' ')[0],
                readiness: Math.round(workforce.filter((w) => w.department === d).reduce((s, w) => s + w.readiness, 0) / (workforce.filter((w) => w.department === d).length || 1)),
              }))}
            >
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="readiness" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="font-semibold text-navy-900">Workforce Directory</h3>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search employee…" className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm" />
            </div>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm">
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2">Employee</th><th className="pb-2">Role</th><th className="pb-2">Department</th>
                <th className="pb-2">Readiness</th><th className="pb-2">Critical Gaps</th><th className="pb-2">Progress</th><th className="pb-2">Last Assessment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 15).map((w) => (
                <tr key={w.id} onClick={() => setSelected(w)} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                  <td className="py-2 font-medium text-navy-900">{w.name}</td>
                  <td className="py-2 text-slate-600">{w.role}</td>
                  <td className="py-2 text-slate-600">{w.department}</td>
                  <td className="py-2 text-slate-600">{w.readiness}%</td>
                  <td className="py-2 text-slate-600">{w.criticalGaps}</td>
                  <td className="py-2 text-slate-600">{w.learningProgress}%</td>
                  <td className="py-2 text-slate-600">{w.lastAssessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-navy-900 mb-1">{selected.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{selected.role} · {selected.department}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Readiness</span><span className="font-medium">{selected.readiness}%</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Critical Gaps</span><span className="font-medium">{selected.criticalGaps}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Learning Progress</span><span className="font-medium">{selected.learningProgress}%</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Last Assessment</span><span className="font-medium">{selected.lastAssessment}</span></div>
            </div>
            <button onClick={() => setSelected(null)} className="btn-secondary w-full mt-4">Close</button>
          </div>
        </div>
      )}
    </Layout>
  )
}
