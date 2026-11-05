export interface Project {
  id: string
  name: string
  category: 'Full-Stack' | 'AI & Vision' | 'Open Source' | 'Cloud'
  label: string
  description: string
  architectureHighlight: string
  stack: string[]
  features: string[]
  githubUrl?: string
  liveUrl?: string
  accent: 'orange' | 'violet' | 'cyan' | 'lime' | 'pink' | 'amber'
  number: string
  metrics?: string
}

export interface SkillCategory {
  title: string
  iconName: string
  description: string
  skills: {
    name: string
    level: 'Used in projects' | 'Familiar' | 'Learning'
    highlight?: boolean
  }[]
}

export interface Achievement {
  id: string
  badge: string
  title: string
  organization: string
  metric: string
  description: string
  tag: string
}

export interface StoryCapsule {
  id: number
  title: string
  category: string
  superpower: string
  story: string
  lesson: string
  rarity: 'Common' | 'Rare' | 'Legendary'
  color: string
}

export interface QuizQuestion {
  scenario: string
  options: {
    service: string
    label: string
    correct: boolean
    reason: string
  }[]
}
