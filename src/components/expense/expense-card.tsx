import cn from "@/lib/cn";
import type { ExpenseResponse } from "@/types/expense";
import { formatToINR } from "@/utils/numbers";
import type { FC } from "react";
import DeleteIcon from "../shared/icons/delete";
import { useExpenses } from "@/hooks/expenses/use-expenses";
import { useAuth } from "@/auth/hooks/use-auth";

interface Props {
	expense: ExpenseResponse;
	index: number;
	className?: string;
}

const ExpenseCard: FC<Props> = ({ expense, index, className }) => {
	const { userContext } = useAuth();
	const { openDeleteExpenseModal } = useExpenses();

	return (
		<div
			className={cn(
				`flex flex-wrap p-3 border-b last:border-b-transparent cursor-pointer hover:bg-gray-200 transition-colors bg-white`,
				className,
			)}
		>
			<span className="flex flex-1">
				<p className="hidden sm:block sm:w-[4%]">{index + 1}</p>
				<span className="w-[72%] sm:w-[68%] sm:flex">
					<p className="w-full sm:w-[59%]">{expense.remark}</p>
					<p className="w-full sm:w-[31%] text-gray-500 sm:text-black text-sm sm:text-base">
						{expense.tagLabel}
					</p>
				</span>
				<p className="w-[26%] text-right">
					{formatToINR(expense.amount)}
				</p>
			</span>
			<span className="w-5 flex justify-end pt-1">
				{userContext?.userId === expense.userId ? (
					<DeleteIcon
						className="text-gray-500 hover:text-red-700"
						onClick={() => openDeleteExpenseModal(expense)}
					/>
				) : (
					<DeleteIcon className="text-gray-300 cursor-not-allowed" />
				)}
			</span>
		</div>
	);
};

export default ExpenseCard;
