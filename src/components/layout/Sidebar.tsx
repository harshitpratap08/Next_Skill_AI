import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, User, ClipboardList, Network, TrendingDown, Route as RouteIcon,
  BookOpen, FileUp, HelpCircle, MessageSquareText, LineChart, ShieldCheck, Settings as SettingsIcon,
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

const officerNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'My Profile', icon: User },
  { to: '/assessment', label: 'Assessment', icon: ClipboardList },
  { to: '/competency', label: 'Competencies', icon: Network },
  { to: '/skill-gaps', label: 'Skill Gaps', icon: TrendingDown },
  { to: '/learning-path', label: 'Learning Path', icon: RouteIcon },
  { to: '/course-catalog', label: 'Course Catalog', icon: BookOpen },
  { to: '/materials', label: 'Materials', icon: FileUp },
  { to: '/quiz', label: 'Quiz', icon: HelpCircle },
  { to: '/ai-copilot', label: 'AI Copilot', icon: MessageSquareText },
  { to: '/progress', label: 'Progress', icon: LineChart },
]

const adminNav = [{ to: '/admin', label: 'Admin Analytics', icon: ShieldCheck }]

export function Sidebar() {
  const { profile, logout } = useApp()
  const nav = profile?.role === 'Administrator' ? [...officerNav.slice(0, 2), ...adminNav] : profile?.role === 'Training Manager' ? [...officerNav, ...adminNav] : officerNav

  return (
    <aside className="w-64 shrink-0 bg-navy-950 text-slate-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-white/10">
        <p className="text-white font-bold text-lg leading-tight">STAT-SKILL <span className="text-indigo-400">AI</span></p>
        <p className="text-[11px] text-slate-400 mt-0.5">Official Statistics Skill Intelligence</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <SettingsIcon size={17} />
          Settings
        </NavLink>
      </nav>
      {profile && (
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
              {profile.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{profile.name}</p>
              <p className="text-xs text-slate-400 truncate">{profile.role}</p>
            </div>
          </div>
          <button onClick={logout} className="w-full mt-2 text-xs text-slate-400 hover:text-white text-left px-2">
            Sign out
          </button>
        </div>
      )}
      <div className="px-3 pb-3">
        <span className="chip bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 w-full justify-center">DEMO MODE</span>
      </div>
    </aside>
  )
}
