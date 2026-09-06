import React, { useState, useEffect } from 'react'
import { Layout } from '@/components/layout/Layout'
import { igotService } from '@/services/igotService'
import { nsstaService } from '@/services/nsstaService'
import { Course, TrainingProgram } from '@/types'
import { useApp } from '@/context/AppContext'
import { Badge } from '@/components/common/Badge'
import { Search } from 'lucide-react'

export function CourseCatalog() {
  const { completedCourseIds, enrollCourse } = useApp()
  const [courses, setCourses] = useState<Course[]>([])
  const [programs, setPrograms] = useState<TrainingProgram[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([igotService.getCourses(), nsstaService.getTrainingPrograms()]).then(([c, p]) => {
      setCourses(c)
      setPrograms(p)
      setLoading(false)
    })
  }, [])

  const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.competency.toLowerCase().includes(query.toLowerCase()))
  const filteredPrograms = programs.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <Layout title="Course Catalog">
      <div className="flex items-center gap-2 mb-2">
        <Badge tone="info">{igotService.connectorLabel}</Badge>
        <Badge tone="info">{nsstaService.connectorLabel}</Badge>
      </div>
      <p className="text-xs text-slate-400 mb-5">Production integration subject to official API access, authentication and authorization.</p>

      <div className="relative mb-5 max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses and training programs…"
          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading catalog…</p>
      ) : (
        <>
          <h3 className="font-semibold text-navy-900 mb-3">iGOT Karmayogi Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredCourses.map((c) => (
              <div key={c.id} className="card p-4">
                <p className="font-medium text-navy-900 text-sm">{c.title}</p>
                <p className="text-xs text-slate-400 mt-1">{c.competency} · {c.level} · {c.duration}</p>
                <p className="text-xs text-slate-500 mt-2">{c.description}</p>
                <button
                  onClick={() => enrollCourse(c.id)}
                  disabled={completedCourseIds.includes(c.id)}
                  className={`mt-3 text-xs font-medium px-3 py-1.5 rounded-lg ${completedCourseIds.includes(c.id) ? 'bg-emerald-50 text-emerald-600' : 'btn-primary'}`}
                >
                  {completedCourseIds.includes(c.id) ? 'Enrolled' : 'Enroll'}
                </button>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-navy-900 mb-3">NSSTA / TPAC Training Programs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrograms.map((p) => (
              <div key={p.id} className="card p-4">
                <p className="font-medium text-navy-900 text-sm">{p.title}</p>
                <p className="text-xs text-slate-400 mt-1">{p.provider} · {p.duration} · {p.mode}</p>
                <p className="text-xs text-slate-500 mt-2">Eligibility: {p.eligibility}</p>
                <Badge tone={p.status === 'Open' ? 'success' : 'warning'}>{p.status}</Badge>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  )
}
