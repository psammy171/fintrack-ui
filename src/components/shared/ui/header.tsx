import { Link } from 'react-router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../../auth/hooks/use-auth'
import apiClient from '../../../lib/axios'
import SettingsIcon from '../icons/settings'
import Login from './login'
import Button from './button'

const Header = () => {
	const { userContext } = useAuth()
	const [open, setOpen] = useState(false)

	const closeProfile = useCallback(() => {
		setOpen(false)
	}, [])

	useEffect(() => {
		if (open) {
			window.addEventListener('click', closeProfile)
		} else {
			window.removeEventListener('click', closeProfile)
		}
		return () => {
			window.removeEventListener('click', closeProfile)
		}
	}, [open, closeProfile])

	const toggleProfile = (e: React.MouseEvent) => {
		e.stopPropagation()
		setOpen(!open)
	}

	const logoutHandler = async () => {
		try {
			await apiClient.get('/oauth2/logout')
			toast.success('Logged out successfully')
			window.location.href = '/'
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			toast.error('Failed to log out')
		}
	}

	return (
		<header className="flex items-center h-[50px] w-full  gap-x-4 fixed z-10 top-0">
			{/* <Link to={'/'}>
				<p className="text-xl font-bold">Welcome to FinTrack</p>
			</Link> */}
			{/* <span className="flex-grow"></span> */}
			{userContext ? (
				<div className="relative flex items-center p-3 justify-end gap-x-4 text-white bg-indigo-600 flex-grow">
					<Link to={'/'}>
						<p className="text-xl font-bold">Welcome to FinTrack</p>
					</Link>
					<span className="flex-grow"></span>
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/expenses">Expenses</Link>
					<Link to={'/settings'}>
						<SettingsIcon className="w-5 h-5 hover:rotate-180 duration-300 cursor-pointer" />
					</Link>
					<span
						className="border-2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
						onClick={toggleProfile}
					>
						<p>{userContext.firstName.charAt(0)}</p>
					</span>
					<span
						className={`absolute w-72 border border-gray-300 bg-gray-200 right-[6px] ${
							open ? '-bottom-[140px]' : 'bottom-0'
						} transition-all duration-300 -z-30 p-4 rounded-lg text-gray-800 shadow-lg`}
						onClick={(e) => e.stopPropagation()}
					>
						<span className="flex items-center gap-x-3">
							<span className="border-2 border-gray-700 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer peer text-lg">
								{userContext.firstName.charAt(0)}
							</span>
							<span>
								<p className="font-semibold">
									{userContext.firstName}{' '}
									{userContext.lastName}
								</p>
								<p>{userContext.email}</p>
							</span>
						</span>
						<Button
							className="mx-0 w-full mt-3 "
							onClick={logoutHandler}
						>
							Log Out
						</Button>
					</span>
				</div>
			) : (
				<div className="relative flex items-center p-3 justify-end gap-x-4 text-white bg-indigo-600 flex-grow">
					<Login />
				</div>
			)}
		</header>
	)
}

export default Header
