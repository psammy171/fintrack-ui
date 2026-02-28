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
				`flex flex-wrap px-2 py-2 border-b last:border-b-transparent cursor-pointer hover:bg-gray-200 transition-colors ${
					index % 2 === 0 ? "bg-white" : "bg-gray-100"
				}`,
				className,
			)}
		>
			<p className="w-[10%] sm:w-[3%]">{index + 1}</p>
			<p className="w-[40%] sm:w-[19%]">{expense.tagLabel}</p>
			<p className="w-[50%] sm:w-[40%]">{expense.remark}</p>
			<p className="w-[10%] invisible sm:hidden">{index + 1}</p>
			<p className="w-[30%] mt-1 sm:mt-0 sm:w-[19%]">
				{formatToINR(expense.amount)}
			</p>
			<p className="w-[40%] mt-1 sm:mt-0 sm:w-[19%]">
				{new Date(expense.time).toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				})}
			</p>
		</div>
	);
};

export default ExpenseCard;
