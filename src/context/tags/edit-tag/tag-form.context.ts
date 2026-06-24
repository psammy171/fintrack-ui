import { createContext } from "react";
import type { Tag } from "../../../types/tag";

interface ITagFormContext {
	editTagId?: string;
	deleteTagId?: string;
	tagName: string;
	tagError?: string;
	folderId?: string;
	tagFormPopup: boolean;
	deleteTagPopup: boolean;

	setTagName: (value: string) => void;
	updateTagValue: () => void;
	createTag: () => void;
	deleteTag: (tagId: string) => Promise<void>;

	setTagError: (value: string) => void;
	setFolderId: (value: string) => void;

	openEditTagPopup: (tag: Tag) => void;
	openDeleteTagPopup: (tag: Tag) => void;
	openCreateTagPopup: () => void;

	closeDeleteTagPopup: () => void;
	closeTagFormPopup: () => void;
}

export const TagFormContext = createContext<ITagFormContext | undefined>(
	undefined,
);
