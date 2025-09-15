import type { Folder } from '@/types/folder'
import type { FC } from 'react'
import FolderIcon from '../shared/icons/folder'

interface Props {
	folders: Folder[]
}

const ExpenseFolderList: FC<Props> = ({ folders }) => {
	return (
		<>
			{folders.length === 0 ? (
				<p className="mt-[20%] text-center">No folders created yet!</p>
			) : (
				<>
					{folders.map((folder) => (
						<div
							key={folder.id}
							className="flex border-b p-2 items-center gap-x-4 cursor-pointer hover:bg-gray-200"
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
