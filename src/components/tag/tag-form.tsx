import { type FormEvent } from "react";
import { useTagForm } from "../../hooks/tags";
import Input from "../shared/ui/input";
import PopUp from "../shared/ui/pop-up";
import Button from "../shared/ui/button";
import { useFolders } from "@/hooks/folders/use-folders";
import Dropdown from "../shared/ui/dropdown";
import WarnIcon from "../shared/icons/warn";

const TagForm = () => {
	const {
		folderId,
		tagFormPopup,
		closeTagFormPopup,
		editTagId,
		tagName,
		setTagName,
		tagError,
		setTagError,
		createTag,
		updateTagValue,
		setFolderId,
	} = useTagForm();

	const { folders } = useFolders();

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (editTagId) {
			updateTagValue();
		} else {
			createTag();
		}
	};

	const getDropdownValue = () => {
		if (folderId) {
			const folder = folders.find((f) => f.id === folderId);
			return folder ? { id: folder.id, option: folder.name } : undefined;
		}
	};

	return (
		<PopUp
			open={tagFormPopup}
			close={closeTagFormPopup}
			title={editTagId ? "Edit Tag" : "Create Tag"}
		>
			<form onSubmit={submitHandler} className="max-w-[380px]">
				<span>
					<label className="text-[12px]">Tag Name</label>
					<Input
						type="text"
						placeholder="Enter tag"
						value={tagName}
						className="w-full"
						onFocus={() => setTagError("")}
						onChange={(e) => setTagName(e.target.value)}
					/>
					{tagError && (
						<p className=" text-red-800 text-[13px] text-right">
							{tagError}
						</p>
					)}
				</span>
				{!editTagId && (
					<div className="mt-4">
						<label className="text-[12px]">Shared Folder</label>
						<Dropdown
							options={folders
								.filter((folder) => folder.shared)
								.map((folder) => ({
									id: folder.id,
									option: folder.name,
								}))}
							onChange={(option) => setFolderId(option.id)}
							value={getDropdownValue()}
						/>
						<span className="flex items-center gap-x-2 text-sm text-gray-600 mt-1">
							<WarnIcon className="inline w-4 h-4 text-yellow-500 shrink-0" />
							<p className="leading-none">
								You can link a tag to a shared folder only. And
								won't be able to change the linked folder later.
							</p>
						</span>
					</div>
				)}
				<Button className="w-full mx-0 mt-4">
					{editTagId ? "Update Tag" : "Create Tag"}
				</Button>
			</form>
		</PopUp>
	);
};

export default TagForm;
