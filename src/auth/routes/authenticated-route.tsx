import { useAuth } from '../hooks/use-auth'
import { useEffect } from 'react'
import type { UserContext } from '../../types/user-context'
import apiClient from '../../lib/axios'
import { useLocation } from 'react-router-dom'

interface Props {
	children: React.ReactNode
}

const AuthenticatedRoute = ({ children }: Props) => {
	const location = useLocation()
	const pathName = location.pathname
	const authRoutes = ['/expenses', '/dashboard', '/settings']
	const {
		isAuthenticating,
		authenticated,
		setIsAuthenticating,
		setUserContext,
		setAuthenticated,
		userContext,
	} = useAuth()

	useEffect(() => {
		const checkAuth = async () => {
			if (userContext && authenticated) {
				return
			}
			setAuthenticated(false)
			setIsAuthenticating(true)

			try {
				const response = await apiClient.get('/profile')
				const userContext: UserContext = response.data
				setUserContext(userContext)
				setAuthenticated(true)
			} catch (err) {
				console.error(err)
				setAuthenticated(false)
			} finally {
				setIsAuthenticating(false)
			}
		}
		checkAuth()
	}, [
		authenticated,
		setAuthenticated,
		setIsAuthenticating,
		setUserContext,
		userContext,
	])

	const isAuthRoute = () => authRoutes.includes(pathName)

	const getElement = () => {
		if (isAuthenticating) {
			return (
				<div className="h-screen w-full flex items-center justify-center">
					<div>Loading...</div>
				</div>
			)
		}

		if (!authenticated && isAuthRoute()) {
			window.location.href = import.meta.env.VITE_API_LOGIN_URL
		}

		return children
	}

	return <>{getElement()} </>
}

export default AuthenticatedRoute
