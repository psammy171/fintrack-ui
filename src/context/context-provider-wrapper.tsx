import { Outlet } from 'react-router-dom'
import { TagsProvider } from './tags/tags'
import { EditTagProvider } from './tags/edit-tag'
import { EditTagBudgetProvider } from './tags/edit-tag-budget'
import { CreateExpenseProvider } from './expenses/create-expense'
import { ExpenseProvider } from './expenses/expenses'
import Layout from '@/components/shared/ui/layout'
import { FoldersProvider } from './folder/folders'
import { CreateFolderProvider } from './folder/create-folder'

const ContextProviderWrapper = () => {
	return (
		<TagsProvider>
			<EditTagProvider>
				<EditTagBudgetProvider>
					<ExpenseProvider>
						<CreateExpenseProvider>
							<FoldersProvider>
								<CreateFolderProvider>
									<Layout>
										<Outlet />
									</Layout>
								</CreateFolderProvider>
							</FoldersProvider>
						</CreateExpenseProvider>
					</ExpenseProvider>
				</EditTagBudgetProvider>
			</EditTagProvider>
		</TagsProvider>
	)
}

export default ContextProviderWrapper
