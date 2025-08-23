import ExpenseList from '@/components/expense/expense-list'
import ExpenseForm from '../components/expense/expense-form'
import { useCreateExpense } from '../hooks/expenses/use-create-expense'
import Button from '@/components/shared/ui/button'

const Expenses = () => {
	const { openCreateExpensePopUp } = useCreateExpense()

	return (
		<div className="mx-auto max-w-6xl pt-10">
			<span className="flex items-center mt-10 mb-5 pl-2">
				<p className="text-2xl font-semibold">All your expenses here</p>
				<span className="flex-grow"></span>
				<Button onClick={openCreateExpensePopUp}>Add Expense</Button>
			</span>
			<ExpenseList />
			<ExpenseForm />
		</div>
	)
}

export default Expenses
