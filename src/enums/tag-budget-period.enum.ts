export const TagBudgetPeriod = {
	YEARLY: 'YEARLY',
	MONTHLY: 'MONTHLY',
} as const

export type TagBudgetPeriod =
	(typeof TagBudgetPeriod)[keyof typeof TagBudgetPeriod]
