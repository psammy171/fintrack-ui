import { useEffect, useRef, type FC } from "react";
import * as echarts from "echarts";
import type { ExpenseByDay } from "./interfaces/expense-by-day";
import cn from "@/lib/cn";
import { getShortDisplayDate } from "@/lib/date";

interface Props {
	className?: string;
	data: ExpenseByDay[];
}

const BarChart: FC<Props> = ({ className, data }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		if (!chartRef.current) return;

		const chart = echarts.init(chartRef.current);

		const option = {
			tooltip: {
				trigger: "axis",
			},
			grid: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				containLabel: false,
			},
			xAxis: {
				type: "category",
				data: data.map((d) => getShortDisplayDate(d.time)),
				boundaryGap: true,
			},
			yAxis: {
				type: "value",
			},
			series: [
				{
					data: data.map((d) => d.total),
					type: "line",
				},
			],
		};

		chart.setOption(option);

		const handleResize = () => chart.resize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			chart.dispose();
		};
	}, [data]);

	return <div ref={chartRef} className={cn("w-full", className)} />;
};

export default BarChart;
