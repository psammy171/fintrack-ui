import { createContext } from 'react'
import type { Folder } from '@/types/folder'

interface IFoldersContext {
	fetching: boolean
	fetchError?: string
	folders: Folder[]

	fetchFolders: () => void

	addFolder: (folder: Folder) => void
	updateFolder: (folderId: string, folder: Folder) => void

	setFetching: (isFetching: boolean) => void
	setFetchError: (error: string) => void

	deleteFolder: (folderId: string) => void
}

export const FoldersContext = createContext<IFoldersContext | undefined>(
	undefined,
)
