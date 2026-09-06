import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { getQuestionsForCompetency } from '@/data/questionBank'
import { Domain, Question, AssessmentResult } from '@/types'
import { ProgressBar } from '@/components/common/ProgressBar'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

const ALL_DOMAINS: Domain[] = ['Statistical', 'Technical', 'Digital Governance', 'Behavioural / Managerial']
const DOMAIN_COMPETENCIES: Record<Domain, string[]> = {
  Statistical: ['Sampling', 'Survey Design', 'Data Quality Frameworks'],
  Technical: ['Python', 'Data Visualization'],
  'Digital Governance': [],
  'Behavioural / Managerial': [],
}

export function Assessment() {
  const { profile, submitAssessment } = useApp()
  const [step, setStep] = useState(1)
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>(['Statistical'])
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)

  const startQuestions = () => {
    const comps = selectedDomains.flatMap((d: Domain) => DOMAIN_COMPETENCIES[d])
    const qs = comps.flatMap((c) => getQuestionsForCompetency(c, 3, 'Medium'))
    setQuestions(qs.length ? qs : getQuestionsForCompetency('Sampling', 6, 'Medium'))
    setStep(3)
  }

  const finishAssessment = () => {
    setStep(4)
    setTimeout(() => {
      let correct = 0
      const weak: string[] = []
      const strong: string[] = []
      questions.forEach((q) => {
        if (answers[q.id] === q.correctIndex) {
          correct++
          if (!strong.includes(q.competency)) strong.push(q.competency)
        } else if (!weak.includes(q.competency)) {
          weak.push(q.competency)
        }
      })
      const overall = questions.length ? Math.round((correct / questions.length) * 100) : 0
      const domainScores = ALL_DOMAINS.reduce((acc, d) => {
        acc[d] = selectedDomains.includes(d) ? Math.round(50 + Math.random() * 40) : 0
        return acc
      }, {} as Record<Domain, number>)
      const r: AssessmentResult = {
        id: `a-${Date.now()}`,
        date: new Date().toISOString(),
        overallReadiness: overall,
        domainScores,
        strongCompetencies: strong,
        weakCompetencies: weak,
        criticalGaps: weak,
      }
      setResult(r)
      submitAssessment(r)
      setStep(5)
    }, 1400)
  }

  return (
    <Layout title="Baseline Assessment">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="card p-6">
            <h2 className="font-semibold text-navy-900 mb-1">Step 1 — Select your role</h2>
            <p className="text-sm text-slate-500 mb-4">Confirmed from your profile.</p>
            <div className="card p-4 border-indigo-200 bg-indigo-50/50">
              <p className="font-medium text-navy-900">{profile?.role}</p>
              <p className="text-sm text-slate-500">{profile?.department}</p>
            </div>
            <button onClick={() => setStep(2)} className="btn-primary mt-5">Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="card p-6">
            <h2 className="font-semibold text-navy-900 mb-1">Step 2 — Select competency domains</h2>
            <p className="text-sm text-slate-500 mb-4">Choose which domains to include in this baseline assessment.</p>
            <div className="grid grid-cols-2 gap-3">
              {ALL_DOMAINS.map((d) => (
                <button
                  key={d}
                  onClick={() =>
                    setSelectedDomains((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]))
                  }
                  className={`p-3 rounded-lg border text-sm text-left ${
                    selectedDomains.includes(d) ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <button onClick={startQuestions} disabled={!selectedDomains.length} className="btn-primary mt-5 disabled:opacity-50">
              Continue to questions
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="card p-6">
            <h2 className="font-semibold text-navy-900 mb-1">Step 3 — Answer questions</h2>
            <p className="text-sm text-slate-500 mb-5">{questions.length} original demo questions across your selected domains.</p>
            <div className="space-y-5">
              {questions.map((q, i) => (
                <div key={q.id}>
                  <p className="text-sm font-medium text-navy-900 mb-2">{i + 1}. {q.prompt}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                        className={`text-left px-3 py-2 rounded-lg border text-sm ${
                          answers[q.id] === oi ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-indigo-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={finishAssessment} disabled={Object.keys(answers).length < questions.length} className="btn-primary mt-6 disabled:opacity-50">
              Submit Assessment
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="card p-10 text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-medium text-navy-900">Running AI competency analysis…</p>
            <p className="text-sm text-slate-400">Prototype AI Quality Check in progress</p>
          </div>
        )}

        {step === 5 && result && (
          <div className="card p-6">
            <h2 className="font-semibold text-navy-900 mb-1">Step 5 — Skill-gap report</h2>
            <p className="text-xs text-slate-400 mb-5">Illustrative prototype scoring, not an official measurement.</p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="card p-4 bg-indigo-50/50 border-indigo-100">
                <p className="text-xs text-slate-500">Overall Readiness</p>
                <p className="text-2xl font-bold text-navy-900">{result.overallReadiness}%</p>
                <ProgressBar value={result.overallReadiness} max={100} />
              </div>
              <div className="card p-4">
                <p className="text-xs text-slate-500 mb-2">Domain-wise Scores</p>
                {ALL_DOMAINS.filter((d) => result.domainScores[d] > 0).map((d) => (
                  <div key={d} className="flex justify-between text-sm text-slate-600">
                    <span>{d}</span><span className="font-medium">{result.domainScores[d]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-navy-900 flex items-center gap-1.5 mb-2"><CheckCircle2 size={15} className="text-emerald-500" /> Strong competencies</p>
                {result.strongCompetencies.length ? result.strongCompetencies.map((c) => <p key={c} className="text-sm text-slate-600">{c}</p>) : <p className="text-sm text-slate-400">None identified yet.</p>}
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900 flex items-center gap-1.5 mb-2"><AlertTriangle size={15} className="text-amber-500" /> Weak competencies / critical gaps</p>
                {result.weakCompetencies.length ? result.weakCompetencies.map((c) => <p key={c} className="text-sm text-slate-600">{c}</p>) : <p className="text-sm text-slate-400">None identified.</p>}
              </div>
            </div>
            <Link to="/skill-gaps" className="btn-primary inline-block mt-6">View full Skill Gap Map</Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
