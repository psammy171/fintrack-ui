import ExpenseSummary from "@/components/dashbaord/expense-summary";
import DailyExpenseByMonth from "@/components/dashbaord/daily-expense-by-month";
import type { Folder } from "@/types/folder";
import { useEffect, useState } from "react";
import DashboardFilters from "@/components/dashbaord/dashboard-filters";
import { useFolders } from "@/hooks/folders/use-folders";

const Dashboard = () => {
	const now = new Date();
	const { fetchFolders } = useFolders();
	const [startDate, setStartDate] = useState<string>(
		new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString(
			"en-CA",
		),
	);
	const [endDate, setEndDate] = useState<string>(
		new Date().toLocaleDateString("en-CA"),
	);

	const [folder, setFolder] = useState<Folder | undefined>(undefined);

	useEffect(() => {
		fetchFolders();
	}, [fetchFolders]);

	return (
		<div className="max-w-4xl pt-12 px-2 sm:mx-auto flex flex-col">
			<DashboardFilters
				startDate={startDate}
				endDate={endDate}
				folder={folder}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				setFolder={setFolder}
			/>
			<ExpenseSummary
				startDate={startDate}
				endDate={endDate}
				folderId={folder?.id}
			/>
			<DailyExpenseByMonth />
		</div>
	);
};

export default Dashboard;
