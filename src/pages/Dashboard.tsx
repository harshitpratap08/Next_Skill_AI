import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { MetricCard } from '@/components/common/MetricCard'
import { CompetencyRadarChart } from '@/components/charts/CompetencyRadar'
import { SkillGapCard } from '@/components/gaps/SkillGapCard'
import { LearningPathTimeline, PathStep } from '@/components/learning/LearningPathTimeline'
import { trainingPrograms, courseCatalog } from '@/data/mockData'
import { Target, TrendingDown, BookOpenCheck, Award, ArrowRight, Sparkles, BookOpen, Compass, Calendar, CheckCircle2 } from 'lucide-react'
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
    <Layout title="Workforce Readiness Dashboard">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-white text-slate-900 p-6 sm:p-8 mb-8 border border-emerald-200/80 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-400/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {profile.role}
              </span>
              <span className="text-xs text-slate-500 font-medium">· {profile.department}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back, {profile.name.split(' ')[0]} 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Your official statistical competency readiness stands at <strong className="text-emerald-700 font-bold">{readiness}%</strong>. 
              {criticalCount > 0 ? ` You have ${criticalCount} priority competencies requiring targeted skilling.` : ' All competencies are within expected benchmarks.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/assessment"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50/60 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 hover:border-emerald-300 shadow-xs transition-all"
            >
              Baseline Assessment
            </Link>
            <Link
              to="/quiz"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Launch Quiz</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard
          label="Competency Readiness"
          value={`${readiness}%`}
          icon={Target}
          tone="indigo"
          sublabel="MoSPI Standard Target: 80%"
          trend={{ text: '+4% this month', positive: true }}
        />
        <MetricCard
          label="Critical Skill Gaps"
          value={`${criticalCount}`}
          icon={TrendingDown}
          tone="red"
          sublabel="High + Critical severity"
          trend={{ text: 'Requires Attention', positive: false }}
        />
        <MetricCard
          label="Learning Progress"
          value={`${learningProgress}%`}
          icon={BookOpenCheck}
          tone="emerald"
          sublabel="Modules & Materials studied"
          trend={{ text: '+12% completion', positive: true }}
        />
        <MetricCard
          label="Assessment Accuracy"
          value={`${avgAccuracy}%`}
          icon={Award}
          tone="amber"
          sublabel="Across all attempted quizzes"
          trend={{ text: 'Above Average', positive: true }}
        />
      </div>

      {/* Radar & Skill Gaps Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Radar Chart */}
        <div className="card p-6 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Competency Radar</h3>
                <p className="text-xs text-slate-400">Current vs Target benchmark</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                4 Domains
              </span>
            </div>
            <div className="w-full flex items-center justify-center py-2">
              <CompetencyRadarChart competencies={competencies} />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">View complete matrix</span>
            <Link to="/competency" className="font-bold text-brand-600 hover:text-brand-700">
              Details →
            </Link>
          </div>
        </div>

        {/* Top Skill Gaps */}
        <div className="card p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Priority Skill Gaps</h3>
                <p className="text-xs text-slate-400">Identified via official baseline evaluation</p>
              </div>
              <Link to="/skill-gaps" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                View All Gaps ({skillGaps.length}) →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillGaps.slice(0, 4).map((g) => (
                <SkillGapCard key={g.competencyId} gap={g} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Action & Upcoming Training */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Recommended Action */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Compass size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Recommended Skilling Pathway</h3>
              <p className="text-xs text-slate-400">AI-curated based on role and gap severity</p>
            </div>
          </div>

          {topGap ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-teal-50/40 border border-emerald-200/80 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white">
                    Primary Goal
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">{topGap.recommendedAction}</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">
                    Tailored to address your <strong className="text-rose-600 font-semibold">{topGap.severity}</strong> gap in <strong>{topGap.competencyName}</strong>. Builds on your background in {topGap.prerequisite}.
                  </p>
                </div>
                <Link
                  to="/learning-path"
                  className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
                >
                  <span>Start Module</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 mb-6">Complete your baseline assessment to unlock personalized recommendations.</p>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Continuous Learning Lifecycle</h4>
            <LearningPathTimeline steps={journeySteps} />
          </div>
        </div>

        {/* Upcoming Training Programs */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Ecosystem Courses</h3>
                <p className="text-[11px] text-slate-400">iGOT Karmayogi &amp; NSSTA Modules</p>
              </div>
              <Calendar size={18} className="text-slate-400" />
            </div>

            <div className="space-y-3">
              {upcoming.map((t) => (
                <div key={t.id} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {t.provider}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{t.mode}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-1 leading-snug">{t.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Duration: {t.duration}</p>
                </div>
              ))}
              {courseCatalog.slice(0, 1).map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {c.provider}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{c.duration}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-1 leading-snug">{c.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Self-paced Online</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-center">
            <Link to="/course-catalog" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
              Browse All Ecosystem Courses →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

