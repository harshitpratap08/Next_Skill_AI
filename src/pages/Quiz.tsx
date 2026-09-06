import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { aiService } from '@/services/aiService'
import { useApp } from '@/context/AppContext'
import { ArrowDown } from 'lucide-react'

const competencyOptions = ['Auto Detect', 'Sampling', 'Survey Design', 'Data Quality Frameworks', 'Python', 'Data Visualization']
const difficultyOptions = ['Easy', 'Medium', 'Hard', 'Adaptive']
const countOptions = [5, 10, 15, 20]

const pipeline = ['SOURCE MATERIAL', 'TEXT EXTRACTION', 'CONCEPT EXTRACTION', 'COMPETENCY MAPPING', 'QUESTION GENERATION', 'ANSWER VALIDATION', 'DISTRACTOR CHECK', 'DIFFICULTY CLASSIFICATION', 'FINAL QUIZ']

export function Quiz() {
  const { materials, skillGaps } = useApp()
  const navigate = useNavigate()
  const [competency, setCompetency] = useState('Auto Detect')
  const [count, setCount] = useState(10)
  const [difficulty, setDifficulty] = useState('Medium')
  const [generating, setGenerating] = useState(false)

  const resolvedCompetency = competency === 'Auto Detect' ? (materials[0]?.mappedCompetency ?? skillGaps[0]?.competencyName ?? 'Sampling') : competency

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      const questions = aiService.generateMCQs(resolvedCompetency, count, difficulty)
      navigate(`/quiz/${Date.now()}`, { state: { questions, competency: resolvedCompetency } })
    }, 1200)
  }

  return (
    <Layout title="Quiz">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Generate Quiz from Learning Material</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500">Material</label>
              <p className="text-sm text-navy-900 mt-1">{materials[0]?.fileName ?? 'No material uploaded — using competency question bank'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Competency</label>
              <select value={competency} onChange={(e) => setCompetency(e.target.value)} className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm">
                {competencyOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Number of questions</label>
              <div className="flex gap-2 mt-1">
                {countOptions.map((n) => (
                  <button key={n} onClick={() => setCount(n)} className={`flex-1 py-1.5 rounded-lg text-sm border ${count === n ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium' : 'border-slate-200 text-slate-600'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Difficulty</label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {difficultyOptions.map((d) => (
                  <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-1.5 rounded-lg text-sm border ${difficulty === d ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium' : 'border-slate-200 text-slate-600'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleGenerate} disabled={generating} className="btn-primary w-full disabled:opacity-60">
              {generating ? 'Generating…' : 'Generate Quiz'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 card p-5">
          <h3 className="font-semibold text-navy-900 mb-1">MCQ Generation Pipeline</h3>
          <p className="text-xs text-slate-400 mb-5">Prototype AI Quality Check — visual pipeline for this run</p>
          <div className="flex flex-col items-center">
            {pipeline.map((stage, i) => (
              <React.Fragment key={stage}>
                <div className={`w-full max-w-sm text-center py-2.5 rounded-lg text-sm font-medium border ${generating ? 'border-indigo-300 bg-indigo-50 text-indigo-700 animate-pulse' : 'border-slate-200 text-slate-600'}`}>
                  {stage}
                </div>
                {i < pipeline.length - 1 && <ArrowDown size={16} className="text-slate-300 my-1" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
