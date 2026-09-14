import React from 'react'

export function ProgressBar({
  value,
  max = 5,
  colorClass,
}: {
  value: number
  max?: number
  colorClass?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const fill = colorClass || 'bg-gradient-to-r from-brand-600 to-indigo-500'
  return (
    <div className="w-full h-2.5 bg-slate-100/90 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
      <div
        className={`h-full ${fill} rounded-full transition-all duration-700 shadow-xs`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function CompetencyRing({
  value,
  max = 5,
  size = 64,
}: {
  value: number
  max?: number
  size?: number
}) {
  const pct = Math.min(1, value / max)
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct)
  const color = pct >= 0.8 ? '#10b981' : pct >= 0.55 ? '#6366f1' : pct >= 0.35 ? '#f59e0b' : '#f43f5e'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xs">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e2e8f0" strokeWidth="5.5" fill="none" opacity={0.6} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth="5.5"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontSize={size * 0.26}
        fontWeight={800}
        fill="#0f172a"
        className="font-mono tracking-tight"
      >
        {value.toFixed(1)}
      </text>
    </svg>
  )
}

