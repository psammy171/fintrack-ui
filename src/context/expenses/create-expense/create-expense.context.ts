import { createContext } from "react";
import type { CreateExpense } from "../../../types/create-expense";
import type { Tag } from "../../../types/tag";
import type { Folder } from "@/types/folder";
import type { UserShareAmount } from "@/types/user-share-amount";
import type { PublicUser } from "@/types/public-user";

export interface ExpenseError {
	remarkError: string;
	amountError: string;
	dateError: string;
	tagError: string;
	paidByError?: string;
	userSharesError?: string;
}

interface ICreateExpenseContext {
	createExpense: CreateExpense;
	createExpensePopUp: boolean;
	expenseError: ExpenseError;

	openCreateExpensePopUp: () => void;
	closeCreateExpensePopUp: () => void;

	preFillUserShares: (folder?: Folder) => void;

	setExpensePropertyError: (key: keyof ExpenseError, value: string) => void;
	clearExpensePropertyError: (key: keyof ExpenseError) => void;

	createExpenseApi: () => Promise<void>;
	validateFirstForm: () => boolean;
	validateSecondForm: () => boolean;
	updateUserShares: (userId: string, amount: number) => void;

	setExpenseValue: (
		key: keyof CreateExpense,
		value: string | number | Tag | Date | PublicUser | UserShareAmount[],
	) => void;
}

export const CreateExpenseContext = createContext<
	ICreateExpenseContext | undefined
>(undefined);
