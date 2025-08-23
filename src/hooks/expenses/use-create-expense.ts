import { useContext } from 'react'
import { CreateExpenseContext } from '../../context/expenses/create-expense'

export const useCreateExpense = () => {
	const context = useContext(CreateExpenseContext)
	if (!context) {
		throw new Error(
			'useCreateExpense must be used within a CreateExpenseProvider',
		)
	}
	return context
}
