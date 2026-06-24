import { useExpenses } from "@/hooks/expenses/use-expenses";
import ExpenseLoader from "../shared/ui/loaders/expense-loader";
import { useEffect } from "react";
import cn from "@/lib/cn";
import ExpensesByDateCard from "./expenses-by-date-card";

const ExpenseList = ({ className }: { className?: string }) => {
	const { expenses, fetching, fetchExpenses, pageNumber } = useExpenses();

	useEffect(() => {
		fetchExpenses();
	}, [fetchExpenses, pageNumber]);

	const getExpenseList = () => {
		return expenses.length > 0 ? (
			expenses.map((expense) => (
				<ExpensesByDateCard key={expense.time} expense={expense} />
			))
		) : (
			<p className="text-center my-[10%] text-indigo-700">
				No expenses found!
			</p>
		);
	};

	const getLoaderOrExpenseList = () => {
		if (fetching)
			return (
				<span className="w-full">
					{Array.from({ length: 4 }).map(() => (
						<ExpenseLoader />
					))}
				</span>
			);

		return getExpenseList();
	};

	return (
		<div className={cn("overflow-y-scroll w-full", className)}>
			<div className="flex py-2 px-3 font-semibold bg-indigo-600 text-[18px] text-white sticky top-0 z-10">
				<p className="hidden sm:block w-[4%]"></p>
				<p className="w-[40%]">Remark</p>
				<p className="w-[28%] invisible sm:visible">Tag</p>
				<p className="w-[28%] text-right">Amount</p>
			</div>
			<div>{getLoaderOrExpenseList()}</div>
		</div>
	);
};

export default ExpenseList;
