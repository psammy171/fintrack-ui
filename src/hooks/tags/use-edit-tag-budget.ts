import { useContext } from 'react'
import { EditTagBudgetContext } from '../../context/tags/edit-tag-budget'

export const useEditTagBudget = () => {
	const context = useContext(EditTagBudgetContext)
	if (!context) {
		throw new Error('useEditTag must be used within a EditTagProvider')
	}
	return context
}
