import { useState, type FC } from "react";
import { CreateFolderContext } from "./create-folder.context";
import type { Folder } from "@/types/folder";
import apiClient from "@/lib/axios";
import toast from "react-hot-toast";
import { useFolders } from "@/hooks/folders/use-folders";
import type { IDefaultComponentProps } from "@/interfaces/default-component-props.interface";
import { useExpenses } from "@/hooks/expenses/use-expenses";

export const CreateFolderProvider: FC<IDefaultComponentProps> = ({
	children,
}) => {
	const {
		addFolder,
		updateFolder,
		deleteFolder: deleteFolderFromList,
	} = useFolders();
	const { folder: currentFolder, setFolder } = useExpenses();

	const [folderName, setFolderName] = useState<string>("");
	const [isShared, setIsShared] = useState<boolean>(false);
	const [folderNameErr, setFolderNameErr] = useState<string | undefined>(
		undefined,
	);
	const [editFolderId, setEditFolderId] = useState<string | undefined>(
		undefined,
	);
	const [formModal, setFormModal] = useState<boolean>(false);

	const [deleteFolder, setDeleteFolder] = useState<Folder | undefined>(
		undefined,
	);
	const [shareFolder, setShareFolder] = useState<Folder | undefined>(
		undefined,
	);
	const [addUserModal, setAddUserModal] = useState<boolean>(false);

	const [deleteConfirmationModal, setDeleteConfirmationModal] =
		useState<boolean>(false);

	const openDeleteConfirmationPopUp = (folder: Folder) => {
		setDeleteFolder(folder);
		setDeleteConfirmationModal(true);
	};

	const closeForm = () => setFormModal(false);

	const openCreateForm = () => {
		setIsShared(false);
		setFolderName("");
		setEditFolderId(undefined);
		setFormModal(true);
	};

	const closeConfirmationForm = () => setDeleteConfirmationModal(false);

	const openEditForm = (folder: Folder) => {
		setEditFolderId(folder.id);
		setFolderName(folder.name);
		setFormModal(true);
	};

	const closeDeleteConfirmationPopUp = (): void =>
		setDeleteConfirmationModal(false);

	const submitForm = () => {
		if (!folderName || folderName.trim() === "" || folderName.length < 3) {
			setFolderNameErr("Folder name must be at least 3 characters long.");
			return;
		}
		setFolderNameErr(undefined);

		if (editFolderId) {
			editFolder(editFolderId);
		} else {
			createFolder();
		}
		closeForm();
	};

	const createFolder = async () => {
		const req = apiClient.post("/folders", {
			name: folderName,
			shared: isShared,
		});

		toast.promise(req, {
			success: "Folder created successfully!",
			error: "Failed to create folder.",
			loading: "Creating folder",
		});

		const res = await req;

		const folder = res.data as Folder;

		addFolder(folder);
	};

	const editFolder = async (folderId: string) => {
		const req = apiClient.patch(`/folders/${folderId}`, {
			name: folderName,
		});

		toast.promise(req, {
			success: "Folder updated successfully!",
			error: "Failed to update folder.",
			loading: "Updating folder",
		});

		const res = await req;

		const folder = res.data as Folder;

		updateFolder(folder.id, folder);
	};

	const deleteFolderById = (folderId: string) => {
		const req = apiClient.delete(`/folders/${folderId}`);

		toast.promise(req, {
			success: "Folder deleted successfully!",
			error: "Failed to delete folder.",
			loading: "Deleting folder",
		});

		if (folderId === currentFolder?.id) {
			setFolder(undefined);
		}

		deleteFolderFromList(folderId);
	};

	const openAddUserModal = (folder: Folder) => {
		setShareFolder(folder);
		setAddUserModal(true);
	};

	const closeAddUserModal = () => setAddUserModal(false);

	return (
		<CreateFolderContext.Provider
			value={{
				addUserModal,
				shareFolder,
				folderName,
				formModal,
				closeForm,
				openCreateForm,
				editFolderId,
				openEditForm,
				submitForm,
				setFolderName,
				folderNameErr,
				setFolderNameErr,
				deleteFolder,
				openDeleteConfirmationPopUp,
				openAddUserModal,
				closeDeleteConfirmationPopUp,
				deleteConfirmationModal,
				closeConfirmationForm,
				closeAddUserModal,
				deleteFolderById,
				isShared,
				setIsShared,
			}}
		>
			{children}
		</CreateFolderContext.Provider>
	);
};
