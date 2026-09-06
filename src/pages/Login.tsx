import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { demoPersonas } from '@/data/mockData'
import { BarChart3, ShieldCheck, Sparkles } from 'lucide-react'

export function Login() {
  const { loginDemo } = useApp()
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const handleDemoLogin = (persona: keyof typeof demoPersonas) => {
    loginDemo(persona)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-navy-950">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white bg-gradient-to-br from-navy-950 to-navy-800">
        <div>
          <p className="text-2xl font-bold">STAT-SKILL <span className="text-indigo-400">AI</span></p>
          <p className="text-slate-400 text-sm mt-1">Official Statistics Skill Intelligence Platform</p>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold leading-tight">From Skill Gaps to<br />Workforce Readiness</h2>
          <p className="text-slate-400 max-w-md text-sm">
            AI-powered competency intelligence, personalized learning and automated assessment for India's
            Official Statistical System — built for Smart India Hackathon 2026, Problem Statement SIH26101.
          </p>
          <div className="flex gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-300"><BarChart3 size={16} className="text-indigo-400" /> Competency intelligence</div>
            <div className="flex items-center gap-2 text-sm text-slate-300"><Sparkles size={16} className="text-indigo-400" /> AI-generated assessments</div>
          </div>
        </div>
        <p className="text-xs text-slate-500">MoSPI · Data Informatics &amp; Innovation Division · Smart Education</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <p className="text-xl font-bold text-navy-900">STAT-SKILL AI</p>
            <p className="text-sm text-slate-400">Official Statistics Skill Intelligence Platform</p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-navy-900 mb-4">Sign in</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleDemoLogin('officer')
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-medium text-slate-500">Employee ID / Email</label>
                <input value={id} onChange={(e) => setId(e.target.value)} className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="MOSPI-XXXX-XXXX" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Password</label>
                <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="••••••••" />
              </div>
              <button type="submit" className="btn-primary w-full">Sign In</button>
            </form>
            <div className="flex items-center gap-2 my-4">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs text-slate-400">or use a demo persona</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            <div className="space-y-2">
              <button onClick={() => handleDemoLogin('officer')} className="btn-secondary w-full text-left flex items-center justify-between px-4">
                Statistical Officer <span className="text-xs text-slate-400">Arun Kumar</span>
              </button>
              <button onClick={() => handleDemoLogin('manager')} className="btn-secondary w-full text-left flex items-center justify-between px-4">
                Training Manager <span className="text-xs text-slate-400">Priya Nair</span>
              </button>
              <button onClick={() => handleDemoLogin('admin')} className="btn-secondary w-full text-left flex items-center justify-between px-4">
                Administrator <span className="text-xs text-slate-400">Rajesh Menon</span>
              </button>
            </div>
            <div className="flex items-start gap-2 mt-5 text-xs text-slate-400 bg-slate-50 rounded-lg p-3">
              <ShieldCheck size={14} className="shrink-0 mt-0.5" />
              Prototype authentication only. Do not enter real government employee data.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
