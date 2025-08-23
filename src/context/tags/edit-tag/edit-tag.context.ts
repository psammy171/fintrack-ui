import { createContext } from 'react'
import type { Tag } from '../../../types/tag'

interface IEditTagContext {
	editTag?: Tag
	editTagPopup: boolean
	editTagErr?: string

	editTagName: (value: string) => void
	updateTagValue: () => void

	setEditTagErr: (value: string) => void

	openEditTagPopup: (tag: Tag) => void
	closeEditTagPopup: () => void
}

export const EditTagContext = createContext<IEditTagContext | undefined>(
	undefined,
)
