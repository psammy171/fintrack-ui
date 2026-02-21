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

const Expenses = () => {
	const { folder } = useExpenses();
	const { fetchFolders } = useFolders();
	const { fetchUserOrSharedFolderTags } = useTags();
	const { openCreateExpensePopUp } = useCreateExpense();

	useEffect(() => {
		fetchFolders();
	}, [fetchFolders]);

	useEffect(() => {
		fetchUserOrSharedFolderTags(folder);
	}, [fetchUserOrSharedFolderTags, folder]);

	return (
		<div className="mx-auto pt-13 h-full overflow-hidden overflow-y-scroll flex flex-col">
			<span className="flex items-center mt-4 mx-4">
				<p className="text-2xl font-semibold">All your expenses here</p>
				<span className="flex-grow"></span>
				<Button onClick={openCreateExpensePopUp}>Add Expense</Button>
			</span>

			<div className=" rounded-xs overflow-hidden m-4 shadow-md flex-grow bg-gray-50 relative flex flex-row justify-start">
				<ExpenseFolders />
				<ExpenseList className="flex-grow" />
			</div>

			<ExpenseForm />

			<ExpensePagination />
		</div>
	);
};

export default Expenses;
