import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { AIChat } from '@/components/ai/AIChat'
import { useApp } from '@/context/AppContext'
import { aiService } from '@/services/aiService'
import { ChatMessage } from '@/types'

export function AICopilot() {
  const { profile, skillGaps, quizHistory } = useApp()
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = { id: `m-${Date.now()}`, role: 'user', text, timestamp: new Date().toISOString() }
    setMessages((prev) => [...prev, userMsg])
    if (!profile) return
    setTimeout(() => {
      const reply = aiService.chatWithCopilot(text, { profile, gaps: skillGaps, quizHistory })
      const aiMsg: ChatMessage = { id: `m-${Date.now() + 1}`, role: 'assistant', text: reply, timestamp: new Date().toISOString() }
      setMessages((prev) => [...prev, aiMsg])
    }, 500)
  }

  return (
    <Layout title="AI Copilot">
      <div className="max-w-3xl mx-auto">
        <AIChat messages={messages} onSend={handleSend} />
      </div>
    </Layout>
  )
}
