import { useExpenses } from "@/hooks/expenses/use-expenses";
import Button from "../shared/ui/button";
import PopUp from "../shared/ui/pop-up";

const DeleteExpenseModal = () => {
	const {
		deleteExpense,
		deleteExpenseModal,
		closeDeleteExpenseModal,
		deleteExpenseById,
	} = useExpenses();

	const deleteExpenseHandler = () => {
		if (deleteExpense) {
			deleteExpenseById(deleteExpense.id);
			closeDeleteExpenseModal();
		}
	};

	return (
		<PopUp
			open={deleteExpenseModal}
			close={closeDeleteExpenseModal}
			title="Delete Expense"
			className="w-[90%] sm:w-[400px]"
		>
			<div>
				<p>Are you sure you want to delete this expense?</p>
				<span className="flex justify-end gap-2 mt-4">
					<Button variant="ghost" onClick={closeDeleteExpenseModal}>
						Cancel
					</Button>
					<Button variant="error" onClick={deleteExpenseHandler}>
						Delete
					</Button>
				</span>
			</div>
		</PopUp>
	);
};

export default DeleteExpenseModal;
