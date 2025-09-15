import type { Folder } from '@/types/folder'
import { createContext } from 'react'

interface ICreateFolderContext {
	formModal: boolean
	folderName: string
	editFolderId?: string
	folderNameErr?: string

	setFolderNameErr: (err: string) => void
	setFolderName: (name: string) => void
	openCreateForm: () => void
	closeForm: () => void
	openEditForm: (folder: Folder) => void

	submitForm: () => void
}

export const CreateFolderContext = createContext<
	ICreateFolderContext | undefined
>(undefined)
