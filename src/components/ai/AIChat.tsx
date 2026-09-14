import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, User, Bot, Copy, Check, CornerDownLeft } from 'lucide-react'
import { ChatMessage } from '@/types'
import { useApp } from '@/context/AppContext'

const suggestions = [
  'What are my top skill gaps?',
  'Why was this course recommended?',
  'Explain stratified sampling.',
  'Give me a 15-minute revision plan.',
  'What should I learn next?',
]

export function AIChat({
  messages,
  onSend,
  isTyping = false,
}: {
  messages: ChatMessage[]
  onSend: (text: string) => void
  isTyping?: boolean
}) {
  const { profile } = useApp()
  const [input, setInput] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const submit = (text: string) => {
    if (!text.trim()) return
    onSend(text.trim())
    setInput('')
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="card flex flex-col h-[650px] overflow-hidden shadow-lg border-slate-200/90">
      {/* Copilot Header */}
      <div className="px-6 py-4 border-b border-emerald-100 bg-white backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-slate-900 text-sm tracking-tight">STAT-SKILL Intelligence Copilot</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-emerald-700 font-medium">Context-aware statistical AI tutor · Online</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          Deterministic Mode
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
              <Sparkles size={28} />
            </div>
            <div className="max-w-md">
              <h4 className="text-base font-bold text-slate-900">How can I assist your statistical skilling today?</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                I can review your competency scores, explain statistical methodologies, generate revision schedules, and break down why specific courses are recommended for your role.
              </p>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                <Bot size={15} />
              </div>
            )}

            <div className={`relative group max-w-[80%] ${m.role === 'user' ? 'order-1' : 'order-2'}`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>

              {m.role === 'assistant' && (
                <button
                  onClick={() => handleCopy(m.id, m.text)}
                  className="absolute -right-7 top-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-emerald-700 transition-opacity"
                  title="Copy response"
                >
                  {copiedId === m.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs mt-0.5 order-2">
                {profile?.avatarInitials || 'YS'}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs">
              <Bot size={15} />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Suggested Chips */}
      <div className="px-6 py-2 border-t border-slate-100 bg-emerald-50/20 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            className="text-[11px] font-medium px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all shrink-0 shadow-2xs"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 focus-within:bg-white transition-all"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask questions about official stats, sampling, skill gaps, or learning paths..."
            className="flex-1 bg-transparent px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  )
}

