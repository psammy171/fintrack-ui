import { useState, type FC } from 'react'
import type { Tag } from '../../../types/tag'
import apiClient from '../../../lib/axios'
import toast from 'react-hot-toast'
import type { IDefaultComponentProps } from '../../../interfaces/default-component-props.interface'
import { useTags } from '../../../hooks/tags'
import { EditTagBudgetContext } from './edit-tag-budget.context'
import type { TagBudgetPeriod } from '../../../enums/tag-budget-period.enum'

export const EditTagBudgetProvider: FC<IDefaultComponentProps> = ({
	children,
}) => {
	const { updateTag } = useTags()
	const [editTagBudget, setEditTagBudget] = useState<Tag | undefined>(
		undefined,
	)
	const [editTagBudgetPopup, setEditTagBudgetPopup] = useState<boolean>(false)
	const [editTagBudgetAmountErr, setEditTagBudgetAmountErr] = useState<
		string | undefined
	>(undefined)
	const [editTagBudgetPeriodErr, setEditTagBudgetPeriodErr] = useState<
		string | undefined
	>(undefined)

	const editTagBudgetAmount = (amount: number) => {
		setEditTagBudget((tag) => {
			if (tag) {
				return { ...tag, budget: amount }
			}
			return tag
		})
	}

	const editTagBudgetPeriod = (tagBudgetPeriod: TagBudgetPeriod) => {
		setEditTagBudget((tag) => {
			if (tag) {
				return { ...tag, tagBudgetPeriod }
			}
			return tag
		})
	}

	const validateEditForm = () => {
		if (!editTagBudget?.tagBudgetPeriod) {
			setEditTagBudgetPeriodErr('Tag budget period is required')
			return false
		}
		if (!editTagBudget.budget || editTagBudget.budget < 0) {
			setEditTagBudgetAmountErr('Tag budget amount must be positive')
			return false
		}
		setEditTagBudgetPeriodErr(undefined)
		setEditTagBudgetAmountErr(undefined)
		return true
	}

	const updateTagBudget = async () => {
		if (editTagBudget) {
			const isFormValid = validateEditForm()
			if (!isFormValid) return

			setEditTagBudgetPopup(false)

			const request = apiClient.patch(
				`/tags/${editTagBudget.id}/set-budget`,
				{
					tagBudgetPeriod:
						editTagBudget.tagBudgetPeriod?.toUpperCase(),
					budget: editTagBudget.budget,
				},
			)

			toast.promise(request, {
				success: 'Tag budget updated successfully',
				error: 'Error updating tag budget',
				loading: 'Updating tag budget...',
			})

			const response = await request
			const tag = response.data as Tag

			updateTag(tag.id, tag)
		}
	}

	const openEditTagBudgetPopup = (tag: Tag) => {
		setEditTagBudgetAmountErr(undefined)
		setEditTagBudgetPeriodErr(undefined)
		setEditTagBudget(tag)
		setEditTagBudgetPopup(true)
	}

	const closeEditTagBudgetPopup = () => {
		setEditTagBudgetPopup(false)
	}

	return (
		<EditTagBudgetContext.Provider
			value={{
				editTagBudget,
				editTagBudgetPopup,
				editTagBudgetAmountErr,
				editTagBudgetPeriodErr,
				updateTagBudget,
				editTagBudgetAmount,
				editTagBudgetPeriod,
				openEditTagBudgetPopup,
				closeEditTagBudgetPopup,
				setEditTagBudgetAmountErr,
				setEditTagBudgetPeriodErr,
			}}
		>
			{children}
		</EditTagBudgetContext.Provider>
	)
}
