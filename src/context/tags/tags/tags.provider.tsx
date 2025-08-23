import { useCallback, useState, type FC } from 'react'
import type { Tag } from '../../../types/tag'
import type { IDefaultComponentProps } from '../../../interfaces/default-component-props.interface'
import apiClient from '../../../lib/axios'
import { TagsContext } from './tags.context'

export const TagsProvider: FC<IDefaultComponentProps> = ({ children }) => {
	const [tags, setTags] = useState<Tag[]>([])
	const [fetching, setFetching] = useState<boolean>(false)
	const [fetchError, setFetchError] = useState<string | undefined>(undefined)

	const fetchTags = useCallback(async () => {
		setFetching(true)
		try {
			if (tags.length > 0) return
			const response = await apiClient.get('/tags')
			setTags(response.data)
		} catch (error) {
			setFetchError('Error fetching tags : ' + (error as Error).message)
		} finally {
			setFetching(false)
		}
	}, [tags.length])

	const addTag = (tag: Tag) => {
		setTags((prevTags) => [...prevTags, tag])
	}

	const updateTag = (tagId: string, tag: Tag) => {
		setTags((prevTags) =>
			prevTags.map((t) => (t.id === tagId ? { ...t, ...tag } : t)),
		)
	}

	return (
		<TagsContext.Provider
			value={{
				tags,
				fetching,
				fetchError,
				fetchTags,
				addTag,
				updateTag,
				setFetchError,
				setFetching,
			}}
		>
			{children}
		</TagsContext.Provider>
	)
}
