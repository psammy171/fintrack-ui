import { useExpenses } from "@/hooks/expenses/use-expenses";
import Button from "../shared/ui/button";

const ExpensePagination = () => {
	const {
		pageNumber,
		nextPage,
		prevPage,
		isLastPage,
		isFirstPage,
		total,
		pageSize,
		isFolderSection,
	} = useExpenses();

	return (
		<div
			className={`sticky bottom-0 left-0 sm:left-12 z-10 right-0 bg-gray-100 sm:block ${isFolderSection ? "hidden" : ""}`}
		>
			<div className="flex justify-end items-center my-2 mr-2">
				<p className="text-sm text-gray-600 mx-2">
					Showing results from {pageNumber * pageSize + 1} to{" "}
					{Math.min((pageNumber + 1) * pageSize, total)} of {total}
				</p>
				<Button
					onClick={prevPage}
					variant="ghost"
					className={`mx-0 bg-transparent hover:bg-gray-100 border-y border-l rounded-l-md ${
						isFirstPage ? "text-gray-400 hover:text-gray-400" : ""
					}`}
					disabled={isFirstPage}
				>
					&laquo;
				</Button>
				<span className="border-y h-9 px-3 flex items-center">
					{pageNumber + 1}
				</span>
				<Button
					variant="ghost"
					onClick={nextPage}
					className={`mx-0 bg-transparent hover:bg-gray-100 border-y border-r rounded-r-md ${
						isLastPage ? "text-gray-400 hover:text-gray-400" : ""
					}`}
					disabled={isLastPage}
				>
					&raquo;
				</Button>
			</div>
		</div>
	);
};

export default ExpensePagination;
