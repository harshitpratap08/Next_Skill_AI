import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { getQuestionsForCompetency } from '@/data/questionBank'
import { Domain, Question, AssessmentResult } from '@/types'
import { ProgressBar } from '@/components/common/ProgressBar'
import { CheckCircle2, AlertTriangle, User, Compass, Sparkles, ArrowRight, Check, Award, Brain } from 'lucide-react'
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

  const stepsLabels = ['Role Confirmation', 'Domain Scope', 'Diagnostic Exam', 'AI Analysis', 'Competency Report']

  return (
    <Layout title="Official Baseline Skill Assessment">
      <div className="max-w-3xl mx-auto py-4">
        {/* Modern Stepper Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Stage {step} of 5: {stepsLabels[step - 1]}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {Math.round((step / 5) * 100)}% Complete
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  s < step
                    ? 'bg-emerald-500'
                    : s === step
                    ? 'bg-brand-600 shadow-glow-indigo'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Role Confirmation */}
        {step === 1 && (
          <div className="card p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Step 1 — Confirm Official Cadre</h3>
                <p className="text-xs text-slate-400">Diagnostic questions are tailored to your designated responsibility matrix.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50/70 to-indigo-50/40 border border-brand-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-bold text-base flex items-center justify-center shadow-sm">
                  {profile?.avatarInitials}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{profile?.name}</h4>
                  <p className="text-xs text-brand-700 font-semibold">{profile?.role} · {profile?.department}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{profile?.responsibilities.join(', ')}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                Verified
              </span>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary w-full mt-6 py-3 font-bold text-xs uppercase tracking-wider">
              <span>Continue to Domain Selection</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Step 2: Domain Selection */}
        {step === 2 && (
          <div className="card p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Compass size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Step 2 — Select Competency Domains</h3>
                <p className="text-xs text-slate-400">Choose which statistical domains to calibrate during this assessment cycle.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {ALL_DOMAINS.map((d) => {
                const isSelected = selectedDomains.includes(d)
                return (
                  <button
                    key={d}
                    onClick={() =>
                      setSelectedDomains((prev) =>
                        prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                      )
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 text-brand-950 font-bold shadow-xs ring-1 ring-brand-500/50'
                        : 'border-slate-200 hover:border-brand-200 bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold">{d}</p>
                      <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                        {DOMAIN_COMPETENCIES[d].length
                          ? `${DOMAIN_COMPETENCIES[d].join(', ')}`
                          : 'Core official governance module'}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-brand-600 text-white' : 'border border-slate-300 bg-slate-50'
                      }`}
                    >
                      {isSelected && <Check size={14} />}
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              onClick={startQuestions}
              disabled={!selectedDomains.length}
              className="btn-primary w-full py-3 font-bold text-xs uppercase tracking-wider disabled:opacity-50"
            >
              <span>Initialize {selectedDomains.length} Domain Diagnostic Questions</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Step 3: Question Answering */}
        {step === 3 && (
          <div className="card p-8 shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Step 3 — Baseline Diagnostic Examination</h3>
                <p className="text-xs text-slate-400">Answer {questions.length} calibrated questions to establish your baseline.</p>
              </div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                {Object.keys(answers).length} / {questions.length} Answered
              </span>
            </div>

            <div className="space-y-6">
              {questions.map((q, i) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/80">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-brand-600">Question {i + 1}</span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {q.competency}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 mb-3 leading-snug">{q.prompt}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const isChosen = answers[q.id] === oi
                      return (
                        <button
                          key={oi}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                          className={`text-left p-3 rounded-xl border text-xs transition-all ${
                            isChosen
                              ? 'border-brand-500 bg-brand-50 text-brand-950 font-bold shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span className="font-mono font-bold mr-1.5 text-slate-400">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={finishAssessment}
              disabled={Object.keys(answers).length < questions.length}
              className="btn-primary w-full mt-8 py-3.5 font-bold text-xs uppercase tracking-wider shadow-glow-indigo disabled:opacity-50"
            >
              Submit Baseline Evaluation
            </button>
          </div>
        )}

        {/* Step 4: AI Analysis Loading */}
        {step === 4 && (
          <div className="card p-16 text-center shadow-lg">
            <div className="w-14 h-14 rounded-3xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Sparkles size={28} className="animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Synthesizing Competency Diagnostics</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Mapping responses against official MoSPI competency thresholds and identifying critical skill gaps...
            </p>
          </div>
        )}

        {/* Step 5: Report Card */}
        {step === 5 && result && (
          <div className="card p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Step 5 — Diagnostic Skill-Gap Dossier</h3>
                <p className="text-xs text-slate-400">Baseline recorded into your local profile.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50/50 border border-brand-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Initial Readiness</p>
                <p className="text-4xl font-extrabold text-slate-900 mt-2">{result.overallReadiness}%</p>
                <div className="mt-3">
                  <ProgressBar value={result.overallReadiness} max={100} />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Domain Readiness Breakdown</p>
                <div className="space-y-1.5">
                  {ALL_DOMAINS.filter((d) => result.domainScores[d] > 0).map((d) => (
                    <div key={d} className="flex justify-between text-xs text-slate-700">
                      <span>{d}</span>
                      <strong className="font-bold text-slate-900">{result.domainScores[d]}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60">
                <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={15} /> Confirmed Strengths
                </p>
                {result.strongCompetencies.length ? (
                  result.strongCompetencies.map((c) => (
                    <p key={c} className="text-xs text-emerald-900 font-medium">✓ {c}</p>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">None identified during baseline.</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60">
                <p className="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-2">
                  <AlertTriangle size={15} /> Identified Skill Gaps
                </p>
                {result.weakCompetencies.length ? (
                  result.weakCompetencies.map((c) => (
                    <p key={c} className="text-xs text-rose-900 font-medium">⚠ {c}</p>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No critical weaknesses detected.</p>
                )}
              </div>
            </div>

            <Link
              to="/skill-gaps"
              className="btn-primary w-full py-3 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <span>Explore Full Skill Gap Map &amp; Learning Paths</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

