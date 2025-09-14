import { useCallback, useState, type FC } from 'react'
import type { IDefaultComponentProps } from '../../../interfaces/default-component-props.interface'
import apiClient from '../../../lib/axios'
import { FoldersContext } from './folders.context'
import type { Folder } from '@/types/folder'

export const FoldersProvider: FC<IDefaultComponentProps> = ({ children }) => {
	const [folders, setFolders] = useState<Folder[]>([])
	const [fetching, setFetching] = useState<boolean>(false)
	const [fetchError, setFetchError] = useState<string | undefined>(undefined)

	const fetchFolders = useCallback(async () => {
		setFetching(true)
		try {
			if (folders.length > 0) return
			const response = await apiClient.get('/folders')
			setFolders(response.data)
		} catch (error) {
			setFetchError('Error fetching tags : ' + (error as Error).message)
		} finally {
			setFetching(false)
		}
	}, [folders.length])

	const addFolder = (folder: Folder) => {
		setFolders((prevFolders) => [...prevFolders, folder])
	}

	const updateFolder = (folderId: string, folder: Folder) => {
		setFolders((prevFolders) =>
			prevFolders.map((f) =>
				f.id === folderId ? { ...f, ...folder } : folder,
			),
		)
	}

	return (
		<FoldersContext.Provider
			value={{
				folders,
				fetching,
				fetchError,
				fetchFolders,
				addFolder,
				updateFolder,
				setFetchError,
				setFetching,
			}}
		>
			{children}
		</FoldersContext.Provider>
	)
}
