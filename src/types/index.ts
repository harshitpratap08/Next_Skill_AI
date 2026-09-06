export type Domain = 'Statistical' | 'Technical' | 'Digital Governance' | 'Behavioural / Managerial'
export type GapSeverity = 'Critical' | 'High' | 'Medium' | 'Low'
export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type SourceType = 'iGOT Karmayogi' | 'NSSTA' | 'TPAC Training' | 'Internal Learning Material'

export interface UserProfile {
  id: string
  name: string
  employeeId: string
  designation: string
  department: string
  experience: string
  role: 'Statistical Officer' | 'Training Manager' | 'Administrator'
  responsibilities: string[]
  location: string
  previousTraining: string[]
  avatarInitials: string
}

export interface Competency {
  id: string
  name: string
  domain: Domain
  current: number
  target: number
  confidence: number
  evidence: string[]
  lastAssessed: string
  prerequisites: string[]
  dependents: string[]
}

export interface SkillGap {
  competencyId: string
  competencyName: string
  current: number
  required: number
  severity: GapSeverity
  evidence: string
  prerequisite: string
  recommendedAction: string
}

export interface Course {
  id: string
  title: string
  competency: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  provider: SourceType
  status: 'Available' | 'Enrolled' | 'Completed'
  description: string
}

export interface TrainingProgram {
  id: string
  title: string
  competencies: string[]
  duration: string
  mode: 'Online' | 'In-person' | 'Hybrid'
  eligibility: string
  status: 'Open' | 'Upcoming' | 'Closed'
  provider: 'NSSTA' | 'TPAC'
}

export interface Recommendation {
  id: string
  title: string
  type: SourceType
  gapAddressed: string
  prerequisite: string
  expectedImprovement: string
  score: number
  reasons: string[]
}

export interface LearningMaterial {
  id: string
  fileName: string
  fileType: string
  uploadedAt: string
  status: 'processing' | 'ready'
  detectedConcepts: string[]
  mappedCompetency: string
  confidence: number
  pages: number
}

export interface Question {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  concept: string
  difficulty: Difficulty
  competency: string
  qualityScore: number
}

export interface QuizResult {
  id: string
  quizTitle: string
  date: string
  score: number
  accuracy: number
  timeSpentMin: number
  correct: number
  incorrect: number
  strongConcepts: string[]
  weakConcepts: string[]
  competency: string
}

export interface AssessmentResult {
  id: string
  date: string
  overallReadiness: number
  domainScores: Record<Domain, number>
  strongCompetencies: string[]
  weakCompetencies: string[]
  criticalGaps: string[]
}

export interface NotificationItem {
  id: string
  message: string
  date: string
  read: boolean
  type: 'info' | 'warning' | 'success'
}

export interface EmergingSkill {
  name: string
  currentReadiness: number
  futureRelevance: number
  recommendedPrep: string
}

export interface WorkforceMember {
  id: string
  name: string
  role: string
  department: string
  readiness: number
  criticalGaps: number
  learningProgress: number
  lastAssessment: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  timestamp: string
}
