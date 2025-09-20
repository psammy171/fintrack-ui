import type { Folder } from '@/types/folder'
import { createContext } from 'react'

interface ICreateFolderContext {
	formModal: boolean
	folderName: string
	editFolderId?: string
	folderNameErr?: string
	deleteFolder?: Folder

	deleteConfirmationModal: boolean

	closeConfirmationForm: (folder: Folder) => void

	setFolderNameErr: (err: string) => void
	setFolderName: (name: string) => void
	openCreateForm: () => void
	closeForm: () => void
	openEditForm: (folder: Folder) => void

	openDeleteConfirmationPopUp: (folder: Folder) => void

	closeDeleteConfirmationPopUp: () => void

	deleteFolderById: (folderId: string) => void

	submitForm: () => void
}

export const CreateFolderContext = createContext<
	ICreateFolderContext | undefined
>(undefined)
