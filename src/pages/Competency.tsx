import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { CompetencyCard } from '@/components/competency/CompetencyCard'
import { CompetencyGraph } from '@/components/competency/CompetencyGraph'
import { Modal } from '@/components/common/Modal'
import { Competency as CompetencyType, Domain } from '@/types'
import { ProgressBar } from '@/components/common/ProgressBar'

const domains: Domain[] = ['Statistical', 'Technical', 'Digital Governance', 'Behavioural / Managerial']

export function CompetencyPage() {
  const { competencies } = useApp()
  const [selected, setSelected] = useState<CompetencyType | null>(null)
  const [view, setView] = useState<'cards' | 'graph'>('cards')

  return (
    <Layout title="Competencies">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">Four competency domains tracked with evidence-based current vs target levels.</p>
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button onClick={() => setView('cards')} className={`px-3 py-1.5 text-sm rounded-md ${view === 'cards' ? 'bg-white shadow-sm font-medium' : 'text-slate-500'}`}>Cards</button>
          <button onClick={() => setView('graph')} className={`px-3 py-1.5 text-sm rounded-md ${view === 'graph' ? 'bg-white shadow-sm font-medium' : 'text-slate-500'}`}>Dependency Graph</button>
        </div>
      </div>

      {view === 'cards' ? (
        domains.map((domain) => (
          <div key={domain} className="mb-6">
            <h3 className="font-semibold text-navy-900 mb-3">{domain}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {competencies.filter((c) => c.domain === domain).map((c) => (
                <CompetencyCard key={c.id} c={c} onClick={() => setSelected(c)} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="card p-6">
          <p className="text-sm text-slate-500 mb-2">Core Statistical competency dependency chain. Click a node to view details.</p>
          <CompetencyGraph competencies={competencies} onSelect={setSelected} />
        </div>
      )}

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Current</span><span className="font-medium">{selected.current.toFixed(1)} / 5</span>
            </div>
            <ProgressBar value={selected.current} />
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Target</span><span className="font-medium">{selected.target.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Confidence</span><span className="font-medium">{selected.confidence}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Last assessed</span><span className="font-medium">{selected.lastAssessed}</span>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500 mb-1">Prerequisites</p>
              <p className="text-sm text-slate-600">
                {selected.prerequisites.length ? selected.prerequisites.map((id) => competencies.find((c) => c.id === id)?.name).join(', ') : 'None'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Evidence</p>
              <p className="text-sm text-slate-600">{selected.evidence.join(', ')}</p>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  )
}
