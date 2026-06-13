import type { AverageExpense } from "./average-expense.interface";
import type { BottomExpense } from "./bottom-expense.interface";
import type { TopExpense } from "./top-expense.interface";
import type { TotalExpense } from "./total-expense.interface";

export interface ExpenseSummaryResponse {
	total: TotalExpense;
	average: AverageExpense;
	highest: TopExpense;
	lowest: BottomExpense;
}
