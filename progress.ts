export type UserProgress = {
  name: string
  xp: number
  streak: number
  lastStudyDate: string | null
  completedLessons: string[]
  learnedWords: string[]
  quizBest: number
  dailyGoal: number
  theme: 'light' | 'dark'
}

const KEY = 'arabica-progress-v1'

export const defaultProgress: UserProgress = {
  name: 'Studente',
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  completedLessons: [],
  learnedWords: [],
  quizBest: 0,
  dailyGoal: 20,
  theme: 'light',
}

export function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(KEY)
    if (!saved) return defaultProgress
    return { ...defaultProgress, ...JSON.parse(saved) }
  } catch {
    return defaultProgress
  }
}

export function saveProgress(progress: UserProgress) {
  localStorage.setItem(KEY, JSON.stringify(progress))
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function updateStudyStreak(progress: UserProgress): UserProgress {
  const today = todayISO()
  if (progress.lastStudyDate === today) return progress

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayISO = yesterday.toISOString().slice(0, 10)

  return {
    ...progress,
    streak: progress.lastStudyDate === yesterdayISO ? progress.streak + 1 : 1,
    lastStudyDate: today,
  }
}
