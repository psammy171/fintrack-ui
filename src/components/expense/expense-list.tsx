import { useExpenses } from '@/hooks/expenses/use-expenses'
import Loader from '../shared/ui/loader'
import { useEffect } from 'react'
import ExpenseCard from './expense-card'
import Button from '../shared/ui/button'

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
		total,
		pageSize,
	} = useExpenses()

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
		<>
			<div className=" rounded-xs overflow-hidden mb-5 shadow-md flex-grow overflow-y-scroll bg-gray-200 relative">
				<span className="flex border-b py-2 px-3 font-semibold bg-indigo-600 text-[18px] text-white sticky top-0">
					<p className="w-[3%]"></p>
					<p className="w-[19%]">Tag</p>
					<p className="w-[40%]">Remark</p>
					<p className="w-[19%]">Amount</p>
					<p className="w-[19%]">Date</p>
				</span>
				{getLoaderOrExpenseList()}
			</div>

			<div className="fixed bottom-0 left-12 z-10 right-0 bg-gray-100">
				<div className="flex justify-end items-center my-2 mr-2">
					<p className="text-sm text-gray-600 mr-2">
						Showing results from {pageNumber * pageSize + 1} to{' '}
						{Math.min((pageNumber + 1) * pageSize, total)} of{' '}
						{total}
					</p>
					<Button
						onClick={prevPage}
						variant="ghost"
						className={`mx-0 bg-transparent hover:bg-gray-100 border-y border-l rounded-l-md ${
							isFirstPage
								? 'text-gray-400 hover:text-gray-400'
								: ''
						}`}
						disabled={isFirstPage}
					>
						&laquo;
					</Button>
					<span className="border-y h-9 px-3 flex items-center">
						{pageNumber + 1}
					</span>
					<Button
						variant="ghost"
						onClick={nextPage}
						className={`mx-0 bg-transparent hover:bg-gray-100 border-y border-r rounded-r-md ${
							isLastPage
								? 'text-gray-400 hover:text-gray-400'
								: ''
						}`}
						disabled={isLastPage}
					>
						&raquo;
					</Button>
				</div>
			</div>
		</>
	)
}

export default ExpenseList
