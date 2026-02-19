import type { Folder } from "@/types/folder";
import { createContext } from "react";

interface ICreateFolderContext {
	formModal: boolean;
	folderName: string;
	isShared: boolean;
	editFolderId?: string;
	folderNameErr?: string;
	deleteFolder?: Folder;
	shareFolder?: Folder;

	addUserModal: boolean;
	deleteConfirmationModal: boolean;

	closeConfirmationForm: (folder: Folder) => void;
	closeAddUserModal: () => void;

	setFolderNameErr: (err: string) => void;
	setFolderName: (name: string) => void;
	setIsShared: (isShared: boolean) => void;
	openCreateForm: () => void;
	closeForm: () => void;

	openEditForm: (folder: Folder) => void;
	openAddUserModal: (folder: Folder) => void;
	openDeleteConfirmationPopUp: (folder: Folder) => void;

	closeDeleteConfirmationPopUp: () => void;

	deleteFolderById: (folderId: string) => void;

	submitForm: () => void;
}

export const CreateFolderContext = createContext<
	ICreateFolderContext | undefined
>(undefined);
