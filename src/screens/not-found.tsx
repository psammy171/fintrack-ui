import { Link } from 'react-router-dom'

function NotFound() {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-50 text-gray-900 px-6">
			<h1 className="text-6xl md:text-8xl font-bold mb-6">404</h1>
			<h2 className="text-2xl md:text-4xl font-semibold mb-4">
				Page Not Found
			</h2>
			<p className="text-gray-600 mb-8 text-center max-w-md">
				Sorry, the page you are looking for does not exist. You can
				return to the homepage.
			</p>
			<Link
				to="/"
				className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition"
			>
				Go to Home
			</Link>
		</div>
	)
}

export default NotFound
