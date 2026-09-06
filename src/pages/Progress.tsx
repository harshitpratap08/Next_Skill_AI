import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { MetricCard } from '@/components/common/MetricCard'
import { Clock, BookOpenCheck, Target, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export function ProgressPage() {
  const { quizHistory, materials, completedCourseIds, competencies } = useApp()

  const learningHours = (materials.length * 3 + completedCourseIds.length * 4).toString()
  const avgAccuracy = quizHistory.length ? Math.round(quizHistory.reduce((s, q) => s + q.accuracy, 0) / quizHistory.length) : 0
  const gapReduction = Math.round(competencies.reduce((s, c) => s + Math.max(0, c.current - 2), 0) / (competencies.length || 1) * 10)

  const activityData = quizHistory
    .slice()
    .reverse()
    .map((q, i) => ({ name: `Quiz ${i + 1}`, accuracy: q.accuracy }))

  const competencyTrend = competencies.slice(0, 8).map((c) => ({ name: c.name.slice(0, 10), current: c.current, target: c.target }))

  return (
    <Layout title="Progress">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Learning Hours" value={learningHours} icon={Clock} tone="indigo" sublabel="Demo estimate" />
        <MetricCard label="Courses Enrolled" value={`${completedCourseIds.length}`} icon={BookOpenCheck} tone="emerald" />
        <MetricCard label="Quiz Accuracy" value={`${avgAccuracy}%`} icon={Target} tone="amber" sublabel={`${quizHistory.length} quiz(zes) taken`} />
        <MetricCard label="Gap Reduction" value={`${gapReduction}%`} icon={TrendingUp} tone="indigo" sublabel="Since baseline (illustrative)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-3">Assessment Performance Over Time</h3>
          {activityData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={activityData}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-slate-400">Take a quiz to see performance trends.</p>
          )}
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-3">Competency Progress (Current vs Target)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={competencyTrend}>
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="current" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  )
}
