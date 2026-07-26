import TagForm from "./tag-form";
import AllTags from "./all-tags";
import { useTagForm, useTags } from "../../hooks/tags";
import { useEffect, useState } from "react";
import Button from "../shared/ui/button";
import { useFolders } from "@/hooks/folders/use-folders";
import AddIcon from "../shared/icons/add";
import SearchIcon from "../shared/icons/search";
import TagLoader from "../shared/ui/loaders/tag-loader";
import DebounceSearch from "../shared/ui/debounce-search";

const TagManager = () => {
	const { fetchOwnFolders } = useFolders();
	const [search, setSearch] = useState<string>("");
	const { fetchingOwnedTags, fetchOwnedTags } = useTags();
	const { openCreateTagPopup } = useTagForm();

	useEffect(() => {
		fetchOwnFolders();
	}, [fetchOwnFolders]);

	useEffect(() => {
		fetchOwnedTags(search);
	}, [search]);

	return (
		<div className=" md:rounded-xs flex flex-col sm:m-2">
			<div className="flex items-center p-3 sm:py-2 sm:px-0 my-3 sticky top-0 bg-white z-10">
				<span className="relative">
					<DebounceSearch
						delay={500}
						placeholder="Search tags..."
						className="peer ml-1 sm:ml-0 rounded-sm transition-colors duration-200 pl-8"
						onChange={(value) => setSearch(value)}
					/>
					<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 peer-focus:text-black" />
				</span>
				<span className="flex-grow"></span>
				<Button
					type="button"
					variant="primary"
					className="my-0 px-2 rounded-sm"
					onClick={openCreateTagPopup}
				>
					<AddIcon className="w-4 h-4 mr-2" />
					<p>Create Tag</p>
				</Button>
			</div>
			<TagForm />
			{fetchingOwnedTags ? (
				<span className="rounded-sm overflow-hidden">
					{Array.from({ length: 10 }).map(() => (
						<TagLoader />
					))}
				</span>
			) : (
				<AllTags />
			)}
		</div>
	);
};

export default TagManager;
