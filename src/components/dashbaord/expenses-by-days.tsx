import { useEffect, useState, type FC } from "react";
import Loader from "../shared/ui/loader";
import apiClient from "@/lib/axios";
import BarChart from "./bar-chart";
import type { ExpenseByDay } from "./interfaces/expense-by-day";

interface Props {
	startDate: string;
	endDate: string;
	folderId?: string;
}

const ExpensesByDays: FC<Props> = ({ startDate, endDate, folderId }) => {
	const [fetching, setFetching] = useState(true);
	const [data, setData] = useState<ExpenseByDay[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true);
			try {
				const response = await apiClient.get<ExpenseByDay[]>(
					"/analytics/expenses-by-days",
					{
						params: {
							"start-date": startDate,
							"end-date": endDate,
							"folder-id": folderId,
						},
					},
				);

				setData(response.data);
			} catch (error) {
				console.error("Error fetching daily expense by month:", error);
			} finally {
				setFetching(false);
			}
		};

		fetchData();
	}, [endDate, folderId, startDate]);

	return (
		<div className="border inline-block w-full shadow-md rounded-sm my-4">
			<p className="px-8 font-medium text-[18px] py-4">
				Expenses By Days
			</p>
			<div className="w-full relative px-4 pb-8 sm:px-8">
				{fetching ? (
					<Loader className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				) : (
					<BarChart data={data} className="h-[314px] w-full" />
				)}
			</div>
		</div>
	);
};

export default ExpensesByDays;
