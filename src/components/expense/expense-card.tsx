import cn from "@/lib/cn";
import type { ExpenseResponse } from "@/types/expense";
import { formatToINR } from "@/utils/numbers";
import type { FC } from "react";

interface Props {
	expense: ExpenseResponse;
	index: number;
	className?: string;
}

const ExpenseCard: FC<Props> = ({ expense, index, className }) => {
	return (
		<div
			className={cn(
				`flex flex-wrap p-3 border-b last:border-b-transparent cursor-pointer hover:bg-gray-200 transition-colors bg-white`,
				className,
			)}
		>
			<p className="hidden sm:block sm:w-[4%]">{index + 1}</p>
			<span className="w-[72%] sm:w-[68%] sm:flex">
				<p className="w-full sm:w-[59%]">{expense.remark}</p>
				<p className="w-full sm:w-[31%] text-gray-500 sm:text-black text-sm sm:text-base">
					{expense.tagLabel}
				</p>
			</span>
			<p className="w-[28%] text-right">{formatToINR(expense.amount)}</p>
		</div>
	);
};

export default ExpenseCard;
