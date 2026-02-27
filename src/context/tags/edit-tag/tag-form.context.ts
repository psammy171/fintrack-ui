import { createContext } from "react";
import type { Tag } from "../../../types/tag";

interface ITagFormContext {
	editTagId?: string;
	tagName: string;
	tagError?: string;
	folderId?: string;
	tagFormPopup: boolean;

	setTagName: (value: string) => void;
	updateTagValue: () => void;
	createTag: () => void;

	setTagError: (value: string) => void;
	setFolderId: (value: string) => void;

	openEditTagPopup: (tag: Tag) => void;
	openCreateTagPopup: () => void;
	closeTagFormPopup: () => void;
}

export const TagFormContext = createContext<ITagFormContext | undefined>(
	undefined,
);
