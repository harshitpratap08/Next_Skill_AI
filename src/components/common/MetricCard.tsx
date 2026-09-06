import React from 'react'
import { LucideIcon } from 'lucide-react'

export function MetricCard({
  label, value, icon: Icon, tone = 'indigo', sublabel,
}: {
  label: string
  value: string
  icon: LucideIcon
  tone?: 'indigo' | 'emerald' | 'amber' | 'red'
  sublabel?: string
}) {
  const tones: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  }
  return (
    <div className="card p-5 fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-navy-900 mt-1">{value}</p>
          {sublabel && <p className="text-xs text-slate-400 mt-1">{sublabel}</p>}
        </div>
        <div className={`p-2.5 rounded-lg ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}
