import React from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { Competency, Domain } from '@/types'

export function CompetencyRadarChart({ competencies }: { competencies: Competency[] }) {
  const domains: Domain[] = ['Statistical', 'Technical', 'Digital Governance', 'Behavioural / Managerial']
  const data = domains.map((domain) => {
    const items = competencies.filter((c) => c.domain === domain)
    const avgCurrent = items.reduce((s, c) => s + c.current, 0) / (items.length || 1)
    const avgTarget = items.reduce((s, c) => s + c.target, 0) / (items.length || 1)
    return { domain: domain.replace(' / Managerial', ''), Current: Math.round(avgCurrent * 10) / 10, Target: Math.round(avgTarget * 10) / 10 }
  })
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12, fill: '#475569' }} />
        <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />
        <Radar name="Current" dataKey="Current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.35} />
        <Radar name="Target" dataKey="Target" stroke="#059669" fill="#059669" fillOpacity={0.12} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}
