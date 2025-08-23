import { useState, type ReactNode } from 'react'
import type { UserContext } from '../../types/user-context'
import { AuthContext } from './auth.context'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userContext, setUserContext] = useState<UserContext | null>(null)
	const [authenticated, setAuthenticated] = useState<boolean>(false)
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)

	return (
		<AuthContext.Provider
			value={{
				userContext,
				authenticated,
				isAuthenticating,
				setUserContext,
				setAuthenticated,
				setIsAuthenticating,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
