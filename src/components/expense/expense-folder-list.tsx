import type { Folder } from '@/types/folder'
import type { FC } from 'react'
import FolderIcon from '../shared/icons/folder'
import { useExpenses } from '@/hooks/expenses/use-expenses'

interface Props {
	folders: Folder[]
}

const ExpenseFolderList: FC<Props> = ({ folders }) => {
	const { setFolderId, folderId } = useExpenses()

	return (
		<>
			{folders.length === 0 ? (
				<p className="mt-[20%] text-center">No folders created yet!</p>
			) : (
				<>
					<div
						key={0}
						className={`flex border-b border-l-[3px] p-2 items-center gap-x-4 cursor-pointer ${
							undefined === folderId
								? 'border-l-indigo-600 bg-indigo-100 text-indigo-600 font-semibold'
								: 'border-l-transparent hover:bg-gray-200'
						}`}
						onClick={() => setFolderId(undefined)}
					>
						<FolderIcon />
						Root
					</div>
					{folders.map((folder) => (
						<div
							key={folder.id}
							className={`flex border-b border-l-[3px] p-2 items-center gap-x-4 cursor-pointer ${
								folder.id === folderId
									? 'border-l-indigo-600 bg-indigo-100 text-indigo-600 font-semibold'
									: 'border-l-transparent hover:bg-gray-200'
							}`}
							onClick={() => setFolderId(folder.id)}
						>
							<FolderIcon />
							{folder.name}
						</div>
					))}
				</>
			)}
		</>
	)
}

export default ExpenseFolderList
