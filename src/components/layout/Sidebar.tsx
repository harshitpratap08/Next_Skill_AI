import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, User, ClipboardList, Network, TrendingDown, Route as RouteIcon,
  BookOpen, FileUp, HelpCircle, MessageSquareText, LineChart, ShieldCheck, Settings as SettingsIcon,
  Sparkles, LogOut, ChevronRight
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

interface NavItem {
  to: string
  label: string
  icon: React.ElementType
  badge?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export function Sidebar() {
  const { profile, logout } = useApp()

  const sections: NavSection[] = [
    {
      title: 'INTELLIGENCE',
      items: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/competency', label: 'Competency Model', icon: Network },
        { to: '/skill-gaps', label: 'Skill Gap Radar', icon: TrendingDown },
        { to: '/ai-copilot', label: 'AI Copilot', icon: MessageSquareText, badge: 'AI' },
      ],
    },
    {
      title: 'LEARNING & SKILLING',
      items: [
        { to: '/learning-path', label: 'Learning Path', icon: RouteIcon },
        { to: '/course-catalog', label: 'Course Catalog', icon: BookOpen },
        { to: '/materials', label: 'Materials Studio', icon: FileUp },
        { to: '/assessment', label: 'Skill Assessment', icon: ClipboardList },
        { to: '/quiz', label: 'MCQ & Quiz Engine', icon: HelpCircle },
        { to: '/progress', label: 'Analytics & Growth', icon: LineChart },
      ],
    },
  ]

  if (profile?.role === 'Administrator' || profile?.role === 'Training Manager') {
    sections.push({
      title: 'ADMINISTRATION',
      items: [
        { to: '/admin', label: 'Workforce Command', icon: ShieldCheck, badge: 'Admin' },
      ],
    })
  }

  return (
    <aside className="w-72 shrink-0 bg-white/95 backdrop-blur-md text-slate-700 flex flex-col h-screen sticky top-0 border-r border-slate-200 shadow-sm z-30 select-none">
      {/* Brand Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sparkles size={20} className="text-white animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-900 font-bold text-base tracking-tight">STAT-SKILL</span>
              <span className="px-1.5 py-0.5 bg-emerald-100/80 text-emerald-800 border border-emerald-300/50 rounded text-[10px] font-extrabold tracking-wider">AI</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium">Official Statistics Platform</p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map(({ to, label, icon: Icon, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold shadow-sm border border-emerald-200'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="transition-transform group-hover:scale-110 text-emerald-600" />
                    <span>{label}</span>
                  </div>
                  {badge ? (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {badge}
                    </span>
                  ) : (
                    <ChevronRight size={13} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Card */}
      {profile && (
        <div className="p-3 mx-3 mb-3 rounded-2xl bg-slate-50/90 border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3 p-1.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {profile.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{profile.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[11px] text-emerald-700 font-medium truncate">{profile.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

