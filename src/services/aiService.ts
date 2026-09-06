// AI SERVICE ABSTRACTION — Prototype
// The application works fully without an external AI API using deterministic mock logic.
// If an API key/provider is configured later, swap the implementations below without
// changing any calling UI code. Never expose API keys in frontend code — route real
// calls through a backend proxy in production.
import { Competency, SkillGap, GapSeverity, Recommendation, LearningMaterial, Question, QuizResult, Domain, UserProfile } from '@/types'
import { competencies as baseCompetencies, courseCatalog, trainingPrograms } from '@/data/mockData'
import { getQuestionsForCompetency } from '@/data/questionBank'

const HAS_EXTERNAL_AI = false // flip true + implement provider call when a key is configured

function gapSeverity(current: number, target: number): GapSeverity {
  const delta = target - current
  if (delta >= 1.8) return 'Critical'
  if (delta >= 1.2) return 'High'
  if (delta >= 0.5) return 'Medium'
  return 'Low'
}

export const aiService = {
  provider: HAS_EXTERNAL_AI ? 'external' : 'mock',

  analyzeProfile(profile: UserProfile): { summary: string } {
    return {
      summary: `${profile.name} is a ${profile.designation} in ${profile.department} with ${profile.experience} of experience. Primary responsibilities: ${profile.responsibilities.join(', ')}.`,
    }
  },

  assessCompetency(): Competency[] {
    // Deterministic baseline drawn from the mock competency model.
    return baseCompetencies
  },

  identifySkillGaps(competencyList: Competency[] = baseCompetencies): SkillGap[] {
    return competencyList
      .map((c) => ({
        competencyId: c.id,
        competencyName: c.name,
        current: c.current,
        required: c.target,
        severity: gapSeverity(c.current, c.target),
        evidence: c.evidence.join(', '),
        prerequisite: c.prerequisites.length
          ? baseCompetencies.find((p) => p.id === c.prerequisites[0])?.name ?? 'None'
          : 'None',
        recommendedAction: courseCatalog.find((course) => course.competency === c.name)?.title ?? `${c.name} Fundamentals`,
      }))
      .sort((a, b) => (b.required - b.current) - (a.required - a.current))
  },

  generateRecommendations(gaps: SkillGap[], completedCourseIds: string[] = []): Recommendation[] {
    const severityWeight: Record<GapSeverity, number> = { Critical: 40, High: 30, Medium: 18, Low: 8 }
    const recs: Recommendation[] = []
    gaps.slice(0, 6).forEach((gap, idx) => {
      const course = courseCatalog.find((c) => c.competency === gap.competencyName)
      const training = trainingPrograms.find((t) => t.competencies.includes(gap.competencyName))
      const target = course ?? training
      if (!target) return
      const isCourse = 'provider' in target && (target as any).provider?.includes('iGOT')
      const alreadyDone = 'id' in target && completedCourseIds.includes((target as any).id)
      const roleRelevance = 25
      const prereqFit = gap.prerequisite !== 'None' ? 15 : 8
      const historyBonus = alreadyDone ? -20 : 10
      const score = Math.min(99, severityWeight[gap.severity] + roleRelevance + prereqFit + historyBonus - idx * 2)
      recs.push({
        id: `rec-${gap.competencyId}`,
        title: 'title' in target ? (target as any).title : gap.recommendedAction,
        type: isCourse ? 'iGOT Karmayogi' : (('provider' in target ? (target as any).provider : 'NSSTA') as any),
        gapAddressed: gap.competencyName,
        prerequisite: gap.prerequisite,
        expectedImprovement: `+${(gap.required - gap.current > 1.5 ? 1.0 : 0.6).toFixed(1)} pts on ${gap.competencyName}`,
        score,
        reasons: [
          `Addresses ${gap.severity} gap in ${gap.competencyName}`,
          `Matches current role responsibilities`,
          gap.prerequisite !== 'None' ? `Builds on prerequisite: ${gap.prerequisite}` : `No prerequisite blocking — ready to start`,
          `Supports upcoming assessment cycle`,
          alreadyDone ? `Already completed previously` : `Not completed previously`,
        ],
      })
    })
    return recs.sort((a, b) => b.score - a.score)
  },

  analyzeMaterial(fileName: string, fileType: string): Omit<LearningMaterial, 'id' | 'uploadedAt' | 'status'> {
    // Deterministic mock extraction keyed off the filename, since no real parser is
    // guaranteed available in this environment. Clearly labelled as prototype-generated.
    const nameLower = fileName.toLowerCase()
    let mappedCompetency = 'Sampling'
    let concepts = ['Stratified Sampling', 'Cluster Sampling', 'Sample Size', 'Sampling Error', 'Non-response Bias']
    if (nameLower.includes('quality')) {
      mappedCompetency = 'Data Quality Frameworks'
      concepts = ['Data Quality Dimensions', 'Data Validation', 'Metadata Standards']
    } else if (nameLower.includes('python') || nameLower.includes('code')) {
      mappedCompetency = 'Python'
      concepts = ['Data Manipulation', 'Data Cleaning', 'Python Basics']
    } else if (nameLower.includes('visual') || nameLower.includes('dashboard')) {
      mappedCompetency = 'Data Visualization'
      concepts = ['Chart Selection', 'Dashboard Design']
    } else if (nameLower.includes('survey') || nameLower.includes('design')) {
      mappedCompetency = 'Survey Design'
      concepts = ['Questionnaire Design', 'Survey Lifecycle', 'Survey Validity']
    }
    return {
      fileName,
      fileType,
      detectedConcepts: concepts,
      mappedCompetency,
      confidence: 88 + Math.round(Math.random() * 8),
      pages: 8 + Math.round(Math.random() * 24),
    }
  },

  generateMCQs(competency: string, count: number, difficulty: string): Question[] {
    return getQuestionsForCompetency(competency, count, difficulty)
  },

  validateQuestion(q: Question): { sourceGrounded: boolean; answerValidated: boolean; duplicateCheck: boolean; qualityScore: number } {
    return { sourceGrounded: true, answerValidated: true, duplicateCheck: true, qualityScore: q.qualityScore }
  },

  analyzeQuiz(questions: Question[], answers: number[]): QuizResult {
    let correct = 0
    const strong: string[] = []
    const weak: string[] = []
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) {
        correct++
        if (!strong.includes(q.concept)) strong.push(q.concept)
      } else if (!weak.includes(q.concept)) {
        weak.push(q.concept)
      }
    })
    const incorrect = questions.length - correct
    const accuracy = questions.length ? Math.round((correct / questions.length) * 100) : 0
    return {
      id: `qr-${Date.now()}`,
      quizTitle: `${questions[0]?.competency ?? 'General'} Quiz`,
      date: new Date().toISOString(),
      score: correct,
      accuracy,
      timeSpentMin: Math.max(2, Math.round(questions.length * 1.2)),
      correct,
      incorrect,
      strongConcepts: strong.filter((c) => !weak.includes(c)),
      weakConcepts: weak,
      competency: questions[0]?.competency ?? 'General',
    }
  },

  generateRemediation(weakConcepts: string[], competency: string): Question[] {
    const pool = getQuestionsForCompetency(competency, 5, 'Adaptive')
    return pool.filter((q) => weakConcepts.length === 0 || weakConcepts.includes(q.concept)).slice(0, 5).length
      ? pool.filter((q) => weakConcepts.includes(q.concept)).slice(0, 5)
      : pool.slice(0, 5)
  },

  chatWithCopilot(message: string, context: { profile: UserProfile; gaps: SkillGap[]; quizHistory: QuizResult[] }): string {
    const msg = message.toLowerCase()
    const { profile, gaps, quizHistory } = context

    if (msg.includes('top') && msg.includes('gap')) {
      const top = gaps.slice(0, 3).map((g) => `${g.competencyName} (${g.severity})`).join(', ')
      return `Based on your latest evidence, your top skill gaps are: ${top}. I'd recommend starting with ${gaps[0]?.competencyName ?? 'your highest-priority gap'} since it has the largest gap between current and required level.`
    }
    if (msg.includes('why') && msg.includes('recommend')) {
      const top = gaps[0]
      return top
        ? `The top recommendation addresses your ${top.severity} gap in ${top.competencyName}. It builds on ${top.prerequisite}, matches your role as ${profile.role}, and is expected to lift your competency score meaningfully based on assessment evidence.`
        : `Recommendations are generated from your role, current gaps, prerequisites and assessment history.`
    }
    if (msg.includes('stratified sampling')) {
      return `Stratified sampling divides the population into homogeneous subgroups (strata) — e.g., by state or sector — then samples independently within each stratum. This usually improves precision versus simple random sampling when strata differ meaningfully on the variable of interest.`
    }
    if (msg.includes('revision plan') || msg.includes('15-minute') || msg.includes('15 minute')) {
      const weak = quizHistory.flatMap((q) => q.weakConcepts)
      const focus = weak[0] ?? gaps[0]?.competencyName ?? 'Sampling'
      return `Here's a 15-minute revision plan focused on ${focus}:\n1) 5 min — review core definitions and one worked example.\n2) 5 min — walk through a real official-statistics scenario using ${focus}.\n3) 5 min — attempt 3 quick recall questions and check your reasoning.`
    }
    if (msg.includes('quiz') && (msg.includes('weakest') || msg.includes('generate'))) {
      const weakest = gaps[0]?.competencyName ?? 'Sampling'
      return `I can generate a quiz on ${weakest} — your current weakest competency. Head to the Quiz page, select "${weakest}" as the competency, and click Generate Quiz. Want me to also queue a 5-question remediation set afterward?`
    }
    if (msg.includes('what should i learn next') || msg.includes('next')) {
      const top = gaps[0]
      return top ? `Your next best action is: ${top.recommendedAction}, targeting your ${top.severity} gap in ${top.competencyName}.` : `Complete your baseline assessment first so I can tailor a learning path.`
    }
    return `I can help with your skill gaps, recommendations, learning path, and quizzes. Try asking "What are my top skill gaps?" or "What should I learn next?"`
  },
}
