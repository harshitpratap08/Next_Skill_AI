import { Competency, Course, TrainingProgram, UserProfile, WorkforceMember, NotificationItem, EmergingSkill } from '@/types'

export const demoPersonas: Record<string, UserProfile> = {
  officer: {
    id: 'u-001',
    name: 'Arun Kumar',
    employeeId: 'MOSPI-2019-3341',
    designation: 'Statistical Officer',
    department: 'Official Statistics Division',
    experience: '5 years',
    role: 'Statistical Officer',
    responsibilities: ['Survey design', 'Data validation', 'Statistical analysis', 'Report preparation'],
    location: 'New Delhi',
    previousTraining: ['Foundations of Official Statistics', 'Basic Data Visualization'],
    avatarInitials: 'AK',
  },
  manager: {
    id: 'u-002',
    name: 'Priya Nair',
    employeeId: 'MOSPI-2015-1187',
    designation: 'Training Manager',
    department: 'Data Informatics & Innovation Division',
    experience: '9 years',
    role: 'Training Manager',
    responsibilities: ['Curriculum planning', 'Workforce capability tracking', 'NSSTA coordination'],
    location: 'New Delhi',
    previousTraining: ['Advanced Survey Methodology', 'People Management for Government Teams'],
    avatarInitials: 'PN',
  },
  admin: {
    id: 'u-003',
    name: 'Rajesh Menon',
    employeeId: 'MOSPI-2012-0542',
    designation: 'Divisional Administrator',
    department: 'Data Informatics & Innovation Division',
    experience: '14 years',
    role: 'Administrator',
    responsibilities: ['Workforce analytics', 'Capacity-building strategy', 'Departmental reporting'],
    location: 'New Delhi',
    previousTraining: ['Digital Governance Essentials', 'Change Management'],
    avatarInitials: 'RM',
  },
}

