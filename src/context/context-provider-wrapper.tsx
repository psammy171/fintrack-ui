import { Outlet } from 'react-router-dom'
import { TagsProvider } from './tags/tags'
import { EditTagProvider } from './tags/edit-tag'
import { EditTagBudgetProvider } from './tags/edit-tag-budget'
import { CreateExpenseProvider } from './expenses/create-expense'
import { ExpenseProvider } from './expenses/expenses'
import Layout from '@/components/shared/ui/layout'

const ContextProviderWrapper = () => {
	return (
		<TagsProvider>
			<EditTagProvider>
				<EditTagBudgetProvider>
					<ExpenseProvider>
						<CreateExpenseProvider>
							<Layout>
								<Outlet />
							</Layout>
						</CreateExpenseProvider>
					</ExpenseProvider>
				</EditTagBudgetProvider>
			</EditTagProvider>
		</TagsProvider>
	)
}

export default ContextProviderWrapper
