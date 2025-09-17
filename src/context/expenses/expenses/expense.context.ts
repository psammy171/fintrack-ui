import { createContext } from 'react'
import type { ExpenseResponse } from '@/types/expense'

interface IExpenseContext {
	fetching: boolean
	fetchError?: string
	expenses: ExpenseResponse[]
	total: number
	pageNumber: number
	isLastPage: boolean
	isFirstPage: boolean
	totalPages: number
	pageSize: number
	folderId?: string

	fetchExpenses: () => void

	addExpense: (expense: ExpenseResponse) => void
	updateExpense: (expenseId: string, expense: ExpenseResponse) => void

	setFetching: (isFetching: boolean) => void
	setFetchError: (error: string) => void
	setFolderId: (folderId?: string) => void

	nextPage: () => void
	prevPage: () => void
}

export const ExpenseContext = createContext<IExpenseContext | undefined>(
	undefined,
)
