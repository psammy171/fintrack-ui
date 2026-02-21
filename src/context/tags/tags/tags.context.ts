import { createContext } from "react";
import type { Tag } from "../../../types/tag";
import type { Folder } from "@/types/folder";

interface ITagsContext {
	fetching: boolean;
	fetchingOwnedTags: boolean;
	fetchError?: string;
	fetchOwnedTagsError?: string;

	tags: Tag[];
	ownedTags: Tag[];

	fetchUserOrSharedFolderTags: (folder?: Folder) => void;
	fetchOwnedTags: () => void;

	addTag: (tag: Tag) => void;
	updateTag: (tagId: string, tag: Tag) => void;

	setFetching: (isFetching: boolean) => void;
	setFetchError: (error: string) => void;
}

export const TagsContext = createContext<ITagsContext | undefined>(undefined);
