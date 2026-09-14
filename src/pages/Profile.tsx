import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { useApp } from '@/context/AppContext'
import { Pencil, Save, Check, User, Building, MapPin, Briefcase, Award, Shield } from 'lucide-react'

export function Profile() {
  const { profile, updateProfile } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)

  if (!profile || !form) return null

  const field = (label: string, key: keyof typeof form, icon?: React.ElementType) => {
    const Icon = icon
    return (
      <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
          {Icon && <Icon size={13} className="text-brand-600" />}
          {label}
        </label>
        {editing ? (
          <input
            value={form[key] as string}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        ) : (
          <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{form[key] as string}</p>
        )}
      </div>
    )
  }

  return (
    <Layout title="Cadre Officer Profile">
      <div className="card p-6 sm:p-8 max-w-3xl mx-auto shadow-md">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-xl font-extrabold shadow-glow-indigo">
              {profile.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">{profile.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                  {profile.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{profile.designation} · {profile.department}</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (editing) updateProfile(form)
              setEditing((e) => !e)
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
              editing
                ? 'btn-primary'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {editing ? <Save size={14} /> : <Pencil size={14} />}
            <span>{editing ? 'Save Profile' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Full Name', 'name', User)}
          {field('Government Employee ID', 'employeeId', Shield)}
          {field('Official Designation', 'designation', Briefcase)}
          {field('Department Division', 'department', Building)}
          {field('Years of Service Experience', 'experience', Award)}
          {field('Duty Location', 'location', MapPin)}
        </div>

        {/* Responsibilities */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Key Mandated Responsibilities
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.responsibilities.map((r) => (
              <span
                key={r}
                className="px-3 py-1 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Training Record */}
        <div className="mt-5 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Official Completed Training Record
          </p>
          <div className="space-y-2">
            {profile.previousTraining.map((t) => (
              <div key={t} className="flex items-center gap-2 text-xs text-slate-700">
                <Check size={14} className="text-emerald-500" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

