import { useState, type FC } from 'react'
import { CreateFolderContext } from './create-folder.context'
import type { Folder } from '@/types/folder'
import apiClient from '@/lib/axios'
import toast from 'react-hot-toast'
import { useFolders } from '@/hooks/folders/use-folders'
import type { IDefaultComponentProps } from '@/interfaces/default-component-props.interface'

export const CreateFolderProvider: FC<IDefaultComponentProps> = ({
	children,
}) => {
	const { addFolder, updateFolder } = useFolders()

	const [folderName, setFolderName] = useState<string>('')
	const [folderNameErr, setFolderNameErr] = useState<string | undefined>(
		undefined,
	)
	const [editFolderId, setEditFolderId] = useState<string | undefined>(
		undefined,
	)
	const [formModal, setFormModal] = useState<boolean>(false)

	const closeForm = () => setFormModal(false)

	const openCreateForm = () => setFormModal(true)

	const openEditForm = (folder: Folder) => setEditFolderId(folder.id)

	const submitForm = () => {
		if (!folderName || folderName.trim() === '' || folderName.length < 3) {
			setFolderNameErr('Folder name must be at least 3 characters long.')
			return
		}
		setFolderNameErr(undefined)

		if (editFolderId) {
			editFolder(editFolderId)
		} else {
			createFolder()
		}
		closeForm()
	}

	const createFolder = async () => {
		const req = apiClient.post('/folders', { name: folderName })

		toast.promise(req, {
			success: 'Folder created successfully!',
			error: 'Failed to create folder.',
			loading: 'Creating folder',
		})

		const res = await req

		const folder = res.data as Folder

		addFolder(folder)
	}

	const editFolder = async (folderId: string) => {
		const req = apiClient.patch(`/folders/${folderId}`, {
			name: folderName,
		})

		toast.promise(req, {
			success: 'Folder updated successfully!',
			error: 'Failed to update folder.',
			loading: 'Updating folder',
		})

		const res = await req

		const folder = res.data as Folder

		updateFolder(folderId, folder)
	}

	return (
		<CreateFolderContext.Provider
			value={{
				folderName,
				formModal,
				closeForm,
				openCreateForm,
				editFolderId,
				openEditForm,
				submitForm,
				setFolderName,
				folderNameErr,
			}}
		>
			{children}
		</CreateFolderContext.Provider>
	)
}
