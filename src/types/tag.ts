import type { TagBudgetPeriod } from '../enums/tag-budget-period.enum'

export interface Tag {
	id: string
	name: string
	tagBudgetPeriod?: TagBudgetPeriod
	budget: number
}
