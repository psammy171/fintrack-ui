import type { Tag } from './tag'

export interface CreateExpense {
	remark: string
	amount: number
	date: string
	tag?: Tag
}
