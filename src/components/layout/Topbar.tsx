import React, { useState } from 'react'
import { Bell, Search, RotateCcw } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'

export function Topbar({ title }: { title: string }) {
  const { notifications, markNotificationRead, resetDemoData } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const unread = notifications.filter((n) => !n.read).length

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-navy-900">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 text-sm text-slate-400 w-64">
          <Search size={15} />
          <span>Search competencies, courses…</span>
          <kbd className="ml-auto text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5">Ctrl K</kbd>
        </div>
        <button
          onClick={() => {
            if (confirm('Reset all demo data? This clears local progress.')) {
              resetDemoData()
              navigate('/login')
            }
          }}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          title="Reset Demo Data"
        >
          <RotateCcw size={18} />
        </button>
        <div className="relative">
          <button onClick={() => setOpen((o) => !o)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 relative">
            <Bell size={18} />
            {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-80 card p-2 max-h-96 overflow-y-auto z-40">
              <p className="text-xs font-semibold text-slate-400 px-2 py-1">NOTIFICATIONS</p>
              {notifications.length === 0 && <p className="text-sm text-slate-400 p-3">No notifications.</p>}
              {notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-50 ${!n.read ? 'bg-indigo-50/50' : ''}`}
                >
                  <p className="text-slate-700">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.date}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
