import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { UploadZone } from '@/components/materials/UploadZone'
import { ProcessingStepper } from '@/components/materials/ProcessingStepper'
import { useApp } from '@/context/AppContext'
import { aiService } from '@/services/aiService'
import { LearningMaterial } from '@/types'
import { Badge } from '@/components/common/Badge'
import { Link } from 'react-router-dom'
import { FileText, Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react'

export function Materials() {
  const { materials, addMaterial } = useApp()
  const [processing, setProcessing] = useState<{ fileName: string; fileType: string } | null>(null)
  const [stage, setStage] = useState(0)

  const handleFile = (file: File) => {
    setProcessing({ fileName: file.name, fileType: file.type || file.name.split('.').pop() || 'file' })
    setStage(0)
    const stages = 5
    let i = 0
    const interval = setInterval(() => {
      i++
      setStage(i)
      if (i >= stages) {
        clearInterval(interval)
        const analysis = aiService.analyzeMaterial(file.name, file.type)
        const material: LearningMaterial = {
          id: `mat-${Date.now()}`,
          fileName: file.name,
          fileType: analysis.fileType || 'document',
          uploadedAt: new Date().toISOString(),
          status: 'ready',
          detectedConcepts: analysis.detectedConcepts,
          mappedCompetency: analysis.mappedCompetency,
          confidence: analysis.confidence,
          pages: analysis.pages,
        }
        setTimeout(() => {
          addMaterial(material)
          setProcessing(null)
        }, 500)
      }
    }, 500)
  }

  return (
    <Layout title="Materials &amp; Assessment Studio">
      {/* Top Banner */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Curriculum Document Ingestion</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Upload official MoSPI manuals, survey protocols, or training guides. The AI extraction pipeline parses core statistical concepts, maps them to the competency ontology, and configures adaptive test items.
        </p>
      </div>

      {!processing && <UploadZone onFileSelected={handleFile} />}

      {processing && (
        <div className="max-w-md mx-auto card p-6 shadow-xl border-brand-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Sparkles size={20} className="animate-pulse-subtle" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 truncate max-w-xs">{processing.fileName}</p>
              <p className="text-[11px] text-brand-600 font-semibold">Running multi-stage parsing...</p>
            </div>
          </div>
          <ProcessingStepper currentStage={stage} />
        </div>
      )}

      {/* Processed Materials List */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Processed Course Materials</h3>
            <p className="text-xs text-slate-400">Indexed documents available for automated quiz synthesis</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {materials.length} Document(s)
          </span>
        </div>

        {materials.length === 0 ? (
          <div className="card p-10 text-center text-slate-400">
            <FileText size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">No materials indexed yet</p>
            <p className="text-xs text-slate-400 mt-1">Upload a PDF or document above to generate dynamic assessments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {materials.map((m) => (
              <div key={m.id} className="card p-5 hover:border-slate-300 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center shrink-0">
                        <FileText size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate group-hover:text-brand-600 transition-colors">
                          {m.fileName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {m.pages} pages (simulated) · Confidence {m.confidence}%
                        </p>
                      </div>
                    </div>
                    <Badge tone="info">{m.mappedCompetency}</Badge>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Extracted Statistical Concepts
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.detectedConcepts.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Ready for Quiz Generation</span>
                  </span>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <span>Create Quiz</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

