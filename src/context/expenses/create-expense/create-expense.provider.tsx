import { useState, type FC } from 'react'
import {
	CreateExpenseContext,
	type ExpenseError,
} from './create-expense.context'
import type { IDefaultComponentProps } from '../../../interfaces/default-component-props.interface'
import type { CreateExpense } from '../../../types/create-expense'
import type { Tag } from '../../../types/tag'
import apiClient from '@/lib/axios'
import toast from 'react-hot-toast'
import { useExpenses } from '@/hooks/expenses/use-expenses'

export const CreateExpenseProvider: FC<IDefaultComponentProps> = ({
	children,
}) => {
	const { addExpense } = useExpenses()
	const [createExpense, setCreateExpense] = useState<CreateExpense>({
		remark: '',
		amount: 0,
		date: '',
	})
	const [createExpensePopUp, setCreateExpensePopUp] = useState<boolean>(false)
	const [expenseError, setExpenseError] = useState<ExpenseError>({
		remarkError: '',
		amountError: '',
		dateError: '',
		tagError: '',
	})

	const openCreateExpensePopUp = () => {
		setExpenseError({
			remarkError: '',
			amountError: '',
			dateError: '',
			tagError: '',
		})
		setCreateExpensePopUp(true)
	}

	const validateFormValues = (): boolean => {
		if (!createExpense.remark || createExpense.remark.trim().length < 3) {
			setExpensePropertyError(
				'remarkError',
				'Remark must be at least 3 characters long',
			)
			return false
		}
		if (!createExpense.amount || isNaN(createExpense.amount)) {
			setExpensePropertyError(
				'amountError',
				'Amount must be a valid number',
			)
			return false
		}
		if (!createExpense.date || createExpense.date.trim().length !== 10) {
			setExpensePropertyError('dateError', 'Date must be a valid date')
			return false
		}
		const date = new Date(createExpense.date)
		if (isNaN(date.getTime())) {
			setExpensePropertyError('dateError', 'Date must be a valid date')
			return false
		}
		if (!createExpense.tag) {
			setExpensePropertyError('tagError', 'Tag must be selected')
			return false
		}
		return true
	}

	const resetForm = () => {
		setExpenseError({
			remarkError: '',
			amountError: '',
			dateError: '',
			tagError: '',
		})
		setCreateExpense({
			remark: '',
			amount: 0,
			date: '',
			tag: {} as Tag,
		})
	}

	const createExpenseApi = async () => {
		const isFormValid = validateFormValues()
		if (isFormValid) {
			try {
				const req = apiClient.post('/expenses', {
					remark: createExpense.remark,
					amount: createExpense.amount,
					time: new Date(createExpense.date).toISOString(),
					tagId: createExpense.tag!.id,
				})
				closeCreateExpensePopUp()
				toast.promise(req, {
					loading: 'Creating expense...',
					success: 'Expense created successfully!',
					error: 'Error creating expense',
				})
				const res = await req
				addExpense(res.data)
				resetForm()
			} catch (error) {
				console.error('Error creating expense:', error)
			}
		}
	}

	const closeCreateExpensePopUp = () => {
		setCreateExpensePopUp(false)
	}

	const setExpensePropertyError = (
		key: keyof ExpenseError,
		value: string,
	) => {
		setExpenseError({
			...expenseError,
			[key]: value,
		})
	}

	const clearExpensePropertyError = (key: keyof ExpenseError) => {
		setExpenseError({
			...expenseError,
			[key]: '',
		})
	}

	const setExpenseValue = (
		key: keyof CreateExpense,
		value: string | number | Tag | Date,
	) => {
		setCreateExpense({
			...createExpense,
			[key]: value,
		})
	}

	return (
		<CreateExpenseContext.Provider
			value={{
				createExpense,
				createExpensePopUp,
				expenseError,
				openCreateExpensePopUp,
				closeCreateExpensePopUp,
				setExpenseValue,
				setExpensePropertyError,
				clearExpensePropertyError,
				createExpenseApi,
			}}
		>
			{children}
		</CreateExpenseContext.Provider>
	)
}
