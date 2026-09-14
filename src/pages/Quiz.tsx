import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { aiService } from '@/services/aiService'
import { useApp } from '@/context/AppContext'
import { ArrowDown, Sparkles, Sliders, CheckCircle2, FileText, Layers, BrainCircuit, Play } from 'lucide-react'

const competencyOptions = ['Auto Detect', 'Sampling', 'Survey Design', 'Data Quality Frameworks', 'Python', 'Data Visualization']
const difficultyOptions = ['Easy', 'Medium', 'Hard', 'Adaptive']
const countOptions = [5, 10, 15, 20]

const pipeline = [
  { name: 'SOURCE MATERIAL', desc: 'PDF / Doc extraction and concept indexing' },
  { name: 'TEXT & CONCEPT EXTRACTION', desc: 'Domain entity recognition for Official Stats' },
  { name: 'COMPETENCY MAPPING', desc: 'MoSPI National Competency Framework alignment' },
  { name: 'QUESTION GENERATION', desc: 'Contextual stem & plausible distractors' },
  { name: 'QUALITY & FACTUAL VALIDATION', desc: 'Source grounding & syllabus verification' },
  { name: 'FINAL ADAPTIVE QUIZ', desc: 'Calibrated item delivery for assessment' },
]

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
    }, 1400)
  }

  return (
    <Layout title="AI MCQ &amp; Assessment Engine">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-1 card p-6 shadow-md border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Sliders size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Quiz Configuration</h3>
                <p className="text-[11px] text-slate-400">Specify domain parameters</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Material Selection Banner */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Source Material</label>
                <div className="mt-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white text-slate-600 border border-slate-200 flex items-center justify-center shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {materials[0]?.fileName ?? 'Standard MoSPI Question Bank'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {materials.length > 0 ? `${materials.length} uploaded document(s)` : 'Default Official Stats Syllabus'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Competency Dropdown */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Target Competency</label>
                <select
                  value={competency}
                  onChange={(e) => setCompetency(e.target.value)}
                  className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-xs"
                >
                  {competencyOptions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1">
                  Active target: <strong className="text-brand-600">{resolvedCompetency}</strong>
                </p>
              </div>

              {/* Number of Questions */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Question Count</label>
                <div className="grid grid-cols-4 gap-2 mt-1.5">
                  {countOptions.map((n) => (
                    <button
                      key={n}
                      onClick={() => setCount(n)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        count === n
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Difficulty Level</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {difficultyOptions.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        difficulty === d
                          ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full mt-6 py-3 rounded-xl btn-primary font-bold text-xs tracking-wider uppercase shadow-glow-indigo flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Synthesizing MCQs...</span>
              </>
            ) : (
              <>
                <Play size={14} className="fill-white" />
                <span>Launch Quiz Engine</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Pipeline Visualizer */}
        <div className="lg:col-span-2 card p-6 shadow-md border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Generation Pipeline</h3>
                <p className="text-xs text-slate-400">Multi-stage hallucination check &amp; grounding architecture</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                SIH26101 Specification
              </span>
            </div>

            <div className="my-6 space-y-3 max-w-xl mx-auto">
              {pipeline.map((stage, i) => (
                <div key={stage.name} className="relative">
                  <div
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      generating
                        ? 'border-brand-400 bg-brand-50/60 shadow-sm animate-pulse'
                        : 'border-slate-200 bg-white/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center ${
                          generating
                            ? 'bg-brand-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{stage.name}</p>
                        <p className="text-[11px] text-slate-400">{stage.desc}</p>
                      </div>
                    </div>
                    <CheckCircle2
                      size={18}
                      className={generating ? 'text-brand-600' : 'text-slate-300'}
                    />
                  </div>
                  {i < pipeline.length - 1 && (
                    <div className="w-0.5 h-3 bg-slate-200 mx-auto my-0.5" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Deterministic bank active with MoSPI Official Statistics verified curricula.</span>
            <span className="font-bold text-brand-600">Strict Grounding: ON</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

