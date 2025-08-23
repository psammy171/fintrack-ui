import { Outlet } from 'react-router-dom'
import { TagsProvider } from './tags/tags'
import { EditTagProvider } from './tags/edit-tag'
import { EditTagBudgetProvider } from './tags/edit-tag-budget'
import { CreateExpenseProvider } from './expenses/create-expense'
import { ExpenseProvider } from './expenses/expenses'

const ContextProviderWrapper = () => {
	return (
		<TagsProvider>
			<EditTagProvider>
				<EditTagBudgetProvider>
					<ExpenseProvider>
						<CreateExpenseProvider>
							<Outlet />
						</CreateExpenseProvider>
					</ExpenseProvider>
				</EditTagBudgetProvider>
			</EditTagProvider>
		</TagsProvider>
	)
}

export default ContextProviderWrapper
