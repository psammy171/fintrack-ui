import type { ExpensesByDate } from "@/types/expense-by-date";
import type { FC } from "react";
import ExpenseCard from "./expense-card";
import { formatToINR } from "@/utils/numbers";

interface Props {
	expense: ExpensesByDate;
}

const ExpensesByDateCard: FC<Props> = ({ expense }) => {
	return (
		<div>
			<div className="flex bg-gray-300 px-3 py-2 font-semibold text-[16px]">
				<p>
					{new Date(expense.time).toLocaleDateString("en-GB", {
						day: "2-digit",
						month: "short",
						year: "numeric",
					})}
				</p>
				<span className="flex-1"></span>
				<p>{formatToINR(expense.total)}</p>
			</div>
			{expense.data.length > 0 ? (
				expense.data.map((expense, index) => (
					<ExpenseCard
						key={expense.id}
						expense={expense}
						index={index}
					/>
				))
			) : (
				<p className="text-center my-[10%] text-indigo-700">
					No expenses found!
				</p>
			)}
		</div>
	);
};

export default ExpensesByDateCard;
