import type { Role } from './role'

export interface UserContext {
	userId: string
	firstName: string
	lastName: string
	email: string
	roles: Role[]
}
