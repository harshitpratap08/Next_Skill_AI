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
    <div className="min-h-screen flex flex-col lg:flex-row bg-navy-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* Left Showcase Banner */}
      <div className="lg:flex flex-col justify-between w-full lg:w-7/12 p-8 lg:p-16 relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 border-b lg:border-b-0 lg:border-r border-slate-800/80">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow-indigo">
            <Sparkles size={22} className="text-white animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-xl tracking-tight">STAT-SKILL</span>
              <span className="px-2 py-0.5 bg-brand-500/20 text-brand-300 border border-brand-400/30 rounded-md text-xs font-bold tracking-wider">AI</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Official Statistics Skill Intelligence Platform</p>
          </div>
        </div>

        {/* Center Pitch */}
        <div className="relative z-10 my-12 lg:my-0 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Smart India Hackathon 2026 · Problem SIH26101
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            From Skill Gaps to <br />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Workforce Readiness
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            An adaptive AI-driven competency engine developed for India's Ministry of Statistics &amp; Programme Implementation (MoSPI) to map official statistics skill readiness, generate contextual assessments, and deliver personalized learning pathways.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-3">
                <Brain size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">Competency Radar</h4>
              <p className="text-xs text-slate-400 mt-1">Four official statistical domains, 25 competencies, and real-time gap scoring.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <Compass size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">Adaptive Remediation</h4>
              <p className="text-xs text-slate-400 mt-1">Simulated document parsing to generate MCQs with concept-level remediation.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-400 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-800/60">
          <span>MoSPI · Data Informatics &amp; Innovation Division</span>
          <span className="font-mono text-[11px] text-slate-400">Theme: Smart Education</span>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Access Portal</h2>
              <p className="text-xs text-slate-400 mt-1">Select a demo persona or use simulated officer credentials.</p>
            </div>

            {/* Quick Demo Persona Tiles */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Persona (1-Click Instant Demo)</p>
              
              {/* Statistical Officer */}
              <button
                onClick={() => handleDemoLogin('officer')}
                className="w-full group text-left p-3.5 rounded-2xl bg-slate-800/70 hover:bg-brand-950/60 border border-slate-700/60 hover:border-brand-500/50 transition-all flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/30 text-brand-300 border border-brand-500/40 flex items-center justify-center font-bold text-sm">
                    AK
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">Statistical Officer</p>
                    <p className="text-[11px] text-slate-400">Arun Kumar · Field &amp; Survey Operations</p>
                  </div>
                </div>
                <ArrowRight size={15} className="text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Training Manager */}
              <button
                onClick={() => handleDemoLogin('manager')}
                className="w-full group text-left p-3.5 rounded-2xl bg-slate-800/70 hover:bg-brand-950/60 border border-slate-700/60 hover:border-brand-500/50 transition-all flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold text-sm">
                    PN
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">Training Manager</p>
                    <p className="text-[11px] text-slate-400">Priya Nair · Curriculum &amp; NSSTA</p>
                  </div>
                </div>
                <ArrowRight size={15} className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Administrator */}
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full group text-left p-3.5 rounded-2xl bg-slate-800/70 hover:bg-brand-950/60 border border-slate-700/60 hover:border-brand-500/50 transition-all flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold text-sm">
                    RM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Divisional Administrator</p>
                    <p className="text-[11px] text-slate-400">Rajesh Menon · Workforce Analytics</p>
                  </div>
                </div>
                <ArrowRight size={15} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            {/* Separator */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-800 flex-1" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or sign in with ID</span>
              <div className="h-px bg-slate-800 flex-1" />
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
                <label className="text-[11px] font-semibold text-slate-400">Government Employee ID</label>
                <div className="relative mt-1">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-mono"
                    placeholder="MOSPI-XXXX-XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">Password</label>
                <div className="relative mt-1">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    type="password"
                    className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-glow-indigo active:scale-[0.98]"
              >
                Sign In to Platform
              </button>
            </form>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Prototype demo mode. Local persistence via localStorage.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

