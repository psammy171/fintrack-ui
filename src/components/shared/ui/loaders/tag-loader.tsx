import LoaderSkeleton from "./folder-loader";

const TagLoader = () => {
	return (
		<>
			<div className="w-full sm:hidden">
				<LoaderSkeleton />
			</div>

			<div className="h-11 py-2.5 bg-gray-50 animate-pulse border-b gap-x-10 px-3 last:border-b-0 hidden sm:flex">
				<div className="h-5 w-[2%] bg-gray-300 animate-pulse rounded-sm"></div>
				<div className="h-5 w-[20%] bg-gray-300 animate-pulse rounded-sm"></div>
				<div className="h-5 w-[20%] bg-gray-300 animate-pulse rounded-sm ml-[20%]"></div>
			</div>
		</>
	);
};

export default TagLoader;
