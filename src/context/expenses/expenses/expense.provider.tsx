import { useCallback, useState, type FC } from "react";
import type { IDefaultComponentProps } from "../../../interfaces/default-component-props.interface";
import apiClient from "../../../lib/axios";
import { ExpenseContext } from "./expense.context";
import type { ExpenseResponse } from "@/types/expense";
import type { Folder } from "@/types/folder";
import type { Settlement } from "@/types/settlements";

export const ExpenseProvider: FC<IDefaultComponentProps> = ({ children }) => {
	const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
	const [fetching, setFetching] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<string | undefined>(undefined);
	const [pageNumber, setPageNumber] = useState<number>(0);
	const [pageSize] = useState<number>(50);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);
	const [isLastPage, setIsLastPage] = useState<boolean>(false);
	const [isFirstPage, setIsFirstPage] = useState<boolean>(true);
	const [folder, setFolder] = useState<Folder | undefined>(undefined);

	const [settlements, setSettlements] = useState<Settlement[]>([]);

	const fetchExpenses = useCallback(async () => {
		setFetching(true);
		try {
			const response = await apiClient.get("/expenses", {
				params: {
					pageNumber,
					pageSize,
					folderId: folder?.id,
				},
			});

			const data = response.data;
			setExpenses(data.content);
			setIsFirstPage(data.first);
			setIsLastPage(data.last);
			setTotal(data.totalElements);
			setTotalPages(data.totalPages);
		} catch (error) {
			setFetchError(
				"Error fetching expenses : " + (error as Error).message,
			);
		} finally {
			setFetching(false);
		}
	}, [pageNumber, pageSize, folder]);

	const nextPage = () => {
		if (!isLastPage) setPageNumber((prevPage) => prevPage + 1);
	};

	const prevPage = () => {
		if (!isFirstPage)
			setPageNumber((prevPage) => Math.max(prevPage - 1, 0));
	};

	const addExpense = (expense: ExpenseResponse) => {
		setExpenses((prevExpenses) => [...prevExpenses, expense]);
	};

	const updateExpense = (expenseId: string, expense: ExpenseResponse) => {
		setExpenses((prevExpenses) =>
			prevExpenses.map((e) =>
				e.id === expenseId ? { ...e, ...expense } : e,
			),
		);
	};

	const fetchSettlements = async (folder?: Folder) => {
		if (!folder || !folder.shared) return;
		try {
			const response = await apiClient.get(
				`/folders/${folder.id}/settlements`,
			);
			const data = response.data;
			setSettlements(data.settlements);
		} catch (error: unknown) {
			console.error(
				"Error fetching settlements : " + (error as Error).message,
			);
		}
	};

	return (
		<ExpenseContext.Provider
			value={{
				expenses,
				fetching,
				fetchError,
				settlements,
				fetchExpenses,
				addExpense,
				updateExpense,
				setFetchError,
				setFetching,
				nextPage,
				prevPage,
				pageNumber,
				isLastPage,
				isFirstPage,
				total,
				totalPages,
				pageSize,
				folder,
				setFolder,
				fetchSettlements,
			}}
		>
			{children}
		</ExpenseContext.Provider>
	);
};
