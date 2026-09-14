import React, { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Question, QuizResult } from '@/types'
import { aiService } from '@/services/aiService'
import { useApp } from '@/context/AppContext'
import { competencies as baseCompetencies } from '@/data/mockData'
import { CheckCircle2, AlertTriangle, Flag, ArrowLeft, ArrowRight, Award, Sparkles, RefreshCw, BarChart2 } from 'lucide-react'

type Phase = 'active' | 'results' | 'remediation-active' | 'remediation-results'

export function QuizRunner() {
  const location = useLocation() as { state?: { questions: Question[]; competency: string } }
  const navigate = useNavigate()
  const { addQuizResult } = useApp()

  const initialQuestions = location.state?.questions ?? aiService.generateMCQs('Sampling', 10, 'Medium')
  const competency = location.state?.competency ?? 'Sampling'

  const [questions] = useState<Question[]>(initialQuestions)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [phase, setPhase] = useState<Phase>('active')
  const [result, setResult] = useState<QuizResult | null>(null)

  const [remediationQuestions, setRemediationQuestions] = useState<Question[]>([])
  const [remCurrent, setRemCurrent] = useState(0)
  const [remAnswers, setRemAnswers] = useState<Record<string, number>>({})
  const [remResult, setRemResult] = useState<QuizResult | null>(null)

  const competencyId = useMemo(() => baseCompetencies.find((c) => c.name === competency)?.id, [competency])

  const submitQuiz = () => {
    const answerArray = questions.map((q) => answers[q.id] ?? -1)
    const r = aiService.analyzeQuiz(questions, answerArray)
    setResult(r)
    addQuizResult(r, competencyId)
    setPhase('results')
  }

  const startRemediation = () => {
    const rq = aiService.generateRemediation(result?.weakConcepts ?? [], competency)
    setRemediationQuestions(rq)
    setRemCurrent(0)
    setRemAnswers({})
    setPhase('remediation-active')
  }

  const submitRemediation = () => {
    const answerArray = remediationQuestions.map((q) => remAnswers[q.id] ?? -1)
    const r = aiService.analyzeQuiz(remediationQuestions, answerArray)
    setRemResult(r)
    addQuizResult(r, competencyId)
    setPhase('remediation-results')
  }

  if (phase === 'active' || phase === 'remediation-active') {
    const qs = phase === 'active' ? questions : remediationQuestions
    const idx = phase === 'active' ? current : remCurrent
    const setIdx = phase === 'active' ? setCurrent : setRemCurrent
    const ans = phase === 'active' ? answers : remAnswers
    const setAns = phase === 'active' ? setAnswers : setRemAnswers
    const q = qs[idx]
    if (!q) return null

    const isAnswered = ans[q.id] !== undefined

    return (
      <Layout title={phase === 'active' ? `${competency} Assessment` : `Remediation Quiz: ${competency}`}>
        <div className="max-w-3xl mx-auto py-4">
          {/* Progress & Header */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                Live Assessment Session
              </span>
              <span>{Object.keys(ans).length} of {qs.length} Answered</span>
            </div>
            
            <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${((idx + 1) / qs.length) * 100}%` }}
              />
            </div>

            {/* Question jump pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {qs.map((item, i) => {
                const itemAnswered = ans[item.id] !== undefined
                const isFlagged = flagged.has(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => setIdx(i)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-all flex items-center justify-center ${
                      idx === i
                        ? 'bg-brand-600 text-white shadow-xs scale-105'
                        : isFlagged
                        ? 'bg-amber-100 text-amber-700 border border-amber-300'
                        : itemAnswered
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
          </div>

          <QuestionCard
            question={q}
            index={idx}
            total={qs.length}
            selected={ans[q.id] ?? null}
            onSelect={(i) => setAns({ ...ans, [q.id]: i })}
          />

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setIdx(Math.max(0, idx - 1))}
              disabled={idx === 0}
              className="btn-secondary px-4 py-2.5 disabled:opacity-40"
            >
              <ArrowLeft size={15} />
              Previous
            </button>

            <button
              onClick={() =>
                setFlagged((prev) => {
                  const s = new Set(prev)
                  s.has(q.id) ? s.delete(q.id) : s.add(q.id)
                  return s
                })
              }
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                flagged.has(q.id)
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Flag size={14} />
              {flagged.has(q.id) ? 'Flagged for Review' : 'Flag Question'}
            </button>

            {idx < qs.length - 1 ? (
              <button
                onClick={() => setIdx(idx + 1)}
                className="btn-primary px-5 py-2.5"
              >
                Next
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={phase === 'active' ? submitQuiz : submitRemediation}
                disabled={Object.keys(ans).length < qs.length}
                className="btn-primary px-6 py-2.5 shadow-glow-indigo disabled:opacity-50"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      </Layout>
    )
  }

  const activeResult = phase === 'results' ? result : remResult
  if (!activeResult) return null

  const isPassed = activeResult.accuracy >= 70

  return (
    <Layout title="Assessment Results &amp; Competency Impact">
      <div className="max-w-3xl mx-auto py-6 space-y-6 animate-fade-in">
        {/* Hero Score Card */}
        <div className="card p-8 text-center relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/70 shadow-lg">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-50 text-brand-600 mb-3 shadow-inner">
            <Award size={36} />
          </div>
          
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200/80">
            {phase === 'results' ? 'Initial Assessment' : 'Remediation Session'} Completed
          </span>

          <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">
            {activeResult.score} <span className="text-xl sm:text-2xl text-slate-400 font-medium">/ {activeResult.correct + activeResult.incorrect}</span>
          </h3>

          <p className="text-sm font-semibold text-slate-600 mt-2">
            Overall Accuracy: <strong className={isPassed ? 'text-emerald-600' : 'text-amber-600'}>{activeResult.accuracy}%</strong> · Completed in {activeResult.timeSpentMin} mins
          </p>

          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Assessment evidence has been registered. Your official competency model and skill gap weights will reflect this performance.
          </p>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Strengths */}
          <div className="card p-5 border-emerald-200/60 bg-emerald-50/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Validated Strengths</h4>
            </div>
            {activeResult.strongConcepts.length > 0 ? (
              <div className="space-y-1.5">
                {activeResult.strongConcepts.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-100/60 px-3 py-1.5 rounded-xl">
                    <span>✓</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No strong concepts recorded yet.</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="card p-5 border-amber-200/60 bg-amber-50/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle size={16} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Priority Weak Areas</h4>
            </div>
            {activeResult.weakConcepts.length > 0 ? (
              <div className="space-y-1.5">
                {activeResult.weakConcepts.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-xs font-medium text-amber-900 bg-amber-100/60 px-3 py-1.5 rounded-xl">
                    <span>⚠</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Exceptional performance! No weak concepts identified.</p>
            )}
          </div>
        </div>

        {/* Remediation or Navigation CTAs */}
        {phase === 'results' && activeResult.weakConcepts.length > 0 && (
          <div className="card p-6 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-200 shadow-sm">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                Recommended Next Step
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1.5">Launch Targeted 5-Question Remediation</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-lg">
                Focus strictly on {activeResult.weakConcepts.join(', ')} to bridge detected gaps immediately.
              </p>
            </div>
            <button
              onClick={startRemediation}
              className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Start Remediation</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/skill-gaps')}
            className="btn-secondary px-5 py-2.5 text-xs font-bold"
          >
            <BarChart2 size={15} />
            <span>View Updated Skill Gaps</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary px-5 py-2.5 text-xs font-bold"
          >
            <span>Return to Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </Layout>
  )
}

