import type { ExpenseByTag } from "./interfaces/expense-by-tag";
import cn from "@/lib/cn";
import * as echarts from "echarts";
import { useEffect, useRef, type FC } from "react";

interface Props {
	className?: string;
	data: ExpenseByTag[];
}

const PieChart: FC<Props> = ({ className, data }) => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!chartRef.current) return;

		const myChart = echarts.init(chartRef.current);

		const option: echarts.EChartsOption = {
			tooltip: {
				trigger: "item",
			},
			legend: {
				top: "5%",
				left: "center",
			},
			series: [
				{
					name: "Expenses By Tags",
					type: "pie",
					radius: ["40%", "70%"],
					avoidLabelOverlap: false,
					padAngle: 5,
					itemStyle: {
						borderRadius: 10,
					},
					label: {
						show: false,
						position: "center",
					},
					labelLine: {
						show: false,
					},
					data: data.map((d) => ({
						value: d.total,
						name: d.tagName,
					})),
				},
			],
		};

		myChart.setOption(option);

		const handleResize = () => myChart.resize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			myChart.dispose();
		};
	}, [data]);

	return <div ref={chartRef} className={cn("w-full", className)} />;
};

export default PieChart;
