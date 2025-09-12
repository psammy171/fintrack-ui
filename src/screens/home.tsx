import { motion } from 'framer-motion'
import Button from '@/components/shared/ui/button'
import SetGoalIcon from '@/components/shared/icons/set-goal'
import BarGraphIcon from '@/components/shared/icons/bar-graph'
import WalletIcon from '@/components/shared/icons/wallet'
import { Link } from 'react-router-dom'
import Header from '@/components/shared/ui/header'

export default function Homepage() {
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100">
			<Header />

			{/* Hero Section */}
			<section className="text-center pt-28 pb-20 px-6">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-5xl font-bold text-gray-900 mb-6"
				>
					Track Smarter, Spend Better
				</motion.h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
					Fintrack helps you add expenses, tag them, set goals, and
					visualize your spending trends—all in one place.
				</p>
				<Link to="/expenses">
					<Button className="rounded-2xl px-8 py-6 text-lg mx-auto bg-black text-white border-black hover:bg-gray-800 hover:border-gray-800">
						Get Started for Free
					</Button>
				</Link>
			</section>

			{/* Features Section */}
			<section className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto py-16">
				<div className="shadow-lg rounded-2xl bg-white">
					<div className="p-6 text-center">
						<WalletIcon className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
						<h3 className="text-xl font-semibold mb-2">
							Add & Tag Expenses
						</h3>
						<p className="text-gray-600">
							Easily record your expenses and organize them with
							custom tags.
						</p>
					</div>
				</div>
				<div className="shadow-lg rounded-2xl bg-white">
					<div className="p-6 text-center">
						<SetGoalIcon className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
						<h3 className="text-xl font-semibold mb-2">
							Set Goals
						</h3>
						<p className="text-gray-600">
							Create yearly or monthly goals for your spending
							categories.
						</p>
					</div>
				</div>
				<div className="shadow-lg rounded-2xl bg-white">
					<div className="p-6 text-center">
						<BarGraphIcon className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
						<h3 className="text-xl font-semibold mb-2">
							Visualize Trends
						</h3>
						<p className="text-gray-600">
							See your monthly spending totals and daily
							breakdowns in clear charts.
						</p>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-indigo-600 text-white text-center py-20 px-6">
				<h2 className="text-3xl font-bold mb-4">
					Ready to take control of your finances?
				</h2>
				<p className="text-lg mb-8">
					Sign up today and start tracking your expenses effortlessly.
				</p>
				<Link to="/expenses">
					<Button className="rounded-2xl px-8 py-6 text-lg mx-auto border-white bg-white text-black hover:bg-gray-300 hover:border-gray-300">
						Start Tracking Now
					</Button>
				</Link>
			</section>
		</div>
	)
}
