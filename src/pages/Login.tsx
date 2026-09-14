import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { demoPersonas } from '@/data/mockData'
import { BarChart3, ShieldCheck, Sparkles, Brain, Compass, ArrowRight, CheckCircle2, Lock, User } from 'lucide-react'

export function Login() {
  const { loginDemo } = useApp()
  const navigate = useNavigate()
  const [id, setId] = useState('MOSPI-2019-3341')
  const [pw, setPw] = useState('demo1234')

  const handleDemoLogin = (persona: keyof typeof demoPersonas) => {
    loginDemo(persona)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Left Showcase Banner */}
      <div className="lg:flex flex-col justify-between w-full lg:w-7/12 p-8 lg:p-16 relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white border-b lg:border-b-0 lg:border-r border-emerald-100">
        {/* Ambient Emerald Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sparkles size={22} className="text-white animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-extrabold text-xl tracking-tight">STAT-SKILL</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-xs font-bold tracking-wider">AI</span>
            </div>
            <p className="text-xs text-emerald-700 font-medium">Official Statistics Skill Intelligence Platform</p>
          </div>
        </div>

        {/* Center Pitch */}
        <div className="relative z-10 my-12 lg:my-0 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Smart India Hackathon 2026 · Problem SIH26101
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            From Skill Gaps to <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Workforce Readiness
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            An adaptive AI-driven competency engine developed for India's Ministry of Statistics &amp; Programme Implementation (MoSPI) to map official statistics skill readiness, generate contextual assessments, and deliver personalized learning pathways.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-3 shadow-xs">
                <Brain size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Competency Radar</h4>
              <p className="text-xs text-slate-500 mt-1">Four official statistical domains, 25 competencies, and real-time gap scoring.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-emerald-100 shadow-sm backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mb-3 shadow-xs">
                <Compass size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Adaptive Remediation</h4>
              <p className="text-xs text-slate-500 mt-1">Simulated document parsing to generate MCQs with concept-level remediation.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-emerald-100">
          <span>MoSPI · National AI &amp; Statistical Intelligence Unit</span>
          <span className="font-mono text-[11px] text-emerald-700 font-semibold">Theme: Smart Education</span>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-white">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-lg space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Access Portal</h2>
              <p className="text-xs text-slate-500 mt-1">Select a demo persona or use simulated officer credentials.</p>
            </div>

            {/* Quick Demo Persona Tiles */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Persona (1-Click Instant Demo)</p>
              
              {/* Statistical Officer */}
              <button
                onClick={() => handleDemoLogin('officer')}
                className="w-full group text-left p-3.5 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-sm shadow-xs">
                    YS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Statistical Officer</p>
                    <p className="text-[11px] text-slate-500">Yashvardhan Sharma · AI &amp; Analytics</p>
                  </div>
                </div>
                <ArrowRight size={15} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Training Manager */}
              <button
                onClick={() => handleDemoLogin('manager')}
                className="w-full group text-left p-3.5 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 border border-teal-200 flex items-center justify-center font-bold text-sm shadow-xs">
                    AR
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Training Manager</p>
                    <p className="text-[11px] text-slate-500">Dr. Ananya Roy · Skilling &amp; NSSTA</p>
                  </div>
                </div>
                <ArrowRight size={15} className="text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Administrator */}
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full group text-left p-3.5 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 flex items-center justify-center font-bold text-sm shadow-xs">
                    RS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Principal Director General</p>
                    <p className="text-[11px] text-slate-500">Rajeshwar Sen · National Governance</p>
                  </div>
                </div>
                <ArrowRight size={15} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            {/* Separator */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or sign in with ID</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            {/* Simulated Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleDemoLogin('officer')
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Government Employee ID</label>
                <div className="relative mt-1">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                    placeholder="MOSPI-XXXX-XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600">Password</label>
                <div className="relative mt-1">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    type="password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
              >
                Sign In to Platform
              </button>
            </form>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-900 font-medium">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              <span>Official prototype. Secure local state persistence.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

