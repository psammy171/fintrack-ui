import { useState, type FC } from 'react'
import type { Tag } from '../../../types/tag'
import apiClient from '../../../lib/axios'
import toast from 'react-hot-toast'
import type { IDefaultComponentProps } from '../../../interfaces/default-component-props.interface'
import { EditTagContext } from './edit-tag.context'
import { useTags } from '../../../hooks/tags'

export const EditTagProvider: FC<IDefaultComponentProps> = ({ children }) => {
	const { updateTag } = useTags()
	const [editTag, setEditTag] = useState<Tag | undefined>(undefined)
	const [editTagPopup, setEditTagPopup] = useState<boolean>(false)
	const [editTagErr, setEditTagErr] = useState<string | undefined>(undefined)

	const editTagName = (name: string) => {
		setEditTag((tag) => {
			if (tag) {
				return { ...tag, name }
			}
			return tag
		})
	}

	const validateEditForm = () => {
		if (!editTag?.name) {
			setEditTagErr('Tag name is required')
			return false
		}
		if (editTag.name.trim().length < 3) {
			setEditTagErr('Tag name must be at least 3 characters long')
			return false
		}
		setEditTagErr(undefined)
		return true
	}

	const updateTagValue = async () => {
		if (editTag) {
			const isFormValid = validateEditForm()
			if (!isFormValid) return

			setEditTagPopup(false)

			const request = apiClient.patch(`/tags/${editTag.id}`, {
				name: editTag.name,
			})

			toast.promise(request, {
				success: 'Tag updated successfully',
				error: 'Error updating tag',
				loading: 'Updating tag...',
			})

			const response = await request
			const tag = response.data as Tag

			updateTag(tag.id, tag)
		}
	}

	const openEditTagPopup = (tag: Tag) => {
		setEditTagErr(undefined)
		setEditTag(tag)
		setEditTagPopup(true)
	}

	const closeEditTagPopup = () => {
		setEditTagPopup(false)
	}

	return (
		<EditTagContext.Provider
			value={{
				editTag,
				editTagPopup,
				editTagErr,
				editTagName,
				updateTagValue,
				setEditTagErr,
				openEditTagPopup,
				closeEditTagPopup,
			}}
		>
			{children}
		</EditTagContext.Provider>
	)
}
