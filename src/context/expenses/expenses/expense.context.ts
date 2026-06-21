import { createContext } from "react";
import type { Folder } from "@/types/folder";
import type { Settlement } from "@/types/settlements";
import type { ExpensesByDate } from "@/types/expense-by-date";

interface IExpenseContext {
	fetching: boolean;
	fetchError?: string;
	expenses: ExpensesByDate[];
	total: number;
	pageNumber: number;
	isLastPage: boolean;
	isFirstPage: boolean;
	totalPages: number;
	pageSize: number;
	folder?: Folder;
	settlements: Settlement[];
	showSettlements: boolean;
	isFolderSection: boolean;

	fetchExpenses: () => void;
	fetchSettlements: (folder?: Folder) => void;
	setShowSettlements: (show: boolean) => void;
	resolveSettlement: (folderId: string, userId: string) => void;

	setIsFolderSection: (value: boolean) => void;

	setFetching: (isFetching: boolean) => void;
	setFetchError: (error: string) => void;
	setFolder: (folder?: Folder) => void;

	nextPage: () => void;
	prevPage: () => void;
}

export const ExpenseContext = createContext<IExpenseContext | undefined>(
	undefined,
);
