import { useCallback, useRef, useState, type FC } from "react";
import type { Tag } from "../../../types/tag";
import type { IDefaultComponentProps } from "../../../interfaces/default-component-props.interface";
import apiClient from "../../../lib/axios";
import { TagsContext } from "./tags.context";
import type { Folder } from "@/types/folder";

export const TagsProvider: FC<IDefaultComponentProps> = ({ children }) => {
	const searchRef = useRef<string>("");
	const [tags, setTags] = useState<Tag[]>([]);
	const [fetching, setFetching] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<string | undefined>(undefined);

	const [ownedTags, setOwnedTags] = useState<Tag[]>([]);
	const [fetchingOwnedTags, setFetchingOwnedTags] = useState<boolean>(false);
	const [fetchOwnedTagsError, setFetchOwnedTagsError] = useState<
		string | undefined
	>(undefined);

	const fetchUserOrSharedFolderTags = useCallback(async (folder?: Folder) => {
		try {
			setFetching(true);
			const response = await apiClient.get("/tags", {
				params: {
					folderId: folder && folder.shared ? folder.id : undefined,
				},
			});
			setTags(response.data);
		} catch (error) {
			setFetchError("Error fetching tags : " + (error as Error).message);
		} finally {
			setFetching(false);
		}
	}, []);

	const fetchOwnedTags = async (search?: string) => {
		try {
			if (ownedTags.length > 0 && searchRef.current === search) return;
			searchRef.current = search || "";
			setFetchingOwnedTags(true);
			const response = await apiClient.get("/tags", {
				params: {
					scope: "owned",
					search,
				},
			});
			setOwnedTags(response.data);
		} catch (error) {
			setFetchOwnedTagsError(
				"Error fetching tags : " + (error as Error).message,
			);
		} finally {
			setFetchingOwnedTags(false);
		}
	};

	const addTag = (tag: Tag) => {
		setOwnedTags((prevTags) => [...prevTags, tag]);
	};

	const updateTag = (tagId: string, tag: Tag) => {
		setOwnedTags((prevTags) =>
			prevTags.map((t) => (t.id === tagId ? { ...t, ...tag } : t)),
		);
	};

	const deleteTag = (tagId: string) => {
		setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
		setOwnedTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
	};

	return (
		<TagsContext.Provider
			value={{
				tags,
				ownedTags,
				fetching,
				fetchingOwnedTags,
				fetchError,
				fetchOwnedTagsError,
				fetchUserOrSharedFolderTags,
				fetchOwnedTags,
				addTag,
				updateTag,
				setFetchError,
				setFetching,
				deleteTag,
			}}
		>
			{children}
		</TagsContext.Provider>
	);
};
