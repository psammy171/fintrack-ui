import TagForm from "./tag-form";
import AllTags from "./all-tags";
import { useTagForm, useTags } from "../../hooks/tags";
import { useEffect } from "react";
import Button from "../shared/ui/button";
import { useFolders } from "@/hooks/folders/use-folders";
import Input from "../shared/ui/input";
import AddIcon from "../shared/icons/add";
import SearchIcon from "../shared/icons/search";

const TagManager = () => {
	const { fetchOwnFolders } = useFolders();
	const { fetching, fetchOwnedTags } = useTags();
	const { openCreateTagPopup } = useTagForm();

	useEffect(() => {
		fetchOwnFolders();
		fetchOwnedTags();
	}, [fetchOwnedTags, fetchOwnFolders]);

	return (
		<div className=" md:rounded-xs flex flex-col sm:m-2">
			<div className="flex items-center p-3 sm:py-2 sm:px-0">
				<span className="relative">
					<Input
						placeholder="Search tags..."
						className="peer ml-1 sm:ml-0 rounded-sm transition-colors duration-200 pl-8"
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
			{fetching ? (
				<div className="w-full">
					<p className="text-center my-10">Loading...</p>
				</div>
			) : (
				<AllTags />
			)}
		</div>
	);
};

export default TagManager;
