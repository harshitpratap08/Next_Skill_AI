import React, { useState, useRef, useEffect } from 'react'
import { Bell, Search, RotateCcw, Sparkles, UserCheck, ChevronDown, CheckCircle2, BookOpen } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { demoPersonas } from '@/data/mockData'

export function Topbar({ title }: { title: string }) {
  const { notifications, markNotificationRead, resetDemoData, profile, loginDemo } = useApp()
  const [notifOpen, setNotifOpen] = useState(false)
  const [personaOpen, setPersonaOpen] = useState(false)
  const navigate = useNavigate()
  const unread = notifications.filter((n) => !n.read).length
  const notifRef = useRef<HTMLDivElement>(null)
  const personaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false)
      }
      if (personaRef.current && !personaRef.current.contains(event.target as Node)) {
        setPersonaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
      {/* Title & Context */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200/60">
          <Sparkles size={11} className="text-brand-600" /> MoSPI SIH26101
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Instant Persona Switcher Dropdown */}
        <div className="relative" ref={personaRef}>
          <button
            onClick={() => setPersonaOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-all shadow-xs"
            title="Switch demo persona"
          >
            <UserCheck size={14} className="text-brand-600" />
            <span className="max-w-[120px] truncate">{profile?.role ?? 'Select Persona'}</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {personaOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl p-2 z-50 animate-fade-in">
              <p className="text-[10px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Switch Persona</p>
              {Object.entries(demoPersonas).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => {
                    loginDemo(key as any)
                    setPersonaOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                    profile?.id === p.id ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <p className="leading-tight">{p.role}</p>
                    <p className="text-[11px] text-slate-400">{p.name}</p>
                  </div>
                  {profile?.id === p.id && <CheckCircle2 size={15} className="text-brand-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Search Bar */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs text-slate-400 w-64 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 focus-within:bg-white transition-all">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, MCQs, modules..."
            className="bg-transparent text-slate-800 placeholder-slate-400 outline-none w-full text-xs font-medium"
          />
          <kbd className="text-[9px] font-mono bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-xs text-slate-500 font-bold">
            ⌘K
          </kbd>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (confirm('Reset all demo state to fresh default? This resets quiz scores and progress.')) {
              resetDemoData()
              navigate('/login')
            }
          }}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/90 border border-transparent hover:border-slate-200 transition-all"
          title="Reset Demo Data"
        >
          <RotateCcw size={16} />
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/90 border border-transparent hover:border-slate-200 relative transition-all"
            title="Notifications"
          >
            <Bell size={17} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-84 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-3 max-h-96 overflow-y-auto z-50 animate-fade-in w-80">
              <div className="flex items-center justify-between px-2 py-1 mb-2 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] font-semibold bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full">
                  {unread} new
                </span>
              </div>
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 p-4 text-center">No notifications yet.</p>
              ) : (
                <div className="space-y-1.5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                        !n.read
                          ? 'bg-brand-50/70 border border-brand-100 text-brand-950 font-medium'
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <p className="line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{n.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

