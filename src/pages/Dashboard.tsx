import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { MetricCard } from '@/components/common/MetricCard'
import { CompetencyRadarChart } from '@/components/charts/CompetencyRadar'
import { SkillGapCard } from '@/components/gaps/SkillGapCard'
import { LearningPathTimeline, PathStep } from '@/components/learning/LearningPathTimeline'
import { trainingPrograms, courseCatalog } from '@/data/mockData'
import { Target, TrendingDown, BookOpenCheck, Award, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { profile, skillGaps, quizHistory, assessmentHistory, materials, competencies } = useApp()
  if (!profile) return null

  const readiness = Math.round((skillGaps.reduce((s, g) => s + g.current, 0) / (skillGaps.length * 5 || 1)) * 100)
  const criticalCount = skillGaps.filter((g) => g.severity === 'Critical' || g.severity === 'High').length
  const learningProgress = Math.min(100, 20 + materials.length * 12 + quizHistory.length * 8)
  const avgAccuracy = quizHistory.length ? Math.round(quizHistory.reduce((s, q) => s + q.accuracy, 0) / quizHistory.length) : 81
  const topGap = skillGaps[0]
  const hasAssessment = assessmentHistory.length > 0

  const journeySteps: PathStep[] = [
    { title: 'Baseline Assessment', source: hasAssessment ? 'Completed' : 'Pending', duration: '', status: hasAssessment ? 'done' : 'active' },
    { title: 'Gap Identified', source: topGap?.competencyName ?? '—', duration: '', status: hasAssessment ? 'done' : 'upcoming' },
    { title: 'Course Recommended', source: 'iGOT / NSSTA', duration: '', status: hasAssessment ? 'active' : 'upcoming' },
    { title: 'Learning', source: `${materials.length} material(s) uploaded`, duration: '', status: materials.length ? 'done' : 'upcoming' },
    { title: 'Assessment', source: `${quizHistory.length} quiz(zes) taken`, duration: '', status: quizHistory.length ? 'done' : 'upcoming' },
    { title: 'Competency Updated', source: 'Illustrative', duration: '', status: quizHistory.length ? 'active' : 'upcoming' },
  ]

  const upcoming = trainingPrograms.filter((t) => t.status !== 'Closed').slice(0, 3)

  return (
    <Layout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-navy-900">Good morning, {profile.name.split(' ')[0]}</h2>
        <p className="text-sm text-slate-500">{profile.designation} · {profile.department}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Competency Readiness" value={`${readiness}%`} icon={Target} tone="indigo" sublabel="Prototype/demo value" />
        <MetricCard label="Critical Skill Gaps" value={`${criticalCount}`} icon={TrendingDown} tone="red" sublabel="High + Critical severity" />
        <MetricCard label="Learning Progress" value={`${learningProgress}%`} icon={BookOpenCheck} tone="emerald" sublabel="Prototype/demo value" />
        <MetricCard label="Assessment Accuracy" value={`${avgAccuracy}%`} icon={Award} tone="amber" sublabel="Across quiz history" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-5 lg:col-span-1">
          <h3 className="font-semibold text-navy-900 mb-3">Competency Radar</h3>
          <CompetencyRadarChart competencies={competencies} />
        </div>
        <div className="lg:col-span-2 card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Top Skill Gaps</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillGaps.slice(0, 4).map((g) => (
              <SkillGapCard key={g.competencyId} gap={g} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-semibold text-navy-900 mb-1">Recommended Next Action</h3>
          {topGap ? (
            <>
              <p className="text-indigo-700 font-medium mt-2">{topGap.recommendedAction}</p>
              <p className="text-sm text-slate-500 mt-1">
                Why: Your latest assessment evidence shows weakness in {topGap.competencyName.toLowerCase()} concepts.
              </p>
              <Link to="/learning-path" className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Start learning <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <p className="text-sm text-slate-400 mt-2">Complete your baseline assessment to unlock personalized recommendations.</p>
          )}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-sm font-semibold text-navy-900 mb-3">Learning Journey</h4>
            <LearningPathTimeline steps={journeySteps} />
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-3">Upcoming Training</h3>
          <p className="text-xs text-slate-400 mb-3">iGOT Karmayogi &amp; NSSTA/TPAC — Prototype Connector</p>
          <div className="space-y-3">
            {upcoming.map((t) => (
              <div key={t.id} className="text-sm border border-slate-100 rounded-lg p-3">
                <p className="font-medium text-navy-900">{t.title}</p>
                <p className="text-xs text-slate-400">{t.provider} · {t.duration} · {t.mode}</p>
              </div>
            ))}
            {courseCatalog.slice(0, 1).map((c) => (
              <div key={c.id} className="text-sm border border-slate-100 rounded-lg p-3">
                <p className="font-medium text-navy-900">{c.title}</p>
                <p className="text-xs text-slate-400">{c.provider} · {c.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
