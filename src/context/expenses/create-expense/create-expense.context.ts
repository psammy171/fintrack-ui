import { createContext } from 'react'
import type { CreateExpense } from '../../../types/create-expense'
import type { Tag } from '../../../types/tag'

export interface ExpenseError {
	remarkError: string
	amountError: string
	dateError: string
	tagError: string
}

interface ICreateExpenseContext {
	createExpense: CreateExpense
	createExpensePopUp: boolean
	expenseError: ExpenseError

	openCreateExpensePopUp: () => void
	closeCreateExpensePopUp: () => void

	setExpensePropertyError: (key: keyof ExpenseError, value: string) => void
	clearExpensePropertyError: (key: keyof ExpenseError) => void

	createExpenseApi: () => Promise<void>

	setExpenseValue: (
		key: keyof CreateExpense,
		value: string | number | Tag | Date,
	) => void
}

export const CreateExpenseContext = createContext<
	ICreateExpenseContext | undefined
>(undefined)
