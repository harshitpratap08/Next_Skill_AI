import React from 'react'
import { GapSeverity } from '@/types'

const severityStyles: Record<GapSeverity, { bg: string; dot: string }> = {
  Critical: { bg: 'bg-rose-50 text-rose-700 border-rose-200/80', dot: 'bg-rose-500' },
  High: { bg: 'bg-orange-50 text-orange-700 border-orange-200/80', dot: 'bg-orange-500' },
  Medium: { bg: 'bg-amber-50 text-amber-700 border-amber-200/80', dot: 'bg-amber-500' },
  Low: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', dot: 'bg-emerald-500' },
}

export function SeverityBadge({ severity }: { severity: GapSeverity }) {
  const s = severityStyles[severity] || severityStyles.Low
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border shadow-2xs ${s.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {severity}
    </span>
  )
}

export function Badge({
  children,
  tone = 'default',
}: {
  children: React.ReactNode
  tone?: 'default' | 'success' | 'warning' | 'info' | 'purple'
}) {
  const tones: Record<string, string> = {
    default: 'bg-slate-100/90 text-slate-700 border-slate-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    info: 'bg-brand-50 text-brand-700 border-brand-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide border shadow-2xs ${tones[tone]}`}>
      {children}
    </span>
  )
}

