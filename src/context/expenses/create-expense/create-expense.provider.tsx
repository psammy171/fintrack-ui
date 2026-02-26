import { useState, type FC } from "react";
import {
	CreateExpenseContext,
	type ExpenseError,
} from "./create-expense.context";
import type { IDefaultComponentProps } from "../../../interfaces/default-component-props.interface";
import type { CreateExpense } from "../../../types/create-expense";
import type { Tag } from "../../../types/tag";
import apiClient from "@/lib/axios";
import toast from "react-hot-toast";
import { useExpenses } from "@/hooks/expenses/use-expenses";
import type { PublicUser } from "@/types/public-user";
import type { Folder } from "@/types/folder";
import type { UserShareAmount } from "@/types/user-share-amount";
import type { CreateExpensePayload } from "@/types/create-expense-payload";

export const CreateExpenseProvider: FC<IDefaultComponentProps> = ({
	children,
}) => {
	const { addExpense, folder } = useExpenses();
	const [createExpense, setCreateExpense] = useState<CreateExpense>({
		remark: "",
		amount: 0,
		date: new Date().toISOString().split("T")[0],
	});
	const [createExpensePopUp, setCreateExpensePopUp] =
		useState<boolean>(false);
	const [expenseError, setExpenseError] = useState<ExpenseError>({
		remarkError: "",
		amountError: "",
		dateError: "",
		tagError: "",
	});

	const openCreateExpensePopUp = () => {
		setExpenseError({
			remarkError: "",
			amountError: "",
			dateError: "",
			tagError: "",
		});
		setCreateExpense({
			remark: "",
			amount: 0,
			date: new Date().toISOString().split("T")[0],
		});
		setCreateExpensePopUp(true);
	};

	const validateFirstForm = (): boolean => {
		if (!createExpense.remark || createExpense.remark.trim().length < 3) {
			setExpensePropertyError(
				"remarkError",
				"Remark must be at least 3 characters long",
			);
			return false;
		}
		if (!createExpense.amount || isNaN(createExpense.amount)) {
			setExpensePropertyError(
				"amountError",
				"Amount must be a valid number",
			);
			return false;
		}
		if (!createExpense.date || createExpense.date.trim().length !== 10) {
			setExpensePropertyError("dateError", "Date must be a valid date");
			return false;
		}
		const date = new Date(createExpense.date);
		if (isNaN(date.getTime())) {
			setExpensePropertyError("dateError", "Date must be a valid date");
			return false;
		}
		if (!createExpense.tag) {
			setExpensePropertyError("tagError", "Tag must be selected");
			return false;
		}

		return true;
	};

	const validateSecondForm = (): boolean => {
		if (folder && folder.shared) {
			if (!createExpense.paidBy) {
				setExpensePropertyError(
					"paidByError",
					"Paid By must be selected",
				);
				return false;
			}

			const shareSum =
				createExpense.userShares?.reduce(
					(sum, userShare) => sum + userShare.amount,
					0,
				) || 0;

			if (Number(shareSum) !== Number(createExpense.amount)) {
				setExpensePropertyError(
					"userSharesError",
					`User shares must sum to the total amount ${parseInt(createExpense.amount.toString())}`,
				);
				return false;
			}
		}

		return true;
	};

	const resetForm = () => {
		setExpenseError({
			remarkError: "",
			amountError: "",
			dateError: "",
			tagError: "",
		});
		setCreateExpense({
			remark: "",
			amount: 0,
			date: new Date().toISOString().split("T")[0],
			tag: {} as Tag,
		});
	};

	const createExpenseApi = async () => {
		const isFormValid = validateFirstForm() && validateSecondForm();
		if (isFormValid) {
			const payLoad: CreateExpensePayload = {
				remark: createExpense.remark,
				amount: createExpense.amount,
				time: new Date(createExpense.date).toISOString(),
				tagId: createExpense.tag!.id,
				folderId: folder?.id,
			};

			if (folder && folder.shared) {
				payLoad["paidBy"] = createExpense.paidBy!.userId;
				payLoad["userShares"] = createExpense
					.userShares!.map((userShare) => ({
						userId: userShare.userId,
						amount: userShare.amount,
					}))
					.filter((share) => share.amount > 0);
			}

			try {
				const req = apiClient.post("/expenses", payLoad);
				closeCreateExpensePopUp();
				toast.promise(req, {
					loading: "Creating expense...",
					success: "Expense created successfully!",
					error: "Error creating expense",
				});
				const res = await req;
				addExpense(res.data);
				resetForm();
			} catch (error) {
				console.error("Error creating expense:", error);
			}
		}
	};

	const closeCreateExpensePopUp = () => {
		setCreateExpensePopUp(false);
	};

	const setExpensePropertyError = (
		key: keyof ExpenseError,
		value: string,
	) => {
		setExpenseError({
			...expenseError,
			[key]: value,
		});
	};

	const clearExpensePropertyError = (key: keyof ExpenseError) => {
		setExpenseError({
			...expenseError,
			[key]: "",
		});
	};

	const setExpenseValue = (
		key: keyof CreateExpense,
		value: string | number | Tag | Date | PublicUser | UserShareAmount[],
	) => {
		console.log("Setting expense value:", key, value);
		setCreateExpense((prevValue) => ({
			...prevValue,
			[key]: value,
		}));
	};

	const preFillUserShares = (folder?: Folder) => {
		if (folder && folder.shared && folder.sharedUsers) {
			const userShares: (PublicUser & { amount: number })[] = [];

			let totalAmount = 0;
			const userCount = folder.sharedUsers.length;

			for (let i = 0; i < userCount; i++) {
				if (i === folder.sharedUsers.length - 1) {
					const user = folder.sharedUsers[i];
					const amount = createExpense.amount - totalAmount;
					userShares.push({
						...user,
						amount,
					});
				} else {
					const user = folder.sharedUsers[i];
					const amount = Number(
						Math.floor(createExpense.amount / userCount),
					);
					totalAmount += amount;

					userShares.push({
						...user,
						amount,
					});
				}
			}

			setExpenseValue("userShares", userShares);
		}
	};

	const updateUserShares = (userId: string, amount: number) => {
		const updatedShares = createExpense.userShares?.map((share) => {
			if (share.userId === userId) {
				return { ...share, amount };
			}
			return share;
		});
		setExpenseValue("userShares", updatedShares || []);
	};

	return (
		<CreateExpenseContext.Provider
			value={{
				createExpense,
				createExpensePopUp,
				expenseError,
				openCreateExpensePopUp,
				closeCreateExpensePopUp,
				setExpenseValue,
				setExpensePropertyError,
				clearExpensePropertyError,
				createExpenseApi,
				validateFirstForm,
				validateSecondForm,
				preFillUserShares,
				updateUserShares,
			}}
		>
			{children}
		</CreateExpenseContext.Provider>
	);
};
