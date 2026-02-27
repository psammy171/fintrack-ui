import TagForm from "./tag-form";
import AllTags from "./all-tags";
import { useTagForm, useTags } from "../../hooks/tags";
import { useEffect } from "react";
import Button from "../shared/ui/button";
import { useFolders } from "@/hooks/folders/use-folders";

const TagManager = () => {
	const { fetchOwnFolders } = useFolders();
	const { fetching, fetchOwnedTags } = useTags();
	const { openCreateTagPopup } = useTagForm();

	useEffect(() => {
		fetchOwnFolders();
		fetchOwnedTags();
	}, [fetchOwnedTags, fetchOwnFolders]);

	return (
		<div className="bg-gray-100 rounded-xs max-h-[400px] overflow-hidden overflow-y-scroll flex flex-col shadow-md">
			<div className="flex items-center py-2">
				<p className="text-2xl font-semibold pl-2">Tags</p>
				<span className="flex-grow"></span>
				<Button
					type="button"
					variant="primary"
					className="my-0 pr-1"
					onClick={openCreateTagPopup}
				>
					Create Tag
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
