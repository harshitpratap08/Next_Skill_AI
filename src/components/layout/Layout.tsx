import React from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function Layout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/60 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">{children}</main>
      </div>
    </div>
  )
}

