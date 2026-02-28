import ExpenseList from "@/components/expense/expense-list";
import ExpenseForm from "../components/expense/expense-form";
import { useCreateExpense } from "../hooks/expenses/use-create-expense";
import Button from "@/components/shared/ui/button";
import ExpensePagination from "@/components/expense/expense-pagination";
import ExpenseFolders from "@/components/expense/expense-folders";
import { useEffect } from "react";
import { useFolders } from "@/hooks/folders/use-folders";
import { useTags } from "@/hooks/tags";
import { useExpenses } from "@/hooks/expenses/use-expenses";
import Settlements from "@/components/expense/settlements";
import BackIcon from "@/components/shared/icons/back";

const Expenses = () => {
	const {
		folder,
		fetchSettlements,
		setShowSettlements,
		isFolderSection,
		setIsFolderSection,
	} = useExpenses();
	const { fetchFolders } = useFolders();
	const { fetchUserOrSharedFolderTags } = useTags();
	const { openCreateExpensePopUp } = useCreateExpense();

	useEffect(() => {
		fetchFolders();
	}, [fetchFolders]);

	useEffect(() => {
		fetchUserOrSharedFolderTags(folder);
	}, [fetchUserOrSharedFolderTags, folder]);

	useEffect(() => {
		fetchSettlements(folder);
	}, [folder]);

	return (
		<div className="mx-auto pt-13 h-full overflow-hidden overflow-y-scroll flex flex-col">
			<span className="flex items-center mt-4 mx-4">
				{!isFolderSection && (
					<BackIcon
						className="sm:hidden shrink-0 mr-2 cursor-pointer"
						onClick={() => setIsFolderSection(true)}
					/>
				)}
				<p className="text-2xl font-semibold">Expenses</p>
				<span className="flex-grow"></span>
				{folder && folder.shared && (
					<Button onClick={() => setShowSettlements(true)}>
						Settlements
					</Button>
				)}
				<Button onClick={openCreateExpensePopUp}>Add Expense</Button>
			</span>

			<div className="rounded-xs overflow-hidden m-2 sm:m-4 shadow-md flex-grow bg-gray-50 relative sm:flex flex-row justify-start">
				<ExpenseFolders
					className={`absolute sm:relative w-full transition-all duration-200 ${isFolderSection ? "right-0 top-0 bottom-0" : " right-full sm:right-0 top-0 bottom-0"}`}
				/>
				<ExpenseList
					className={`absolute flex-grow sm:relative transition-all duration-200 ${isFolderSection ? "left-full -right-full sm:left-0 sm:right-0 top-0 bottom-0" : "right-0  top-0 bottom-0"}`}
				/>
			</div>

			<ExpenseForm />
			<Settlements />

			<ExpensePagination />
		</div>
	);
};

export default Expenses;