export const competencies: Competency[] = [
  { id: 'c-survey-design', name: 'Survey Design', domain: 'Statistical', current: 3.2, target: 4.0, confidence: 78, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: ['c-sampling'] },
  { id: 'c-sampling', name: 'Sampling', domain: 'Statistical', current: 2.1, target: 4.0, confidence: 62, evidence: ['Baseline Assessment', 'Quiz #03'], lastAssessed: '2026-09-05', prerequisites: ['c-survey-design'], dependents: ['c-data-collection'] },
  { id: 'c-data-collection', name: 'Data Collection', domain: 'Statistical', current: 3.0, target: 4.0, confidence: 70, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: ['c-sampling'], dependents: ['c-data-quality'] },
  { id: 'c-data-quality', name: 'Data Quality Frameworks', domain: 'Statistical', current: 2.4, target: 4.0, confidence: 58, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: ['c-data-collection'], dependents: ['c-official-stats'] },
  { id: 'c-official-stats', name: 'Official Statistics Analysis', domain: 'Statistical', current: 3.3, target: 4.5, confidence: 74, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: ['c-data-quality'], dependents: [] },
  { id: 'c-national-accounts', name: 'National Accounts', domain: 'Statistical', current: 2.8, target: 3.5, confidence: 65, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-price-stats', name: 'Price Statistics', domain: 'Statistical', current: 2.6, target: 3.5, confidence: 60, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-labour-stats', name: 'Labour Statistics', domain: 'Statistical', current: 3.1, target: 3.5, confidence: 68, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-sdg', name: 'SDG Indicators', domain: 'Statistical', current: 2.9, target: 3.5, confidence: 61, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-metadata', name: 'Metadata Standards', domain: 'Statistical', current: 2.7, target: 3.5, confidence: 59, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-python', name: 'Python', domain: 'Technical', current: 2.3, target: 4.0, confidence: 55, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-r', name: 'R', domain: 'Technical', current: 2.0, target: 3.0, confidence: 50, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-sql', name: 'SQL', domain: 'Technical', current: 3.0, target: 3.5, confidence: 66, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-dataviz', name: 'Data Visualization', domain: 'Technical', current: 2.9, target: 4.0, confidence: 64, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-aiml', name: 'AI/ML', domain: 'Technical', current: 1.8, target: 3.0, confidence: 42, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-gis', name: 'GIS', domain: 'Technical', current: 1.9, target: 3.0, confidence: 45, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-cloud', name: 'Cloud', domain: 'Technical', current: 2.2, target: 3.0, confidence: 48, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-apis', name: 'APIs', domain: 'Technical', current: 2.4, target: 3.0, confidence: 52, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-cyber', name: 'Cybersecurity', domain: 'Digital Governance', current: 2.6, target: 3.5, confidence: 57, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-privacy', name: 'Data Privacy', domain: 'Digital Governance', current: 2.8, target: 3.5, confidence: 60, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-dpi', name: 'Digital Public Infrastructure', domain: 'Digital Governance', current: 2.5, target: 3.5, confidence: 55, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-leadership', name: 'Leadership', domain: 'Behavioural / Managerial', current: 3.4, target: 4.0, confidence: 72, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-communication', name: 'Communication', domain: 'Behavioural / Managerial', current: 3.6, target: 4.0, confidence: 75, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-projmgmt', name: 'Project Management', domain: 'Behavioural / Managerial', current: 3.0, target: 4.0, confidence: 66, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
  { id: 'c-ethics', name: 'Ethics', domain: 'Behavioural / Managerial', current: 4.0, target: 4.0, confidence: 85, evidence: ['Baseline Assessment'], lastAssessed: '2026-08-20', prerequisites: [], dependents: [] },
]

export const courseCatalog: Course[] = [
  { id: 'IGOT-001', title: 'Fundamentals of Survey Sampling', competency: 'Sampling', level: 'Intermediate', duration: '4 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Covers stratified, cluster and systematic sampling with applied examples from official surveys.' },
  { id: 'IGOT-002', title: 'Survey Design Essentials', competency: 'Survey Design', level: 'Beginner', duration: '3 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Introduces questionnaire design, sampling frames and survey lifecycle.' },
  { id: 'IGOT-003', title: 'Data Quality Frameworks for Official Statistics', competency: 'Data Quality Frameworks', level: 'Intermediate', duration: '5 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Applies national and international data quality frameworks to statistical products.' },
  { id: 'IGOT-004', title: 'Python for Statistical Officers', competency: 'Python', level: 'Beginner', duration: '6 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Practical Python for data cleaning, aggregation and basic analysis.' },
  { id: 'IGOT-005', title: 'Data Visualization for Public Reporting', competency: 'Data Visualization', level: 'Intermediate', duration: '3 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Effective chart design and dashboards for statistical reports.' },
  { id: 'IGOT-006', title: 'Introduction to GIS for Statistics', competency: 'GIS', level: 'Beginner', duration: '4 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Spatial data concepts applied to official statistics use-cases.' },
  { id: 'IGOT-007', title: 'AI/ML Foundations for Government Analysts', competency: 'AI/ML', level: 'Beginner', duration: '5 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Core ML concepts and responsible-AI considerations for public data.' },
  { id: 'IGOT-008', title: 'National Accounts Practitioner Track', competency: 'National Accounts', level: 'Advanced', duration: '8 hours', provider: 'iGOT Karmayogi', status: 'Available', description: 'Deep-dive into national accounting compilation methods.' },
]

export const trainingPrograms: TrainingProgram[] = [
  { id: 'NSSTA-101', title: 'Advanced Survey Sampling', competencies: ['Sampling', 'Survey Design'], duration: '3 days', mode: 'In-person', eligibility: 'Officers with baseline assessment completed', status: 'Open', provider: 'NSSTA' },
  { id: 'NSSTA-102', title: 'Survey Methodology Workshop', competencies: ['Survey Design'], duration: '2 days', mode: 'Hybrid', eligibility: 'All statistical officers', status: 'Upcoming', provider: 'NSSTA' },
  { id: 'NSSTA-103', title: 'National Accounts Compilation', competencies: ['National Accounts'], duration: '4 days', mode: 'In-person', eligibility: 'Officers in Economic Statistics wing', status: 'Open', provider: 'NSSTA' },
  { id: 'NSSTA-104', title: 'Price Statistics Practicum', competencies: ['Price Statistics'], duration: '2 days', mode: 'In-person', eligibility: 'Officers handling CPI/WPI compilation', status: 'Upcoming', provider: 'NSSTA' },
  { id: 'TPAC-201', title: 'Data Quality Frameworks Certification', competencies: ['Data Quality Frameworks'], duration: '3 days', mode: 'Hybrid', eligibility: 'Officers with Intermediate+ in Data Quality', status: 'Open', provider: 'TPAC' },
  { id: 'TPAC-202', title: 'Statistical Computing with R & Python', competencies: ['Python', 'R'], duration: '5 days', mode: 'Online', eligibility: 'All officers', status: 'Open', provider: 'TPAC' },
  { id: 'TPAC-203', title: 'Official Statistics Data Visualization Lab', competencies: ['Data Visualization'], duration: '2 days', mode: 'Online', eligibility: 'All officers', status: 'Upcoming', provider: 'TPAC' },
]

export const emergingSkills: EmergingSkill[] = [
  { name: 'AI/ML', currentReadiness: 32, futureRelevance: 91, recommendedPrep: 'AI/ML Foundations for Government Analysts (iGOT)' },
  { name: 'Cloud', currentReadiness: 40, futureRelevance: 78, recommendedPrep: 'Statistical Computing on Government Cloud (TPAC)' },
  { name: 'GIS', currentReadiness: 35, futureRelevance: 72, recommendedPrep: 'Introduction to GIS for Statistics (iGOT)' },
  { name: 'Open Data APIs', currentReadiness: 44, futureRelevance: 68, recommendedPrep: 'APIs for Public Data Systems (iGOT)' },
  { name: 'Advanced Data Visualization', currentReadiness: 55, futureRelevance: 74, recommendedPrep: 'Data Visualization Lab (TPAC)' },
  { name: 'Data Quality Automation', currentReadiness: 38, futureRelevance: 80, recommendedPrep: 'Data Quality Frameworks Certification (TPAC)' },
]

const deptNames = ['Official Statistics Division', 'Economic Statistics Wing', 'Social Statistics Wing', 'Data Informatics & Innovation Division', 'Regional Office - North', 'Regional Office - South']
const roleNames = ['Statistical Officer', 'Senior Statistical Officer', 'Data Analyst', 'Training Coordinator', 'Field Investigator']
const firstNames = ['Arun', 'Priya', 'Sanjay', 'Divya', 'Karthik', 'Meera', 'Vikram', 'Anjali', 'Rohit', 'Sunita', 'Manoj', 'Lakshmi', 'Naveen', 'Pooja', 'Suresh', 'Kavya', 'Deepak', 'Ritu', 'Ashok', 'Nisha']
const lastNames = ['Kumar', 'Nair', 'Sharma', 'Reddy', 'Iyer', 'Menon', 'Gupta', 'Verma', 'Rao', 'Singh']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export function generateWorkforce(count = 48): WorkforceMember[] {
  const rand = seededRandom(42)
  const members: WorkforceMember[] = []
  for (let i = 0; i < count; i++) {
    const readiness = Math.round(35 + rand() * 60)
    members.push({
      id: `emp-${1000 + i}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[(i * 3) % lastNames.length]}`,
      role: roleNames[i % roleNames.length],
      department: deptNames[i % deptNames.length],
      readiness,
      criticalGaps: Math.max(0, Math.round(rand() * 5)),
      learningProgress: Math.round(20 + rand() * 75),
      lastAssessment: `2026-0${(i % 8) + 1}-${(10 + (i % 18)).toString().padStart(2, '0')}`,
    })
  }
  return members
}

export const heatmapCompetencies = ['Sampling', 'Survey Design', 'Data Quality', 'Python', 'Data Viz', 'National Accounts']

export function generateHeatmap(): number[][] {
  const rand = seededRandom(7)
  return deptNames.map(() => heatmapCompetencies.map(() => Math.round(30 + rand() * 65)))
}

export const initialNotifications: NotificationItem[] = [
  { id: 'n1', message: 'New NSSTA training matches your Sampling gap.', date: '2026-09-05', read: false, type: 'info' },
  { id: 'n2', message: 'Your quiz identified 2 weak concepts.', date: '2026-09-05', read: false, type: 'warning' },
  { id: 'n3', message: 'Recommended learning path updated.', date: '2026-09-04', read: false, type: 'info' },
  { id: 'n4', message: 'Baseline assessment due for renewal in 30 days.', date: '2026-09-01', read: true, type: 'warning' },
  { id: 'n5', message: 'New learning material available: Data Quality Frameworks.', date: '2026-08-28', read: true, type: 'success' },
]
