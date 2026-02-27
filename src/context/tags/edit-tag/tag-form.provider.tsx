import { useState, type FC } from "react";
import type { Tag } from "../../../types/tag";
import apiClient from "../../../lib/axios";
import toast from "react-hot-toast";
import type { IDefaultComponentProps } from "../../../interfaces/default-component-props.interface";
import { TagFormContext } from "./tag-form.context";
import { useTags } from "../../../hooks/tags";

export const TagFormProvider: FC<IDefaultComponentProps> = ({ children }) => {
	const { updateTag, addTag } = useTags();
	const [editTagId, setEditTagId] = useState<string | undefined>(undefined);
	const [tagName, setTagName] = useState<string>("");
	const [tagFormPopup, setTagFormPopup] = useState<boolean>(false);
	const [tagError, setTagError] = useState<string | undefined>(undefined);
	const [folderId, setFolderId] = useState<string | undefined>(undefined);

	const validateForm = () => {
		if (!tagName) {
			setTagError("Tag name is required");
			return false;
		}
		if (tagName.trim().length < 3) {
			setTagError("Tag name must be at least 3 characters long");
			return false;
		}
		setTagError(undefined);
		return true;
	};

	const updateTagValue = async () => {
		const isFormValid = validateForm();
		if (!isFormValid) return;
		setTagFormPopup(false);

		if (editTagId) {
			const request = apiClient.patch(`/tags/${editTagId}`, {
				name: tagName,
			});

			toast.promise(request, {
				success: "Tag updated successfully",
				error: "Error updating tag",
				loading: "Updating tag...",
			});

			const response = await request;
			const tag = response.data as Tag;

			updateTag(tag.id, tag);
		}
	};

	const createTag = async () => {
		const isFormValid = validateForm();
		if (!isFormValid) return;
		setTagFormPopup(false);

		const createBody: { name: string; folderId?: string } = {
			name: tagName,
		};

		if (folderId) {
			createBody.folderId = folderId;
		}

		const request = apiClient.post(`/tags`, createBody);

		toast.promise(request, {
			success: "Tag created successfully",
			error: "Error creating tag",
			loading: "Creating tag...",
		});

		const response = await request;
		const tag = response.data as Tag;

		addTag(tag);
	};

	const openCreateTagPopup = () => {
		setTagError(undefined);
		setEditTagId(undefined);
		setTagName("");
		setFolderId(undefined);
		setTagFormPopup(true);
	};

	const openEditTagPopup = (tag: Tag) => {
		setFolderId(undefined);
		setTagError(undefined);
		setEditTagId(tag.id);
		setTagName(tag.name);
		setTagFormPopup(true);
	};

	const closeTagFormPopup = () => {
		setTagFormPopup(false);
	};

	return (
		<TagFormContext.Provider
			value={{
				folderId,
				tagName,
				editTagId,
				tagFormPopup,
				tagError,
				setTagName,
				updateTagValue,
				setTagError,
				openEditTagPopup,
				closeTagFormPopup,
				openCreateTagPopup,
				createTag,
				setFolderId,
			}}
		>
			{children}
		</TagFormContext.Provider>
	);
};
