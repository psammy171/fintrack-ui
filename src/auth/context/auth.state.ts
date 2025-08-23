import type { UserContext } from '../../types/user-context'

export type AuthState = {
	userContext: UserContext | null
	authenticated: boolean
	isAuthenticating: boolean
	setUserContext: (userContext: UserContext) => void
	setAuthenticated: (authenticated: boolean) => void
	setIsAuthenticating: (isAuthenticating: boolean) => void
}
