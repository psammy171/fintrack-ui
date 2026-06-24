const ExpenseLoader = () => {
	return (
		<div>
			<div className="h-10 bg-gray-300 animate-pulse"></div>
			{Array.from({ length: 3 }).map(() => (
				<>
					<div className="border-b bg-gray-50 animate-pulse h-16 py-3 sm:py-2.5 px-4 sm:hidden">
						<div className="bg-gray-300 h-4 mb-2 rounded-xs w-44 sm:w-36"></div>
						<div className="bg-gray-300 h-2.5 w-32 sm:w-28"></div>
					</div>
					<div className="hidden sm:flex bg-gray-50 h-12.5 w-full items-center border-b animate-pulse px-4">
						<div className="w-5 h-5 bg-gray-300 animate-pulse rounded-sm"></div>
						<div className="w-[20%] h-5 bg-gray-300 animate-pulse rounded-sm ml-[3%]"></div>
						<span className="flex-1"></span>
						<div className="h-5 w-[5%] bg-gray-300 animate-pulse rounded-sm"></div>
					</div>
				</>
			))}
		</div>
	);
};

export default ExpenseLoader;
