import { useEffect, useState, type FC } from "react";
import Loader from "../shared/ui/loader";
import apiClient from "@/lib/axios";
import type { ExpenseByTag } from "./interfaces/expense-by-tag";
import PieChart from "./pie-chart";

interface Props {
	startDate: string;
	endDate: string;
	folderId?: string;
}

const ExpensesByTags: FC<Props> = ({ startDate, endDate, folderId }) => {
	const [fetching, setFetching] = useState(true);
	const [data, setData] = useState<ExpenseByTag[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true);
			try {
				const response = await apiClient.get<ExpenseByTag[]>(
					"/analytics/expenses-by-tags",
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
		<div className="border inline-block w-full shadow-md rounded-sm mt-2 mb-4">
			<p className="px-8 font-medium text-[18px] py-4">
				Expenses By Tags
			</p>
			<div className="w-full relative px-4 pb-8 sm:px-8">
				{fetching ? (
					<div className="h-[314px]">
						<Loader className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
					</div>
				) : (
					<PieChart data={data} className="h-[314px] w-full" />
				)}
			</div>
		</div>
	);
};

export default ExpensesByTags;
