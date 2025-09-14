import CreateFolderIcon from '../shared/icons/create-folder'

const ExpenseFolders = () => {
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
		</div>
	)
}

export default ExpenseFolders
