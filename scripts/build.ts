import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ExperienceItem, Resume } from '/data/resumes.types'

const capybaraCv: Resume = {
	summary: {
		name: 'Capybara',
		position: 'nodejs',
		rank: 'middle'
	},
	skills: [
		{
			name: 'typescript',
		}
		,
		{
			name: 'mongodb'
		}
	],
	experience: [
		{
			title: 'Fintech startup 1',
			role: 'CTO',
			description: 'Blockchain payment system',
			years: 3
		},
		{
			title: 'Fintech startup 2',
			role: 'COO',
			description: 'CEX in APAC region',
			years: 3
		}
	]
}

function ExperienceMd(experience: ExperienceItem[]) {
	return experience.map(
		item => `
### ${item.title}
Role: ${item.role}\\
Years: ${item.years}

#### Description
${item.description}
    `
	).join('').trim()
}

function ResumeMd(cv: Resume) {
	const md = `
# ${cv.summary.name}
Position: ${cv.summary.position}\\
Rank: ${cv.summary.rank}

## Skills
${cv.skills.map(skill => skill.name).join(', ')}
## Experience
${ExperienceMd(cv.experience)}
  `
	return md.trim()
}

const md = ResumeMd(capybaraCv)
console.log(md)
writeFileSync(join(process.cwd(), '/capybara.md'), md)
