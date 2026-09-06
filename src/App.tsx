import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Profile } from '@/pages/Profile'
import { Assessment } from '@/pages/Assessment'
import { CompetencyPage } from '@/pages/Competency'
import { SkillGaps } from '@/pages/SkillGaps'
import { LearningPath } from '@/pages/LearningPath'
import { CourseCatalog } from '@/pages/CourseCatalog'
import { Materials } from '@/pages/Materials'
import { Quiz } from '@/pages/Quiz'
import { QuizRunner } from '@/pages/QuizRunner'
import { AICopilot } from '@/pages/AICopilot'
import { ProgressPage } from '@/pages/Progress'
import { Admin } from '@/pages/Admin'
import { Settings } from '@/pages/Settings'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const { isAuthenticated } = useApp()

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
      <Route path="/competency" element={<ProtectedRoute><CompetencyPage /></ProtectedRoute>} />
      <Route path="/skill-gaps" element={<ProtectedRoute><SkillGaps /></ProtectedRoute>} />
      <Route path="/learning-path" element={<ProtectedRoute><LearningPath /></ProtectedRoute>} />
      <Route path="/course-catalog" element={<ProtectedRoute><CourseCatalog /></ProtectedRoute>} />
      <Route path="/materials" element={<ProtectedRoute><Materials /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/quiz/:id" element={<ProtectedRoute><QuizRunner /></ProtectedRoute>} />
      <Route path="/ai-copilot" element={<ProtectedRoute><AICopilot /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/admin/workforce" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}
