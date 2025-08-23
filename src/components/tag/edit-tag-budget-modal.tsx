import type { FormEvent } from 'react'
import { TagBudgetPeriod } from '../../enums/tag-budget-period.enum'
import { useEditTagBudget } from '../../hooks/tags'
import PopUp from '../shared/ui/pop-up'
import ErrorMessage from '../shared/ui/error-message'
import { getDisplayValueOfEnum } from '../../utils/enums'
import Button from '../shared/ui/button'
import Input from '../shared/ui/input'

const EditTagBudgetModal = () => {
	const {
		editTagBudget,
		editTagBudgetPopup,
		closeEditTagBudgetPopup,
		editTagBudgetAmount,
		updateTagBudget,
		editTagBudgetPeriod,
		editTagBudgetPeriodErr,
		editTagBudgetAmountErr,
		setEditTagBudgetAmountErr,
		setEditTagBudgetPeriodErr,
	} = useEditTagBudget()

	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault()
		updateTagBudget()
	}

	return (
		<PopUp
			open={editTagBudgetPopup}
			close={closeEditTagBudgetPopup}
			title={`Edit tag budget for ${editTagBudget?.name}`}
		>
			<form className="flex flex-col" onSubmit={onSubmitHandler}>
				<label htmlFor="tag-budget" className="text-[12px]">
					Tag Budget
				</label>
				<Input
					id="tag-budget"
					value={editTagBudget?.budget || 0}
					type="number"
					onChange={(e) =>
						editTagBudgetAmount(parseFloat(e.target.value))
					}
					onFocus={() => setEditTagBudgetAmountErr('')}
				/>
				{editTagBudgetAmountErr && (
					<ErrorMessage errorMessage={editTagBudgetAmountErr} />
				)}

				<label className="text-[12px] mt-4">Budget Period</label>
				<span className="grid grid-cols-2 gap-x-4">
					<p
						className={`border-2 border-gray-400 text-gray-600 text-center rounded-md py-1 ${
							editTagBudget?.tagBudgetPeriod ===
							TagBudgetPeriod.MONTHLY
								? 'bg-rose-100 text-rose-700 border-rose-700 font-semibold'
								: 'hover:bg-gray-200 cursor-pointer transition-colors'
						}`}
						onClick={() => {
							setEditTagBudgetPeriodErr('')
							editTagBudgetPeriod(TagBudgetPeriod.MONTHLY)
						}}
					>
						{getDisplayValueOfEnum(TagBudgetPeriod.MONTHLY)}
					</p>
					<p
						className={`border-2 border-gray-400 text-gray-600 text-center rounded-md py-1 ${
							editTagBudget?.tagBudgetPeriod ===
							TagBudgetPeriod.YEARLY
								? 'bg-green-100 text-green-700 border-green-700 font-semibold'
								: 'hover:bg-gray-200 cursor-pointer transition-colors'
						}`}
						onClick={() => {
							setEditTagBudgetPeriodErr('')
							editTagBudgetPeriod(TagBudgetPeriod.YEARLY)
						}}
					>
						{getDisplayValueOfEnum(TagBudgetPeriod.YEARLY)}
					</p>
				</span>
				{editTagBudgetPeriodErr && (
					<ErrorMessage errorMessage={editTagBudgetPeriodErr} />
				)}
				<Button className="mt-4 mx-0">Set Budget</Button>
			</form>
		</PopUp>
	)
}

export default EditTagBudgetModal
