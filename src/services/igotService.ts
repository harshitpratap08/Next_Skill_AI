// PROTOTYPE CONNECTOR — iGOT Karmayogi
// This service simulates the shape of an iGOT Karmayogi integration for demo purposes.
// Production integration is subject to official API access, authentication and authorization.
import { Course } from '@/types'
import { courseCatalog } from '@/data/mockData'

const LATENCY = 250

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const igotService = {
  isLive: false as const,
  connectorLabel: 'iGOT Karmayogi — Prototype Connector',

  async getCourses(): Promise<Course[]> {
    return delay(courseCatalog)
  },

  async searchCourses(query: string): Promise<Course[]> {
    const q = query.toLowerCase()
    return delay(courseCatalog.filter((c) => c.title.toLowerCase().includes(q) || c.competency.toLowerCase().includes(q)))
  },

  async getCourseDetails(id: string): Promise<Course | undefined> {
    return delay(courseCatalog.find((c) => c.id === id))
  },

  async getRecommendations(competencyNames: string[]): Promise<Course[]> {
    return delay(courseCatalog.filter((c) => competencyNames.includes(c.competency)))
  },

  async enrollCourse(id: string): Promise<{ success: boolean; message: string }> {
    return delay({ success: true, message: `Enrolled in ${id} (prototype simulation — no live iGOT enrollment).` })
  },

  async getCompletionStatus(id: string): Promise<'Available' | 'Enrolled' | 'Completed'> {
    const course = courseCatalog.find((c) => c.id === id)
    return delay(course?.status ?? 'Available')
  },
}
