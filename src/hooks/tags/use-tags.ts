import { useContext } from 'react'
import { TagsContext } from '../../context/tags/tags'

export const useTags = () => {
	const context = useContext(TagsContext)
	if (!context) {
		throw new Error('useTag must be used within a TagProvider')
	}
	return context
}
