import { useExpenses } from '@/hooks/expenses/use-expenses'
import Loader from '../shared/ui/loader'
import { useEffect } from 'react'
import ExpenseCard from './expense-card'
import Button from '../shared/ui/button'
import ArrowIcon from '../shared/icons/arrow'

const ExpenseList = () => {
	const {
		expenses,
		fetching,
		fetchExpenses,
		pageNumber,
		nextPage,
		prevPage,
		isLastPage,
		isFirstPage,
	} = useExpenses()

	useEffect(() => {
		fetchExpenses()
	}, [fetchExpenses])

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
		<>
			<div className=" rounded-sm overflow-hidden mb-4 shadow-md">
				<span className="flex border-b py-2 px-3 font-semibold bg-indigo-600 text-[18px] text-white">
					<p className="w-[3%]"></p>
					<p className="w-[19%]">Tag</p>
					<p className="w-[40%]">Remark</p>
					<p className="w-[19%]">Amount</p>
					<p className="w-[19%]">Date</p>
				</span>
				{getLoaderOrExpenseList()}
			</div>
			<p className="text-right">Page Number</p>
			<div className="flex justify-end items-center mb-6">
				<Button
					onClick={prevPage}
					variant="ghost"
					className="mx-0 bg-transparent hover:bg-gray-100 border-y border-l rounded-l-md"
					disabled={isFirstPage}
				>
					<ArrowIcon className="-rotate-90" />
				</Button>
				<span className="border-y h-9 px-3 flex items-center">
					{pageNumber}
				</span>
				<Button
					variant="ghost"
					onClick={nextPage}
					className="mx-0 bg-transparent hover:bg-gray-100 border-y border-r rounded-r-md"
					disabled={isLastPage}
				>
					<ArrowIcon className="rotate-90" />
				</Button>
			</div>
		</>
	)
}

export default ExpenseList
