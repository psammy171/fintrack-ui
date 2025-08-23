import CurrentMonthSummary from '@/components/dashbaord/current-month-summary'
import DailyExpenseByMonth from '@/components/dashbaord/daily-expense-by-month'

const Dashboard = () => {
	return (
		<div className=" max-w-4xl pt-12 mx-auto flex flex-col">
			<h1 className="text-2xl font-semibold mt-6 mb-4">
				Your Finance Report
			</h1>
			<CurrentMonthSummary />
			<DailyExpenseByMonth />
		</div>
	)
}

export default Dashboard
