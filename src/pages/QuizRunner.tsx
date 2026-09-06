import React, { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Question, QuizResult } from '@/types'
import { aiService } from '@/services/aiService'
import { useApp } from '@/context/AppContext'
import { competencies as baseCompetencies } from '@/data/mockData'
import { CheckCircle2, AlertTriangle, Flag } from 'lucide-react'

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

    return (
      <Layout title={phase === 'active' ? 'Quiz' : 'Remediation Quiz'}>
        <div className="max-w-2xl mx-auto">
          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${((idx + 1) / qs.length) * 100}%` }} />
          </div>
          <QuestionCard question={q} index={idx} total={qs.length} selected={ans[q.id] ?? null} onSelect={(i) => setAns({ ...ans, [q.id]: i })} />
          <div className="flex items-center justify-between mt-4">
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} className="btn-secondary disabled:opacity-50">Previous</button>
            <button
              onClick={() => setFlagged((prev) => { const s = new Set(prev); s.has(q.id) ? s.delete(q.id) : s.add(q.id); return s })}
              className={`flex items-center gap-1 text-sm ${flagged.has(q.id) ? 'text-amber-600' : 'text-slate-400'}`}
            >
              <Flag size={14} /> Flag
            </button>
            {idx < qs.length - 1 ? (
              <button onClick={() => setIdx(idx + 1)} className="btn-primary">Next</button>
            ) : (
              <button
                onClick={phase === 'active' ? submitQuiz : submitRemediation}
                disabled={Object.keys(ans).length < qs.length}
                className="btn-primary disabled:opacity-50"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </Layout>
    )
  }

  const activeResult = phase === 'results' ? result : remResult
  if (!activeResult) return null

  return (
    <Layout title="Quiz Results">
      <div className="max-w-2xl mx-auto">
        <div className="card p-6 text-center mb-5">
          <p className="text-sm text-slate-500">{phase === 'results' ? 'Quiz' : 'Remediation Quiz'} Score</p>
          <p className="text-4xl font-bold text-navy-900 mt-1">{activeResult.correct}/{activeResult.correct + activeResult.incorrect}</p>
          <p className="text-sm text-slate-500 mt-1">{activeResult.accuracy}% accuracy · {activeResult.timeSpentMin} min</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="card p-4">
            <p className="text-sm font-medium text-navy-900 flex items-center gap-1.5 mb-2"><CheckCircle2 size={15} className="text-emerald-500" /> You performed well in</p>
            {activeResult.strongConcepts.length ? activeResult.strongConcepts.map((c) => <p key={c} className="text-sm text-slate-600">✓ {c}</p>) : <p className="text-sm text-slate-400">Keep practicing to build strengths.</p>}
          </div>
          <div className="card p-4">
            <p className="text-sm font-medium text-navy-900 flex items-center gap-1.5 mb-2"><AlertTriangle size={15} className="text-amber-500" /> Needs improvement</p>
            {activeResult.weakConcepts.length ? activeResult.weakConcepts.map((c) => <p key={c} className="text-sm text-slate-600">⚠ {c}</p>) : <p className="text-sm text-slate-400">No weak concepts detected.</p>}
          </div>
        </div>

        {phase === 'results' && activeResult.weakConcepts.length > 0 && (
          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="font-medium text-navy-900">Next recommended action</p>
              <p className="text-sm text-slate-500">Take a 5-question remediation quiz on {activeResult.weakConcepts[0]}</p>
            </div>
            <button onClick={startRemediation} className="btn-primary shrink-0">Start Remediation</button>
          </div>
        )}

        {phase === 'remediation-results' && (
          <div className="card p-5 text-center">
            <p className="text-sm text-slate-500">Competency state updated illustratively based on this evidence.</p>
            <button onClick={() => navigate('/skill-gaps')} className="btn-primary mt-3">View Updated Skill Gaps</button>
          </div>
        )}

        {phase === 'results' && activeResult.weakConcepts.length === 0 && (
          <button onClick={() => navigate('/progress')} className="btn-primary mt-2">View Progress</button>
        )}
      </div>
    </Layout>
  )
}
