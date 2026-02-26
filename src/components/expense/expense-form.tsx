import { useCreateExpense } from "../../hooks/expenses/use-create-expense";
import { useTags } from "../../hooks/tags";
import ErrorMessage from "../shared/ui/error-message";
import PopUp from "../shared/ui/pop-up";
import Dropdown from "../shared/ui/dropdown";
import Input from "../shared/ui/input";
import Button from "../shared/ui/button";
import { useState } from "react";
import BackIcon from "../shared/icons/back";
import { useExpenses } from "@/hooks/expenses/use-expenses";
import { useAuth } from "@/auth/hooks/use-auth";

const ExpenseForm = () => {
	const [userShareTab, setUserShareTab] = useState(false);

	const { folder } = useExpenses();
	const {
		createExpense,
		setExpenseValue,
		closeCreateExpensePopUp,
		createExpensePopUp,
		expenseError,
		setExpensePropertyError,
		createExpenseApi,
		validateFirstForm,
		validateSecondForm,
		preFillUserShares,
		updateUserShares,
	} = useCreateExpense();

	const { tags } = useTags();
	const { userContext } = useAuth();

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const isFirstFormValid = validateFirstForm();
		if (!isFirstFormValid) return;

		if (folder && folder.shared) {
			if (!userShareTab) {
				if (userContext) {
					setExpenseValue("paidBy", userContext);
				}
				preFillUserShares(folder);
				setUserShareTab(true);
				return;
			}

			const isSecondFormValid = validateSecondForm();
			if (!isSecondFormValid) return;
		}

		createExpenseApi();
		setUserShareTab(false);
	};

	return (
		<PopUp
			open={createExpensePopUp}
			close={() => {
				closeCreateExpensePopUp();
				setUserShareTab(false);
			}}
		>
			<form
				className="relative flex overflow-hidden"
				onSubmit={onSubmitHandler}
			>
				<div
					className={`flex shrink-0 flex-col p-1 transform transition-transform top-0 w-full h-full duration-200 ${userShareTab ? "-translate-x-full" : ""}`}
				>
					<h2 className="text-lg font-semibold mb-1">Add Expense</h2>
					<label className="text-[12px]">Remark</label>
					<Input
						type="text"
						value={createExpense.remark}
						placeholder="Dinner at bluestone"
						onFocus={() =>
							setExpensePropertyError("remarkError", "")
						}
						onChange={(e) =>
							setExpenseValue("remark", e.target.value)
						}
					/>
					{expenseError.remarkError && (
						<ErrorMessage errorMessage={expenseError.remarkError} />
					)}

					<label className="text-[12px] mt-4">Amount</label>
					<Input
						type="number"
						value={createExpense.amount}
						placeholder="1345"
						onFocus={() =>
							setExpensePropertyError("amountError", "")
						}
						onChange={(e) =>
							setExpenseValue("amount", e.target.value)
						}
					/>
					{expenseError.amountError && (
						<ErrorMessage errorMessage={expenseError.amountError} />
					)}

					<label className="text-[12px] mt-4">Date</label>
					<Input
						type="date"
						value={createExpense.date}
						onChange={(e) => {
							const value = e.target.value
								? new Date(e.target.value)
										.toISOString()
										.split("T")[0]
								: "";
							setExpenseValue("date", value);
						}}
						onFocus={() => setExpensePropertyError("dateError", "")}
					/>
					{expenseError.dateError && (
						<ErrorMessage errorMessage={expenseError.dateError} />
					)}
					<label className="text-[12px] mt-4">Tag</label>
					<Dropdown
						options={tags.map((tag) => ({
							option: tag.name,
							...tag,
						}))}
						value={
							createExpense.tag
								? {
										option: createExpense.tag.name,
										...createExpense.tag,
									}
								: undefined
						}
						onChange={(value) => {
							const tagValue = tags.find(
								(tag) => tag.id === value.id,
							);
							if (tagValue) setExpenseValue("tag", tagValue);
							setExpensePropertyError("tagError", "");
						}}
					/>
					{expenseError.tagError && (
						<ErrorMessage errorMessage={expenseError.tagError} />
					)}
					<Button className="mt-6 mx-0">
						{folder && folder.shared ? "Add User Shares" : "Add"}
					</Button>
				</div>
				<div
					className={`p-1 shrink-0 top-0 h-full w-full transform transition-transform duration-200 ${userShareTab ? "-translate-x-full" : ""}`}
				>
					<span className="flex items-center gap-x-4">
						<BackIcon
							className="cursor-pointer"
							onClick={() => setUserShareTab(false)}
						/>{" "}
						<h2 className="text-lg font-semibold mb-1">
							User Shares
						</h2>
					</span>

					<label className="text-[12px] mt-4">Paid By</label>
					<Dropdown
						options={
							folder?.sharedUsers
								? folder.sharedUsers.map((user) => ({
										id: user.userId,
										option:
											user.firstName +
											" " +
											user.lastName,
									}))
								: []
						}
						onChange={(value) => {
							const userValue = folder?.sharedUsers?.find(
								(user) => user.userId === value.id,
							);

							if (userValue) setExpenseValue("paidBy", userValue);
						}}
						value={
							createExpense.paidBy
								? {
										id: createExpense.paidBy.userId,
										option:
											createExpense.paidBy.firstName +
											" " +
											createExpense.paidBy.lastName,
									}
								: undefined
						}
					/>
					{expenseError.paidByError && (
						<ErrorMessage errorMessage={expenseError.paidByError} />
					)}

					<div className="mt-4">
						<label className="text-[12px]">User Shares</label>
					</div>
					<div className="border border-gray-200 rounded-sm">
						{createExpense.userShares?.map((userShare) => (
							<div
								key={userShare.userId}
								className="flex p-2 gap-x-4 items-center border-b last:border-b-0"
							>
								<p className="grow-1">
									{userShare.firstName} {userShare.lastName}
								</p>
								<input
									type="number"
									value={userShare.amount}
									onChange={(e) =>
										updateUserShares(
											userShare.userId,
											parseInt(e.target.value),
										)
									}
									className="border border-gray-200 p-1 rounded-sm w-24"
									onFocus={() =>
										setExpensePropertyError(
											"userSharesError",
											"",
										)
									}
								/>
							</div>
						))}
					</div>
					{expenseError.userSharesError && (
						<ErrorMessage
							errorMessage={expenseError.userSharesError}
						/>
					)}
					<Button className="mt-6 mx-0 w-full">Add</Button>
				</div>
			</form>
		</PopUp>
	);
};

export default ExpenseForm;
