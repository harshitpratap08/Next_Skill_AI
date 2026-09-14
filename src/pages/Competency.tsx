import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { CompetencyCard } from '@/components/competency/CompetencyCard'
import { CompetencyGraph } from '@/components/competency/CompetencyGraph'
import { Modal } from '@/components/common/Modal'
import { Competency as CompetencyType, Domain } from '@/types'
import { ProgressBar } from '@/components/common/ProgressBar'
import { Search, Network, LayoutGrid, CheckCircle2, ShieldAlert } from 'lucide-react'

const domains: (Domain | 'All')[] = ['All', 'Statistical', 'Technical', 'Digital Governance', 'Behavioural / Managerial']

export function CompetencyPage() {
  const { competencies } = useApp()
  const [selected, setSelected] = useState<CompetencyType | null>(null)
  const [view, setView] = useState<'cards' | 'graph'>('cards')
  const [activeDomain, setActiveDomain] = useState<Domain | 'All'>('All')
  const [search, setSearch] = useState('')

  const filteredCompetencies = competencies.filter((c) => {
    const matchesDomain = activeDomain === 'All' || c.domain === activeDomain
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.domain.toLowerCase().includes(search.toLowerCase())
    return matchesDomain && matchesSearch
  })

  return (
    <Layout title="Competency Architecture">
      {/* Top Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Official Statistics Competency Framework</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            25 multidimensional competencies across 4 domains mapped to MoSPI roles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100/80 border border-slate-200 p-1 rounded-xl">
            <button
              onClick={() => setView('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                view === 'cards' ? 'bg-white shadow-xs text-brand-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setView('graph')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                view === 'graph' ? 'bg-white shadow-xs text-brand-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Network size={14} />
              <span>Dependency Chain</span>
            </button>
          </div>
        </div>
      </div>

      {view === 'cards' ? (
        <div className="space-y-6">
          {/* Domain Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setActiveDomain(domain)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    activeDomain === domain
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 w-full sm:w-60">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter competencies..."
                className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full"
              />
            </div>
          </div>

          {/* Competency Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompetencies.map((c) => (
              <CompetencyCard key={c.id} c={c} onClick={() => setSelected(c)} />
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-6 shadow-md">
          <div className="mb-4">
            <h3 className="font-bold text-slate-900 text-sm">Sequential Dependency Topology</h3>
            <p className="text-xs text-slate-500">Official survey lifecycle dependency chain: Survey Design → Sampling → Data Collection → Data Quality → Analysis</p>
          </div>
          <CompetencyGraph competencies={competencies} onSelect={setSelected} />
        </div>
      )}

      {/* Drill-down Modal */}
      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Domain</p>
                <p className="text-xs font-bold text-slate-800">{selected.domain}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Confidence</p>
                <p className="text-xs font-bold text-emerald-600">{selected.confidence}%</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Last Assessed</p>
                <p className="text-xs font-bold text-slate-700">{selected.lastAssessed}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-600">Current Level: <strong>{selected.current.toFixed(1)}</strong></span>
                <span className="text-slate-400">Target Benchmark: <strong>{selected.target.toFixed(1)}</strong></span>
              </div>
              <ProgressBar value={selected.current} max={5} />
            </div>

            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Prerequisites</p>
              <p className="text-xs text-slate-600">
                {selected.prerequisites.length
                  ? selected.prerequisites.map((id) => competencies.find((c) => c.id === id)?.name).join(', ')
                  : 'None — baseline foundational competency'}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Registered Evidence</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selected.evidence.map((e) => (
                  <span key={e} className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  )
}

