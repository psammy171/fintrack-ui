import { createContext } from 'react'
import type { Tag } from '../../../types/tag'

interface ITagsContext {
	fetching: boolean
	fetchError?: string
	tags: Tag[]

	fetchTags: () => void

	addTag: (tag: Tag) => void
	updateTag: (tagId: string, tag: Tag) => void

	setFetching: (isFetching: boolean) => void
	setFetchError: (error: string) => void
}

export const TagsContext = createContext<ITagsContext | undefined>(undefined)
