import { useFolders } from '@/hooks/folders/use-folders'
import CreateFolderIcon from '../shared/icons/create-folder'
import { useEffect } from 'react'
import Loader from '../shared/ui/loader'
import ExpenseFolderList from './expense-folder-list'

const ExpenseFolders = () => {
	const { fetchFolders, fetching, folders } = useFolders()

	useEffect(() => {
		fetchFolders()
	}, [fetchFolders])

	return (
		<div className="w-44 border-r bg-gray-100">
			<span className="bg-indigo-600 w-full py-2 text-[18px] px-2 text-white flex justify-between items-center">
				<p className="font-semibold">Folders</p>
				<span
					className="mr-2 hover:bg-gray-100/20 rounded-md cursor-pointer"
					title="Create Folder"
				>
					<CreateFolderIcon className="m-1" />
				</span>
			</span>

			{fetching ? (
				<span className="w-full flex justify-center mt-[20%]">
					<Loader />
				</span>
			) : (
				<ExpenseFolderList folders={folders} />
			)}
		</div>
	)
}

export default ExpenseFolders
