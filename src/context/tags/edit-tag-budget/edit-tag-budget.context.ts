import { createContext } from 'react'
import type { Tag } from '../../../types/tag'
import type { TagBudgetPeriod } from '../../../enums/tag-budget-period.enum'

interface IEditTagBudgetContext {
	editTagBudget?: Tag
	editTagBudgetPopup: boolean
	editTagBudgetAmountErr?: string
	editTagBudgetPeriodErr?: string

	editTagBudgetAmount: (budget: number) => void
	editTagBudgetPeriod: (tagBudgetPeriod: TagBudgetPeriod) => void

	updateTagBudget: () => void

	setEditTagBudgetAmountErr: (value: string) => void
	setEditTagBudgetPeriodErr: (value: string) => void

	openEditTagBudgetPopup: (tag: Tag) => void
	closeEditTagBudgetPopup: () => void
}

export const EditTagBudgetContext = createContext<
	IEditTagBudgetContext | undefined
>(undefined)
