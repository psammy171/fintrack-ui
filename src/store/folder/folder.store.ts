import apiClient from "@/lib/axios";
import type { Folder } from "@/types/folder";
import type { PublicUser } from "@/types/public-user";
import { create } from "zustand";

interface ExitFolderState {
	folder?: Folder;
	folderUsers: PublicUser[];
	deleteFolderModal: boolean;
	setFolderToExit: (folder: Folder) => Promise<void>;
	setDeleteFolderModal: (deleteFolderModal: boolean) => void;
}

export const useExitFolder = create<ExitFolderState>((set) => ({
	folder: undefined,
	folderUsers: [],
	deleteFolderModal: false,
	setFolderToExit: async (folder) => {
		const response = await apiClient.get<{ data: PublicUser[] }>(
			`folders/${folder.id}/shared-users`,
		);
		set({
			folder,
			deleteFolderModal: true,
			folderUsers: response.data.data,
		});
	},
	setDeleteFolderModal: (deleteFolderModal) => set({ deleteFolderModal }),
}));
