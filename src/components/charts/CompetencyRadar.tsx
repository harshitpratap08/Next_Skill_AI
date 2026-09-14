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
        <Radar name="Current" dataKey="Current" stroke="#059669" fill="#10b981" fillOpacity={0.4} />
        <Radar name="Target Benchmark" dataKey="Target" stroke="#0d9488" fill="#14b8a6" fillOpacity={0.15} />
        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
