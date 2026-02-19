import TagForm from "./tag-form";
import AllTags from "./all-tags";
import { useTagForm, useTags } from "../../hooks/tags";
import { useEffect } from "react";
import Button from "../shared/ui/button";

const TagManager = () => {
	const { fetching, fetchTags } = useTags();
	const { openCreateTagPopup } = useTagForm();

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

	return (
		<div className="bg-gray-100 rounded-xl max-h-[400px] overflow-hidden overflow-y-scroll flex flex-col shadow-md">
			<div className="flex items-center px-4 py-2">
				<p className="text-2xl font-semibold">Tags</p>
				<span className="flex-grow"></span>
				<Button
					type="button"
					variant="primary"
					className="my-0"
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
