import { useCallback, useEffect, useState, type FC } from "react";
import type { IDefaultComponentProps } from "../../../interfaces/default-component-props.interface";
import apiClient from "../../../lib/axios";
import { FoldersContext } from "./folders.context";
import type { Folder } from "@/types/folder";
import { useExpenses } from "@/hooks/expenses/use-expenses";

export const FoldersProvider: FC<IDefaultComponentProps> = ({ children }) => {
	const [folders, setFolders] = useState<Folder[]>([]);
	const [fetching, setFetching] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<string | undefined>(undefined);

	const [ownFolders, setOwnFolders] = useState<Folder[]>([]);

	const { folder } = useExpenses();

	useEffect(() => {
		const fetchSharedFolderUsers = async () => {
			if (!folder || !folder.shared || folder.sharedUsers) {
				return;
			}

			try {
				const response = await apiClient.get(
					`/folders/${folder.id}/shared-users`,
				);

				folder.sharedUsers = response.data.data;
			} catch (error) {
				console.error(
					"Error fetching shared folder users : " +
						(error as Error).message,
				);
			}
		};

		fetchSharedFolderUsers();
	}, [folder, folders]);

	const fetchFolders = useCallback(async () => {
		setFetching(true);
		try {
			const response = await apiClient.get("/folders");
			setFolders(response.data);
		} catch (error) {
			setFetchError("Error fetching tags : " + (error as Error).message);
		} finally {
			setFetching(false);
		}
	}, []);

	const fetchOwnFolders = useCallback(async () => {
		try {
			const response = await apiClient.get("/folders", {
				params: { scope: "owned" },
			});
			setOwnFolders(response.data);
		} catch (error) {
			setFetchError(
				"Error fetching own folders : " + (error as Error).message,
			);
		}
	}, []);

	const addFolder = (folder: Folder) => {
		setFolders((prevFolders) => [...prevFolders, folder]);
	};

	const updateFolder = (folderId: string, folder: Folder) => {
		setFolders((prevFolders) =>
			prevFolders.map((f) =>
				f.id === folderId ? { ...f, ...folder } : f,
			),
		);
	};

	const deleteFolder = (folderId: string): void => {
		setFolders((folders) =>
			folders.filter((folder) => folder.id !== folderId),
		);
	};

	return (
		<FoldersContext.Provider
			value={{
				ownFolders,
				folders,
				fetching,
				fetchError,
				fetchFolders,
				fetchOwnFolders,
				addFolder,
				updateFolder,
				setFetchError,
				setFetching,
				deleteFolder,
			}}
		>
			{children}
		</FoldersContext.Provider>
	);
};
