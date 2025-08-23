import { useEffect, useState } from 'react'
import Loader from '../shared/ui/loader'
import apiClient from '@/lib/axios'
import { formatToINR } from '@/utils/numbers'
import WalletIcon from '../shared/icons/wallet'

interface CurrentMonthSummary {
	total: number
	month: string
}

const CurrentMonthSummary = () => {
	const [fetching, setFetching] = useState(true)
	const [data, setData] = useState<CurrentMonthSummary | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true)
			try {
				const response = await apiClient.get<CurrentMonthSummary>(
					'/analytics/current-month-summary',
				)
				setData(response.data)
			} catch (error) {
				console.error('Error fetching current month summary:', error)
			} finally {
				setFetching(false)
			}
		}

		fetchData()
	}, [])

	return (
		<div className="border inline-block p-6 w-64 bg-indigo-50/60 shadow-md rounded-sm">
			<span className="w-12 h-12 mx-auto flex rounded-full items-center justify-center bg-indigo-200">
				<WalletIcon className="text-indigo-700 w-6 h-6" />
			</span>
			{/* <h3 className="text-xl font-bold">Current Month Summary</h3> */}
			{fetching ? (
				<span className="w-full inline-block">
					<Loader className="m-auto mt-4" />
				</span>
			) : (
				<div>
					{data ? (
						<>
							<p className="text-[14px] text-center">
								Expenditure in{' '}
								<span className="font-semibold text-[16px]">
									{data.month}
								</span>
							</p>
							<p className="text-center text-xl font-bold mt-2">
								{formatToINR(data.total)}
							</p>
						</>
					) : (
						<p className="text-center">No data available</p>
					)}
				</div>
			)}
		</div>
	)
}

export default CurrentMonthSummary
