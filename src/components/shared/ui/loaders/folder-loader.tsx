const FolderLoader = () => {
	return (
		<div className="border-b bg-gray-50 animate-pulse h-16 py-3 sm:py-2.5 px-4 flex gap-x-4">
			<div className="w-9 h-9 rounded-lg bg-gray-300 animate-pulse shrink-0"></div>
			<div className="flex-1">
				<div className="bg-gray-300 h-4 mb-2 rounded-xs w-44 sm:w-36"></div>
				<div className="bg-gray-300 h-2.5 w-32 sm:w-28"></div>
			</div>
		</div>
	);
};

export default FolderLoader;
