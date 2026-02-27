import { createContext } from "react";
import type { ExpenseResponse } from "@/types/expense";
import type { Folder } from "@/types/folder";
import type { Settlement } from "@/types/settlements";

interface IExpenseContext {
	fetching: boolean;
	fetchError?: string;
	expenses: ExpenseResponse[];
	total: number;
	pageNumber: number;
	isLastPage: boolean;
	isFirstPage: boolean;
	totalPages: number;
	pageSize: number;
	folder?: Folder;
	settlements: Settlement[];
	showSettlements: boolean;

	fetchExpenses: () => void;
	fetchSettlements: (folder?: Folder) => void;
	setShowSettlements: (show: boolean) => void;
	resolveSettlement: (folderId: string, userId: string) => void;

	addExpense: (expense: ExpenseResponse) => void;
	updateExpense: (expenseId: string, expense: ExpenseResponse) => void;

	setFetching: (isFetching: boolean) => void;
	setFetchError: (error: string) => void;
	setFolder: (folder?: Folder) => void;

	nextPage: () => void;
	prevPage: () => void;
}

export const ExpenseContext = createContext<IExpenseContext | undefined>(
	undefined,
);
