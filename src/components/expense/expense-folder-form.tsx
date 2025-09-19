import { useCreateFolders } from '@/hooks/folders/use-create-folder'
import PopUp from '../shared/ui/pop-up'
import type { FormEvent } from 'react'
import Input from '../shared/ui/input'
import Button from '../shared/ui/button'

const ExpenseFolderForm = () => {
	const {
		formModal,
		closeForm,
		editFolderId,
		submitForm,
		folderName,
		folderNameErr,
		setFolderName,
		setFolderNameErr,
	} = useCreateFolders()

	const submitHandler = (e: FormEvent) => {
		e.preventDefault()
		submitForm()
	}

	return (
		<PopUp
			open={formModal}
			close={closeForm}
			title={editFolderId ? 'Edit Folder' : 'Create Folder'}
		>
			<form onSubmit={submitHandler} className="flex flex-col">
				<label htmlFor="folderName" className="text-[13px]">
					Folder Name
				</label>
				<Input
					type="text"
					id="folderName"
					name="folderName"
					value={folderName}
					placeholder="Fuel"
					onFocus={() => setFolderNameErr('')}
					onChange={(e) => setFolderName(e.target.value)}
				/>
				{folderNameErr && (
					<p className="text-red-800 text-right text-[13px]">
						{folderNameErr}
					</p>
				)}
				<Button className="mx-0 mt-4" type="submit">
					{editFolderId ? 'Update Folder' : 'Create Folder'}
				</Button>
			</form>
		</PopUp>
	)
}

export default ExpenseFolderForm
