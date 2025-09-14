import type { Folder } from '@/types/folder'
import type { FC } from 'react'

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
						<div key={folder.id}>{folder.name}</div>
					))}
				</>
			)}
		</>
	)
}

export default ExpenseFolderList
