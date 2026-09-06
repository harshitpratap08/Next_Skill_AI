import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { Pencil, Save } from 'lucide-react'

export function Profile() {
  const { profile, updateProfile } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)

  if (!profile || !form) return null

  const field = (label: string, key: keyof typeof form) => (
    <div>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      {editing ? (
        <input
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      ) : (
        <p className="text-sm text-navy-900 mt-1">{form[key] as string}</p>
      )}
    </div>
  )

  return (
    <Layout title="My Profile">
      <div className="card p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold">
              {profile.avatarInitials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-900">{profile.name}</h2>
              <p className="text-sm text-slate-500">{profile.designation}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (editing) updateProfile(form)
              setEditing((e) => !e)
            }}
            className="btn-secondary flex items-center gap-2"
          >
            {editing ? <Save size={15} /> : <Pencil size={15} />}
            {editing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field('Full Name', 'name')}
          {field('Employee ID', 'employeeId')}
          {field('Designation', 'designation')}
          {field('Department', 'department')}
          {field('Experience', 'experience')}
          {field('Location', 'location')}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">Responsibilities</p>
          <div className="flex flex-wrap gap-2">
            {profile.responsibilities.map((r) => (
              <span key={r} className="chip bg-slate-100 text-slate-600 border border-slate-200">{r}</span>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">Previous Training</p>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            {profile.previousTraining.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
