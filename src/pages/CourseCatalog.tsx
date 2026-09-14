import React, { useState, useEffect } from 'react'
import { Layout } from '@/components/layout/Layout'
import { igotService } from '@/services/igotService'
import { nsstaService } from '@/services/nsstaService'
import { Course, TrainingProgram } from '@/types'
import { useApp } from '@/context/AppContext'
import { Badge } from '@/components/common/Badge'
import { Search, BookOpen, Calendar, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'

export function CourseCatalog() {
  const { completedCourseIds, enrollCourse } = useApp()
  const [courses, setCourses] = useState<Course[]>([])
  const [programs, setPrograms] = useState<TrainingProgram[]>([])
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'All' | 'iGOT' | 'NSSTA'>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([igotService.getCourses(), nsstaService.getTrainingPrograms()]).then(([c, p]) => {
      setCourses(c)
      setPrograms(p)
      setLoading(false)
    })
  }, [])

  const filteredCourses = courses.filter(
    (c) =>
      (activeTab === 'All' || activeTab === 'iGOT') &&
      (c.title.toLowerCase().includes(query.toLowerCase()) || c.competency.toLowerCase().includes(query.toLowerCase()))
  )

  const filteredPrograms = programs.filter(
    (p) =>
      (activeTab === 'All' || activeTab === 'NSSTA') &&
      (p.title.toLowerCase().includes(query.toLowerCase()) || p.provider.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <Layout title="Government Skilling Course Catalog">
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ecosystem Course Catalog</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Curated official training programs across iGOT Karmayogi and NSSTA/TPAC facilities.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
            {igotService.connectorLabel}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            {nsstaService.connectorLabel}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5">
          {(['All', 'iGOT', 'NSSTA'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {tab === 'All' ? 'All Programs' : tab === 'iGOT' ? 'iGOT Karmayogi' : 'NSSTA / TPAC'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, skills, duration..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading ecosystem catalog...</div>
      ) : (
        <div className="space-y-8">
          {/* iGOT Karmayogi Section */}
          {(activeTab === 'All' || activeTab === 'iGOT') && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-brand-600" />
                <h3 className="font-bold text-slate-900 text-base">iGOT Karmayogi Online Courses</h3>
                <span className="text-xs font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-500">
                  {filteredCourses.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCourses.map((c) => {
                  const isEnrolled = completedCourseIds.includes(c.id)
                  return (
                    <div key={c.id} className="card p-5 hover:border-slate-300 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                            {c.competency}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">{c.duration}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors leading-snug">
                          {c.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{c.description}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-400">Level: {c.level}</span>
                        <button
                          onClick={() => enrollCourse(c.id)}
                          disabled={isEnrolled}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isEnrolled
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : 'btn-primary'
                          }`}
                        >
                          {isEnrolled ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 size={13} /> Enrolled
                            </span>
                          ) : (
                            'Enroll'
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* NSSTA Training Programs Section */}
          {(activeTab === 'All' || activeTab === 'NSSTA') && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-purple-600" />
                <h3 className="font-bold text-slate-900 text-base">NSSTA / TPAC In-Service Training Programs</h3>
                <span className="text-xs font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-500">
                  {filteredPrograms.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPrograms.map((p) => (
                  <div key={p.id} className="card p-5 hover:border-slate-300 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          {p.provider}
                        </span>
                        <Badge tone={p.status === 'Open' ? 'success' : 'warning'}>{p.status}</Badge>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors leading-snug">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2">
                        <span className="font-medium text-slate-700">Eligibility:</span> {p.eligibility}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{p.mode}</span>
                      <span className="font-bold text-slate-700">{p.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

