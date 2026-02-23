export type CreateExpensePayload = {
	remark: string;
	amount: number;
	time: string;
	tagId: string;
	folderId?: string;
	paidBy?: string;
	userShares?: { userId: string; amount: number }[];
};
