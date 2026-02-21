import { useCallback, useState, type FC } from "react";
import type { Tag } from "../../../types/tag";
import type { IDefaultComponentProps } from "../../../interfaces/default-component-props.interface";
import apiClient from "../../../lib/axios";
import { TagsContext } from "./tags.context";
import type { Folder } from "@/types/folder";

export const TagsProvider: FC<IDefaultComponentProps> = ({ children }) => {
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

	const fetchOwnedTags = useCallback(async () => {
		try {
			if (ownedTags.length > 0) return;
			setFetchingOwnedTags(true);
			const response = await apiClient.get("/tags", {
				params: {
					scope: "owned",
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
	}, [ownedTags.length]);

	const addTag = (tag: Tag) => {
		setTags((prevTags) => [...prevTags, tag]);
	};

	const updateTag = (tagId: string, tag: Tag) => {
		setTags((prevTags) =>
			prevTags.map((t) => (t.id === tagId ? { ...t, ...tag } : t)),
		);
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
			}}
		>
			{children}
		</TagsContext.Provider>
	);
};
