import type { ExpenseResponse } from "./expense";

export type ExpensesByDate = {
	time: string;
	total: number;
	data: ExpenseResponse[];
};
