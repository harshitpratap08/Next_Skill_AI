import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { UploadZone } from '@/components/materials/UploadZone'
import { ProcessingStepper } from '@/components/materials/ProcessingStepper'
import { useApp } from '@/context/AppContext'
import { aiService } from '@/services/aiService'
import { LearningMaterial } from '@/types'
import { Badge } from '@/components/common/Badge'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

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
    <Layout title="Materials">
      <p className="text-sm text-slate-500 mb-5">
        Upload approved learning material to extract concepts, build a knowledge map and generate quizzes.
      </p>

      {!processing && <UploadZone onFileSelected={handleFile} />}
      {processing && (
        <div className="max-w-md">
          <p className="text-sm font-medium text-navy-900 mb-3">Processing: {processing.fileName}</p>
          <ProcessingStepper currentStage={stage} />
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-semibold text-navy-900 mb-3">Processed Materials</h3>
        {materials.length === 0 ? (
          <p className="text-sm text-slate-400">No materials uploaded yet. Upload approved learning content to generate assessments.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {materials.map((m) => (
              <div key={m.id} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-indigo-500" />
                  <p className="font-medium text-navy-900 text-sm truncate">{m.fileName}</p>
                </div>
                <p className="text-xs text-slate-400 mb-2">{m.pages} pages (simulated) · Confidence {m.confidence}%</p>
                <Badge tone="info">{m.mappedCompetency}</Badge>
                <div className="mt-3">
                  <p className="text-xs font-medium text-slate-500 mb-1">Detected Concepts</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.detectedConcepts.map((c) => (
                      <span key={c} className="chip bg-slate-100 text-slate-600 border border-slate-200 text-[11px]">{c}</span>
                    ))}
                  </div>
                </div>
                <Link to="/quiz" className="inline-block mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  Generate quiz from this material →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
