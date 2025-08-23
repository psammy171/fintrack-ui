import { useEffect, useState } from 'react'
import Loader from '../shared/ui/loader'
import apiClient from '@/lib/axios'
import { type BarDatum } from '@nivo/bar'
import Dropdown from '../shared/ui/dropdown'
import Input from '../shared/ui/input'
import BarChart from './bar-chart'
import { getDisplayValueOfEnum } from '@/utils/enums'

interface DailyExpenseByMonthData {
	total: number
	day: string
}

interface DailyExpenseByMonthAnalytics {
	month: string
	year: number
	data: DailyExpenseByMonthData[]
}

const MONTHS = [
	{ id: '1', option: 'JANUARY' },
	{ id: '2', option: 'FEBRUARY' },
	{ id: '3', option: 'MARCH' },
	{ id: '4', option: 'APRIL' },
	{ id: '5', option: 'MAY' },
	{ id: '6', option: 'JUNE' },
	{ id: '7', option: 'JULY' },
	{ id: '8', option: 'AUGUST' },
	{ id: '9', option: 'SEPTEMBER' },
	{ id: '10', option: 'OCTOBER' },
	{ id: '11', option: 'NOVEMBER' },
	{ id: '12', option: 'DECEMBER' },
]

const DailyExpenseByMonth = () => {
	const [fetching, setFetching] = useState(true)
	const [data, setData] = useState<BarDatum[]>([])
	const [monthIndex, setMonthIndex] = useState<number>(
		new Date().getMonth() + 1,
	)
	const [year, setYear] = useState<string>(
		new Date().getFullYear().toString(),
	)

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true)
			try {
				const response =
					await apiClient.get<DailyExpenseByMonthAnalytics>(
						'/analytics/daily-expenses-by-month',
						{
							params: {
								month: monthIndex,
								year,
							},
						},
					)
				setData(
					response.data.data.map((item) => ({
						day: item.day,
						total: item.total,
					})),
				)
			} catch (error) {
				console.error('Error fetching daily expense by month:', error)
			} finally {
				setFetching(false)
			}
		}

		fetchData()
	}, [monthIndex, year])

	return (
		<div className="border inline-block w-full bg-indigo-50/60 shadow-md rounded-sm mt-4 p-8">
			<span className="flex relative z-40 gap-x-4">
				<h3 className="text-xl font-bold">Daily Expense by Month</h3>
				<span className="flex-grow"></span>
				<Input
					value={year}
					type="number"
					className="w-24"
					onChange={(e) => {
						if (isNaN(parseInt(e.target.value))) setYear('')
						else setYear(e.target.value)
					}}
				/>
				<Dropdown
					options={MONTHS}
					className="w-36"
					value={{
						id: monthIndex.toString(),
						option: MONTHS[monthIndex - 1].option,
					}}
					onChange={(value) => setMonthIndex(parseInt(value.id))}
				/>
			</span>

			<div className="w-full h-[350px] relative">
				{/* <ResponsiveBar
						data={data}
						keys={['total']}
						indexBy={'day'}
						colors={({ index }) => {
							const palette = [
								'#1f77b4',
								'#ff7f0e',
								'#2ca02c',
								'#d62728',
								'#9467bd',
								'#8c564b',
								'#e377c2',
								'#7f7f7f',
								'#bcbd22',
								'#17becf',
								'#393b79',
								'#637939',
								'#8c6d31',
								'#843c39',
								'#7b4173',
							]
							return palette[index % palette.length]
						}}
						margin={{ top: 20, right: 30, bottom: 100, left: 60 }}
						padding={0.3}
						axisBottom={{
							tickSize: 5,
							tickPadding: 5,
							legend: 'Day',
							legendPosition: 'middle',
							legendOffset: 40,
						}}
						axisLeft={{
							tickSize: 5,
							tickPadding: 5,
							legend: 'Amount (₹)',
							legendPosition: 'middle',
							legendOffset: -50,
						}}
						enableLabel={true}
						labelSkipHeight={12}
						labelSkipWidth={12}
						labelTextColor="#fff"
						valueScale={{ type: 'linear', min: 0, max: 'auto' }}
						indexScale={{ type: 'band', round: true }}
						label={(d) =>
							`${formatToINR(
								parseFloat(d.data.total as string),
							)} ₹`
						}
						tooltip={({ value, color, indexValue }) => (
							<div
								style={{
									padding: '6px 12px',
									background: '#fff',
									border: `1px solid ${color}`,
									borderRadius: '4px',
									color: '#000',
								}}
							>
								<p>
									{`${indexValue} : ${formatToINR(
										parseFloat(value.toString()),
									)}`}
								</p>
							</div>
						)}
					/> */}
				{fetching && (
					<Loader className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				)}
				<BarChart
					data={data.map((d) => ({
						category: d.day.toString(),
						value: parseFloat(d.total.toString()),
					}))}
					month={getDisplayValueOfEnum(
						MONTHS.find(
							(month) => month.id === monthIndex.toString(),
						)?.option || '',
					)}
				/>
			</div>
		</div>
	)
}

export default DailyExpenseByMonth
