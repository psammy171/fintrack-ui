import { useContext } from 'react'
import { CreateFolderContext } from '@/context/folder/create-folder'

export const useCreateFolders = () => {
	const context = useContext(CreateFolderContext)
	if (!context) {
		throw new Error(
			'useCreateFolders must be used within a CreateFolderProvider',
		)
	}
	return context
}
