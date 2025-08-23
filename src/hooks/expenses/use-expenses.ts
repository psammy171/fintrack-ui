import { useContext } from 'react'
import { ExpenseContext } from '@/context/expenses/expenses'

export const useExpenses = () => {
	const context = useContext(ExpenseContext)
	if (!context) {
		throw new Error('useExpenses must be used within a ExpenseProvider')
	}
	return context
}
