import type { FormEvent } from 'react'
import { useEditTag } from '../../hooks/tags'
import PopUp from '../shared/ui/pop-up'
import Input from '../shared/ui/input'
import Button from '../shared/ui/button'

const EditTagModal = () => {
	const {
		editTagPopup,
		closeEditTagPopup,
		editTag,
		editTagName,
		editTagErr,
		setEditTagErr,
		updateTagValue,
	} = useEditTag()

	const editTagHandler = (e: FormEvent) => {
		e.preventDefault()
		updateTagValue()
	}

	return (
		<PopUp
			open={editTagPopup}
			close={closeEditTagPopup}
			title="Edit Tag Value"
		>
			<form onSubmit={editTagHandler} className="flex flex-col">
				<label className="text-[13px]" htmlFor="edit-tag">
					Tag
				</label>
				<Input
					id="edit-tag"
					value={editTag?.name || ''}
					onFocus={() => setEditTagErr('')}
					onChange={(e) => editTagName(e.target.value)}
				/>
				{editTagErr && (
					<p className="text-red-800 text-right text-[13px]">
						{editTagErr}
					</p>
				)}
				<Button className="mt-4 mx-0">Update</Button>
			</form>
		</PopUp>
	)
}

export default EditTagModal
