import { useContext } from 'react'
import { EditTagContext } from '../../context/tags/edit-tag'

export const useEditTag = () => {
	const context = useContext(EditTagContext)
	if (!context) {
		throw new Error('useEditTag must be used within a EditTagProvider')
	}
	return context
}
