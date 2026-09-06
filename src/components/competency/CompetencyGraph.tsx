import React, { useState } from 'react'
import { Competency } from '@/types'
import { ArrowDown } from 'lucide-react'

const chain: { id: string; name: string }[] = [
  { id: 'c-survey-design', name: 'Survey Design' },
  { id: 'c-sampling', name: 'Sampling' },
  { id: 'c-data-collection', name: 'Data Collection' },
  { id: 'c-data-quality', name: 'Data Quality' },
  { id: 'c-official-stats', name: 'Official Statistics Analysis' },
]

export function CompetencyGraph({ competencies, onSelect }: { competencies: Competency[]; onSelect: (c: Competency) => void }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center py-4">
      {chain.map((node, idx) => {
        const comp = competencies.find((c) => c.id === node.id)
        const isActive = activeId === node.id
        return (
          <React.Fragment key={node.id}>
            <button
              onClick={() => {
                setActiveId(node.id)
                if (comp) onSelect(comp)
              }}
              className={`w-72 card px-4 py-3 text-left transition-all ${isActive ? 'border-indigo-400 shadow-md ring-2 ring-indigo-100' : 'hover:border-indigo-200'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-navy-900 text-sm">{node.name}</span>
                {comp && <span className="text-xs text-slate-400">{comp.current.toFixed(1)} / {comp.target.toFixed(1)}</span>}
              </div>
            </button>
            {idx < chain.length - 1 && <ArrowDown size={18} className="text-slate-300 my-1" />}
          </React.Fragment>
        )
      })}
    </div>
  )
}
