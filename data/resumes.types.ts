export interface Skill {
  name: 'typescript' | 'mongodb'
}

export interface ExperienceItem {
  role: 'CTO' | 'teamLead' | 'COO' | 'manager'
  title: string
  description: string
  years: number
}

export interface Resume {

  summary: {
    name: string // Capybara
    position: 'nodejs' | 'devops' | 'designer' | 'qa' | 'manager' // Senior backend developer
    rank: 'senior' | 'middle' | 'junior'
  }

  skills: Skill[]

  experience: ExperienceItem[]

}