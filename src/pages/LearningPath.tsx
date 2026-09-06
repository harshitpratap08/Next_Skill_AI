import React, { useMemo } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { aiService } from '@/services/aiService'
import { RecommendationCard } from '@/components/learning/RecommendationCard'
import { LearningPathTimeline, PathStep } from '@/components/learning/LearningPathTimeline'

export function LearningPath() {
  const { skillGaps, completedCourseIds, enrollCourse, assessmentHistory, materials, quizHistory } = useApp()
  const recommendations = useMemo(() => aiService.generateRecommendations(skillGaps, completedCourseIds), [skillGaps, completedCourseIds])

  const steps: PathStep[] = [
    { title: 'START', source: 'Profile initialized', duration: '', status: 'done' },
    { title: 'Baseline Assessment', source: 'iGOT Karmayogi', duration: '', status: assessmentHistory.length ? 'done' : 'active' },
    { title: skillGaps[0]?.recommendedAction ?? 'Sampling Fundamentals', source: 'iGOT Karmayogi', duration: '4 hrs', status: completedCourseIds.length ? 'done' : assessmentHistory.length ? 'active' : 'upcoming' },
    { title: 'Survey Design', source: 'iGOT Karmayogi', duration: '3 hrs', status: 'upcoming' },
    { title: 'Data Quality', source: 'NSSTA', duration: '3 days', status: 'upcoming' },
    { title: 'Advanced Statistical Analysis', source: 'TPAC Training', duration: '5 days', status: 'upcoming' },
    { title: 'Assessment', source: 'Adaptive Quiz', duration: '', status: quizHistory.length ? 'done' : 'upcoming' },
    { title: 'Competency Update', source: 'Illustrative evidence-based update', duration: '', status: quizHistory.length ? 'done' : 'upcoming' },
  ]

  return (
    <Layout title="Learning Path">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Your Path</h3>
          <LearningPathTimeline steps={steps} />
          <p className="text-xs text-slate-400 mt-2">Materials uploaded so far: {materials.length}</p>
        </div>
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-navy-900 mb-1">Explainable Recommendations</h3>
          <p className="text-xs text-slate-400 mb-4">Prototype Recommendation Framework — role relevance, gap severity, prerequisite fit, learning history and assessment evidence.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} enrolled={completedCourseIds.includes(rec.id.replace('rec-', ''))} onEnroll={() => enrollCourse(rec.id.replace('rec-', ''))} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
