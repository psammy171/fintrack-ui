import { useCallback, useState, type FC } from "react";
import type { IDefaultComponentProps } from "../../../interfaces/default-component-props.interface";
import apiClient from "../../../lib/axios";
import { ExpenseContext } from "./expense.context";
import type { ExpenseResponse } from "@/types/expense";
import type { Folder } from "@/types/folder";

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

	// const selectFolder = (id?: string) => {
	// 	setFolderId(id);

	// 	if (!id) {
	// 		setSharedFolderUsers([]);
	// 		return;
	// 	}

	// 	const folder = folders.find((f) => f.id === id);
	// 	if (!folder) return;

	// 	// if (folder.shared) {
	// 	// 	fetchSharedFolderUsers(id);
	// 	// }
	// };

	// const fetchSharedFolderUsers = async (folderId: string) => {
	// 	try {
	// 		const response = await apiClient.get(
	// 			`/folders/${folderId}/shared-users`,
	// 		);
	// 		setSharedFolderUsers(response.data);
	// 	} catch (error) {
	// 		console.error(
	// 			"Error fetching shared folder users: " +
	// 				(error as Error).message,
	// 		);
	// 	}
	// };

	return (
		<ExpenseContext.Provider
			value={{
				expenses,
				fetching,
				fetchError,
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
				// sharedFolderUsers,
			}}
		>
			{children}
		</ExpenseContext.Provider>
	);
};
