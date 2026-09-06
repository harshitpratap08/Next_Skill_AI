import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, RotateCcw } from 'lucide-react'

export function Settings() {
  const { profile, resetDemoData } = useApp()
  const navigate = useNavigate()

  return (
    <Layout title="Settings">
      <div className="max-w-2xl space-y-6">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-3">Account</h3>
          <p className="text-sm text-slate-500">Signed in as <span className="font-medium text-navy-900">{profile?.name}</span> ({profile?.role})</p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-2 flex items-center gap-2"><ShieldCheck size={16} className="text-indigo-500" /> Security &amp; Privacy (Prototype)</h3>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Role-based access control concept: officer / training manager / administrator views</li>
            <li>No API secrets are stored or exposed in frontend code</li>
            <li>File type and size validation on material uploads</li>
            <li>Audit-log placeholder for future production integration</li>
          </ul>
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3 mt-3">
            Prototype — no real government employee data should be entered.
          </p>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-2">Demo Data</h3>
          <p className="text-sm text-slate-500 mb-3">Reset all locally stored demo progress (profile edits, assessments, quiz history, uploaded materials).</p>
          <button
            onClick={() => {
              if (confirm('Reset all demo data?')) {
                resetDemoData()
                navigate('/login')
              }
            }}
            className="btn-secondary flex items-center gap-2"
          >
            <RotateCcw size={15} /> Reset Demo Data
          </button>
        </div>
      </div>
    </Layout>
  )
}
