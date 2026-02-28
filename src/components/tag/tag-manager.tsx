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
		<div className="bg-gray-100 rounded-xs overflow-hidden overflow-y-scroll flex flex-col shadow-md m-2">
			<div className="flex items-center py-2">
				<p className="text-2xl font-semibold pl-2">Tags</p>
				<span className="flex-grow"></span>
				<Button
					type="button"
					variant="primary"
					className="my-0 px-2"
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
