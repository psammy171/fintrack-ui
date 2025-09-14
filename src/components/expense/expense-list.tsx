import { useExpenses } from '@/hooks/expenses/use-expenses'
import Loader from '../shared/ui/loader'
import { useEffect } from 'react'
import ExpenseCard from './expense-card'
import cn from '@/lib/cn'

const ExpenseList = ({ className }: { className?: string }) => {
	const { expenses, fetching, fetchExpenses, pageNumber } = useExpenses()

	useEffect(() => {
		fetchExpenses()
	}, [fetchExpenses, pageNumber])

	const getExpenseList = () => {
		return expenses.length > 0 ? (
			expenses.map((expense, index) => (
				<ExpenseCard key={expense.id} expense={expense} index={index} />
			))
		) : (
			<p className="text-center my-[10%] text-indigo-700">
				No expenses found!
			</p>
		)
	}

	const getLoaderOrExpenseList = () => {
		if (fetching)
			return (
				<span className="w-full">
					<Loader className="mx-auto my-[10%]" />
				</span>
			)

		return getExpenseList()
	}

	return (
		<div className={cn('', className)}>
			<span className="flex py-2 px-3 font-semibold bg-indigo-600 text-[18px] text-white sticky top-0">
				<p className="w-[3%]"></p>
				<p className="w-[19%]">Tag</p>
				<p className="w-[40%]">Remark</p>
				<p className="w-[19%]">Amount</p>
				<p className="w-[19%]">Date</p>
			</span>
			{getLoaderOrExpenseList()}
		</div>
	)
}

export default ExpenseList
