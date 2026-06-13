import { useEffect, useState } from "react";
import apiClient from "@/lib/axios";
import LowestIcon from "../shared/icons/lowest";
import AverageIcon from "../shared/icons/average";
import RupeeIcon from "../shared/icons/rupee";
import Summary from "./summary";
import type { ExpenseSummaryResponse } from "./interfaces/expense-summary-response.interface";
import { getDisplayDate } from "@/lib/date";

interface Props {
	startDate: string;
	endDate: string;
	folderId?: string;
}

const ExpenseSummary: React.FC<Props> = ({ startDate, endDate, folderId }) => {
	const [fetching, setFetching] = useState(true);
	const [data, setData] = useState<ExpenseSummaryResponse | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true);
			try {
				const response = await apiClient.get<ExpenseSummaryResponse>(
					"/analytics/summary",
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
				console.error("Error fetching current month summary:", error);
			} finally {
				setFetching(false);
			}
		};

		fetchData();
	}, [startDate, endDate, folderId]);

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
			<Summary
				total={data?.total.amount || 0}
				icon={
					<span className="w-12 h-12 mx-auto flex rounded-full items-center justify-center bg-indigo-200">
						<RupeeIcon className="text-indigo-700 w-6 h-6" />
					</span>
				}
				title="Total"
				fetching={fetching}
				textColor="text-indigo-700"
				message={
					data
						? `${getDisplayDate(data.total.startDate)} - ${getDisplayDate(data.total.endDate)}`
						: "No Informaton!"
				}
			/>
			<Summary
				total={data?.average.amount || 0}
				icon={
					<span className="w-12 h-12 mx-auto flex rounded-full items-center justify-center bg-cyan-200">
						<AverageIcon className="text-cyan-700 w-6 h-6" />
					</span>
				}
				title="Day Average"
				fetching={fetching}
				textColor="text-cyan-700"
				message={
					data
						? `${getDisplayDate(data.average.startDate)} - ${getDisplayDate(data.average.endDate)}`
						: "No Information!"
				}
			/>
			<Summary
				total={data?.highest.amount || 0}
				icon={
					<span className="w-12 h-12 mx-auto flex rounded-full items-center justify-center bg-red-200">
						<LowestIcon className="text-red-700 w-6 h-6 rotate-180" />
					</span>
				}
				title="Day Highest"
				fetching={fetching}
				textColor="text-red-700"
				message={
					data && data.highest.date
						? `Highest on ${getDisplayDate(data.highest.date)}`
						: "You haven't spent yet!"
				}
			/>
			<Summary
				total={data?.lowest.amount || 0}
				icon={
					<span className="w-12 h-12 mx-auto flex rounded-full items-center justify-center bg-green-200">
						<LowestIcon className="text-green-700 w-6 h-6" />
					</span>
				}
				title="Day Lowest"
				fetching={fetching}
				textColor="text-green-700"
				message={
					data && data.lowest.date
						? `Lowest on ${getDisplayDate(data.lowest.date)}`
						: "You haven't spent yet!"
				}
			/>
		</div>
	);
};

export default ExpenseSummary;
