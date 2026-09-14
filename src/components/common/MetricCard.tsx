import React from 'react'
import { LucideIcon } from 'lucide-react'

export function MetricCard({
  label, value, icon: Icon, tone = 'indigo', sublabel, trend,
}: {
  label: string
  value: string
  icon: LucideIcon
  tone?: 'indigo' | 'emerald' | 'amber' | 'red' | 'purple'
  sublabel?: string
  trend?: { text: string; positive: boolean }
}) {
  const toneStyles = {
    indigo: {
      iconBg: 'bg-gradient-to-tr from-brand-500 to-indigo-600 text-white shadow-glow-indigo',
      badge: 'bg-brand-50 text-brand-700 border-brand-200/60',
      borderHover: 'hover:border-brand-300',
    },
    emerald: {
      iconBg: 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-glow-emerald',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      borderHover: 'hover:border-emerald-300',
    },
    amber: {
      iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-glow-amber',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/60',
      borderHover: 'hover:border-amber-300',
    },
    red: {
      iconBg: 'bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-sm',
      badge: 'bg-rose-50 text-rose-700 border-rose-200/60',
      borderHover: 'hover:border-rose-300',
    },
    purple: {
      iconBg: 'bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-sm',
      badge: 'bg-purple-50 text-purple-700 border-purple-200/60',
      borderHover: 'hover:border-purple-300',
    },
  }

  const currentTone = toneStyles[tone] || toneStyles.indigo

  return (
    <div className={`card p-5 group ${currentTone.borderHover} transition-all duration-200 hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
            {trend && (
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${trend.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {trend.positive ? '↑' : '↓'} {trend.text}
              </span>
            )}
          </div>
          {sublabel && <p className="text-[11px] text-slate-400 mt-1 font-medium">{sublabel}</p>}
        </div>
        <div className={`p-3 rounded-2xl ${currentTone.iconBg} transform group-hover:scale-105 transition-transform duration-200`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

