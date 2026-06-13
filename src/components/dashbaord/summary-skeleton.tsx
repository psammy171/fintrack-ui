const SummarySkeleton = () => {
	return (
		<div className="border p-3 w-full bg-gray-50/60 shadow-md rounded-sm">
			<div className="flex items-center justify-center gap-2">
				<div className="w-12 h-12 mx-auto flex rounded-full items-center justify-center bg-gray-200 animate-pulse flex-shrink-0"></div>
				<div className="flex-1">
					<div className="w-full h-4 bg-gray-200 rounded-xs animate-pulse"></div>
					<div className="w-full h-6 bg-gray-200 rounded-xs animate-pulse mt-3"></div>
				</div>
			</div>
			<p className="text-center text-xl h-4 font-bold mt-5 animate-pulse bg-gray-200 rounded"></p>
		</div>
	);
};

export default SummarySkeleton;
