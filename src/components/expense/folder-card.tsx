import type { Folder } from '@/types/folder'
import { useEffect, useState, type FC } from 'react'
import FolderIcon from '../shared/icons/folder'
import { useExpenses } from '@/hooks/expenses/use-expenses'
import EditIcon from '../shared/icons/edit'
import { useCreateFolders } from '@/hooks/folders/use-create-folder'

interface Props {
	folder: Folder
}

const FolderCard: FC<Props> = ({ folder }) => {
	const { setFolderId, folderId } = useExpenses()
	const { openEditForm } = useCreateFolders()
	const [showOptions, setShowOptions] = useState(false)

	const closeOptions = () => setShowOptions(false)

	useEffect(() => {
		if (showOptions) {
			document.addEventListener('click', closeOptions)
		} else {
			document.removeEventListener('click', closeOptions)
		}
	}, [showOptions])

	return (
		<div
			key={folder.id}
			className={`flex group border-b border-l-[3px] p-2 items-center gap-x-2 cursor-pointer ${
				folder.id === folderId
					? 'border-l-indigo-600 bg-indigo-100 text-indigo-600 font-semibold'
					: 'border-l-transparent hover:bg-gray-200'
			}`}
			onClick={() => setFolderId(folder.id)}
		>
			<FolderIcon />
			<span className="flex-1 truncate text-ellipsis" title={folder.name}>
				{folder.name}
			</span>
			<EditIcon
				className="text-blue-700 hidden group-hover:block"
				onClick={(e) => {
					e.stopPropagation()
					openEditForm(folder)
				}}
			/>
			{/* <DeleteIcon className="text-red-800 hidden group-hover:block" /> */}
		</div>
	)
}

export default FolderCard
