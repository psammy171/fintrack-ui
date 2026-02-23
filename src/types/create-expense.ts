import type { PublicUser } from "./public-user";
import type { Tag } from "./tag";
import type { UserShareAmount } from "./user-share-amount";

export interface CreateExpense {
	remark: string;
	amount: number;
	date: string;
	tag?: Tag;
	paidBy?: PublicUser;
	userShares?: UserShareAmount[];
}
