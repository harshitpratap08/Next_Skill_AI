import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { MetricCard } from '@/components/common/MetricCard'
import { Clock, BookOpenCheck, Target, TrendingUp, Sparkles, Award } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

export function ProgressPage() {
  const { quizHistory, materials, completedCourseIds, competencies } = useApp()

  const learningHours = (materials.length * 3 + completedCourseIds.length * 4).toString()
  const avgAccuracy = quizHistory.length ? Math.round(quizHistory.reduce((s, q) => s + q.accuracy, 0) / quizHistory.length) : 0
  const gapReduction = Math.round(
    (competencies.reduce((s, c) => s + Math.max(0, c.current - 2), 0) / (competencies.length || 1)) * 10
  )

  const activityData = quizHistory
    .slice()
    .reverse()
    .map((q, i) => ({ name: `Quiz ${i + 1}`, accuracy: q.accuracy }))

  const competencyTrend = competencies.slice(0, 8).map((c) => ({
    name: c.name.length > 12 ? `${c.name.slice(0, 11)}...` : c.name,
    Current: c.current,
    Target: c.target,
  }))

  return (
    <Layout title="Learning &amp; Accuracy Growth">
      {/* 4 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard
          label="Learning Hours"
          value={`${learningHours}h`}
          icon={Clock}
          tone="indigo"
          sublabel="Modules + Uploaded materials"
          trend={{ text: '+6h recently', positive: true }}
        />
        <MetricCard
          label="Courses Enrolled"
          value={`${completedCourseIds.length}`}
          icon={BookOpenCheck}
          tone="emerald"
          sublabel="Active learning tracks"
          trend={{ text: 'On Track', positive: true }}
        />
        <MetricCard
          label="Average Accuracy"
          value={`${avgAccuracy}%`}
          icon={Target}
          tone="amber"
          sublabel={`${quizHistory.length} quiz(zes) completed`}
          trend={{ text: 'Calibrated', positive: true }}
        />
        <MetricCard
          label="Total Gap Reduction"
          value={`${gapReduction}%`}
          icon={TrendingUp}
          tone="purple"
          sublabel="Measured from baseline"
          trend={{ text: 'Target: 30%', positive: true }}
        />
      </div>

      {/* 2 Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Line/Area Chart */}
        <div className="card p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Assessment Accuracy Trajectory</h3>
              <p className="text-xs text-slate-400">Score percentage progression across quiz attempts</p>
            </div>
            <Award size={18} className="text-brand-600" />
          </div>

          {activityData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#accuracyGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-6">
              <Sparkles size={24} className="text-slate-300 mb-2" />
              <p className="font-semibold text-slate-600">No Assessment History Yet</p>
              <p className="mt-1">Complete an MCQ quiz to plot your personal accuracy curve.</p>
            </div>
          )}
        </div>

        {/* Competency Current vs Target Chart */}
        <div className="card p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Core Competencies: Current vs Target</h3>
              <p className="text-xs text-slate-400">Benchmarked against MoSPI cadre standards</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={competencyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={40} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="Current" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Target" fill="#a7f3d0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  )
}

