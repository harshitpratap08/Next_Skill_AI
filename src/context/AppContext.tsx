import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  UserProfile, Competency, SkillGap, LearningMaterial, QuizResult, AssessmentResult, NotificationItem,
} from '@/types'
import { demoPersonas, competencies as baseCompetencies, initialNotifications } from '@/data/mockData'
import { aiService } from '@/services/aiService'
import { loadState, saveState, clearAllState } from '@/services/storage'

interface AppState {
  isAuthenticated: boolean
  profile: UserProfile | null
  competencies: Competency[]
  skillGaps: SkillGap[]
  materials: LearningMaterial[]
  quizHistory: QuizResult[]
  assessmentHistory: AssessmentResult[]
  notifications: NotificationItem[]
  completedCourseIds: string[]
  demoMode: boolean
}

interface AppContextValue extends AppState {
  loginDemo: (persona: keyof typeof demoPersonas) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  submitAssessment: (result: AssessmentResult) => void
  addMaterial: (material: LearningMaterial) => void
  addQuizResult: (result: QuizResult, competencyId?: string) => void
  markNotificationRead: (id: string) => void
  enrollCourse: (id: string) => void
  resetDemoData: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const STORAGE_KEYS = {
  auth: 'auth',
  profile: 'profile',
  competencies: 'competencies',
  materials: 'materials',
  quizHistory: 'quizHistory',
  assessmentHistory: 'assessmentHistory',
  notifications: 'notifications',
  completedCourseIds: 'completedCourseIds',
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => loadState(STORAGE_KEYS.auth, false))
  const [profile, setProfile] = useState<UserProfile | null>(() => loadState(STORAGE_KEYS.profile, null as UserProfile | null))
  const [competencies, setCompetencies] = useState<Competency[]>(() => loadState(STORAGE_KEYS.competencies, baseCompetencies))
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => loadState(STORAGE_KEYS.materials, []))
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(() => loadState(STORAGE_KEYS.quizHistory, []))
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>(() => loadState(STORAGE_KEYS.assessmentHistory, []))
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadState(STORAGE_KEYS.notifications, initialNotifications))
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>(() => loadState(STORAGE_KEYS.completedCourseIds, []))

  useEffect(() => saveState(STORAGE_KEYS.auth, isAuthenticated), [isAuthenticated])
  useEffect(() => saveState(STORAGE_KEYS.profile, profile), [profile])
  useEffect(() => saveState(STORAGE_KEYS.competencies, competencies), [competencies])
  useEffect(() => saveState(STORAGE_KEYS.materials, materials), [materials])
  useEffect(() => saveState(STORAGE_KEYS.quizHistory, quizHistory), [quizHistory])
  useEffect(() => saveState(STORAGE_KEYS.assessmentHistory, assessmentHistory), [assessmentHistory])
  useEffect(() => saveState(STORAGE_KEYS.notifications, notifications), [notifications])
  useEffect(() => saveState(STORAGE_KEYS.completedCourseIds, completedCourseIds), [completedCourseIds])

  const loginDemo = useCallback((persona: keyof typeof demoPersonas) => {
    setProfile(demoPersonas[persona])
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updates } : prev))
  }, [])

  const submitAssessment = useCallback((result: AssessmentResult) => {
    setAssessmentHistory((prev) => [result, ...prev])
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, message: 'Baseline assessment completed — skill gap report ready.', date: new Date().toISOString().slice(0, 10), read: false, type: 'success' },
      ...prev,
    ])
  }, [])

  const addMaterial = useCallback((material: LearningMaterial) => {
    setMaterials((prev) => [material, ...prev])
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, message: `New learning material processed: ${material.fileName}`, date: new Date().toISOString().slice(0, 10), read: false, type: 'success' },
      ...prev,
    ])
  }, [])

  const addQuizResult = useCallback((result: QuizResult, competencyId?: string) => {
    setQuizHistory((prev) => [result, ...prev])
    if (competencyId) {
      setCompetencies((prev) =>
        prev.map((c) => {
          if (c.id !== competencyId) return c
          const bump = result.accuracy >= 70 ? 0.5 : result.accuracy >= 40 ? 0.2 : 0.05
          const updated = Math.min(5, Math.round((c.current + bump) * 10) / 10)
          return { ...c, current: updated, lastAssessed: new Date().toISOString().slice(0, 10), evidence: Array.from(new Set([...c.evidence, result.quizTitle])) }
        })
      )
    }
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, message: `Quiz completed: ${result.correct}/${result.correct + result.incorrect} correct. ${result.weakConcepts.length} weak concept(s) identified.`, date: new Date().toISOString().slice(0, 10), read: false, type: result.accuracy >= 70 ? 'success' : 'warning' },
      ...prev,
    ])
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const enrollCourse = useCallback((id: string) => {
    setCompletedCourseIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const resetDemoData = useCallback(() => {
    clearAllState()
    setIsAuthenticated(false)
    setProfile(null)
    setCompetencies(baseCompetencies)
    setMaterials([])
    setQuizHistory([])
    setAssessmentHistory([])
    setNotifications(initialNotifications)
    setCompletedCourseIds([])
  }, [])

  const skillGaps = aiService.identifySkillGaps(competencies)

  const value: AppContextValue = {
    isAuthenticated,
    profile,
    competencies,
    skillGaps,
    materials,
    quizHistory,
    assessmentHistory,
    notifications,
    completedCourseIds,
    demoMode: true,
    loginDemo,
    logout,
    updateProfile,
    submitAssessment,
    addMaterial,
    addQuizResult,
    markNotificationRead,
    enrollCourse,
    resetDemoData,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
