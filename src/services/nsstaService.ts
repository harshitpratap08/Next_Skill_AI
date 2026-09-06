// PROTOTYPE CONNECTOR — NSSTA / TPAC
// Production integration is subject to official API access, authentication and authorization.
import { TrainingProgram } from '@/types'
import { trainingPrograms } from '@/data/mockData'

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const nsstaService = {
  isLive: false as const,
  connectorLabel: 'NSSTA / TPAC — Prototype Connector',

  async getTrainingPrograms(): Promise<TrainingProgram[]> {
    return delay(trainingPrograms)
  },

  async searchTraining(query: string): Promise<TrainingProgram[]> {
    const q = query.toLowerCase()
    return delay(trainingPrograms.filter((t) => t.title.toLowerCase().includes(q) || t.competencies.some((c) => c.toLowerCase().includes(q))))
  },

  async getUpcomingPrograms(): Promise<TrainingProgram[]> {
    return delay(trainingPrograms.filter((t) => t.status === 'Upcoming' || t.status === 'Open'))
  },
}
