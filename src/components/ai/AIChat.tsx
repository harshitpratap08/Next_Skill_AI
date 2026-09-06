import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { ChatMessage } from '@/types'

const suggestions = [
  'What are my top skill gaps?',
  'Why was this course recommended?',
  'Explain stratified sampling.',
  'Give me a 15-minute revision plan.',
  'What should I learn next?',
]

export function AIChat({ messages, onSend }: { messages: ChatMessage[]; onSend: (text: string) => void }) {
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const submit = (text: string) => {
    if (!text.trim()) return
    onSend(text.trim())
    setInput('')
  }

  return (
    <div className="card flex flex-col h-[600px]">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Sparkles size={18} /></div>
        <div>
          <p className="font-semibold text-navy-900 text-sm">STAT-SKILL COPILOT</p>
          <p className="text-xs text-slate-400">Mock AI assistant — knows your profile, gaps &amp; history</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-sm text-slate-400 mt-10">
            Ask me about your competencies, gaps, recommendations, or request a revision plan.
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-100 text-slate-700 rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="px-5 pt-2 pb-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} onClick={() => submit(s)} className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600">
            {s}
          </button>
        ))}
      </div>
      <div className="px-5 pb-5 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit(input)}
          placeholder="Ask STAT-SKILL Copilot…"
          className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button onClick={() => submit(input)} className="btn-primary px-3">
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
