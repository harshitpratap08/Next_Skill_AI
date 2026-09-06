import React from 'react'
import { GapSeverity } from '@/types'

const severityStyles: Record<GapSeverity, string> = {
  Critical: 'bg-red-100 text-red-700 border border-red-200',
  High: 'bg-orange-100 text-orange-700 border border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
}

export function SeverityBadge({ severity }: { severity: GapSeverity }) {
  return <span className={`chip ${severityStyles[severity]}`}>{severity}</span>
}

export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'success' | 'warning' | 'info' }) {
  const tones: Record<string, string> = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    info: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
  }
  return <span className={`chip ${tones[tone]}`}>{children}</span>
}
