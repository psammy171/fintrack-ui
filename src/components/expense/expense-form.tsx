import { useCreateExpense } from '../../hooks/expenses/use-create-expense'
import { useTags } from '../../hooks/tags'
import ErrorMessage from '../shared/ui/error-message'
import PopUp from '../shared/ui/pop-up'
import { useEffect } from 'react'
import Dropdown from '../shared/ui/dropdown'
import Input from '../shared/ui/input'
import Button from '../shared/ui/button'

const ExpenseForm = () => {
	const {
		createExpense,
		setExpenseValue,
		closeCreateExpensePopUp,
		createExpensePopUp,
		expenseError,
		setExpensePropertyError,
		createExpenseApi,
	} = useCreateExpense()

	const { tags, fetchTags } = useTags()

	useEffect(() => {
		fetchTags()
	}, [fetchTags])

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault()
		createExpenseApi()
	}

	return (
		<PopUp
			open={createExpensePopUp}
			close={closeCreateExpensePopUp}
			title="Add Expense"
		>
			<form className="flex flex-col" onSubmit={onSubmitHandler}>
				<label className="text-[12px]">Remark</label>
				<Input
					type="text"
					value={createExpense.remark}
					placeholder="Dinner at bluestone"
					onFocus={() => setExpensePropertyError('remarkError', '')}
					onChange={(e) => setExpenseValue('remark', e.target.value)}
				/>
				{expenseError.remarkError && (
					<ErrorMessage errorMessage={expenseError.remarkError} />
				)}

				<label className="text-[12px] mt-4">Amount</label>
				<Input
					type="number"
					value={createExpense.amount}
					placeholder="1345"
					onFocus={() => setExpensePropertyError('amountError', '')}
					onChange={(e) => setExpenseValue('amount', e.target.value)}
				/>
				{expenseError.amountError && (
					<ErrorMessage errorMessage={expenseError.amountError} />
				)}

				<label className="text-[12px] mt-4">Date</label>
				<Input
					type="date"
					value={createExpense.date}
					onChange={(e) => {
						const value = e.target.value
							? new Date(e.target.value)
									.toISOString()
									.split('T')[0]
							: ''
						setExpenseValue('date', value)
					}}
					onFocus={() => setExpensePropertyError('dateError', '')}
				/>
				{expenseError.dateError && (
					<ErrorMessage errorMessage={expenseError.dateError} />
				)}
				<label className="text-[12px] mt-4">Tag</label>
				<Dropdown
					options={tags.map((tag) => ({
						option: tag.name,
						...tag,
					}))}
					value={
						createExpense.tag
							? {
									option: createExpense.tag.name,
									...createExpense.tag,
							  }
							: undefined
					}
					onChange={(value) => {
						const tagValue = tags.find((tag) => tag.id === value.id)
						if (tagValue) setExpenseValue('tag', tagValue)
						setExpensePropertyError('tagError', '')
					}}
				/>
				{expenseError.tagError && (
					<ErrorMessage errorMessage={expenseError.tagError} />
				)}
				<Button className="mt-6 mx-0">Add</Button>
			</form>
		</PopUp>
	)
}

export default ExpenseForm
